import { motion } from "framer-motion";
import { IMG, PROJECTS, SERVICES, SKILLS } from "../data";
import { CountUp, Img, PageLabel, RevealText } from "./ui";

const EASE = [0.76, 0, 0.24, 1];

export default function About() {
  return (
    <section id="about" className="px-5 pb-28 pt-28 md:px-10 lg:px-24">
      <PageLabel page={2} title="Editor's Letter" />

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        {/* fixed-position image: stays pinned while the letter scrolls past */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Img
              src={IMG.letter}
              alt="Editorial portrait"
              parallax
              className="aspect-[3/4] w-full lg:h-[75vh] lg:aspect-auto"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink/80">
              Fig. 01 — Editor’s pick
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <RevealText
            text="Clean *interfaces,* quietly confident."
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9 }}
            className="mt-10 columns-1 gap-10 text-lg leading-relaxed md:columns-2"
          >
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-8xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-rouge">
              I’m Priyanka, a passionate frontend developer who enjoys building
              clean, responsive and user-focused web applications. I love
              turning ideas into interactive experiences using modern tools.
            </p>
            <p className="mt-4 text-ink/85">
              Currently focused on React, Bootstrap and improving my overall
              UI/UX thinking while working on real-world projects.
            </p>
          </motion.div>

          <blockquote className="my-14 border-l-2 border-rouge pl-6 font-display text-3xl italic leading-snug md:text-4xl">
            “Turning ideas into interactive experiences.”
          </blockquote>

          {/* stats */}
          <div className="grid grid-cols-3 border-y border-ink/20 py-8 text-center">
            {[
              [PROJECTS.length, "Projects"],
              [SERVICES.length, "Services"],
              [SKILLS.length, "Core skills"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-5xl font-semibold md:text-7xl">
                  <CountUp to={n} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/80">{l}</p>
              </div>
            ))}
          </div>

          {/* skills index */}
          <h3 className="mb-2 mt-14 text-[13px] font-semibold uppercase tracking-[0.18em] text-rouge">
            Skills & Focus — the index
          </h3>
          <ul>
            {SKILLS.map((s, i) => (
              <li key={s} className="relative">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-ink/25"
                />
                <div className="group flex items-baseline gap-4 py-4 transition-transform duration-500 hover:translate-x-3">
                  <span className="text-xs tracking-widest text-rouge">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl md:text-3xl">{s}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
