import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

/** Words slide up out of a mask. Wrap a word in *asterisks* for italic rouge. */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  animateNow,
  emClass = "italic text-rouge",
}) {
  const words = text.split(" ");
  const trigger =
    animateNow === undefined
      ? { whileInView: { y: 0 }, viewport: { once: true, margin: "-10%" } }
      : { animate: { y: animateNow ? 0 : "110%" } };
  return (
    <Tag className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((w, i) => {
        const em = w.startsWith("*");
        return (
          <span
            key={i}
            aria-hidden
            className="mr-[0.25em] inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom"
          >
            <motion.span
              className={`inline-block ${em ? emClass : ""}`}
              initial={{ y: "110%" }}
              {...trigger}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
            >
              {w.replace(/\*/g, "")}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/**
 * Magazine-style image: shimmer placeholder -> blur-up on load -> curtain
 * (clip-path) reveal on scroll. Optional parallax and grayscale-to-colour hover.
 */
export function Img({
  src,
  alt = "",
  className = "",
  parallax = false,
  pos = "center",
}) {
  const wrap = useRef(null);
  const img = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  // cached images can finish before React attaches onLoad
  useEffect(() => {
    if (img.current?.complete) setLoaded(true);
  }, []);

  const inView = useInView(wrap, { once: true, margin: "-8%" });
  const isAbs = className.includes("absolute") || className.includes("fixed");

  return (
    <div
      ref={wrap}
      style={isAbs ? { position: "absolute" } : { position: "relative" }}
      className={`group overflow-hidden bg-ink/10 ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
        </div>
      )}
      {/* the clip-path curtain lives on an inner layer: if the observed box
          itself were clipped to nothing, the browser would never report it in view */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <motion.img
          ref={img}
          src={src}
          alt={alt}
          loading="eager"
          onLoad={() => setLoaded(true)}
          style={
            parallax
              ? { y, scale: 1.22, objectPosition: pos }
              : { objectPosition: pos }
          }
          className={`h-full w-full object-cover transition-[opacity,filter,transform] duration-[1400ms] ease-out ${
            parallax ? "" : "group-hover:scale-105"
          } ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-2xl"}`}
        />
      </motion.div>
    </div>
  );
}

export function Marquee({ items, className = "" }) {
  const row = (k) => (
    <div
      key={k}
      aria-hidden={k > 0}
      className="flex shrink-0 animate-scroll-loop items-center"
    >
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-8">{t}</span>
          <span className="text-rouge">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`flex overflow-hidden ${className}`}>
      {row(0)}
      {row(1)}
    </div>
  );
}

export function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (l) => setV(Math.round(l)),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/** Small running header at the top of every "page". */
export function PageLabel({ page, title }) {
  return (
    <div className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.18em]">
      <span className="text-rouge">Page {String(page).padStart(2, "0")}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="h-px flex-1 origin-left bg-ink/40"
      />
      <span>{title}</span>
    </div>
  );
}
