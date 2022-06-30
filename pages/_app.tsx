import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { Navbar } from "../components/Navbar";
import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      {children}
    </div>
  );
};
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="bg-white dark:bg-ghostindigo-900">
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
