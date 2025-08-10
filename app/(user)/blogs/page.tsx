import { client as sanityClient } from "@/sanity/lib/client";
import { featuredArticlesQuery, recentArticlesQuery } from "@/sanity/lib/queries";
import HomeClient from "@/components/HomeClient"; // Rename your component to clarify it's a client component

export default async function HomePage() {
  const featuredArticles = await sanityClient.fetch(featuredArticlesQuery);
  const recentArticles = await sanityClient.fetch(recentArticlesQuery);

  return (
    <HomeClient
      featuredArticles={featuredArticles}
      recentArticles={recentArticles}
    />
  );
}
