
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

export default function Client() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-[#09182B] px-4 py-20 text-center sm:py-28">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#1455A4]/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#D92323]/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.25em] text-[#60A5FA]">
            Our Clients & Partners
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Trusted Partnerships That Drive Success
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            We are proud to work with trusted organizations and industry
            partners who share our commitment to quality, safety, and
            excellence.
          </p>
        </div>
      </section>

      {/* Client Logos */}
      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#172B45] sm:text-3xl">
              Our Valued Partners
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#D92323]" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {companies.map((company) => (
              <div
                key={company.name}
                className="group flex min-h-[150px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1455A4]/40 hover:shadow-xl sm:min-h-[190px] sm:p-8"
              >
                <img
                  src={company.src}
                  alt={company.name}
                  loading="lazy"
                  className="max-h-24 max-w-full object-contain transition-transform duration-300 group-hover:scale-110 sm:max-h-32"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
