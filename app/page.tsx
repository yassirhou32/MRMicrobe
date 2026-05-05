"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collectionSlugFromTitle } from "@/lib/collectionGallery";

const heroImages = [
  "/images/Image 1.png",
  "/images/M7_02137.jpg",
  "/images/M7_02162.jpg",
  "/images/M7_01627.jpg",
  "/images/M7_01636.jpg",
  "/images/M7_02104.jpg",
];

const realisationImages = ["/images/M7_01625.jpg", "/images/Image 6.png", "/images/M7_03103.jpg", "/images/Image 3.png"];

const publicGalleryImages = [
  "/images/Image 7.png",
  "/images/Image 8.png",
  "/images/Image 9.png",
  "/images/Image 10.png",
  "/images/Image 11.png",
  "/images/Image 12.png",
  "/images/M7_01373.jpg",
];

const collections = [
  "Les toiles",
  "Les petits",
  "Les moyens",
  "Monocycle",
  "Les grands formats",
  "Luminaire",
  "Bijou d'art",
];

const milestones = [
  "2004 — Origines visuelles",
  "2012 — Matiere et precision",
  "2019 — Signature Mr Microbe",
  "2024 — Direction vivante",
];

const collectionCards = [
  {
    title: "Les toiles",
    text: "Serie de toiles sur chassis: acrylique, aerosol, enduits et collages. Univers signe Microbe, entre graffiti, personnages fleurs et narration contemporaine.",
    image: "/images/M7_02134.jpg",
  },
  {
    title: "Les petits",
    text: "Sculptures fleur pop sur socle acier. Multiples finitions et couleurs, chaque piece affirme le regard signature du Microbe.",
    image: "/images/M7_03109.jpg",
  },
  {
    title: "Les moyens",
    text: "Series de sculptures fleur en resine, finitions acrylique et aerosol. Variation graphique entre mat uni, points, camo et tags.",
    image: "/images/M7_03110.jpg",
  },
  {
    title: "Grands formats",
    text: "Grandes fleurs resine haute brillance sur socle acier. Presence sculpturale forte pour espaces volume ou vitrine.",
    image: "/images/M7_02162.jpg",
  },
  {
    title: "Monocycle",
    text: "Variation iconique autour de la fleur signature, traitement pop et lignes franches pour une lecture immediate.",
    image: "/images/M7_01636.jpg",
  },
  {
    title: "Luminaire",
    text: "Objets lumineux a forte presence graphique. Piece fonctionnelle et artistique, pensee comme un accent architectural.",
    image: "/images/M7_02104.jpg",
  },
  {
    title: "Bijou d'art",
    text: "Formats plus intimes, details affirmes, esprit collection. Prolongement de l'univers Mr Microbe a echelle reduite.",
    image: "/images/M7_03110.jpg",
  },
];

const artistHighlights = [
  "Un langage personnel ne de la rue et de la matiere.",
  "Une signature emotionnelle: contraste, rythme, impact.",
  "Une direction artistique qui relie oeuvre et architecture.",
];

const contactInfos = [
  "Email: mrmicrobe.furgerot@gmail.com",
  "Telephone: 06 60 70 78 33",
  "Adresse: 19 rue de Saint-Gobain, 37700 Saint-Pierre-des-Corps",
  "Delai de reponse: 24-48h",
];

const artistParagraphs = [
  "Maxime Furgerot, alias Mr Microbe, transforme ses tensions intérieures en formes brutes et reconnaissables. Entre geste urbain, matière organique et émotion directe, son travail impose une présence immédiate.",
  "Le langage visuel repose sur des contrastes assumes, des personnages-fleurs et une narration contemporaine. Chaque oeuvre est pensee pour dialoguer avec l'espace et installer une presence nette.",
  "La direction artistique reste sur-mesure: lecture du lieu, selection des formats, projection visuelle puis mise en scene finale.",
];

const artistStatement =
  "Un langage personnel ne de la rue, de la matiere et d'une energie emotionnelle assumee.";

const immersionJourneySteps: {
  id: string;
  title: string;
  description: string;
  image: string;
  pills: readonly [string, string];
}[] = [
  {
    id: "01",
    title: "Intention",
    description: "Comprendre l'espace, l'envie, les dimensions et le budget.",
    image: "/images/parcours-01.png",
    pills: ["ATELIER", "DIRECTION"],
  },
  {
    id: "02",
    title: "Proposition",
    description: "Selection de pieces ou pistes artistiques adaptees a votre projet.",
    image: "/images/parcours-02.png",
    pills: ["ATELIER", "DIRECTION"],
  },
  {
    id: "03",
    title: "Projection",
    description: "Visualisation de l'oeuvre pour confirmer sa presence dans l'espace.",
    image: "/images/parcours-03.png",
    pills: ["ATELIER", "DIRECTION"],
  },
];

const contactFlow = [
  "Etape 1: Nom complet, email, telephone, ville.",
  "Etape 2: Budget estime, collection d'interet, objectif, dimensions du mur.",
  "Etape 3: Delai souhaite, message detaille, envoi de la demande.",
];

const spotlightCards = [
  {
    title: "Collections",
    subtitle: "Directions visuelles fortes",
    description: "Pieces signature, formats vivants, selection orientee impact et coherence d'espace.",
    href: "#collections",
    image: "/images/M7_02134.jpg",
  },
  {
    title: "Artiste",
    subtitle: "Langage Mr Microbe",
    description:
      "Un univers de matiere, tension et narration visuelle construit comme une vraie identite d'auteur.",
    href: "#artiste",
    image: "/images/M7_02162.jpg",
  },
  {
    title: "Immersion",
    subtitle: "Du brief au mur",
    description: "Parcours projection, selection et installation pour composer une presence artistique nette.",
    href: "#immersion",
    image: "/images/M7_01636.jpg",
  },
];

const homeMasonryContent = [
  { id: "01", title: "Collection vivante", subtitle: "Collections" },
  { id: "02", title: "Matiere narrative", subtitle: "Artiste" },
  { id: "03", title: "Direction visuelle", subtitle: "Immersion" },
  { id: "04", title: "Relief et contraste", subtitle: "Atelier" },
];

const archiveRows = [
  {
    id: "01",
    title: "COLLECTIONS",
    subtitle: "Pieces signature, formats vivants, selection orientee impact et coherence d'espace.",
  },
  {
    id: "02",
    title: "ARTISTE",
    subtitle: "Un univers de matiere, tension et narration visuelle construit comme une vraie identite d'auteur.",
  },
  {
    id: "03",
    title: "IMMERSION",
    subtitle: "Parcours projection, selection et installation pour composer une presence artistique nette.",
  },
  {
    id: "04",
    title: "INSTALLATION",
    subtitle: "Mise en scene propre, precise, et coherent avec l'architecture du lieu.",
  },
];

const projectShowcases = [
  {
    title: "Collection vivante",
    image: "/images/M7_02134.jpg",
    category: "Art",
    location: "Tours",
    area: "92 x 65",
  },
  {
    title: "Matiere narrative",
    image: "/images/M7_02137.jpg",
    category: "Studio",
    location: "Paris",
    area: "158 x 97",
  },
  {
    title: "Direction visuelle",
    image: "/images/M7_02162.jpg",
    category: "Immersion",
    location: "Lyon",
    area: "100 x 110",
  },
];

const scrollEase = [0.16, 1, 0.3, 1] as const;

interface ParcoursConceptItem {
  title: string;
  detail: string;
  image: string;
}

type FlipPhase = "idle" | "logo" | "detail";

function ParcoursFlipExperience({
  items = [
    { title: "Origine", detail: "Premiers dessins, premiers contrastes, premières formes.", image: "/images/M7_01625.jpg" },
    { title: "Technique", detail: "Apprentissage du geste, des reliefs, des patines et de la discipline.", image: "/images/M7_03110.jpg" },
    { title: "Signature Mr Microbe", detail: "Naissance d'un style direct, organique et reconnaissable.", image: "/images/M7_03103.jpg" },
    { title: "Direction artistique", detail: "Collections privées, installations et projets sur mesure.", image: "/images/M7_01636.jpg" },
  ],
}: {
  items?: ParcoursConceptItem[];
}) {
  const [flipState, setFlipState] = useState<Record<number, FlipPhase>>({});
  const [loadingProgress, setLoadingProgress] = useState<Record<number, number>>({});
  const revealTimersRef = useRef<Record<number, number>>({});
  const loadingIntervalsRef = useRef<Record<number, number>>({});

  useEffect(() => {
    return () => {
      Object.values(revealTimersRef.current).forEach((timerId) => window.clearTimeout(timerId));
      Object.values(loadingIntervalsRef.current).forEach((intervalId) => window.clearInterval(intervalId));
    };
  }, []);

  const flipCard = (index: number) => {
    if (revealTimersRef.current[index]) window.clearTimeout(revealTimersRef.current[index]);
    if (loadingIntervalsRef.current[index]) window.clearInterval(loadingIntervalsRef.current[index]);

    setFlipState((prev) => ({ ...prev, [index]: "logo" }));
    setLoadingProgress((prev) => ({ ...prev, [index]: 0 }));

    loadingIntervalsRef.current[index] = window.setInterval(() => {
      setLoadingProgress((prev) => {
        const current = prev[index] ?? 0;
        const next = Math.min(96, current + 4);
        return { ...prev, [index]: next };
      });
    }, 70);

    revealTimersRef.current[index] = window.setTimeout(() => {
      if (loadingIntervalsRef.current[index]) window.clearInterval(loadingIntervalsRef.current[index]);
      setLoadingProgress((prev) => ({ ...prev, [index]: 100 }));
      setFlipState((prev) => ({ ...prev, [index]: "detail" }));
    }, 2200);
  };

  const resetCard = (index: number) => {
    if (revealTimersRef.current[index]) window.clearTimeout(revealTimersRef.current[index]);
    if (loadingIntervalsRef.current[index]) window.clearInterval(loadingIntervalsRef.current[index]);
    setFlipState((prev) => ({ ...prev, [index]: "idle" }));
    setLoadingProgress((prev) => ({ ...prev, [index]: 0 }));
  };

  return (
    <section className="relative overflow-hidden border-y border-white/12 bg-[#04070d] px-0 py-12 text-white md:py-16 lg:relative lg:left-[-15rem] lg:w-[calc(100%+15rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_48%),radial-gradient(circle_at_86%_76%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_46%),linear-gradient(180deg,rgba(4,7,13,0.98)_0%,rgba(1,3,8,1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="relative mx-auto max-w-[1380px] px-6 md:px-10">
        <h3 className="title-unified mt-0 font-black uppercase text-white">
          PARCOUR<span className="text-[#e20074]">S</span>
        </h3>
        <div className="mt-3 h-px w-full max-w-[220px] bg-white/20" />

        <div className="mt-8 grid auto-cols-[230px] grid-flow-col gap-4 overflow-x-auto pb-2 md:grid-flow-row md:auto-cols-auto md:grid-cols-4 md:overflow-visible">
            {items.map((item, index) => {
              const phase = flipState[index] ?? "idle";
              const flipped = phase !== "idle";

              return (
                <div
                  key={item.title}
                  className="group relative z-[1] h-[400px] min-w-[230px] [perspective:1200px] md:h-[480px] md:min-w-0"
                  style={{ perspective: "1200px" }}
                  tabIndex={0}
                >
                  <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full rounded-2xl border border-white/20 transform-gpu"
                    style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", willChange: "transform" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden rounded-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg) translateZ(1px)",
                        WebkitTransform: "rotateY(0deg) translateZ(1px)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.62)_100%)]" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_34%,rgba(255,255,255,0.16)_52%,rgba(255,255,255,0)_72%,rgba(255,255,255,0.08)_100%)]" />
                      <div className="absolute bottom-0 left-0 w-full p-7 md:p-8">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/56">{String(index + 1).padStart(2, "0")}</p>
                        <p className="mt-1 text-[clamp(1.3rem,2.4vw,1.9rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
                          {item.title}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            flipCard(index);
                          }}
                          className="mt-3 border-b border-white/72 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85"
                        >
                          Découvrir
                        </button>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 rounded-2xl border border-white/18 bg-[linear-gradient(160deg,#050814_0%,#02040a_56%,#000205_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.45)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(1px)",
                        WebkitTransform: "rotateY(180deg) translateZ(1px)",
                      }}
                    >
                      {phase === "logo" ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                          <div className="mb-4 h-px w-20 bg-white/28" />
                          <img
                            src="/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png"
                            alt="Logo Mr Microbe"
                            className="h-auto w-24 object-contain"
                          />
                          <p className="mt-4 text-[clamp(1.4rem,2.2vw,2rem)] font-black uppercase tracking-[-0.03em] text-white">Mr. Microbe</p>
                          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">Creative signature</p>
                          <div className="mt-4 h-px w-20 bg-white/28" />
                          <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.22em] text-[#ff7ec7]">
                            Chargement {String(Math.round(loadingProgress[index] ?? 0)).padStart(2, "0")}%
                          </p>
                          <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-[#ff7ec7]/22 ring-1 ring-[#ff7ec7]/35">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,#ff2fa3_0%,#ff7ec7_55%,#ffd0ea_100%)] shadow-[0_0_14px_rgba(255,71,170,0.75)] transition-[width] duration-75 ease-linear"
                              style={{ width: `${loadingProgress[index] ?? 0}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_38%,rgba(0,0,0,0.55)_100%)] p-4">
                          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                          <div className="pointer-events-none absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-white/8 blur-2xl" />
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">
                              {String(index + 1).padStart(2, "0")} / 04
                            </p>
                            <p className="mt-2 text-[clamp(1.25rem,2.2vw,1.8rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
                              {item.title}
                            </p>
                            <div className="mt-3 h-px w-full bg-white/18" />
                            <p className="mt-4 text-[0.92rem] font-normal leading-relaxed text-white/78">{item.detail}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/60">
                                Signature
                              </span>
                              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/60">
                                Collection
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              resetCard(index);
                            }}
                            className="w-fit border-b border-white/70 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-white/80"
                          >
                            Retour
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

interface DragonItem {
  title: string;
  image: string;
}

interface UiloraDragonScrollProps {
  items?: DragonItem[];
  heroTitle?: string;
  outroTitle?: string;
}

interface GalleryFilmStripProps {
  images?: string[];
  backgroundColor?: string;
  borderColor?: string;
}

function UiloraDragonScroll({
  items = [],
  heroTitle = "Awaken the Dragons",
  outroTitle = "The End of Legends",
}: UiloraDragonScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const workItems = gsap.utils.toArray<HTMLElement>(".uilora-work-item");

      workItems.forEach((item) => {
        const img = item.querySelector(".uilora-img-wrapper");
        const chars = item.querySelectorAll(".uilora-char");

        chars.forEach((char, index) => {
          gsap.fromTo(
            char,
            { y: "125%" },
            {
              y: "0%",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: `top+=${index * 20 - 250} top`,
                end: `top+=${index * 20 - 100} top`,
                scrub: 1,
              },
            }
          );
        });

        if (!img) return;

        gsap.fromTo(
          img,
          { clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "top top",
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          img,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [items]);

  return (
    <div ref={containerRef} className="overflow-x-hidden bg-transparent font-serif text-[#141414]">
      {items.map((item, idx) => (
        <section
          key={idx}
          className={`uilora-work-item relative w-full overflow-hidden md:h-[150vh] ${
            idx === 3 ? "h-[72vh]" : "h-[82vh]"
          }`}
        >
          <div className="uilora-img-wrapper absolute inset-0 h-full w-full will-change-[clip-path]">
            <img
              src={item.image}
              alt={item.title}
              className={`h-full w-full object-cover ${idx === 0 ? "object-[center_24%]" : ""}`}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

function RealisationScrollStack() {
  const dragonData = [
    { title: "Crimson Wyvern", image: realisationImages[0] },
    { title: "Shadow Drakon", image: realisationImages[1] },
    { title: "Azure Flame", image: realisationImages[2] },
    { title: "Obsidian King", image: realisationImages[3] },
  ];

  return <UiloraDragonScroll items={dragonData} heroTitle="Uilora Legends" outroTitle="The Digital Frontier" />;
}

function GalleryFilmStrip({
  images = [
    "/images/Image 1.png",
    "/images/Image 2.png",
    "/images/Image 3.png",
    "/images/Image 4.png",
    "/images/Image 5.png",
    "/images/Image 6.png",
    "/images/Image 7.png",
    "/images/Image 8.png",
    "/images/Image 9.png",
    "/images/Image 10.png",
    "/images/Image 11.png",
    "/images/Image 12.png",
  ],
  backgroundColor = "transparent",
  borderColor = "rgba(255,255,255,0.18)",
}: GalleryFilmStripProps) {
  const { scrollYProgress } = useScroll();
  const x1Raw = useTransform(scrollYProgress, [0, 1], [0, -680]);
  const x2Raw = useTransform(scrollYProgress, [0, 1], [-680, 0]);
  const x1 = useSpring(x1Raw, { stiffness: 85, damping: 22, mass: 0.7 });
  const x2 = useSpring(x2Raw, { stiffness: 85, damping: 22, mass: 0.7 });

  return (
    <div
      className="relative flex flex-col justify-center gap-5 overflow-hidden py-3 md:min-h-screen md:h-[200vh] md:gap-10 md:py-0"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col justify-center gap-5 md:sticky md:top-0 md:h-screen md:gap-12">
        <div
          className="w-full -rotate-3 bg-black/70 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-[1px]"
          style={{ borderTop: `4px solid ${borderColor}`, borderBottom: `4px solid ${borderColor}` }}
        >
          <motion.div style={{ x: x1 }} className="flex w-[220vw] gap-6">
            {[...images, ...images].map((src, i) => (
              <div key={i} className="relative aspect-video w-[26rem] shrink-0 rounded-sm bg-neutral-800">
                <img src={src} className="h-full w-full object-cover opacity-95" alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity hover:opacity-100" />
                <div className="absolute -top-6 left-0 flex h-4 w-full justify-between bg-transparent px-2">
                  {Array(10)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="h-3 w-2 rounded-sm bg-white/20" />
                    ))}
                </div>
                <div className="absolute -bottom-6 left-0 flex h-4 w-full justify-between bg-transparent px-2">
                  {Array(10)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="h-3 w-2 rounded-sm bg-white/20" />
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          className="z-10 w-full rotate-3 bg-black/70 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-[1px]"
          style={{ borderTop: `4px solid ${borderColor}`, borderBottom: `4px solid ${borderColor}` }}
        >
          <motion.div style={{ x: x2 }} className="ml-[-60vw] flex w-[220vw] gap-6">
            {[...images, ...images]
              .reverse()
              .map((src, i) => (
                <div key={i} className="relative aspect-video w-[26rem] shrink-0 rounded-sm bg-neutral-800">
                  <img src={src} className="h-full w-full object-cover opacity-95" alt="" />
                  <div className="absolute -top-6 left-0 flex h-4 w-full justify-between bg-transparent px-2">
                    {Array(10)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="h-3 w-2 rounded-sm bg-white/20" />
                      ))}
                  </div>
                  <div className="absolute -bottom-6 left-0 flex h-4 w-full justify-between bg-transparent px-2">
                    {Array(10)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="h-3 w-2 rounded-sm bg-white/20" />
                      ))}
                  </div>
                </div>
              ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />
      </div>
    </div>
  );
}

function CurveBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f5f5f5]">
      {/* Courbes type plan / esquisse (inspiration éditoriale, pas de contenu) */}
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

function LeftRail() {
  return (
    <aside className="fixed bottom-4 left-6 top-4 z-30 hidden w-52 flex-col justify-between pr-6 lg:flex">
      <nav className="space-y-0.5 pt-6">
        {[
          ["Accueil", "#strategie"],
          ["Collections", "#collections"],
          ["Artiste", "#artiste"],
          ["Immersion", "#immersion"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="block text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#e20074]"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        <div className="space-y-3">
          <img
            src="/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png"
            alt="Logo Mr Microbe"
            className="h-auto w-20 object-contain"
          />
          <div className="space-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e20074]">
            <a
              href="https://www.instagram.com/mrmicrobe.art/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4.1" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>
          <p className="text-4xl font-semibold leading-[0.84] tracking-[-0.06em] text-[#e20074]">
            MR
            <br />
            MICROBE
          </p>
        </div>
        <p className="max-w-full break-all text-[11px] leading-tight text-[#e20074]">mrmicrobe.furgerot@gmail.com</p>
      </div>
    </aside>
  );
}

function MobileMenu({
  open,
  onToggle,
  onClose,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const links = [
    ["Accueil", "#strategie"],
    ["Collections", "#collections"],
    ["Artiste", "#artiste"],
    ["Immersion", "#immersion"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-5 lg:hidden">
        <div className="flex items-end gap-2.5">
          <p className="font-display text-[1.9rem] font-semibold leading-[0.82] tracking-[-0.04em] text-[#0a0a0a]">
            MR
            <br />
            MICROBE
          </p>
          <img
            src="/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png"
            alt="Logo Mr Microbe"
            className="h-auto w-11 object-contain"
          />
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center rounded-full bg-[#0a0a0a] px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <motion.div
        aria-hidden={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-[80] lg:hidden"
      >
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="relative flex h-full flex-col px-7 pb-9 pt-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-end gap-3">
              <p className="font-display text-[2rem] font-semibold leading-[0.82] tracking-[-0.04em] text-white/90">
                MR
                <br />
                MICROBE
              </p>
              <img
                src="/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png"
                alt="Logo Mr Microbe"
                className="h-auto w-12 object-contain"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="border border-white/40 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-white"
            >
              Close
            </button>
          </div>

          <nav className="mt-14 space-y-5">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className="font-display block text-[clamp(2.4rem,11vw,3.3rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-5 pt-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Socials</p>
              <div className="mt-2 flex items-center gap-3 text-[1.9rem] font-semibold leading-none">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4.1" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                <p>Instagram</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Inquiries</p>
              <p className="mt-2 break-all text-[1.3rem] font-semibold leading-tight">mrmicrobe.furgerot@gmail.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

const preloaderLogoSrc = "/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png";

function Preloader({ done, progress, splitting }: { done: boolean; progress: number; splitting: boolean }) {
  const [isLiteMode, setIsLiteMode] = useState(false);
  const splitOpen = splitting && !done;
  const introPhase = !splitting && !done;
  const firstBeat = introPhase && progress < 58;
  const tiles = Array.from({ length: isLiteMode ? 16 : 34 }, (_, i) => i);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px), (prefers-reduced-motion: reduce)");
    const sync = () => setIsLiteMode(mq.matches);
    sync();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  const worldAgents = useMemo(
    () =>
      Array.from({ length: isLiteMode ? 6 : 16 }, (_, i) => {
        const angle = ((i * 2.3999632297) % 1) * Math.PI * 2;
        const dist = 18 + (i % 6) * 7;
        const left = 50 + Math.cos(angle) * dist;
        const top = 50 + Math.sin(angle) * dist * 0.82;
        return {
          id: i,
          left: `${left.toFixed(4)}%`,
          top: `${top.toFixed(4)}%`,
          size: `${(38 + (i % 5) * 8).toFixed(0)}px`,
          half: `${(-19 - (i % 5) * 4).toFixed(0)}px`,
          x: Number((Math.cos(angle) * (220 + (i % 4) * 36)).toFixed(2)),
          y: Number((Math.sin(angle) * (220 + (i % 4) * 34)).toFixed(2)),
          rotate: (i * 41) % 360,
          delay: i * 0.035,
        };
      }),
    [isLiteMode]
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
        filter: done ? "blur(10px)" : "blur(0px)",
        scale: done ? 1.04 : 1,
      }}
      transition={{
        opacity: { duration: 0.42, delay: done ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.5, delay: done ? 0.02 : 0, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[90] bg-[#f5f5f5]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 62% at 50% 42%, rgba(255,255,255,0.92) 0%, rgba(255,244,250,0.82) 34%, rgba(248,224,239,0.52) 62%, transparent 88%)",
        }}
        animate={{
          opacity: done ? 0 : firstBeat ? [0.88, 1, 0.92] : splitOpen ? [0.56, 0.3, 0.08, 0] : 0.74,
          scale: firstBeat ? [0.98, 1.01, 1] : 1,
        }}
        transition={{
          duration: firstBeat ? 0.55 : splitOpen ? 0.85 : 0.35,
          repeat: firstBeat ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: splitOpen
            ? "radial-gradient(120% 90% at 50% 50%, #ffe8f4 0%, #ffd4ea 36%, #f7b4dc 62%, #f2a1d2 100%)"
            : "radial-gradient(120% 90% at 50% 50%, #f5f5f6 0%, #ebebed 52%, #e5e5e8 100%)",
        }}
        transition={{ duration: splitOpen ? 0.65 : 0.35, ease: "easeOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.58),transparent)]"
        animate={{
          x: done ? "180%" : firstBeat ? ["-24%", "80%", "165%"] : splitOpen ? ["-10%", "130%"] : ["-8%", "205%"],
          opacity: done ? 0 : firstBeat ? [0, 0.55, 0] : splitOpen ? [0.12, 0] : [0, 0.26, 0],
        }}
        transition={{
          duration: firstBeat ? 0.95 : splitOpen ? 0.7 : 2,
          repeat: firstBeat || splitOpen || done ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,10,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.09) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ backgroundPosition: done ? "0px -140px" : ["0px 0px", "0px -26px", "0px 0px"] }}
        transition={{ duration: done ? 0.5 : 5.2, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,10,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        animate={{ backgroundPosition: done ? "0px -160px" : ["0px 0px", "0px -38px", "0px 0px"] }}
        transition={{ duration: done ? 0.6 : 4.5, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 grid grid-cols-[repeat(10,minmax(0,1fr))] gap-[2px] opacity-35">
        {tiles.map((tile) => (
          <motion.div
            key={`tile-${tile}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 0 : [0.04, 0.14, 0.04] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (tile % 10) * 0.03 + Math.floor(tile / 10) * 0.02,
            }}
            className="bg-white/20"
          />
        ))}
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 52% at 50% 48%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 44%, transparent 72%)",
        }}
        animate={{ opacity: done ? 0 : splitOpen ? [0.4, 0.2, 0.05, 0] : [0.44, 0.56, 0.44] }}
        transition={{ duration: splitOpen ? 0.75 : 2.6, repeat: splitOpen || done ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: splitOpen ? [0.08, 0.62, 0.95, 0.52, 0] : done ? 0 : [0.04, 0.1, 0.04],
          scale: splitOpen ? [1, 1.2, 1.9, 2.8] : done ? 1 : [1, 1.04, 1],
        }}
        transition={{
          duration: splitOpen ? 0.95 : done ? 0.25 : 2.2,
          delay: splitOpen ? 0 : done ? 0 : 0,
          repeat: splitOpen || done ? 0 : Infinity,
          ease: splitOpen ? [0.19, 0.84, 0.32, 1] : "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(226,0,116,0.55) 0%, rgba(255,80,160,0.42) 22%, rgba(255,255,255,0.72) 40%, rgba(255,200,230,0.35) 55%, transparent 72%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{
          opacity: splitOpen ? [0, 0.42, 0.88, 0.54, 0] : 0,
        }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 58% 48% at 50% 48%, rgba(226,0,116,0.82) 0%, rgba(255,120,190,0.28) 40%, transparent 70%)",
        }}
      />

      <motion.div
        aria-hidden
        initial={{ x: "-38%", opacity: 0 }}
        animate={done ? { x: "140%", opacity: [0, 0.65, 0] } : { x: ["-38%", "122%"], opacity: [0, 0.3, 0] }}
        transition={{ duration: done ? 0.45 : 1.8, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-0 top-1/2 h-px w-[28vw] bg-[linear-gradient(90deg,transparent,rgba(10,10,10,0.42),transparent)] md:w-[18vw]"
      />

      {/* Monde microbe premium: environnement volumétrique au moment du split */}
      <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
        {!isLiteMode && (
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "repeating-radial-gradient(circle at 50% 50%, rgba(255,155,214,0.32) 0%, rgba(255,155,214,0.32) 2.5%, rgba(226,0,116,0.2) 4.5%, rgba(32,7,24,0.2) 7%, rgba(18,4,12,0) 10.5%)",
              filter: "blur(0.35px)",
            }}
            animate={{
              opacity: splitOpen ? [0, 0.42, 0.75, 0.9, 0.42, 0] : 0,
              scale: splitOpen ? [0.8, 1.05, 1.45, 2.25] : 1,
              rotate: splitOpen ? [0, 8, 18] : 0,
            }}
            transition={{
              duration: isLiteMode ? 1.0 : 1.4,
              delay: splitOpen ? (isLiteMode ? 0.52 : 0.95) : 0,
              ease: [0.22, 0.88, 0.32, 1],
            }}
          />
        )}

        {!isLiteMode && (
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(10,2,8,0) 0%, rgba(25,6,18,0.18) 34%, rgba(30,7,22,0.46) 56%, rgba(18,4,12,0.82) 100%)",
            }}
            animate={{
              opacity: splitOpen ? [0, 0.35, 0.62, 0.86, 0.55, 0] : 0,
              scale: splitOpen ? [0.95, 1.12, 1.32] : 1,
            }}
            transition={{
              duration: isLiteMode ? 0.95 : 1.3,
              delay: splitOpen ? (isLiteMode ? 0.5 : 0.92) : 0,
              ease: [0.22, 0.72, 0.22, 1],
            }}
          />
        )}

        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: splitOpen ? [0, 0.65, 0.9, 0.35, 0] : 0,
          }}
          transition={{
            duration: isLiteMode ? 1.05 : 1.45,
            delay: splitOpen ? (isLiteMode ? 0.52 : 0.88) : 0,
            ease: [0.22, 0.72, 0.22, 1],
          }}
        >
          <motion.div
            className="aspect-square w-[18vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(18,4,12,0.96) 0%, rgba(42,8,26,0.95) 20%, rgba(226,0,116,0.62) 36%, rgba(255,160,220,0.24) 56%, transparent 76%)",
              boxShadow: "0 0 120px rgba(226,0,116,0.5), 0 0 220px rgba(255,170,225,0.26)",
            }}
            animate={{
              scale: splitOpen ? [0.55, 2.2, 6.2, 10.8] : 0.55,
              opacity: splitOpen ? [0, 1, 1, 0.5, 0] : 0,
            }}
            transition={{
              duration: isLiteMode ? 1.05 : 1.45,
              delay: splitOpen ? (isLiteMode ? 0.52 : 0.88) : 0,
              ease: [0.22, 0.72, 0.22, 1],
            }}
          />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 86% 74% at 50% 44%, rgba(255,185,222,0.52) 0%, rgba(255,236,247,0.35) 36%, rgba(35,8,28,0.58) 68%, rgba(14,4,12,0.9) 100%)",
          }}
          animate={{
            opacity: done ? 0 : splitOpen ? [0, 0.54, 0.86, 0.65, 0] : 0,
            scale: splitOpen ? [0.92, 1.05, 1.22] : 1,
          }}
          transition={{
            duration: splitOpen ? (isLiteMode ? 1.15 : 1.45) : 0.2,
            delay: splitOpen ? (isLiteMode ? 0.5 : 0.9) : 0,
            ease: [0.22, 0.72, 0.22, 1],
          }}
        />
        {worldAgents.map((m) => (
          <motion.img
            key={`agent-${m.id}`}
            src={preloaderLogoSrc}
            alt=""
            draggable={false}
            className="pointer-events-none absolute object-contain opacity-0"
            style={{
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              marginLeft: m.half,
              marginTop: m.half,
              filter: "blur(0.7px)",
            }}
            animate={
              done
                ? { opacity: 0, scale: 0 }
                : splitOpen
                  ? {
                      opacity: [0, 0.78, 0.55, 0],
                      scale: [0.35, 2.35, 4.8],
                      x: [0, m.x * 0.2, m.x * 1.15],
                      y: [0, m.y * 0.2, m.y * 1.15],
                      rotate: [m.rotate, m.rotate + 36, m.rotate - 18],
                    }
                  : { opacity: 0, scale: 0.3, x: 0, y: 0, rotate: m.rotate }
            }
            transition={
              splitOpen
                ? {
                    duration: isLiteMode ? 1.15 : 1.75,
                    delay: (isLiteMode ? 0.4 : 0.98) + m.delay * (isLiteMode ? 0.22 : 0.42),
                    ease: [0.22, 0.72, 0.22, 1],
                  }
                : { duration: 0.2 }
            }
          />
        ))}
      </div>

      <div className="relative z-[5] flex h-full flex-col items-center justify-center gap-6 px-6">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[18vh] w-[18vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e20074]/45 shadow-[0_0_48px_rgba(226,0,116,0.34)]"
          animate={{
            opacity: splitOpen ? [0.2, 0.92, 0.65, 0] : done ? 0 : [0.08, 0.2, 0.08],
            scale: splitOpen ? [1, 2, 4.8] : done ? 1 : [1, 1.04, 1],
          }}
          transition={{
            duration: splitOpen ? 0.95 : done ? 0.25 : 2.4,
            delay: splitOpen ? 0 : done ? 0 : 0,
            repeat: splitOpen || done ? 0 : Infinity,
            ease: splitOpen ? [0.19, 0.84, 0.32, 1] : "easeInOut",
          }}
        />

        {/* Logo premium : entrée caméra puis ouverture 4 volets */}
        <div
          className="relative flex items-center justify-center [perspective:1200px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.86, rotateX: 8 }}
            animate={{
              opacity: done ? 0 : 1,
              y: splitOpen ? -4 : introPhase ? [0, -3, 0] : 0,
              rotateX: splitOpen ? [7, 3, 0, -1.5] : introPhase ? [8, 5, 7, 5] : 8,
              rotateY: splitOpen ? [0, -2.5, 0] : introPhase ? [0, 1.2, -1.2, 0] : 0,
              z: splitOpen ? [0, 110, 210] : introPhase ? [0, 22, 0] : 0,
              scale: splitOpen ? [1, 1.12, 1.04] : introPhase ? [1, 1.018, 0.998, 1.012, 1] : 1,
            }}
            transition={{
              opacity: { duration: 0.42, delay: done ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] },
              y: splitOpen
                ? { duration: 0.95, ease: [0.2, 0.88, 0.35, 1] }
                : { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
              rotateX: splitOpen
                ? { duration: 0.95, ease: [0.2, 0.9, 0.33, 1] }
                : { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
              rotateY: splitOpen
                ? { duration: 0.95, ease: [0.2, 0.9, 0.33, 1] }
                : { duration: 6.6, repeat: Infinity, ease: "easeInOut" },
              z: splitOpen
                ? { duration: 0.85, ease: [0.18, 0.92, 0.32, 1] }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" },
              scale: splitOpen
                ? { duration: 0.9, times: [0, 0.42, 1], ease: [0.2, 0.9, 0.34, 1] }
                : { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative h-[82vw] w-[82vw] max-h-[700px] max-w-[700px] md:h-[58vw] md:w-[58vw] md:max-h-[820px] md:max-w-[820px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                opacity: splitOpen ? [0, 0.92, 0.56, 0.16, 0] : 0,
              }}
              transition={{
                duration: isLiteMode ? 0.92 : 1.2,
                delay: splitOpen ? (isLiteMode ? 0.46 : 0.78) : 0,
                ease: [0.22, 0.72, 0.22, 1],
              }}
            >
              <motion.div
                className="aspect-square w-[18%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,140,200,0.55) 38%, rgba(226,0,116,0.35) 58%, transparent 72%)",
                  boxShadow: "0 0 120px rgba(226,0,116,0.55), 0 0 220px rgba(255,255,255,0.25)",
                }}
                animate={{
                  scale: splitOpen ? [0.12, 1.25, 8.2, 12.2] : 0.12,
                  opacity: splitOpen ? [0, 0.9, 0.95, 0.35, 0] : 0,
                }}
                transition={{
                  duration: isLiteMode ? 0.98 : 1.25,
                  delay: splitOpen ? (isLiteMode ? 0.44 : 0.76) : 0,
                  ease: [0.22, 0.72, 0.22, 1],
                }}
              />
            </motion.div>

            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              {(
                [
                  {
                    key: "tl",
                    clipPath: "inset(0 50% 50% 0)",
                    x: "calc(-1 * min(46vw, 420px))",
                    y: "calc(-1 * min(42vw, 380px))",
                    rotate: -18,
                    rotateX: 14,
                    rotateY: -9,
                    z: 80,
                    delay: 0.08,
                    origin: "100% 100%",
                  },
                  {
                    key: "tr",
                    clipPath: "inset(0 0 50% 50%)",
                    x: "min(46vw, 420px)",
                    y: "calc(-1 * min(42vw, 380px))",
                    rotate: 18,
                    rotateX: 14,
                    rotateY: 9,
                    z: 80,
                    delay: 0.16,
                    origin: "0% 100%",
                  },
                  {
                    key: "bl",
                    clipPath: "inset(50% 50% 0 0)",
                    x: "calc(-1 * min(46vw, 420px))",
                    y: "min(42vw, 380px)",
                    rotate: 16,
                    rotateX: -12,
                    rotateY: -9,
                    z: 80,
                    delay: 0.24,
                    origin: "100% 0%",
                  },
                  {
                    key: "br",
                    clipPath: "inset(50% 0 0 50%)",
                    x: "min(46vw, 420px)",
                    y: "min(42vw, 380px)",
                    rotate: -16,
                    rotateX: -12,
                    rotateY: 9,
                    z: 80,
                    delay: 0.34,
                    origin: "0% 0%",
                  },
                ] as const
              ).map((piece) => (
                <motion.div
                  key={piece.key}
                  className="absolute inset-0 will-change-transform"
                  style={{
                    clipPath: piece.clipPath,
                    transformOrigin: piece.origin,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    x: splitOpen ? piece.x : 0,
                    y: splitOpen ? piece.y : 0,
                    rotate: splitOpen ? piece.rotate : 0,
                    rotateX: splitOpen ? piece.rotateX : 0,
                    rotateY: splitOpen ? piece.rotateY : 0,
                    z: splitOpen ? piece.z : 0,
                    scale: splitOpen ? [1, 1.04, 1.06] : 1,
                    opacity: splitOpen ? [1, 1, 0.97, 0.7, 0] : 1,
                    filter: splitOpen
                      ? ["blur(0px)", "blur(0px)", "blur(0.8px)", "blur(2px)", "blur(3px)"]
                      : "blur(0px) drop-shadow(0 16px 48px rgba(226,0,116,0.28)) drop-shadow(0 4px 20px rgba(236,72,153,0.18))",
                  }}
                  transition={{
                    duration: isLiteMode ? 1.12 : 1.35,
                    delay: splitOpen ? (isLiteMode ? piece.delay * 0.65 : piece.delay * 0.82) : 0,
                    ease: [0.22, 0.72, 0.22, 1],
                    scale: {
                      duration: isLiteMode ? 1.12 : 1.35,
                      delay: splitOpen ? (isLiteMode ? piece.delay * 0.65 : piece.delay * 0.82) : 0,
                      times: [0, 0.6, 1],
                    },
                    filter: {
                      duration: isLiteMode ? 1.12 : 1.35,
                      delay: splitOpen ? (isLiteMode ? piece.delay * 0.65 : piece.delay * 0.82) : 0,
                    },
                    opacity: {
                      duration: isLiteMode ? 1.12 : 1.35,
                      delay: splitOpen ? (isLiteMode ? piece.delay * 0.65 : piece.delay * 0.82) : 0,
                      times: [0, 0.45, 0.72, 0.88, 1],
                    },
                  }}
                >
                  <img
                    src={preloaderLogoSrc}
                    alt="Logo Mr Microbe"
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ width: 0, opacity: 0.15 }}
          animate={{
            width: `${Math.max(8, progress)}%`,
            opacity: splitting || done ? 0 : 0.45,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-[2px] max-w-[520px] bg-gradient-to-r from-[#0a0a0a]/50 via-[#e20074]/55 to-[#0a0a0a]/50"
        />
      </div>
    </motion.div>
  );
}

function MicrobeCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateFromClient = (clientX: number, clientY: number) => {
      setPos({ x: clientX, y: clientY });
      setVisible(true);
    };

    const onMove = (event: MouseEvent) => updateFromClient(event.clientX, event.clientY);

    const onTouch = (event: TouchEvent) => {
      const t = event.touches[0];
      if (t) updateFromClient(t.clientX, t.clientY);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncBodyCursor = () => {
      if (mq.matches) document.body.classList.add("custom-cursor-microbe");
      else document.body.classList.remove("custom-cursor-microbe");
    };
    syncBodyCursor();
    mq.addEventListener("change", syncBodyCursor);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
      mq.removeEventListener("change", syncBodyCursor);
      document.body.classList.remove("custom-cursor-microbe");
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.88 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      className="pointer-events-none fixed z-[95]"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <img
        src={preloaderLogoSrc}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className="h-12 w-12 select-none object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)]"
      />
    </motion.div>
  );
}

interface GalleryDiagonalMarqueeProps {
  row1Images?: string[];
  row2Images?: string[];
  row3Images?: string[];
  backgroundColor?: string;
  badgePrefix?: string;
}

function GalleryDiagonalMarquee({
  row1Images = [
    publicGalleryImages[6],
    publicGalleryImages[1],
    publicGalleryImages[2],
    publicGalleryImages[3],
    publicGalleryImages[4],
    publicGalleryImages[5],
    publicGalleryImages[0],
    publicGalleryImages[0],
    publicGalleryImages[1],
    publicGalleryImages[2],
  ],
  row2Images = [
    publicGalleryImages[3],
    publicGalleryImages[4],
    publicGalleryImages[5],
    publicGalleryImages[6],
    publicGalleryImages[0],
    publicGalleryImages[1],
    publicGalleryImages[2],
    publicGalleryImages[3],
    publicGalleryImages[4],
    publicGalleryImages[5],
  ],
  row3Images = [
    publicGalleryImages[6],
    publicGalleryImages[5],
    publicGalleryImages[4],
    publicGalleryImages[3],
    publicGalleryImages[2],
    publicGalleryImages[1],
    publicGalleryImages[6],
    publicGalleryImages[0],
    publicGalleryImages[5],
    publicGalleryImages[4],
  ],
  backgroundColor = "transparent",
  badgePrefix = "U",
}: GalleryDiagonalMarqueeProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden" style={{ backgroundColor }}>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-multiply" />

      <div className="mb-8 ml-[-10%] w-[120%] -rotate-6">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8"
        >
          {[...row1Images, ...row1Images].map((img, i) => (
            <div key={`r1-${i}`} className="group relative h-64 w-96 shrink-0 overflow-hidden bg-black">
              <img
                src={img}
                alt={`Portrait ${i + 1}`}
                className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              <div className="absolute right-2 top-2 bg-yellow-400 px-2 text-xs font-bold text-black">
                {badgePrefix}-{i}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mb-8 ml-[-10%] w-[120%] rotate-3">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-8"
        >
          {[...row2Images, ...row2Images].map((img, i) => (
            <div
              key={`r2-${i}`}
              className="group relative h-80 w-80 shrink-0 overflow-hidden rounded-full border-4 border-white bg-black"
            >
              <img
                src={img}
                alt={`Street ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="ml-[-10%] w-[120%] -rotate-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex gap-8"
        >
          {[...row3Images, ...row3Images].map((img, i) => (
            <div key={`r3-${i}`} className="group relative h-64 w-96 shrink-0 overflow-hidden bg-black">
              <img
                src={img}
                alt={`Editorial ${i + 1}`}
                className="h-full w-full object-cover invert transition-all duration-300 group-hover:invert-0"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const collectionShowcaseItems = [
  { title: "Les toiles", subtitle: "Pièces fondatrices de la collection, entre matiere et contraste." },
  { title: "Les petites", subtitle: "Formats compacts, précis  et impactants pour des espaces intimes." },
  { title: "Les moyennes", subtitle: "Un équilibre net entre présence visuelle et intégration du lieu." },
  { title: "Le monocycle", subtitle: "Une silhouette  singulière, avec un langage sculptural fort." },
  { title: "Les grands formats", subtitle: "Pièces monumentales pensées pour une immersion complète." },
  { title: "Luminaire", subtitle: "Des créations lumineuses qui prolongent la narration de la collection." },
  { title: "Bijoux d'art", subtitle: "Objets précieux aux finitions fines, signes d'une écriture d'auteur." },
] as const;

function useIsMobileCollectionsViewport() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isMobile;
}

function CollectionsShowcaseRow({
  item,
  index,
  isMobile,
  isScrollActive,
  domRef,
  onActivate,
}: {
  item: (typeof collectionShowcaseItems)[number];
  index: number;
  isMobile: boolean;
  isScrollActive: boolean;
  domRef: (el: HTMLDivElement | null) => void;
  onActivate: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const isPink = (isMobile && isScrollActive) || (!isMobile && isHover);

  return (
    <motion.div
      ref={domRef}
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={!isMobile ? { x: 6 } : undefined}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => onActivate()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={`group relative grid cursor-pointer items-center gap-7 border-b border-[#0a0a0a]/10 px-4 py-10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e20074]/55 focus-visible:ring-offset-2 md:min-h-[182px] md:grid-cols-[1.35fr_1fr] md:gap-12 md:px-10 md:py-12 ${
        isPink
          ? "bg-[linear-gradient(118deg,rgba(226,0,116,0.94)_0%,rgba(196,0,98,0.9)_48%,rgba(120,0,60,0.9)_100%)]"
          : ""
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_38%,rgba(255,255,255,0.11)_52%,transparent_66%,transparent_100%)] transition-opacity duration-500 ${
          isPink ? "opacity-100" : "opacity-0"
        }`}
      />
      <p
        className={`text-[clamp(1.7rem,3.8vw,4.05rem)] font-normal uppercase leading-[0.9] tracking-[-0.03em] transition duration-300 ${
          isPink ? "translate-x-1 text-white/96" : "text-[#0a0a0a]/94"
        }`}
      >
        {item.title}
      </p>
      <p
        className={`max-w-[46ch] text-[clamp(0.9rem,1.08vw,1.16rem)] font-normal leading-[1.5] tracking-[0.01em] transition-colors duration-300 ${
          isPink ? "text-white/72" : "text-[#0a0a0a]/62"
        }`}
      >
        {item.subtitle}
      </p>
      <div
        className={`pointer-events-none absolute bottom-4 flex items-end gap-2 transition duration-300 max-md:left-1/2 max-md:-translate-x-1/2 md:left-[40%] ${
          isPink ? "opacity-100 md:translate-x-1" : isMobile ? "opacity-0" : "opacity-55"
        }`}
      >
        <span
          className={`h-[1px] transition-all duration-300 ${isPink ? "w-20 bg-white/72" : "w-14 bg-white/0"}`}
        />
        <span className={`text-[1.3rem] leading-none transition duration-300 ${isPink ? "text-white/82" : "text-white/0"}`}>
          ↘
        </span>
      </div>
    </motion.div>
  );
}

function CollectionsShowcaseList({
  isMobile,
  onSelectCollection,
}: {
  isMobile: boolean;
  onSelectCollection: (title: (typeof collectionShowcaseItems)[number]["title"]) => void;
}) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);

  const updateClosestToCenter = useCallback(() => {
    if (!isMobile) return;
    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const rowCenterY = rect.top + rect.height / 2;
      const dist = Math.abs(rowCenterY - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveScrollIndex((prev) => (prev === best ? prev : best));
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    updateClosestToCenter();
    const onScrollOrResize = () => updateClosestToCenter();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isMobile, updateClosestToCenter]);

  return (
    <>
      {collectionShowcaseItems.map((item, index) => (
        <CollectionsShowcaseRow
          key={item.title}
          item={item}
          index={index}
          isMobile={isMobile}
          isScrollActive={isMobile && activeScrollIndex === index}
          onActivate={() => onSelectCollection(item.title)}
          domRef={(el) => {
            rowRefs.current[index] = el;
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [splashSplitting, setSplashSplitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [infoIndex, setInfoIndex] = useState(0);
  const [contactStep, setContactStep] = useState(1);
  const [immersionStepIndex, setImmersionStepIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileEntry, setIsMobileEntry] = useState(false);
  const isMobileCollections = useIsMobileCollectionsViewport();

  const openCollectionGallery = useCallback(
    (title: (typeof collectionShowcaseItems)[number]["title"]) => {
      router.push(`/realisations?collection=${collectionSlugFromTitle(title)}`);
    },
    [router]
  );
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.15], [0, 80]);
  const globalParallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -32]), { stiffness: 55, damping: 28 });
  const strategyY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 0]), { stiffness: 85, damping: 22 });
  const accueilY = useSpring(useTransform(scrollYProgress, [0.15, 0.36], [36, -24]), { stiffness: 80, damping: 24 });
  const collectionsY = useSpring(useTransform(scrollYProgress, [0.32, 0.58], [36, -20]), { stiffness: 80, damping: 24 });
  const artisteY = useSpring(useTransform(scrollYProgress, [0.52, 0.76], [30, -18]), { stiffness: 78, damping: 24 });
  const contactY = useSpring(useTransform(scrollYProgress, [0.84, 1], [24, 0]), { stiffness: 72, damping: 24 });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const sync = () => setIsMobileEntry(mq.matches);
    sync();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  useEffect(() => {
    const compactEntry = window.matchMedia("(max-width: 1280px), (prefers-reduced-motion: reduce)").matches;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const step = compactEntry ? (prev < 60 ? 7 : prev < 90 ? 4 : 3) : prev < 60 ? 5 : prev < 90 ? 3 : 2;
        return Math.min(100, prev + step);
      });
    }, compactEntry ? 36 : 44);

    const introEnd = setTimeout(() => {
      setProgress(100);
      setSplashSplitting(true);
    }, compactEntry ? 980 : 1180);

    const revealSite = setTimeout(() => {
      setReady(true);
    }, compactEntry ? 2700 : 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(introEnd);
      clearTimeout(revealSite);
    };
  }, []);

  useEffect(() => {
    const infoTimer = setInterval(() => {
      setInfoIndex((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(infoTimer);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const rotatingInfos = [
    "Collections signature, formats vivants et lecture d'espace affutee.",
    "Du brief au mur: projection, selection des pieces et mise en scene finale.",
    "Matiere, contraste, narration: une presence forte sans bruit inutile.",
    "Direction artistique sur mesure pour lieux prives ou recevant du public.",
  ];
  const heroHeadlineLines = [["MR"], ["MICROBE,"], ["DU", "DESSIN"], ["À", "LA"], ["MATI\u00C8RE"]] as const;
  const useLightHeroAnimation = isMobileEntry || Boolean(prefersReducedMotion);

  return (
    <main className="relative min-h-screen scroll-smooth overflow-x-hidden bg-[#f5f5f5] pb-0 text-[#0a0a0a] selection:bg-[#0a0a0a] selection:text-white">
      <Preloader done={ready} progress={progress} splitting={splashSplitting} />
      <CurveBackground />
      <MicrobeCursor />
      <LeftRail />
      <MobileMenu
        open={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen((prev) => !prev)}
        onClose={() => setMobileMenuOpen(false)}
      />
      <motion.div style={{ y: globalParallaxY }} className="relative z-10 lg:ml-[15rem]">
        <motion.section
          id="strategie"
          style={{ y: strategyY }}
          className="snap-start min-h-screen bg-transparent px-6 pb-10 pt-20 md:px-10 md:pt-24"
        >
          <div className="grid min-h-[84vh] gap-10 md:grid-cols-[1fr_1.7fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: scrollEase }}
              className="flex flex-col justify-between gap-8"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#0a0a0a]/50">&nbsp;</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/48">&nbsp;</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.72, ease: scrollEase }}
              className="flex flex-col justify-between gap-1"
            >
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: useLightHeroAnimation ? 0.35 : 0.9, ease: "easeOut" }}
                className="font-display relative max-w-4xl text-[clamp(3.2rem,8.9vw,9rem)] font-black leading-[0.865] tracking-[-0.06em] text-[#0a0a0a]"
              >
                <span className="relative z-[1] block">
                  {heroHeadlineLines.map((line, lineIndex) => (
                    <span
                      key={`hero-line-${lineIndex}`}
                      className={`block ${
                        lineIndex >= heroHeadlineLines.length - 1
                          ? "pt-[0.062em]"
                          : lineIndex === 2
                            ? "mb-[0.085em]"
                            : lineIndex === 3
                              ? "mb-[0.055em] pt-[0.07em]"
                              : "mb-[0.015em]"
                      }`}
                    >
                      {line.map((word, wordIndex) => (
                        <motion.span
                          key={`hero-word-${lineIndex}-${wordIndex}-${word}`}
                          initial={{ opacity: 0, y: useLightHeroAnimation ? 6 : 24 }}
                          animate={
                            ready
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: useLightHeroAnimation ? 6 : 24 }
                          }
                          transition={
                            useLightHeroAnimation
                              ? { duration: 0.18, ease: "easeOut", delay: 0.02 }
                              : { duration: 0.55, ease: "easeOut", delay: 0.15 + lineIndex * 0.18 + wordIndex * 0.1 }
                          }
                          className={`mr-[0.24em] inline-block last:mr-0 ${lineIndex <= 1 ? "text-[#e20074]" : ""}`}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </span>
                <motion.span
                  aria-hidden
                  initial={useLightHeroAnimation ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
                  animate={
                    ready
                      ? useLightHeroAnimation
                        ? { opacity: 1 }
                        : { scaleX: 1, opacity: 1 }
                      : useLightHeroAnimation
                        ? { opacity: 0 }
                        : { scaleX: 0, opacity: 0 }
                  }
                  transition={
                    useLightHeroAnimation
                      ? { duration: 0.18, delay: 0.02, ease: "linear" }
                      : { duration: 0.6, delay: 0.8, ease: "easeOut" }
                  }
                  className="mt-[calc(0.11rem*1.03)] block h-[2px] w-44 origin-left bg-[#0a0a0a]/72"
                />
              </motion.h1>
              <div className="grid gap-6 pt-0 md:grid-cols-[1fr_auto] md:items-end">
                <div />
                <div className="justify-self-end pt-2 md:w-[460px]">
                  <motion.p
                    key={`info-${infoIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: scrollEase }}
                    className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#0a0a0a]/72"
                  >
                    {rotatingInfos[infoIndex]}
                  </motion.p>
                  <div className="mt-2 flex items-center gap-2">
                    {[0, 1, 2, 3].map((idx) => (
                      <span
                        key={`tick-${idx}`}
                        className={`h-px transition-all ${idx === infoIndex ? "w-9 bg-[#0a0a0a]/82" : "w-4 bg-[#0a0a0a]/32"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section
          id="accueil"
          className="relative z-[8] w-screen max-w-[100vw] shrink-0 border-t border-[#0a0a0a]/10 bg-[#0a0a0a] px-0 pb-0 pt-0 lg:-ml-[15rem]"
        >
          <div className="group relative min-h-[100svh] w-full overflow-hidden border-y border-[#0a0a0a]/10">
            <img
              src="/images/Image 111.png"
              alt="Accueil visuel"
              className="absolute inset-0 h-full min-h-[100svh] w-full object-cover object-center transition duration-700 md:hidden"
            />
            <img
              src={heroImages[0]}
              alt="Accueil visuel"
              className="absolute inset-0 hidden h-full min-h-[100svh] w-full object-cover object-center transition duration-700 md:block"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.38)_78%,rgba(0,0,0,0.6)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center md:p-10">
              <h2 className="flex max-w-5xl flex-col items-center gap-[0.22em] text-center font-serif text-[clamp(2.45rem,8vw,7.2rem)] font-semibold leading-[0.95] text-white/78 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                <span className="block">VISION &amp;</span>
                <span className="block">MATI&Egrave;RE</span>
              </h2>
            </div>
          </div>
        </section>

        <section className="relative bg-transparent px-0 pb-2">
          <div className="relative h-12 border-b border-[#0a0a0a]/12">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl leading-none text-[#0a0a0a]/62">↓</span>
          </div>

          <div className="bg-transparent px-6 py-8 md:px-10 md:py-10">
            <h3 className="title-unified mt-3 max-w-6xl font-semibold text-[#0a0a0a]/94">
              Des œuvres sur-mesure pensées pour votre espace.
            </h3>
            <div className="mt-7 grid gap-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="max-w-2xl text-[clamp(0.95rem,2vw,1.35rem)] font-normal leading-relaxed text-[#0a0a0a]/88">
                  Maxime Furgerot accompagne particuliers, collectionneurs et professionnels dans la création de pièces
                  uniques : sculpture, toile, projection dans l&apos;espace, choix du format, implantation et mise en scène
                  finale.
                </p>
                <a
                  href="#contact"
                  className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#0a0a0a]/18 bg-white px-7 py-3 text-[clamp(0.95rem,1.2vw,1.08rem)] font-semibold tracking-[0.06em] text-[#0a0a0a] transition duration-300 hover:-translate-y-0.5 hover:border-[#0a0a0a]/35 hover:shadow-[0_14px_34px_rgba(10,10,10,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/45 focus-visible:ring-offset-2"
                >
                  <span className="pointer-events-none absolute inset-x-3 bottom-1.5 h-[2px] origin-left scale-x-0 bg-[#0a0a0a]/70 transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#0a0a0a] transition-transform duration-300 group-hover:scale-125" />
                  <span className="relative">En savoir plus</span>
                  <span aria-hidden className="relative text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
              <div className="pt-5" />
            </div>
          </div>
        </section>

        <section id="collections" className="bg-transparent py-14">
          <div className="w-screen max-w-[100vw] shrink-0 lg:-ml-[15rem]">
            <div className="space-y-4">
              {["/images/Image 2.png"].map((src, index) => (
                <motion.article
                  key={`${src}-${index}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="group relative overflow-hidden border-y border-[#0a0a0a]/10 bg-[#0a0a0a]"
                >
                  <img
                    src="/images/Image 2 2.png"
                    alt={`Gallery ${index + 1}`}
                    className="block h-[min(88svh,920px)] w-full object-cover object-center transition duration-700 group-hover:scale-[1.02] md:hidden"
                  />
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="hidden h-[min(92svh,980px)] w-full object-cover object-center transition duration-700 group-hover:scale-[1.02] md:block"
                  />
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl px-5 py-4 md:px-10 md:py-6">
            <div className="pointer-events-none absolute inset-0 opacity-16 [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:54px_54px]" />
            <h3 className="title-unified font-display mt-1 font-semibold uppercase text-[#0a0a0a]/96">
              COLLECTIONS
              <br />
              <span className="text-[#e20074]">MR MICROBE</span>
            </h3>

            <div className="mt-12 border-t border-[#0a0a0a]/10">
              <CollectionsShowcaseList isMobile={isMobileCollections} onSelectCollection={openCollectionGallery} />
            </div>

            <div className="mt-[5.5rem] border-t border-[#0a0a0a]/10 pt-14">
              <div className="relative border-b border-[#0a0a0a]/10 pb-7">
                <div className="flex items-end justify-between gap-4">
                  <p className="title-unified font-display font-semibold uppercase text-[#0a0a0a]/96">
                    R&Eacute;ALISATION<span className="text-[#e20074]">S</span>
                  </p>
                </div>
              </div>

              <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 lg:-ml-[7.5rem]">
                <RealisationScrollStack />
              </div>
            </div>

            <div className="relative left-1/2 mt-3 w-screen -translate-x-1/2 md:mt-8 lg:-ml-[7.5rem]">
              <GalleryFilmStrip />
            </div>
          </div>
        </section>

        <section id="artiste" className="bg-transparent px-0 py-4 md:py-10">
          <div className="relative px-6 pb-3 md:px-10 md:pb-6">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:56px_56px]" />
            <h3 className="title-unified font-display relative mt-0 font-semibold uppercase text-[#0a0a0a]/95 md:mt-2">
              Portrait
            </h3>
            <p className="title-unified font-display relative -mt-1 font-semibold uppercase text-[#e20074]">
              MR MICROBE
            </p>
          </div>

          <div className="grid border-y border-[#0a0a0a]/10 lg:relative lg:left-[-15rem] lg:w-[calc(100%+15rem)] lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="group relative min-h-[78vh] overflow-hidden"
            >
              <img
                src={heroImages[2]}
                alt="Maxime Furgerot - portrait urbain"
                className="h-[82vh] w-full object-cover object-[center_35%] transition duration-700 group-hover:scale-[1.02]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="relative min-h-[86vh] overflow-hidden bg-[#0a0a0a] px-7 py-10 text-white md:px-12 md:py-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_44%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,16,0.96)_0%,rgba(2,4,8,0.98)_100%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-14 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:46px_46px]" />
              <motion.div
                aria-hidden
                animate={{ x: ["-120%", "130%"] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-y-0 w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_48%,rgba(255,255,255,0)_100%)] blur-md"
              />

              <div className="relative border-b border-white/14 pb-6">
                <div className="space-y-0 text-[clamp(0.86rem,0.95vw,0.98rem)] font-bold uppercase tracking-[0.06em]">
                  <div className="grid grid-cols-[1fr_auto] border-t border-white/14 py-3.5">
                    <span className="font-sans text-white/52">Nom</span>
                    <span className="font-sans text-white/94">Maxime Furgerot</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] border-t border-white/14 py-3.5">
                    <span className="font-sans text-white/52">Alias</span>
                    <span className="font-sans text-white/94">Mr Microbe</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] border-y border-white/14 py-3.5">
                    <span className="font-sans text-white/52">Style</span>
                    <span className="font-sans text-white/94">Urbain</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-12">
                <h4 className="font-sans text-[clamp(3.5rem,8.6vw,8.8rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-white">
                  Maxime
                  <br />
                  Furgerot
                </h4>
                <p className="mt-6 max-w-3xl text-[clamp(1.03rem,1.32vw,1.24rem)] leading-relaxed text-white/90">{artistStatement}</p>
                <p className="mt-5 max-w-3xl text-[clamp(0.94rem,1.02vw,1.02rem)] leading-[1.75] text-white/74">{artistParagraphs[0]}</p>
              </div>

              <div className="relative mt-12 overflow-hidden border border-white/14">
                <img
                  src="/images/M7_02148.jpg"
                  alt="Univers artistique"
                  className="h-[38vh] w-full object-cover object-[center_10%] transition duration-700"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <ParcoursFlipExperience />

        <section
          id="immersion"
          className="relative overflow-hidden border-y border-[#0a0a0a]/8 bg-[#f8f8f8] px-6 py-16 md:px-10 md:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-100 [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.038)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.032)_1px,transparent_1px)] [background-size:20px_20px,44px_44px,44px_44px]"
            aria-hidden
          />

          <div className="relative z-[1] mx-auto max-w-[1280px]">
            <h2 className="max-w-[44rem] font-sans text-[10px] font-semibold uppercase leading-relaxed tracking-[0.32em] text-[#0a0a0a]/38 md:text-[11px]">
              UNE LECTURE VIVANTE DU LIEU EN TROIS MOUVEMENTS.
            </h2>

            <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-12">
              <div className="relative self-start pl-4 md:pl-5">
                <div
                  className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-[#E91E63]/50"
                  aria-hidden
                />
                <div className="flex flex-col gap-3 md:gap-4">
                  {immersionJourneySteps.map((step, index) => {
                    const active = index === immersionStepIndex;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setImmersionStepIndex(index)}
                        aria-pressed={active}
                        className={`group flex w-full rounded-[24px] border text-left transition-all duration-300 ${
                          active
                            ? "border-transparent bg-[linear-gradient(90deg,#E91E63_0%,#c2185b_52%,#880E4F_100%)] px-5 py-5 shadow-[0_18px_56px_-12px_rgba(233,30,99,0.52)] md:px-7 md:py-6"
                            : "border-[#e5e5e5] bg-white px-5 py-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.12)] hover:border-[#d8d8d8] md:px-7 md:py-6"
                        }`}
                      >
                        <span
                          className={`w-9 shrink-0 pt-0.5 font-sans text-[11px] font-bold tabular-nums tracking-tight md:w-10 md:text-xs ${
                            active ? "text-white" : "text-[#0a0a0a]/40"
                          }`}
                        >
                          {step.id}
                        </span>
                        <div
                          className={`mx-3 w-px shrink-0 self-stretch md:mx-4 ${active ? "bg-white/40" : "bg-[#0a0a0a]/10"}`}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`font-sans text-[clamp(1.12rem,1.55vw,1.52rem)] font-black leading-tight tracking-[-0.02em] ${
                              active ? "text-white" : "text-[#0a0a0a]"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p
                            className={`mt-2 font-sans text-[clamp(0.78rem,0.9vw,0.88rem)] font-normal leading-relaxed ${
                              active ? "text-white/95" : "text-[#4A4A4A]"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                        {active ? (
                          <span
                            className="ml-2 mt-1 inline-flex h-[15px] w-[15px] shrink-0 rounded-[3px] border-2 border-white md:ml-3"
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-visible lg:min-h-[460px]">
                <p
                  className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-[46%] -translate-y-1/2 select-none font-sans text-[clamp(3.2rem,13.5vw,10.5rem)] font-black uppercase leading-none tracking-[-0.04em]"
                  style={{
                    WebkitTextStroke: "1.5px rgba(10,10,10,0.11)",
                    color: "transparent",
                  }}
                  aria-hidden
                >
                  IMMERSION
                </p>

                <div className="relative z-[1] min-h-[320px] overflow-hidden rounded-[26px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.22)] lg:min-h-[460px]">
                  {immersionJourneySteps.map((step, index) => (
                    <img
                      key={step.image}
                      src={step.image}
                      alt={`Etape ${step.id} — ${step.title}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        index === immersionStepIndex ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_40%,rgba(0,0,0,0.48)_70%,rgba(0,0,0,0.76)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 z-[1] px-6 pb-7 pt-20 md:px-9 md:pb-9 md:pt-28">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-white md:text-[11px]">
                      STEP {immersionJourneySteps[immersionStepIndex].id} /{" "}
                      {String(immersionJourneySteps.length).padStart(2, "0")}
                    </p>
                    <p className="mt-2.5 font-sans text-[clamp(1.85rem,4.5vw,3.1rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white">
                      {immersionJourneySteps[immersionStepIndex].title}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {immersionJourneySteps[immersionStepIndex].pills.map((label) => (
                        <span
                          key={label}
                          className="inline-flex rounded-full border border-white/80 bg-black/30 px-3.5 py-2 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-[3px] md:text-[10px]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-[2] h-[7px] bg-[#3d3d3d] md:h-[9px]">
                    <div
                      className="h-full bg-[#E91E63] shadow-[0_0_16px_2px_rgba(233,30,99,0.55),0_0_28px_4px_rgba(233,30,99,0.28)] transition-[width] duration-500 ease-out"
                      style={{
                        width: `${((immersionStepIndex + 1) / immersionJourneySteps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden border-t border-[#0a0a0a]/10 bg-transparent px-6 py-20 md:px-10 md:py-28">
          <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-between"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#0a0a0a]/45">Contact</p>
                <h3 className="font-display mt-4 text-[clamp(3rem,8.6vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.05em] text-[#0a0a0a]">
                  Lancez
                  <br />
                  votre
                  <br />
                  projet.
                </h3>
              </div>

              <div className="mt-14 space-y-8">
                {contactInfos.slice(0, 2).map((entry) => {
                  const [label, value] = entry.split(": ");
                  return (
                    <div key={entry} className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0a0a0a]/15 text-[13px] text-[#0a0a0a]/65">
                        {label === "Email" ? "@" : "☎"}
                      </span>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#0a0a0a]/40">{label}</p>
                        <p className="mt-1 text-[clamp(1.05rem,1.65vw,1.8rem)] font-semibold text-[#0a0a0a]/88">{value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="border border-[#0a0a0a]/10 bg-white/35 p-8 backdrop-blur-[1px] md:p-12"
            >
              <h4 className="font-display text-[clamp(2.5rem,5vw,4.1rem)] font-black leading-[0.95] tracking-[-0.03em] text-[#0a0a0a]/92">
              Imaginez votre Microbe
              </h4>
              <p className="mt-3 text-[clamp(1rem,1.2vw,1.35rem)] text-[#0a0a0a]/62">
              Formulaire complet pour cadrer précisément votre demande.
              </p>

              <div className="mt-7">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={`contact-step-dot-${step}`}
                      className={`h-3 rounded-full transition-all ${
                        contactStep === step ? "w-10 bg-[#0a0a0a]/78" : "w-3 bg-[#0a0a0a]/18"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[11px] font-black uppercase tracking-[0.26em] text-[#0a0a0a]/58">Etape {contactStep} / 3</p>
              </div>

              {contactStep === 1 && (
                <>
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Nom complet</span>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/82 placeholder:text-[#0a0a0a]/34 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Email</span>
                      <input
                        type="email"
                        placeholder="vous@email.com"
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/82 placeholder:text-[#0a0a0a]/34 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Telephone</span>
                      <input
                        type="text"
                        placeholder="+33..."
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/82 placeholder:text-[#0a0a0a]/34 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Ville</span>
                      <input
                        type="text"
                        placeholder="Paris, Lyon..."
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/82 placeholder:text-[#0a0a0a]/34 focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="mt-9 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setContactStep(2)}
                      className="inline-flex items-center gap-3 bg-[#0a0a0a] px-8 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-[#0a0a0a]/85"
                    >
                      Suivant
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </>
              )}

              {contactStep === 2 && (
                <>
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Budget estime</span>
                      <select className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/90 focus:outline-none">
                        <option>Moins de 2 000 EUR</option>
                        <option>2 000 - 5 000 EUR</option>
                        <option>5 000 - 10 000 EUR</option>
                        <option>10 000 EUR et plus</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Collection d&apos;interet</span>
                      <select className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/90 focus:outline-none">
                        <option>Les toiles</option>
                        <option>Les petits</option>
                        <option>Les moyens</option>
                        <option>Grands formats</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Objectif</span>
                      <select className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/90 focus:outline-none">
                        <option>Acquerir une oeuvre existante</option>
                        <option>Commander une creation sur mesure</option>
                        <option>Concevoir une immersion complete</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Dimensions du mur (cm)</span>
                      <input
                        type="text"
                        placeholder="Ex: 280 x 240"
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/82 placeholder:text-[#0a0a0a]/34 focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="mt-9 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setContactStep(1)}
                      className="inline-flex items-center border border-[#0a0a0a]/18 bg-white/35 px-8 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#0a0a0a]/75 transition hover:bg-white/55"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactStep(3)}
                      className="inline-flex items-center gap-3 bg-[#0a0a0a] px-8 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-[#0a0a0a]/85"
                    >
                      Suivant
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </>
              )}

              {contactStep === 3 && (
                <>
                  <div className="mt-7 grid gap-5">
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Delai souhaite</span>
                      <select className="w-full border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] text-[#0a0a0a]/90 focus:outline-none">
                        <option>Des que possible</option>
                        <option>Sous 1 mois</option>
                        <option>Sous 2 a 3 mois</option>
                        <option>Plus tard</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/42">Message</span>
                      <textarea
                        rows={4}
                        placeholder="Parlez-nous de l'ambiance souhaitee, des couleurs, de la piece, des contraintes techniques et de votre coup de coeur..."
                        className="w-full resize-none border-b border-[#0a0a0a]/20 bg-transparent pb-3 text-[clamp(1rem,1.18vw,1.45rem)] leading-[1.45] text-[#0a0a0a]/82 placeholder:text-[#0a0a0a]/34 focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="mt-9 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setContactStep(2)}
                      className="inline-flex items-center border border-[#0a0a0a]/18 bg-white/35 px-8 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#0a0a0a]/75 transition hover:bg-white/55"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-3 bg-[#0a0a0a] px-8 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-[#0a0a0a]/85"
                    >
                      Envoyer la demande
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="border-t border-[#0a0a0a]/10">
          <GalleryDiagonalMarquee />
        </section>

        <footer className="mb-0 border-t border-[#0a0a0a]/10 bg-white px-6 pb-0 pt-3 md:px-10 md:pt-3">
          <div className="mx-auto flex w-full max-w-[1280px] justify-center md:justify-end">
            <nav className="flex min-h-[34px] flex-nowrap items-center justify-center gap-x-1.5 pb-0 text-center text-[9px] leading-none text-[#0a0a0a]/55 sm:gap-x-2 sm:text-[10px] md:justify-start md:gap-4 md:text-left md:text-[12px] md:leading-normal">
              <a href="/faq" className="transition-colors hover:text-[#0a0a0a]/82">
                FAQ
              </a>
              <span className="text-[#0a0a0a]/35">|</span>
              <a href="/mentions-legales" className="transition-colors hover:text-[#0a0a0a]/82">
                Mentions légales
              </a>
              <span className="text-[#0a0a0a]/35">|</span>
              <a href="/politique-de-confidentialite" className="transition-colors hover:text-[#0a0a0a]/82">
                Politique de confidentialité
              </a>
              <span className="text-[#0a0a0a]/35">|</span>
              <a href="/cookies" className="transition-colors hover:text-[#0a0a0a]/82">
                Cookies
              </a>
            </nav>
          </div>
        </footer>

      </motion.div>
    </main>
  );
}
