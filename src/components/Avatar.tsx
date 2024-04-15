import Image from "next/image";
import cn from "classnames";

export const Avatar = ({ className }: { className: string }) => {
  return (
    <Image
      priority
      alt="Shriram Balaji"
      height={200}
      width={200}
      src="/images/avatar.jpeg"
      className={cn("rounded-full", className)}
    />
  );
};
