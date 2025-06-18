import type { NextPage } from "next";
import { Avatar } from "../components/Avatar";
import { PageContainer } from "../components/PageContainer";


const Home: NextPage = () => {
  return (
    <PageContainer className="md:mb-24">
      <div className="flex flex-col gap-x-10 gap-y-0 items-start md:flex-row">
        <section className="mb-8 md:mb-0">
          <Avatar className="w-[150px]" />
        </section>
        <section
          className="flex flex-col gap-3 md:placeholder:pr-8"
          role={"contentinfo"}
        >
          <h1 className="ml-[-2px] text-3xl font-bold text-ghostindigo-800 dark:text-white md:text-5xl mt-[-2px]">
            Shriram Balaji
          </h1>
          <h2 className="text-md inline-flex items-center tracking-wide text-gray-800 dark:text-ghostindigo-100 md:text-xl mt-[-2px]">
            Senior Software Engineer at <strong>&nbsp;Microsoft</strong>
          </h2>
          <p className="hyphens-auto text-ghostindigo-800 dark:text-ghostindigo-300 tracking-wide leading-7 md:leading-8 md:text-lg">
            At Microsoft, I work on an event-driven orchestration layer for the M365 Data & Compute Platform. Previously, I built sizing tools at NetApp & TeamOne messaging systems at Cisco.
          </p>
        </section>
      </div>
      <div>
        <p className="hyphens-auto text-ghostindigo-800 dark:text-ghostindigo-200 tracking-wide leading-7 md:leading-8 md:text-lg">
          I enjoy reading about systems engineering, databases, linkers, distributed systems and more. I occasionally write about my learnings on <a href="https://blog.shrirambalaji.com" className="underline underline-offset-4" target="_blank">the blog</a>. Recently I'm enjoying Rust a lot, and try to contribute to open source or build some&nbsp;<a href="/projects" className="underline underline-offset-4" target="_blank">projects</a> that interest me. I really like visual diagramming tools, and spend a lot of time obsessing over tiny details.
        </p>
        <br />
        <p className="hyphens-auto text-ghostindigo-800 dark:text-ghostindigo-200 tracking-wide leading-7 md:leading-8 md:text-lg">
          Reach out to me on <a href="https://twitter.com/shrirambalaji" className="underline underline-offset-4" target="_blank">X</a>, <a href="https://www.linkedin.com/in/shrirambalaji/" className="underline underline-offset-4" target="_blank">LinkedIn</a> or send me an email at <a href="mailto:hello@shrirambalaji.com" className="underline underline-offset-4">hello@shrirambalaji.com</a>. I'm always happy to chat about tech :)
        </p>
      </div>
    </PageContainer>
  );
};


export default Home;
