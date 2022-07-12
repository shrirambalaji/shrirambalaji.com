import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

export const readMDXFrontmatter = async <T>(filePath: string) => {
  const source = fs
    .readFileSync(path.resolve(process.cwd(), filePath), "utf8")
    .toString();
  const { frontmatter } = await serialize(source, { parseFrontmatter: true });
  return frontmatter as unknown as T;
};
