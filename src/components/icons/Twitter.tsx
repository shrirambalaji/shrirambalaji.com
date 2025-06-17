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
          "group inline-flex cursor-pointer items-center rounded-lg p-2 px-3 text-center text-current",
          props.className
        )}
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
          <path
            d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"
          />
        </svg>
      </span>
    </NextLink>
  );
};
