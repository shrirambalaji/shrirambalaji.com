import { Experience } from "../data";
import { GradientDropShadow } from "./GradientDropShadow";
import Image from "next/future/image";

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
              className="group relative cursor-pointer"
              tabIndex={0}
            >
              <GradientDropShadow />
              <div className="relative flex flex-col items-center rounded-lg border bg-white px-2 py-1 shadow-sm dark:border-ghostindigo-800 dark:bg-ghostindigo-900 md:flex-row md:py-4 md:px-6">
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
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <a href={link} className="underline-offset-2 hover:underline">
                    <h5 className="text-xl font-semibold text-ghostindigo-900 dark:text-white md:text-2xl">
                      {company}
                    </h5>
                  </a>
                  <h6 className="mb mb-2 text-sm text-ghostindigo-800 dark:text-ghostindigo-400 md:text-base">
                    {title}
                  </h6>
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
