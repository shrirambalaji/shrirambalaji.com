import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { PageContainer } from "../components/PageContainer";
import { readMDXFile } from "../util/mdx";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const components = {
  YoutubeEmbed: LiteYouTubeEmbed,
};

// TODO: preload youtube embed iframe
export default function Talks({ ...props }: MDXRemoteProps) {
  return (
    <PageContainer>
      <div className="prose prose-slate prose-h2:mb-1 prose-h2:font-bold prose-h2:leading-10 prose-h2:tracking-normal prose-h2:text-black prose-a:text-ghostindigo-400 dark:prose-invert  dark:prose-h2:text-indigo-200  dark:prose-a:text-indigo-300 prose-h2:md:mb-4 prose-h2:md:text-2xl">
        <MDXRemote
          compiledSource={props.compiledSource}
          components={components}
        />
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const { compiledSource } = await readMDXFile("src/content/talks.mdx");
  return { props: { compiledSource } };
}
