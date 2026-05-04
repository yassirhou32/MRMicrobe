"use client";

import React from "react";
import { motion } from "framer-motion";

interface GalleryDiagonalProps {
  images?: string[];
  backgroundColor?: string;
  labelPrefix?: string;
  overlayColor?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  rows?: number;
}

const GalleryDiagonal: React.FC<GalleryDiagonalProps> = ({
  images = [
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-998d78b70412?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1764888802295-648490e594dd?q=80&w=1113&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?q=80&w=2700&auto=format&fit=crop",
  ],
  backgroundColor = "#09090b",
  labelPrefix = "IMG",
  overlayColor = "#a855f7",
  badgeColor = "#84cc16",
  badgeTextColor = "#000000",
  rows = 3,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden py-24" style={{ backgroundColor }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(circle at 50% 50%, ${overlayColor}33, transparent 50%)` }}
      />

      <div className="flex scale-110 flex-col gap-4 -skew-y-3">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex items-center justify-center gap-4 overflow-hidden whitespace-nowrap">
            {[...images, ...images].slice(row * 2, row * 2 + 8).map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group relative h-[250px] w-[400px] shrink-0 overflow-hidden border transition-all duration-500"
                style={{ borderColor: "#27272a", borderWidth: "1px" }}
              >
                <img src={src} className="h-full w-full scale-125 skew-y-3 object-cover" alt="" />
                <div
                  className="absolute bottom-0 left-0 translate-y-full px-2 py-1 font-mono text-xs font-bold uppercase transition-transform group-hover:translate-y-0"
                  style={{ backgroundColor: badgeColor, color: badgeTextColor }}
                >
                  {labelPrefix}_00{i + 1}
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity hover:opacity-100"
                  style={{ backgroundColor: `${overlayColor}33` }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryDiagonal;
