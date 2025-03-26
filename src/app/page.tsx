"use client";

import { useState, useRef } from "react";
import { Open_Sans } from "next/font/google";
import { projects } from "./data/project";
import Project from "./components/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import './globals.css'
import content from "./data/content";
import { cn } from "../../lib/utils";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})

export default function Home() {
  return (
    <div className={cn(
      "relative min-h-screen bg-white dark:bg-gray-900",
      openSans.variable
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-black/80 to-black/90 pointer-events-none" />

      {/* Main content container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-medium mb-8 text-gray-900 dark:text-white">
          {content.title}
        </h1>

        <section id="summary" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.summary}
          </h2>
          <p className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap font-light">
            {content.summaryText}
          </p>
        </section>

        <section id="experience" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.experience}
          </h2>
          <ul className="space-y-6">
            {[content.job1, content.job2, content.job3].map((job, index) => (
              <li key={index} className="relative pl-6 border-l-2 border-blue-500">
                <div className="job-header">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{job.years}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.projects}
          </h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <Project
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </section>

        <section id="education" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.education}
          </h2>
          <ul className="space-y-4 list-disc ml-6 marker:text-blue-500">
            <li>
              <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
                {content.degree1.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{content.degree1.institution}</p>
            </li>
            <li>
              <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
                {content.degree2.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{content.degree2.institution}</p>
            </li>
          </ul>
        </section>

        <section id="skills" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.skills}
          </h2>
          <p className="prose prose-lg dark:prose-invert max-w-none font-light">
            {content.skillsText}
          </p>
        </section>

        <section id="languages" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.languages}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4 list-disc ml-6 marker:text-blue-500">
              {content.languageList1.map((language, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-400 font-light">
                  {language}
                </li>
              ))}
            </ul>
            <ul className="space-y-4 list-disc ml-6 marker:text-blue-500">
              {content.languageList2.map((language, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-400 font-light">
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="research-interests" className="mb-12 sm:mb-16 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
            {content.researchInterests}
          </h2>
          <p className="prose prose-lg dark:prose-invert max-w-none font-light">
            {content.researchInterestsText}
          </p>
        </section>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-8 md:hidden">
          <a
            href={content.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faLinkedin} 
              className="text-4xl text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" 
            />
          </a>
          <a
            href={content.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faGithub} 
              className="text-4xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white" 
            />
          </a>
        </div>

        {/* Desktop Social Links */}
        <div className="hidden md:flex fixed bottom-8 right-8 flex-col space-y-4">
          <a
            href={content.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faLinkedin} 
              className="text-4xl text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" 
            />
          </a>
          <a
            href={content.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={faGithub} 
              className="text-4xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white" 
            />
          </a>
        </div>
      </div>
    </div>
  );
}