import { readMDXFrontmatter } from "../util/mdx";

export type Bio = {
  name: string;
  username: string;
  about: string;
  links: Array<{
    github: string;
    twitter: string;
    linkedin: string;
  }>;
};

export const fetchBio = async () => {
  const [bio] = await readMDXFrontmatter<Bio[]>("src/content/bio.mdx");
  return bio;
};
