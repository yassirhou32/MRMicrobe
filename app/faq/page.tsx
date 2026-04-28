"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
];

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f5f5f5] px-6 py-14 text-[#0a0a0a] md:px-10 md:py-16">
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
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.42)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#0a0a0a]/18 bg-white/55 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#0a0a0a]/76 transition hover:bg-white/80"
          >
            <span aria-hidden>←</span>
            Retour
          </Link>
        </div>
        <div className="relative mb-8 md:mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#0a0a0a]/46">FAQ immersion</p>
          <h1 className="mt-2 text-[clamp(2.5rem,6.3vw,6.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-[#0a0a0a]/92">
            Questions
          </h1>
          <p className="-mt-1 text-[clamp(2.3rem,6vw,5.7rem)] font-semibold uppercase leading-[0.86] tracking-[-0.04em] text-[#e20074]">
            Reponse
          </p>
        </div>

        <div className="grid border-t border-[#0a0a0a]/12 md:grid-cols-2">
          {immersionFaq.map((item, index) => (
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
              <p className="mt-2 font-display text-[clamp(1.7rem,2.5vw,2.6rem)] font-black leading-[1.1] text-[#0a0a0a]/78">{item.q}</p>
              <p className="mx-auto mt-3 max-w-[42ch] text-[clamp(0.98rem,1.05vw,1.15rem)] leading-[1.62] text-[#0a0a0a]/58">{item.a}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

