"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import { BrainCircuit, DraftingCompass, Network, Presentation, ShieldCheck } from "lucide-react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { HeroDiagramNodeKey } from "@/content/content";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";

type IconComponent = ComponentType<{ "aria-hidden"?: boolean; className?: string }>;

interface NodeLayout {
  bend: number;
  icon: IconComponent;
  x: number;
  y: number;
}

// Home positions in percent of the square diagram; bend curves each beam.
const NODE_LAYOUT: Record<HeroDiagramNodeKey, NodeLayout> = {
  ai: { bend: 0.16, icon: BrainCircuit, x: 85, y: 66 },
  architecture: { bend: -0.18, icon: DraftingCompass, x: 21, y: 15 },
  infrastructure: { bend: 0.18, icon: Network, x: 16, y: 72 },
  security: { bend: 0.2, icon: ShieldCheck, x: 81, y: 19 },
  training: { bend: -0.14, icon: Presentation, x: 55, y: 95 },
};

const CENTER = { x: 0.5, y: 0.46 };
// A fixed leash instead of ref constraints: motion rescales ref-constrained
// positions on every window resize (mobile URL bars), which flings nodes away.
const DRAG_LEASH = { bottom: 70, left: -70, right: 70, top: -70 };
const PACKET_DURATION_MS = 2600;

interface BeamPoint {
  x: number;
  y: number;
}

const getBeamGeometry = (from: BeamPoint, to: BeamPoint, bend: number) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  return {
    control: { x: midX - dy * bend, y: midY + dx * bend },
    from,
    to,
  };
};

const pointOnBeam = (geometry: ReturnType<typeof getBeamGeometry>, t: number): BeamPoint => {
  const inverse = 1 - t;

  return {
    x: inverse * inverse * geometry.from.x + 2 * inverse * t * geometry.control.x + t * t * geometry.to.x,
    y: inverse * inverse * geometry.from.y + 2 * inverse * t * geometry.control.y + t * t * geometry.to.y,
  };
};

interface DiagramNodeProps {
  index: number;
  isAnimated: boolean;
  isPacketActive: boolean;
  label: string;
  layout: NodeLayout;
  onDragged: () => void;
  size: MotionValue<number>;
}

const DiagramNode = ({ index, isAnimated, isPacketActive, label, layout, onDragged, size }: DiagramNodeProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const packetRef = useRef<SVGCircleElement | null>(null);
  const Icon = layout.icon;

  const getGeometry = (latestSize: number, offsetX: number, offsetY: number) =>
    getBeamGeometry(
      {
        x: (layout.x / 100) * latestSize + offsetX,
        y: (layout.y / 100) * latestSize + offsetY,
      },
      { x: CENTER.x * latestSize, y: CENTER.y * latestSize },
      layout.bend,
    );

  const beamPath = useTransform([size, x, y], ([latestSize, offsetX, offsetY]: Array<number>) => {
    const { control, from, to } = getGeometry(latestSize, offsetX, offsetY);
    return `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;
  });

  useAnimationFrame((time) => {
    const packet = packetRef.current;
    if (!packet || !isPacketActive) {
      return;
    }

    const progress = ((time + index * 520) % PACKET_DURATION_MS) / PACKET_DURATION_MS;
    const point = pointOnBeam(getGeometry(size.get(), x.get(), y.get()), progress);
    packet.setAttribute("cx", point.x.toFixed(2));
    packet.setAttribute("cy", point.y.toFixed(2));
    packet.setAttribute("opacity", progress > 0.86 ? ((1 - progress) / 0.14).toFixed(2) : "1");
  });

  return (
    <>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <m.path
          animate={{ pathLength: 1 }}
          className="stroke-[var(--beam)]"
          d={beamPath}
          fill="none"
          initial={isAnimated ? { pathLength: 0 } : false}
          strokeLinecap="round"
          strokeOpacity={0.55}
          strokeWidth={1.5}
          transition={{ delay: 0.5 + index * 0.08, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
        {isPacketActive && (
          <circle className="fill-[var(--redline)]" cx={-20} cy={-20} opacity={0} r={3.5} ref={packetRef} />
        )}
      </svg>

      <m.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute z-20 flex cursor-grab touch-none select-none items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3.5 text-[0.8rem] font-semibold text-card-foreground shadow-[0_10px_30px_-14px_hsl(var(--shadow-color)/0.6)] -translate-x-1/2 -translate-y-1/2 active:cursor-grabbing sm:text-sm"
        drag
        dragConstraints={DRAG_LEASH}
        dragElastic={0.45}
        dragSnapToOrigin
        dragTransition={{ bounceDamping: 14, bounceStiffness: 260 }}
        initial={isAnimated ? { opacity: 0, scale: 0.6 } : false}
        onDragEnd={onDragged}
        style={{ left: `${layout.x}%`, top: `${layout.y}%`, x, y }}
        transition={{ damping: 20, delay: 0.35 + index * 0.08, stiffness: 320, type: "spring" }}
        whileDrag={{ rotate: -3, scale: 1.08 }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/12 text-primary">
          <Icon aria-hidden className="h-4 w-4" />
        </span>
        {label}
      </m.div>
    </>
  );
};

const HeroDiagram = ({ isFrozen }: { isFrozen: boolean }) => {
  const { t } = useSettings();
  const { hero } = siteContent;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const size = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { margin: "80px" });
  const [hasDragged, setHasDragged] = useState(false);
  const isAnimated = !prefersReducedMotion && !isFrozen;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const syncSize = () => size.set(container.getBoundingClientRect().width);
    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [size]);

  const hint = t(hasDragged ? hero.diagram.hintAfterDrag : hero.diagram.hint);

  return (
    <div
      aria-label={t(hero.diagram.label)}
      className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[30rem] lg:max-w-[34rem]"
      ref={containerRef}
      role="img"
    >
      {/* Drafting marks around the portrait */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-primary"
        viewBox="0 0 100 100"
      >
        <circle
          cx={CENTER.x * 100}
          cy={CENTER.y * 100}
          fill="none"
          r={28}
          stroke="currentColor"
          strokeDasharray="0.6 1.6"
          strokeOpacity={0.55}
          strokeWidth={0.35}
        />
        <circle
          cx={CENTER.x * 100}
          cy={CENTER.y * 100}
          fill="none"
          r={36}
          stroke="currentColor"
          strokeOpacity={0.14}
          strokeWidth={0.25}
        />
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            stroke="currentColor"
            strokeOpacity={0.5}
            strokeWidth={0.35}
            transform={`rotate(${angle} ${CENTER.x * 100} ${CENTER.y * 100})`}
            x1={CENTER.x * 100}
            x2={CENTER.x * 100}
            y1={CENTER.y * 100 - 26.5}
            y2={CENTER.y * 100 - 30}
          />
        ))}
      </svg>

      {hero.diagram.nodes.map((node, index) => (
        <DiagramNode
          index={index}
          isAnimated={isAnimated}
          isPacketActive={isAnimated && isInView}
          key={node.key}
          label={t(node.label)}
          layout={NODE_LAYOUT[node.key]}
          onDragged={() => setHasDragged(true)}
          size={size}
        />
      ))}

      {/* Portrait sits on top of the beams so packets disappear into it */}
      <div
        className="absolute z-10 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-card p-1.5 shadow-[0_24px_60px_-28px_hsl(var(--shadow-color)/0.7)]"
        style={{ left: `${CENTER.x * 100}%`, top: `${CENTER.y * 100}%` }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 212px, 150px"
            src="/profile.webp"
          />
        </div>
      </div>

      {/* Redline note: the one hand-drawn nudge in the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[36%] top-[-7%] z-30 w-[46%] sm:top-[-4%]">
        <p className="redline-note -rotate-6 text-center text-xl sm:text-2xl">{hint}</p>
        <svg
          className="absolute -left-[18%] top-[70%] h-12 w-16 text-redline sm:h-14 sm:w-20"
          fill="none"
          viewBox="0 0 80 56"
        >
          <path
            className="draw-stroke"
            d="M74 6 C 58 8, 38 14, 22 34"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2.5}
            style={{ "--stroke-length": 80 } as CSSProperties}
          />
          <path
            className="draw-stroke"
            d="M14 26 L 21 36 L 32 32"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            style={{ "--stroke-length": 40 } as CSSProperties}
          />
        </svg>
      </div>
    </div>
  );
};

HeroDiagram.displayName = "HeroDiagram";

export default HeroDiagram;
