"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const heroImages = [
  "/images/M7_02134.jpg",
  "/images/M7_02137.jpg",
  "/images/M7_02162.jpg",
  "/images/M7_01627.jpg",
  "/images/M7_01636.jpg",
  "/images/M7_02104.jpg",
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
        <p className="max-w-full break-all text-[11px] leading-tight">mrmicrobe.furgerot@gmail.com</p>
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

        <motion.div
          aria-hidden
          className="absolute left-[8vw] top-[9vh] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0a0a0a]/42"
          animate={{ opacity: done ? 0 : [0.35, 0.65, 0.35] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Studio Direction / Signature Build
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
                      className="inline-flex h-9 w-9 items-center justify-center border-2 border-[#0a0a0a]/38 bg-white/34 text-[0.96rem] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a]"
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
                className={`inline-flex h-12 items-center justify-center border-2 border-[#0a0a0a]/38 bg-white/34 px-3 text-[clamp(1.05rem,2.9vw,1.75rem)] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] ${
                  char === " " ? "border-transparent bg-transparent px-2.5" : ""
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
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: done ? -10 : 0, opacity: done ? 0 : 0.62 }}
          transition={{ duration: 0.46, delay: 0.88, ease: "easeOut" }}
          className="text-[10px] uppercase tracking-[0.24em] text-[#0a0a0a]/70"
        >
          loading intro sequence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: done ? 0 : 0.92, y: done ? -8 : 0 }}
          transition={{ duration: 0.38, delay: 0.95 }}
          className="mt-1 flex items-center gap-3"
        >
          <div className="h-1.5 w-36 overflow-hidden rounded-full border border-[#0a0a0a]/25 bg-white/40">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: "linear" }}
              className="h-full bg-[#0a0a0a]"
            />
          </div>
          <span className="min-w-12 text-right text-[11px] font-semibold tracking-[0.12em] text-[#0a0a0a]/80">
            {String(progress).padStart(3, "0")}%
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 0 : 0.6 }}
          transition={{ duration: 0.3, delay: 0.95 }}
          className="text-[9px] uppercase tracking-[0.22em] text-[#0a0a0a]/70"
        >
          prepare layout and assets
        </motion.p>
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

export default function Home() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [infoIndex, setInfoIndex] = useState(0);
  const [contactStep, setContactStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const rotatingInfos = [
    "Collections signature, formats vivants et lecture d'espace affutee.",
    "Du brief au mur: projection, selection des pieces et mise en scene finale.",
    "Matiere, contraste, narration: une presence forte sans bruit inutile.",
    "Direction artistique sur mesure pour lieux prives ou recevant du public.",
  ];
  const heroHeadlineLines = [["Une", "presence"], ["artistique"], ["forte."]];

  return (
    <main className="relative min-h-screen scroll-smooth overflow-x-hidden bg-[#f5f5f5] text-[#0a0a0a] selection:bg-[#0a0a0a] selection:text-white">
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
                          className="mr-[0.24em] inline-block"
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
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.03em]">SOLUTIONS ARTISTIQUES</p>
                  <p className="mt-2 max-w-2xl text-sm text-[#0a0a0a]/70">
                    Collections, immersion, direction visuelle: un site plus impactant, plus vivant, plus assume.
                  </p>
                </div>
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
              <h2 className="max-w-5xl font-serif text-[clamp(2.45rem,8vw,7.2rem)] leading-[0.9] text-white/78 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                VISION &amp;
                <br />
                MATIERE
              </h2>
            </div>
          </div>
        </section>

        <section className="relative bg-transparent px-0 pb-2">
          <div className="relative grid gap-8 overflow-hidden border-b border-[#0a0a0a]/12 bg-transparent px-6 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-0 lg:left-[-15rem] lg:w-[calc(100%+15rem)] bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.045)_40%,rgba(0,0,0,0.0)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0)_100%)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#0a0a0a]/48">&nbsp;</p>
              <p className="mt-4 max-w-3xl text-[clamp(2rem,4.7vw,4.25rem)] leading-[1.05] tracking-[-0.03em] text-[#0a0a0a]/84">
                Visualisez votre espace avant meme la premiere sculpture.
              </p>
            </div>
            <p className="self-center text-right text-[13px] uppercase leading-relaxed tracking-[0.08em] text-[#0a0a0a]/58">
              “Des rendus d&apos;une precision artistique pour une validation visuelle acceleree.”
            </p>
          </div>

          <div className="relative h-12 border-b border-[#0a0a0a]/12">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl leading-none text-[#0a0a0a]/62">↓</span>
          </div>

          <div className="bg-transparent px-6 py-8 md:px-10 md:py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/46">Expertise &amp; accompagnement</p>
            <h3 className="mt-3 max-w-6xl text-[clamp(2.5rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#0a0a0a]/94">
              Specialiste dans la conception
              <br />
              de projets artistiques.
            </h3>
            <div className="mt-7 grid gap-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="max-w-2xl text-[clamp(1.05rem,2.2vw,1.55rem)] font-semibold uppercase leading-relaxed text-[#0a0a0a]/88">
                  Nous accompagnons particuliers et professionnels dans la realisation de leurs projets artistiques:
                  selection, projection, plans d&apos;implantation et mise en scene finale.
                </p>
                <a
                  href="#collections"
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
            {[heroImages[0]].map((src, index) => (
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
            <h3 className="mt-1 text-[clamp(3.2rem,8.5vw,8.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-[#0a0a0a]/96">
              COLLECTIONS <span className="text-[#e20074]">MR MICROBE</span>
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
                  className="group relative grid items-center gap-7 border-b border-[#0a0a0a]/10 px-4 py-10 transition-colors duration-300 hover:bg-[linear-gradient(118deg,rgba(226,0,116,0.94)_0%,rgba(196,0,98,0.9)_48%,rgba(120,0,60,0.9)_100%)] md:min-h-[182px] md:grid-cols-[88px_1.35fr_1fr] md:gap-12 md:px-10 md:py-12"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_38%,rgba(255,255,255,0.11)_52%,transparent_66%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex flex-col text-[#0a0a0a]/34 transition-colors duration-300 group-hover:text-white/70">
                    <span className="text-[clamp(1rem,1.4vw,1.3rem)] font-semibold tracking-[0.08em]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-1 text-xl leading-none">-</span>
                  </div>
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
                  <p className="text-[clamp(3.1rem,7.9vw,8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-[#0a0a0a]/96">
                    Realisations
                  </p>
                </div>
                <span className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 text-[clamp(2rem,2.8vw,2.8rem)] leading-none text-[#0a0a0a]/52">
                  ↓
                </span>
              </div>

              <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 space-y-4 lg:-ml-[7.5rem]">
                {["/images/M7_01625.jpg", "/images/M7_03110.jpg", "/images/M7_03103.jpg", "/images/M7_01636.jpg"].map((src, index) => (
                  <motion.article
                    key={`${src}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group w-full overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Echantillon collection ${index + 1}`}
                      className="h-[78vh] w-full object-cover transition duration-700 group-hover:scale-[1.01]"
                    />
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="artiste" className="bg-transparent px-0 py-10">
          <div className="relative px-6 pb-6 md:px-10">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:56px_56px]" />
            <h3 className="relative mt-2 text-[clamp(3.2rem,8.4vw,8.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-[#0a0a0a]/95">
              Artiste
            </h3>
            <p className="relative -mt-1 text-[clamp(2.9rem,7.6vw,7.6rem)] font-semibold uppercase leading-[0.86] tracking-[-0.04em] text-[#0a0a0a]/16">
              Signature vivante
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
                src="/images/M7_02148.jpg"
                alt="Maxime Furgerot - portrait urbain"
                className="h-[82vh] w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
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
                <div className="flex items-center gap-4">
                  <span className="h-px w-20 bg-white/20" />
                  <p className="font-sans text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/34">PROJECT DETAILS 03</p>
                </div>
                <div className="mt-5 space-y-0 text-[clamp(0.86rem,0.95vw,0.98rem)] font-bold uppercase tracking-[0.06em]">
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
                  src={heroImages[2]}
                  alt="Univers artistique"
                  className="h-[38vh] w-full object-cover transition duration-700"
                />
                <span className="pointer-events-none absolute bottom-6 right-6 text-[clamp(2rem,2.4vw,2.6rem)] leading-none text-white/66">↓</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/12 bg-[#03060c] px-0 py-14 text-white md:py-16 lg:relative lg:left-[-15rem] lg:w-[calc(100%+15rem)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,16,0.99)_0%,rgba(2,4,8,1)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="pointer-events-none absolute left-[-8%] top-[-18%] h-80 w-[58%] bg-[radial-gradient(circle_at_35%_40%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_68%)] blur-[22px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(173,181,194,0.12)_52%,rgba(173,181,194,0.2)_100%)]" />
          <div className="pointer-events-none absolute right-[-11%] top-0 h-full w-[36%] bg-[linear-gradient(72deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.06)_62%,rgba(255,255,255,0.12)_100%)]" />
          <div className="pointer-events-none absolute right-[10%] top-[28%] h-52 w-52 rounded-full bg-white/10 blur-[90px]" />
          <div className="pointer-events-none absolute right-[18%] top-[2%] h-56 w-8 rotate-[18deg] rounded-full bg-[linear-gradient(180deg,rgba(225,230,238,0.44)_0%,rgba(225,230,238,0.16)_55%,rgba(225,230,238,0)_100%)] blur-[10px]" />
          <div className="pointer-events-none absolute right-[2%] bottom-[-28%] h-[84%] w-[54%] rounded-[48%] bg-[radial-gradient(ellipse_at_18%_34%,rgba(218,224,236,0.24)_0%,rgba(218,224,236,0.12)_36%,rgba(218,224,236,0)_74%)] blur-[18px]" />

          <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
            <h3 className="mt-1 text-center text-[clamp(3.6rem,9.6vw,8.8rem)] font-black uppercase leading-[0.84] tracking-[-0.05em] text-white">
              Parcours
            </h3>

            <div className="relative mx-auto mt-16 grid max-w-[1180px] gap-x-20 gap-y-20 pb-4 lg:grid-cols-2">
                {[
                  { title: "Origines visuelles", text: "Dessins instinctifs, contrastes bruts, naissance du regard.", num: "1", year: "2004" },
                  { title: "Matiere et precision", text: "Apprentissage du geste, des reliefs, des patines et de la discipline.", num: "2", year: "2021" },
                  { title: "Signature Mr Microbe", text: "Mr Microbe devient une signature directe, organique et frontale.", num: "3", year: "2019" },
                  { title: "Direction vivante", text: "Collections privees, parcours immersifs, direction artistique sur mesure.", num: "4", year: "2024" },
                ].map((step) => (
                <motion.article
                  key={step.num}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  className="relative pl-14 text-left md:pl-16"
                >
                  <span className="pointer-events-none absolute left-0 top-[-0.9rem] text-[clamp(4.4rem,7vw,6.2rem)] font-black leading-none tracking-[-0.05em] text-white/14">
                    {step.num}
                  </span>
                  <p className="relative font-sans text-[clamp(1.75rem,2.9vw,2.8rem)] font-black uppercase leading-[0.94] tracking-[-0.03em] text-white">
                    {step.title}
                  </p>
                  <p className="relative mt-3 max-w-[46ch] font-sans text-[clamp(0.9rem,1vw,0.98rem)] font-semibold uppercase leading-[1.45] tracking-[0.1em] text-white/43">
                    {step.text}
                  </p>
                  <p className="relative mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">{step.year}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="immersion" className="bg-transparent px-6 py-16 md:px-10 md:py-20">
          <div className="relative overflow-visible border-y border-[#0a0a0a]/10 bg-transparent px-6 py-8 md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-0 opacity-24 [background-image:linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_6%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_48%)]" />
            <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#0a0a0a]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-[-6%] top-[22%] h-56 w-56 rounded-full bg-white/55 blur-3xl" />
            <motion.div
              aria-hidden
              animate={{ x: ["-120%", "130%"], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 7.6, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute top-0 z-[2] h-[2px] w-[42%] bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.66)_48%,rgba(90,90,90,0.52)_72%,transparent_100%)]"
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply [background-image:radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.55)_0.6px,transparent_0.8px)] [background-size:3px_3px]" />

            <div className="relative grid items-start gap-6 border-b border-[#0a0a0a]/10 pb-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="mt-3 max-w-3xl text-[clamp(2rem,4.9vw,4.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[#0a0a0a]/92">
                  Immersion
                </p>
                <p className="mt-4 max-w-2xl text-[clamp(1.1rem,2vw,1.65rem)] leading-relaxed text-[#0a0a0a]/72">
                  Methode dynamique de projection et d&apos;installation.
                  <br />
                  Lecture immediate du projet.
                </p>
              </div>
              <p className="self-center text-right text-[13px] font-semibold uppercase leading-relaxed tracking-[0.08em] text-[#0a0a0a]/56" />
            </div>

            <p className="relative mx-auto mt-8 max-w-6xl text-center font-serif text-[clamp(2.1rem,5.8vw,6rem)] leading-[1.08] tracking-[-0.02em] text-[#0a0a0a]/86">
              “Lecture du lieu, curation, projection et installation: une immersion claire, precise et coherente.”
            </p>
            <div className="group relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden lg:-ml-[15rem] lg:w-[calc(100vw+15rem)]">
              <img
                src="/images/M7_01373.jpg"
                alt="Immersion claire precise coherente"
                className="h-[46vh] min-h-[320px] w-full object-cover transition duration-700 md:h-[68vh]"
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
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute right-0 top-1 text-[clamp(2.2rem,8vw,7.2rem)] font-black uppercase leading-none tracking-[-0.05em] text-[#0a0a0a]/10"
              >
                4 etapes
              </motion.span>
              <p className="relative text-[10px] font-black uppercase tracking-[0.3em] text-[#0a0a0a]/48">Immersion process</p>
              <motion.h4
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45 }}
                className="relative mt-2 text-[clamp(1.65rem,3.7vw,3.55rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#0a0a0a]/92"
              >
                4 etapes
              </motion.h4>
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

              <div className="relative mt-8 grid gap-6 md:gap-7">
                {immersionSteps.map((step, index) => (
                  <motion.article
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    whileHover={{ x: 6, rotate: 0.15 }}
                    className="group relative overflow-hidden rounded-sm border border-[#0a0a0a]/10 bg-white/25 p-4 backdrop-blur-[1px] transition-colors duration-300 hover:bg-[#0a0a0a] md:p-5"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(116deg,transparent_0%,transparent_38%,rgba(255,255,255,0.1)_52%,transparent_66%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="grid items-start gap-4 md:grid-cols-[54px_1fr] md:gap-6">
                      <span className="pt-1 text-[clamp(0.74rem,0.88vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/42 transition-colors duration-300 group-hover:text-white/62">
                        {step.id}
                      </span>
                      <div className="border-l border-[#0a0a0a]/10 pl-5 transition-colors duration-300 group-hover:border-white/18 md:pl-6">
                        <p className="font-serif text-[clamp(1.85rem,3.2vw,3rem)] leading-[0.92] tracking-[-0.02em] text-[#0a0a0a]/95 transition duration-300 group-hover:translate-x-1 group-hover:text-white">
                          {step.title}
                        </p>
                        <p className="mt-2 max-w-[58ch] font-mono text-[clamp(0.94rem,1.1vw,1.15rem)] leading-[1.5] text-[#0a0a0a]/66 transition-colors duration-300 group-hover:text-white/72">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="group relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden lg:-ml-[15rem] lg:w-[calc(100vw+15rem)]">
              <img
                src="/images/M7_01387.jpg"
                alt="Immersion detail"
                className="h-[62vh] min-h-[420px] w-full object-cover transition duration-700 md:h-[82vh]"
              />
            </div>
          </div>
        </section>

        <section className="bg-transparent px-6 py-14 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1120px]">
            <div className="relative mb-8 md:mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#0a0a0a]/46">FAQ immersion</p>
              <h3 className="mt-2 text-[clamp(2.5rem,6.3vw,6.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-[#0a0a0a]/92">
                Questions
              </h3>
              <p className="-mt-1 text-[clamp(2.3rem,6vw,5.7rem)] font-semibold uppercase leading-[0.86] tracking-[-0.04em] text-[#0a0a0a]/14">
                Reponses claires
              </p>
            </div>
            <div className="grid border-t border-[#0a0a0a]/12 md:grid-cols-2">
              {immersionFaq.slice(0, 3).map((item, index) => (
                <motion.article
                  key={item.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                  className={`px-4 py-8 text-center md:px-8 md:py-10 ${
                    index % 2 === 0 ? "md:border-r md:border-[#0a0a0a]/12" : ""
                  } ${index > 1 ? "border-t border-[#0a0a0a]/12 md:col-span-2 md:border-r-0 md:mx-auto md:w-full md:max-w-[620px]" : ""}`}
                >
                  <span className="block text-[clamp(1rem,1.5vw,1.4rem)] font-black text-[#0a0a0a]/22">
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  <p className="mt-2 font-serif text-[clamp(1.7rem,2.5vw,2.6rem)] leading-[1.1] text-[#0a0a0a]/78">{item.q}</p>
                  <p className="mx-auto mt-3 max-w-[42ch] text-[clamp(0.98rem,1.05vw,1.15rem)] leading-[1.62] text-[#0a0a0a]/58">{item.a}</p>
                </motion.article>
              ))}
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
                <h3 className="mt-4 text-[clamp(3rem,8.6vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.05em] text-[#0a0a0a]">
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
              <h4 className="font-serif text-[clamp(2.5rem,5vw,4.1rem)] leading-[0.95] tracking-[-0.03em] text-[#0a0a0a]/92">
                Parlez-nous de votre projet
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

      </motion.div>
    </main>
  );
}
