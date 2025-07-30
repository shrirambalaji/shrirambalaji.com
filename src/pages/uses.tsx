import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { PageContainer } from "../components/PageContainer";
import { readMDXFile } from "../util/mdx";
import Image from "next/image";
import { getPlaiceholder, IGetPlaiceholderReturn } from "plaiceholder";

interface ImageProps extends Partial<IGetPlaiceholderReturn> {
  blurDataURL: string;
}

type UsesPageProps = MDXRemoteProps & { imageProps: ImageProps };
export default function Uses(props: UsesPageProps) {
  const { imageProps } = props;
  const components = {
    Image: (props: any) => <Image {...imageProps} {...props} />,
  };

  return (
    <PageContainer>
      <div className="prose prose-slate prose-h1:text-xl prose-h1:font-semibold prose-h1:font-sans prose-h1:tracking-normal prose-h1:text-ghostindigo-800 prose-a:text-ghostindigo-800  prose-img:rounded-lg prose-img:border-2 prose-img:border-solid  prose-img:border-blue-500  prose-img:shadow-3xl prose-img:shadow-blue-400 dark:prose-invert dark:prose-h1:text-white dark:prose-a:text-indigo-300 dark:prose-img:border-blue-500   dark:prose-img:shadow-blue-900">
        <MDXRemote
          {...props}
          components={components}
        />
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const { base64, img } = await getPlaiceholder("/images/workstation.png");
  const mdxSource = await readMDXFile("src/content/uses.mdx");
  return {
    props: {
      ...mdxSource,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
}
