"use client"; 

import { useState } from "react";
import { Inter } from "next/font/google";
import { projects } from "./data/project";
import Project from "./components/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  const handleProjectClick = (projectId: number) => {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
  };

  return (
    <div className={'container mx-auto p-8 ${inter.className} bg-gradient-to-b from-blue-900 to-black'}>
      <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
      
      <section id="summary" className="mb-8">
        <h2 className="text-2xl font-bold">Summary</h2>
        <p>Your summary goes here.</p>
      </section>
      
      <section id="experience" className="mb-8">
        <h2 className="text-2xl font-bold">Experience</h2>
        <ul className="list-disc ml-8">
          <li className="mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">Job Title 1</h3>
                <p>Description of job responsibilities and achievements.</p>
              </div>
              <div className="text-right">
                <p>Years</p>
              </div>
            </div>
          </li>
          <li className="mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">Job Title 2</h3>
                <p>Description of job responsibilities and achievements.</p>
              </div>
              <div className="text-right">
                <p>Years</p>
              </div>
            </div>
          </li>
          {/* Add more items as needed */}
        </ul>
      </section>
      
      <section id="projects" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
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
        <h2 className="text-2xl font-bold">Education</h2>
        <ul className="list-disc ml-8">
          <li>
            <h3 className="font-bold">Degree</h3>
            <p>Institution, Year of Graduation</p>
          </li>
          <li>
            <h3 className="font-bold">Degree</h3>
            <p>Institution, Year of Graduation</p>
          </li>
          {/* Add more items as needed */}
        </ul>
      </section>
      
      <section id="skills" className="mb-8">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p>Your skills go here.</p>
      </section>
      
      <section id="languages" className="mb-8">
        <h2 className="text-2xl font-bold">Languages</h2>
        <div className="grid grid-cols-2">
          <ul className="list-disc ml-8">
            <li>Language 1</li>
            <li>Language 2</li>
            <li>Language 3</li>
          </ul>
          <ul className="list-disc ml-8">
            <li>Language 4</li>
            <li>Language 5</li>
            <li>Language 6</li>
          </ul>
        </div>
      </section>
      
      <section id="research-interests" className="mb-8">
        <h2 className="text-2xl font-bold">Research Interests</h2>
        <p>Your research interests go here.</p>
      </section>
      
      {/* Social Profile Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <a href="https://www.linkedin.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
          <FontAwesomeIcon icon={faLinkedin} className="text-4xl" />
        </a>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
          <FontAwesomeIcon icon={faGithub} className="text-4xl" style={{ color: '#0366d6' }} />
        </a>
      </div>
    </div>
  );
}
