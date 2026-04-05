import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const home = defineCollection({
  loader: glob({ base: "./src/content/home", pattern: "**/*.mdx" }),
  schema: z.object({}),
});

const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "**/*.json" }),
  schema: z.object({
    meta: z.object({
      description: z.string(),
      title: z.string(),
      url: z.url(),
    }),
    nav: z.array(
      z.object({
        external: z.boolean().optional(),
        href: z.string(),
        label: z.string(),
      })
    ),
    social: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
      })
    ),
  }),
});

const uses = defineCollection({
  loader: glob({ base: "./src/content/uses", pattern: "**/*.json" }),
  schema: z.object({
    apps: z.array(z.string()),
    extensions: z.array(z.string()),
    hardware: z.array(z.string()),
    typography: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.json" }),
  schema: z.object({
    description: z.string(),
    href: z.string(),
    icon: z.string().optional(),
    kind: z.enum(["project", "oss"]),
    note: z.string().optional(),
    order: z.number().int().positive(),
    tags: z.array(z.string()),
    title: z.string(),
  }),
});

const talks = defineCollection({
  loader: glob({ base: "./src/content/talks", pattern: "**/*.json" }),
  schema: z.object({
    actions: z.array(
      z.object({
        href: z.string(),
        icon: z.enum(["watch", "slides"]),
        label: z.string(),
      })
    ),
    description: z.string(),
    event: z.string(),
    order: z.number().int().positive(),
    title: z.string(),
  }),
});

export const collections = {
  home,
  projects,
  site,
  talks,
  uses,
};
