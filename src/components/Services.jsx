import { motion } from "framer-motion";
import { IMG, SERVICES } from "../data";
import { Img, Marquee, PageLabel, RevealText } from "./ui";

export default function Services() {
  return (
    <section id="services" className="bg-ink text-paper">
      <Marquee
        items={["Frontend", "UI Design", "Performance", "API Integration", "React", "Tailwind"]}
        className="border-b border-paper/20 py-4 font-display text-2xl italic md:text-4xl"
      />

      {/* full-bleed feature photo with the headline set over it */}
      <div className="relative h-[75vh] overflow-hidden text-white">
        <Img src={IMG.features} alt="Features spread" parallax className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        <div className="absolute inset-x-0 top-0 px-5 pt-8 md:px-10 lg:px-24">
          <PageLabel page={3} title="Features" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 lg:px-24">
          <RevealText
            text="What’s *inside* this issue."
            emClass="italic text-white"
            className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-8xl"
          />
          <p className="mt-5 max-w-xl text-lg text-white/95">
            I focus on building clean, scalable and user-friendly web interfaces
            using modern frontend technologies.
          </p>
        </div>
      </div>

      <div className="px-5 pb-24 pt-16 md:px-10 lg:px-24">

        <ul className="mt-16 border-t border-paper/25">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              data-cursor="Read"
              className="group relative overflow-hidden border-b border-paper/25"
            >
              {/* colour wipe on hover */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-rouge transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              <div className="relative grid items-baseline gap-3 py-8 md:grid-cols-12 md:gap-6">
                <span className="text-xs tracking-widest text-paper/85 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-4xl font-semibold transition-transform duration-500 group-hover:translate-x-3 group-hover:italic md:col-span-5 md:text-6xl">
                  {s.title}
                </h3>
                <div className="md:col-span-5">
                  <p className="text-paper/90 group-hover:text-white">{s.desc}</p>
                  <p className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em]">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-paper/40 px-3 py-1">
                        {t}
                      </span>
                    ))}
                  </p>
                </div>
                <span className="hidden text-3xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45 md:col-span-1 md:block md:text-right">
                  →
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  );
}
