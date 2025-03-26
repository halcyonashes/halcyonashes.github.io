"use client";
import { Project as ProjectType } from "../data/project";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import "./Project.css";

interface ProjectProps {
  project: ProjectType;
}

const getGridCols = (count: number): number => {
  if (count >= 4) return 4;
  if (count > 1) return count;
  return 1;
};

const Project = ({ project }: ProjectProps) => {
  return (
    <div className="p-4 rounded-lg transition-shadow duration-300 ease-in-out transform hover:shadow-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">{project.title}</h3>
      </div>
      <div className="mt-4">
        <p className="font-normal text-gray-600 dark:text-gray-300">{project.description}</p>
        <div
          className="mt-4 grid gap-4"
          style={{ gridTemplateColumns: `repeat(${getGridCols(project.screenshots.length)}, minmax(0, 1fr))` }}
        >
          {project.screenshots.map((screenshot: string, index: number) => (
            screenshot && (
              <ImageWithSpinner key={index} src={screenshot} index={index} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageWithSpinner = ({ src, index }: { src: string; index: number }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Fallback timeout to hide spinner after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Retry loading if it fails
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setError(false);
        setLoading(true);
        setRetryCount(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700" style={{ height: "auto" }}>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 dark:bg-gray-900">
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        </div>
      )}
      {error && retryCount >= 3 && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 dark:bg-gray-900">
          <p className="text-red-500">Failed to load image</p>
        </div>
      )}
      <Image
        src={src}
        alt={`Screenshot ${index + 1}`}
        width={800}
        height={600}
        className="w-full h-auto object-contain"
        onLoad={() => {
          setLoading(false);
          setError(false);
        }}
        onError={() => {
          setLoading(false);
          setError(true);
          console.error(`Failed to load image: ${src}`);
        }}
        priority={index === 0}
      />
    </div>
  );
};

export default Project;
