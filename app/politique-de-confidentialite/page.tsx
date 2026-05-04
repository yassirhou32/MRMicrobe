import Link from "next/link";
import type { Metadata } from "next";

/** Remplacez par l’adresse e-mail réelle utilisée pour les demandes RGPD / contact. */
const CONTACT_EMAIL = "contact@votre-domaine.fr";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Mr Microbe",
  description:
    "Propriété intellectuelle, protection des données personnelles et exercice de vos droits — Mr Microbe.",
};

const sections = [
  {
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
    short: "Contenus & œuvres",
    icon: "ip" as const,
    paragraphs: [
      "L'ensemble des éléments présents sur ce site, notamment les textes, images, photographies, œuvres, créations graphiques, visuels, vidéos, logos, éléments de design et contenus artistiques, sont protégés par le droit de la propriété intellectuelle.",
      "Sauf autorisation écrite préalable, toute reproduction, représentation, modification, diffusion, adaptation ou exploitation, totale ou partielle, des contenus du site est strictement interdite.",
      "Les œuvres présentées sur ce site sont la propriété de Mr Microbe ou font l'objet d'une autorisation de diffusion. Toute utilisation non autorisée pourra faire l'objet de poursuites.",
    ],
  },
  {
    id: "donnees-personnelles",
    title: "Données personnelles",
    short: "Collecte & droits",
    icon: "data" as const,
    paragraphs: [
      "Dans le cadre de l'utilisation du site, certaines données personnelles peuvent être collectées, notamment via le formulaire de contact ou de demande de projet : nom, prénom, adresse e-mail, numéro de téléphone, informations relatives au projet et tout élément transmis volontairement par l'utilisateur.",
      "Ces données sont utilisées uniquement pour répondre aux demandes reçues, assurer le suivi des échanges et traiter les projets ou commandes sur mesure.",
      "Les données collectées ne sont ni vendues, ni cédées à des tiers.",
      "Conformément à la réglementation applicable en matière de protection des données personnelles, l'utilisateur dispose d'un droit d'accès, de rectification, d'opposition, d'effacement et de limitation du traitement de ses données.",
    ],
    showContact: true,
  },
] as const;

type Section = (typeof sections)[number];

function SectionIcon({ name }: { name: "ip" | "data" }) {
  const common = "h-6 w-6 text-[#e20074]";
  if (name === "ip") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function PolitiqueConfidentialitePage() {
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
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/38 sm:block">
            / confidentialité
          </span>
        </div>

        <header className="relative mb-12 md:mb-16">
          <div className="absolute -left-1 top-2 hidden h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-gradient-to-b from-[#e20074] via-[#ff7ec7] to-transparent md:block" aria-hidden />
          <div className="relative rounded-[1.75rem] border border-white/80 bg-white/75 p-8 shadow-[0_24px_80px_rgba(10,10,10,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:p-10 md:pl-12 md:pr-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#e20074]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c40062]">
                Confidentialité
              </span>
              <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/20" aria-hidden />
              <span className="text-[11px] font-medium text-[#0a0a0a]/48">Propriété intellectuelle & données</span>
            </div>
            <h1 className="font-display mt-6 text-[clamp(2rem,5.5vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0a0a0a]">
              Politique de{" "}
              <span className="bg-gradient-to-r from-[#e20074] to-[#ff4da6] bg-clip-text text-transparent">confidentialité</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[1.08rem] font-light leading-[1.65] text-[#0a0a0a]/68 sm:text-[1.12rem]">
              Comment sont protégées les créations du site, comment sont traitées vos informations, et comment exercer vos droits —{" "}
              <span className="font-medium text-[#0a0a0a]/88">formulation claire et transparente</span>.
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
            { t: "Œuvres protégées", d: "Propriété intellectuelle" },
            { t: "Pas de revente", d: "Données non cédées" },
            { t: "Vos droits", d: "Accès, rectification…" },
          ].map((chip) => (
            <div
              key={chip.t}
              className="flex items-center gap-2 rounded-2xl border border-[#0a0a0a]/[0.06] bg-white/60 px-4 py-2.5 shadow-[0_4px_20px_rgba(10,10,10,0.04)] backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.25)]" aria-hidden />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#0a0a0a]/85">{chip.t}</p>
                <p className="text-[10px] text-[#0a0a0a]/45">{chip.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-7 md:gap-8">
          {sections.map((section, index) => (
            <ArticleBlock key={section.id} section={section} index={index} />
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-[1.35rem] border border-[#e20074]/20 bg-gradient-to-br from-[#e20074]/[0.08] via-white to-white p-8 text-center shadow-[0_20px_60px_rgba(226,0,116,0.1)] sm:p-10">
          <p className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0a0a0a] sm:text-xl">
            Une question sur vos données ?
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-[#0a0a0a]/58">
            Écrivez-nous à l’adresse indiquée ci-dessus pour toute demande liée à la politique de confidentialité ou à l’exercice de vos droits.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0a0a0a] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-[#1a1a1a] hover:shadow-xl"
          >
            Retour à l’accueil
          </Link>
        </div>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-[#0a0a0a]/38">
          Dernière mise à jour indicative — le contenu peut évoluer avec le site ou la réglementation.
        </p>
      </div>
    </main>
  );
}

function ArticleBlock({ section, index }: { section: Section; index: number }) {
  const showContact = "showContact" in section && section.showContact;

  return (
    <article
      id={section.id}
      className="group relative scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-[#0a0a0a]/[0.07] bg-white/85 shadow-[0_16px_48px_rgba(10,10,10,0.055)] backdrop-blur-md transition-[transform,box-shadow] duration-500 motion-reduce:transition-none md:rounded-2xl md:hover:-translate-y-0.5 md:hover:shadow-[0_24px_64px_rgba(10,10,10,0.08),0_0_0_1px_rgba(226,0,116,0.06)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(250,250,252,0.5)_40%,rgba(255,240,248,0.15)_100%)] opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#e20074] via-[#ff7ec7] to-[rgba(226,0,116,0.12)]"
      />
      <div className="relative p-7 sm:p-8 md:p-10 md:pl-11">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#e20074]/15 bg-gradient-to-br from-[#e20074]/[0.12] to-[#ff7ec7]/[0.08] shadow-inner">
              <SectionIcon name={section.icon} />
            </div>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#e20074]/80">{section.short}</p>
              <h2 className="font-display mt-1 text-[1.45rem] font-semibold tracking-[-0.03em] text-[#0a0a0a] sm:text-[1.6rem]">
                {section.title}
              </h2>
            </div>
          </div>
          <span className="font-mono text-[2.5rem] font-light leading-none text-[#0a0a0a]/[0.07] transition-colors duration-300 group-hover:text-[#e20074]/15 sm:mt-0 sm:text-[3rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-7 space-y-4 border-t border-[#0a0a0a]/[0.06] pt-7">
          {section.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`leading-[1.78] text-[#0a0a0a]/74 ${section.id === "propriete-intellectuelle" && i === 0 ? "text-[1.03rem] font-normal text-[#0a0a0a]/80" : "text-[0.975rem]"}`}
            >
              {p}
            </p>
          ))}
          {showContact ? (
            <p className="text-[0.975rem] leading-[1.78] text-[#0a0a0a]/74">
              Pour exercer ces droits, l’utilisateur peut contacter :{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-[#e20074] underline decoration-[#e20074]/35 underline-offset-2 transition hover:text-[#c40062] hover:decoration-[#c40062]/50"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
