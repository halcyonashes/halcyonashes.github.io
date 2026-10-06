import Image from "next/image";
import { Project as ProjectType } from "../data/project";

interface ProjectProps {
  project: ProjectType;
}

const Project = ({ project }: ProjectProps) => {
  const isWeb = project.type === "web";
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
      {project.screenshots.length > 0 && (
        <ul className={isWeb ? "mt-6 grid gap-4" : "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"}>
          {project.screenshots.map((shot, index) => (
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
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  className="h-auto w-full rounded border border-border bg-bg-subtle"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Project;
