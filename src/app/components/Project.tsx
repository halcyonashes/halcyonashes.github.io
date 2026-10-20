"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { Project as ProjectType } from "../data/project";

interface ProjectProps {
  project: ProjectType;
}

// Used when a screenshot has no width/height set in the CMS.
const DEFAULT_WEB_SIZE = { width: 1920, height: 968 };
const DEFAULT_MOBILE_SIZE = { width: 1080, height: 2400 };
const PREVIEW_COUNT = 4;

const Project = ({ project }: ProjectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const galleryId = useId();
  const isWeb = project.type === "web";
  const screenshots = project.screenshots ?? [];
  const previews = screenshots.slice(0, PREVIEW_COUNT);
  const hiddenCount = screenshots.length - previews.length;
  const defaultSize = isWeb ? DEFAULT_WEB_SIZE : DEFAULT_MOBILE_SIZE;
  const links = [
    { href: project.playStoreLink, label: "Play Store" },
    { href: project.appStoreLink, label: "App Store" },
    { href: project.webLink, label: "Website" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  return (
    <li className="border-t border-border py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-base font-medium">{project.title}</h3>
        {links.length > 0 && (
          <ul className="flex shrink-0 gap-4 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-block py-1"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-2 max-w-[65ch] text-fg-muted">{project.description}</p>
      {screenshots.length > 0 && (
        <>
          {!isExpanded && (
            <ul className="mt-4 flex items-end gap-2">
              {previews.map((shot) => (
                <li key={shot.src}>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="block"
                    aria-label={`Show ${project.title} screenshots`}
                  >
                    <Image
                      src={shot.src}
                      alt=""
                      width={shot.width || defaultSize.width}
                      height={shot.height || defaultSize.height}
                      loading="lazy"
                      className={`w-auto rounded border border-border bg-bg-subtle ${isWeb ? "h-20" : "h-28"}`}
                    />
                  </button>
                </li>
              ))}
              {hiddenCount > 0 && (
                <li className="font-mono text-xs text-fg-faint">+{hiddenCount}</li>
              )}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded((open) => !open)}
            aria-expanded={isExpanded}
            aria-controls={galleryId}
            className="link mt-3 inline-block py-1 text-sm text-fg-muted"
          >
            {isExpanded ? "Hide screenshots" : `Show screenshots (${screenshots.length})`}
          </button>
          <ul
            id={galleryId}
            hidden={!isExpanded}
            className={isWeb ? "mt-4 grid gap-4" : "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"}
          >
            {isExpanded &&
              screenshots.map((shot, index) => (
                <li key={shot.src}>
                  <a
                    href={shot.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`Open ${project.title} screenshot ${index + 1} at full size`}
                  >
                    <Image
                      src={shot.src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={shot.width || defaultSize.width}
                      height={shot.height || defaultSize.height}
                      loading="lazy"
                      className="h-auto w-full rounded border border-border bg-bg-subtle"
                    />
                  </a>
                </li>
              ))}
          </ul>
        </>
      )}
    </li>
  );
};

export default Project;
