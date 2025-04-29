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
      description: "The app to support the students throughout their university journey. Extensively worked on login flow using AWS Cognito and Amplify, Firebase Analytics, Provider for state management, and error handling.",
      screenshots: [
        "/images/myexeter1.jpg",
        "/images/myexeter2.jpg",
        "/images/myexeter3.jpg",
        "",
      ],
    },
    {
      id: 2,
      title: "Wi-fi Onboarding",
      description: "The web app helps the students connect to the university wi-fi developed using React with TypeScript.",
      screenshots: [
        "/images/wifi1.png",
        "/images/wifi2.png",
      ],
    },
    {
      id: 3,
      title: "GoEntrance / Loksewa Pro/ MAN - Mathematical Association of Nepal",
      description: "Apps where you can enroll into different courses and practice test sets and take a test. Worked with charts, Room and ObjectBox for database, Android navigation components, image caching, Youtube API, and Firebase Crashlytics.",
      screenshots: [
        "/images/man1.jpg",
        "/images/loksewa2.jpg",
        "/images/loksewa1.jpg",
        "/images/goentrance1.jpg",
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
        "/images/sathichat1.jpg",
        "/images/sathichat2.jpg",
        "",
        "",
      ],
    },
    {
      id: 6,
      title: "Karmakanda",
      description: "The app is designed to be a virtual priest and help you with rituals. Worked with SQLite, Firebase authentication, Retrofit, Exoplayer, and Calendars.",
      screenshots: [
        "/images/karmakanda1.png",
        "/images/karmakanda2.png",
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
  