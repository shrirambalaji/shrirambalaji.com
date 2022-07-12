import type { NextPage } from "next";
import Image from "next/future/image";
import { Avatar } from "../components/Avatar";
import { GradientDropShadow } from "../components/GradientDropShadow";
import { MicrosoftLogo } from "../components/icons";
import { readMDXFrontmatter } from "../util/mdx";

type Work = {
  company: string;
  duration: string;
  description: string;
  link: string;
  title: string;
  image?: string;
  darkModeInvert?: boolean;
};

type HomePageProps = {
  work: Work[];
};

const Home: NextPage<HomePageProps> = (props) => {
  const { work } = props;

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-center gap-10 p-0 md:pl-4">
      <div className="flex flex-col-reverse items-start md:flex-row">
        <section className="flex w-full flex-col gap-2.5 pr-8">
          <h1 className="ml-[-2px] text-3xl font-bold text-ghostindigo-900 dark:text-white md:text-5xl">
            Shriram Balaji
          </h1>
          <h2 className="inline-flex items-center tracking-wide text-gray-800 dark:text-gray-300 md:text-xl">
            Software Engineer II at
            <span className="ml-2 inline-flex items-center gap-1.5 font-bold tracking-wide text-gray-800 dark:text-gray-300">
              <MicrosoftLogo />
            </span>
          </h2>
          <p className="tracking-wide text-gray-500 dark:text-gray-400">
            Dabbling with things on the interwebs and striving for software
            craftsmanship.
          </p>
        </section>
        <section className="z-10 my-7 md:my-0">
          <Avatar className="w-[125px] shadow-3xl shadow-ghostindigo-100 dark:shadow-ghostindigo-700 md:w-[150px] " />
        </section>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold uppercase tracking-widest dark:text-ghostindigo-400">
          Experience
        </h3>
        <ul className="mb-3 flex w-full flex-col gap-5">
          {work.map(
            ({
              company,
              duration,
              description,
              link,
              title,
              image,
              darkModeInvert,
            }) => {
              const size = 32;
              return (
                <li key={company} className="group relative cursor-pointer">
                  <GradientDropShadow />
                  <div className="relative flex flex-col items-center rounded-lg border bg-white px-3 py-1 shadow-sm dark:border-ghostindigo-800 dark:bg-ghostindigo-900 md:flex-row">
                    <Image
                      className={`w-50 mx-4 mb-2 mt-5 self-start object-cover md:my-6 md:mx-2 ${
                        darkModeInvert ? "dark:invert" : "filter-none"
                      }`}
                      src={image as string}
                      width={size}
                      height={size}
                      alt={company}
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <a
                        href={link}
                        className="underline-offset-2 hover:underline"
                      >
                        <h5 className="text-xl font-semibold text-ghostindigo-900 dark:text-white">
                          {company}
                        </h5>
                      </a>
                      <h6 className="mb-2 text-sm text-ghostindigo-800 dark:text-ghostindigo-400">
                        {title}
                      </h6>
                      <p className="mb-3 font-normal leading-7 text-ghostindigo-700 dark:text-gray-400">
                        {description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const work = await readMDXFrontmatter<Work[]>("content/work.mdx");

  return {
    props: {
      work,
    },
  };
}

export default Home;
