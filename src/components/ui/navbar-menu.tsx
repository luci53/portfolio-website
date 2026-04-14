"use client";
import React from "react";
import { motion } from "motion/react";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="font-squid cursor-pointer text-lg text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="rounded-2xl border border-black/[0.12] bg-white/95 shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black/95"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-max p-5"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative flex justify-center space-x-6 rounded-full border border-black/10 bg-white/95 px-10 py-6 shadow-input backdrop-blur-md dark:border-white/[0.2] dark:bg-black/90"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a
      href={href}
      className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-900/70"
    >
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="h-[110px] w-[170px] shrink-0 rounded-lg object-cover shadow-2xl"
      />
      <div>
        <h4 className="font-squid mb-1 text-3xl leading-none text-black dark:text-white">
          {title}
        </h4>
        <p className="max-w-[13rem] text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </a>
  );
};
