import { PropsWithChildren } from "react";
import { useMenuStore } from "../state";
import { Menu, Navbar } from "./Navbar";
import cn from "classnames";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Head from "next/head";
import { capitalize } from "../util/capitalize";

export function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  const { isMenuOpen } = useMenuStore((state) => state);
  const router = useRouter();
  const path = router.asPath === "/" ? "home" : router.asPath.slice(1).trim();
  const pageHeading = capitalize(path) ?? "Home";
  const title = `${pageHeading} • Shriram Balaji`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Software Engineer at Microsoft, dabbling with things on the interwebs and striving for software craftsmanship." />
      </Head>
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
