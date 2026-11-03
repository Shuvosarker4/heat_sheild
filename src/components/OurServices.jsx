
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Logo1 from "../assets/logo.png";

const services = [
  {
    id: 1,
    title: "Fire Protection System Design & Consultancy",
    image: Logo1,
  },
  {
    id: 2,
    title: "Fire Detection & Alarm System Installation",
    image: Logo1,
  },
  {
    id: 3,
    title: "Fire Suppression & Extinguishing Systems",
    image: Logo1,
  },
  {
    id: 4,
    title: "Electrical & Lightning Safety",
    image: Logo1,
  },
  {
    id: 5,
    title: "Fire Door & Emergency Exit Solutions",
    image: "/images/services/fire-door.jpg",
  },
  {
    id: 6,
    title: "Inspection, Testing & Commissioning",
    image: "/images/services/inspection.jpg",
  },
  {
    id: 7,
    title: "Maintenance & Annual Service Contracts (AMC)",
    image: "/images/services/maintenance.jpg",
  },
  {
    id: 8,
    title: "Fire Safety Equipment",
    image: "/images/services/fire-equipment.jpg",
  },
];

const OurServices = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#09182B] py-20 sm:py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#1455A4]/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#D92323]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:text-left"
        >
          <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
            <span className="h-1 w-8 rounded-full bg-[#D92323]" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              What We Do
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our <span className="text-[#D92323]">Services</span>
          </h2>

          <p className="mt-3 text-sm font-semibold tracking-[0.18em] text-blue-300 sm:text-base">
            Discover What We Offer
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:mx-0 sm:text-base">
            Complete fire protection and safety solutions designed to protect
            lives, properties, and businesses with confidence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{
                  duration: 0.4,
                  delay: index >= 6 ? (index - 6) * 0.1 : 0,
                }}
                whileHover={{ y: -8 }}
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-[#172B45] px-5 pb-7 pt-8 text-center shadow-lg shadow-black/10 transition-all duration-300 hover:border-[#1455A4] hover:shadow-[0_18px_45px_rgba(20,85,164,0.2)]"
              >
                {/* Top Hover Accent */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#D92323] transition-all duration-500 group-hover:w-full" />

                {/* Image */}
                <div className="relative mb-7">

                  {/* Outer Glow */}
                  <div className="absolute -inset-3 rounded-full bg-[#1455A4]/0 blur-xl transition-all duration-500 group-hover:bg-[#1455A4]/30" />

                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-[3px] border-[#1455A4] bg-[#09182B] p-1 transition-all duration-500 group-hover:rotate-2 group-hover:border-[#D92323] sm:h-44 sm:w-44">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#172B45] bg-[#1455A4] text-sm font-bold text-white shadow-md transition-colors duration-300 group-hover:bg-[#D92323]">
                    {String(service.id).padStart(2, "0")}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="flex min-h-[52px] items-center justify-center text-base font-bold leading-6 text-white transition-colors duration-300 group-hover:text-blue-300">
                  {service.title}
                </h3>

                {/* Bottom Accent */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-[3px] w-7 rounded-full bg-[#D92323] transition-all duration-300 group-hover:w-12" />
                  <span className="h-[3px] w-3 rounded-full bg-blue-400/40 transition-all duration-300 group-hover:w-6" />
                </div>

                {/* Hover Link */}
                <div className="mt-5 flex translate-y-2 items-center gap-2 text-sm font-bold text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Service
                  <ArrowUpRight size={17} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Show Less */}
        {services.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 rounded-full border border-blue-500/50 bg-[#1455A4]/15 px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#D92323] hover:bg-[#D92323] hover:shadow-lg hover:shadow-red-900/20"
            >
              {showAll ? "Show Less" : "See More Services"}

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  showAll ? "rotate-180" : "group-hover:translate-y-1"
                }`}
              />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default OurServices;
