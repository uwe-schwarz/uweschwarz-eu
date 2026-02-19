"use client";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { LazyMotion, domAnimation, m, useAnimation } from "motion/react";

import { cn } from "@/lib/utils";

interface MapPinIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MapPinIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SVG_VARIANTS: Variants = {
  animate: {
    transition: {
      duration: 0.5,
      times: [0, 0.6, 1],
    },
    y: [0, -5, -3],
  },
  normal: {
    y: 0,
  },
};

const CIRCLE_VARIANTS: Variants = {
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [0.5, 0],
    transition: {
      delay: 0.3,
      duration: 0.5,
      opacity: { delay: 0.3, duration: 0.1 },
    },
  },
  normal: {
    opacity: 1,
  },
};

const MapPinIcon = forwardRef<MapPinIconHandle, MapPinIconProps>(
  ({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <LazyMotion features={domAnimation}>
          <m.svg
            animate={controls}
            fill="none"
            height={size}
            initial="normal"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            variants={SVG_VARIANTS}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <m.circle animate={controls} cx="12" cy="10" initial="normal" r="3" variants={CIRCLE_VARIANTS} />
          </m.svg>
        </LazyMotion>
      </div>
    );
  },
);

MapPinIcon.displayName = "MapPinIcon";

export { MapPinIcon };
