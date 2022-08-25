import { ButtonHTMLAttributes, ClassAttributes, SVGProps } from "react";
import cn from "classnames";
import NextLink from "next/link";

type IconProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;
export const MenuButton = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement> & { iconProps: IconProps }
) => {
  return (
    <button
      {...props}
      aria-label="Menu Button"
      className={cn(
        "group inline-flex cursor-pointer items-center rounded-lg p-2 px-3  text-center text-current hover:bg-gray-100 hover:dark:bg-ghostindigo-800",
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-menu"
        {...props.iconProps}
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  );
};
