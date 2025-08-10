"use client";

import { getCategoryIcon } from "@/sanity/lib/categoryIcons";
import FeaturedCard from "@/components/FeaturedCard";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useRef, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  category: string;
  slug: string;
}

interface Props {
  featuredArticles: Article[];
  recentArticles: Article[];
}

export default function HomeClient({ featuredArticles, recentArticles }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const newsletterRef = useRef<HTMLElement>(null);

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
      <section className="mb-20">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Dive into the World of{" "}
        <span className="text-purple-600 dark:text-purple-500">Tech & Learning Blogs</span>
      </h1>
      <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl">
        Explore in-depth tutorials, coding guides, system design breakdowns, and industry insights curated for developers and learners.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Link href="/articles/">Browse All Blogs</Link>
        </Button>
        <Button
          variant="outline"
          className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
          onClick={scrollToNewsletter}
        >
          Join Free Newsletter
        </Button>
      </div>
    </div>
    <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-800">
      <Image
        src="/src/blog.jpg"
        alt="Blog illustration showing a person writing code and reading articles"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  </div>
</section>



        {/* Featured Articles */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article, i) => (
              <FeaturedCard
                key={i}
                title={article.title}
                description={article.excerpt}
                image={article.image}
                date={new Date(article.publishedAt).toLocaleDateString()}
                category={article.category}
                icon={getCategoryIcon(article.category)}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentArticles.map((article, i) => (
              <FeaturedCard
                key={i}
                title={article.title}
                description={article.excerpt}
                image={article.image}
                date={new Date(article.publishedAt).toLocaleDateString()}
                category={article.category}
                icon={getCategoryIcon(article.category)}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section
          ref={newsletterRef}
          id="newsletter"
          className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-gray-700 dark:text-gray-400">
                Subscribe to our newsletter to receive the latest insights on AI advancements, tutorials, and industry
                news.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 focus-visible:ring-purple-500 text-black dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
