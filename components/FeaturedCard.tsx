"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function FeaturedCard({
  title,
  description,
  image,
  date,
  category,
  readTime,
  icon,
  slug = "",
}) {
  return (
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-500 mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl text-gray-900 dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
          <span>{date}</span>
        </div>
        <Link
          href={`/blog/${slug}/`}
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
}
