import Link from "next/link";
import { PropsWithChildren } from "react";

const ExternalLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <a
    className="text-sm text-gray-500 transition hover:text-gray-600 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="mx-auto my-0 flex max-w-3xl flex-col justify-center p-0 md:my-4">
      <hr className="border-1 mb-6 w-full border-ghostindigo-200/20 dark:border-ghostindigo-800/20" />
      <div className="mx-auto grid w-full grid-cols-1 items-start justify-center gap-4 pb-8 sm:grid-cols-3">
        <div className="flex flex-col space-y-5">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-600 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">

            Home

          </Link>
          <Link
            href="/talks"
            className="text-sm text-gray-500 transition hover:text-gray-600 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">

            Talks

          </Link>
          <Link
            href="/projects"
            className="text-sm text-gray-500 transition hover:text-gray-600 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">

            Projects

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
          <Link
            href="/uses"
            className="text-sm text-gray-500 transition hover:text-gray-600 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500">

            Uses

          </Link>
          <ExternalLink href="https://timeline.shrirambalaji.com">
            Timeline
          </ExternalLink>
          <ExternalLink href="https://blog.shrirambalaji.com">
            Blog
          </ExternalLink>
        </div>
      </div>
      <hr className="border-1 mb-6 w-full border-ghostindigo-200/20 dark:border-ghostindigo-800/20" />
      <p className="text-center text-xs leading-6 text-gray-500 dark:text-ghostindigo-400">
        <span>Made with&nbsp;</span>
        <a
          href="https://nextjs.org"
          className="text-indigo-400 underline-offset-2 hover:underline dark:text-indigo-300"
        >
          Next.js
        </a>
        <span>&nbsp;&bull;&nbsp;View source on&nbsp;</span>
        <a
          href="https://github.com/shrirambalaji/shrirambalaji.com"
          className="text-indigo-400 underline-offset-2 hover:underline dark:text-indigo-300"
        >
          GitHub
        </a>
        <span>&nbsp;&bull;&nbsp;Inspired by&nbsp;</span>
        <a
          href="https://leerob.io"
          className="text-indigo-400 underline-offset-2 hover:underline dark:text-indigo-300"
        >
          leerob.io
        </a>
        <span>,&nbsp;</span>
        <a
          href="https://sreetamdas.com"
          className="text-indigo-400 underline-offset-2 hover:underline dark:text-indigo-300"
        >
          sreetamdas.com
        </a>
        <span>&nbsp;and&nbsp;</span>
        <a
          href="https://github.com/shrirambalaji/shrirambalaji.com#inspiration"
          className="text-indigo-400 underline-offset-2 hover:underline dark:text-indigo-300"
        >
          many others
        </a>
      </p>
    </footer>
  );
}
