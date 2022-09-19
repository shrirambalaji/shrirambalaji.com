import type { NextPage } from "next";
import { Avatar } from "../components/Avatar";
import { MicrosoftLogo } from "../components/icons";
import { PageContainer } from "../components/PageContainer";
import type { Bio, Experience } from "../data";
import { fetchBio, fetchExperience } from "../data";
import { ExperienceList } from "./../components/ExperienceList";

type HomePageProps = {
  experience: Experience[];
  bio: Bio;
};

const Home: NextPage<HomePageProps> = (props) => {
  const { experience, bio } = props;
  const [currentWorkplace] = experience;
  return (
    <PageContainer>
      <div className="flex  flex-col-reverse items-start md:flex-row">
        <section
          className="flex w-full flex-col gap-3 md:placeholder:pr-8"
          role={"contentinfo"}
        >
          <h1 className="ml-[-2px] text-3xl font-bold text-ghostindigo-900 dark:text-white md:text-5xl">
            {bio.name}
          </h1>
          <h2 className="text-md inline-flex items-center tracking-wide text-gray-800 dark:text-gray-300 md:text-xl">
            {currentWorkplace.title} at
            <span className="ml-2 inline-flex items-center gap-1.5 font-bold tracking-wide text-gray-800 dark:text-gray-300">
              {currentWorkplace.company === "Microsoft" && <MicrosoftLogo />}
            </span>
          </h2>
          <p className="text-md font-normal leading-7 tracking-wide text-gray-500 dark:text-gray-400 md:text-sm">
            {bio.about}
          </p>
        </section>
        <section className="">
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
  const experience = await fetchExperience();
  const bio = await fetchBio();
  return {
    props: {
      experience,
      bio,
    },
  };
}

export default Home;
