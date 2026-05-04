"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface GalleryParallaxColumnsProps {
  images?: string[];
  backgroundColor?: string;
  columnCount?: number;
}

const GalleryParallaxColumns: React.FC<GalleryParallaxColumnsProps> = ({
  images = [],
  backgroundColor = "#f5f5f4",
  columnCount = 3,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -240]);

  const imagesPerColumn = Math.ceil(images.length / columnCount);
  const columns = [
    images.slice(0, imagesPerColumn),
    images.slice(imagesPerColumn, imagesPerColumn * 2),
    images.slice(imagesPerColumn * 2, imagesPerColumn * 3),
  ];

  const transforms = [y1, y2, y3];

  const gridColsClass =
    (
      {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      } as Record<number, string>
    )[columnCount] || "grid-cols-3";

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen h-[200vh] items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className={`-mt-40 grid w-full max-w-7xl gap-6 px-4 md:px-12 ${gridColsClass}`}>
        {columns.map((columnImages, colIndex) => (
          <motion.div
            key={colIndex}
            style={{ y: transforms[colIndex] }}
            className={`flex flex-col gap-6 ${colIndex === 1 ? "-mt-32" : ""}`}
          >
            {columnImages.map((src, i) => (
              <div key={`${colIndex}-${i}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={src}
                  className="h-full w-full scale-100 object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.88)" }}
                  alt=""
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                />
                <div className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {String(colIndex + 1).padStart(2, "0")}.{String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryParallaxColumns;
