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
          "hidden md:inline-block p-1 sm:px-2 sm:py-1.5 rounded-lg hover:backdrop-blur-xl hover:bg-ghostindigo-50 dark:hover:bg-ghostindigo-800 transition-all w-20 text-center"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
};

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-start w-full relative max-w-3xl mx-u border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 text-gray-900 dark:bg-ghostindigo-900 bg-opacity-60 dark:text-gray-100">
      <NavItem href="/" text="Home" />
      <NavItem href="/about" text="About" />
      <NavItem href="/uses" text="Uses" />
      <NavItem href="https://blog.shrirambalaji.dev" text="Blog" />
      <ThemeSwitch className="ml-auto mr-[3.4rem]" />
    </nav>
  );
};
