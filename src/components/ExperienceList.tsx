import { Experience } from "../data";
import { GradientDropShadow } from "./GradientDropShadow";
import Image from "next/image";

export const ExperienceList = ({ items }: { items: Experience[] }) => {
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
            <li
              key={company}
              className="group relative cursor-pointer "
              tabIndex={0}
            >
              <div className="relative flex flex-col items-center rounded-lg border bg-white px-2 py-1 transition-shadow duration-200 hover:shadow-3xl hover:shadow-indigo-400/25 dark:border-ghostindigo-800 dark:bg-ghostindigo-900 dark:hover:shadow-indigo-200/10 md:flex-row md:py-4 md:px-6">
                <Image
                  priority={true}
                  className={`w-30 mx-4 mb-2 mt-5 self-start object-cover md:my-6 md:mx-2 ${
                    darkModeInvert ? "dark:invert" : "filter-none"
                  }`}
                  src={image as string}
                  width={32}
                  height={32}
                  alt={company}
                />
                <div className="flex flex-col justify-between self-start p-4 leading-normal">
                  <a href={link} className="underline-offset-2 hover:underline">
                    <p className="text-xl font-semibold text-ghostindigo-900 dark:text-white md:text-2xl">
                      {company}
                    </p>
                  </a>
                  <p className="mb mb-2 text-sm text-ghostindigo-800 dark:text-ghostindigo-400 md:text-base">
                    {title}
                  </p>
                  <p className="mb-3 text-sm font-normal leading-7 text-gray-700 dark:text-ghostindigo-200 md:text-base md:leading-8 ">
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
