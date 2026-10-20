import type { CSSProperties } from "react";
import { projects } from "./data/project";
import Project from "./components/Project";
import ParticleField, { type ParticleSection } from "./components/ParticleField";
import SectionNav from "./components/SectionNav";
import ThemeToggle from "./components/ThemeToggle";
import content from "./data/content.json";

const navItems = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

// Shape the particle field forms in each section's art slot, in scroll order.
const particleSections: ParticleSection[] = [
  { id: "hero", shape: "moon" },
  { id: "projects", shape: "phone" },
  { id: "experience", shape: "briefcase" },
  { id: "education", shape: "cap" },
  { id: "skills", shape: "code" },
];

const { jobs, degrees, languageList: languages } = content;

// "Role, Company" -> ["Role", "Company"]
const splitFirst = (text: string): [string, string] => {
  const i = text.indexOf(", ");
  return i === -1 ? [text, ""] : [text.slice(0, i), text.slice(i + 2)];
};

// "Institution, 2022" -> ["Institution", "2022"]
const splitLast = (text: string): [string, string] => {
  const i = text.lastIndexOf(", ");
  return i === -1 ? [text, ""] : [text.slice(0, i), text.slice(i + 2)];
};

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

const sectionLabel = "mb-6 font-mono text-sm font-normal text-fg-muted";

// Single column on mobile; on desktop the page widens and each section pairs its
// content with an empty art slot, alternating sides, for the particle field.
const container = "mx-auto max-w-[42rem] px-6 lg:max-w-[72rem]";
const artRight = "lg:grid lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16";
const artLeft = "lg:grid lg:grid-cols-[1fr_minmax(0,42rem)] lg:gap-16";
const ArtSlot = () => <div data-particle-slot aria-hidden="true" className="hidden lg:block" />;

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ParticleField sections={particleSections} />

      <header className="sticky top-0 z-10 border-b border-border bg-bg">
        <nav
          aria-label="Sections"
          className={`${container} flex h-[var(--header-h)] items-center justify-between gap-4`}
        >
          <a href="#main" className="nav-link shrink-0 py-1 font-medium text-fg">
            {content.title.split(" ")[0]}
          </a>
          <div className="overflow-x-auto">
            <SectionNav items={navItems} />
          </div>
        </nav>
      </header>

      <main id="main" className={container}>
        <section
          id="hero"
          aria-labelledby="intro"
          className={`enter pt-16 lg:min-h-[calc(100svh-var(--header-h))] lg:items-center lg:pt-0 ${artRight}`}
          style={stagger(0)}
        >
          <div>
            <h1 id="intro" className="text-xl font-medium">{content.title}</h1>
            <p className="mt-2 text-fg-muted">Software Engineer</p>
            {content.summaryText.split("\n").map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[65ch]">{paragraph.trim()}</p>
            ))}
            <ul className="mt-6 flex gap-4 text-sm">
              <li>
                <a href={content.githubUrl} target="_blank" rel="noopener noreferrer" className="link inline-block py-1">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={content.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link inline-block py-1">
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
          <ArtSlot />
        </section>

        <section id="projects" aria-labelledby="projects-title" className={`enter mt-[var(--space-section)] ${artLeft}`} style={stagger(1)}>
          <ArtSlot />
          <div>
            <h2 id="projects-title" className={sectionLabel}>{content.projects}</h2>
            <ul>
              {projects.map((project) => (
                <Project key={project.title} project={project} />
              ))}
            </ul>
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-title" className={`enter mt-[var(--space-section)] ${artRight}`} style={stagger(2)}>
          <div>
            <h2 id="experience-title" className={sectionLabel}>{content.experience}</h2>
            <ul>
              {jobs.map((job) => {
                const [role, company] = splitFirst(job.title);
                return (
                  <li key={job.title} className="grid gap-1 border-t border-border py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <span className="tnum font-mono text-xs leading-6 text-fg-faint">{job.years}</span>
                    <div>
                      <h3 className="text-base font-medium">{role}</h3>
                      <p className="text-fg-muted">{company}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <ArtSlot />
        </section>

        <section id="education" aria-labelledby="education-title" className={`enter mt-[var(--space-section)] ${artLeft}`} style={stagger(3)}>
          <ArtSlot />
          <div>
            <h2 id="education-title" className={sectionLabel}>{content.education}</h2>
            <ul>
              {degrees.map((degree) => {
                const [institution, year] = splitLast(degree.institution);
                return (
                  <li key={degree.title} className="grid gap-1 border-t border-border py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <span className="tnum font-mono text-xs leading-6 text-fg-faint">{year}</span>
                    <div>
                      <h3 className="text-base font-medium">{degree.title}</h3>
                      <p className="text-fg-muted">{institution}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title" className={`enter mt-[var(--space-section)] ${artRight}`} style={stagger(4)}>
          <div>
            <h2 id="skills-title" className={sectionLabel}>{content.skills}</h2>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-fg-muted">
              {content.skillsText.split(" | ").map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <ArtSlot />
        </section>

        {/* No art slot: the code shape stays parked on the right through the tail sections. */}
        <section id="languages" aria-labelledby="languages-title" className="enter mt-[var(--space-section)] lg:max-w-[42rem]" style={stagger(5)}>
          <h2 id="languages-title" className={sectionLabel}>{content.languages}</h2>
          <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>

        <section id="research-interests" aria-labelledby="research-title" className="enter mt-[var(--space-section)] lg:max-w-[42rem]" style={stagger(6)}>
          <h2 id="research-title" className={sectionLabel}>{content.researchInterests}</h2>
          <ul className="grid gap-y-1">
            {content.researchInterestsText.split(" | ").map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={`${container} mt-[var(--space-section)] flex items-center justify-between gap-4 border-t border-border py-8 text-sm text-fg-faint`}>
        <span>© {new Date().getFullYear()} {content.title}</span>
        <span className="flex items-center gap-4">
          <a
            href="https://github.com/halcyonashes/halcyonashes.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-block py-1"
          >
            Source ↗
          </a>
          <ThemeToggle />
        </span>
      </footer>
    </>
  );
}
