
// src/app/services/[service]/page.tsx

import { heroSections } from "../data/data";
import { HeroSection } from "@/components/Herosection";

export default function Page() {
  const data = heroSections.find((h) => h.id === "notes");

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <main className="container mx-auto px-4 py-12">
        {/* Place your Header component here */}
        {data ? <HeroSection {...data} /> : null}
      </main>
    </div>
  );
}
