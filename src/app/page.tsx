"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


  const words = ` DEVELOPER | GAMER | STUDENT 
  `;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Show a notification (You can replace this with any notification method you prefer)
  toast.success("All Done!");

  // Scroll to the top of the page smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  console.log("Form submitted");
};
export default function Home() {
  const [active, setActive] = useState<string | null>(null); // Define the active state for menu items
  const [darkMode, setDarkMode] = useState<boolean>(false); // Define the darkMode state

  // Toggle dark mode on document element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-black dark:text-white scroll-smooth">
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Sections">
            <div className="flex flex-col space-y-4 text-sm">
              {["Home", "About", "Skills", "Projects", "Testimonials", "Contact"].map(
                (section) => (
                  <HoveredLink key={section} href={`#${section.toLowerCase()}`}>
                    {section}
                  </HoveredLink>
                )
              )}
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Projects">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Website"
                href="#projects"
                src="/portfolio.png"
                description="A showcase of my web development work."
              />
              <ProductItem
                title="some scripting work"
                href="#projects"
                src="/cs.webp"
                description="Its a lua script for a server not a website."
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Theme">
            <div className="flex flex-col space-y-4 text-sm">
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="hovered-link text-left"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          </MenuItem>
        </Menu>
      </div>

      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Uday Preet Singh
          </div>
          <TextGenerateEffect words={words} />
          <div>
            <Image
              src="/profile1.jpg"
              alt="Profile Picture"
              width={200}
              height={200}
              className="rounded-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>
      </AuroraBackground>

      <main className="container mx-auto px-4 py-10 animate-fade-in">
  {/* About Section */}
  <section id="about" className="my-20 text-center">
    <h2 className="text-4xl font-bold mb-6 text-blue-600">About Me</h2>
    <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
      I'm a passionate developer with a love for creating beautiful and functional websites. My career goal is to work in a dynamic team and build impactful web applications.
    </p>
    <a href="/resume.pdf" download className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
      📄 Download Resume
    </a>
  </section>

  {/* Skills Section */}
  <section id="skills" className="my-20 text-center">
    <h2 className="text-4xl font-bold mb-10 text-purple-600">Skills</h2>
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
      {['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS', 'Git', 'Lua', '  next.js'].map((skill, i) => (
        <li key={skill} className="text-left animate-fade-up delay-[${i * 100}ms]">
          <p className="mb-2 font-semibold text-lg">{skill}</p>
          <div className="w-full bg-gray-200 rounded h-3 dark:bg-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-700 h-3 rounded transition-all duration-1000" style={{ width: `${80 + i * 4}%` }}></div>
          </div>
        </li>
      ))}
    </ul>
  </section>

  {/* Projects Section */}
  <section id="projects" className="my-20 text-center">
  <h2 className="text-4xl font-bold mb-10 text-green-600">Projects</h2>

  <div className="flex flex-col md:flex-row justify-center items-center gap-10">
    {/* Project 1 */}
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Project 1
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          You can visit that site too 
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="portfolio.png"
            height="100"
            width="100"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-left mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://marquee-beige.vercel.app/"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Go to website →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>

    {/* Project 2 */}
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Project 2
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Its a script for a server not a website 
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="cs.webp"
            height="100"
            width="200"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-right mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="nothing"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Go to website →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  </div>
</section>


  {/* Testimonials Section */}
  <section id="testimonials" className="my-20 text-center">
    <h2 className="text-4xl font-bold mb-10 text-pink-600">Testimonials</h2>
    <div className="carousel flex overflow-x-auto space-x-6 snap-x pb-4 px-2">
      {[
        {
          name: 'Dr. Smith',
          role: 'Professor',
          quote: 'Uday is a talented developer with great potential.',
          image: '/gg.webp',
        },
        {
          name: 'Alex Doe',
          role: 'Mentor',
          quote: 'Always impressed with Jane’s dedication and work.',
          image: '/gg.webp',
        },
        {
          name: 'Chris Lane',
          role: 'Friend',
          quote: 'His attention to detail is outstanding!',
          image: '/gg.webp',
        },
       
        
      ].map((t, i) => (
        <div
          key={i}
          className="snap-center min-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition animate-fade-in"
        >
          <Image src={t.image} alt={t.name} width={60} height={60} className="rounded-full mx-auto mb-4" />
          <p className="italic text-gray-700 dark:text-gray-300">"{t.quote}"</p>
          <p className="mt-2 font-bold">{t.name}</p>
          <p className="text-sm text-gray-500">{t.role}</p>
        </div>
      ))}
    </div>
  </section>

        {/* Contact Section */}
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to My Portfolio 
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Gimme your details if you need me to contact you back. | PS this does not work contact me through github for now 
      </p>
 
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
       
 
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >  <form onSubmit={handleSubmit}>
          Done &rarr;
          <BottomGradient />
          </form>
        </button>
 
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
 
       
      </form>
      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
      </main>
      
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Lucifer. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-blue-500">Twitter</a>
          <a href="#" className="hover:text-blue-500">LinkedIn</a>
          <a href="#" className="hover:text-blue-500">GitHub</a>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
