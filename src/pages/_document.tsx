import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="theme-color"
          content="#111118"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: light)"
        />
        <meta property="og:url" content="https://www.shrirambalaji.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Github" />
        <meta property="og:description" content="Shriram Balaji" />
        <meta
          property="og:image"
          content="/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="shrirambalaji.com" />
        <meta property="twitter:url" content="https://www.shrirambalaji.com/" />
        <meta name="twitter:title" content="Github" />
        <meta name="twitter:description" content="Shriram Balaji" />
        <meta
          name="twitter:image"
          content="/og-image.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
