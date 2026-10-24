
import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Flame,
  ShieldCheck,
  Activity,
  LockKeyhole,
} from "lucide-react";

const STATEMENT =
  "Protecting lives and property through reliable fire protection systems, intelligent safety engineering, and solutions built for confidence.";

const START_OPACITY = 0.16;
const WORD_DURATION = 0.22;
const SPREAD = 0.78;

function getWordProgressRange(index, count) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;

  return {
    start,
    end: Math.min(1, start + WORD_DURATION),
  };
}

function Word({ children, progress, index, count, reducedMotion }) {
  const range = getWordProgressRange(index, count);

  const opacity = useTransform(progress, (latest) => {
    if (latest <= range.start) return START_OPACITY;
    if (latest >= range.end) return 1;

    const amount =
      (latest - range.start) / (range.end - range.start);

    return START_OPACITY + (1 - START_OPACITY) * amount;
  });

  const y = useTransform(
    progress,
    [range.start, range.end],
    [10, 0]
  );

  const filter = useTransform(progress, (latest) => {
    if (latest <= range.start) return "blur(3px)";
    if (latest >= range.end) return "blur(0px)";

    const amount =
      (latest - range.start) / (range.end - range.start);

    return `blur(${3 * (1 - amount)}px)`;
  });

  return (
    <motion.span
      aria-hidden="true"
      className="hs-reveal__word"
      style={
        reducedMotion
          ? undefined
          : { opacity, y, filter }
      }
    >
      {children}
    </motion.span>
  );
}

export default function TextScrollWordReveal({
  text = STATEMENT,
  label = "Our Commitment to Safety",
  className = "",
}) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const words = text.split(/\s+/).filter(Boolean);

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={sectionRef}
      className={`hs-reveal ${className}`}
      aria-labelledby="hs-reveal-heading"
    >
      {/* Decorative background */}
      <div className="hs-reveal__background" aria-hidden="true">
        <div className="hs-reveal__grid" />

        <motion.div
          className="hs-reveal__orb hs-reveal__orb--blue"
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, 35, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="hs-reveal__orb hs-reveal__orb--red"
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, -25, 0],
                  y: [0, 25, 0],
                  scale: [1, 1.18, 1],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="hs-reveal__noise" />
      </div>

      {/* Sticky animation stage */}
      <div className="hs-reveal__stage">
        <div className="hs-reveal__container">
          {/* Top status row */}
          <motion.div
            className="hs-reveal__topbar"
            initial={reducedMotion ? false : { opacity: 0, y: -18 }}
            whileInView={
              reducedMotion
                ? undefined
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="hs-reveal__brand-mark">
              <span className="hs-reveal__brand-icon">
                <ShieldCheck size={17} strokeWidth={2.2} />
              </span>

              <span>HEAT SHIELD</span>
            </div>

            <div className="hs-reveal__status">
              <span className="hs-reveal__status-dot" />
              SAFETY IS OUR PRIORITY
            </div>
          </motion.div>

          <div className="hs-reveal__main">
            {/* Left visual rail */}
            <aside className="hs-reveal__rail" aria-hidden="true">
              <div className="hs-reveal__rail-track">
                <motion.div
                  className="hs-reveal__rail-fill"
                  style={{
                    scaleY: reducedMotion ? 1 : scrollYProgress,
                  }}
                />
              </div>

              <span className="hs-reveal__rail-label">01 — 03</span>
            </aside>

            {/* Main content */}
            <div className="hs-reveal__content">
              <motion.div
                className="hs-reveal__eyebrow"
                initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                whileInView={
                  reducedMotion
                    ? undefined
                    : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                <span className="hs-reveal__eyebrow-icon">
                  <Flame size={16} />
                </span>

                <span>{label}</span>
              </motion.div>

              <h2
                id="hs-reveal-heading"
                className="hs-reveal__heading"
                aria-label={text}
              >
                {words.map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <Word
                      progress={scrollYProgress}
                      index={index}
                      count={words.length}
                      reducedMotion={Boolean(reducedMotion)}
                    >
                      {word}
                    </Word>
                    {index < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h2>

              <motion.div
                className="hs-reveal__footer"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={
                  reducedMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <div className="hs-reveal__footer-line" />

                <p>
                  Engineered for protection.
                  <br />
                  <strong>Designed for peace of mind.</strong>
                </p>
              </motion.div>

              {/* Feature highlights */}
              <div className="hs-reveal__features">
                <motion.div
                  className="hs-reveal__feature"
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                >
                  <span className="hs-reveal__feature-icon">
                    <ShieldCheck size={18} />
                  </span>
                  <span>
                    <strong>Reliable Protection</strong>
                    <small>Safety-first solutions</small>
                  </span>
                </motion.div>

                <motion.div
                  className="hs-reveal__feature"
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.35 }}
                >
                  <span className="hs-reveal__feature-icon hs-reveal__feature-icon--red">
                    <Activity size={18} />
                  </span>
                  <span>
                    <strong>Intelligent Systems</strong>
                    <small>Engineered for confidence</small>
                  </span>
                </motion.div>

                <motion.div
                  className="hs-reveal__feature"
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.5 }}
                >
                  <span className="hs-reveal__feature-icon">
                    <LockKeyhole size={18} />
                  </span>
                  <span>
                    <strong>Peace of Mind</strong>
                    <small>Protection you can trust</small>
                  </span>
                </motion.div>
              </div>

              {/* Call to action */}
              <motion.a
                href="/service"
                className="hs-reveal__cta"
                initial={
                  reducedMotion ? false : { opacity: 0, y: 12 }
                }
                whileInView={
                  reducedMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -3, scale: 1.015 }
                }
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services
                <ArrowUpRight size={18} />
              </motion.a>
            </div>

            {/* Right decorative element */}
            <motion.div
              className="hs-reveal__visual"
              aria-hidden="true"
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.85, rotate: -8 }
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : { opacity: 1, scale: 1, rotate: 0 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="hs-reveal__visual-ring hs-reveal__visual-ring--outer"
                animate={
                  reducedMotion ? undefined : { rotate: 360 }
                }
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="hs-reveal__visual-ring hs-reveal__visual-ring--inner"
                animate={
                  reducedMotion ? undefined : { rotate: -360 }
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="hs-reveal__visual-core">
                <div className="hs-reveal__visual-glow" />
                <ShieldCheck
                  className="hs-reveal__big-shield"
                  size={76}
                  strokeWidth={1.15}
                />
                <span>PROTECTION</span>
                <strong>WITHOUT<br />COMPROMISE</strong>
              </div>

              <motion.div
                className="hs-reveal__floating-card"
                animate={
                  reducedMotion ? undefined : { y: [0, -8, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="hs-reveal__floating-icon">
                  <ShieldCheck size={19} />
                </span>
                <span>
                  <strong>Safety first</strong>
                  <small>Every second matters</small>
                </span>
              </motion.div>

              <div className="hs-reveal__visual-caption">
                <span className="hs-reveal__caption-line" />
                BUILT AROUND YOUR SAFETY
              </div>
            </motion.div>
          </div>

          {/* Bottom scroll indicator */}
          <div className="hs-reveal__bottom">
            <div className="hs-reveal__scroll-hint">
              <ArrowDown size={14} />
              <span>SCROLL TO EXPLORE</span>
            </div>

            <div className="hs-reveal__bottom-track">
              <motion.div
                className="hs-reveal__bottom-progress"
                style={{
                  width: reducedMotion ? "100%" : progressWidth,
                }}
              />
            </div>

            <span className="hs-reveal__bottom-number">01 / 01</span>
          </div>
        </div>
      </div>

      <style>{`
        .hs-reveal {
          --hs-bg: #07111f;
          --hs-panel: #0c192a;
          --hs-blue: #3b82f6;
          --hs-blue-bright: #60a5fa;
          --hs-red: #ef4444;
          --hs-text: #f4f7fb;
          --hs-muted: #91a2b8;
          --hs-border: rgba(148, 163, 184, 0.16);

          position: relative;
          width: 100%;
          min-height: 230vh;
          overflow: clip;
          isolation: isolate;
          background: var(--hs-bg);
          color: var(--hs-text);
          font-family: inherit;
          -webkit-font-smoothing: antialiased;
        }

        .hs-reveal *,
        .hs-reveal *::before,
        .hs-reveal *::after {
          box-sizing: border-box;
        }

        .hs-reveal__background {
          position: absolute;
          z-index: -1;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at 15% 15%,
              rgba(20, 85, 164, 0.15),
              transparent 42%
            ),
            linear-gradient(135deg, #07111f 0%, #091525 55%, #07101c 100%);
        }

        .hs-reveal__grid {
          position: absolute;
          inset: 0;
          opacity: 0.24;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(
            to bottom,
            black 0%,
            rgba(0, 0, 0, 0.6) 60%,
            transparent 100%
          );
        }

        .hs-reveal__noise {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
        }

        .hs-reveal__orb {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
          will-change: transform;
        }

        .hs-reveal__orb--blue {
          top: 5%;
          right: -8%;
          background: #1455a4;
        }

        .hs-reveal__orb--red {
          bottom: 5%;
          left: -12%;
          width: 320px;
          height: 320px;
          background: #d92323;
          opacity: 0.12;
        }

        .hs-reveal__stage {
          position: sticky;
          top: 0;
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          padding: 38px 48px 24px;
        }

        .hs-reveal__container {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        .hs-reveal__topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--hs-border);
        }

        .hs-reveal__brand-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #e8eef8;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: 0.15em;
        }

        .hs-reveal__brand-icon {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          color: white;
          border: 1px solid rgba(96, 165, 250, 0.35);
          border-radius: 10px;
          background: linear-gradient(
            145deg,
            rgba(37, 99, 235, 0.45),
            rgba(20, 85, 164, 0.12)
          );
          box-shadow: 0 0 24px rgba(37, 99, 235, 0.14);
        }

        .hs-reveal__status {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #9baec5;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.12em;
        }

        .hs-reveal__status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
        }

        .hs-reveal__main {
          display: grid;
          grid-template-columns: 22px minmax(0, 1.15fr) minmax(250px, 0.85fr);
          align-items: center;
          gap: clamp(28px, 4vw, 68px);
          padding: clamp(42px, 6vh, 76px) 0 42px;
        }

        .hs-reveal__rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          align-self: stretch;
          justify-content: center;
          gap: 18px;
        }

        .hs-reveal__rail-track {
          position: relative;
          width: 2px;
          height: clamp(180px, 32vh, 290px);
          overflow: hidden;
          border-radius: 10px;
          background: rgba(148, 163, 184, 0.16);
        }

        .hs-reveal__rail-fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            to bottom,
            var(--hs-blue-bright),
            var(--hs-red)
          );
          transform-origin: top;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
        }

        .hs-reveal__rail-label {
          color: #657992;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          writing-mode: vertical-rl;
        }

        .hs-reveal__content {
          min-width: 0;
          max-width: 690px;
        }

        .hs-reveal__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          color: #93c5fd;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.17em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .hs-reveal__eyebrow-icon {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 9px;
          background: rgba(239, 68, 68, 0.09);
        }

        .hs-reveal__heading {
          max-width: 19ch;
          margin: 0;
          color: var(--hs-text);
          font-size: clamp(35px, 4.15vw, 61px);
          font-weight: 750;
          letter-spacing: -0.052em;
          line-height: 1.19;
          text-wrap: pretty;
        }

        .hs-reveal__word {
          display: inline;
          will-change: opacity, transform, filter;
        }

        .hs-reveal__footer {
          display: flex;
          align-items: stretch;
          gap: 15px;
          margin-top: 30px;
        }

        .hs-reveal__footer-line {
          width: 3px;
          min-height: 43px;
          flex: 0 0 3px;
          border-radius: 10px;
          background: linear-gradient(
            to bottom,
            var(--hs-blue-bright),
            var(--hs-red)
          );
        }

        .hs-reveal__footer p {
          margin: 0;
          color: var(--hs-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .hs-reveal__footer strong {
          color: #e7edf6;
          font-weight: 650;
        }

        .hs-reveal__features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 32px;
        }

        .hs-reveal__feature {
          display: flex;
          align-items: center;
          gap: 13px;
          min-width: 0;
        }

        .hs-reveal__feature-icon {
          display: grid;
          width: 39px;
          height: 39px;
          flex: 0 0 39px;
          place-items: center;
          color: #93c5fd;
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 11px;
          background: rgba(37, 99, 235, 0.09);
        }

        .hs-reveal__feature-icon--red {
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.2);
          background: rgba(239, 68, 68, 0.08);
        }

        .hs-reveal__feature > span:last-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hs-reveal__feature strong {
          color: #e4ebf5;
          font-size: 12px;
          font-weight: 700;
        }

        .hs-reveal__feature small {
          color: #8194ad;
          font-size: 11px;
          line-height: 1.5;
        }

        .hs-reveal__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          min-height: 48px;
          margin-top: 30px;
          padding: 0 19px;
          color: white;
          border: 1px solid rgba(147, 197, 253, 0.32);
          border-radius: 10px;
          background: linear-gradient(110deg, #1455a4, #2563eb);
          box-shadow: 0 8px 30px rgba(37, 99, 235, 0.2);
          font-size: 12px;
          font-weight: 750;
          text-decoration: none;
          transition:
            border-color 200ms ease,
            box-shadow 200ms ease;
        }

        .hs-reveal__cta:hover {
          border-color: rgba(191, 219, 254, 0.7);
          box-shadow: 0 10px 36px rgba(37, 99, 235, 0.3);
        }

        .hs-reveal__cta:focus-visible {
          outline: 2px solid #93c5fd;
          outline-offset: 4px;
        }

        .hs-reveal__visual {
          position: relative;
          display: grid;
          width: 100%;
          max-width: 440px;
          aspect-ratio: 1;
          place-items: center;
          justify-self: center;
          isolation: isolate;
        }

        .hs-reveal__visual::before {
          position: absolute;
          z-index: -1;
          inset: 17%;
          border-radius: 50%;
          background: rgba(20, 85, 164, 0.2);
          content: "";
          filter: blur(45px);
        }

        .hs-reveal__visual-ring {
          position: absolute;
          border: 1px solid rgba(96, 165, 250, 0.22);
          border-radius: 50%;
        }

        .hs-reveal__visual-ring--outer {
          inset: 3%;
          border-style: dashed;
          border-color: rgba(96, 165, 250, 0.25);
        }

        .hs-reveal__visual-ring--outer::before,
        .hs-reveal__visual-ring--outer::after {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--hs-blue-bright);
          box-shadow: 0 0 18px rgba(96, 165, 250, 0.9);
          content: "";
        }

        .hs-reveal__visual-ring--outer::before {
          top: 19%;
          left: 7%;
        }

        .hs-reveal__visual-ring--outer::after {
          right: 12%;
          bottom: 13%;
          background: var(--hs-red);
          box-shadow: 0 0 18px rgba(239, 68, 68, 0.8);
        }

        .hs-reveal__visual-ring--inner {
          inset: 13%;
          border-color: rgba(96, 165, 250, 0.18);
          box-shadow:
            inset 0 0 40px rgba(37, 99, 235, 0.04),
            0 0 40px rgba(37, 99, 235, 0.04);
        }

        .hs-reveal__visual-core {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 62%;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid rgba(147, 197, 253, 0.22);
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 35%,
            #142d4d 0%,
            #0b1b30 57%,
            #091422 100%
          );
          box-shadow:
            0 0 0 12px rgba(37, 99, 235, 0.035),
            0 0 0 28px rgba(37, 99, 235, 0.025),
            0 22px 80px rgba(0, 0, 0, 0.32);
          text-align: center;
        }

        .hs-reveal__visual-glow {
          position: absolute;
          top: 12%;
          left: 20%;
          width: 60%;
          height: 50%;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.25);
          filter: blur(35px);
        }

        .hs-reveal__big-shield {
          position: relative;
          margin-bottom: 16px;
          color: #93c5fd;
          filter: drop-shadow(0 0 22px rgba(59, 130, 246, 0.45));
        }

        .hs-reveal__visual-core > span {
          color: #93c5fd;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.22em;
        }

        .hs-reveal__visual-core > strong {
          margin-top: 8px;
          color: #f4f7fb;
          font-size: clamp(10px, 1.05vw, 14px);
          font-weight: 800;
          letter-spacing: 0.09em;
          line-height: 1.65;
        }

        .hs-reveal__floating-card {
          position: absolute;
          right: -2%;
          bottom: 19%;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 13px;
          background: rgba(12, 25, 42, 0.86);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(16px);
        }

        .hs-reveal__floating-icon {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          place-items: center;
          color: #86efac;
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: 9px;
          background: rgba(22, 163, 74, 0.1);
        }

        .hs-reveal__floating-card > span:last-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hs-reveal__floating-card strong {
          color: #e8eff8;
          font-size: 11px;
          font-weight: 750;
        }

        .hs-reveal__floating-card small {
          color: #8da0b8;
          font-size: 10px;
          white-space: nowrap;
        }

        .hs-reveal__visual-caption {
          position: absolute;
          right: 3%;
          bottom: 4%;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #758aa5;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.14em;
        }

        .hs-reveal__caption-line {
          display: block;
          width: 20px;
          height: 1px;
          background: var(--hs-red);
        }

        .hs-reveal__bottom {
          display: grid;
          grid-template-columns: auto minmax(30px, 1fr) auto;
          align-items: center;
          gap: 20px;
          padding-top: 18px;
          border-top: 1px solid var(--hs-border);
        }

        .hs-reveal__scroll-hint {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #8fa2bb;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.13em;
        }

        .hs-reveal__scroll-hint svg {
          color: var(--hs-blue-bright);
        }

        .hs-reveal__bottom-track {
          position: relative;
          height: 2px;
          overflow: hidden;
          border-radius: 5px;
          background: rgba(148, 163, 184, 0.15);
        }

        .hs-reveal__bottom-progress {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            var(--hs-blue),
            var(--hs-blue-bright),
            var(--hs-red)
          );
        }

        .hs-reveal__bottom-number {
          color: #6f839d;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.1em;
        }

        @media (min-width: 1500px) {
          .hs-reveal__main {
            gap: 72px;
          }

          .hs-reveal__heading {
            font-size: 66px;
          }
        }

        @media (max-width: 1050px) {
          .hs-reveal__stage {
            padding: 30px 30px 22px;
          }

          .hs-reveal__main {
            grid-template-columns: 14px minmax(0, 1.1fr) minmax(220px, 0.9fr);
            gap: 26px;
          }

          .hs-reveal__heading {
            font-size: clamp(34px, 4.5vw, 50px);
          }

          .hs-reveal__visual {
            max-width: 340px;
          }

          .hs-reveal__floating-card {
            right: -3%;
            padding: 10px;
          }
        }

        @media (max-width: 760px) {
          .hs-reveal {
            min-height: 220vh;
          }

          .hs-reveal__stage {
            padding: 24px 22px 20px;
          }

          .hs-reveal__topbar {
            padding-bottom: 16px;
          }

          .hs-reveal__status {
            font-size: 8px;
            letter-spacing: 0.06em;
          }

          .hs-reveal__main {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 38px 0 30px;
          }

          .hs-reveal__rail {
            display: none;
          }

          .hs-reveal__content {
            max-width: 600px;
          }

          .hs-reveal__eyebrow {
            margin-bottom: 22px;
            font-size: 10px;
          }

          .hs-reveal__heading {
            max-width: 25ch;
            font-size: clamp(34px, 7.2vw, 51px);
            line-height: 1.2;
          }

          .hs-reveal__footer {
            margin-top: 22px;
          }

          .hs-reveal__features {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin-top: 24px;
          }

          .hs-reveal__feature {
            align-items: flex-start;
            flex-direction: column;
            gap: 9px;
          }

          .hs-reveal__feature strong {
            font-size: 11px;
            line-height: 1.5;
          }

          .hs-reveal__feature small {
            font-size: 10px;
          }

          .hs-reveal__cta {
            margin-top: 24px;
          }

          .hs-reveal__visual {
            width: min(70%, 300px);
            max-width: 300px;
            margin: 0 auto;
          }

          .hs-reveal__visual-caption {
            right: -15%;
            bottom: 2%;
            font-size: 8px;
          }

          .hs-reveal__bottom {
            gap: 12px;
          }

          .hs-reveal__scroll-hint {
            font-size: 8px;
            letter-spacing: 0.07em;
          }
        }

        @media (max-width: 420px) {
          .hs-reveal__stage {
            padding-right: 18px;
            padding-left: 18px;
          }

          .hs-reveal__brand-mark {
            gap: 7px;
            font-size: 10px;
            letter-spacing: 0.1em;
          }

          .hs-reveal__brand-icon {
            width: 30px;
            height: 30px;
          }

          .hs-reveal__status {
            gap: 6px;
            font-size: 7px;
          }

          .hs-reveal__heading {
            font-size: clamp(32px, 8vw, 38px);
          }

          .hs-reveal__features {
            gap: 8px;
          }

          .hs-reveal__feature-icon {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
          }

          .hs-reveal__feature strong {
            font-size: 10px;
          }

          .hs-reveal__feature small {
            font-size: 9px;
          }

          .hs-reveal__visual {
            width: 75%;
          }

          .hs-reveal__bottom-number {
            font-size: 8px;
          }
        }

        @media (max-height: 760px) and (min-width: 761px) {
          .hs-reveal__stage {
            padding-top: 20px;
            padding-bottom: 16px;
          }

          .hs-reveal__topbar {
            padding-bottom: 12px;
          }

          .hs-reveal__main {
            padding-top: 24px;
            padding-bottom: 22px;
          }

          .hs-reveal__heading {
            font-size: clamp(32px, 3.5vw, 48px);
          }

          .hs-reveal__eyebrow {
            margin-bottom: 18px;
          }

          .hs-reveal__features {
            gap: 8px;
            margin-top: 18px;
          }

          .hs-reveal__cta {
            min-height: 42px;
            margin-top: 18px;
          }

          .hs-reveal__visual {
            max-width: 320px;
          }
        }

        
@media (max-width: 760px) {
  .hs-reveal {
    min-height: 220vh;
  }

  .hs-reveal__stage {
    padding: 24px 22px 20px;
  }

  .hs-reveal__topbar {
    padding-bottom: 16px;
  }

  .hs-reveal__status {
    font-size: 8px;
    letter-spacing: 0.06em;
  }

  .hs-reveal__main {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    padding: 38px 0 30px;
  }

  .hs-reveal__rail {
    display: none;
  }

  .hs-reveal__content {
    width: 100%;
    max-width: 600px;
    min-width: 0;
  }

  .hs-reveal__eyebrow {
    margin-bottom: 22px;
    font-size: 10px;
  }

  .hs-reveal__heading {
    max-width: 25ch;
    font-size: clamp(34px, 7.2vw, 51px);
    line-height: 1.2;
  }

  .hs-reveal__footer {
    margin-top: 22px;
  }

  .hs-reveal__features {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 24px;
  }

  .hs-reveal__feature {
    min-width: 0;
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .hs-reveal__feature strong {
    font-size: 11px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  .hs-reveal__feature small {
    font-size: 10px;
    overflow-wrap: anywhere;
  }

  .hs-reveal__cta {
    margin-top: 24px;
  }

  /* Center the shield visual */
  .hs-reveal__visual {
    position: relative;
    width: min(78vw, 290px);
    max-width: 290px;
    margin: 0 auto;
    justify-self: center;
  }

  /* Keep the floating card aligned with the shield */
  .hs-reveal__floating-card {
    right: 0;
    bottom: 17%;
    left: auto;
    z-index: 3;
    width: max-content;
    max-width: 90%;
    gap: 8px;
    padding: 9px 10px;
    border-radius: 11px;
  }

  .hs-reveal__floating-icon {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
  }

  .hs-reveal__floating-card strong {
    font-size: 10px;
    line-height: 1.4;
  }

  .hs-reveal__floating-card small {
    font-size: 9px;
    line-height: 1.4;
    white-space: normal;
  }

  /* Center the caption under the visual */
  .hs-reveal__visual-caption {
    right: auto;
    bottom: -1%;
    left: 50%;
    z-index: 2;
    justify-content: center;
    gap: 6px;
    width: max-content;
    max-width: 100%;
    font-size: clamp(6px, 1.8vw, 8px);
    letter-spacing: 0.07em;
    white-space: nowrap;
    transform: translateX(-50%);
  }

  .hs-reveal__caption-line {
    width: 14px;
    flex: 0 0 14px;
  }

  .hs-reveal__bottom {
    gap: 12px;
  }

  .hs-reveal__scroll-hint {
    gap: 6px;
    font-size: 8px;
    letter-spacing: 0.04em;
  }
}

@media (max-width: 420px) {
  .hs-reveal__stage {
    padding-right: 16px;
    padding-left: 16px;
  }

  .hs-reveal__main {
    gap: 26px;
    padding-top: 28px;
    padding-bottom: 24px;
  }

  .hs-reveal__brand-mark {
    gap: 7px;
    font-size: 10px;
    letter-spacing: 0.1em;
  }

  .hs-reveal__brand-icon {
    width: 30px;
    height: 30px;
  }

  .hs-reveal__status {
    gap: 5px;
    font-size: 6px;
    letter-spacing: 0.04em;
  }

  .hs-reveal__heading {
    font-size: clamp(30px, 8vw, 38px);
  }

  .hs-reveal__features {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .hs-reveal__feature {
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }

  .hs-reveal__feature-icon {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
  }

  .hs-reveal__feature strong {
    font-size: 11px;
  }

  .hs-reveal__feature small {
    font-size: 10px;
  }

  .hs-reveal__visual {
    width: min(76vw, 250px);
    max-width: 250px;
    margin-top: 4px;
  }

  .hs-reveal__floating-card {
    right: 0;
    bottom: 16%;
    gap: 7px;
    padding: 8px;
  }

  .hs-reveal__floating-icon {
    width: 27px;
    height: 27px;
    flex-basis: 27px;
  }

  .hs-reveal__floating-card strong {
    font-size: 9px;
  }

  .hs-reveal__floating-card small {
    max-width: 100px;
    font-size: 8px;
  }

  .hs-reveal__visual-caption {
    bottom: -2%;
    font-size: 6px;
    letter-spacing: 0.045em;
  }

  .hs-reveal__bottom {
    grid-template-columns: auto minmax(20px, 1fr) auto;
    gap: 8px;
  }

  .hs-reveal__bottom-number {
    font-size: 8px;
  }
}
      `}</style>
    </section>
  );
}
