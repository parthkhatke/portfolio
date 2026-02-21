"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="relative z-20 min-h-screen bg-[#0A0A0A] py-32 sm:py-40 px-6 sm:px-10 lg:px-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 lg:gap-12"
      >
        {/* Left Column */}
        <motion.div variants={itemVariants} className="relative">
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
            About
          </span>
          <div className="w-16 h-[1px] bg-accent mt-4 mb-8" />
          <div className="relative w-full aspect-[3/4] max-w-[320px] rounded-lg overflow-hidden">
            <Image
              src="/View recent photos.jpeg"
              alt="Parth Khatke"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 320px"
              priority
            />
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="relative">
          {/* Gold vertical line */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[1px] bg-accent/20" />

          <div className="lg:pl-12">
            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-6 mb-16">
              <p className="text-white/60 font-sans font-light text-base sm:text-lg leading-relaxed">
               I'm a Full Stack Developer based in Indore, India. I focus on building products 
               that feel refined on the surface while remaining reliable and maintainable beneath it. </p> 
              <p className="text-white/60 font-sans font-light text-base sm:text-lg leading-relaxed">
               As an Associate Full Stack Developer at The Modern Data Company, I design and develop end-to-end web applications 
               using Next.js and leveraging our own <a href="https://dataos.info" 
                rel="noopener noreferrer" 
                className="underline decoration-white/50 hover:decoration-accent  hover:text-accent  duration-500" >DataOS</a>  for clients.  </p> 
              <p className="text-white/60 font-sans font-light text-base sm:text-lg leading-relaxed">
               Outside of shipping features, I spend time cooking, sketching portraits and working on my side projects.
                </p>
            </motion.div>

            {/* Currently At */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="inline-flex items-center gap-3 border border-white/10 rounded-full px-5 py-2.5">
                <span className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
                <span className="font-mono text-white/50 text-xs tracking-wide">
                  Currently @<a href="https://themoderndata.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-accent transition-colors duration-500"> The Modern Data Company </a>
                </span>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {SKILLS.map((skill) => (
                <motion.div key={skill.category} variants={itemVariants}>
                  <h4 className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-3">
                    {skill.category}
                  </h4>
                  <p className="text-white/60 font-sans font-light text-sm leading-relaxed">
                    {skill.items.join(" · ")}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
