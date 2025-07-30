import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { PageContainer } from "../components/PageContainer";
import { readMDXFile } from "../util/mdx";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

const components = {
  YoutubeEmbed: LiteYouTubeEmbed,
};

export default function Talks({ ...props }: MDXRemoteProps) {
  return (
    <PageContainer>
      <div className="prose prose-slate prose-h1:text-xl prose-h1:font-semibold prose-h1:font-sans prose-h1:tracking-normal prose-h1:text-ghostindigo-800 prose-h2:mb-1  prose-h2:text-xl prose-h2:tracking-normal prose-h2:font-semibold prose-h2:leading-10 prose-h3:text-ghostindigo-800 prose-a:text-ghostindigo-400 dark:prose-invert dark:prose-h1:text-white dark:prose-h3:text-indigo-200  dark:prose-a:text-indigo-300 prose-h2:md:mb-4 prose-h2:md:text-xl prose-h3:md:text-lg">
        <MDXRemote
          {...props}
          components={components}
        />
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const mdxSource = await readMDXFile("src/content/talks.mdx");
  return { props: mdxSource };
}
