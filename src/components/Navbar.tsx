import { useRouter } from "next/router";
import { ThemeSwitch } from "./ThemeSwitch";
import NextLink from "next/link";
import cn from "classnames";
import { GitHub } from "./icons/GitHub";
import { Twitter } from "./icons/Twitter";
import { Linkedin } from "./icons/Linkedin";

type NavItemProps = {
  href: string;
  text: string;
};

const NavItem = ({ href, text }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <li>
      <NextLink href={href}>
        <a
          className={cn(
            isActive
              ? "font-bold text-ghostindigo-700  dark:text-white"
              : "font-normal text-ghostindigo-500 dark:text-ghostindigo-200",
            "hidden w-20 rounded-lg p-1 text-center transition-all hover:bg-ghostindigo-50 hover:backdrop-blur-xl dark:hover:bg-ghostindigo-800 sm:px-2 sm:py-1.5 md:inline-block"
          )}
        >
          <span className="capsize">{text}</span>
        </a>
      </NextLink>
    </li>
  );
};

export const Navbar = () => {
  return (
    <nav className="mx-u relative mx-auto flex w-full max-w-3xl items-center justify-between border-gray-200 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-ghostindigo-900 dark:text-gray-100">
      <ul className="flex">
        <NavItem href="/" text="Home" />
        <NavItem href="/talks" text="Talks" />
        <NavItem href="/uses" text="Uses" />
        <NavItem href="https://blog.shrirambalaji.dev" text="Blog" />
      </ul>
      <ul className="flex items-center justify-center gap-3">
        <GitHub
          width={20}
          height={20}
          className="mr-0 stroke-black group-hover:stroke-indigo-700 dark:stroke-white dark:group-hover:stroke-indigo-500"
          href="https://github.com/shrirambalaji"
        />
        <Twitter
          width={21}
          height={21}
          className="mr-0 stroke-black group-hover:stroke-sky-600 dark:stroke-white dark:group-hover:stroke-sky-500"
          href="https://twitter.com/shrirambalaji"
        />
        <Linkedin
          width={21}
          height={21}
          className="mr-0 stroke-black group-hover:stroke-blue-700 dark:stroke-white dark:group-hover:stroke-blue-500"
          href="https://linkedin.com/in/shrirambalaji"
        />
        <ThemeSwitch className="ml-auto mr-0 md:mr-[2.65rem]" />
      </ul>
    </nav>
  );
};
