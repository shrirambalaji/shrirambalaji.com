import { readMDXFrontmatter } from "../util/mdx";

export type Project = {
  title: string;
  name: string;
  description: string;
  link: string;
  image?: string;
  tags?: string[];
};

export const fetchProjects = async () => {
  return await readMDXFrontmatter<Project[]>("src/content/projects.mdx");
};
