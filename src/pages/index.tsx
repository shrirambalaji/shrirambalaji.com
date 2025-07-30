import type { NextPage } from "next";
import { Avatar } from "../components/Avatar";
import { PageContainer } from "../components/PageContainer";


const Home: NextPage = () => {
  return (
    <PageContainer className="md:mb-24">
      <div className="flex flex-col gap-x-10 gap-y-0 items-start md:flex-row">
        <section className="mb-8 md:mb-0">
          <Avatar className="w-[134px]" />
        </section>
        <section
          className="flex flex-col gap-2 md:placeholder:pr-8"
          role={"contentinfo"}
        >
          <h1 className="ml-[-2px] text-3xl font-semibold md:font-bold text-ghostindigo-800 dark:text-white -tracking-[0.0125em] md:text-4xl mt-[-6px]">
            Shriram Balaji
          </h1>
          <h2 className="text-md inline-flex items-center text-gray-800 dark:text-ghostindigo-100 md:text-xl">
            Senior Software Engineer at <strong>&nbsp;&nbsp;Microsoft</strong>
          </h2>
          <p className="min-w-full text-ghostindigo-800 dark:text-ghostindigo-400 leading-[1.9rem] mt-1.5 tracking-[0.0125em] text-pretty">
            I work on distributed systems and event-driven orchestration for the Microsoft 365 Data & Compute Platform. Previously, I built storage sizing & devtools at NetApp and TeamOne messaging systems at Cisco.
          </p>
        </section>
      </div>
      <div>
        <p className="min-w-full tracking-[0.0125em] text-ghostindigo-800 dark:text-ghostindigo-300 leading-8 font-normal text-pretty">
          I enjoy reading about systems engineering, databases, linkers, distributed systems and more. I occasionally write about my learnings on <a href="https://blog.shrirambalaji.com" className="underline underline-offset-4" target="_blank">the blog</a>. I've been having fun with Rust lately and contribute to open source projects while building <a href="/projects" className="underline underline-offset-4" target="_blank">side projects</a> that interest me. I really like visual diagramming tools, and spend a lot of time obsessing over tiny details.
        </p>
        <br />
        <p className="min-w-full text-ghostindigo-800 dark:text-ghostindigo-300 leading-7 tracking-[0.0125em]">
          Reach out to me on <a href="https://twitter.com/shrirambalaji" className="underline underline-offset-4" target="_blank">X</a>, <a href="https://www.linkedin.com/in/shrirambalaji/" className="underline underline-offset-4" target="_blank">LinkedIn</a> or send me an email at <a href="mailto:hello@shrirambalaji.com" className="underline underline-offset-4">hello@shrirambalaji.com</a>. I'm always happy to chat about tech :)
        </p>
      </div>
    </PageContainer>
  );
};


export default Home;
