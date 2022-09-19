import { GradientDropShadow } from "../components/GradientDropShadow";
import { PageContainer } from "../components/PageContainer";
import { fetchBio } from "../data";
import { fetchProjects, Project } from "../data/projects";
import Image from "next/future/image";

type ProjectPageProps = {
  projects: Project[];
};

export default function Projects(props: ProjectPageProps) {
  const { projects } = props;
  return (
    <PageContainer>
      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects &&
          projects.map((item) => {
            return (
              <a
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-ghostindigo-300/50 shadow-sm transition duration-300 hover:border-indigo-300  hover:shadow-2.5xl hover:shadow-indigo-300/50  dark:border-ghostindigo-700 hover:dark:border-indigo-300 dark:hover:shadow-ghostindigo-500 "
                href={item.link}
                key={item.link}
                tabIndex={0}
              >
                <div className=" flex h-full flex-col bg-white dark:bg-ghostindigo-900 ">
                  <Image
                    alt={item.title}
                    className="w-full"
                    src={item.image as string}
                    height={127}
                    width={243}
                    priority
                  />
                  <div className="flex-1 px-5 py-5">
                    <a
                      href={item.link}
                      className="inline-block text-xl font-semibold leading-tight no-underline dark:text-ghostindigo-100 "
                    >
                      <span className="leading-5">{item.title}</span>
                    </a>
                    <p className="pt-3 text-sm leading-7 text-ghostindigo-500 dark:text-ghostindigo-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const projects = await fetchProjects();
  return {
    props: {
      projects,
    },
  };
}
