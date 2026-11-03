
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import P1 from "../assets/product/p1.jpg";
import P2 from "../assets/product/p2.jpg";
import P3 from "../assets/product/p3.jpg";
import P4 from "../assets/product/p4.jpg";
import P5 from "../assets/product/p5.jpg";
import P6 from "../assets/product/p6.jpg";
import P7 from "../assets/product/p7.jpg";
import Logo1 from "../assets/logo.png";

const products = [
  { id: 1, name: "4100ES Fire Control Unit", image: P1 },
  { id: 2, name: "4100ES One, Two and Three-Bay Cabinets", image: P2 },
  { id: 3, name: "4009 IDNet NAC Extender", image: P3 },
  { id: 4, name: "4009 IDNAC Repeater", image: P4 },
  { id: 5, name: "4010ES Fire Control Units (Conventional), North America", image: P5 },
  { id: 6, name: "TrueAlarm Multi-Sensor & Bases", image: P6 },
  { id: 7, name: "4099-9021 Single Action NO GRIP operation", image: P7 },
  { id: 8, name: "S-A4011 SHIELD Detector", image: Logo1 },
  { id: 9, name: "TR-HEAT-ROR-W TRIGA", image: Logo1 },
  { id: 10, name: "Simplex 4098-9733 Detector", image: Logo1 },
  { id: 11, name: "S-A4012 Multi Detector", image: Logo1 },
  { id: 12, name: "S-A4061 Manual Call Point", image: Logo1 },
];

// ==========================================
// PRODUCT CARD
// ==========================================

const ProductCard = ({ product }) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group/card w-[165px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#172B45] p-2 shadow-lg transition-all duration-300 hover:border-[#1455A4] hover:shadow-[0_12px_30px_rgba(20,85,164,0.2)] sm:w-[190px] lg:w-[215px]"
    >
      {/* Product Image */}
      <div className="relative flex h-[125px] items-center justify-center overflow-hidden rounded-lg bg-white p-3 sm:h-[145px] lg:h-[155px]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          draggable="false"
          className="h-full w-full object-contain transition-transform duration-500 group-hover/card:scale-110"
        />

        {/* Product Number */}
        <span className="absolute left-2 top-2 rounded-full bg-[#172B45] px-2 py-1 text-[9px] font-bold tracking-wider text-white">
          PRODUCT {String(product.id).padStart(2, "0")}
        </span>
      </div>

      {/* Product Information */}
      <div className="px-1 pb-2 pt-3">
        <h3 className="min-h-[40px] text-xs font-bold leading-5 text-white transition-colors duration-300 group-hover/card:text-blue-300 sm:text-sm">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="h-[3px] w-8 rounded-full bg-[#D92323] transition-all duration-300 group-hover/card:w-12" />

          <span className="text-[10px] font-semibold text-blue-400">
            Heat Shield
          </span>
        </div>
      </div>
    </motion.article>
  );
};

// ==========================================
// PRODUCT SLIDER ROW
// ==========================================

const ProductMarqueeRow = ({ items, reverse = false }) => {
  const sliderRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  const duplicatedItems = [...items, ...items];

  // Get one card's movement distance
  const getScrollDistance = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;

    const card = slider.querySelector(".product-card");

    if (!card) return 0;

    const gap = parseFloat(getComputedStyle(slider).gap) || 16;

    return card.offsetWidth + gap;
  };

  // Infinite scroll position correction
  const normalizePosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const halfWidth = slider.scrollWidth / 2;

    if (slider.scrollLeft >= halfWidth) {
      slider.scrollLeft -= halfWidth;
    } else if (slider.scrollLeft < 0) {
      slider.scrollLeft += halfWidth;
    }
  };

  // Move one card manually or automatically
  const moveOneCard = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const distance = getScrollDistance();
    if (!distance) return;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });

    clearTimeout(resetTimeoutRef.current);

    resetTimeoutRef.current = setTimeout(() => {
      normalizePosition();
    }, 650);
  };

  // Automatic movement
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Start reverse row from the duplicated section.
    if (reverse) {
      slider.scrollLeft = slider.scrollWidth / 2;
    }

    const interval = setInterval(() => {
      moveOneCard(reverse ? -1 : 1);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(resetTimeoutRef.current);
    };
  }, [reverse]);

  return (
    <div className="group/row relative">

      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => moveOneCard(-1)}
        aria-label="Scroll products left"
        className="absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#172B45]/95 text-white opacity-100 shadow-lg transition-all duration-300 hover:border-[#D92323] hover:bg-[#D92323] sm:left-3 sm:opacity-0 sm:group-hover/row:opacity-100 focus:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Product Track */}
      <div
        ref={sliderRef}
        onScroll={() => {
          clearTimeout(resetTimeoutRef.current);

          resetTimeoutRef.current = setTimeout(() => {
            normalizePosition();
          }, 700);
        }}
        className="flex gap-4 overflow-x-auto scroll-smooth py-3 sm:gap-5"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#1455A4 #172B45",
          touchAction: "pan-x",
        }}
      >
        {duplicatedItems.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="product-card shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => moveOneCard(1)}
        aria-label="Scroll products right"
        className="absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#172B45]/95 text-white opacity-100 shadow-lg transition-all duration-300 hover:border-[#D92323] hover:bg-[#D92323] sm:right-3 sm:opacity-0 sm:group-hover/row:opacity-100 focus:opacity-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// ==========================================
// OUR PRODUCTS SECTION
// ==========================================

const OurProducts = () => {
  const firstRow = products.slice(0, 6);
  const secondRow = products.slice(6, 12);

  return (
    <section className="relative overflow-hidden bg-[#09182B] py-16 sm:py-20">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#1455A4]/15 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#D92323]/10 blur-[120px]" />

      <div className="relative">

        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
              <span className="h-1 w-8 rounded-full bg-[#D92323]" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                Our Collection
              </span>
            </div>

            <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-left sm:text-4xl lg:text-5xl">
              Our <span className="text-[#D92323]">Products</span>
            </h2>

            <p className="mt-3 text-center text-sm font-semibold tracking-[0.18em] text-blue-300 sm:text-left sm:text-base">
              Where Quality Meets Innovation
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-gray-400 sm:mx-0 sm:text-left sm:text-base">
              Explore our range of reliable fire protection and safety
              equipment, engineered to deliver quality, performance,
              and peace of mind.
            </p>
          </motion.div>
        </div>

        {/* Slider Information */}
        <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <p className="text-xs font-medium tracking-wide text-gray-500 sm:text-sm">
            Explore our product collection
          </p>

          <span className="text-xs font-semibold text-blue-400">
            <span className="hidden sm:inline">Swipe or use arrows </span>
            <span className="sm:hidden">Swipe to explore</span>
          </span>
        </div>

        {/* Two Row Product Slider */}
        <div className="relative space-y-4 overflow-hidden px-3 sm:space-y-5 sm:px-5">

          {/* Left Gradient */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-5 bg-gradient-to-r from-[#09182B] to-transparent sm:w-10 lg:w-16" />

          {/* Right Gradient */}
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-5 bg-gradient-to-l from-[#09182B] to-transparent sm:w-10 lg:w-16" />

          {/* First Row: Moves Left */}
          <ProductMarqueeRow items={firstRow} />

          {/* Second Row: Moves Right */}
          <ProductMarqueeRow items={secondRow} reverse />
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
