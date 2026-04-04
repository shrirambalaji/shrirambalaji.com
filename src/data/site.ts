export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const siteMeta = {
  title: "Shriram Balaji",
  description:
    "Senior software engineer building distributed systems, developer tools, and polished side projects.",
  url: "https://shrirambalaji.com",
};

export const navItems: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/#talks", label: "Talks" },
  { href: "/uses", label: "Uses" },
];

export const socialLinks = [
  { href: "https://github.com/shrirambalaji", label: "GitHub" },
  { href: "https://x.com/shrirambalaji", label: "X" },
  { href: "https://www.linkedin.com/in/shrirambalaji/", label: "LinkedIn" },
  { href: "mailto:hello@shrirambalaji.com", label: "Email" },
];

export type Project = {
  title: string;
  description: string;
  href: string;
  tags: string[];
  note?: string;
  icon?: string;
  kind: "project" | "oss";
};

export const projects: Project[] = [
  {
    title: "linkerland",
    description:
      "a tiny workbench for parsing, visualizing & analyzing linker map files.",
    href: "https://github.com/shrirambalaji/linkerland",
    tags: ["Rust", "Linkers"],
    icon: "/images/projects/linkerland-mark.svg",
    kind: "project",
  },
  {
    title: "gossip-protocols",
    description:
      "Experiments with gossip-style communication and distributed protocol behavior in Rust.",
    href: "https://github.com/shrirambalaji/gossip-protocols",
    tags: ["Rust", "Distributed Systems"],
    kind: "project",
  },
  {
    title: "maelstrom-node",
    description:
      "A Maelstrom-based distributed systems workbench built on top of a forked Rust node implementation.",
    href: "https://github.com/shrirambalaji/maelstrom-node",
    tags: ["Rust", "Distributed Systems", "Maelstrom"],
    kind: "project",
  },
  {
    title: "Rust Compiler",
    description:
      "Contributed std_features support for the Rust compiler bootstrap flow, which shipped in Rust 1.83.",
    href: "https://github.com/rust-lang/rust",
    tags: ["Open source", "Rust", "Compiler"],
    kind: "oss",
  },
  {
    title: "Excalidraw",
    description:
      "Contributed to the hand-drawn virtual whiteboard used for diagramming and collaborative sketching.",
    href: "https://github.com/excalidraw/excalidraw/pulls?q=is%3Apr+author%3Ashrirambalaji",
    tags: ["Open source", "TypeScript", "React"],
    kind: "oss",
  },
  {
    title: "WRY",
    description:
      "Contributed to the cross-platform WebView rendering library used across desktop applications.",
    href: "https://github.com/tauri-apps/wry/pulls?q=is%3Apr+author%3Ashrirambalaji",
    tags: ["Open source", "Rust"],
    kind: "oss",
  },
  {
    title: "Advent of Code in Rust",
    description:
      "My Advent of Code solutions from 2020, written while learning Rust more seriously.",
    href: "https://github.com/shrirambalaji/rust-advent-of-code-2020",
    tags: ["Rust"],
    kind: "project",
  },
  {
    title: "hex-rgb",
    description:
      "A small Rust CLI for converting hexadecimal color values to RGB.",
    href: "https://github.com/shrirambalaji/cli-hex-rgb",
    tags: ["Rust", "CLI"],
    kind: "project",
  },
  {
    title: "netlify-rusty-bunny",
    description: "A smart-bookmark experiment built with Rust and Netlify.",
    href: "https://github.com/shrirambalaji/netlify-rusty-bunny",
    tags: ["Rust", "Web"],
    kind: "project",
  },
  {
    title: "Cast Bucket",
    description:
      "An unfinished experiment in building a podcast app with a universal React Native stack.",
    href: "https://github.com/cast-bucket/cast-bucket",
    tags: ["React Native", "TypeScript"],
    note: "Unfinished experiment",
    kind: "project",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.kind === "project"
);
export const openSourceContributions = projects.filter(
  (project) => project.kind === "oss"
);

export type Talk = {
  title: string;
  event: string;
  description: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export const talks: Talk[] = [
  {
    title: "Rumour has it: Gossip Protocols for Eventual Consistency",
    event: "Rootconf 2025",
    description:
      "An introduction to gossip protocols and how eventual consistency emerges from probabilistic communication.",
    href: "https://www.youtube.com/watch?v=gHlwPfWzseo",
  },
  {
    title: "Rust Unlinked",
    event: "Rust Tokyo 2024",
    description:
      "A journey through the rust compiler, symbol resolution, linkers, static libraries, and the ELF format.",
    href: "https://www.youtube.com/watch?v=I0JvqbRCI2U",
    secondaryHref: "/slides/rust-unlinked.pdf",
    secondaryLabel: "Slides",
  },
  {
    title: "Rust Unlinked",
    event: "Conf42 Rustlang 2024",
    description:
      "A second run of the linker talk, focused on how linking works in Rust programs on Unix-like systems.",
    href: "https://www.youtube.com/watch?v=2xs6eGgGvog",
  },
  {
    title: "Concurrent React and 3D",
    event: "React Day Bangalore 2022",
    description:
      "An introduction to the building blocks of 3D, WebGL, react-three-fiber, and React 18 concurrency.",
    href: "https://www.youtube.com/watch?v=1fF_socjZNU",
  },
];

export const recentTalks = talks.filter(
  (talk, index, allTalks) =>
    index === allTalks.findIndex((entry) => entry.title === talk.title)
);

export const uses = {
  hardware: [
    "AirPods Pro (2nd generation)",
    "Audio-Technica ATR2100x USB microphone",
    "Keychron K4 with hot-swappable Gateron Red switches",
    "LG 27-inch 4K UHD monitor",
    "Flowlyf wooden monitor arm",
    "Logitech Brio 500 webcam",
    "Logitech MX Master 3S",
    "MacBook Pro 14-inch (M1 Pro, 16GB RAM, 512GB SSD)",
  ],
  apps: [
    "Discord",
    "Edge for work",
    "Figma",
    "Ghostty with fish",
    "Helium for personal browsing",
    "Helix for quick terminal edits",
    "OBS Studio",
    "Obsidian",
    "OrbStack",
    "Raycast",
    "Spotify",
    "Visual Studio Code",
  ],
  typography: [
    "Inter for sans-serif UI and body text",
    "JetBrains Mono for code and monospace UI details",
    "DM Serif Display for expressive titles when needed",
  ],
  extensions: [
    "Better Comments",
    "Fluent Product Icons",
    "GitLens",
    "Symbols",
    "TabOut",
    "VSCode Neovim",
  ],
};
