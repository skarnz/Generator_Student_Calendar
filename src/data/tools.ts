
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
    logoUrl: "https://lovable.dev/img/lovable-logo.svg"
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
    logoUrl: "data:image/svg+xml,%3Csvg aria-label=%22Krea Logo%22 width=%2218%22 height=%2218%22 viewBox=%220 0 24 24%22 fill=%22white%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M8.34 1.266c1.766-.124 3.324 1.105 3.551 2.802.216 1.612-.887 3.171-2.545 3.536-.415.092-.877.066-1.317.122a4.63 4.63 0 0 0-2.748 1.34l-.008.004-.01-.001-.006-.005-.003-.009q0-.009.005-.016a.04.04 0 0 0 .007-.022 438 438 0 0 1-.01-4.541c.003-1.68 1.33-3.086 3.085-3.21%22/%3E%3Cpath d=%22M8.526 15.305c-2.247-.018-3.858-2.23-3.076-4.3a3.31 3.31 0 0 1 2.757-2.11c.384-.04.845-.03 1.215-.098 1.9-.353 3.368-1.806 3.665-3.657.066-.41.031-.9.128-1.335.449-2.016 2.759-3.147 4.699-2.236 1.011.476 1.69 1.374 1.857 2.447q.051.33.034.818c-.22 5.842-5.21 10.519-11.279 10.47m2.831.93a.04.04 0 0 1-.021-.02l-.001-.006.002-.006q0-.003.003-.004l.006-.003q3.458-.792 5.992-3.185.045-.042.083.007c.27.357.554.74.78 1.106a10.6 10.6 0 0 1 1.585 4.89q.037.53.023.819c-.084 1.705-1.51 3.08-3.31 3.09-1.592.01-2.992-1.077-3.294-2.597-.072-.36-.05-.858-.11-1.238q-.282-1.755-1.715-2.84zm-3.369 6.64c-1.353-.235-2.441-1.286-2.684-2.593a5 5 0 0 1-.05-.817V15.14q0-.021.016-.007c.884.786 1.814 1.266 3.028 1.346l.326.01c1.581.051 2.92 1.087 3.229 2.592.457 2.225-1.557 4.195-3.865 3.793%22/%3E%3C/svg%3E"
  },
  {
    name: "Cursor",
    description: "An AI coding platform that provides intelligent code suggestions and automations to speed up development.",
    url: "https://cursor.so/",
    category: "Coding Tool",
    logoUrl: "https://registry.npmmirror.com/@lobehub/icons-static-png/1.29.0/files/light/cursor.png"
  },
  {
    name: "ElevenLabs Text to Speech",
    description: "AI-powered text-to-speech platform that delivers high-quality, human-like voices in 32 languages.",
    url: "https://elevenlabs.io/",
    category: "AI Text to Speech",
    logoUrl: "https://www.aiengineerpack.com/favicon.ico"
  },
  {
    name: "ElevenLabs Scribe",
    description: "Advanced automatic speech recognition (ASR) model offering highly accurate transcription across 99 languages.",
    url: "https://elevenlabs.io/blog/meet-scribe",
    category: "AI Speech to Text",
    logoUrl: "https://www.aiengineerpack.com/favicon.ico"
  },
  {
    name: "Vizcom",
    description: "An AI tool for product design and prototyping, enabling 3D creation from images and text.",
    url: "https://vizcom.ai/",
    category: "3D Creation",
    logoUrl: "https://media.licdn.com/dms/image/v2/D4D0BAQHA1E_ZWgQ1ZA/company-logo_200_200/company-logo_200_200/0/1683214968324?e=2147483647&v=beta&t=wCNcFEq4DXJGkmd9N_BsR0gv3skMmlB1XUl4HJY45uU"
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
    logoUrl: "https://cdn.discordapp.com/icons/1338938704064020550/977ec18684b0fe18b4c75b9baf016d74.webp?size=160"
  },
  {
    name: "Lemonaide AI",
    description: "An AI-powered melody generator that creates high-quality audio and MIDI loops, offering flexibility for music producers.",
    url: "https://www.lemonaide.ai/",
    category: "Music Creation",
    logoUrl: "https://framerusercontent.com/images/QXneAEdTWwbDMh0kWh1l214IkI.svg"
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
    logoUrl: "https://media.licdn.com/dms/image/v2/D4D0BAQEGEKPKKLiNvA/company-logo_200_200/company-logo_200_200/0/1721090778302/exa_ai_logo?e=2147483647&v=beta&t=bNJAmBL2v359QkVTUgGTEbdBOqsnYSMaOuCtMDuG920"
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
    logoUrl: "https://pbs.twimg.com/profile_images/1884966723746435073/x0p8ngPD_400x400.jpg"
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
    logoUrl: "https://cdn.gamma.app/_app_static/images/gamma-logo-black-d6c729d8.svg"
  },
  {
    name: "Agency Agents Marketplace",
    description: "A platform offering over 500 vetted copilots, tools, and AI agents to assist startups and small businesses.",
    url: "https://marketplace.agen.cy/home",
    category: "Agents Marketplace",
    logoUrl: "https://pbs.twimg.com/profile_images/1837604284344807424/B7KYrv04_400x400.jpg"
  },
  {
    name: "Intercom",
    description: "Provides AI-driven customer service agents for professional chat support.",
    url: "https://intercom.com/",
    category: "Customer Service",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgA3wfwdJVSSQ3Hwjynwz_NsPUW1dkBW9YZg&s"
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
