"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

interface GalleryVelocityWarpProps {
  images?: string[];
  backgroundColor?: string;
  backgroundText?: string;
  labelPrefix?: string;
}

const GalleryVelocityWarp: React.FC<GalleryVelocityWarpProps> = ({
  images = [
    "https://images.unsplash.com/photo-1774696788918-fabf0c18e126?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1774876189300-5ec712826e33?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1774660980724-dc0fb4f5dbb6?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1775013394343-fdf658742ed0?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1773318427480-1058e1059f99?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1774333406492-2806c117fe59?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://plus.unsplash.com/premium_photo-1665772800736-e655b2fec2e7?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1774331510646-a1781c4a9713?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1757549248794-2b2b9db92439?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1773332611476-6ec2ba68049f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1775563623211-4ecef6718f1f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1774542414991-eaa61c677c24?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1775126964224-99c03c0e439c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1775251801951-ccb61c5bb914?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1774979517558-a9dfa07cf8d0?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
  ],
  backgroundColor = "#0a0a0a",
  backgroundText = "WARP",
  labelPrefix = "Uilora",
}) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);
  const scaleVelocity = useTransform(smoothVelocity, [-1000, 0, 1000], [0.95, 1, 0.95]);

  return (
    <div className="min-h-[200vh] overflow-hidden p-4 md:p-12" style={{ backgroundColor }}>
      <div className="pointer-events-none fixed left-0 top-0 flex h-full w-full items-center justify-center opacity-20">
        <h1 className="text-[20vw] leading-none font-black text-neutral-800">{backgroundText}</h1>
      </div>

      <motion.div
        style={{ skewY: skewVelocity, scale: scaleVelocity }}
        className="relative z-10 mx-auto grid max-w-7xl origin-center grid-cols-1 gap-8 md:grid-cols-3"
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className={`group relative aspect-[3/4] overflow-hidden rounded-lg ${i % 2 === 0 ? "mt-0" : "md:mt-24"}`}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={src}
              className="h-full w-full object-cover brightness-75 transition-all duration-500 group-hover:brightness-100"
              alt=""
            />
            <div className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-black/80 to-transparent p-6 transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-xl font-bold tracking-widest text-white uppercase">
                {labelPrefix} {i + 1}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GalleryVelocityWarp;
