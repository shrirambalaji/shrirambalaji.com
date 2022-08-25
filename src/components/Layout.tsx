import { PropsWithChildren, useState } from "react";
import { Navbar, MobileMenu } from "./Navbar";

export function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  const [hidden, setHiddenMobileMenu] = useState(true);
  return (
    <>
      <div className="container mx-auto min-h-screen flex-col items-center justify-center px-8 pb-8 md:px-4">
        <Navbar
          isMobileMenuHidden={hidden}
          onHideMobileMenu={setHiddenMobileMenu}
        />
        <MobileMenu hidden={hidden} onHide={setHiddenMobileMenu} />
        {children}
      </div>
    </>
  );
}
