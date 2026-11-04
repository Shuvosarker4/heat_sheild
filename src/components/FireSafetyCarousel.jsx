
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import Image1 from "../assets/slider/s1.png";
import Image2 from "../assets/slider/s2.png";
import Image3 from "../assets/slider/s3.png";
import Image4 from "../assets/slider/s4.png";

const slides = [Image1, Image2, Image3, Image4];

export default function FireSafetyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      aria-label="Fire safety image carousel"
      className="w-full overflow-hidden bg-[#09182B]"
    >
      <div className="relative w-full overflow-hidden bg-[#09182B]">
        <div className="relative h-[220px] w-full sm:h-[380px] md:h-[440px] lg:h-[560px] xl:h-[660px]">
          {slides.map((image, index) => (
            <motion.div
              key={image}
              initial={false}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                ease: "easeInOut",
              }}
              aria-hidden={activeIndex !== index}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={image}
                alt={`Fire safety image ${index + 1}`}
                draggable="false"
                className="block h-full w-full object-contain sm:object-cover"
              />
            </motion.div>
          ))}

          {/* Pagination Dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#09182B]/70 px-3 py-2 backdrop-blur-md sm:bottom-5 sm:gap-3 sm:px-4">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                  index === activeIndex
                    ? "w-6 bg-[#D92323] sm:w-8"
                    : "w-1.5 bg-white/70 hover:bg-white sm:w-2"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute right-2 top-2 z-10 rounded-full border border-white/20 bg-[#09182B]/70 px-2 py-1 text-[10px] font-semibold tabular-nums text-white backdrop-blur-md sm:right-5 sm:top-5 sm:px-3 sm:py-1.5 sm:text-xs">
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="mx-1 text-white/50">/</span>
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
