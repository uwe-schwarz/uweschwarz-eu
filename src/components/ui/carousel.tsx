"use client";

import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps, HTMLAttributes, KeyboardEvent, Ref } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  orientation?: "horizontal" | "vertical";
  plugins?: CarouselPlugin;
};

type CarouselContextProps = {
  api: ReturnType<typeof useEmblaCarousel>[1];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = use(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

interface CarouselRootProps extends CarouselProps, HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function Carousel({
  children,
  className,
  opts,
  orientation = "horizontal",
  plugins,
  ref,
  ...props
}: CarouselRootProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = (selectedApi: CarouselApi) => {
      onSelectRef.current(selectedApi);
    };

    api.on("reInit", handleSelect);
    api.on("select", handleSelect);
    const animationFrameId = window.requestAnimationFrame(() => {
      onSelectRef.current(api);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      api.off("reInit", handleSelect);
      api.off("select", handleSelect);
    };
  }, [api]);

  const contextValue = useMemo(
    () => ({
      api: api,
      canScrollNext,
      canScrollPrev,
      carouselRef,
      opts,
      orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
      scrollNext,
      scrollPrev,
    }),
    [api, canScrollNext, canScrollPrev, carouselRef, opts, orientation, scrollNext, scrollPrev],
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <section
        aria-roledescription="carousel"
        className={cn("relative", className)}
        onKeyDownCapture={handleKeyDown}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps extends HTMLAttributes<HTMLUListElement> {
  ref?: Ref<HTMLUListElement>;
}

function CarouselContent({ className, ref, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <ul
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        ref={ref}
        {...props}
      />
    </div>
  );
}

interface CarouselItemProps extends HTMLAttributes<HTMLLIElement> {
  ref?: Ref<HTMLLIElement>;
}

function CarouselItem({ className, ref, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <li
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      ref={ref}
      {...props}
    />
  );
}

interface CarouselButtonProps extends ComponentProps<typeof Button> {
  ref?: Ref<HTMLButtonElement>;
}

function CarouselPrevious({ className, ref, size = "icon", variant = "outline", ...props }: CarouselButtonProps) {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  return (
    <Button
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      ref={ref}
      size={size}
      variant={variant}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({ className, ref, size = "icon", variant = "outline", ...props }: CarouselButtonProps) {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <Button
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      ref={ref}
      size={size}
      variant={variant}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
