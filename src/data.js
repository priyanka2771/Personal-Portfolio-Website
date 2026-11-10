export const NAME = "Priyanka";
// Placeholder carried over from the original site — replace with your real address.
export const EMAIL = "priyanka@email.com";
export const GITHUB = "https://github.com/priyanka2771";

export const IMG = {
  cover:
    "https://images.unsplash.com/photo-1729552048052-24a21a7821ef?q=80&w=2070&auto=format&fit=crop",
  letter:
    "https://images.unsplash.com/photo-1729547846218-bd20bc595fd2?q=80&w=2012&auto=format&fit=crop",
  features:
    "https://images.unsplash.com/photo-1610372537236-0147e2a5fad3?q=80&w=1632&auto=format&fit=crop",
  work:
    "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=1169&auto=format&fit=crop",
  contact:
    "https://images.unsplash.com/photo-1597532198625-e531345e00c7?q=80&w=1170&auto=format&fit=crop",
};

export const SECTIONS = [
  { id: "hero", label: "Cover" },
  { id: "about", label: "Editor's Letter" },
  { id: "services", label: "Features" },
  { id: "projects", label: "The Lookbook" },
  { id: "contact", label: "Letters" },
];

export const SKILLS = [
  "React & JavaScript (ES6+)",
  "Tailwind CSS & Responsive Design",
  "Component-Based UI Development",
  "Performance & Clean Code",
  "Mobile-First Approach",
];

export const SERVICES = [
  {
    title: "Frontend Development",
    desc: "Responsive, interactive interfaces built with React, JavaScript and modern best practices.",
    tags: ["React", "JavaScript", "Vite"],
  },
  {
    title: "UI Design",
    desc: "Clean, accessible and visually considered interfaces, styled with Tailwind CSS.",
    tags: ["Tailwind", "Layout", "Typography"],
  },
  {
    title: "Performance & Optimization",
    desc: "Components tuned for speed, scalability and a smooth experience on every device.",
    tags: ["Lighthouse", "Lazy loading", "Clean code"],
  },
  {
    title: "API Integration",
    desc: "REST APIs wired into the frontend, with data handled efficiently and clearly.",
    tags: ["REST", "Flask", "OMDb"],
  },
];

export const PROJECTS = [
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built with React and Tailwind CSS.",
    tech: ["React", "Tailwind"],
    live: "https://priyanka2771.github.io/Personal-Portfolio-Website/",
    github: "https://github.com/priyanka2771/Personal-Portfolio-Website.git",
    img: IMG.cover,
  },
  {
    title: "Cake-Shop",
    desc: "A responsive cake shop website using Tailwind CSS, featuring an elegant UI and product showcase.",
    tech: ["Tailwind", "JavaScript"],
    live: "https://priyanka2771.github.io/Cake-shop/",
    github: "https://github.com/priyanka2771/Cake-shop.git",
    img: IMG.features,
  },
  {
    title: "Calculator",
    desc: "A simple, responsive calculator in vanilla JavaScript with real-time calculation and a clean interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://priyanka2771.github.io/Calculator/",
    github: "https://github.com/priyanka2771/Calculator.git",
    img: IMG.work,
  },
  {
    title: "Movie Search App",
    desc: "A React app that fetches real-time movie data from the OMDb API — search, view posters and release year, sorted newest to oldest.",
    tech: ["React", "Bootstrap", "OMDb API"],
    live: "https://priyanka2771.github.io/Movie-search-app/",
    github: "https://github.com/priyanka2771/Movie-search-app",
    img: IMG.contact,
  },
];
