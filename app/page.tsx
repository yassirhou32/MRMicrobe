"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const immersionSteps = [
  {
    id: "01",
    title: "Brief",
    text: "Lecture du lieu, des intentions, des dimensions et du budget.",
  },
  {
    id: "02",
    title: "Selection",
    text: "Proposition de pieces et d'axes artistiques adaptes.",
  },
  {
    id: "03",
    title: "Projection",
    text: "Simulation visuelle pour valider la presence dans l'espace.",
  },
  {
    id: "04",
    title: "Installation",
    text: "Accrochage final et mise en scene du parcours visuel.",
  },
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

const immersionFaq = [
  {
    q: "Combien de temps dure une immersion complete ?",
    a: "En general 7 a 15 jours selon le niveau de personnalisation et la disponibilite des formats.",
  },
  {
    q: "Peut-on adapter une oeuvre existante ?",
    a: "Oui, adaptation de format, support et intensite chromatique selon le lieu et la lecture d'espace.",
  },
  {
    q: "L'installation est-elle accompagnee ?",
    a: "Oui, avec protocole d'accrochage et accompagnement sur la mise en scene finale.",
  },
  {
    q: "Quel type de projet peut etre accompagne ?",
    a: "Residence privee, bureau, horeca ou espace recevant du public, avec adaptation du format et de l'intensite visuelle.",
  },
];

const contactInfos = [
  "Email: mrmicrobe.furgerot@gmail.com",
  "Telephone: 06 60 70 78 33",
  "Adresse: 19 rue de Saint-Gobain, 37700 Saint-Pierre-des-Corps",
  "Delai de reponse: 24-48h",
];

const artistParagraphs = [
  "Maxime Furgerot, alias Mr Microbe, transforme ses tensions interieures en signes visuels forts. Son travail relie geste urbain, matiere organique et impact emotionnel immediat.",
  "Le langage visuel repose sur des contrastes assumes, des personnages-fleurs et une narration contemporaine. Chaque oeuvre est pensee pour dialoguer avec l'espace et installer une presence nette.",
  "La direction artistique reste sur-mesure: lecture du lieu, selection des formats, projection visuelle puis mise en scene finale.",
];

const artistStatement =
  "Un langage personnel ne de la rue, de la matiere et d'une energie emotionnelle assumee.";

const immersionDetails = [
  {
    title: "Analyse initiale",
    bullets: ["Lecture du contexte", "Intentions et priorites", "Cadre budgetaire"],
  },
  {
    title: "Curation",
    bullets: ["Choix des pieces", "Axes visuels", "Cohesion d'ensemble"],
  },
  {
    title: "Projection",
    bullets: ["Simulation in situ", "Validation des formats", "Ajustements finaux"],
  },
  {
    title: "Mise en place",
    bullets: ["Accrochage precise", "Rythme de lecture", "Presence finale"],
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
    { title: "Origine", detail: "Premiers dessins, premiers contrastes, premieres formes.", image: "/images/M7_01625.jpg" },
    { title: "Technique", detail: "Apprentissage du geste, des reliefs, des patines et de la discipline.", image: "/images/M7_03110.jpg" },
    { title: "Signature Mr Microbe", detail: "Naissance d'un style direct, organique et reconnaissable.", image: "/images/M7_03103.jpg" },
    { title: "Direction artistique", detail: "Collections privees, installations et projets sur mesure.", image: "/images/M7_01636.jpg" },
  ],
}: {
  items?: ParcoursConceptItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const queueActive = (index: number) => {
    setActiveIndex(index);
  };

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
        <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-white/46">Creative evolution</p>
        <h3 className="title-unified mt-2 font-black uppercase text-white">Parcours</h3>
        <div className="mt-3 h-px w-full max-w-[220px] bg-white/20" />

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:overflow-visible">
            {items.map((item, index) => {
              const phase = flipState[index] ?? "idle";
              const flipped = phase !== "idle";
              const active = activeIndex === index;

              return (
                <div
                  key={item.title}
                  className={`group relative h-[400px] min-w-[230px] [perspective:1200px] md:h-[480px] md:min-w-0 ${
                    active ? "z-10" : "z-[1]"
                  }`}
                  style={{
                    perspective: "1200px",
                    flexBasis: 0,
                    flexGrow: active ? 1.75 : 1,
                    transition: "flex-grow 90ms linear",
                  }}
                  onPointerEnter={() => setActiveIndex(index)}
                  onMouseEnter={() => queueActive(index)}
                  onFocus={() => queueActive(index)}
                  onClick={() => setActiveIndex(index)}
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
                            <p className="mt-4 text-[0.92rem] font-semibold uppercase leading-[1.45] tracking-[0.09em] text-white/70">{item.detail}</p>
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
        <section key={idx} className="uilora-work-item relative h-[150vh] w-full overflow-hidden">
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
    <div className="relative flex min-h-screen h-[200vh] flex-col justify-center gap-10 overflow-hidden" style={{ backgroundColor }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-12">
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
            className="block text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0a0a0a]"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        <div className="space-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/52">
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
        <div className="space-y-3">
          <img
            src="/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png"
            alt="Logo Mr Microbe"
            className="h-auto w-20 object-contain"
          />
          <p className="text-4xl font-semibold leading-[0.84] tracking-[-0.06em] text-[#0a0a0a]/75">
            MR
            <br />
            MICROBE
          </p>
        </div>
        <p className="max-w-full break-all text-[11px] leading-tight text-[#0a0a0a]/76">mrmicrobe.furgerot@gmail.com</p>
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

function Preloader({ done, progress }: { done: boolean; progress: number }) {
  const title = "MR MICROBE";
  const letters = title.split("");
  const mobileRows = ["MR", "MICROBE"];
  const tiles = Array.from({ length: 108 }, (_, i) => i);
  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: done ? "-100%" : "0%", pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[90] bg-[#f5f5f5]"
    >
      <div className="absolute inset-0 bg-[#e5e5e5]" />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.88]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,10,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.14) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        animate={{ backgroundPosition: done ? "0px -280px" : ["0px 0px", "0px -52px", "0px 0px"] }}
        transition={{ duration: done ? 0.9 : 7.5, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.58]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,10,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.1) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
        animate={{ backgroundPosition: done ? "0px -420px" : ["0px 0px", "0px -88px", "0px 0px"] }}
        transition={{ duration: done ? 1 : 5.2, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 grid grid-cols-[repeat(12,minmax(0,1fr))] gap-[2px] opacity-70">
        {tiles.map((tile) => (
          <motion.div
            key={`tile-${tile}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 0 : [0.06, 0.2, 0.06] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (tile % 12) * 0.038 + Math.floor(tile / 12) * 0.022,
            }}
            className="bg-white/28"
          />
        ))}
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 52%, rgba(255,255,255,0.52) 0%, rgba(245,245,245,0.92) 56%, rgba(245,245,245,1) 100%)",
        }}
        animate={{ opacity: done ? 0 : [0.8, 0.96, 0.8] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]"
        animate={{ x: done ? "220%" : ["-8%", "205%"] }}
        transition={{ duration: done ? 0.9 : 2.2, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.div
          aria-hidden
          initial={{ x: "0%" }}
          animate={{ x: done ? "-104%" : "0%" }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 w-1/2 border-r border-[#0a0a0a]/10 bg-[#efefef]/65"
        />
        <motion.div
          aria-hidden
          initial={{ x: "0%" }}
          animate={{ x: done ? "104%" : "0%" }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-0 w-1/2 border-l border-[#0a0a0a]/10 bg-[#efefef]/65"
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: done ? 1.04 : [1, 1.01, 1] }}
          transition={{ duration: done ? 0.65 : 8.8, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
        >
          <div className="h-[56vh] w-[56vh] rounded-full border border-[#0a0a0a]/10" />
          <div className="absolute h-[43vh] w-[43vh] rounded-full border border-[#0a0a0a]/13" />
          <div className="absolute h-[1px] w-[min(64vw,820px)] bg-[#0a0a0a]/18" />
          <div className="absolute h-[min(64vh,780px)] w-[1px] bg-[#0a0a0a]/18" />
        </motion.div>

      </div>

      <motion.div
        aria-hidden
        initial={{ x: "-38%", opacity: 0 }}
        animate={done ? { x: "140%", opacity: [0, 0.65, 0] } : { x: ["-38%", "122%"], opacity: [0, 0.3, 0] }}
        transition={{ duration: done ? 0.65 : 3.1, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-0 top-1/2 h-px w-[28vw] bg-[linear-gradient(90deg,transparent,rgba(10,10,10,0.42),transparent)] md:w-[18vw]"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6">
        <motion.img
          src="/images/LOGO-MRMICROBE-3D-TRANSPARENT-removebg-preview.png"
          alt="Logo Mr Microbe"
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: done ? 0 : 0.9, y: done ? -8 : 0, scale: done ? 0.94 : 1 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          className="mb-2 h-auto w-20 object-contain md:mb-3 md:w-28"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: done ? 0 : 1, scale: done ? 0.98 : 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative rounded-sm border-2 border-[#0a0a0a]/38 px-2 py-3 sm:px-3 sm:py-4"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-[#0a0a0a]/30"
            animate={{
              clipPath: done
                ? "inset(0 100% 100% 0)"
                : ["inset(0 100% 100% 0)", "inset(0 0 100% 0)", "inset(0 0 0 0)"],
              opacity: done ? 0 : [0.4, 1, 0.62],
            }}
            transition={{ duration: 1.4, times: [0, 0.45, 1], ease: "easeOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-[10px] border-2 border-[#0a0a0a]/20"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: done ? 0 : [0, 0, 0.72, 0.3], scale: done ? 0.94 : [0.96, 0.96, 1, 1] }}
            transition={{ duration: 1.7, times: [0, 0.62, 0.82, 1], ease: "easeOut" }}
          />
          <div className="md:hidden">
            <div className="space-y-1.5">
              {mobileRows.map((row, rowIndex) => (
                <div key={`mobile-row-${row}`} className="flex justify-center gap-1.5">
                  {row.split("").map((char, charIndex) => (
                    <motion.span
                      key={`letter-mobile-${row}-${char}-${charIndex}`}
                      initial={{ y: 26, opacity: 0, scale: 0.9 }}
                      animate={{ y: done ? -22 : 0, opacity: done ? 0 : 1, scale: done ? 0.96 : 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + (rowIndex * 8 + charIndex) * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-flex h-9 w-9 items-center justify-center border-2 border-[#0a0a0a]/38 bg-white/34 text-[0.96rem] font-semibold uppercase tracking-[0.08em] ${
                        rowIndex < 2 ? "text-[#e20074]" : "text-[#0a0a0a]"
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-2">
            {letters.map((char, index) => (
              <motion.span
                key={`letter-desktop-${char}-${index}`}
                initial={{ y: 26, opacity: 0, scale: 0.9 }}
                animate={{ y: done ? -22 : 0, opacity: done ? 0 : 1, scale: done ? 0.96 : 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-flex h-12 items-center justify-center border-2 border-[#0a0a0a]/38 bg-white/34 px-3 text-[clamp(1.05rem,2.9vw,1.75rem)] font-semibold uppercase tracking-[0.2em] ${
                  char === " " ? "border-transparent bg-transparent px-2.5 text-[#0a0a0a]" : index <= 9 ? "text-[#e20074]" : "text-[#0a0a0a]"
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 border-2 border-[#0a0a0a]/35"
            initial={{ opacity: 0 }}
            animate={{
              opacity: done ? 0 : [0, 0, 1, 0.82, 1],
              boxShadow: done
                ? "0 0 0 rgba(0,0,0,0)"
                : [
                    "0 0 0 rgba(0,0,0,0)",
                    "0 0 0 rgba(0,0,0,0)",
                    "0 0 0 rgba(0,0,0,0)",
                    "0 0 18px rgba(0,0,0,0.18)",
                    "0 0 0 rgba(0,0,0,0)",
                  ],
            }}
            transition={{ duration: 2.1, times: [0, 0.65, 0.74, 0.86, 1], ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: done ? 0 : 132, opacity: done ? 0 : 0.62 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="h-px bg-[#0a0a0a]"
        />
      </div>
    </motion.div>
  );
}

function ScrollArrowCursor() {
  const [pos, setPos] = useState({ x: -120, y: -120 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="pointer-events-none fixed z-[95] hidden md:block"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <div className="relative h-14 w-14">
        <span className="absolute bottom-0 left-0 h-[2px] w-12 bg-[#0a0a0a]/70" />
        <span className="absolute bottom-0 left-0 h-12 w-[2px] bg-[#0a0a0a]/70" />
        <span className="absolute bottom-[9px] left-[8px] h-[2px] w-[42px] origin-left rotate-[-42deg] bg-[#0a0a0a]/70" />
        <span className="absolute bottom-[6px] left-[14px] h-[2px] w-[34px] origin-left rotate-[-42deg] bg-[#0a0a0a]/70" />
      </div>
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
    publicGalleryImages[0],
    publicGalleryImages[1],
    publicGalleryImages[2],
    publicGalleryImages[3],
    publicGalleryImages[4],
    publicGalleryImages[5],
    publicGalleryImages[6],
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
    publicGalleryImages[0],
    publicGalleryImages[6],
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

export default function Home() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [infoIndex, setInfoIndex] = useState(0);
  const [contactStep, setContactStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImmersionStep, setActiveImmersionStep] = useState(0);
  const [immersionAutoPlay, setImmersionAutoPlay] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.15], [0, 80]);
  const globalParallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -32]), { stiffness: 55, damping: 28 });
  const strategyY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 0]), { stiffness: 85, damping: 22 });
  const accueilY = useSpring(useTransform(scrollYProgress, [0.15, 0.36], [36, -24]), { stiffness: 80, damping: 24 });
  const collectionsY = useSpring(useTransform(scrollYProgress, [0.32, 0.58], [36, -20]), { stiffness: 80, damping: 24 });
  const artisteY = useSpring(useTransform(scrollYProgress, [0.52, 0.76], [30, -18]), { stiffness: 78, damping: 24 });
  const immersionY = useSpring(useTransform(scrollYProgress, [0.68, 0.9], [24, -14]), { stiffness: 76, damping: 24 });
  const contactY = useSpring(useTransform(scrollYProgress, [0.84, 1], [24, 0]), { stiffness: 72, damping: 24 });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = prev < 60 ? 4 : prev < 85 ? 2 : 1;
        return Math.min(100, prev + step);
      });
    }, 55);

    const doneTimeout = setTimeout(() => {
      setProgress(100);
      setReady(true);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(doneTimeout);
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

  useEffect(() => {
    if (!immersionAutoPlay) return;
    const immersionTimer = window.setInterval(() => {
      setActiveImmersionStep((prev) => (prev + 1) % immersionSteps.length);
    }, 2200);
    return () => window.clearInterval(immersionTimer);
  }, [immersionAutoPlay]);

  const rotatingInfos = [
    "Collections signature, formats vivants et lecture d'espace affutee.",
    "Du brief au mur: projection, selection des pieces et mise en scene finale.",
    "Matiere, contraste, narration: une presence forte sans bruit inutile.",
    "Direction artistique sur mesure pour lieux prives ou recevant du public.",
  ];
  const heroHeadlineLines = [["MR", "MICROBE,"], ["DU", "DESSIN", "A", "LA", "MATIERE"]];

  return (
    <main className="relative min-h-screen scroll-smooth overflow-x-hidden bg-[#f5f5f5] pb-0 text-[#0a0a0a] selection:bg-[#0a0a0a] selection:text-white">
      <Preloader done={ready} progress={progress} />
      <CurveBackground />
      <ScrollArrowCursor />
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
              className="flex flex-col justify-between gap-10"
            >
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="font-display relative max-w-4xl text-[clamp(3.2rem,8.9vw,9rem)] font-black leading-[0.84] tracking-[-0.06em] text-[#0a0a0a]"
              >
                <span className="relative z-[1] block">
                  {heroHeadlineLines.map((line, lineIndex) => (
                    <span key={`hero-line-${lineIndex}`} className="block">
                      {line.map((word, wordIndex) => (
                        <motion.span
                          key={`hero-word-${lineIndex}-${wordIndex}-${word}`}
                          initial={{ opacity: 0, y: 24, filter: "blur(7px)" }}
                          animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(7px)" }}
                          transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + lineIndex * 0.22 + wordIndex * 0.14 }}
                          className={`mr-[0.24em] inline-block ${lineIndex === 0 ? "text-[#e20074]" : ""}`}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={ready ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  className="mt-5 block h-[2px] w-44 origin-left bg-[#0a0a0a]/72"
                />
              </motion.h1>
              <div className="grid gap-6 pt-6 md:grid-cols-[1fr_auto] md:items-end">
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

        <section id="accueil" className="border-t border-[#0a0a0a]/10 bg-transparent px-0 pb-0 pt-4">
          <div className="group relative min-h-[82vh] overflow-hidden border-y border-[#0a0a0a]/10 lg:relative lg:left-[-15rem] lg:w-[calc(100%+15rem)]">
            <img src={heroImages[0]} alt="Accueil visuel" className="h-[82vh] w-full object-cover transition duration-700" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.38)_78%,rgba(0,0,0,0.6)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center md:p-10">
              <h2 className="max-w-5xl font-serif text-[clamp(2.45rem,8vw,7.2rem)] font-semibold leading-[0.9] text-white/78 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                VISION &amp;
                <br />
                MATIERE
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
              Des oeuvres sur-mesure pensees pour votre espace.
            </h3>
            <div className="mt-7 grid gap-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="max-w-2xl text-[clamp(1.05rem,2.2vw,1.55rem)] font-semibold uppercase leading-relaxed text-[#0a0a0a]/88">
                  Maxime Furgerot accompagne particuliers, collectionneurs et professionnels dans la creation de pieces
                  uniques : sculpture, toile, projection dans l&apos;espace, choix du format, implantation et mise en scene
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

        <section id="collections" className="bg-transparent px-5 py-14 md:px-10">
          <div className="space-y-4 lg:relative lg:left-[-15rem] lg:w-[calc(100%+15rem)]">
            {["/images/Image 2.png"].map((src, index) => (
              <motion.article
                key={`${src}-${index}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group overflow-hidden border border-[#0a0a0a]/10 bg-[#0a0a0a]"
              >
                <img src={src} alt={`Gallery ${index + 1}`} className="h-[72vh] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
              </motion.article>
            ))}
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl px-3 py-4 md:px-6 md:py-6">
            <div className="pointer-events-none absolute inset-0 opacity-16 [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:54px_54px]" />
            <h3 className="title-unified font-display mt-1 font-semibold uppercase text-[#0a0a0a]/96">
              COLLECTIONS
              <br />
              <span className="text-[#e20074]">MR MICROBE</span>
            </h3>

            <div className="mt-12 border-t border-[#0a0a0a]/10">
              {[
                { title: "Les toiles", subtitle: "Pieces fondatrices de la collection, entre matiere et contraste." },
                { title: "Les petites", subtitle: "Formats compacts, precis et impactants pour des espaces intimes." },
                { title: "Les moyennes", subtitle: "Un equilibre net entre presence visuelle et integration du lieu." },
                { title: "Le monocycle", subtitle: "Une silhouette singuliere, avec un langage sculptural fort." },
                { title: "Les grands formats", subtitle: "Pieces monumentales pensees pour une immersion complete." },
                { title: "Luminaire", subtitle: "Des creations lumineuses qui prolongent la narration de la collection." },
                { title: "Bijoux d'art", subtitle: "Objets precieux aux finitions fines, signes d'une ecriture d'auteur." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ x: 6 }}
                  className="group relative grid items-center gap-7 border-b border-[#0a0a0a]/10 px-4 py-10 transition-colors duration-300 hover:bg-[linear-gradient(118deg,rgba(226,0,116,0.94)_0%,rgba(196,0,98,0.9)_48%,rgba(120,0,60,0.9)_100%)] md:min-h-[182px] md:grid-cols-[1.35fr_1fr] md:gap-12 md:px-10 md:py-12"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_38%,rgba(255,255,255,0.11)_52%,transparent_66%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="text-[clamp(1.7rem,3.8vw,4.05rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-[#0a0a0a]/94 transition duration-300 group-hover:translate-x-1 group-hover:text-white/96">
                    {item.title}
                  </p>
                  <p className="max-w-[46ch] text-[clamp(0.9rem,1.08vw,1.16rem)] font-medium leading-[1.5] tracking-[0.01em] text-[#0a0a0a]/62 transition-colors duration-300 group-hover:text-white/72">
                    {item.subtitle}
                  </p>
                  <div className="pointer-events-none absolute bottom-4 left-[40%] hidden items-end gap-2 transition duration-300 md:flex md:opacity-55 md:group-hover:translate-x-1 md:group-hover:opacity-100">
                    <span className="h-[1px] w-14 bg-white/0 transition-all duration-300 group-hover:w-20 group-hover:bg-white/72" />
                    <span className="text-[1.3rem] leading-none text-white/0 transition duration-300 group-hover:text-white/82">↘</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 border-t border-[#0a0a0a]/10 pt-12">
              <div className="relative border-b border-[#0a0a0a]/10 pb-7">
                <div className="flex items-end justify-between gap-4">
                  <p className="title-unified font-display font-semibold uppercase text-[#0a0a0a]/96">
                    REALISATION<span className="text-[#e20074]">S</span>
                  </p>
                </div>
              </div>

              <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 lg:-ml-[7.5rem]">
                <RealisationScrollStack />
              </div>
            </div>

            <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 lg:-ml-[7.5rem]">
              <GalleryFilmStrip />
            </div>
          </div>
        </section>

        <section id="artiste" className="bg-transparent px-0 py-10">
          <div className="relative px-6 pb-6 md:px-10">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:56px_56px]" />
            <h3 className="title-unified font-display relative mt-2 font-semibold uppercase text-[#0a0a0a]/95">
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
                <span className="pointer-events-none absolute bottom-6 right-6 text-[clamp(2rem,2.4vw,2.6rem)] leading-none text-white/66">↓</span>
              </div>
            </motion.div>
          </div>
        </section>

        <ParcoursFlipExperience />

        <section id="immersion" className="bg-transparent px-6 py-16 md:px-10 md:py-20">
          <div className="relative overflow-visible border-y border-[#0a0a0a]/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.72)_0%,rgba(245,245,245,0.9)_35%,rgba(243,234,240,0.85)_100%)] px-6 py-8 md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-0 opacity-24 [background-image:linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_6%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_48%)]" />
            <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#0a0a0a]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-[-6%] top-[22%] h-56 w-56 rounded-full bg-white/55 blur-3xl" />
            <motion.div
              aria-hidden
              animate={{ x: ["-10%", "12%", "-10%"], y: ["0%", "-5%", "0%"] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full bg-[#e20074]/16 blur-3xl"
            />
            <motion.div
              aria-hidden
              animate={{ x: ["6%", "-12%", "6%"], y: ["0%", "7%", "0%"] }}
              transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-[#0a0a0a]/12 blur-3xl"
            />
            <motion.div
              aria-hidden
              animate={{ x: ["-120%", "130%"], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 7.6, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute top-0 z-[2] h-[2px] w-[42%] bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.66)_48%,rgba(90,90,90,0.52)_72%,transparent_100%)]"
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply [background-image:radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.55)_0.6px,transparent_0.8px)] [background-size:3px_3px]" />

            <div className="relative grid items-start gap-6 border-b border-[#0a0a0a]/10 pb-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="title-unified font-display mt-3 max-w-3xl font-semibold uppercase text-[#0a0a0a]/92">
                  Immersion
                </p>
                <p className="mt-4 max-w-2xl text-[clamp(1.1rem,2vw,1.65rem)] leading-relaxed text-[#0a0a0a]/72">
                  Une approche sur-mesure pour imaginer l&apos;oeuvre dans son environnement final.
                </p>
              </div>
              <p className="self-center text-right text-[13px] font-semibold uppercase leading-relaxed tracking-[0.08em] text-[#0a0a0a]/56" />
            </div>
            <div className="group relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden lg:-ml-[15rem] lg:w-[calc(100vw+15rem)]">
              <img
                src="/images/Image 5.png"
                alt="Immersion claire precise coherente"
                className="h-[58vh] min-h-[420px] w-full object-cover object-center transition duration-700 md:h-[78vh]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.14)_36%,rgba(255,255,255,0.08)_58%,rgba(0,0,0,0.24)_100%)]" />
              <motion.div
                aria-hidden
                animate={{ x: ["-130%", "140%"], opacity: [0.25, 0.7, 0.25] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-y-0 w-24 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_52%,rgba(255,255,255,0)_100%)] blur-md"
              />
              <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 rounded-tl-xl border-l border-t border-white/45" />
              <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 rounded-br-xl border-b border-r border-white/45" />
            </div>

            <div className="relative mt-12 border-t border-[#0a0a0a]/10 pt-8 md:mt-14 md:pt-10">
              <motion.div
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mt-4 h-px w-full origin-left bg-[#0a0a0a]/12"
              />
              <p className="mt-3 max-w-2xl text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]/42">
                Une lecture vivante du lieu en quatre mouvements.
              </p>

              <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
                <motion.p
                  aria-hidden
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute -right-1 top-[-2.1rem] z-[1] text-[clamp(2.8rem,7vw,6rem)] font-black uppercase leading-none tracking-[-0.05em] text-[#0a0a0a]/10"
                >
                  immersion
                </motion.p>
                <div className="relative space-y-4 pl-6 md:pl-10">
                  <div className="pointer-events-none absolute left-2 top-4 h-[92%] w-px bg-[linear-gradient(180deg,rgba(10,10,10,0.14)_0%,rgba(226,0,116,0.42)_48%,rgba(10,10,10,0.14)_100%)] md:left-4" />
                  {immersionSteps.map((step, index) => (
                    <motion.button
                      key={step.id}
                      type="button"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      onMouseEnter={() => {
                        setImmersionAutoPlay(false);
                        setActiveImmersionStep(index);
                      }}
                      onFocus={() => {
                        setImmersionAutoPlay(false);
                        setActiveImmersionStep(index);
                      }}
                      onClick={() => {
                        setImmersionAutoPlay(false);
                        setActiveImmersionStep(index);
                      }}
                      className={`group relative block w-full overflow-hidden rounded-2xl border px-5 py-5 text-left transition-all duration-300 md:px-6 md:py-6 ${
                        activeImmersionStep === index
                          ? "border-[#e20074]/45 bg-[linear-gradient(132deg,#ff0f93_0%,#d5006d_42%,#7a003f_100%)] text-white shadow-[0_24px_52px_rgba(226,0,116,0.4)]"
                          : "border-[#0a0a0a]/10 bg-white/55 text-[#0a0a0a] hover:-translate-y-[2px] hover:bg-white/80 hover:shadow-[0_12px_26px_rgba(10,10,10,0.12)]"
                      }`}
                      style={{ marginLeft: `${index * 10}px`, transform: `rotate(${index % 2 === 0 ? -0.25 : 0.2}deg)` }}
                    >
                      <span
                        className={`pointer-events-none absolute -left-[1.35rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-4 ${
                          activeImmersionStep === index ? "bg-[#ff7ec7] ring-[#ff7ec7]/22" : "bg-[#0a0a0a]/35 ring-[#0a0a0a]/12"
                        }`}
                      />
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(112deg,transparent_0%,transparent_35%,rgba(255,255,255,0.14)_52%,transparent_66%,transparent_100%)]" />
                      <span
                        className={`pointer-events-none absolute right-5 top-4 h-8 w-8 rounded-md border border-white/25 transition-opacity duration-300 ${
                          activeImmersionStep === index ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span
                        className={`pointer-events-none absolute bottom-0 left-0 h-1 bg-[linear-gradient(90deg,#ff2fa3_0%,#ff7ec7_55%,#ffd0ea_100%)] transition-all duration-300 ${
                          activeImmersionStep === index ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                      <div className="grid items-start gap-4 md:grid-cols-[48px_1fr] md:gap-5">
                        <span
                          className={`pt-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] ${
                            activeImmersionStep === index ? "text-white/55" : "text-[#0a0a0a]/40"
                          }`}
                        >
                          {step.id}
                        </span>
                        <div className={`border-l pl-5 md:pl-6 ${activeImmersionStep === index ? "border-white/26" : "border-[#0a0a0a]/12"}`}>
                          <p
                            className={`font-display text-[clamp(1.55rem,3vw,2.85rem)] font-black leading-[0.9] tracking-[-0.03em] ${
                              activeImmersionStep === index ? "text-white" : "text-[#0a0a0a]/94"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p
                            className={`mt-2 font-display text-[clamp(0.88rem,1vw,1.02rem)] leading-[1.45] ${
                              activeImmersionStep === index ? "text-white/72" : "text-[#0a0a0a]/62"
                            }`}
                          >
                            {step.text}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  key={`immersion-panel-${activeImmersionStep}`}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative isolate overflow-hidden rounded-[1.55rem] border border-[#0a0a0a]/18 bg-[#0a0a0a] text-white shadow-[0_34px_70px_rgba(0,0,0,0.38)]"
                >
                  <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(226,0,116,0.45)_0%,rgba(226,0,116,0)_52%)] blur-2xl" />
                  <motion.img
                    src={["/images/Image 8.png", "/images/Image 1.png", "/images/Image 9.png", "/images/Image 11.png"][activeImmersionStep]}
                    alt={immersionSteps[activeImmersionStep].title}
                    className="h-[390px] w-full object-cover object-center md:h-[500px]"
                    initial={{ scale: 1.08, filter: "blur(4px)" }}
                    animate={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.82)_100%)]" />
                  <motion.div
                    aria-hidden
                    animate={{ x: ["-120%", "130%"] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                    className="pointer-events-none absolute inset-y-0 w-16 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.23)_52%,rgba(255,255,255,0)_100%)] blur-sm"
                  />
                  <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 rounded-tl-xl border-l border-t border-white/45" />
                  <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 rounded-br-xl border-b border-r border-white/45" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/58">
                      Step {immersionSteps[activeImmersionStep].id} / 04
                    </p>
                    <p className="mt-2 text-[clamp(1.95rem,3.2vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white">
                      {immersionSteps[activeImmersionStep].title}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full border border-white/30 bg-white/14 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-white/75">
                        Atelier
                      </span>
                      <span className="rounded-full border border-white/30 bg-white/14 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-white/75">
                        Direction
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/16 ring-1 ring-white/15">
                      <motion.div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#ff2fa3_0%,#ff7ec7_55%,#ffd0ea_100%)] shadow-[0_0_14px_rgba(255,71,170,0.55)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(activeImmersionStep + 1) * 25}%` }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
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
                Discutons de votre projet
              </h4>
              <p className="mt-3 text-[clamp(1rem,1.2vw,1.35rem)] text-[#0a0a0a]/62">
                Formulaire complet pour cadrer precisement votre demande.
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
          <div className="mx-auto flex w-full max-w-[1280px] justify-end">
            <nav className="flex min-h-[34px] items-center gap-4 pb-0 text-[11px] text-[#0a0a0a]/55 md:text-[12px]">
              <a href="/faq" className="transition-colors hover:text-[#0a0a0a]/82">
                FAQ
              </a>
              <span className="text-[#0a0a0a]/35">|</span>
              <a href="#" className="transition-colors hover:text-[#0a0a0a]/82">
                Mentions legales
              </a>
              <span className="text-[#0a0a0a]/35">|</span>
              <a href="#" className="transition-colors hover:text-[#0a0a0a]/82">
                Politique de confidentialite
              </a>
              <span className="text-[#0a0a0a]/35">|</span>
              <a href="#" className="transition-colors hover:text-[#0a0a0a]/82">
                Cookies
              </a>
            </nav>
          </div>
        </footer>

      </motion.div>
    </main>
  );
}
