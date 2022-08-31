import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { PageContainer } from "../components/PageContainer";
import { readMDXFile } from "../util/mdx";
import Image from "next/future/image";

const components = {
  Image,
};

export default function Uses({ ...props }: MDXRemoteProps) {
  return (
    <PageContainer>
      <div className="prose prose-slate prose-h1:text-[1.25rem] prose-h1:font-bold prose-h1:text-black prose-a:text-gray-600  prose-img:rounded-lg prose-img:border-2 prose-img:border-solid  prose-img:border-blue-500  prose-img:shadow-3xl prose-img:shadow-blue-400 dark:prose-invert dark:prose-h1:text-ghostindigo-300 dark:prose-a:text-indigo-300  dark:prose-img:border-blue-500   dark:prose-img:shadow-blue-900">
        <MDXRemote
          compiledSource={props.compiledSource}
          components={components}
        />
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const { compiledSource } = await readMDXFile("src/content/uses.mdx");
  return { props: { compiledSource } };
}
