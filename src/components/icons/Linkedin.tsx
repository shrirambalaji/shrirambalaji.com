import { SVGProps } from "react";
import cn from "classnames";
import NextLink from "next/link";

export const Linkedin = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> & { href: string }
) => {
  return (
    <NextLink href={props.href}>
      <span
        role="link"
        aria-label="Shriram's Linkedin profile"
        className={cn(
          "group inline-flex cursor-pointer items-center rounded-lg p-2 px-3 text-center text-current hover:bg-ghostindigo-50 hover:dark:bg-ghostindigo-800",
          props.className
        )}
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-linkedin"
          {...props}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </span>
    </NextLink>
  );
};
