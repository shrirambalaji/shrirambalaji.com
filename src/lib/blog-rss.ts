import { XMLParser } from "fast-xml-parser";

export type BlogPost = {
  title: string;
  href: string;
  description: string;
  publishedAt: string;
  publishedTime: number;
};

const BLOG_RSS_URL = "https://blog.shrirambalaji.com/rss.xml";

const parser = new XMLParser({
  ignoreAttributes: true,
  parseTagValue: false,
  processEntities: true,
  trimValues: true,
});

const stripMarkup = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type FeedItem = {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
};

type ParsedFeed = {
  rss?: {
    channel?: {
      item?: FeedItem | FeedItem[];
    };
  };
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
      const href = stripMarkup(item.link ?? "");
      const description = stripMarkup(item.description ?? "");
      const publishedAt = stripMarkup(item.pubDate ?? "");
      const publishedTime = new Date(publishedAt).getTime();

      return {
        title,
        href,
        description,
        publishedAt,
        publishedTime,
      };
    })
    .filter(
      (post) =>
        post.title.length > 0 &&
        post.href.length > 0 &&
        Number.isFinite(post.publishedTime)
    )
    .sort((left, right) => right.publishedTime - left.publishedTime);
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
