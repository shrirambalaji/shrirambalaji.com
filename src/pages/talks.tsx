import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { PageContainer } from "../components/PageContainer";
import { readMDXFile } from "../util/mdx";

export default function Talks({ ...props }: MDXRemoteProps) {
  return (
    <PageContainer>
      <div className="prose prose-slate prose-h2:text-[1.5rem] prose-h2:font-bold prose-h2:tracking-normal prose-h2:text-black  prose-a:text-ghostindigo-400  dark:prose-invert dark:prose-h2:text-indigo-200 dark:prose-a:text-indigo-300">
        <MDXRemote compiledSource={props.compiledSource} />
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const { compiledSource } = await readMDXFile("src/content/talks.mdx");
  return { props: { compiledSource } };
}
