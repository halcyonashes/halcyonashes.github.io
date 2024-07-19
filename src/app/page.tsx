"use client";

import { useState } from "react";
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
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  const handleProjectClick = (projectId: number) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className={`relative container mt-8 mb-8 mx-auto p-8 ${openSans.variable}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-black opacity-90 pointer-events-none"></div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-8">{content.title}</h1>

        <section id="summary" className="mb-8">
          <h2 className="text-2xl font-bold">{content.summary}</h2>
          <p className="whitespace-pre-wrap">{content.summaryText}</p>
        </section>

        <section id="experience" className="mb-8">
          <h2 className="text-2xl font-bold">{content.experience}</h2>
          <ul className="list-none ml-8">
            <li className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{content.job1.title}</h3>
                  <p className="whitespace-pre-wrap mx-8">{content.job1.description}</p>
                </div>
                <div className="text-right w-36 flex-shrink-0">
                  <p>{content.job1.years}</p>
                </div>
              </div>
            </li>
            <li className="mb-4">
            <div className="flex justify-between flex-wrap">
              <div className="flex-1">
                  <h3 className="font-bold">{content.job2.title}</h3>
                  <p className="whitespace-pre-wrap mx-8">{content.job2.description}</p>
                </div>
                <div className="text-right w-36 flex-shrink-0">
                  <p>{content.job2.years}</p>
                </div>
              </div>
            </li>
            <li className="mb-4">
            <div className="flex justify-between flex-wrap">
              <div className="flex-1">
                  <h3 className="font-bold">{content.job3.title}</h3>
                  <p className="whitespace-pre-wrap mx-8">{content.job3.description}</p>
                </div>
                <div className="text-right w-36 flex-shrink-0">
                  <p>{content.job3.years}</p>
                </div>
              </div>
            </li>
            <li className="mb-4">
            <div className="flex justify-between flex-wrap">
              <div className="flex-1">
                  <h3 className="font-bold">{content.job4.title}</h3>
                  <p className="whitespace-pre-wrap mx-8">{content.job4.description}</p>
                </div>
                <div className="text-right w-36 flex-shrink-0">
                  <p>{content.job4.years}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section id="projects" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{content.projects}</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <Project
                key={project.id}
                project={project}
                isExpanded={expandedProjectId === project.id}
                onClick={() => handleProjectClick(project.id)}
              />
            ))}
          </div>
        </section>

        <section id="education" className="mb-8">
          <h2 className="text-2xl font-bold">{content.education}</h2>
          <ul className="list-disc ml-8">
            <li>
              <h3 className="font-bold">{content.degree1.title}</h3>
              <p>{content.degree1.institution}</p>
            </li>
            <li>
              <h3 className="font-bold">{content.degree2.title}</h3>
              <p>{content.degree2.institution}</p>
            </li>
          </ul>
        </section>

        <section id="skills" className="mb-12">
          <h2 className="text-2xl font-bold">{content.skills}</h2>
          <p>{content.skillsText}</p>
        </section>

        <section id="languages" className="mb-8">
          <h2 className="text-2xl font-bold">{content.languages}</h2>
          <div className="grid grid-cols-2">
            <ul className="list-disc ml-8">
              {content.languageList1.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <ul className="list-disc ml-8">
              {content.languageList2.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="research-interests" className="mb-8">
          <h2 className="text-2xl font-bold">{content.researchInterests}</h2>
          <p>{content.researchInterestsText}</p>
        </section>

        {/* Social Profile Buttons */}
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
