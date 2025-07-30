import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

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
