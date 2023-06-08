import Image from "next/image";
import { PageContainer } from "../components/PageContainer";
import { fetchProjects, Project } from "../data/projects";

type ProjectPageProps = {
  projects: Project[];
};

const tagStyleMap: Record<string, string> = {
  oss: `bg-gray-100 text-gray-800 dark:bg-gray-200/10 dark:text-gray-200`,
  android: `bg-emerald-100 text-emerald-800 dark:bg-emerald-200/10 dark:text-emerald-200`,
  rust: `bg-orange-100 text-orange-800 dark:bg-orange-200/10 dark:text-orange-200`,
  java: `bg-green-100 text-green-800 dark:bg-green-200/10 dark:text-green-200`,
  typescript: `bg-blue-100 text-blue-800 dark:bg-blue-200/10 dark:text-blue-200`,
  react: `bg-sky-100 text-sky-800 dark:bg-sky-200/10 dark:text-sky-200`,
  "react-native": `bg-sky-100 text-sky-800 dark:bg-sky-200/10 dark:text-sky-200`,
};

const Tags = ({ items }: { items: string[] }) => {
  return (
    <>
      {items?.map((tag: string) => {
        const tagStyle =
          tagStyleMap[tag] ??
          `bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800`;

        return (
          <li
            key={tag}
            className={`mr-2 rounded px-2.5 py-0.5 text-sm font-medium tracking-wide ${tagStyle} inline-flex select-none items-center`}
          >
            {tag}
          </li>
        );
      })}
    </>
  );
};

export default function Projects(props: ProjectPageProps) {
  const { projects } = props;
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects &&
          projects.map((item) => {
            return (
              <a
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-ghostindigo-300/50 shadow-sm transition duration-300 hover:border-indigo-300  hover:shadow-2.5xl hover:shadow-indigo-300/50  dark:border-ghostindigo-800 hover:dark:border-indigo-300 dark:hover:shadow-ghostindigo-500"
                href={item.link}
                key={item.link}
                tabIndex={0}
              >
                <div className="flex h-full w-full flex-col bg-white dark:bg-ghostindigo-900">
                  <Image
                    alt={item.title}
                    className="w-full"
                    src={item.image as string}
                    height={150}
                    width={300}
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
                    <ul className="sticky mt-4 mb-2 flex gap-1">
                      {item.tags?.length && <Tags items={item.tags} />}
                    </ul>
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
