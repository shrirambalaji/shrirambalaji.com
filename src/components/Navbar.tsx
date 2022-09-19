import cn from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { GitHub } from "./icons/GitHub";
import { Linkedin } from "./icons/Linkedin";
import { MenuButton } from "./MenuButton";
import { Twitter } from "./icons/Twitter";
import { ThemeSwitch } from "./ThemeSwitch";
import { useMenuStore } from "../state";
import { AnimatePresence, motion, Variants } from "framer-motion";

type NavLinkProps = {
  href: string;
  text: string;
  className?: string;
  onClick?: any;
};

const NavLink = ({ href, text, className, onClick }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? "font-medium text-ghostindigo-800  dark:text-white"
            : "font-normal text-ghostindigo-400 dark:text-ghostindigo-300",
          className,
          "w-full rounded-lg p-4 text-center transition-all hover:bg-gray-100 hover:backdrop-blur-xl dark:hover:bg-ghostindigo-800 sm:px-3 sm:py-2 md:w-20"
        )}
        onClick={onClick}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
};

const SocialLinks = (props: { iconSize: number; className?: string }) => {
  const { iconSize, className } = props;
  return (
    <>
      <GitHub
        width={iconSize}
        height={iconSize}
        className={cn(
          "mr-0 fill-black group-hover:fill-indigo-500 dark:fill-white dark:group-hover:fill-indigo-300",
          className
        )}
        href="https://github.com/shrirambalaji"
      />
      <Twitter
        width={iconSize}
        height={iconSize}
        className={cn(
          "mr-0 mt-[-0.5px] fill-black group-hover:fill-sky-400 dark:fill-white dark:group-hover:fill-sky-300",
          className
        )}
        href="https://twitter.com/shrirambalaji"
      />
      <Linkedin
        width={iconSize}
        height={iconSize}
        className={cn(
          "mr-0 mt-[-0.75px] fill-black group-hover:fill-blue-700 dark:fill-white dark:group-hover:fill-blue-400",
          className
        )}
        href="https://linkedin.com/in/shrirambalaji"
      />
    </>
  );
};

const NavItem = (props: NavLinkProps) => {
  return (
    <li>
      <NavLink {...props} />
    </li>
  );
};

const MobileNavItem = (props: NavLinkProps) => {
  const { isMenuOpen, hideMenu } = useMenuStore((state) => state);
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <>
      {isMenuOpen && (
        <motion.li
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: "-1%", opacity: 0 }}
          exit={{ x: "-1%", opacity: 0 }}
        >
          <NavLink
            {...props}
            className={cn(
              isActive && "bg-gray-100 dark:bg-ghostindigo-800",
              "inline-flex items-center justify-start pl-3 text-xl"
            )}
            onClick={(e: any) => {
              e.preventDefault();
              // avoid route transition when already on current page
              if (!isActive) {
                router.push(props.href).then(() => {
                  hideMenu();
                });
              } else {
                hideMenu();
              }
            }}
          />
        </motion.li>
      )}
    </>
  );
};

// mobile-only fullscreen menu
export const Menu = () => {
  const { isMenuOpen } = useMenuStore((state) => state);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-labelledby="mobile sidebar menu"
          className={cn(
            "backdrop-blur-50 opacity-1 absolute top-0  left-0 z-40 h-full min-h-full w-full flex-col gap-5 overflow-y-hidden bg-white px-6 pt-28 dark:bg-ghostindigo-900 md:hidden"
          )}
        >
          <motion.ul className={cn("flex w-full flex-col gap-2")}>
            <MobileNavItem href="/" text="Home" />
            <MobileNavItem href="/talks" text="Talks" />
            <MobileNavItem href="/uses" text="Uses" />
            <MobileNavItem href="/projects" text="Projects" />
            <MobileNavItem href="https://blog.shrirambalaji.dev" text="Blog" />
          </motion.ul>
          <motion.ul className="absolute bottom-5 flex gap-3">
            <SocialLinks iconSize={30} />
          </motion.ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Navbar = () => {
  const router = useRouter();
  const path = router.asPath === "/" ? "home" : router.asPath.slice(1).trim();
  const pageHeading = capitalize(path) ?? "Home";
  const { toggleMenu } = useMenuStore((state) => state);
  return (
    <nav
      className="mx-u relative z-50 mx-auto flex w-full max-w-3xl items-center justify-between border-gray-200 bg-transparent bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:text-gray-100 md:items-center"
      aria-labelledby="main navigation bar"
    >
      <MenuButton
        onClick={() => toggleMenu()}
        iconProps={{ width: 20, height: 20 }}
        className="mt-[-0.5px] ml-[-10px] inline-block stroke-black group-hover:stroke-indigo-400 dark:stroke-white dark:group-hover:stroke-indigo-300 md:hidden"
      />
      <h1 className="mr-auto flex text-lg font-medium tracking-wide text-gray-400 dark:text-gray-200 md:hidden">
        {pageHeading}
      </h1>
      <ul className="hidden gap-3 md:ml-[-.75rem] md:flex">
        <NavItem href="/" text="Home" />
        <NavItem href="/talks" text="Talks" />
        <NavItem href="/uses" text="Uses" />
        <NavItem href="/projects" text="Projects" />
        <NavItem href="https://blog.shrirambalaji.dev" text="Blog" />
      </ul>
      <ul className="flex items-center justify-center gap-4">
        <SocialLinks className="hidden md:inline-block" iconSize={20} />
        <ThemeSwitch className="ml-auto mr-0" />
      </ul>
    </nav>
  );
};
