import { groq } from "next-sanity";

export const featuredArticlesQuery = `
  *[_type == "blogType" && featured == true] | order(publishedAt desc)[0...3] {
    title,
    excerpt,
    "slug": slug.current,
    "image": mainImage.asset->url,
 readTime,
    publishedAt,
    category
  }
`

export const recentArticlesQuery = `
  *[_type == "blogType"] | order(publishedAt desc)[0..5] {
    title,
    excerpt,
    "slug": slug.current,
    "image": mainImage.asset->url,
     readTime,
    publishedAt,
    category,
  }
`




export const singlePostQuery = groq`
 *[_type == "blogType" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "image": coalesce(mainImage.asset->url, "/placeholder.svg"),
  excerpt,
  category,
  icon,
  publishedAt,
  readTime,
  author,
  body,
  "relatedPosts": relatedPosts[]->{
    title,
    "slug": slug.current,
    "image": coalesce(mainImage.asset->url, "/placeholder.svg"),
    category,
    publishedAt,
    readTime
  }
}
`;


// min read,