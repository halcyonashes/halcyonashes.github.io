export interface Project {
    id: number;
    title: string;
    description: string;
    screenshots: string[];
    playStoreLink?: string;
    appStoreLink?: string;
    webLink?: string;
    type?: "web" | "mobile";
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Derrapon",
      description: "Crash detection with trip tracking, scoring, WhatsApp alerts, and Stripe-based subscriptions.",
      screenshots: [
        "/images/derrapon1.png",
        "/images/derrapon2.jpg",
        "/images/derrapon3.jpg",
        "/images/derrapon4.png",
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.derrapon.app",
    },
    {
      id: 2,
      title: "Retainly",
      description: "Merchant app with BLoC state management, dashboard charts, customer tracking, offer management, and point redemption scanner.",
      screenshots: [
        "/images/fuelshine1.jpg",
        "/images/fuelshine2.jpg",
        "/images/fuelshine3.jpg",
        "/images/fuelshine4.jpg",
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=app.fuelshine.merchant",
    },
    {
      id: 3,
      title: "Swinch",
      description: "Tourist app with customer and merchant sides. Features Stacked architecture, Payrexx payments, local attractions, coupons, OAuth sign-in, and cart-based orders.",
      screenshots: [
        "/images/swinch1.jpeg",
        "/images/swinch2.jpeg",
        "/images/swinch3.jpeg",
        "/images/swinch4.jpeg",
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.customer.swinch",
    },
    {
      id: 4,
      title: "MyExeter",
      description: "University support app with attendance monitoring, timetable, events, and federated login using AWS Cognito and Firebase Analytics.",
      screenshots: [
        "/images/myexeter1.jpg",
        "/images/myexeter2.jpg",
        "/images/myexeter3.jpg",
        "",
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=uk.ac.exeter.MyExeter",
      appStoreLink: "https://apps.apple.com/us/app/myexeter/id6499220718",
    },
    {
      id: 5,
      title: "OptERP",
      description: "Healthcare app with local medication reminders, report downloads, and appointment booking.",
      screenshots: [
        "/images/opterp1.jpg",
        "/images/opterp2.jpg",
        "/images/opterp3.jpg",
        "/images/opterp4.jpg",
      ],
      playStoreLink: "https://play.google.com/store/apps/details?id=app.geofinity.openerp",
    },
    {
      id: 6,
      title: "Wi-fi Onboarding",
      description: "University Wi-Fi onboarding web app built with React and TypeScript.",
      screenshots: [
        "/images/wifi1.png",
        "/images/wifi2.png",
      ],
      type: "web"
    },
    {
      id: 7,
      title: "GoEntrance / Loksewa Pro/ MAN - Mathematical Association of Nepal",
      description: "Test prep apps with course enrollment, practice tests, charts, Room/ObjectBox database, image caching, YouTube API, and Firebase Crashlytics.",
      screenshots: [
        "/images/man1.jpg",
        "/images/loksewa2.jpg",
        "/images/loksewa1.jpg",
        "/images/goentrance1.jpg",
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
        "/images/sathichat1.jpg",
        "/images/sathichat2.jpg",
        "",
        "",
      ],
    },
    {
      id: 10,
      title: "Karmakanda",
      description: "Virtual priest app with ritual guidance, local notifications, SQLite database, Firebase auth, video playback, and calendar integration.",
      screenshots: [
        "/images/karmakanda1.png",
        "/images/karmakanda2.png",
        "",
        "",
      ],
    }
  ];
  