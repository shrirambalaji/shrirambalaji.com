import { PropsWithChildren } from "react";
import cn from "classnames";

export const PageContainer = ({
  className,
  children,
  description,
}: PropsWithChildren<{ description?: string, className?: string }>) => {
  return (
    <main className={cn(`mx-auto my-2 flex max-w-5xl flex-col justify-center gap-x-10 gap-y-5 p-0 pt-6 pb-4`, className)}>
      {description && (
        <p
          className="-mb-5 text-ghostindigo-200"
          suppressHydrationWarning={true}
        >
          {description}
        </p>
      )}
      {children}
    </main>
  );
};
