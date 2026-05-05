"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Carousel3DPerspective } from "@/components/Carousel3DPerspective";
import {
  buildGalleryImagesForCollection,
  collectionShowcaseTitles,
  collectionSlugFromTitle,
  collectionTitleFromSlug,
} from "@/lib/collectionGallery";

function RealisationsContent() {
  const searchParams = useSearchParams();
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const requestedSlug = searchParams.get("collection") ?? "";
  const selectedCollection = collectionTitleFromSlug(requestedSlug) ?? collectionShowcaseTitles[0];

  const canvasImages = useMemo(
    () => buildGalleryImagesForCollection(selectedCollection, "canvas"),
    [selectedCollection]
  );
  const paperImages = useMemo(
    () => buildGalleryImagesForCollection(selectedCollection, "paper"),
    [selectedCollection]
  );
  const carouselImages = useMemo(() => Array.from(new Set([...canvasImages, ...paperImages])), [canvasImages, paperImages]);
  const mobilePerspectiveItems = useMemo(
    () =>
      carouselImages.map((image, index) => ({
        id: `${selectedCollection}-${index}`,
        image,
        title: selectedCollection,
        subtitle: `Image ${index + 1}`,
      })),
    [carouselImages, selectedCollection]
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobileViewport(mq.matches);
    sync();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  return (
    <main className="relative z-10 min-h-screen scroll-smooth bg-transparent pb-0 text-[#0a0a0a]">
      <LandingLikeBackground />
      <header className="sticky top-0 z-20 border-b border-[#0a0a0a]/10 bg-transparent backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-10">
          <div className="rounded-md border border-[#0a0a0a]/10 bg-transparent px-3 py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0a0a0a]/42">Realisations</p>
            <h1 className="font-display text-[clamp(0.98rem,1.5vw,1.22rem)] font-semibold uppercase tracking-[-0.015em] text-[#0a0a0a]/95">
              {selectedCollection}
            </h1>
            <p className="mt-0.5 text-[11px] text-[#0a0a0a]/52">Selection active de la collection</p>
          </div>
          <Link
            href="/#collections"
            className="border border-[#0a0a0a]/15 bg-transparent px-3 py-2 text-[9px] font-mono uppercase tracking-[0.16em] text-[#0a0a0a]/80 transition hover:border-[#e20074]/45 hover:text-[#e20074]"
          >
            Retour accueil
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-2 px-4 py-4 md:grid-cols-4 md:px-10">
        {collectionShowcaseTitles.map((title) => {
          const slug = collectionSlugFromTitle(title);
          const active = title === selectedCollection;
          return (
            <Link
              key={title}
              href={`/realisations?collection=${slug}`}
              className={`rounded-sm border px-3 py-2 text-[10px] font-mono uppercase tracking-[0.16em] transition ${
                active
                  ? "border-[#e20074]/45 bg-[linear-gradient(120deg,rgba(226,0,116,0.14)_0%,rgba(226,0,116,0.04)_100%)] text-[#9a0050]"
                  : "border-[#0a0a0a]/12 bg-transparent text-[#0a0a0a]/72 hover:border-[#e20074]/35 hover:text-[#e20074]"
              }`}
            >
              {title}
            </Link>
          );
        })}
      </section>

      <section className="pb-0">
        {isMobileViewport ? (
          <div className="-mt-97 px-2 pb-2">
            <Carousel3DPerspective
              items={mobilePerspectiveItems}
              defaultActive={Math.min(2, Math.max(0, mobilePerspectiveItems.length - 1))}
              heading="Choisissez votre piece"
              subheading="Explorez la collection en version mobile fluide"
              ctaLabel="Voir la collection"
              accentColor="#9a0050"
              bgColor="transparent"
              cardWidth={200}
              cardHeight={260}
              stageHeight={300}
            />
          </div>
        ) : (
          <div className="px-2 pb-2">
            <Carousel3DPerspective
              items={mobilePerspectiveItems}
              defaultActive={Math.min(2, Math.max(0, mobilePerspectiveItems.length - 1))}
              heading="Choisissez votre piece"
              subheading="Explorez la collection"
              ctaLabel="Voir la collection"
              accentColor="#9a0050"
              bgColor="transparent"
              cardWidth={384}
              cardHeight={504}
              stageHeight={564}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default function RealisationsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f5f5f5]" />}>
      <RealisationsContent />
    </Suspense>
  );
}

function LandingLikeBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f5f5f5]">
      <motion.svg
        className="absolute left-1/2 top-1/2 h-[min(140vw,120vh)] w-[min(140vw,120vh)] -translate-x-1/2 -translate-y-1/2 text-[#0a0a0a]/[0.085]"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ rotate: [0, 1.2, 0], scale: [1, 1.01, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.12" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.1" />
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.08" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="0.06" />
      </motion.svg>
      <motion.svg
        className="absolute -right-[8%] top-[8%] h-[85vh] w-[85vh] text-[#0a0a0a]/[0.06]"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ x: ["0%", "-0.6%", "0%"], y: ["0%", "0.4%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 8 92 A 78 78 0 0 1 92 8" stroke="currentColor" strokeWidth="0.14" />
        <path d="M 18 88 A 62 62 0 0 1 88 18" stroke="currentColor" strokeWidth="0.1" />
      </motion.svg>
      <motion.div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(1480px 760px at 74% -4%, transparent 73%, rgba(255,255,255,0.88) 73.15%, transparent 73.95%), radial-gradient(1240px 680px at 18% 86%, transparent 71.8%, rgba(255,255,255,0.76) 72%, transparent 72.85%), radial-gradient(1180px 560px at 102% 38%, transparent 70.4%, rgba(255,255,255,0.65) 70.6%, transparent 71.4%)",
        }}
        animate={{ x: ["0%", "-1.1%", "0%"], y: ["0%", "0.8%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          background:
            "radial-gradient(1320px 640px at 68% 14%, transparent 72.2%, rgba(255,255,255,0.68) 72.4%, transparent 73.1%), radial-gradient(1080px 560px at 14% 70%, transparent 72.8%, rgba(255,255,255,0.58) 73%, transparent 73.9%)",
        }}
        animate={{ x: ["0%", "1%", "0%"], y: ["0%", "-0.7%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.24]"
        style={{
          background:
            "radial-gradient(760px 380px at 14% 20%, rgba(226,0,116,0.3) 0%, rgba(226,0,116,0.12) 24%, rgba(226,0,116,0) 60%), radial-gradient(920px 460px at 86% 72%, rgba(255,45,149,0.24) 0%, rgba(255,45,149,0.1) 30%, rgba(255,45,149,0) 64%), radial-gradient(640px 320px at 52% 92%, rgba(196,0,98,0.22) 0%, rgba(196,0,98,0.09) 26%, rgba(196,0,98,0) 60%)",
        }}
        animate={{ x: ["0%", "0.7%", "0%"], y: ["0%", "-0.6%", "0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(255,255,255,0.24)_0%,rgba(245,245,245,0)_58%)]" />
      <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_22%_24%,rgba(226,0,116,0.36)_0%,rgba(226,0,116,0)_35%),radial-gradient(circle_at_84%_78%,rgba(255,45,149,0.28)_0%,rgba(255,45,149,0)_38%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.42)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 opacity-[0.055] mix-blend-multiply [background-image:radial-gradient(circle_at_22%_28%,rgba(0,0,0,0.45)_0.65px,transparent_0.85px)] [background-size:3px_3px]" />
    </div>
  );
}
