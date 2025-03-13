
interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
}

export const tools: Tool[] = [
  {
    name: "Lovable",
    description: "An AI-driven coding platform designed to enhance developer productivity and create web applications.",
    url: "https://lovable.dev/",
    category: "Web App Creation"
  },
  {
    name: "Microsoft Azure API Keys",
    description: "Access to Microsoft Azure's AI services through provided API keys for the Buildathon.",
    url: "https://azure.microsoft.com/",
    category: "AI API Credits"
  },
  {
    name: "Krea.ai",
    description: "An AI image generation tool offering cost-effective solutions for creating stunning visuals.",
    url: "https://krea.ai/",
    category: "Text to Image"
  },
  {
    name: "Cursor",
    description: "An AI coding platform that provides intelligent code suggestions and automations to speed up development.",
    url: "https://cursor.so/",
    category: "Coding Tool"
  },
  {
    name: "ElevenLabs Text to Speech",
    description: "AI-powered text-to-speech platform that delivers high-quality, human-like voices in 32 languages.",
    url: "https://elevenlabs.io/",
    category: "AI Text to Speech"
  },
  {
    name: "ElevenLabs Scribe",
    description: "Advanced automatic speech recognition (ASR) model offering highly accurate transcription across 99 languages.",
    url: "https://elevenlabs.io/blog/meet-scribe",
    category: "AI Speech to Text"
  },
  {
    name: "Vizcom",
    description: "An AI tool for product design and prototyping, enabling 3D creation from images and text.",
    url: "https://vizcom.ai/",
    category: "3D Creation"
  },
  {
    name: "n8n",
    description: "A no-code/low-code workflow and agent-building platform suitable for both beginners and advanced users.",
    url: "https://n8n.io/",
    category: "AI Workflows"
  },
  {
    name: "Rork",
    description: "An AI-powered platform that enables rapid development of cross-platform mobile applications using React Native.",
    url: "https://rork.app/",
    category: "Mobile App Development"
  },
  {
    name: "Lemonaide AI",
    description: "An AI-powered melody generator that creates high-quality audio and MIDI loops, offering flexibility for music producers.",
    url: "https://www.lemonaide.ai/",
    category: "Music Creation"
  },
  {
    name: "Suno",
    description: "An AI platform for music generation and composition.",
    url: "https://suno.ai/",
    category: "Music Creation"
  },
  {
    name: "Exa",
    description: "An AI search tool capable of searching websets (databases of people, companies, etc.) and offering various features.",
    url: "https://exa.ai/",
    category: "AI Search"
  },
  {
    name: "Firecrawl",
    description: "An AI-powered web scraping tool for efficient data extraction.",
    url: "https://www.firecrawl.dev/",
    category: "Web Scraping"
  },
  {
    name: "Agno",
    description: "A lightweight, open-source library for building multimodal AI agents with memory, knowledge, and tools.",
    url: "https://github.com/agno-agi/agno",
    category: "Agent Framework"
  },
  {
    name: "OpenAI Agents",
    description: "A framework that enables developers to build AI agents capable of performing tasks autonomously.",
    url: "https://platform.openai.com/docs/guides/agents",
    category: "Agent Framework"
  },
  {
    name: "Vercel",
    description: "A platform for easy hosting and deployment of AI applications.",
    url: "https://vercel.com/",
    category: "Application Hosting"
  },
  {
    name: "Supabase",
    description: "An open-source database that integrates seamlessly with AI applications.",
    url: "https://supabase.com/",
    category: "Database"
  },
  {
    name: "Deep Research",
    description: "AI-powered market research tools for quick research and prototyping.",
    url: "https://openai.com/index/introducing-deep-research/",
    category: "Research"
  },
  {
    name: "Gamma",
    description: "An AI tool for creating engaging and interactive slide presentations.",
    url: "https://gamma.app/",
    category: "Presentation Creation"
  },
  {
    name: "Agency Agents Marketplace",
    description: "A platform offering over 500 vetted copilots, tools, and AI agents to assist startups and small businesses.",
    url: "https://marketplace.agen.cy/home",
    category: "Agents Marketplace"
  },
  {
    name: "Intercom",
    description: "Provides AI-driven customer service agents for professional chat support.",
    url: "https://intercom.com/",
    category: "Customer Service"
  },
  {
    name: "AI Engineer Pack",
    description: "A collection of many tools with some on this list heavily discounted or free for developers.",
    url: "https://www.aiengineerpack.com/",
    category: "Free Resources"
  }
];

export const categories: string[] = [
  ...new Set(tools.map(tool => tool.category))
].sort();
