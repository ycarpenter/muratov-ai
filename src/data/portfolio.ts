export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
export const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"

export const categories = ["All", "SaaS", "DTC", "Real Estate", "Event", "Content", "B2B"]
export const services = ["All", "AI video production", "Motion Design", "Video Editing"]

export type CaseItem = {
  id: string
  title: string
  client: string
  date: string
  category: string
  service: string[]
  format: "tall" | "wide" | "square"
  youtubeId: string
  thumbnail: string
  desc: string
  content: {
    vision: string
    execution: string
  }
}

export const cases: CaseItem[] = [
  {
    id: "1",
    title: "Explainer video for AI tool for EMS documentation",
    client: "TrySwitch",
    date: "10-Oct-2025 to 04-Nov-2025",
    category: "SaaS",
    service: ["Motion Design", "AI video production"],
    format: "wide",
    youtubeId: "voMfEtW0s68",
    thumbnail: "",
    desc: "Clear, professional explainer breaking down a complex healthcare AI tool.",
    content: {
      vision: "To communicate efficiency, compliance, and ease-of-use to medical professionals.",
      execution: "Created a clean, diagram-based motion graphic style using a trustworthy medical color palette.",
    },
  },

  {
    id: "2",
    title: "AI-generated motivational video for programmers",
    client: "AvoTechs",
    date: "24-Apr-2025 to 12-Jun-2025",
    category: "Content",
    service: ["AI video production"],
    format: "wide",
    youtubeId: "y_yynl64tX0",
    thumbnail: "",
    desc: "Cinematic, AI-crafted motivational piece aimed at the developer community.",
    content: {
      vision: "To inspire and resonate with software engineers through abstract, cyberpunk-inspired visual metaphors.",
      execution:
        "Stitched together Midjourney and Runway Gen-2 outputs, color-graded to a dark, neon aesthetic with epic sound design.",
    },
  },

  {
    id: "3",
    title: "Short AI Video Creating",
    client: "Onkar Gill",
    date: "29-Sep-2025 to 18-Jan-2026",
    category: "SaaS",
    service: ["AI video production", "Video Editing"],
    format: "tall",
    youtubeId: "6IolzCie1eQ",
    thumbnail: "",
    desc: "Bringing written scripts to life entirely through AI generative tools.",
    content: {
      vision:
        "To establish a fully synthetic production pipeline capable of turning text prompts into polished social videos.",
      execution:
        "Combined AI script-doctoring, synthetic voiceover, and generative video clips seamlessly edited together.",
    },
  },

  {
    id: "4",
    title: "Ai videos ads",
    client: "magick.house",
    date: "6-Oct-2025 to 28-Oct-2025",
    category: "DTC",
    service: ["AI video production"],
    format: "tall",
    youtubeId: "jr7zu96Jhfw",
    thumbnail: "",
    desc: "Direct-response advertising utilizing AI visuals to lower CPA.",
    content: {
      vision: "Testing highly creative, impossible-to-film concepts using AI to see what stops the scroll best.",
      execution: "Produced hyper-realistic, surreal product visuals that immediately capture attention.",
    },
  },

  {
    id: "5",
    title: "Animated video for Instagram and LinkedIn advertising",
    client: "DigitalGenius",
    date: "13-Jan-2025 to 25-Feb-2025",
    category: "B2B",
    service: ["Motion Design"],
    format: "tall",
    youtubeId: "5U_G8C3UifQ",
    thumbnail: "",
    desc: "Engaging animated advertisement tailored for professional networks.",
    content: {
      vision:
        "Translating complex value propositions into a clean, professional animation suitable for LinkedIn and Instagram.",
      execution:
        "Designed a sleek, corporate-friendly vector animation with smooth transitions and clear calls to action.",
    },
  },

  {
    id: "6",
    title: "Explainer video and comic-style AI video series - Ricky",
    client: "TrySwitch (Juan Montes)",
    date: "7-Nov-2025 to 18-Jan-2026",
    category: "Content",
    service: ["AI video production"],
    format: "wide",
    youtubeId: "jcK-e6DMI4o",
    thumbnail: "",
    desc: "A unique, comic-book inspired narrative series powered by AI.",
    content: {
      vision: "To build a recurring, recognizable character and visual style that audiences look forward to.",
      execution:
        "Generated consistent character designs via AI, animating them with a halftone comic-book overlay style.",
    },
  },

  {
    id: "7",
    title: "Video Creation from Audio for Facebook Ad",
    client: "Ervin Dhima",
    date: "28-Oct-2025",
    category: "DTC",
    service: ["AI video production", "Video Editing"],
    format: "tall",
    youtubeId: "E4nLr1leaZ4",
    thumbnail: "",
    desc: "Turning a raw voiceover track into a high-converting Facebook Ad.",
    content: {
      vision:
        "To source and edit high-quality stock and B-roll that perfectly matches the inflection and tone of the audio track.",
      execution:
        "Rigorous sourcing of visual assets, paired with dynamic captions to catch viewers watching without sound.",
    },
  },

  {
    id: "8",
    title: "Video for Triviat AI",
    client: "Triviat AI",
    date: "13-Mar-2025 to 24-Mar-2025",
    category: "SaaS",
    service: ["AI video production", "Motion Design"],
    format: "tall",
    youtubeId: "9qWPbYbKhrU",
    thumbnail: "",
    desc: "Promotional short-form content explaining the Triviat AI platform.",
    content: {
      vision:
        "Simplifying an AI product's features into an easily digestible and visually stimulating vertical format.",
      execution: "Used glassmorphism UI mockups combined with fast, engaging voiceover and kinetic text.",
    },
  },

  {
    id: "9",
    title: "AI Generated Video Ad for Linkedin",
    client: "Automators",
    date: "27-Jan-2025 to 14-Aug-2025",
    category: "SaaS",
    service: ["AI video production"],
    format: "tall",
    youtubeId: "v5PHvWJ5Tcc",
    thumbnail: "",
    desc: "AI-synthesized video advertisement targeted at B2B decision makers.",
    content: {
      vision:
        "Leveraging cutting-edge AI generation to showcase automation services in a futuristic, high-tech aesthetic.",
      execution:
        "Integrated AI-generated avatars and synthetic voiceovers with dynamic B-roll specific to the SaaS industry.",
    },
  },

  {
    id: "10",
    title: "Social Media Video for Instagram and TikTok",
    client: "Sam Habib",
    date: "10-Mar-2025 to 14-Apr-2025",
    category: "DTC",
    service: ["AI video production", "Motion Design"],
    format: "tall",
    youtubeId: "3Dup_O9X5XE",
    thumbnail: "",
    desc: "High-retention social media edit built around current platform trends.",
    content: {
      vision: "Creating a native-feeling piece of content that blends organically into the For You Page.",
      execution:
        "Applied aggressive jump-cutting, sound effect layering, and trending audio to ensure maximum viewer retention.",
    },
  },

  {
    id: "11",
    title: "Documentary style editing for high-retention YouTube channel",
    client: "Creative Capital",
    date: "7-May-2025 to 12-Sep-2025",
    category: "Content",
    service: ["Video Editing"],
    format: "wide",
    youtubeId: "C37Dfmco4xM",
    thumbnail: "",
    desc: "Long-form, narrative-driven editing designed for high watch-time.",
    content: {
      vision:
        "Applying Netflix-tier documentary pacing and storytelling to YouTube content to maximize average view duration.",
      execution: "Extensive use of J-cuts, L-cuts, archival footage sourcing, and emotional music scoring.",
    },
  },

  {
    id: "12",
    title: "Creative Video for Humorous Tech Marketing",
    client: "Koo Inc (Rami Friedman)",
    date: "28-May-2025 to 25-Sep-2025",
    category: "SaaS",
    service: ["Video Editing"],
    format: "tall",
    youtubeId: "hBctxtg6LsI",
    thumbnail: "",
    desc: "Comedy-driven marketing campaign to humanize a tech brand.",
    content: {
      vision: "To break the 'boring corporate' stereotype through witty, perfectly timed comedic editing.",
      execution: "Focused on comedic timing, awkward zooms, and deadpan sound effects to enhance the script's humor.",
    },
  },

  {
    id: "13",
    title: "Brut marketing",
    client: "Confidential",
    date: "2025",
    category: "Content",
    service: ["Video Editing"],
    format: "tall",
    youtubeId: "dRQoeSmDNOw",
    thumbnail: "",
    desc: "Raw, authentic marketing format inspired by the Brut video style.",
    content: {
      vision: "To create a highly shareable, news-style informational video using bold typography and rapid pacing.",
      execution:
        "Combined striking yellow/white text overlays with high-contrast footage to maximize readability on mobile.",
    },
  },

  {
    id: "14",
    title: "Facebook Ad Video Editor / UGC Compilation",
    client: "HBR Media Inc / Vaisman Group Inc (Bo Yenom)",
    date: "22-Jan-2026",
    category: "DTC",
    service: ["Video Editing"],
    format: "tall",
    youtubeId: "HTZniPkMVxg",
    thumbnail: "",
    desc: "Mashup of User Generated Content optimized for paid social.",
    content: {
      vision: "Creating trust through volume. Compiling multiple positive reviews into a fast, persuasive ad.",
      execution:
        "Spliced the best hooks from various creators, leveled the audio, and added a unifying brand graphics package.",
    },
  },
  {
    id: "15",
    title: "Short motion graphics video",
    client: "Division Sixty Five LLC FZ",
    date: "12-Nov-2024 to 19-Dec-2024",
    category: "DTC",
    service: ["Motion Design"],
    format: "tall",
    youtubeId: "v5PHvWJ5Tcc",
    thumbnail: "",
    desc: "High-paced vertical motion graphics optimized for social media.",
    content: {
      vision: "To deliver a fast-paced, visually engaging sequence optimized for vertical scrolling feeds.",
      execution:
        "Utilized advanced motion tracking, 3D elements, and kinetic typography to capture attention in the first 3 seconds.",
    },
  },
]
