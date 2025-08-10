import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
}

export const HeroSection = ({
  title,
  highlight,
  description,
  image,
  primaryButton,
  secondaryButton,
}: HeroSectionProps) => {
  return (
    <section className="mb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}{" "}
            <span className="text-purple-600 dark:text-purple-500">
              {highlight}
            </span>
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href={primaryButton.href}>{primaryButton.label}</Link>
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <Link href={secondaryButton.href}>{secondaryButton.label}</Link>
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-800">
          <Image
            src={image}
            alt={highlight}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      </div>
    </section>
  );
};
