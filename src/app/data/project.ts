import projectsData from "./projects.json";

export interface Screenshot {
    src: string;
    // Intrinsic pixel sizes, so each image reserves its exact box before it loads.
    // Optional because CMS edits may leave them empty; Project.tsx falls back per type.
    width?: number | null;
    height?: number | null;
  }

  export interface Project {
    title: string;
    description: string;
    // Pages CMS omits the key entirely when a project has no images.
    screenshots?: Screenshot[];
    playStoreLink?: string;
    appStoreLink?: string;
    webLink?: string;
    type?: "web" | "mobile" | "";
  }

  // Edited through Pages CMS (.pages.yml); array order is display order.
  export const projects = projectsData as Project[];
