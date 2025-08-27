export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  eventType: string;
  audience: string[]; // Students, Associates, Everyone
  registrationUrl?: string;
  speakerName?: string;
  speakerTitle?: string;
  contactName?: string;
  contactEmail?: string;
  isPastEvent?: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    title: "The Generator Builder's Day",
    description: "Join The Generator Student Leadership Team for Builder's Day, a weekly collaborative workspace where student builders, tech enthusiasts, and aspiring entrepreneurs come together to create, share, and innovate! In partnership with DAM and other Babson tech organizations, we're transforming The Foundry into a dynamic hub for students working on tech and AI projects. Whether you're actively building or just curious about getting started, Builder's Day is your opportunity to connect with like-minded creators, share ideas, and turn your concepts into reality. Come be part of Babson's growing tech and AI community as we build the future together!",
    date: "2025-03-29",
    time: "10:00 AM",
    location: "The Weissman Foundry",
    eventType: "Workshop",
    audience: ["Students"],
    contactName: "Alex Laraia",
    contactEmail: "alaraia@babson.edu"
  },
  {
    id: "2",
    title: "Generator B.R.A.I.N. Talk",
    description: "The Generator will also host a virtual meetup Tuesday, April 1, 2025, from 4-5pm EST. Generator B.R.A.I.N. Talks facilitate conversation and engagement among members of the Generator community. Bring your ideas and questions to discuss, and network with fellow AI enthusiasts in these 1-hour, online, bi-monthly meetings.",
    date: "2025-04-01",
    time: "4:00 PM - 5:00 PM EST",
    location: "Webex Meeting",
    eventType: "Talk",
    audience: ["Everyone"],
    registrationUrl: "#",
    contactName: "The Generator",
    contactEmail: "generator@babson.edu"
  },
  {
    id: "3",
    title: "Microsoft-Generator AI and Entrepreneurship 2nd Buildathon",
    description: "Join us for an energizing one-day AI hackathon at The Weissman Foundry! In partnership with Microsoft Research, this event challenges Babson, Olin, and Wellesley students to build innovative AI solutions. Whether you're a tech enthusiast or an aspiring entrepreneur, come ready to ideate, create, and pitch your AI-powered ventures. No prior coding experience required - bring your entrepreneurial spirit and creative mindset!",
    date: "2025-04-05",
    time: "10:00 AM - 8:00 PM",
    location: "The Weissman Foundry",
    eventType: "Buildathon",
    audience: ["Students"],
    contactName: "Connor Raney",
    contactEmail: "craney@babson.edu"
  },
  {
    id: "4",
    title: "Generator AI & Machine Learning Speaker Series",
    description: "Encoder-Only Transformers, the Unsung Hero of the AI Revolution with Josh Starmer. Fourth in a series of technical experts in the area of ML from the corporate sector invited to present to Babson community (in layman's terms) on the use of ML in their organizations. The scope is to enlighten the general audience, consisting of students and faculty, on the use of technical ML tools but in a way that is understandable and intuitive rather than technical.",
    date: "2025-04-08",
    time: "4:00 PM",
    location: "Olin Hall Classroom #120",
    eventType: "Speaker Series",
    audience: ["Everyone"],
    speakerName: "Josh Starmer",
    speakerTitle: "Creator and Host of StatQuest YouTube Channel",
    contactName: "Davit Khachatryan",
    contactEmail: "dkhachatryan@babson.edu"
  },
  {
    id: "5",
    title: "Generator Summer Accelerator Info Session",
    description: "Learn about The Generator's intensive 10-week summer program designed to help student entrepreneurs launch their ventures. Get information about the application process, program structure, mentorship opportunities, and funding available for selected teams.",
    date: "2025-04-15",
    time: "5:00 PM - 6:00 PM",
    location: "The Generator Space",
    eventType: "Info Session",
    audience: ["Students"],
    registrationUrl: "#",
    contactName: "The Generator Team",
    contactEmail: "generator@babson.edu"
  },
  {
    id: "6",
    title: "AI Ethics Workshop: Building Responsible AI Solutions",
    description: "Explore the ethical implications of AI development and deployment. This interactive workshop covers bias in AI, privacy concerns, transparency, and best practices for building responsible AI solutions. Perfect for students interested in the intersection of technology and social responsibility.",
    date: "2025-04-22",
    time: "3:00 PM - 5:00 PM",
    location: "Tomasso Hall Room 155",
    eventType: "Workshop",
    audience: ["Students", "Associates"],
    contactName: "Sarah Chen",
    contactEmail: "schen@babson.edu"
  },
  {
    id: "7",
    title: "Generator Associates Monthly Meetup",
    description: "Connect with fellow Generator Associates for our monthly networking session. Share progress on your ventures, seek advice, and build meaningful connections within our entrepreneurial community. Light refreshments provided.",
    date: "2025-05-01",
    time: "6:00 PM - 8:00 PM",
    location: "The Generator Space",
    eventType: "Networking",
    audience: ["Associates"],
    contactName: "Associates Program",
    contactEmail: "associates@generator.babson.edu"
  },
  {
    id: "8",
    title: "Demo Day: Spring 2025",
    description: "Join us for the culmination of The Generator's spring programs as student teams present their ventures to investors, mentors, and the Babson community. Witness innovative solutions and support the next generation of entrepreneurs.",
    date: "2025-05-08",
    time: "4:00 PM - 7:00 PM",
    location: "Sorenson Center for the Arts",
    eventType: "Demo Day",
    audience: ["Everyone"],
    registrationUrl: "#",
    contactName: "The Generator",
    contactEmail: "generator@babson.edu"
  },
  {
    id: "9",
    title: "Introduction to Machine Learning with Python",
    description: "A hands-on workshop for beginners interested in machine learning. Learn the basics of ML algorithms, work with popular Python libraries like scikit-learn and TensorFlow, and build your first ML model. No prior ML experience required, but basic Python knowledge is helpful.",
    date: "2025-05-15",
    time: "2:00 PM - 4:00 PM",
    location: "Olin Hall Computer Lab",
    eventType: "Workshop",
    audience: ["Students"],
    contactName: "Tech Team",
    contactEmail: "tech@generator.babson.edu"
  }
];

export const eventTypes = [
  "Workshop",
  "Talk",
  "Buildathon",
  "Speaker Series",
  "Info Session",
  "Networking",
  "Demo Day"
];

export const audiences = ["Students", "Associates", "Everyone"];