export interface Project {
    id: number;
    title: string;
    description: string;
    screenshots: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Project One",
      description: "This is a description for project one.",
      screenshots: [
        "/images/myexeter1.png",
        "/images/myexeter2.png",
        "/images/myexeter3.png",
      ],
    },
    {
      id: 2,
      title: "Project Two",
      description: "This is a description for project two.",
      screenshots: [
        "/images/project2-1.png",
        "/images/project2-2.png",
      ],
    },
  ];
  