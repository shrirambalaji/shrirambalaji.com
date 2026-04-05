import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const home = defineCollection({
  loader: glob({ base: "./src/content/home", pattern: "**/*.mdx" }),
  schema: z.object({}),
});

const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "**/*.json" }),
  schema: z.object({
    meta: z.object({
      title: z.string(),
      description: z.string(),
      url: z.url(),
    }),
    nav: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
        external: z.boolean().optional(),
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
    hardware: z.array(z.string()),
    apps: z.array(z.string()),
    typography: z.array(z.string()),
    extensions: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.string(),
    tags: z.array(z.string()),
    note: z.string().optional(),
    icon: z.string().optional(),
    kind: z.enum(["project", "oss"]),
    order: z.number().int().positive(),
  }),
});

const talks = defineCollection({
  loader: glob({ base: "./src/content/talks", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    description: z.string(),
    actions: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
        icon: z.enum(["watch", "slides"]),
      })
    ),
    order: z.number().int().positive(),
  }),
});

export const collections = {
  home,
  site,
  uses,
  projects,
  talks,
};
