import { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-center gap-10 p-0 md:pl-4">
      {children}
    </main>
  );
};
