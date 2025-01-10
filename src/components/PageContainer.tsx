import { PropsWithChildren } from "react";

export const PageContainer = ({
  children,
  description,
}: PropsWithChildren<{ description?: string }>) => {
  return (
    <main className="mx-auto my-2 flex max-w-3xl flex-col justify-center gap-10 p-0 pb-4">
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
