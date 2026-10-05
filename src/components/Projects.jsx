import React from "react";
import { motion } from "framer-motion";

const projectsData = [
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built with React and Tailwind CSS.",
    tech: ["React", "Tailwind"],
    live: "https://priyanka2771.github.io/Personal-Portfolio-Website/",
    github: "https://github.com/priyanka2771/Personal-Portfolio-Website.git",
  },
  {
    title: "Cake-Shop",
    desc: " a responsive cake shop website using Tailwind CSS, featuring an elegant UI, product showcase. ",
    tech: ["Tailwind", "JavaScript"],
    live: "https://priyanka2771.github.io/Cake-shop/",
    github: "https://github.com/priyanka2771/Cake-shop.git",
  },
  {
    title: "E-Chat-bot",
    desc: "AI-powered chatbot with a Flask backend providing REST APIs for real-time message handling and dynamic responses.",
    tech: ["React", "Python", "Flask"],
    live: "https://priyanka2771.github.io/chatbot/",
    github: "https://github.com/priyanka2771/chatbot.git",
  },
  {
    title: "Calculator",
    desc: " A simple and responsive calculator built with vanilla JavaScript, featuring real-time calculations and a clean user interface. ",
    tech: ["HTML", "CSS", "JavaScript"],
    live: " https://priyanka2771.github.io/Calculator/",
    github: "https://github.com/priyanka2771/Calculator.git",
  },
  
  {
    title: "Movie Search App",
    desc: "A responsive movie search application built with React that fetches real-time movie data from the OMDb API. Users can search movies, view posters, release year, and results sorted from newest to oldest.",
    tech: ["React", "Bootstrap", "OMDb API"],
    live: "https://priyanka2771.github.io/Movie-search-app/",
    github: "https://github.com/priyanka2771/Movie-search-app",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-screen px-6 py-24 bg-[url('https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-fixed bg-center scroll-mt-24"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative max-w-6xl mx-auto z-[10]">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My <span className="text-amber-400">Projects</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            A selection of projects showcasing my frontend skills and
            experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition transform"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                {proj.title}
              </h3>
              <p className="text-zinc-400 mb-4">{proj.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4 text-sm">
                {proj.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/10 rounded text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={proj.live}
                  className="text-amber-400 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                <a
                  href={proj.github}
                  className="text-zinc-300 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
