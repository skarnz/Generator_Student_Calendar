
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
    logoUrl: "https://ai-training-uploads.s3.us-west-2.amazonaws.com/krea+logo.png"
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
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhiHGLIFhp21SIEtC3WBIGERC6rBtdFl36zQ&s"
  },
  {
    name: "ElevenLabs Scribe",
    description: "Advanced automatic speech recognition (ASR) model offering highly accurate transcription across 99 languages.",
    url: "https://elevenlabs.io/blog/meet-scribe",
    category: "AI Speech to Text",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhiHGLIFhp21SIEtC3WBIGERC6rBtdFl36zQ&s"
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
    logoUrl: "https://media.licdn.com/dms/image/v2/D4E0BAQHQQQfzzZbKaQ/company-logo_200_200/company-logo_200_200/0/1690288445177/lemonaid_music_logo?e=2147483647&v=beta&t=Nw_a__HyT5veD29sRMn68cBJhelOLExP7wKXEd-B0Tk"
  },
  {
    name: "Suno",
    description: "An AI platform for music generation and composition.",
    url: "https://suno.ai/",
    category: "Music Creation",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY0QydKYbLgL7uA9tsz0ll-2XpyA_yJPWIOQ&s"
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
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhiHGLIFhp21SIEtC3WBIGERC6rBtdFl36zQ&s"
  }
];

export const categories: string[] = [
  ...new Set(tools.map(tool => tool.category))
].sort();
