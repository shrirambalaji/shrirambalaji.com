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
            ? "font-semibold text-gray-800 dark:text-gray-200"
            : "font-normal text-gray-600 dark:text-gray-400",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-ghostindigo-50 dark:hover:bg-ghostindigo-800 transition-all"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
};

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 text-gray-900 dark:bg-ghostindigo-900 bg-opacity-60 dark:text-gray-100">
      <NavItem href="/" text="Home" />
      <NavItem href="/about" text="About" />
      <NavItem href="/uses" text="Uses" />
      <NavItem href="/blog" text="Blog" />
      <ThemeSwitch />
    </nav>
  );
};
