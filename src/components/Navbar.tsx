import cn from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { GitHub } from "./icons/GitHub";
import { Linkedin } from "./icons/Linkedin";
import { MenuButton } from "./MenuButton";
import { Twitter } from "./icons/Twitter";
import { ThemeSwitch } from "./ThemeSwitch";
import { useMenuStore } from "../state";
import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { capitalize } from "../util/capitalize";

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
    <NextLink
      href={href}
      className={cn(
        isActive
          ? "font-medium text-ghostindigo-800 dark:text-white"
          : "font-normal text-ghostindigo-400 dark:text-ghostindigo-300",
        className,
        "w-full rounded-lg p-4 text-center font-sans tracking-normal transition-all hover:bg-gray-100 hover:backdrop-blur-xl dark:hover:bg-ghostindigo-800 sm:px-3 sm:py-2 md:w-20"
      )}
      onClick={onClick}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
};

const SocialLinks = (props: { iconSize: number; className?: string }) => {
  const { iconSize, className } = props;
  return (
    <>
      <li>
        <GitHub
          width={iconSize}
          height={iconSize}
          className={cn(
            "mr-0 fill-ghostindigo-300 hover:fill-ghostindigo-800 dark:fill-ghostindigo-300 dark:hover:fill-ghostindigo-100 transition-all duration-75 ease-in-out",
            className
          )}
          href="https://github.com/shrirambalaji"
        />
      </li>
      <li>
        <Twitter
          width={iconSize}
          height={iconSize}
          className={cn(
            "mr-0 fill-ghostindigo-300 hover:fill-ghostindigo-800 dark:fill-ghostindigo-300 dark:hover:fill-ghostindigo-100 transition-all duration-75 ease-in-out",
            className
          )}
          href="https://x.com/shrirambalaji"
        />
      </li>
      <li>
        <Linkedin
          width={iconSize}
          height={iconSize}
          className={cn(
            "mr-0 fill-ghostindigo-300 hover:fill-ghostindigo-800 dark:fill-ghostindigo-300 dark:hover:fill-ghostindigo-100 transition-all duration-75 ease-in-out",
            className
          )}
          href="https://linkedin.com/in/shrirambalaji"
        />
      </li>
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
    <li style={{ opacity: 0, transform: "translateX(-1%)" }}>
      {isMenuOpen && (
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
      )}
    </li>
  );
};

// mobile-only fullscreen menu
export const Menu = () => {
  const { isMenuOpen, hideMenu } = useMenuStore((state) => state);
  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (navRef.current) {
      if (isMenuOpen) {
        navRef.current.style.display = 'flex';
        animate(navRef.current, { opacity: [0, 1] }, { duration: 0.2 }).then(() => {
          // Animate nav items with stagger
          if (navItemsRef.current) {
            const navItems = Array.from(navItemsRef.current.querySelectorAll('li')).filter(Boolean);
            if (navItems.length > 0) {
              animate(
                navItems,
                { x: ["-1%", 0], opacity: [0, 1] },
                { delay: stagger(0.05), duration: 0.3 }
              );
            }
          }
        });
      } else if (navRef.current.style.display !== 'none') {
        // Only animate out if menu is currently visible
        if (navItemsRef.current) {
          const navItems = Array.from(navItemsRef.current.querySelectorAll('li')).filter(Boolean);
          if (navItems.length > 0) {
            animate(
              navItems,
              { x: [0, "-1%"], opacity: [1, 0] },
              { delay: stagger(0.02), duration: 0.2 }
            );
          }
        }
        animate(navRef.current, { opacity: [1, 0] }, { duration: 0.2 }).then(() => {
          if (navRef.current) {
            navRef.current.style.display = 'none';
          }
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      aria-labelledby="mobile sidebar menu"
      className={cn(
        "backdrop-blur-50 fixed top-0 left-0 z-40 h-full min-h-full w-full flex-col gap-5 overflow-y-hidden bg-white px-6 pt-[4.4rem] dark:bg-ghostindigo-900 md:hidden"
      )}
      style={{ display: 'none', opacity: 0 }}
    >
      <button
        onClick={hideMenu}
        className="absolute top-[0.325rem] left-6 p-2 flex items-center gap-2"
        aria-label="Close menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ghostindigo-800 dark:text-white"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text-ghostindigo-800 dark:text-white font-medium text-lg">Back</span>
      </button>

      <ul ref={navItemsRef} className={cn("flex w-full flex-col gap-2 ml-1")}>
        <MobileNavItem href="/" text="About" />
        <MobileNavItem href="/talks" text="Talks" />
        <MobileNavItem href="/uses" text="Uses" />
        <MobileNavItem href="/projects" text="Projects" />
        <MobileNavItem href="https://blog.shrirambalaji.com" text="Blog" />
      </ul>
      <ul className="absolute bottom-5 flex gap-3">
        <SocialLinks iconSize={30} />
      </ul>
    </nav>
  );
};
export const Navbar = () => {
  const router = useRouter();
  const path = router.asPath === "/" ? "about" : router.asPath.slice(1).trim();
  const pageHeading = capitalize(path) ?? "About";
  const { toggleMenu } = useMenuStore((state) => state);
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-10 h-[60px] bg-white/80 backdrop-blur-sm dark:bg-ghostindigo-900/90"></div>
      <header className="container sticky top-0 z-20">
        <nav
          className="mx-auto flex w-full h-full max-w-5xl items-center justify-between border-gray-200 bg-transparent bg-opacity-60 pb-2 pt-2 md:pt-4 text-gray-900 dark:border-gray-700 dark:text-gray-100 md:items-center"
          aria-labelledby="main navigation bar"
        >
          <MenuButton
            onClick={() => toggleMenu()}
            iconProps={{ width: 20, height: 20 }}
            className="mt-[-0.5px] inline-block stroke-black  md:hidden"
            disableHover={true}
          />
          <h1 className="mr-auto flex text-lg font-medium text-ghostindigo-800 dark:text-gray-200 md:hidden">
            {pageHeading}
          </h1>
          <ul className="hidden gap-3 md:ml-[-.75rem] md:flex">
            <NavItem href="/" text="About" />
            <NavItem href="/talks" text="Talks" />
            <NavItem href="/uses" text="Uses" />
            <NavItem href="/projects" text="Projects" />
            <NavItem href="https://blog.shrirambalaji.com/" text="Blog" />
          </ul>
          <ul className="flex items-center justify-center gap-4 md:mr-16">
            <SocialLinks className="hidden md:inline-block " iconSize={20} />
            <ThemeSwitch className="ml-auto mr-0" />
          </ul>
        </nav>
      </header>
    </>
  );
};
