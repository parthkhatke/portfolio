"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/parthkhatke" },
  { label: "LinkedIn", href: "https://linkedin.com/in/parthkhatke" },
  { label: "Twitter/X", href: "https://x.com/parthkhatke" },
  { label: "Resume PDF", href: "#" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] px-6 sm:px-10"
    >
      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0F0F0F_0%,_#0A0A0A_70%)] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        {/* Eyebrow */}
        <motion.span
          variants={itemVariants}
          className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-8"
        >
          Ready when you are
        </motion.span>

        {/* Huge Title */}
        <motion.h2
          variants={itemVariants}
          className="font-display font-light text-white/90 leading-[0.95] tracking-[-0.01em]"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Got an idea?
          <br />
          Let&apos;s make it real.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-white/50 font-sans font-light mt-8 text-sm sm:text-base leading-relaxed max-w-[480px]"
        >
          Whether it&apos;s a full product, a feature, or just a conversation —
          <br className="hidden sm:block" />
          reach out. Response within 24 hours.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          variants={itemVariants}
          href="mailto:parth.khatke@email.com"
          className="group font-mono text-white/80 hover:text-accent transition-colors duration-500 mt-12 relative"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
        >
          parth.khatke@email.com
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500 ease-out" />
        </motion.a>

        {/* Social Links Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/90 font-mono text-xs tracking-wide transition-colors duration-300"
            >
              {link.label}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          ))}
        </motion.div>

        {/* Location Badge */}
        <motion.p
          variants={itemVariants}
          className="text-white/30 text-[0.85rem] font-sans mt-16"
        >
          📍 Pune, India · Available for Remote
        </motion.p>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] px-6 sm:px-10 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-white/20 text-[0.75rem] font-sans">
            © 2025 Parth Khatke
          </span>
          <span className="text-white/20 text-[0.75rem] font-sans">
            Designed & developed with obsession.
          </span>
        </div>
      </div>
    </section>
  );
}
