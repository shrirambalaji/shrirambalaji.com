import { XMLParser } from "fast-xml-parser";

export interface BlogPost {
  title: string;
  href: string;
  description: string;
  publishedAt: string;
  publishedTime: number;
}

const BLOG_RSS_URL = "https://blog.shrirambalaji.com/rss.xml";
const BLOG_HOSTS = new Set([
  "blog.shrirambalaji.com",
  "shrirambalaji.com",
  "www.shrirambalaji.com",
]);

const parser = new XMLParser({
  ignoreAttributes: true,
  parseTagValue: false,
  processEntities: true,
  trimValues: true,
});

const stripMarkup = (value: string) =>
  value
    .replaceAll(/<[^>]+>/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();

interface FeedItem {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
}

interface ParsedFeed {
  rss?: {
    channel?: {
      item?: FeedItem | FeedItem[];
    };
  };
}

export const toWritingPath = (value: string): string => {
  const url = new URL(value, BLOG_RSS_URL);

  if (!BLOG_HOSTS.has(url.hostname)) {
    return "";
  }

  const path = url.pathname.replace(/\/$/, "");
  if (path === "/writing" || path.startsWith("/writing/")) {
    return `${path}${url.search}${url.hash}`;
  }

  if (path === "/posts") {
    return "/writing/posts";
  }

  if (path.startsWith("/posts/")) {
    return `/writing/posts/${path.slice("/posts/".length)}${url.search}${url.hash}`;
  }

  return "";
};

const asArray = <T>(value?: T | T[]): T[] => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export const parseBlogFeed = (xml: string): BlogPost[] => {
  const feed = parser.parse(xml) as ParsedFeed;
  const items = asArray(feed.rss?.channel?.item);

  return items
    .map((item) => {
      const title = stripMarkup(item.title ?? "");
      const href = toWritingPath(stripMarkup(item.link ?? ""));
      const description = stripMarkup(item.description ?? "");
      const publishedAt = stripMarkup(item.pubDate ?? "");
      const publishedTime = new Date(publishedAt).getTime();

      return {
        description,
        href,
        publishedAt,
        publishedTime,
        title,
      };
    })
    .filter(
      (post) =>
        post.title.length > 0 &&
        post.href.length > 0 &&
        Number.isFinite(post.publishedTime)
    )
    .toSorted((left, right) => right.publishedTime - left.publishedTime);
};

export const getRecentBlogPosts = async (limit = 4): Promise<BlogPost[]> => {
  const response = await fetch(BLOG_RSS_URL, {
    headers: {
      accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to load blog feed: ${response.status} ${response.statusText}`
    );
  }

  const xml = await response.text();
  return parseBlogFeed(xml).slice(0, limit);
};
