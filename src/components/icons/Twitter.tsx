import { SVGProps } from "react";
import cn from "classnames";
import NextLink from "next/link";

export const Twitter = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> & { href: string }
) => {
  return (
    <NextLink href={props.href} legacyBehavior>
      <span
        role="link"
        aria-label="Shriram's Twitter profile"
        className={cn(
          "group inline-flex cursor-pointer items-center rounded-lg px-3 text-center text-current",
          props.className
        )}
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </span>
    </NextLink>
  );
};
