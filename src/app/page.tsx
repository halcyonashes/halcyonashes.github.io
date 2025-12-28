"use client";

import { useState, useEffect, useRef } from "react";
import { Open_Sans } from "next/font/google";
import { projects } from "./data/project";
import Project from "./components/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import './globals.css'
import content from "./data/content";
import { cn } from "../../lib/utils";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})

// Navigation items
const navItems = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

// Animated section wrapper
const AnimatedSection = ({ children, id, className }: { children: React.ReactNode; id: string; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "mb-12 sm:mb-16 scroll-mt-20 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </section>
  );
};

// Skills as tags
const skillsArray = content.skillsText.split(" | ");

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn(
      "relative min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300",
      openSans.variable
    )}>
      {/* Sticky Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <a href="#" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {content.title.split(" ")[0]}
            </a>
            <div className="hidden sm:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "px-3 py-2 text-sm rounded-lg transition-all duration-200",
                    activeSection === item.id
                      ? "text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-8 text-slate-900 dark:text-white tracking-tight animate-fade-in">
          {content.title}
        </h1>

        <AnimatedSection id="summary">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.summary}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {content.summaryText}
          </p>
        </AnimatedSection>

        <AnimatedSection id="experience">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.experience}
          </h2>
          <ul className="space-y-4">
            {[content.job1, content.job2, content.job3, content.job4].map((job, index) => (
              <li 
                key={index} 
                className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 shadow-md hover:shadow-xl hover:bg-slate-200 dark:hover:bg-slate-800/70 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <span className="text-sm text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">{job.years}</span>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection id="projects">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.projects}
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <Project
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="education">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.education}
          </h2>
          <ul className="space-y-4">
            <li className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 shadow-md hover:shadow-xl hover:bg-slate-200 dark:hover:bg-slate-800/70 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-medium text-slate-900 dark:text-white">
                {content.degree1.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{content.degree1.institution}</p>
            </li>
            <li className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 shadow-md hover:shadow-xl hover:bg-slate-200 dark:hover:bg-slate-800/70 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-medium text-slate-900 dark:text-white">
                {content.degree2.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{content.degree2.institution}</p>
            </li>
          </ul>
        </AnimatedSection>

        <AnimatedSection id="skills">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.skills}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 rounded-full text-sm transition-all duration-200 cursor-default border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="languages">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.languages}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 hover:bg-slate-200 dark:hover:bg-slate-800/70 transition-colors duration-300">
              {content.languageList1.map((language, index) => (
                <li key={index} className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                  {language}
                </li>
              ))}
            </ul>
            <ul className="space-y-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 hover:bg-slate-200 dark:hover:bg-slate-800/70 transition-colors duration-300">
              {content.languageList2.map((language, index) => (
                <li key={index} className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection id="research-interests">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-500 dark:text-blue-400 tracking-tight">
            {content.researchInterests}
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.researchInterestsText.split(" | ").map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 rounded-full text-sm transition-all duration-200 cursor-default border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50"
              >
                {interest}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Social Links - Mobile */}
        <div className="flex justify-center space-x-4 mt-8 md:hidden">
          <a
            href={content.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <FontAwesomeIcon 
              icon={faLinkedin} 
              className="text-3xl text-blue-500 dark:text-blue-400" 
            />
          </a>
          <a
            href={content.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <FontAwesomeIcon 
              icon={faGithub} 
              className="text-3xl text-slate-700 dark:text-slate-200" 
            />
          </a>
        </div>

        {/* Desktop Social Links */}
        <div className="hidden md:flex fixed bottom-8 right-8 flex-col space-y-3">
          <a
            href={content.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <FontAwesomeIcon 
              icon={faLinkedin} 
              className="text-3xl text-blue-500 dark:text-blue-400" 
            />
          </a>
          <a
            href={content.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <FontAwesomeIcon 
              icon={faGithub} 
              className="text-3xl text-slate-700 dark:text-slate-200" 
            />
          </a>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 left-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300",
            showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      </div>
    </div>
  );
}