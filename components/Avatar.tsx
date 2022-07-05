import Image from "next/future/image";
import cn from "classnames";

export const Avatar = ({ className }: { className: string }) => {
  return (
    <Image
      priority
      alt="Shriram Balaji"
      height={200}
      width={200}
      src="/images/avatar.jpg"
      className={cn("rounded-full", className)}
    />
  );
};
