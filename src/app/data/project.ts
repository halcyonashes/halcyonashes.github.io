export interface Screenshot {
    src: string;
    width: number;
    height: number;
  }

  export interface Project {
    id: number;
    title: string;
    description: string;
    screenshots: Screenshot[];
    playStoreLink?: string;
    appStoreLink?: string;
    webLink?: string;
    type?: "web" | "mobile";
  }

  // Intrinsic pixel sizes, so each image reserves its exact box before it loads.
  const shot = (src: string, width: number, height: number): Screenshot => ({ src, width, height });

  export const projects: Project[] = [
    {
      id: 1,
      title: "Derrapon",
      description: "Crash detection with trip tracking, scoring, WhatsApp alerts, and Stripe-based subscriptions.",
      screenshots: [
        shot("/images/derrapon1.png", 414, 920),
        shot("/images/derrapon2.jpg", 1080, 2400),
        shot("/images/derrapon3.jpg", 1080, 2400),
        shot("/images/derrapon4.png", 417, 923),
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.derrapon.app",
    },
    {
      id: 11,
      title: "Minimala",
      description: "Minimalistic launcher app for Android built with Kotlin.",
      screenshots: [
        shot("/images/minimala_1.jpg", 1080, 2400),
        shot("/images/minimala_2.jpg", 1080, 2400),
        shot("/images/minimala_3.jpg", 1080, 2400),
      ],
    },
    {
      id: 2,
      title: "Retainly",
      description: "Merchant app with BLoC state management, dashboard charts, customer tracking, offer management, and point redemption scanner.",
      screenshots: [
        shot("/images/fuelshine1.jpg", 1080, 2400),
        shot("/images/fuelshine2.jpg", 1080, 2400),
        shot("/images/fuelshine3.jpg", 1080, 2400),
        shot("/images/fuelshine4.jpg", 1080, 2400),
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=app.fuelshine.merchant",
    },
    {
      id: 3,
      title: "Swinch",
      description: "Tourist app with customer and merchant sides. Features Stacked architecture, Payrexx payments, local attractions, coupons, OAuth sign-in, and cart-based orders.",
      screenshots: [
        shot("/images/swinch1.jpeg", 720, 1600),
        shot("/images/swinch2.jpeg", 720, 1600),
        shot("/images/swinch3.jpeg", 720, 1600),
        shot("/images/swinch4.jpeg", 720, 1600),
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.customer.swinch",
    },
    {
      id: 4,
      title: "MyExeter",
      description: "University support app with attendance monitoring, timetable, events, and federated login using AWS Cognito and Firebase Analytics.",
      screenshots: [
        shot("/images/myexeter1.jpg", 729, 1421),
        shot("/images/myexeter2.jpg", 727, 1415),
        shot("/images/myexeter3.jpg", 727, 1413),
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=uk.ac.exeter.MyExeter",
      appStoreLink: "https://apps.apple.com/us/app/myexeter/id6499220718",
    },
    {
      id: 5,
      title: "OptERP",
      description: "Healthcare app with local medication reminders, report downloads, and appointment booking.",
      screenshots: [
        shot("/images/opterp1.jpg", 1080, 2400),
        shot("/images/opterp2.jpg", 1080, 2400),
        shot("/images/opterp3.jpg", 1080, 2400),
        shot("/images/opterp4.jpg", 1080, 2400),
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=app.geofinity.openerp",
    },
    {
      id: 6,
      title: "Wi-fi Onboarding",
      description: "University Wi-Fi onboarding web app built with React and TypeScript.",
      screenshots: [
        shot("/images/wifi1.png", 1920, 968),
        shot("/images/wifi2.png", 1920, 968),
      ],
      type: "web"
    },
    {
      id: 7,
      title: "GoEntrance / Loksewa Pro/ MAN - Mathematical Association of Nepal",
      description: "Test prep apps with course enrollment, practice tests, charts, Room/ObjectBox database, image caching, YouTube API, and Firebase Crashlytics.",
      screenshots: [
        shot("/images/man1.jpg", 1043, 1847),
        shot("/images/loksewa2.jpg", 1080, 1920),
        shot("/images/loksewa1.jpg", 1080, 1920),
        shot("/images/goentrance1.jpg", 1080, 1920),
      ],
    },
    {
      id: 8,
      title: "Sustain",
      description: "The app is designed to help with a healthcare research. The app was used by 4600 health facilities but due to the sensitive nature of data involved, it was distributed internally.",
      screenshots: [],
    },
    {
      id: 9,
      title: "Sathichat",
      description: "Chat app built with Rocket.Chat and Jitsi Meet integration for video conferencing.",
      screenshots: [
        shot("/images/sathichat1.jpg", 800, 1280),
        shot("/images/sathichat2.jpg", 800, 1280),
      ],
    },
    {
      id: 10,
      title: "Karmakanda",
      description: "Virtual priest app with ritual guidance, local notifications, SQLite database, Firebase auth, video playback, and calendar integration.",
      screenshots: [
        shot("/images/karmakanda1.png", 1080, 1920),
        shot("/images/karmakanda2.png", 1080, 1920),
      ],
    }
  ];
