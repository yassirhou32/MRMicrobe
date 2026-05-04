"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PerspectiveCarouselProps {
  images?: string[];
  cardCount?: number;
  backgroundColor?: string;
  containerHeight?: string;
  perspective?: string;
  cardWidth?: string;
  cardHeight?: string;
  cardBgColor?: string;
  cardBorderColor?: string;
  cardPadding?: string;
  imageOpacity?: number;
  labelColor?: string;
  labelSize?: string;
  translateZ?: number;
  rotateYRange?: [number, number];
  scrollOffset?: [string, string];
  className?: string;
}

export const PerspectiveCarousel = ({
  images = [
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535382607908-17277b0c3608?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
  ],
  cardCount = 5,
  backgroundColor = "bg-[#050505]",
  containerHeight = "h-[400vh]",
  perspective = "perspective-[1000px]",
  cardWidth = "w-[600px]",
  cardHeight = "h-[400px]",
  cardBgColor = "bg-white/5",
  cardBorderColor = "border-white/10",
  cardPadding = "p-4",
  imageOpacity = 0.8,
  labelColor = "text-white/20",
  labelSize = "text-6xl",
  translateZ = 600,
  rotateYRange = [0, 360],
  scrollOffset = ["start start", "end end"],
  className = "",
}: PerspectiveCarouselProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: scrollOffset as any });
  const rotateY = useTransform(scrollYProgress, [0, 1], rotateYRange);

  return (
    <div
      ref={containerRef}
      className={`${containerHeight} ${backgroundColor} ${perspective} overflow-hidden ${className}`}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center transform-style-3d">
        <motion.div
          style={{ rotateY, transformStyle: "preserve-3d", z: -500 }}
          className={`relative ${cardWidth} ${cardHeight}`}
        >
          {Array.from({ length: cardCount }).map((_, i) => {
            const angle = (i / cardCount) * 360;
            return (
              <div
                key={i}
                className={`absolute inset-0 ${cardBgColor} border ${cardBorderColor} ${cardPadding} backdrop-blur-sm`}
                style={{ transform: `rotateY(${angle}deg) translateZ(${translateZ}px)` }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={images[i % images.length]}
                    className="h-full w-full object-cover"
                    style={{ opacity: imageOpacity }}
                    alt=""
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${labelSize} font-bold ${labelColor}`}>0{i + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
