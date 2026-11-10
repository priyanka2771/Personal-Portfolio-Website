import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GITHUB, PROJECTS } from "../data";
import { Img, PageLabel, RevealText } from "./ui";

/**
 * Pinned horizontal gallery: vertical scrolling slides the lookbook sideways.
 * Section height = viewport + the track's overflow distance, measured live.
 */
export default function Projects() {
  const section = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current)
        setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  return (
    <section
      id="projects"
      ref={section}
      style={{ height: `calc(100vh + ${dist}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24">
        <div className="px-5 md:px-10 lg:px-24">
          <PageLabel page={4} title="The Lookbook" />
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max flex-1 items-start gap-8 pt-8 px-5 pb-20 md:gap-14 md:px-10 lg:px-24"
        >
          {/* opening page */}
          <div className="w-[82vw] shrink-0 md:w-[38vw]">
            <RevealText
              text="Selected *work,* styled."
              className="font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl"
            />
            <p className="mt-6 max-w-sm text-ink/85">
              A selection of projects showcasing my frontend skills and
              experience. Keep scrolling — the page turns sideways.
            </p>
            <p className="mt-8 text-[13px] uppercase tracking-[0.18em] text-rouge">
              Scroll →
            </p>
          </div>

          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="relative h-[calc(100vh-15rem)] max-h-[74vh] min-h-[340px] w-[78vw] shrink-0 overflow-hidden text-white md:w-[34vw] lg:w-[28vw]"
            >
              <Img src={p.img} alt={p.title} className="absolute inset-0" />
              {/* scrim so overlaid text is readable on any photo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <span className="pointer-events-none absolute left-4 top-2 font-display text-7xl font-extrabold leading-none text-white/90 md:text-8xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/90 md:text-base">
                  {p.desc}
                </p>
                <p className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em]">
                  {p.tech.map((t) => (
                    <span key={t} className="border border-white/60 px-2 py-1">
                      {t}
                    </span>
                  ))}
                </p>
                <div className="mt-4 flex gap-6 text-xs font-semibold uppercase tracking-[0.16em]">
                  <a
                    href={p.live.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b-2 border-rouge pb-0.5 hover:opacity-70"
                  >
                    Live demo ↗
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-white/70 pb-0.5 hover:opacity-70"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* closing page */}
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit"
            className="flex h-[calc(100vh-15rem)] max-h-[74vh] min-h-[340px] w-[70vw] shrink-0 flex-col justify-between bg-ink p-8 text-paper md:w-[26vw]"
          >
            <span className="text-[13px] uppercase tracking-[0.18em]">End of the lookbook</span>
            <span className="font-display text-5xl italic leading-none">
              More on GitHub ↗
            </span>
          </a>
        </motion.div>

        {/* progress rule */}
        <div className="absolute inset-x-5 bottom-6 h-px bg-ink/20 md:inset-x-10 lg:inset-x-24">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full origin-left bg-rouge"
          />
        </div>
      </div>
    </section>
  );
}
