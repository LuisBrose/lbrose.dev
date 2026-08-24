export interface Product {
  title: string
  description: string
  note?: string
  url?: string
  urlLabel?: string
  urlIcon?: "download"
  secondaryUrl?: string
  secondaryLabel?: string
  githubUrl?: string
  images?: { src: string; alt: string; srcDark?: string }[]
  projectType?: "personal" | "uni"
}

export const products: Product[] = [
  {
    title: "HugoSMP Market",
    description:
      "Community platform for HugoSMP, Germany's largest Minecraft server. Tracks auction house and buy order data in real time, processing 30+ million market records with trends, arbitrage insights, and price alerts. Used by 3,800+ registered players.",
    url: "https://hugosmp-market.net",
    images: [
      { src: "/thumbnails/hugomarket-1.png", srcDark: "/thumbnails/hugomarket-1-dark.png", alt: "HugoSMP Market - Homepage" },
      { src: "/thumbnails/hugomarket-2.png", srcDark: "/thumbnails/hugomarket-2-dark.png", alt: "HugoSMP Market - Price Trends" },
      { src: "/thumbnails/hugomarket-3.png", srcDark: "/thumbnails/hugomarket-3-dark.png", alt: "HugoSMP Market - Live Market" },
      { src: "/thumbnails/hugomarket-4.png", srcDark: "/thumbnails/hugomarket-4-dark.png", alt: "HugoSMP Market - Arbitrage" },
      { src: "/thumbnails/hugomarket-5.png", srcDark: "/thumbnails/hugomarket-5-dark.png", alt: "HugoSMP Market - Schematics" },
      { src: "/thumbnails/hugomarket-6.png", srcDark: "/thumbnails/hugomarket-6-dark.png", alt: "HugoSMP Market - RTP Tracker" },
      { src: "/thumbnails/hugomarket-7.png", srcDark: "/thumbnails/hugomarket-7-dark.png", alt: "HugoSMP Market - Server Top" },
      { src: "/thumbnails/hugomarket-8.png", srcDark: "/thumbnails/hugomarket-8-dark.png", alt: "HugoSMP Market - Spawner Deals" },
      { src: "/thumbnails/hugomarket-9.png", srcDark: "/thumbnails/hugomarket-9-dark.png", alt: "HugoSMP Market - Maparts" },
      { src: "/thumbnails/hugomarket-10.png", srcDark: "/thumbnails/hugomarket-10-dark.png", alt: "HugoSMP Market - Portfolio" },
      { src: "/thumbnails/hugomarket-11.png", srcDark: "/thumbnails/hugomarket-11-dark.png", alt: "HugoSMP Market - Account" },
    ],
    projectType: "personal",
  },
  {
    title: "Force Push Button",
    description:
      "VS Code extension that adds force-push buttons to Source Control. Supports multi-repo workspaces and activates only when there are changes to push. 800+ installs across VS Marketplace and Open VSX.",
    url: "https://marketplace.visualstudio.com/items?itemName=LuisBrose.force-push-button",
    urlLabel: "VS Marketplace",
    secondaryUrl: "https://open-vsx.org/extension/luisbrose/force-push-button",
    secondaryLabel: "Open VSX",
    githubUrl: "https://github.com/LuisBrose/force-push-button",
    images: [
      { src: "/thumbnails/force-push-button-1.png", alt: "Force Push Button VS Code Extension - Showcase" },
      { src: "/thumbnails/force-push-button-2.png", alt: "Force Push Button VS Code Extension - Store Page" },
      { src: "/thumbnails/force-push-button-3.png", alt: "Force Push Button VS Code Extension - Settings" },
    ],
    projectType: "personal",
  },
  {
    title: "MCP Chatbot",
    description:
      "Educational application for visualizing communication between LLMs and MCP servers. Explore how LLMs discover and call tools, with detailed token analysis.",
    note: "Requires a GitLab account from Stralsund University of Applied Sciences. Uses the university's vLLM instance to access internal models and visualize logs.",
    url: "https://laboration.hochschule-stralsund.de",
    images: [
      { src: "/thumbnails/mcp-chatbot-1.png", srcDark: "/thumbnails/mcp-chatbot-1-dark.png", alt: "MCP Chatbot - Overview" },
      { src: "/thumbnails/mcp-chatbot-2.png", srcDark: "/thumbnails/mcp-chatbot-2-dark.png", alt: "MCP Chatbot - Tool Discovery" },
      { src: "/thumbnails/mcp-chatbot-3.png", srcDark: "/thumbnails/mcp-chatbot-3-dark.png", alt: "MCP Chatbot - Tool Calls" },
      { src: "/thumbnails/mcp-chatbot-4.png", srcDark: "/thumbnails/mcp-chatbot-4-dark.png", alt: "MCP Chatbot - Token Analysis" },
      { src: "/thumbnails/mcp-chatbot-5.png", srcDark: "/thumbnails/mcp-chatbot-5-dark.png", alt: "MCP Chatbot - Chat History" },
      { src: "/thumbnails/mcp-chatbot-6.png", srcDark: "/thumbnails/mcp-chatbot-6-dark.png", alt: "MCP Chatbot - System Messages" },
    ],
    projectType: "uni",
  },
  {
    title: "Multiplayer Survival Game",
    description:
      "Multiplayer survival game with a dedicated server system, base building, procedural generation, farming, and enemy camps.",
    url: "https://github.com/LuisBrose/projekt-atze/releases/download/v1.0.0/ProjektAtze.exe",
    urlLabel: "Download",
    urlIcon: "download",
    githubUrl: "https://github.com/LuisBrose/projekt-atze",
    images: [
      { src: "/thumbnails/project-atze-1.png", alt: "Multiplayer Survival Game - Landscape" },
      { src: "/thumbnails/project-atze-2.png", alt: "Multiplayer Survival Game - Base Building" },
      { src: "/thumbnails/project-atze-3.png", alt: "Multiplayer Survival Game - Environment" },
      { src: "/thumbnails/project-atze-4.png", alt: "Multiplayer Survival Game - Settlement" },
      { src: "/thumbnails/project-atze-5.png", alt: "Multiplayer Survival Game - Terrain" },
      { src: "/thumbnails/project-atze-6.png", alt: "Multiplayer Survival Game - Night Scene" },
      { src: "/thumbnails/project-atze-7.png", alt: "Multiplayer Survival Game - Combat" },
      { src: "/thumbnails/project-atze-8.png", alt: "Multiplayer Survival Game - Base Interior" },
      { src: "/thumbnails/project-atze-9.png", alt: "Multiplayer Survival Game - New Screenshot" },
    ],
    projectType: "uni",
  },
]
