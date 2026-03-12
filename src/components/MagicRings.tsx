import { Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";
import { useEffect, useRef } from "react";

const fragmentShader = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface MagicRingsProps {
  attenuation?: number;
  baseRadius?: number;
  blur?: number;
  clickBurst?: boolean;
  color?: string;
  colorTwo?: string;
  fadeIn?: number;
  fadeOut?: number;
  followMouse?: boolean;
  hoverScale?: number;
  lineThickness?: number;
  mouseInfluence?: number;
  noiseAmount?: number;
  opacity?: number;
  parallax?: number;
  radiusStep?: number;
  ringCount?: number;
  ringGap?: number;
  rotation?: number;
  scaleRate?: number;
  speed?: number;
}

export default function MagicRings({
  attenuation = 10,
  baseRadius = 0.35,
  blur = 0,
  clickBurst = false,
  color = "#fc42ff",
  colorTwo = "#42fcff",
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  hoverScale = 1.2,
  lineThickness = 2,
  mouseInfluence = 0.2,
  noiseAmount = 0.1,
  opacity = 1,
  parallax = 0.05,
  radiusStep = 0.1,
  ringCount = 6,
  ringGap = 1.5,
  rotation = 0,
  scaleRate = 0.1,
  speed = 1,
}: MagicRingsProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<Required<MagicRingsProps>>({
    attenuation,
    baseRadius,
    blur,
    clickBurst,
    color,
    colorTwo,
    fadeIn,
    fadeOut,
    followMouse,
    hoverScale,
    lineThickness,
    mouseInfluence,
    noiseAmount,
    opacity,
    parallax,
    radiusStep,
    ringCount,
    ringGap,
    rotation,
    scaleRate,
    speed,
  });
  const burstRef = useRef(0);
  const hoverAmountRef = useRef(0);
  const isHoveredRef = useRef(false);
  const mouseRef = useRef([0, 0]);
  const smoothMouseRef = useRef([0, 0]);

  useEffect(() => {
    propsRef.current = {
      attenuation,
      baseRadius,
      blur,
      clickBurst,
      color,
      colorTwo,
      fadeIn,
      fadeOut,
      followMouse,
      hoverScale,
      lineThickness,
      mouseInfluence,
      noiseAmount,
      opacity,
      parallax,
      radiusStep,
      ringCount,
      ringGap,
      rotation,
      scaleRate,
      speed,
    };
  }, [
    attenuation,
    baseRadius,
    blur,
    clickBurst,
    color,
    colorTwo,
    fadeIn,
    fadeOut,
    followMouse,
    hoverScale,
    lineThickness,
    mouseInfluence,
    noiseAmount,
    opacity,
    parallax,
    radiusStep,
    ringCount,
    ringGap,
    rotation,
    scaleRate,
    speed,
  ]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true });
    } catch {
      return;
    }

    if (!renderer.capabilities.isWebGL2) {
      renderer.dispose();
      return;
    }

    renderer.setClearColor(0, 0);
    mount.append(renderer.domElement);

    const scene = new Scene();
    const camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uAttenuation: { value: 0 },
      uBaseRadius: { value: 0 },
      uBurst: { value: 0 },
      uColor: { value: new Color() },
      uColorTwo: { value: new Color() },
      uFadeIn: { value: 0.5 },
      uFadeOut: { value: 0.75 },
      uHoverAmount: { value: 0 },
      uHoverScale: { value: 1 },
      uLineThickness: { value: 0 },
      uMouse: { value: new Vector2() },
      uMouseInfluence: { value: 0 },
      uNoiseAmount: { value: 0 },
      uOpacity: { value: 1 },
      uParallax: { value: 0 },
      uRadiusStep: { value: 0 },
      uResolution: { value: new Vector2() },
      uRingCount: { value: 0 },
      uRingGap: { value: 1.6 },
      uRotation: { value: 0 },
      uScaleRate: { value: 0 },
      uTime: { value: 0 },
    };

    const material = new ShaderMaterial({
      fragmentShader,
      transparent: true,
      uniforms,
      vertexShader,
    });
    const quad = new Mesh(new PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const height = mount.clientHeight;
      const width = mount.clientWidth;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);
      uniforms.uResolution.value.set(width * dpr, height * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current[0] = 0;
      mouseRef.current[1] = 0;
    };
    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current[0] = (event.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current[1] = -((event.clientY - rect.top) / rect.height - 0.5);
    };
    const onClick = () => {
      burstRef.current = 1;
    };

    mount.addEventListener("click", onClick);
    mount.addEventListener("mouseenter", onMouseEnter);
    mount.addEventListener("mouseleave", onMouseLeave);
    mount.addEventListener("mousemove", onMouseMove);

    let frameId = 0;
    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      const props = propsRef.current;

      smoothMouseRef.current[0] += (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.08;
      smoothMouseRef.current[1] += (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.08;
      hoverAmountRef.current += ((isHoveredRef.current ? 1 : 0) - hoverAmountRef.current) * 0.08;
      burstRef.current *= 0.95;

      if (burstRef.current < 0.001) {
        burstRef.current = 0;
      }

      uniforms.uAttenuation.value = props.attenuation;
      uniforms.uBaseRadius.value = props.baseRadius;
      uniforms.uBurst.value = props.clickBurst ? burstRef.current : 0;
      uniforms.uColor.value.set(props.color);
      uniforms.uColorTwo.value.set(props.colorTwo);
      uniforms.uFadeIn.value = props.fadeIn;
      uniforms.uFadeOut.value = props.fadeOut;
      uniforms.uHoverAmount.value = hoverAmountRef.current;
      uniforms.uHoverScale.value = props.hoverScale;
      uniforms.uLineThickness.value = props.lineThickness;
      uniforms.uMouse.value.set(smoothMouseRef.current[0], smoothMouseRef.current[1]);
      uniforms.uMouseInfluence.value = props.followMouse ? props.mouseInfluence : 0;
      uniforms.uNoiseAmount.value = props.noiseAmount;
      uniforms.uOpacity.value = props.opacity;
      uniforms.uParallax.value = props.parallax;
      uniforms.uRadiusStep.value = props.radiusStep;
      uniforms.uRingCount.value = props.ringCount;
      uniforms.uRingGap.value = props.ringGap;
      uniforms.uRotation.value = (props.rotation * Math.PI) / 180;
      uniforms.uScaleRate.value = props.scaleRate;
      uniforms.uTime.value = time * 0.001 * props.speed;

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      mount.removeEventListener("click", onClick);
      mount.removeEventListener("mouseenter", onMouseEnter);
      mount.removeEventListener("mouseleave", onMouseLeave);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      quad.geometry.dispose();
    };
  }, []);

  return <div className="h-full w-full" ref={mountRef} style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined} />;
}
