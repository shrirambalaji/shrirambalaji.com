import Link from "next/link";
import { PropsWithChildren } from "react";

const ExternalLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <a
    className="text-gray-400 transition hover:text-gray-500 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="mx-auto my-0 flex max-w-3xl flex-col justify-center p-0 md:my-8">
      <hr className="border-1 mb-6 w-full border-ghostindigo-200/30 dark:border-ghostindigo-800/30" />
      <div className="mx-auto grid w-full grid-cols-1 items-start justify-center gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-5">
          <Link href="/">
            <a className="text-gray-400 transition hover:text-gray-500 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">
              Home
            </a>
          </Link>
          <Link href="/talks">
            <a className="text-gray-400 transition hover:text-gray-500 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">
              Talks
            </a>
          </Link>
          <Link href="/projects">
            <a className="text-gray-400 transition hover:text-gray-500 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">
              Projects
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-5">
          <ExternalLink href="https://twitter.com/shrirambalaji">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/shrirambalaji">
            GitHub
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/in/shrirambalaji">
            Linkedin
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-5">
          <Link href="/uses">
            <a className="text-gray-400 transition hover:text-gray-500 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">
              Uses
            </a>
          </Link>
          <ExternalLink href="https://timeline.shrirambalaji.com">
            Timeline
          </ExternalLink>
          <ExternalLink href="https://blog.shrirambalaji.dev">
            Blog
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
