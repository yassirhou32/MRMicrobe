"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "mr-microbe-cookie-consent";

export type CookieConsentChoice = "accepted" | "rejected";

export function getStoredCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "rejected") return v;
    return null;
  } catch {
    return null;
  }
}

function SoftShieldIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M16 4l9 4v7c0 5.5-3.8 10.2-9 11.5-5.2-1.3-9-6-9-11.5V8l9-4z"
        className="fill-[#fce7f3] stroke-[#e20074]/35"
        strokeWidth="1"
      />
      <path d="M11 16l3 3 6-7" className="stroke-[#c40062]/80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getStoredCookieConsent() === null);
  }, []);

  function save(choice: CookieConsentChoice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* private mode, etc. */
    }
    setShow(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: choice }));
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center p-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:p-4"
    >
      <div className="pointer-events-auto relative mx-auto w-full max-w-[min(29.5rem,calc(100vw-1.25rem))] p-[1.5px] sm:max-w-[32.5rem] sm:p-[2px]">
        <div
          aria-hidden
          className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[#fbcfe8]/90 via-[#fff7ed]/80 to-[#d1fae5]/50 shadow-[0_10px_32px_rgba(226,0,116,0.1),0_4px_16px_rgba(10,10,10,0.05)] sm:rounded-[1.75rem]"
        />
        <div className="relative w-full rounded-[1.4rem] border border-white/90 bg-[#fffdfb] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1.6rem] sm:px-5 sm:py-3.5">
          <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:items-start sm:gap-4 sm:text-left">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#fdf2f8] to-[#fce7f3] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[#e20074]/[0.1] sm:mt-0.5"
              aria-hidden
            >
              <SoftShieldIcon />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h2
                id="cookie-consent-title"
                className="font-display text-[1.02rem] font-semibold leading-tight tracking-[-0.02em] text-[#1a1a1a] sm:text-[1.06rem]"
              >
                Votre confort,{" "}
                <span className="bg-gradient-to-r from-[#b91c5c] to-[#e20074] bg-clip-text text-transparent">votre choix</span>
              </h2>
              <p
                id="cookie-consent-desc"
                className="mt-1.5 text-[13px] font-normal leading-[1.58] text-[#454545] sm:text-[13.5px] sm:leading-[1.62]"
              >
                Quelques cookies nous aident à faire tourner le site sereinement ; d’autres, seulement si vous le souhaitez. Rien n’est caché : vous
                pouvez dire oui ou non, et changer d’avis quand vous voulez.
              </p>
              <p className="mt-1.5 text-[11.5px] leading-normal text-[#5c5c5c] sm:text-[12px]">
                <Link
                  href="/cookies"
                  className="font-medium text-[#b91c5c] underline decoration-[#e20074]/22 underline-offset-2 transition hover:text-[#9d174d] hover:decoration-[#e20074]/40"
                >
                  Détails sur les cookies
                </Link>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-3 flex max-w-none gap-2 sm:mt-2.5 sm:pl-[3.75rem]">
            <button
              type="button"
              onClick={() => save("rejected")}
              className="min-h-0 flex-1 rounded-full border border-[#0a0a0a]/[0.08] bg-white/95 py-2.5 text-[13px] font-medium leading-none text-[#454545] shadow-[0_1px_0_rgba(255,255,255,1)_inset] transition hover:border-[#0a0a0a]/12 hover:bg-[#fafafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e20074]/25 focus-visible:ring-offset-1 sm:py-2.5 sm:text-[13.5px]"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => save("accepted")}
              className="min-h-0 flex-1 rounded-full border border-[#2a2a2a]/10 bg-gradient-to-b from-[#333] to-[#1f1f1f] py-2.5 text-[13px] font-medium leading-none text-[#fafafa] shadow-[0_3px_12px_rgba(10,10,10,0.12)] transition hover:from-[#3d3d3d] hover:to-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e20074]/35 focus-visible:ring-offset-1 sm:py-2.5 sm:text-[13.5px]"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
