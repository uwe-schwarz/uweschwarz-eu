"use client";

import type { HTMLAttributes } from "react";
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "motion/react";

import { cn } from "@/lib/utils";

export interface FileTextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FileTextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FILE_TEXT = forwardRef<FileTextIconHandle, FileTextIconProps>(
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
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={{
            animate: {
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            normal: { scale: 1 },
          }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />

          <motion.path
            d="M10 9H8"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              animate: {
                pathLength: [1, 0, 1],
                transition: {
                  delay: 0.3,
                  duration: 0.7,
                },
                x1: [8, 10, 8],
                x2: [10, 10, 10],
              },
              normal: {
                pathLength: 1,
                x1: 8,
                x2: 10,
              },
            }}
          />
          <motion.path
            d="M16 13H8"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              animate: {
                pathLength: [1, 0, 1],
                transition: {
                  delay: 0.5,
                  duration: 0.7,
                },
                x1: [8, 16, 8],
                x2: [16, 16, 16],
              },
              normal: {
                pathLength: 1,
                x1: 8,
                x2: 16,
              },
            }}
          />
          <motion.path
            d="M16 17H8"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              animate: {
                pathLength: [1, 0, 1],
                transition: {
                  delay: 0.7,
                  duration: 0.7,
                },
                x1: [8, 16, 8],
                x2: [16, 16, 16],
              },
              normal: {
                pathLength: 1,
                x1: 8,
                x2: 16,
              },
            }}
          />
        </motion.svg>
      </div>
    );
  },
);

FILE_TEXT.displayName = "FileTextIcon";

export { FILE_TEXT as FileTextIcon };
