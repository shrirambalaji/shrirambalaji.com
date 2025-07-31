import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import "@fontsource-variable/inter";

function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="bg-white dark:bg-ghostindigo-900">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
