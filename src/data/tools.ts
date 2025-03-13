
interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
  logoUrl?: string;
}

export const tools: Tool[] = [
  {
    name: "Lovable",
    description: "An AI-driven coding platform designed to enhance developer productivity and create web applications.",
    url: "https://lovable.dev/",
    category: "Web App Creation",
    logoUrl: "/lovable-uploads/bb1515d1-8646-4719-9d4f-a615463b3467.png"
  },
  {
    name: "Microsoft Azure API Keys",
    description: "Access to Microsoft Azure's AI services through provided API keys for the Buildathon.",
    url: "https://azure.microsoft.com/",
    category: "AI API Credits",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/azure-1.svg"
  },
  {
    name: "Krea.ai",
    description: "An AI image generation tool offering cost-effective solutions for creating stunning visuals.",
    url: "https://krea.ai/",
    category: "Text to Image",
    logoUrl: "https://krea.ai/krea-thumb.png"
  },
  {
    name: "Cursor",
    description: "An AI coding platform that provides intelligent code suggestions and automations to speed up development.",
    url: "https://cursor.so/",
    category: "Coding Tool",
    logoUrl: "https://cursor.sh/brand/cursor-circle-white-green-type.svg"
  },
  {
    name: "ElevenLabs Text to Speech",
    description: "AI-powered text-to-speech platform that delivers high-quality, human-like voices in 32 languages.",
    url: "https://elevenlabs.io/",
    category: "AI Text to Speech",
    logoUrl: "https://dashboard.elevenlabs.io/apple-touch-icon.png"
  },
  {
    name: "ElevenLabs Scribe",
    description: "Advanced automatic speech recognition (ASR) model offering highly accurate transcription across 99 languages.",
    url: "https://elevenlabs.io/blog/meet-scribe",
    category: "AI Speech to Text",
    logoUrl: "https://dashboard.elevenlabs.io/apple-touch-icon.png"
  },
  {
    name: "Vizcom",
    description: "An AI tool for product design and prototyping, enabling 3D creation from images and text.",
    url: "https://vizcom.ai/",
    category: "3D Creation",
    logoUrl: "https://vizcom.ai/favicon.ico"
  },
  {
    name: "n8n",
    description: "A no-code/low-code workflow and agent-building platform suitable for both beginners and advanced users.",
    url: "https://n8n.io/",
    category: "AI Workflows",
    logoUrl: "https://n8n.io/favicon.ico"
  },
  {
    name: "Rork",
    description: "An AI-powered platform that enables rapid development of cross-platform mobile applications using React Native.",
    url: "https://rork.app/",
    category: "Mobile App Development",
    logoUrl: "https://www.rork.app/favicon.png"
  },
  {
    name: "Lemonaide AI",
    description: "An AI-powered melody generator that creates high-quality audio and MIDI loops, offering flexibility for music producers.",
    url: "https://www.lemonaide.ai/",
    category: "Music Creation",
    logoUrl: "https://www.lemonaide.ai/favicon.ico"
  },
  {
    name: "Suno",
    description: "An AI platform for music generation and composition.",
    url: "https://suno.ai/",
    category: "Music Creation",
    logoUrl: "https://app.suno.ai/favicon.ico"
  },
  {
    name: "Exa",
    description: "An AI search tool capable of searching websets (databases of people, companies, etc.) and offering various features.",
    url: "https://exa.ai/",
    category: "AI Search",
    logoUrl: "https://exa.ai/favicon.ico"
  },
  {
    name: "Firecrawl",
    description: "An AI-powered web scraping tool for efficient data extraction.",
    url: "https://www.firecrawl.dev/",
    category: "Web Scraping",
    logoUrl: "https://www.firecrawl.dev/favicon.ico"
  },
  {
    name: "Agno",
    description: "A lightweight, open-source library for building multimodal AI agents with memory, knowledge, and tools.",
    url: "https://github.com/agno-agi/agno",
    category: "Agent Framework",
    logoUrl: "https://avatars.githubusercontent.com/u/150489855"
  },
  {
    name: "OpenAI Agents",
    description: "A framework that enables developers to build AI agents capable of performing tasks autonomously.",
    url: "https://platform.openai.com/docs/guides/agents",
    category: "Agent Framework",
    logoUrl: "https://openai.com/favicon.ico"
  },
  {
    name: "Vercel",
    description: "A platform for easy hosting and deployment of AI applications.",
    url: "https://vercel.com/",
    category: "Application Hosting",
    logoUrl: "https://vercel.com/favicon.ico"
  },
  {
    name: "Supabase",
    description: "An open-source database that integrates seamlessly with AI applications.",
    url: "https://supabase.com/",
    category: "Database",
    logoUrl: "https://supabase.com/favicon/favicon-32x32.png"
  },
  {
    name: "Deep Research",
    description: "AI-powered market research tools for quick research and prototyping.",
    url: "https://openai.com/index/introducing-deep-research/",
    category: "Research",
    logoUrl: "https://openai.com/favicon.ico"
  },
  {
    name: "Gamma",
    description: "An AI tool for creating engaging and interactive slide presentations.",
    url: "https://gamma.app/",
    category: "Presentation Creation",
    logoUrl: "https://gamma.app/favicon.ico"
  },
  {
    name: "Agency Agents Marketplace",
    description: "A platform offering over 500 vetted copilots, tools, and AI agents to assist startups and small businesses.",
    url: "https://marketplace.agen.cy/home",
    category: "Agents Marketplace",
    logoUrl: "https://marketplace.agen.cy/favicon.ico"
  },
  {
    name: "Intercom",
    description: "Provides AI-driven customer service agents for professional chat support.",
    url: "https://intercom.com/",
    category: "Customer Service",
    logoUrl: "https://www.intercom.com/favicon.ico"
  },
  {
    name: "AI Engineer Pack",
    description: "A collection of many tools with some on this list heavily discounted or free for developers.",
    url: "https://www.aiengineerpack.com/",
    category: "Free Resources",
    logoUrl: "https://www.aiengineerpack.com/favicon.ico"
  }
];

export const categories: string[] = [
  ...new Set(tools.map(tool => tool.category))
].sort();
