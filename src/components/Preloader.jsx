import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const id = setInterval(() => {
      setN((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + Math.ceil(Math.random() * 7);
      });
    }, 55);
    return () => {
      clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (n >= 100) {
      const t = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, 350);
      return () => clearTimeout(t);
    }
  }, [n]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="pre"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-paper md:p-10"
        >
          <div className="flex justify-between text-[13px] uppercase tracking-[0.18em]">
            <span>Priyanka — Portfolio</span>
            <span>Issue Nº 01</span>
          </div>
          <div className="font-display text-[28vw] font-extrabold leading-none tracking-tighter">
            {Math.min(n, 100)}
          </div>
          <div>
            <div className="h-px w-full bg-paper/20">
              <div
                className="h-full bg-rouge transition-all duration-100"
                style={{ width: `${Math.min(n, 100)}%` }}
              />
            </div>
            <p className="mt-3 text-[13px] uppercase tracking-[0.18em]">
              Going to print…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
