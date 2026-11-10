import { useState } from "react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Chrome from "./components/Chrome";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Marquee } from "./components/ui";

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Chrome />
      <Navbar />

      <main>
        <Hero ready={ready} />
        <Marquee
          items={["Frontend Developer", "React", "Tailwind CSS", "UI / UX", "Motion"]}
          className="border-y border-ink/20 py-4 font-display text-2xl uppercase tracking-tight md:text-4xl"
        />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
