import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <div className="container mx-auto px-4 min-h-screen flex-col items-center justify-center">
        <Navbar />
        {children}
      </div>
    </>
  );
}
