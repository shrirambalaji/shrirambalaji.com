import { useRouter } from "next/router";
import { ThemeSwitch } from "./ThemeSwitch";
import NextLink from "next/link";
import cn from "classnames";

type NavItemProps = {
  href: string;
  text: string;
};

const NavItem = ({ href, text }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? "font-semibold text-ghostindigo-700 dark:text-gray-200 "
            : "font-normal text-ghostindigo-500 dark:text-gray-300",
          "hidden w-20 rounded-lg p-1 text-center transition-all hover:bg-ghostindigo-50 hover:backdrop-blur-xl dark:hover:bg-ghostindigo-800 sm:px-2 sm:py-1.5 md:inline-block"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
};

export const Navbar = () => {
  return (
    <nav className="mx-u relative mx-auto flex w-full max-w-3xl items-center justify-start border-gray-200 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-ghostindigo-900 dark:text-gray-100">
      <NavItem href="/" text="Home" />
      <NavItem href="/about" text="About" />
      <NavItem href="/talks" text="Talks" />
      <NavItem href="/uses" text="Uses" />
      <NavItem href="https://blog.shrirambalaji.dev" text="Blog" />
      <ThemeSwitch className="ml-auto mr-0 md:mr-[2.65rem]" />
    </nav>
  );
};
