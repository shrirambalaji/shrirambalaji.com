import Image from "next/image";
import cn from "classnames";

export const Avatar = ({ className }: { className: string }) => {
  return (
    <div className={cn("relative h-full aspect-square", className)}>
      <Image
        priority
        alt="Shriram Balaji"
        src="/images/avatar.jpeg"
        fill
        className="rounded-xl object-cover border-indigo-300 border"
      />
    </div>
  );
};
