"use client";  

import { Project as ProjectType } from "../data/project";
import { useState } from "react";
import Image from 'next/image'
import { FaChevronDown } from 'react-icons/fa';


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
  const [localState, setLocalState] = useState<boolean>(false);

  return (
    <div
      className="border p-3 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{project.title}</h3>
        <FaChevronDown className="text-lg" />
      </div>
      {isExpanded && (
        <div className="mt-4">
          <p className="font-normal">{project.description}</p>
          <div
            className="mt-4 grid gap-4"
            style={{ gridTemplateColumns: `repeat(${getGridCols(project.screenshots.length)}, minmax(0, 1fr))` }}
          >
            {project.screenshots.map((screenshot, index) => (
              screenshot ? (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-gray-100"
                  style={{ height: 'auto' }}
                >
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    layout="responsive"
                    width={300}
                    height={400}
                    objectFit="cover"
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className="relative"
                  style={{ height: 'auto' }}
                >
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
