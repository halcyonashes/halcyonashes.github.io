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
    <div className="p-5 rounded-xl transition-all duration-300 ease-out bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800/70 shadow-md hover:shadow-xl hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">{project.title}</h3>
      </div>
      <div className="mt-3">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
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
  const [imgKey, setImgKey] = useState(0);

  // Reset states when src changes
  useEffect(() => {
    setLoading(true);
    setError(false);
    setRetryCount(0);
    setImgKey(prev => prev + 1);
  }, [src]);

  // Retry loading if it fails (with exponential backoff)
  useEffect(() => {
    if (error && retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 500; // 500ms, 1000ms, 2000ms
      const timer = setTimeout(() => {
        setError(false);
        setLoading(true);
        setImgKey(prev => prev + 1);
        setRetryCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    console.error(`Failed to load image: ${src} (attempt ${retryCount + 1})`);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setRetryCount(0);
    setImgKey(prev => prev + 1);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50 min-h-[120px]">
      {loading && !error && (
        <div className="absolute inset-0 flex justify-center items-center bg-slate-50 dark:bg-slate-900 z-10">
          <TailSpin height="50" width="50" color="#60a5fa" ariaLabel="loading" />
        </div>
      )}
      {error && retryCount >= 3 && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-900 z-10 gap-2">
          <p className="text-red-500 dark:text-red-400 text-sm">Failed to load image</p>
          <button 
            onClick={handleRetry}
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm underline"
          >
            Try again
          </button>
        </div>
      )}
      <Image
        key={imgKey}
        src={src}
        alt={`Screenshot ${index + 1}`}
        width={800}
        height={600}
        className={`w-full h-auto object-contain transition-opacity duration-300 ${loading || error ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={index < 2 ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
  );
};

export default Project;
