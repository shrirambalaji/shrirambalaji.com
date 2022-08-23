import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { PageContainer } from "../components/PageContainer";
import { readMDXFile } from "../util/mdx";

export default function Uses({ ...props }: MDXRemoteProps) {
  return (
    <PageContainer>
      <div className="prose prose-slate prose-h1:text-[1.25rem] prose-h1:font-bold prose-h1:text-black prose-a:text-gray-600  dark:prose-invert dark:prose-h1:text-ghostindigo-300 dark:prose-a:text-indigo-300">
        <MDXRemote compiledSource={props.compiledSource} />
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const { compiledSource } = await readMDXFile("src/content/uses.mdx");
  return { props: { compiledSource } };
}
