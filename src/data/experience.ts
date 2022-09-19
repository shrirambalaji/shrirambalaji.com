import { readMDXFrontmatter } from "../util/mdx";

export type Experience = {
  company: string;
  duration: string;
  description: string;
  link: string;
  title: string;
  image?: string;
  darkModeInvert?: boolean;
};

export const fetchExperience = async () => {
  const experience = await readMDXFrontmatter<Experience[]>(
    "src/content/work.mdx"
  );

  return experience;
};
