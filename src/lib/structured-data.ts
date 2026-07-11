import type { SiteSettings } from "./site";

type JsonPrimitive = boolean | null | number | string;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export const createHomepageStructuredData = (
  settings: SiteSettings
): JsonValue => {
  const { identity, meta } = settings;
  const personId = `${meta.url}/#person`;
  const profilePageId = `${meta.url}/#profile`;
  const websiteId = `${meta.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": profilePageId,
        "@type": "ProfilePage",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        name: meta.title,
        url: meta.url,
      },
      {
        "@id": personId,
        "@type": "Person",
        alternateName: identity.alternateName,
        description: meta.description,
        image: new URL(identity.image, meta.url).href,
        jobTitle: identity.jobTitle,
        name: meta.title,
        sameAs: identity.sameAs,
        url: meta.url,
        worksFor: {
          "@type": "Organization",
          name: identity.worksFor.name,
          url: identity.worksFor.url,
        },
      },
      {
        "@id": websiteId,
        "@type": "WebSite",
        name: meta.title,
        url: meta.url,
      },
    ],
  };
};

export const serializeStructuredData = (value: JsonValue): string =>
  JSON.stringify(value).replaceAll("<", "\\u003c");
