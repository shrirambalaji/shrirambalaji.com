/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "beta.reactjs.org",
      "excalidraw.com",
      "og.shrirambalaji.com",
      "opengraph.githubassets.com",
      "repository-images.githubusercontent.com",
      "shrirambalaji.com",
    ],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
});
