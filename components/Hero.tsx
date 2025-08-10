"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative  overflow-hidden pt-12 pb-12">
      {/* Glow background */}
      <div className="absolute right-10 top-10 h-72 w-72  rounded-full blur-3xl opacity-30 z-0" />

      <div className="container mx-auto max-w-[1200px] px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-24 relative z-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Master the Future — One Course at a Time
          </h1>

          {/* Paragraph with fade + scale animation */}
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-muted-foreground text-lg"
          >
            From foundational skills to advanced tech, our platform helps you
            learn faster and smarter. Join thousands of learners building the
            future.
          </motion.p>

          <div className="flex justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition">
              Explore Courses
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Image Section with float animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/src/hero.png"
              alt="Learning Illustration"
              width={580}
              height={580}
              className="object-contain drop-shadow-lg"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
