import config from "@/config";

const { site, socials } = config;

export const personIdentity = {
  "@type": "Person",
  "@id": `${site.url}#person`,
  name: site.author,
  url: site.profile ?? site.url,
};

export const personSameAs = socials
  .map(({ url }) => url)
  .filter(url => !url.startsWith("mailto:"));
