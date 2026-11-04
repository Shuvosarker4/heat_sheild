import { useState } from "react";
import { Link } from "react-router";

import RSC from "../assets/RSC.jpg";
import NIRAPAN from "../assets/NIRAPAN.jpg";
import BFSCD from "../assets/BFSCD.png";
import LEED from "../assets/LEED.jpg";
import ISO from "../assets/ISO.jpg";
import TRIGA from "../assets/TRIGA.jpg";
import SIEMENS from "../assets/SIEMENS.jpg";

const companies = [
  { name: "RSC", src: RSC },
  { name: "NIRAPAN", src: NIRAPAN },
  { name: "BFSCD", src: BFSCD },
  { name: "LEED", src: LEED },
  { name: "ISO", src: ISO },
  { name: "TRIGA", src: TRIGA },
  { name: "SIEMENS", src: SIEMENS },
];

function LogoItem({ company }) {
  return (
    <Link
      to="/client"
      aria-label={`View all clients and partners - ${company.name}`}
      className="flex h-16 w-36 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 transition duration-300 hover:scale-105 hover:border-[#1455A4] sm:h-20 sm:w-44"
    >
      <img
        src={company.src}
        alt={company.name}
        className="max-h-12 max-w-full object-contain sm:max-h-14"
        loading="lazy"
      />
    </Link>
  );
}

export default function CompanyLogoMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Company partners and certifications"
      className="w-full overflow-hidden bg-[#09182B] py-7 sm:py-9"
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
        {/* Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#09182B] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#09182B] to-transparent sm:w-24" />

        {/* Infinite Logo Marquee */}
        <div
          className="flex w-max animate-[company-scroll_28s_linear_infinite]"
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1}
              className="flex shrink-0 items-center gap-5 px-2 sm:gap-8 sm:px-4 lg:gap-12"
            >
              {companies.map((company) => (
                <LogoItem
                  key={`${group}-${company.name}`}
                  company={company}
                />
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
          .animate-\\[company-scroll_28s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}