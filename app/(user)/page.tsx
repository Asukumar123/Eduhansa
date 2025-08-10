import Hero from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { getCourses } from "@/sanity/lib/courses/getCourses";

export const dynamic = "force-static";
export const revalidate = 3600; // revalidate at most every hour

export default async function user() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Courses Section */}
      <section className="container mx-auto px-4 mt-16">
        {/* Divider Heading */}
       <div className="relative flex items-center justify-center py-12">
  {/* Left Gradient Line */}
  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

  {/* Icon + Text */}
  <div className="px-4 flex items-center gap-2 bg-background z-10">
    <svg
      className="w-5 h-5 text-indigo-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.84 4.872c0 3.192-1.216 6.102-3.12 8.207L12 14z" />
      <path d="M12 14L5.84 10.578A12.083 12.083 0 005 15.45c0 3.192 1.216 6.102 3.12 8.207L12 14z" />
    </svg>
    <span className="text-lg font-semibold text-indigo-500 tracking-wide">
      Featured Courses
    </span>
  </div>

  {/* Right Gradient Line */}
  <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-indigo-500 to-transparent" />
</div>


        {/* Courses Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 pb-24">
  {courses.map((course) => (
    <CourseCard
      key={course._id}
      course={course}
      href={`/courses/${course.slug}`}
    />
  ))}
</div>
      </section>
    </div>
  );
}

