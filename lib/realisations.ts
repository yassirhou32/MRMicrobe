export interface RealisationVideoItem {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  videoTitle: string;
  videoEmbedUrl: string;
}

export const realisationVideoItems: RealisationVideoItem[] = [
  {
    slug: "atelier-energie",
    title: "Atelier Energie",
    subtitle: "Textures brutes, contrastes et geste spontane.",
    coverImage: "/images/M7_01625.jpg",
    videoTitle: "Vlog Atelier - Energie et matière",
    videoEmbedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  {
    slug: "fleur-signature",
    title: "Fleur Signature",
    subtitle: "La forme iconique revisitée en volume.",
    coverImage: "/images/M7_03103.jpg",
    videoTitle: "Vlog Process - Fleur Signature",
    videoEmbedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
  {
    slug: "grands-formats",
    title: "Grands Formats",
    subtitle: "Presence monumentale et narration visuelle.",
    coverImage: "/images/M7_02162.jpg",
    videoTitle: "Vlog Installation - Grand format",
    videoEmbedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
  {
    slug: "mise-en-scene",
    title: "Mise en Scene",
    subtitle: "Projection, placement et lecture de l'espace.",
    coverImage: "/images/Image 3.png",
    videoTitle: "Vlog Coulisses - Mise en scene",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
];
