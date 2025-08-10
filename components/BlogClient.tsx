"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  Clock,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";

type RelatedPost = {
  title: string;
  slug: string;
  image: string;
  category: string;
  publishedAt: string;
  readTime: string;
};

type Post = {
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  category: string;
  icon?: string;
  publishedAt: string;
  body: any;
  readTime: string;
  author: string;
  relatedPosts: RelatedPost[];
};

const portableComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || "Blog image"}
          width={800}
          height={500}
          className="rounded-lg mx-auto"
        />
      </div>
    ),
  },
};

export default function BlogClient({ post }: { post: Post }) {
  const { toast } = useToast();

  useEffect(() => {
    if (!post) {
      toast({
        title: "Post not found",
        description: "The requested blog post could not be found.",
        variant: "destructive",
      });
    }
  }, [post, toast]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "The article link has been copied to your clipboard.",
        });
        return;
    }

    if (shareUrl) window.open(shareUrl, "_blank");
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to articles
          </Link>

          <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-500 mb-4">
            <BrainCircuit className="h-5 w-5" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</div>
            <div>By {post.author}</div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={`Image for ${post.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              {["twitter", "facebook", "linkedin"].map((platform) => (
                <Button
                  key={platform}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                  onClick={() => handleShare(platform)}
                >
                  {platform === "twitter" && <Twitter className="h-4 w-4 mr-1" />}
                  {platform === "facebook" && <Facebook className="h-4 w-4 mr-1" />}
                  {platform === "linkedin" && <Linkedin className="h-4 w-4 mr-1" />}
                  Share
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => handleShare("clipboard")}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>

          <article className="prose dark:prose-invert prose-purple max-w-none">
            <PortableText value={post.body} components={portableComponents} />
          </article>

          {/* Related Posts */}
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost, index) => (
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                  key={index}
                >
                  <div className="flex-row space-y-3">
                    <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 group-hover:border-purple-500/50 transition-colors">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={`${relatedPost.title} thumbnail`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-500 mb-2">
                        <BrainCircuit className="h-4 w-4" />
                        <span>{relatedPost.category}</span>
                      </div>
                      <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                          </span>
                        </div>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
