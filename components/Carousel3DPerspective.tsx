"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShoppingCart, Heart } from "lucide-react";

interface PerspectiveItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

interface Carousel3DPerspectiveProps {
  items?: PerspectiveItem[];
  defaultActive?: number;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  accentColor?: string;
  bgColor?: string;
}

const DEFAULT_ITEMS: PerspectiveItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1773332611476-6ec2ba68049f?w=600&auto=format&fit=crop&q=60",
    title: "Bloom Series",
    subtitle: "Limited edition",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1774637777045-e7390fc657e8?q=80&w=687&auto=format&fit=crop",
    title: "Petal Collection",
    subtitle: "Spring 2025",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1765003291278-495489d2d7fe?q=80&w=1170&auto=format&fit=crop",
    title: "Golden Hour",
    subtitle: "Landscape series",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1774270905958-86e7eaeae23d?w=600&auto=format&fit=crop&q=60",
    title: "Dusk Light",
    subtitle: "Evening collection",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1774538537377-9646fa0ec25a?w=600&auto=format&fit=crop&q=60",
    title: "Morning Mist",
    subtitle: "Dawn series",
  },
];

const getCardTransform = (normDist: number) => {
  if (normDist === 0) {
    return {
      rotateY: 0,
      scale: 1.04,
      x: 0,
      opacity: 1,
      zIndex: 20,
      brightness: 1,
    };
  }
  const sign = normDist > 0 ? 1 : -1;
  const abs = Math.abs(normDist);
  if (abs === 1) {
    return {
      rotateY: -sign * 42,
      scale: 0.84,
      x: sign * 188,
      opacity: 0.9,
      zIndex: 10,
      brightness: 0.82,
    };
  }
  return {
    rotateY: -sign * 55,
    scale: 0.65,
    x: sign * 280,
    opacity: 0,
    zIndex: 0,
    brightness: 0.6,
  };
};

export const Carousel3DPerspective: React.FC<Carousel3DPerspectiveProps> = ({
  items = DEFAULT_ITEMS,
  defaultActive = 2,
  heading = "Choose Your Piece",
  subheading = "Explore our curated collection",
  ctaLabel = "Add To Cart",
  accentColor = "#166534",
  bgColor = "#f0f0f6",
}) => {
  const [active, setActive] = useState(defaultActive);
  const [liked, setLiked] = useState(false);
  const total = items.length;

  const goNext = () => setActive((p) => (p + 1) % total);
  const goPrev = () => setActive((p) => (p - 1 + total) % total);

  const activeItem = items[active];

  return (
    <div
      className="flex min-h-screen w-full select-none flex-col items-center"
      style={{
        background: bgColor,
        padding: "56px 24px 56px",
      }}
    >
      <p
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "-0.02em",
          marginBottom: 4,
        }}
      >
        {heading}
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 32 }}>{subheading}</p>

      <div
        className="relative flex w-full items-center justify-center"
        style={{
          height: 300,
          perspective: "1000px",
          overflow: "visible",
        }}
      >
        {items.map((item, i) => {
          const distance = ((i - active + total) % total + total) % total;
          const normDist = distance > total / 2 ? distance - total : distance;
          if (Math.abs(normDist) > 1) return null;

          const t = getCardTransform(normDist);

          return (
            <motion.div
              key={item.id}
              className="absolute overflow-hidden"
              animate={{
                rotateY: t.rotateY,
                scale: t.scale,
                x: t.x,
                opacity: t.opacity,
                filter: `brightness(${t.brightness})`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={() => {
                if (normDist === -1) goPrev();
                if (normDist === 1) goNext();
              }}
              style={{
                width: 200,
                height: 260,
                borderRadius: 20,
                zIndex: t.zIndex,
                cursor: normDist !== 0 ? "pointer" : "default",
                transformStyle: "preserve-3d",
                boxShadow: normDist === 0 ? "0 20px 56px rgba(0,0,0,0.18)" : "0 8px 24px rgba(0,0,0,0.12)",
                background: "#fff",
                transformOrigin: normDist === 1 ? "left center" : normDist === -1 ? "right center" : "center",
              }}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" draggable={false} />

              {normDist === 0 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiked((v) => !v);
                    }}
                    className="absolute right-3 top-3 flex items-center justify-center rounded-full"
                    style={{
                      width: 30,
                      height: 30,
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      cursor: "pointer",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Heart size={14} color={liked ? "#ef4444" : "#9ca3af"} fill={liked ? "#ef4444" : "none"} />
                  </button>

                  <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 38,
                        height: 38,
                        background: "rgba(255,255,255,0.96)",
                        border: "1.5px solid #e5e7eb",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                      }}
                    >
                      <ArrowLeft size={16} color="#374151" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 38,
                        height: 38,
                        background: "rgba(255,255,255,0.96)",
                        border: "1.5px solid #e5e7eb",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                      }}
                    >
                      <ArrowRight size={16} color="#374151" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mb-6 mt-5 flex flex-col items-center gap-0.5">
        <p style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{activeItem?.title}</p>
        {activeItem?.subtitle && <p style={{ fontSize: 12, color: "#9ca3af" }}>{activeItem.subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          className="flex items-center justify-center rounded-full transition-all hover:bg-gray-100"
          style={{
            width: 40,
            height: 40,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <ArrowLeft size={17} color="#374151" />
        </button>

        <button
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{
            background: "#fff",
            color: accentColor,
            border: `1.5px solid ${accentColor}`,
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            letterSpacing: "0.01em",
          }}
        >
          <ShoppingCart size={15} />
          {ctaLabel}
        </button>

        <button
          onClick={goNext}
          className="flex items-center justify-center rounded-full transition-all hover:bg-gray-100"
          style={{
            width: 40,
            height: 40,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <ArrowRight size={17} color="#374151" />
        </button>
      </div>
    </div>
  );
};

export default Carousel3DPerspective;
