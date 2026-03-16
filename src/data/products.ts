export interface Product {
  title: string
  description: string
  note?: string
  url: string
  urlLabel?: string
  secondaryUrl?: string
  secondaryLabel?: string
  githubUrl?: string
  images?: { src: string; alt: string; srcDark?: string }[]
  section: "projects" | "hosting"
}

export const products: Product[] = [
  {
    title: "Force Push Button",
    description:
      "VS Code extension that adds force-push buttons to Source Control. Supports multi-repo workspaces and activates only when there are changes to push.",
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
    section: "projects",
  },
  {
    title: "Poker Leaderboard",
    description: "Track poker performance and stats between friends. View profit and loss, session history, and rankings over time.",
    url: "https://poker.lbrose.dev",
    githubUrl: "https://github.com/LuisBrose/PokerLeaderboard",
    images: [
      { src: "/thumbnails/poker-leaderboard-1.png", alt: "Poker Leaderboard - Performance Visualization" },
      { src: "/thumbnails/poker-leaderboard-2.png", alt: "Poker Leaderboard - Leaderboard" },
      { src: "/thumbnails/poker-leaderboard-3.png", alt: "Poker Leaderboard - Session History" },
    ],
    section: "projects",
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
    section: "projects",
  },
  {
    title: "AIOStreams",
    description:
      "Self-hosted Stremio super-addon that aggregates multiple addons and debrid/usenet sources into one highly customisable stream hub.",
    note: "Access to my instance is password-protected feel free to reach out via contact@lbrose.dev for the password.",
    url: "https://aiostreams.lbrose.dev",
    githubUrl: "https://github.com/Viren070/AIOStreams",
    images: [
      { src: "/thumbnails/aiostreams-1.png", alt: "AIOStreams - Homepage" },
      { src: "/thumbnails/aiostreams-2.png", alt: "AIOStreams - Services" },
      { src: "/thumbnails/aiostreams-3.png", alt: "AIOStreams - Filters" },
    ],
    section: "hosting",
  },
]
