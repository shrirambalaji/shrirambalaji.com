import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/opengraph")) {
    return (
      <div className="bg-ghostindigo-900">
        <Component {...pageProps}></Component>;
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="bg-white dark:bg-ghostindigo-900">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
