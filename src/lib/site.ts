import { getCollection, getEntry, type CollectionEntry } from "astro:content";

const siteEntry = await getEntry("site", "config");
const usesEntry = await getEntry("uses", "setup");

if (!siteEntry) {
  throw new Error("Missing site config content entry.");
}

if (!usesEntry) {
  throw new Error("Missing uses content entry.");
}

type SiteSettings = CollectionEntry<"site">["data"];
export type NavItem = SiteSettings["nav"][number];
export type SocialLink = SiteSettings["social"][number];
export type SiteMeta = SiteSettings["meta"];
type ProjectEntry = CollectionEntry<"projects">;
type TalkEntry = CollectionEntry<"talks">;
export type Project = ProjectEntry["data"] & { id: ProjectEntry["id"] };
export type Talk = TalkEntry["data"] & { id: TalkEntry["id"] };
export type Uses = CollectionEntry<"uses">["data"];

export const projects: Project[] = (await getCollection("projects"))
  .sort((left: ProjectEntry, right: ProjectEntry) => {
    return left.data.order - right.data.order;
  })
  .map(({ id, data }: ProjectEntry): Project => ({ id, ...data }));

export const talks: Talk[] = (await getCollection("talks"))
  .sort((left: TalkEntry, right: TalkEntry) => {
    return left.data.order - right.data.order;
  })
  .map(({ id, data }: TalkEntry): Talk => ({ id, ...data }));

export const siteSettings = siteEntry.data;
export const siteMeta = siteSettings.meta;
export const navItems = siteSettings.nav;
export const socialLinks = siteSettings.social;

export const featuredProjects = projects.filter(
  (project: Project) => project.kind === "project"
);
export const openSourceContributions = projects.filter(
  (project: Project) => project.kind === "oss"
);

export const recentTalks = talks.filter(
  (talk: Talk, index: number, allTalks: Talk[]) =>
    index === allTalks.findIndex((entry) => entry.title === talk.title)
);

export const uses = usesEntry.data;
