import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// ✅ Pull values from environment
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2023-01-01"; // Or your desired version

// ✅ Create Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// ✅ Create image URL builder
const builder = imageUrlBuilder(client);

// ✅ Export image URL helper
export function urlFor(source: any) {
  return builder.image(source);
}
