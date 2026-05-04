import Link from "next/link";
import type { Metadata } from "next";

/**
 * Renseignez ces champs avec vos informations réelles.
 * Les valeurs entre crochets restent visibles tant que vous ne les remplacez pas.
 */
const EDITEUR = {
  nomOuRaisonSociale: "[Nom / Prénom ou raison sociale]",
  nomArtiste: "Mr Microbe",
  statutJuridique: "[entreprise individuelle / micro-entreprise / société / artiste-auteur / autre]",
  siret: "[numéro SIRET]",
  siegeSocial: "[adresse complète]",
  email: "[adresse e-mail de contact]",
  telephone: "[numéro de téléphone, si souhaité]",
  directeurPublication: "[Nom du responsable de publication]",
} as const;

const HEBERGEMENT = {
  nom: "[Nom de l'hébergeur]",
  adresse: "[adresse complète de l'hébergeur]",
  telephone: "[numéro de téléphone de l'hébergeur]",
} as const;

export const metadata: Metadata = {
  title: "Mentions légales | Mr Microbe",
  description:
    "Éditeur du site, identification légale et informations d’hébergement — Mr Microbe.",
};

const sections = [
  { id: "editeur", title: "Éditeur du site", short: "Identification" },
  { id: "hebergement", title: "Hébergement", short: "Infra & contact hébergeur" },
] as const;

function isPlaceholder(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}

function SpecRow({ label, value }: { label: string; value: string }) {
  const placeholder = isPlaceholder(value);
  return (
    <div className="border-b border-[#0a0a0a]/[0.06] py-3.5 last:border-b-0 sm:grid sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-6 sm:py-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0a0a0a]/50">{label}</dt>
      <dd className="mt-1 sm:mt-0">
        {placeholder ? (
          <span className="block w-fit max-w-full rounded-lg border border-dashed border-[#e20074]/25 bg-[#e20074]/[0.04] px-3 py-2 font-mono text-[0.9rem] leading-snug text-[#0a0a0a]/55">
            {value}
          </span>
        ) : label === "Adresse e-mail" && value.includes("@") ? (
          <a
            href={`mailto:${value}`}
            className="font-medium text-[#e20074] underline decoration-[#e20074]/30 underline-offset-2 hover:text-[#c40062]"
          >
            {value}
          </a>
        ) : (
          <span className="text-[0.98rem] font-medium leading-relaxed text-[#0a0a0a]/85">{value}</span>
        )}
      </dd>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f2f2f4] text-[#0a0a0a]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[#f2f2f4] [background-image:linear-gradient(to_right,rgba(10,10,10,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.028)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -left-[20%] top-[-10%] z-0 h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(226,0,116,0.14)_0%,transparent_68%)] blur-3xl motion-reduce:blur-none"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -right-[15%] bottom-[5%] z-0 h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,126,199,0.12)_0%,transparent_65%)] blur-3xl motion-reduce:blur-none"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(255,255,255,0.75)_0%,transparent_50%)]"
      />

      <div className="relative z-10 mx-auto max-w-[880px] px-5 pb-20 pt-12 sm:px-8 sm:pt-16 md:px-10 md:pb-28 md:pt-20">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#0a0a0a]/10 bg-white/90 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/65 shadow-[0_8px_32px_rgba(10,10,10,0.06)] backdrop-blur-md transition-all duration-300 hover:border-[#e20074]/35 hover:text-[#0a0a0a] hover:shadow-[0_12px_40px_rgba(226,0,116,0.12)]"
          >
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a]/[0.06] text-base transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Retour au site
          </Link>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/38 sm:block">/ légal</span>
        </div>

        <header className="relative mb-12 md:mb-16">
          <div className="absolute -left-1 top-2 hidden h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-gradient-to-b from-[#e20074] via-[#ff7ec7] to-transparent md:block" aria-hidden />
          <div className="relative rounded-[1.75rem] border border-white/80 bg-white/75 p-8 shadow-[0_24px_80px_rgba(10,10,10,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:p-10 md:pl-12 md:pr-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#e20074]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c40062]">
                Informations obligatoires
              </span>
              <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/20" aria-hidden />
              <span className="text-[11px] font-medium text-[#0a0a0a]/48">Éditeur & hébergement</span>
            </div>
            <h1 className="font-display mt-6 text-[clamp(2rem,5.5vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0a0a0a]">
              Mentions{" "}
              <span className="bg-gradient-to-r from-[#e20074] to-[#ff4da6] bg-clip-text text-transparent">légales</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[1.08rem] font-light leading-[1.65] text-[#0a0a0a]/68 sm:text-[1.12rem]">
              Les informations ci-dessous identifient l’éditeur du site et l’hébergeur. Les champs encore entre crochets sont des{" "}
              <span className="font-medium text-[#0a0a0a]/88">modèles à compléter</span> dans le fichier de la page.
            </p>

            <nav
              className="mt-8 flex flex-wrap gap-2 border-t border-[#0a0a0a]/[0.08] pt-8"
              aria-label="Sections de la page"
            >
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 rounded-full border border-[#0a0a0a]/[0.08] bg-[#fafafa]/90 px-3.5 py-2 text-[12px] font-medium text-[#0a0a0a]/72 shadow-sm transition-all duration-300 hover:border-[#e20074]/30 hover:bg-white hover:text-[#0a0a0a] hover:shadow-md motion-reduce:transition-none"
                >
                  <span className="font-mono text-[10px] tabular-nums text-[#e20074]/90">0{i + 1}</span>
                  <span>{s.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </header>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {[
            { t: "Éditeur identifié", d: "Dès remplissage des champs" },
            { t: "Hébergeur", d: "Coordonnées à jour" },
            { t: "Publication", d: "Responsable désigné" },
          ].map((chip) => (
            <div
              key={chip.t}
              className="flex items-center gap-2 rounded-2xl border border-[#0a0a0a]/[0.06] bg-white/60 px-4 py-2.5 shadow-[0_4px_20px_rgba(10,10,10,0.04)] backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.25)]" aria-hidden />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#0a0a0a]/85">{chip.t}</p>
                <p className="text-[10px] text-[#0a0a0a]/45">{chip.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-7 md:gap-8">
          <article
            id="editeur"
            className="group relative scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-[#0a0a0a]/[0.07] bg-white/85 shadow-[0_16px_48px_rgba(10,10,10,0.055)] backdrop-blur-md transition-[transform,box-shadow] duration-500 motion-reduce:transition-none md:rounded-2xl md:hover:-translate-y-0.5 md:hover:shadow-[0_24px_64px_rgba(10,10,10,0.08),0_0_0_1px_rgba(226,0,116,0.06)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(250,250,252,0.5)_40%,rgba(255,240,248,0.15)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#e20074] via-[#ff7ec7] to-[rgba(226,0,116,0.12)]"
            />
            <div className="relative p-7 sm:p-8 md:p-10 md:pl-11">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#e20074]/80">Identification</p>
                  <h2 className="font-display mt-1 text-[1.45rem] font-semibold tracking-[-0.03em] text-[#0a0a0a] sm:text-[1.6rem]">
                    Éditeur du site
                  </h2>
                </div>
                <span className="font-mono text-[2.5rem] font-light leading-none text-[#0a0a0a]/[0.07] group-hover:text-[#e20074]/15 sm:text-[3rem]">
                  01
                </span>
              </div>
              <p className="mt-6 text-[1.02rem] leading-relaxed text-[#0a0a0a]/78">
                Le présent site est édité par :
              </p>
              <dl className="mt-4 rounded-xl border border-[#0a0a0a]/[0.06] bg-[#fafafa]/80 px-4 sm:px-5">
                <SpecRow label="Nom / prénom ou raison sociale" value={EDITEUR.nomOuRaisonSociale} />
                <SpecRow label="Nom d’artiste" value={EDITEUR.nomArtiste} />
                <SpecRow label="Statut juridique" value={EDITEUR.statutJuridique} />
                <SpecRow label="SIRET" value={EDITEUR.siret} />
                <SpecRow label="Siège social" value={EDITEUR.siegeSocial} />
                <SpecRow label="Adresse e-mail" value={EDITEUR.email} />
                <SpecRow label="Téléphone" value={EDITEUR.telephone} />
                <SpecRow label="Directeur de la publication" value={EDITEUR.directeurPublication} />
              </dl>
            </div>
          </article>

          <article
            id="hebergement"
            className="group relative scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-[#0a0a0a]/[0.07] bg-white/85 shadow-[0_16px_48px_rgba(10,10,10,0.055)] backdrop-blur-md transition-[transform,box-shadow] duration-500 motion-reduce:transition-none md:rounded-2xl md:hover:-translate-y-0.5 md:hover:shadow-[0_24px_64px_rgba(10,10,10,0.08),0_0_0_1px_rgba(226,0,116,0.06)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(250,250,252,0.5)_40%,rgba(255,240,248,0.15)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#e20074] via-[#ff7ec7] to-[rgba(226,0,116,0.12)]"
            />
            <div className="relative p-7 sm:p-8 md:p-10 md:pl-11">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#e20074]/80">Infra & contact hébergeur</p>
                  <h2 className="font-display mt-1 text-[1.45rem] font-semibold tracking-[-0.03em] text-[#0a0a0a] sm:text-[1.6rem]">
                    Hébergement
                  </h2>
                </div>
                <span className="font-mono text-[2.5rem] font-light leading-none text-[#0a0a0a]/[0.07] group-hover:text-[#e20074]/15 sm:text-[3rem]">
                  02
                </span>
              </div>
              <p className="mt-6 text-[1.02rem] leading-relaxed text-[#0a0a0a]/78">Le site est hébergé par :</p>
              <dl className="mt-4 rounded-xl border border-[#0a0a0a]/[0.06] bg-[#fafafa]/80 px-4 sm:px-5">
                <SpecRow label="Hébergeur" value={HEBERGEMENT.nom} />
                <SpecRow label="Adresse" value={HEBERGEMENT.adresse} />
                <SpecRow label="Téléphone" value={HEBERGEMENT.telephone} />
              </dl>
            </div>
          </article>
        </div>

        <div className="mt-14 overflow-hidden rounded-[1.35rem] border border-[#e20074]/20 bg-gradient-to-br from-[#e20074]/[0.08] via-white to-white p-8 text-center shadow-[0_20px_60px_rgba(226,0,116,0.1)] sm:p-10">
          <p className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0a0a0a] sm:text-xl">
            Complétez les champs entre crochets
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-[#0a0a0a]/58">
            Ouvrez <span className="font-mono text-[12px] text-[#0a0a0a]/70">app/mentions-legales/page.tsx</span> et modifiez les objets{" "}
            <span className="font-mono text-[12px]">EDITEUR</span> et <span className="font-mono text-[12px]">HEBERGEMENT</span> en haut du fichier.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0a0a0a] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-[#1a1a1a] hover:shadow-xl"
          >
            Retour à l’accueil
          </Link>
        </div>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-[#0a0a0a]/38">
          Dernière mise à jour indicative — le contenu peut évoluer avec votre situation juridique ou l’hébergeur.
        </p>
      </div>
    </main>
  );
}
