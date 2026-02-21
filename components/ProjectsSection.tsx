"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="group relative border-b border-white/[0.06] py-12 sm:py-16 cursor-pointer"
    >
      {/* Hover background number */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[12rem] sm:text-[16rem] text-white/[0.02] group-hover:text-white/[0.05] transition-all duration-700 leading-none pointer-events-none translate-x-4 group-hover:translate-x-0">
        {project.number}
      </span>

      {/* Gold scrubber line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-6 lg:gap-12 items-start">
        {/* Left: Category + Number */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-white/30 text-xs tracking-[0.2em] uppercase">
            {project.category}
          </span>
          <div
            className="inline-flex items-center gap-2 w-fit"
            style={{ color: project.status.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.status.color }} />
            <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase">
              {project.status.label}
            </span>
          </div>
        </div>

        {/* Center: Title + Description + Tech */}
        <div>
          <h3
            className="font-display text-white/90 group-hover:text-white transition-colors duration-300 mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {project.title}
          </h3>
          <p className="text-white/40 font-sans font-light text-sm sm:text-base leading-relaxed max-w-[560px] mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-white/30 font-mono text-xs"
              >
                {tech}
                {tech !== project.techStack[project.techStack.length - 1] && (
                  <span className="ml-2 text-white/15">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Links */}
        <div className="flex flex-row lg:flex-col gap-4 items-start">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-accent font-mono text-xs tracking-wide transition-colors duration-300 pointer-events-auto"
            >
              {link.label}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-20 bg-[#0A0A0A] py-32 sm:py-40 px-6 sm:px-10 lg:px-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Row */}
        <motion.div
          variants={itemVariants}
          className="flex items-baseline justify-between mb-4"
        >
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
            Selected Work
          </span>
          <span className="font-mono text-white/30 text-xs tracking-[0.2em]">
            {String(PROJECTS.length).padStart(2, "0")} PROJECTS
          </span>
        </motion.div>

        {/* Top border */}
        <motion.div
          variants={itemVariants}
          className="w-full h-[1px] bg-white/[0.08] mb-4"
        />

        {/* Project Items */}
        {PROJECTS.map((project, index) => (
          <ProjectItem key={project.title} project={project} index={index} />
        ))}

        {/* Footer Row */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <a
            href="https://github.com/parthkhatke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-accent text-sm tracking-wide hover:text-accent-dim transition-colors duration-300"
          >
            More on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
