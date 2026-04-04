export type BlogPost = {
  title: string;
  href: string;
  description: string;
  publishedAt: string;
  publishedTime: number;
};

const BLOG_RSS_URL = "https://blog.shrirambalaji.com/rss.xml";

const htmlEntityMap: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

const decodeHtmlEntities = (value: string) =>
  value.replace(
    /&(amp|lt|gt|quot|apos|#39);/g,
    (entity) => htmlEntityMap[entity] ?? entity
  );

const stripMarkup = (value: string) =>
  decodeHtmlEntities(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getTagValue = (input: string, tag: string) => {
  const match = input.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
};

export const parseBlogFeed = (xml: string): BlogPost[] =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => {
      const item = match[1];
      const title = stripMarkup(getTagValue(item, "title"));
      const href = stripMarkup(getTagValue(item, "link"));
      const description = stripMarkup(getTagValue(item, "description"));
      const publishedAt = stripMarkup(getTagValue(item, "pubDate"));
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
