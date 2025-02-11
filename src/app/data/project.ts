export interface Project {
    id: number;
    title: string;
    description: string;
    screenshots: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "MyExeter",
      description: "The app to support the students throughout their university journey.",
      screenshots: [
        "/halcyonashes/images/myexeter1.jpg",
        "/halcyonashes/images/myexeter2.jpg",
        "/halcyonashes/images/myexeter3.jpg",
        "",
      ],
    },
    {
      id: 2,
      title: "Wi-fi Onboarding",
      description: "The web app helps the students connect to the university wi-fi.",
      screenshots: [
        "/halcyonashes/images/wifi1.png",
        "/halcyonashes/images/wifi2.png",
      ],
    },
    {
      id: 3,
      title: "GoEntrance / Loksewa Pro/ MAN - Mathematical Association of Nepal",
      description: "Apps where you can enroll into different courses and practice test sets and take a test.",
      screenshots: [
        "/halcyonashes/images/man1.jpg",
        "/halcyonashes/images/loksewa2.jpg",
        "/halcyonashes/images/loksewa1.jpg",
        "/halcyonashes/images/goentrance1.jpg",
      ],
    },
    {
      id: 4,
      title: "Sustain",
      description: "The app is designed to help with a healthcare research. The app was used by 4600 health facilities but due to the sensitive nature of data involved, it was distributed internally.",
      screenshots: [],
    },
    {
      id: 5,
      title: "Sathichat",
      description: "Chat application made using Rocket.Chat and uses Jitsi Meet to enable video conference.",
      screenshots: [
        "/halcyonashes/images/sathichat1.jpg",
        "/halcyonashes/images/sathichat2.jpg",
        "",
        "",
      ],
    },
    {
      id: 6,
      title: "Karmakanda",
      description: "The app is designed to be a virtual priest and help you with rituals.",
      screenshots: [
        "/halcyonashes/images/karmakanda1.png",
        "/halcyonashes/images/karmakanda2.png",
        "",
        "",
      ],
    },
    {
      id: 7,
      title: "Event55",
      description: "Event management app with multiple themes enabled.",
      screenshots: [],
    },
  ];
  