"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  src: string;
  href: string;
}

export const ParallaxScrollSection = ({ projects }: { projects: Project[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax effect for each layer
      const layers = gsap.utils.toArray(".parallax-layer") as HTMLElement[];
      
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed || "1");
        gsap.to(layer, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * (speed - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-20">
      {/* Background Layer (Deep) */}
      <div 
        className="parallax-layer absolute inset-0 -z-30 flex items-center justify-center pointer-events-none opacity-20"
        data-speed="0.2"
      >
        <div className="w-[780px] h-[780px] rounded-full bg-gradient-to-tr from-blue-500/15 via-sky-400/10 to-violet-500/15 blur-[140px]" />
      </div>

      {/* Middle Layer (Content) */}
      <div className="parallax-layer relative z-10 container mx-auto" data-speed="1">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="font-squid text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Featured Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Selected projects with a focus on performance, clarity, and clean UI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.55)] transition-colors dark:border-white/10 dark:bg-slate-950"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={project.src}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
              
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  View project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Foreground Layer (Floating Elements) */}
      <div 
        className="parallax-layer absolute inset-0 z-20 pointer-events-none hidden lg:block"
        data-speed="1.5"
      >
        <div className="absolute top-1/4 left-10 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl" />
        <div className="absolute bottom-1/4 right-20 h-32 w-32 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-16 w-16 rounded-lg border border-black/5 rotate-12 dark:border-white/10" />
        <div className="absolute top-1/3 right-1/4 h-8 w-8 rounded-full border border-black/10 dark:border-white/10" />
      </div>
    </div>
  );
};
