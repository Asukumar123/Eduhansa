"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Loader } from "@/components/ui/loader";
import { CourseProgress } from "@/components/CourseProgress";
import {
  GetCoursesQueryResult,
  GetEnrolledCoursesQueryResult,
} from "@/sanity.types";

interface CourseCardProps {
  course:
    | GetCoursesQueryResult[number]
    | NonNullable<
        NonNullable<GetEnrolledCoursesQueryResult>["enrolledCourses"][number]["course"]
      >;
  progress?: number;
  href: string;
}

export function CourseCard({ course, progress, href }: CourseCardProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group hover:no-underline flex"
    >
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-white/10 flex flex-col flex-1 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:ring-1 hover:ring-purple-500/50">
        <div className="relative h-52 w-full overflow-hidden">
          {course.image ? (
            <Image
              src={urlFor(course.image).url() || ""}
              alt={course.title || "Course Image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <Loader size="lg" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md shadow">
              {course.category?.name || "Uncategorized"}
            </span>
            {"price" in course && typeof course.price === "number" && (
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-purple-600/60 text-white shadow backdrop-blur-md">
                {course.price === 0
                  ? "Free"
                  : `$${course.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`}
              </span>
            )}
          </div>
        </div>
       <div className="p-6 flex flex-col flex-1 text-foreground">
  <h3 className="text-xl font-extrabold mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
    {course.title}
  </h3>
  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
    {course.description}
  </p>
  <div className="space-y-4 mt-auto">
    {course.instructor && (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {course.instructor.photo ? (
            <div className="relative h-9 w-9 mr-3 border-2 border-border rounded-full shadow">
              <Image
                src={urlFor(course.instructor.photo).url() || ""}
                alt={course.instructor.name || "Instructor"}
                fill
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="h-9 w-9 mr-3 rounded-full bg-muted flex items-center justify-center">
              <Loader size="sm" />
            </div>
          )}
          <span className="text-sm text-muted-foreground">
            by <span className="font-semibold text-foreground">{course.instructor.name}</span>
          </span>
        </div>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </div>
    )}
    {typeof progress === "number" && (
      <CourseProgress
        progress={progress}
        variant="default"
        size="sm"
        label="Course Progress"
      />
    )}
  </div>
</div>

      </div>
    </Link>
  );
}
