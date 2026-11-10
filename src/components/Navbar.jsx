import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS, EMAIL, GITHUB } from "../data";

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
    setTheme(next);
  };
  return [theme, toggle];
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* white + difference blend = readable on any background */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10">
        <a href="#hero" className="font-display text-xl font-extrabold tracking-tight">
          P<span className="italic">.</span>R
        </a>
        <p className="hidden text-[13px] uppercase tracking-[0.18em] md:block">
          Issue Nº 01 · {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-5 text-[13px] font-medium uppercase tracking-[0.16em]">
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "Night" : "Day"}
          </button>
          <button onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 text-paper md:px-16"
          >
            <p className="mb-6 text-[13px] uppercase tracking-[0.18em] text-paper/85">
              Table of contents
            </p>
            <ul>
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="overflow-hidden border-b border-paper/15">
                  <motion.a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.25 + i * 0.07 }}
                    className="group flex items-baseline gap-5 py-3 font-display text-5xl font-semibold tracking-tight transition-colors hover:text-rouge md:text-7xl"
                  >
                    <span className="font-sans text-xs font-normal tracking-widest text-paper/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-transform duration-500 group-hover:translate-x-4 group-hover:italic">
                      {s.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.16em] text-paper/90">
              <a href={`mailto:${EMAIL}`} className="hover:text-rouge">{EMAIL}</a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-rouge">GitHub ↗</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
