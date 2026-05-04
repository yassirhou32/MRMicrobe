/** Titres affichés dans la liste COLLECTIONS MR MICROBE (page d'accueil). */
export const collectionShowcaseTitles = [
  "Les toiles",
  "Les petites",
  "Les moyennes",
  "Le monocycle",
  "Les grands formats",
  "Luminaire",
  "Bijoux d'art",
] as const;

export type CollectionShowcaseTitle = (typeof collectionShowcaseTitles)[number];

const SLUG_BY_TITLE: Record<CollectionShowcaseTitle, string> = {
  "Les toiles": "les-toiles",
  "Les petites": "les-petites",
  "Les moyennes": "les-moyennes",
  "Le monocycle": "le-monocycle",
  "Les grands formats": "les-grands-formats",
  Luminaire: "luminaire",
  "Bijoux d'art": "bijoux-dart",
};

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

const collectionCardImages = [
  "/images/M7_02134.jpg",
  "/images/M7_03109.jpg",
  "/images/M7_03110.jpg",
  "/images/M7_02162.jpg",
  "/images/M7_01636.jpg",
  "/images/M7_02104.jpg",
  "/images/M7_03110.jpg",
];

const galleryImagePool = Array.from(
  new Set([
    ...heroImages,
    ...publicGalleryImages,
    ...realisationImages,
    "/images/Image 4.png",
    "/images/Image 5.png",
    "/images/Image 55.png",
    "/images/Image 111.png",
    "/images/Image 2 2.png",
    "/images/parcours-01.png",
    "/images/parcours-02.png",
    "/images/parcours-03.png",
    "/images/parcours-04.png",
    ...collectionCardImages,
  ])
);

function hashCollectionKey(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function buildGalleryImagesForCollection(title: string, lane: "canvas" | "paper"): string[] {
  const pool = galleryImagePool;
  if (pool.length === 0) return [];
  const salt = lane === "paper" ? "papier" : "toile";
  let start = hashCollectionKey(`${title}:${salt}`) % pool.length;
  const out: string[] = [];
  let i = 0;
  while (out.length < 24) {
    out.push(pool[(start + i) % pool.length]);
    i += lane === "paper" ? 2 : 1;
  }
  return out;
}

export function collectionSlugFromTitle(title: CollectionShowcaseTitle): string {
  return SLUG_BY_TITLE[title];
}

export function collectionTitleFromSlug(slug: string): CollectionShowcaseTitle | null {
  const entry = Object.entries(SLUG_BY_TITLE).find(([, s]) => s === slug);
  return entry ? (entry[0] as CollectionShowcaseTitle) : null;
}
