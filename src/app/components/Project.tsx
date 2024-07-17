"use client";  

import { Project as ProjectType } from "../data/project";
import { useState } from "react";

interface ProjectProps {
  project: ProjectType;
  isExpanded: boolean;
  onClick: () => void;
}

const Project = ({ project, isExpanded, onClick }: ProjectProps) => {
  // Example of using local state within Project component
  const [localState, setLocalState] = useState<boolean>(false);

  return (
    <div className="border p-4 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out transform hover:shadow-lg" onClick={onClick}>
      <h2 className="text-xl font-bold">{project.title}</h2>
      {isExpanded && (
        <div className="mt-4">
          <p>{project.description}</p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {project.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="w-11/12 max-w-xs rounded-lg border border-gray-100"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
