import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG, NAME, PROJECTS, SERVICES } from "../data";
import { Img } from "./ui";

const EASE = [0.76, 0, 0.24, 1];

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mastY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate min-h-screen overflow-hidden bg-black text-white"
    >
      {ready && (
        <>
          {/* full-bleed cover photo, in colour */}
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0 z-0"
          >
            <Img
              src={IMG.cover}
              alt="Stag silhouette at dusk"
              pos="30% 50%"
              className="h-full w-full"
            />
          </motion.div>
          {/* light scrim — keeps the deer visible, text still readable */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-transparent to-black/55" />

          {/* masthead */}
          <motion.h1
            style={{ y: mastY }}
            aria-label={NAME}
            className="pointer-events-none absolute inset-x-0 top-[8vh] z-10 flex justify-center font-display text-[17vw] font-extrabold uppercase leading-[0.85] tracking-tight"
          >
            {NAME.split("").map((ch, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.07 }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* cover lines */}
          <motion.div
            style={{ opacity: fade }}
            className="absolute right-5 top-[44vh] z-10 flex max-w-[11rem] flex-col items-end gap-6 text-right md:right-10 md:max-w-sm"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="max-w-[10rem] md:max-w-sm"
            >
              <p className="inline-block bg-rouge px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.16em]">
                The Frontend Issue
              </p>
              <p className="mt-3 font-display text-2xl font-semibold leading-snug md:text-4xl">
                Frontend Developer, <em>obsessed</em> with detail.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.25, duration: 0.9 }}
              className="hidden max-w-[14rem] text-right sm:block"
            >
              <p className="inline-block bg-rouge px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.16em]">
                Inside
              </p>
              <p className="mt-3 text-base leading-relaxed md:text-lg">
                React · Tailwind · Motion
                <br />{PROJECTS.length} projects · {SERVICES.length} services
              </p>
            </motion.div>
          </motion.div>

          {/* bottom bar */}
          <motion.div
            style={{ opacity: fade }}
            className="absolute inset-x-5 bottom-6 z-10 flex items-end justify-between md:inset-x-10"
          >
            <div className="text-sm uppercase leading-relaxed tracking-[0.16em]">
              <p>Issue Nº 01</p>
              <p>
                {new Date().toLocaleDateString("en", { month: "long", year: "numeric" })}
              </p>
            </div>
            <a
              href="#about"
              data-cursor="Open"
              className="flex flex-col items-center gap-2 text-sm uppercase tracking-[0.16em]"
            >
              Turn the page
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="block h-8 w-px bg-white"
              />
            </a>
            <div className="hidden w-28 sm:block" aria-hidden />
          </motion.div>
        </>
      )}
    </section>
  );
}
