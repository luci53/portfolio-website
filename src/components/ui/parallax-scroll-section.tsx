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
    <div ref={containerRef} className="relative overflow-hidden py-20 min-h-screen">
      {/* Background Layer (Deep) */}
      <div 
        className="parallax-layer absolute inset-0 -z-30 flex items-center justify-center pointer-events-none opacity-20"
        data-speed="0.2"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-[120px]" />
      </div>

      {/* Middle Layer (Content) */}
      <div className="parallax-layer relative z-10 container mx-auto" data-speed="1">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Featured Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-6 shadow-2xl transition-all"
            >
              <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden bg-gray-800">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-6 text-sm">{project.description}</p>
              
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
              >
                Launch App
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Foreground Layer (Floating Elements) */}
      <div 
        className="parallax-layer absolute inset-0 z-20 pointer-events-none hidden lg:block"
        data-speed="1.5"
      >
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full" />
        <div className="absolute bottom-1/4 right-20 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/5 rounded-lg rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-white/10 rounded-full" />
      </div>
    </div>
  );
};
