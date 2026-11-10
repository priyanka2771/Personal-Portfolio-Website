import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/** Custom cursor: a dot that swells over links/buttons, with an optional label (data-cursor="View"). */
export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest?.("a, button, [data-cursor], input, textarea");
      setHover(!!t);
      setLabel(t?.getAttribute?.("data-cursor") || "");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[95]"
    >
      <motion.div
        animate={{ width: hover ? (label ? 88 : 56) : 14, height: hover ? (label ? 88 : 56) : 14 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white mix-blend-difference"
      >
        {label && (
          <span className="text-xs font-semibold uppercase tracking-widest text-black">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
