
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Flame,
  BellRing,
  CheckCircle2,
  MoveUpRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "YOUR SAFETY, OUR PRIORITY",
    title: "Protect What",
    highlight: "Matters Most.",
    description:
      "Advanced fire safety solutions to protect lives, property, and the future of your business.",
    image:
      "https://images.pexels.com/photos/21838999/pexels-photo-21838999.jpeg?auto=compress&cs=tinysrgb&w=2000",
    icon: ShieldCheck,
    tag: "Complete Fire Protection",
    buttonText: "Explore Our Services",
    href: "/service",
  },
  {
    id: 2,
    eyebrow: "EARLY WARNING SAVES LIVES",
    title: "Detect Early.",
    highlight: "Act Quickly.",
    description:
      "Discover fire alarm and smoke detection systems designed to support early warnings and safer environments.",
    image:
      "https://images.pexels.com/photos/2704254/pexels-photo-2704254.jpeg?auto=compress&cs=tinysrgb&w=2000",
    icon: BellRing,
    tag: "Advanced Detection",
    buttonText: "Explore Solutions",
    href: "/product",
  },
  {
    id: 3,
    eyebrow: "PREVENTION STARTS WITH YOU",
    title: "Be Prepared.",
    highlight: "Stay Protected.",
    description:
      "Equip your workplace with fire safety equipment and build a stronger culture of prevention.",
    image:
      "https://images.pexels.com/photos/21838999/pexels-photo-21838999.jpeg?auto=compress&cs=tinysrgb&w=2000",
    icon: Flame,
    tag: "Fire Safety Equipment",
    buttonText: "View Our Products",
    href: "/product",
  },
];

const particles = [
  { x: "12%", y: "18%", delay: 0, size: 5 },
  { x: "29%", y: "74%", delay: 0.8, size: 4 },
  { x: "47%", y: "24%", delay: 1.5, size: 6 },
  { x: "68%", y: "68%", delay: 0.4, size: 4 },
  { x: "83%", y: "19%", delay: 1.1, size: 5 },
  { x: "91%", y: "53%", delay: 1.8, size: 3 },
];

const slideVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

const contentVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: 35,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FireSafetyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeSlide = slides[activeIndex];
  const ActiveIcon = activeSlide.icon;

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const timer = window.setInterval(nextSlide, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  return (
    <section
      aria-label="Heat Shield fire safety carousel"
      className="relative isolate w-full overflow-hidden bg-[#09182b] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Main slide */}
      <div className="relative min-h-[760px] sm:min-h-[690px] lg:min-h-[720px]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeSlide.id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Animated background image */}
            <motion.div
              className="absolute inset-0"
              initial={{
                scale: reduceMotion ? 1 : 1.15,
                x: reduceMotion ? 0 : 15,
              }}
              animate={{ scale: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 7,
                ease: "easeOut",
              }}
            >
              <img
                src={activeSlide.image}
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>

            {/* Brand-colored overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#09182b]/95 via-[#102b49]/80 to-[#1455A4]/35" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#09182b]/95 via-transparent to-[#09182b]/30" />

            {/* Animated red glow */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-1/4 h-72 w-72 rounded-full bg-[#D92323]/20 blur-[100px] sm:h-96 sm:w-96"
                animate={{
                  opacity: [0.35, 0.8, 0.35],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Floating ember-like decorative particles */}
            {!reduceMotion &&
              particles.map((particle, index) => (
                <motion.span
                  key={`${activeSlide.id}-${index}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-full bg-[#ff514b] shadow-[0_0_12px_#D92323]"
                  style={{
                    left: particle.x,
                    top: particle.y,
                    width: particle.size,
                    height: particle.size,
                  }}
                  animate={{
                    y: [0, -35, -65],
                    x: [0, 10, -4],
                    opacity: [0, 0.7, 0],
                    scale: [0.7, 1.1, 0.3],
                  }}
                  transition={{
                    duration: 4 + index * 0.3,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}

            {/* Decorative rings */}
            <div className="pointer-events-none absolute -right-36 top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/10 lg:block" />

            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 top-1/2 hidden h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-white/10 lg:block"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            {/* Slide content */}
            <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-5 pb-36 pt-16 sm:min-h-[690px] sm:px-10 sm:pb-32 sm:pt-20 lg:min-h-[720px] lg:px-16">
              <motion.div
                key={`content-${activeSlide.id}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                className="w-full max-w-3xl"
              >
                {/* Eyebrow */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-xl sm:mb-7 sm:gap-3 sm:px-4"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D92323] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff514b]" />
                  </span>

                  <span className="text-[10px] font-bold tracking-[0.13em] sm:text-xs sm:tracking-[0.18em]">
                    {activeSlide.eyebrow}
                  </span>
                </motion.div>

                {/* Animated headline */}
                <motion.h1
                  variants={itemVariants}
                  className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.08] tracking-tight"
                >
                  {activeSlide.title}

                  <motion.span
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, x: -25 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.35,
                      duration: reduceMotion ? 0 : 0.7,
                    }}
                    className="mt-2 block text-[#ff514b]"
                  >
                    {activeSlide.highlight}
                  </motion.span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg"
                >
                  {activeSlide.description}
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  variants={itemVariants}
                  className="mt-7 flex w-full flex-col gap-3 min-[420px]:flex-row sm:mt-9 sm:gap-4"
                >
                  <motion.a
                    href={activeSlide.href}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#1455A4] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[420px]:w-auto sm:min-h-14 sm:px-6 sm:text-base"
                  >
                    {activeSlide.buttonText}
                    <MoveUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </motion.a>

                  <motion.a
                    href="/contact"
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[420px]:w-auto sm:min-h-14 sm:px-6 sm:text-base"
                  >
                    Contact Us
                    <ArrowRight size={18} />
                  </motion.a>
                </motion.div>

                {/* Safety highlights */}
                <motion.div
                  variants={itemVariants}
                  className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-200 sm:mt-8 sm:gap-x-7 sm:text-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#ff514b]"
                    />
                    Fire protection
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#ff514b]"
                    />
                    Safety solutions
                  </span>
                </motion.div>

                {/* Mobile-friendly feature badge */}
                <motion.div
                  variants={itemVariants}
                  className="mt-7 flex max-w-sm items-center gap-3 rounded-xl border border-white/15 bg-[#09182b]/50 p-3 backdrop-blur-lg sm:mt-8 sm:p-4 lg:hidden"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D92323]">
                    <ActiveIcon size={23} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white sm:text-base">
                      {activeSlide.tag}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Prevention, preparedness, and protection.
                    </p>
                  </div>

                  <Sparkles
                    size={17}
                    className="ml-auto shrink-0 text-[#ff514b]"
                  />
                </motion.div>
              </motion.div>

              {/* Desktop feature card */}
              <motion.div
                key={`feature-${activeSlide.id}`}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: 35, y: 20 }
                }
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: reduceMotion ? 0 : 0.5,
                }}
                className="absolute bottom-36 right-12 hidden max-w-[250px] rounded-2xl border border-white/20 bg-[#102b49]/50 p-5 shadow-2xl backdrop-blur-xl xl:block"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D92323] shadow-lg shadow-red-950/30"
                >
                  <ActiveIcon size={25} />
                </motion.div>

                <p className="text-lg font-bold">{activeSlide.tag}</p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Helping create safer spaces through fire prevention and
                  protection.
                </p>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: isPaused || reduceMotion ? 0 : 6.5,
                      ease: "linear",
                    }}
                    className="h-full rounded-full bg-[#D92323]"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 border-t border-white/10 px-5 py-4 sm:px-10 sm:py-5 lg:px-16">
          {/* Pagination */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  index === activeIndex
                    ? "w-8 bg-[#D92323] sm:w-10"
                    : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}

            <span className="ml-1 whitespace-nowrap text-xs font-semibold tracking-widest text-white/80 sm:ml-3 sm:text-sm">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-1.5 text-white/40 sm:mx-2">/</span>
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Previous and next */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition hover:border-[#D92323] hover:bg-[#D92323] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-11 sm:w-11"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition hover:border-[#D92323] hover:bg-[#D92323] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-11 sm:w-11"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
