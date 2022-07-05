import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <div className="container mx-auto min-h-screen flex-col items-center justify-center px-4">
        <Navbar />
        {children}
      </div>
    </>
  );
}
