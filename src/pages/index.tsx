import type { NextPage } from "next";
import Image from "next/future/image";
import { Avatar } from "../components/Avatar";
import { GradientDropShadow } from "../components/GradientDropShadow";
import { MicrosoftLogo } from "../components/icons";
import { PageContainer } from "../components/PageContainer";
import { readMDXFrontmatter } from "../util/mdx";

type Experience = {
  company: string;
  duration: string;
  description: string;
  link: string;
  title: string;
  image?: string;
  darkModeInvert?: boolean;
};

type HomePageProps = {
  experience: Experience[];
  bio: {
    name: string;
    about: string;
  };
};

const ExperienceList = ({ items }: { items: Experience[] }) => {
  return (
    <ul className="mb-3 flex w-full flex-col gap-5">
      {items.map(
        ({
          company,
          duration,
          description,
          link,
          title,
          image,
          darkModeInvert,
        }) => {
          return (
            <li key={company} className="group relative cursor-pointer">
              <GradientDropShadow />
              <div className="relative flex flex-col items-center rounded-lg border bg-white px-3 py-1 shadow-sm dark:border-ghostindigo-800 dark:bg-ghostindigo-900 md:flex-row md:py-4 md:px-6">
                <Image
                  priority={true}
                  className={`w-50 mx-4 mb-2 mt-5 self-start object-cover md:my-6 md:mx-2 ${
                    darkModeInvert ? "dark:invert" : "filter-none"
                  }`}
                  src={image as string}
                  width={32}
                  height={32}
                  alt={company}
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <a href={link} className="underline-offset-2 hover:underline">
                    <h5 className="text-2xl font-semibold text-ghostindigo-900 dark:text-white">
                      {company}
                    </h5>
                  </a>
                  <h6 className="text-md mb-2 text-ghostindigo-800 dark:text-ghostindigo-400 md:text-sm">
                    {title}
                  </h6>
                  <p className="mb-3 font-normal leading-8 text-ghostindigo-700 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

const Home: NextPage<HomePageProps> = (props) => {
  const { experience, bio } = props;
  const [currentWorkplace] = experience;
  return (
    <PageContainer>
      <div className="flex  flex-col-reverse items-start md:flex-row">
        <section className="mt-7 flex w-full flex-col gap-3 md:placeholder:pr-8">
          <h1 className="ml-[-2px] text-3xl font-bold text-ghostindigo-900 dark:text-white md:text-5xl">
            {bio.name}
          </h1>
          <h2 className="inline-flex items-center text-lg tracking-wide text-gray-800 dark:text-gray-300 md:text-xl">
            {currentWorkplace.title} at
            <span className="ml-2 inline-flex items-center gap-1.5 font-bold tracking-wide text-gray-800 dark:text-gray-300">
              {currentWorkplace.company === "Microsoft" && <MicrosoftLogo />}
            </span>
          </h2>
          <p className="text-lg tracking-wide text-gray-500 dark:text-gray-400 md:text-sm">
            {bio.about}
          </p>
        </section>
        <section className="mt-7">
          <Avatar className="w-[125px] shadow-3xl shadow-ghostindigo-100 dark:shadow-ghostindigo-700 md:w-[150px]" />
        </section>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold uppercase tracking-widest dark:text-ghostindigo-400">
          Experience
        </h3>
        <ExperienceList items={experience} />
      </div>
    </PageContainer>
  );
};

export async function getStaticProps() {
  const experience = await readMDXFrontmatter<Experience[]>(
    "src/content/work.mdx"
  );

  return {
    props: {
      experience,
      bio: {
        name: "Shriram Balaji",
        about:
          "Dabbling with things on the interwebs and striving for software craftsmanship.",
      },
    },
  };
}

export default Home;
