import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // If more pages are added later (e.g., /blog, /project/[id]), list them here.
  return [
    {
      url: baseUrl,
      lastModified: new Date(), // Updates with each build/deployment
      changeFrequency: "monthly", // How often you expect content to change. 'yearly' or 'monthly' is fine for a portfolio.
      priority: 1, // Priority for the homepage is typically 1
    },
    // Example for future pages:
    // {
    //   url: `${baseUrl}/another-page`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ];
}
