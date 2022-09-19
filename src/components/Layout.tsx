import { PropsWithChildren } from "react";
import { useMenuStore } from "../state";
import { Menu, Navbar } from "./Navbar";
import cn from "classnames";
import Footer from "./Footer";

export function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  const { isMenuOpen } = useMenuStore((state) => state);

  return (
    <>
      <div
        className={cn(
          isMenuOpen && "fixed max-h-screen overflow-y-hidden",
          "container relative mx-auto min-h-screen flex-col items-center justify-center px-8 pb-8 md:px-4"
        )}
      >
        <Navbar />
        <Menu />
        {children}
        <Footer />
      </div>
    </>
  );
}
