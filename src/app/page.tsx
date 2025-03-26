"use client";

import { useState, useRef } from "react";
import { Open_Sans } from "next/font/google";
import { projects } from "./data/project";
import Project from "./components/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import './globals.css'
import content from "./data/content";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})

export default function Home() {

  return (
    <div className={`relative container mt-8 mb-8 mx-auto p-8 ${openSans.variable}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-black opacity-90 pointer-events-none"></div>
      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-medium mb-8">{content.title}</h1>

        <section id="summary" className="mb-8">
          <h2 className="text-2xl font-medium mb-4">{content.summary}</h2>
          <p className="whitespace-pre-wrap font-light">{content.summaryText}</p>
        </section>

        <section id="experience" className="mb-8">
          <h2 className="text-2xl font-medium mb-4">{content.experience}</h2>
          <ul className="list-none ml-8">
            <li className="mb-4">
              <div className="job-header">
                <h3 className="font-medium">{content.job1.title}</h3>
                <p className="job-year">{content.job1.years}</p>
              </div>
            </li>
            <li className="mb-4">
              <div className="job-header">
                <h3 className="font-medium">{content.job2.title}</h3>
                <p className="job-year">{content.job2.years}</p>
              </div>
            </li>
            <li className="mb-4">
              <div className="job-header">
                <h3 className="font-medium">{content.job3.title}</h3>
                <p className="job-year">{content.job3.years}</p>
              </div>
            </li>
            <li className="mb-4">
              <div className="job-header">
                <h3 className="font-medium">{content.job4.title}</h3>
                <p className="job-year">{content.job4.years}</p>
              </div>
            </li>
          </ul>
        </section>

        <section id="projects" className="mb-8">
          <h2 className="text-2xl font-medium">{content.projects}</h2>
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <Project
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </section>

        <section id="education" className="mb-8">
          <h2 className="text-2xl font-medium mb-4">{content.education}</h2>
          <ul className="list-disc ml-8">
            <li>
              <h3 className="font-medium">{content.degree1.title}</h3>
              <p className="font-light">{content.degree1.institution}</p>
            </li>
            <li>
              <h3 className="font-medium">{content.degree2.title}</h3>
              <p className="font-light">{content.degree2.institution}</p>
            </li>
          </ul>
        </section>

        <section id="skills" className="mb-12">
          <h2 className="text-2xl font-medium mb-4">{content.skills}</h2>
          <p className="font-light">{content.skillsText}</p>
        </section>

        <section id="languages" className="mb-8">
          <h2 className="text-2xl font-medium mb-4">{content.languages}</h2>
          <div className="grid grid-cols-2">
            <ul className="list-disc ml-8">
              {content.languageList1.map((language, index) => (
                <li key={index} className="font-light">{language}</li>
              ))}
            </ul>
            <ul className="list-disc ml-8">
              {content.languageList2.map((language, index) => (
                <li key={index} className="font-light">{language}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="research-interests" className="mb-8">
          <h2 className="text-2xl font-medium mb-4">{content.researchInterests}</h2>
          <p className="font-light">{content.researchInterestsText}</p>
        </section>

        <div className="flex justify-center space-x-4 mt-4">
          <a
            href={content.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-4xl" />
          </a>
          <a
            href={content.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faGithub} className="text-4xl" style={{ color: "#0366d6" }} />
          </a>
        </div>
      </div>
    </div>
  );
}