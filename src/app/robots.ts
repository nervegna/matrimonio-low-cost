import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/grazie"],
    },
    sitemap: "https://matrimoniolowcost.it/sitemap.xml",
  };
}
