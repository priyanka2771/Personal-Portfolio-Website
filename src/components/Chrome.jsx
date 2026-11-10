import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { SECTIONS } from "../data";

/**
 * Fixed furniture that stays put while pages scroll underneath:
 * top progress bar, left spine text, right page counter, back-to-top.
 */
export default function Chrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [active, setActive] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(SECTIONS.findIndex((s) => s.id === e.target.id));
        }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const cur = SECTIONS[Math.max(active, 0)];

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-rouge"
      />

      {/* left spine */}
      <div className="pointer-events-none fixed bottom-8 left-5 z-40 hidden lg:block">
        <p className="vertical-text rotate-180 text-xs font-medium uppercase tracking-[0.16em] text-ink/80">
          Priyanka · Portfolio · Issue Nº 01
        </p>
      </div>

      {/* right page counter */}
      <div className="pointer-events-none fixed bottom-8 right-5 z-40 hidden flex-col items-end gap-3 lg:flex">
        <div className="flex flex-col items-center gap-2">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={s.label}
              className="pointer-events-auto block h-6 w-3 py-[10px]"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  i === active ? "w-3 bg-rouge" : "w-1.5 bg-ink/40"
                }`}
              />
            </a>
          ))}
        </div>
        <div className="text-right text-xs font-medium uppercase tracking-[0.18em]">
          <AnimatePresence mode="wait">
            <motion.p
              key={cur.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-rouge">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(SECTIONS.length).padStart(2, "0")} — {cur.label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#hero"
            data-cursor="Top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-6 left-1/2 z-40 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-ink text-paper"
            aria-label="Back to top"
          >
            ↑
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
