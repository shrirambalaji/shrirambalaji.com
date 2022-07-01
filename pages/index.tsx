import type { NextPage } from "next";
import { Avatar } from "../components/Avatar";
import { MicrosoftLogo } from "../components/icons";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col justify-center mx-auto max-w-3xl">
      <div className="flex flex-col-reverse sm:flex-row items-start ml-4">
        <section className="flex flex-col pr-8 gap-2.5 w-full">
          <h1 className="font-bold text-3xl md:text-5xl ml-[-0.25rem] text-ghostindigo-900 dark:text-white">
            Shriram Balaji
          </h1>
          <h2 className="md:text-xl text-gray-800 dark:text-gray-300 tracking-wide inline-flex items-center">
            Software Engineer II at
            <span className="ml-2 font-bold inline-flex items-center gap-1.5 text-gray-800 dark:text-gray-300 tracking-wide">
              <MicrosoftLogo />
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-500 tracking-wide">
            Dabbling with things on the interwebs and striving for software
            craftsmanship.
          </p>
        </section>
        <section className="my-7 md:my-0 z-10">
          <Avatar className="dark:shadow-3xl md:w-[180px] w-[120px]" />
        </section>
      </div>
    </main>
  );
};

export default Home;
