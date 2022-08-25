import cn from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { GitHub } from "./icons/GitHub";
import { Linkedin } from "./icons/Linkedin";
import { MenuButton } from "./MenuButton";
import { Twitter } from "./icons/Twitter";
import { ThemeSwitch } from "./ThemeSwitch";

type NavItemProps = {
  href: string;
  text: string;
  className?: string;
  onClick?: any;
};

const NavItem = ({ href, text, className, onClick }: NavItemProps) => {
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
            className,
            "w-full rounded-lg p-1 text-center transition-all hover:bg-gray-100 hover:backdrop-blur-xl dark:hover:bg-ghostindigo-800 sm:px-2 sm:py-1.5 md:w-20"
          )}
          onClick={onClick}
        >
          <span className="capsize">{text}</span>
        </a>
      </NextLink>
    </li>
  );
};

const MobileNavItem = (props: NavItemProps & { onHide: any }) => {
  return (
    <NavItem
      {...props}
      className="inline-flex items-center justify-start pl-3 text-lg"
      onClick={() => props.onHide(true)}
    />
  );
};

// TODO: animate entry and exit
export const MobileMenu = ({
  hidden,
  onHide,
}: {
  hidden: boolean;
  onHide: any;
}) => {
  return (
    <nav
      aria-labelledby="mobile sidebar menu"
      className={cn(
        hidden ? "hidden" : "flex",
        "backdrop-blur-50 opacity-1 absolute top-0  left-0 z-[11] h-full min-h-full w-full flex-col gap-5 overflow-visible bg-white px-8 pt-28 dark:bg-ghostindigo-900 md:hidden"
      )}
    >
      <ul className="flex w-full flex-col gap-2">
        <MobileNavItem href="/" text="Home" onHide={onHide} />
        <MobileNavItem href="/talks" text="Talks" onHide={onHide} />
        <MobileNavItem href="/uses" text="Uses" onHide={onHide} />
        <MobileNavItem
          href="https://blog.shrirambalaji.dev"
          text="Blog"
          onHide={onHide}
        />
      </ul>
      <ul>
        <GitHub
          width={20}
          height={20}
          className="mr-0 fill-black group-hover:fill-indigo-500 dark:fill-white dark:group-hover:fill-indigo-300"
          href="https://github.com/shrirambalaji"
        />
        <Twitter
          width={20}
          height={20}
          className="mr-0 mt-[-0.5px] fill-black group-hover:fill-sky-400 dark:fill-white dark:group-hover:fill-sky-300"
          href="https://twitter.com/shrirambalaji"
        />
        <Linkedin
          width={20}
          height={20}
          className="mr-0 mt-[-0.75px] fill-black group-hover:fill-blue-700 dark:fill-white dark:group-hover:fill-blue-400"
          href="https://linkedin.com/in/shrirambalaji"
        />
      </ul>
    </nav>
  );
};

type NavbarProps = {
  isMobileMenuHidden: boolean;
  onHideMobileMenu: any;
};

export const Navbar = ({
  isMobileMenuHidden,
  onHideMobileMenu,
}: NavbarProps) => {
  return (
    <nav
      className="mx-u relative z-20 mx-auto flex w-full max-w-3xl items-center justify-between border-gray-200 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-ghostindigo-900  dark:text-gray-100 md:items-center"
      aria-labelledby="main navigation bar"
    >
      <MenuButton
        onClick={() => onHideMobileMenu(!isMobileMenuHidden)}
        iconProps={{ width: 20, height: 20 }}
        className="mr-auto mt-[-0.5px]  inline-block stroke-black group-hover:stroke-indigo-400 dark:stroke-white dark:group-hover:stroke-indigo-300 md:hidden"
      />
      <ul className="md:opacity-1 hidden opacity-0 md:flex">
        <NavItem href="/" text="Home" />
        <NavItem href="/talks" text="Talks" />
        <NavItem href="/uses" text="Uses" />
        <NavItem href="https://blog.shrirambalaji.dev" text="Blog" />
      </ul>
      <ul className="flex items-center justify-center gap-4">
        <GitHub
          width={20}
          height={20}
          className="mr-0 hidden fill-black group-hover:fill-indigo-500 dark:fill-white dark:group-hover:fill-indigo-300 md:inline-block"
          href="https://github.com/shrirambalaji"
        />
        <Twitter
          width={20}
          height={20}
          className="mr-0 mt-[-0.5px] hidden fill-black group-hover:fill-sky-400 dark:fill-white dark:group-hover:fill-sky-300 md:inline-block"
          href="https://twitter.com/shrirambalaji"
        />
        <Linkedin
          width={20}
          height={20}
          className="mr-0 mt-[-0.75px] hidden fill-black group-hover:fill-blue-700 dark:fill-white dark:group-hover:fill-blue-400 md:inline-block"
          href="https://linkedin.com/in/shrirambalaji"
        />
        <ThemeSwitch className="ml-auto mr-0 md:mr-[2.65rem]" />
      </ul>
    </nav>
  );
};
