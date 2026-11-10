import { useState } from "react";
import { EMAIL, GITHUB, IMG } from "../data";
import { Img, Marquee, PageLabel, RevealText } from "./ui";

function Field({ label, name, type = "text", area, value, onChange, error }) {
  const Tag = area ? "textarea" : "input";
  return (
    <label className="relative block">
      <Tag
        name={name}
        type={area ? undefined : type}
        rows={area ? 4 : undefined}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="peer w-full border-b border-white/50 bg-transparent pb-2 pt-7 text-lg text-white outline-none transition-colors focus:border-white"
      />
      <span className="pointer-events-none absolute left-0 top-6 origin-left text-xs uppercase tracking-[0.16em] text-white/90 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-90">
        {label}
      </span>
      {error && <span className="mt-1 block text-xs text-white">⚠ {error}</span>}
    </label>
  );
}

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Please tell me your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "That email doesn’t look right.";
    if (f.message.trim().length < 5) er.message = "Say a little more?";
    setErrors(er);
    if (Object.keys(er).length) return;
    const subject = encodeURIComponent(`Portfolio message from ${f.name}`);
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative isolate bg-rouge text-white">
      {/* photo tinted into the red page (multiply) */}
      <Img
        src={IMG.contact}
        alt=""
        parallax
        className="absolute inset-0 -z-10 opacity-60 mix-blend-multiply"
      />
      <div className="px-5 pb-10 pt-20 md:px-10 lg:px-24">
        <PageLabel page={5} title="Letters to the Editor" />

        <RevealText
          text="Let’s make something *worth printing.*"
          emClass="italic text-ink"
          className="mt-12 max-w-5xl font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-9xl"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-sm text-lg text-white/90">
              Have a project, question, or just want to say hi? Feel free to
              reach out!
            </p>
            <div className="mt-8 space-y-4 text-sm uppercase tracking-[0.14em]">
              <button
                onClick={copy}
                data-cursor={copied ? "Copied" : "Copy"}
                className="block border-b border-white/60 pb-1 text-left normal-case tracking-normal text-2xl font-display"
              >
                {copied ? "Copied to clipboard ✓" : EMAIL}
              </button>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70">
                GitHub ↗
              </a>
              <p className="text-white/95">Location: India</p>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="space-y-8 lg:col-span-7">
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Your name" name="name" value={f.name} onChange={change} error={errors.name} />
              <Field label="Your email" name="email" type="email" value={f.email} onChange={change} error={errors.email} />
            </div>
            <Field label="Your message" name="message" area value={f.message} onChange={change} error={errors.message} />
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                data-cursor="Send"
                className="group relative overflow-hidden rounded-full bg-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-black"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 group-hover:scale-y-100" />
                <span className="relative transition-colors duration-500 group-hover:text-paper">
                  Send message
                </span>
              </button>
              {sent && (
                <p className="text-sm text-white/90">
                  Opening your email app… (if nothing happens, copy my address on the left).
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <Marquee
        items={["Say hello", "Open to work", "Let’s collaborate", "Say hello"]}
        className="border-t border-white/30 py-4 font-display text-3xl italic md:text-5xl"
      />
      <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs uppercase tracking-[0.18em] md:px-10 lg:pl-24 lg:pr-60">
        <span>© {new Date().getFullYear()} Priyanka — Printed in India</span>
        <a href="#hero" className="hover:opacity-70">Back to cover ↑</a>
      </footer>
    </section>
  );
}
