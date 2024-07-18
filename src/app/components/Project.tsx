"use client";  

import { Project as ProjectType } from "../data/project";
import { useState } from "react";
import Image from 'next/image'

interface ProjectProps {
  project: ProjectType;
  isExpanded: boolean;
  onClick: () => void;
}

const getGridCols = (count: number): number => {
  if (count >= 4) return 4;
  if (count === 3) return 3;
  if (count === 2) return 2;
  return 1; 
};

const Project = ({ project, isExpanded, onClick }: ProjectProps) => {
  // Example of using local state within Project component
  const [localState, setLocalState] = useState<boolean>(false);

  return (
    <div
      className="border p-3 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold">{project.title}</h3>
      {isExpanded && (
        <div className="mt-4">
          <p>{project.description}</p>
          <div
            className="mt-4 grid gap-4"
            style={{ gridTemplateColumns: `repeat(${getGridCols(project.screenshots.length)}, minmax(0, 1fr))` }}
          >
            {project.screenshots.map((screenshot, index) => (
              screenshot ? ( // Conditionally render based on whether the screenshot URL is non-empty
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-gray-100"
                  style={{ height: 'auto' }} // Ensure height adjusts to the image
                >
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    layout="responsive"
                    width={300} // Width of the image
                    height={400} // Height of the image
                    objectFit="cover"
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className="relative" // No border or content for empty screenshots
                  style={{ height: 'auto' }} // Ensure height adjusts to the image
                >
                  {/* Empty div for spacing */}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
