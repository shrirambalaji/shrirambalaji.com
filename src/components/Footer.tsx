import Link from "next/link";
import { PropsWithChildren } from "react";

const ExternalLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <a
    className="text-sm text-gray-500 transition hover:text-ghostindigo-800 dark:text-ghostindigo-300 dark:hover:text-ghostindigo-500"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="mx-auto my-0 flex max-w-5xl flex-col justify-center p-0 md:my-4">
      <hr className="border-1 mb-6 w-full border-ghostindigo-200/20 dark:border-ghostindigo-800/20" />
      <p className="text-center text-xs leading-6 text-gray-500 dark:text-ghostindigo-400">
        <span>&nbsp;View source on&nbsp;</span>
        <a
          href="https://github.com/shrirambalaji/shrirambalaji.com"
          className="text-indigo-400 underline-offset-2 hover:underline dark:text-indigo-300"
        >
          GitHub
        </a>
        <a>&nbsp;&bull;&nbsp;Copyright © {new Date().getFullYear()} Shriram Balaji</a>
      </p>
    </footer>
  );
}
