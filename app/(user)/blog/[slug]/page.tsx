import { client } from "@/sanity/lib/client";
import { singlePostQuery } from "@/sanity/lib/queries";
import BlogClient from "@/components/BlogClient";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  // This avoids destructuring early
  const post = await client.fetch(singlePostQuery, {
    slug: params.slug,
  });

  if (!post) return notFound();

  return <BlogClient post={post} />;
}
