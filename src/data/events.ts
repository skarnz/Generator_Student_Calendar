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
  food?: string;
  prize?: string;
  shortBlurb?: string;
}

// Load events from markdown file - human-verified dates and content!
function loadEventsFromMarkdown(): Event[] {
  const events: Event[] = [
    // August 2025
    {
      id: "quad-mixer-2025",
      title: "Quad Generator Mixer",
      description: "The opening generator mixer aims to bring the larger student community together in a less formal manner. We will be hosting a dj set with games, food, music and good vibes to encourage people to meet the generator community, and open a door for the freshman to get involved and get to know the generator team.",
      date: "2025-08-30",
      time: "1:00 PM - 3:00 PM",
      location: "Freshman Quad",
      eventType: "Major Event",
      audience: ["Freshman", "New Students"],
      contactName: "Reece",
      contactEmail: "generator@babson.edu",
      food: "Food and refreshments",
      prize: "Raffle for Meta Glasses and JBL speakers",
      shortBlurb: "Opening mixer with DJ, games, and community vibes"
    },
    
    // September 2025
    {
      id: "org-fair-2025",
      title: "Org Fair",
      description: "Babson's club and org fair for all students, with a focus on showing off the generator's capability and reach across campus. Large focus on new incoming students and Babson freshman.",
      date: "2025-09-05",
      time: "11:00 AM - 1:00 PM",
      location: "LGRAC",
      eventType: "External Event",
      audience: ["Freshman", "New Students"],
      contactName: "Diana",
      contactEmail: "generator@babson.edu",
      shortBlurb: "Showcase Generator's capabilities at Babson's org fair"
    },
    
    {
      id: "ai-video-marketing-2025",
      title: "Using Generative AI Video for Marketing (w BMS + AIC)",
      description: "Video has become the backbone of modern marketing—and with generative AI, creating high-quality, tailored content is faster and smarter than ever. Join The Generator, Babson Marketing Society, and AI Club for a hands-on event exploring how AI is transforming marketing workflows. We'll dive into the newest platforms and techniques shaping the field: Opus, Arcads, and n8n Automations.",
      date: "2025-09-10",
      time: "6:00 PM - 8:00 PM",
      location: "Park Manor West",
      eventType: "Workshop",
      audience: ["Students"],
      contactName: "Alex",
      contactEmail: "generator@babson.edu",
      food: "Light refreshments",
      prize: "Arcads and N8N subscriptions",
      shortBlurb: "Hands-on AI video marketing workshop"
    },
    
    {
      id: "generator-cafe-2025-09-13",
      title: "Generator Cafe (first one)",
      description: "Join us for Generator Cafe, a weekly collaborative workspace where student builders, tech enthusiasts, and aspiring entrepreneurs come together to create, share, and innovate! Whether you're actively building or just curious about getting started, this is your opportunity to connect with like-minded creators.",
      date: "2025-09-13",
      time: "10:00 AM - 12:00 PM",
      location: "Weissman Foundry",
      eventType: "Weekly Event",
      audience: ["Students", "Greater Boston"],
      contactName: "Generator Team",
      contactEmail: "generator@babson.edu",
      food: "Coffee and light snacks",
      shortBlurb: "Weekly collaborative workspace for builders"
    },
    
    {
      id: "ai-foundations-quiz-2025",
      title: "Foundations of AI (with AIClub)/Are you smarter than an AI?",
      description: "Large scale event where it is a edutainment style, both informative and game show like energy. Go over a quick intro of foundations of AI and then have a kahoot style quiz where people competes for prizes.",
      date: "2025-09-15",
      time: "6:00 PM - 8:00 PM",
      location: "Weissman Foundry",
      eventType: "Regular Event",
      audience: ["Students", "Freshman"],
      contactName: "Spencer",
      contactEmail: "generator@babson.edu",
      food: "Food provided",
      prize: "2 Gen 2 RingConn smart rings",
      shortBlurb: "Game show style AI education event"
    },
    
    // October 2025
    {
      id: "ai-business-etower-2025",
      title: "Elevating your business w/AI (Etower)",
      description: "Join The Generator and E-Tower for an interactive workshop designed to transform your business through AI integration. Learn practical strategies to leverage AI tools across your business operations, from enhancing customer service with chatbots to optimizing marketing and streamlining product design.",
      date: "2025-10-01",
      time: "6:00 PM - 8:00 PM",
      location: "Weissman Foundry",
      eventType: "Major Event",
      audience: ["Students"],
      contactName: "Cole",
      contactEmail: "generator@babson.edu",
      food: "Food provided",
      prize: "AI tool subscriptions",
      shortBlurb: "Transform your business with AI tools"
    },
    
    {
      id: "ai-ethics-cheat-2025",
      title: "AI to Cheat (2truths + a lie)",
      description: "Not all AI tools are created equal. Some drive productivity, some fuel creativity—and some cross the line. In this interactive event, The Generator challenges Babson students to think critically about what happens when innovation drifts into academic dishonesty.",
      date: "2025-10-06",
      time: "6:00 PM - 8:00 PM",
      location: "Weissman Foundry",
      eventType: "Regular Event",
      audience: ["Students"],
      contactName: "Cole",
      contactEmail: "generator@babson.edu",
      shortBlurb: "Critical thinking about AI ethics"
    },
    
    {
      id: "ai-matchmaking-pow-2025",
      title: "AI Matchmaking Event (collab w/pow on 10/17)",
      description: "Looking to spark new connections at Babson? The Generator, in collaboration with POW, invites you to an evening of AI-powered matchmaking with a twist. This event pairs you with peers based on real compatibility scores using our custom-built matchmaking webapp.",
      date: "2025-10-17",
      time: "TBD",
      location: "Winn Auditorium",
      eventType: "Regular Event",
      audience: ["Students"],
      contactName: "Diana",
      contactEmail: "generator@babson.edu",
      shortBlurb: "AI-powered social matchmaking event"
    },
    
    {
      id: "mvp-coding-tools-2025",
      title: "MVP Coding Tools Workshop (W/code)",
      description: "The AI Coding Tools Workshop, in collaboration with CODE, will be a student-led event focused on exploring AI-driven software development tools, specifically highlighting platforms such as Cursor, lovable, Replit Agent, and more. Learn how to build ready MVPs with AI-powered code generation.",
      date: "2025-10-20",
      time: "6:00 PM - 8:00 PM",
      location: "Park Manor West",
      eventType: "Major Event",
      audience: ["Students", "Greater Boston"],
      contactName: "Spencer",
      contactEmail: "generator@babson.edu",
      food: "Food provided",
      prize: "3-month tool subscriptions",
      shortBlurb: "Build MVPs with AI coding tools"
    },
    
    {
      id: "g1000-workshop-2025",
      title: "G1000 Workshop",
      description: "Special workshop event for G1000 participants.",
      date: "2025-10-24",
      time: "10:00 AM - 2:00 PM",
      location: "Place TBD",
      eventType: "Workshop",
      audience: ["Students", "Greater Boston"],
      contactName: "Gavin",
      contactEmail: "generator@babson.edu",
      shortBlurb: "G1000 special workshop"
    },
    
    {
      id: "g1000-workshop-2-2025",
      title: "G1000 Workshop 2",
      description: "Second G1000 workshop event for participants.",
      date: "2025-10-24",
      time: "TBD",
      location: "Weissman Foundry",
      eventType: "Workshop",
      audience: ["Students", "Greater Boston"],
      contactName: "Gavin",
      contactEmail: "generator@babson.edu",
      shortBlurb: "Second G1000 workshop"
    },
    
    {
      id: "ai-olympics-2025",
      title: "AI Olympics (mini Bthon: multiple clubs)",
      description: "Step into the arena where creativity, competition, and technology collide. The Babson AI Olympics is an all-campus event that invites clubs, athletic teams, and student organizations to test their skills across a series of AI-powered challenges including Coding Golf, Vibe Coding, AI-Driven Pitch Games, and more.",
      date: "2025-10-25",
      time: "11:00 AM - 4:00 PM",
      location: "LGRAC",
      eventType: "HUGE Event",
      audience: ["Students", "Generator Team", "Faculty"],
      contactName: "Generator Team",
      contactEmail: "generator@babson.edu",
      food: "Food throughout the day",
      prize: "2 ATOM Potensic drones",
      shortBlurb: "Campus-wide AI competition event"
    },
    
    // November 2025
    {
      id: "vr-product-design-2025",
      title: "Large Room VR Product Design comp (P&J)",
      description: "We show the community the text to image to 3D to VR workflow, input the 3D models into a shared VR space where we do a product design intro and competition. Vote on the best designs to win prizes or funds to design a new product.",
      date: "2025-11-04",
      time: "6:00 PM - 8:00 PM",
      location: "HELV Global Lounge",
      eventType: "Major Event",
      audience: ["Students", "Greater Boston"],
      contactName: "Cole",
      contactEmail: "generator@babson.edu",
      food: "Food provided",
      prize: "Meta Quest 3S headset",
      shortBlurb: "VR product design competition"
    },
    
    {
      id: "buildathon-2025",
      title: "Generator 3rd Annual Buildathon",
      description: "Join us for an energizing one-day AI hackathon at the Weissman Foundry! In partnership with Microsoft Research, this event challenges Babson, Olin, and Wellesley students to build innovative AI solutions. No prior coding experience required!",
      date: "2025-11-15",
      time: "10:00 AM - 8:00 PM",
      location: "Weissman Foundry",
      eventType: "HUGE Event",
      audience: ["Greater Boston", "Students"],
      contactName: "Generator Team",
      contactEmail: "generator@babson.edu",
      food: "Breakfast, lunch, and dinner",
      prize: "Prize money TBD",
      shortBlurb: "Annual AI hackathon with Microsoft"
    },
    
    // December 2025
    {
      id: "ai-real-estate-2025",
      title: "AI in Real Estate investing (with CRE & AIC)",
      description: "Join The Generator, Babson Real Estate Club, and AI Club for a collaborative event exploring how artificial intelligence is reshaping real estate investing from end to end. Learn how AI can aggregate comps, identify undervalued assets, and optimize portfolio strategies in real time.",
      date: "2025-12-02",
      time: "6:00 PM - 8:00 PM",
      location: "Weisman Classroom/Cutler Center",
      eventType: "Regular Event",
      audience: ["Students"],
      contactName: "Gavin",
      contactEmail: "generator@babson.edu",
      food: "Food provided",
      shortBlurb: "AI transforming real estate investing"
    },
    
    // Recurring Events
    {
      id: "generator-cafe-weekly",
      title: "Generator Cafe - All Semesters",
      description: "Join us for Generator Cafe, a weekly collaborative workspace where student builders, tech enthusiasts, and aspiring entrepreneurs come together to create, share, and innovate! Whether you're actively building or just curious about getting started, this is your opportunity to connect with like-minded creators.",
      date: "2025-09-06",
      time: "10:00 AM - 12:00 PM",
      location: "Weissman Foundry",
      eventType: "Weekly Event",
      audience: ["Students", "Greater Boston"],
      contactName: "Generator Team",
      contactEmail: "generator@babson.edu",
      food: "Coffee and light snacks",
      shortBlurb: "Weekly collaborative workspace for builders"
    },
    
    // Online/TBD Events
    {
      id: "friendgroup-matchmaking-webapp",
      title: "Friendgroup MatchMaking with AI (Web app leading up to 10/17)",
      description: "An AI-powered web application for matching friend groups, leading up to the main matchmaking event on October 17th.",
      date: "2025-10-10",
      time: "TBD",
      location: "Online",
      eventType: "Regular Event",
      audience: ["Students"],
      contactName: "Diana",
      contactEmail: "generator@babson.edu",
      shortBlurb: "Online AI friend matching webapp"
    },
    
    {
      id: "women-in-ai-2025",
      title: "Women In AI Day",
      description: "A special event celebrating and empowering women in artificial intelligence and technology.",
      date: "2025-12-31", // Placeholder date for TBD events
      time: "TBD",
      location: "TBD",
      eventType: "Special Event",
      audience: ["Everyone"],
      contactName: "Diana",
      contactEmail: "generator@babson.edu",
      shortBlurb: "Celebrating women in AI"
    }
  ];
  
  return events;
}

export let events: Event[] = loadEventsFromMarkdown();

export const eventTypes = [
  "Workshop",
  "Talk", 
  "Buildathon",
  "Speaker Series",
  "Info Session",
  "Networking",
  "Demo Day",
  "Major Event",
  "Regular Event",
  "External Event",
  "Weekly Event",
  "HUGE Event",
  "Special Event"
];

export const audiences = ["Students", "Associates", "Everyone", "Freshman", "New Students", "Greater Boston", "Generator Team", "Faculty"];