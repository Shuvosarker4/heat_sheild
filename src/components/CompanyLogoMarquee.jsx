import { useState } from "react";
import RSC from "../assets/RSC.jpg"
import NIRAPAN from "../assets/NIRAPAN.jpg"
import BFSCD from "../assets/BFSCD.png"
import LEED from "../assets/LEED.jpg"
import ISO from "../assets/ISO.jpg"
import TRIGA from "../assets/TRIGA.jpg"
import SIEMENS from "../assets/SIEMENS.jpg"
import HONEYWELL from "../assets/HONEYWELL.jpg"
import ASICO from "../assets/ASICO.jpg"

// Replace these placeholder names with your actual company logos when ready.
const companies = [
  { name: "COMPANY ONE", src: RSC },
  { name: "COMPANY TWO", src: NIRAPAN },
  { name: "COMPANY THREE", src: BFSCD },
  { name: "COMPANY FOUR", src: LEED },
  { name: "COMPANY FIVE", src: ISO },
  { name: "COMPANY FIVE", src: TRIGA },
  { name: "COMPANY FIVE", src: SIEMENS },
  { name: "COMPANY FIVE", src: ASICO },
  { name: "COMPANY FIVE", src: HONEYWELL },
  
];

function LogoItem({ company }) {
  return (
    <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 sm:h-20 sm:w-44">
      {company.src ? (
        <img
          src={company.src}
          alt={company.name}
          className="max-h-12 max-w-full object-contain sm:max-h-14"
          loading="lazy"
        />
      ) : (
        <span className="text-center text-xs font-extrabold tracking-wide text-[#172B45] sm:text-sm">
          {company.name}
        </span>
      )}
    </div>
  );
}

export default function CompanyLogoMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Company partners and certifications"
      className="w-full overflow-hidden bg-[#09182b] py-7 sm:py-9"
    >
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false);
          }
        }}
      >
        {/* Gradient fades at the edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#091E22] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#091E22] to-transparent sm:w-24" />

        <div
          className="flex w-max animate-[company-scroll_28s_linear_infinite]"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1 ? "true" : undefined}
              className="flex shrink-0 items-center gap-5 px-2 sm:gap-8 sm:px-4 lg:gap-12"
            >
              {companies.map((company) => (
                <LogoItem key={company.name} company={company} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes company-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\[company-scroll_28s_linear_infinite\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
