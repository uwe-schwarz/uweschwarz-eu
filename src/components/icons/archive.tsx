"use client";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "motion/react";

import { cn } from "@/lib/utils";

export interface ArchiveIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArchiveIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RECT_VARIANTS: Variants = {
  animate: {
    transition: {
      damping: 25,
      duration: 0.2,
      stiffness: 200,
      type: "spring",
    },
    translateY: -1.5,
  },
  normal: {
    transition: {
      damping: 25,
      duration: 0.2,
      stiffness: 200,
      type: "spring",
    },
    translateY: 0,
  },
};

const PATH_VARIANTS: Variants = {
  animate: { d: "M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11" },
  normal: { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" },
};

const SECONDARY_PATH_VARIANTS: Variants = {
  animate: { d: "M10 15h4" },
  normal: { d: "M10 12h4" },
};

const ArchiveIcon = forwardRef<ArchiveIconHandle, ArchiveIconProps>(
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
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            animate={controls}
            height="5"
            initial="normal"
            rx="1"
            variants={RECT_VARIANTS}
            width="20"
            x="2"
            y="3"
          />
          <motion.path animate={controls} d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" variants={PATH_VARIANTS} />
          <motion.path animate={controls} d="M10 12h4" variants={SECONDARY_PATH_VARIANTS} />
        </svg>
      </div>
    );
  },
);

ArchiveIcon.displayName = "ArchiveIcon";

export { ArchiveIcon };
