"use client";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { LazyMotion, domAnimation, m, useAnimation } from "motion/react";

import { cn } from "@/lib/utils";

interface UsersIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UsersIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  animate: {
    transition: {
      damping: 13,
      delay: 0.1,
      stiffness: 200,
      type: "spring",
    },
    translateX: [-6, 0],
  },
  normal: {
    transition: {
      damping: 13,
      stiffness: 200,
      type: "spring",
    },
    translateX: 0,
  },
};

const UsersIcon = forwardRef<UsersIconHandle, UsersIconProps>(
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <m.path animate={controls} d="M22 21v-2a4 4 0 0 0-3-3.87" initial="normal" variants={PATH_VARIANTS} />
            <m.path animate={controls} d="M16 3.13a4 4 0 0 1 0 7.75" initial="normal" variants={PATH_VARIANTS} />
          </svg>
        </LazyMotion>
      </div>
    );
  },
);

UsersIcon.displayName = "UsersIcon";

export { UsersIcon };
