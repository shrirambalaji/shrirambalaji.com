import { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <main className="mx-auto my-2 flex max-w-3xl flex-col justify-center gap-10 p-0 pb-4 md:pb-8">
      {children}
    </main>
  );
};
