import { StructureBuilder } from "sanity/structure";
import { BookOpen, Target, Award, Tag, HelpCircle, TrendingUp,  Settings } from "lucide-react";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Admin Dashboard")
    .items([
      // === Course Content ===
      S.listItem()
        .title("Course Content")
        .child(
          S.documentTypeList("course")
            .title("Courses")
            .child((courseId) =>
              S.list()
                .title("Course Options")
                .items([
                  S.listItem()
                    .title("Edit Course Content")
                    .child(S.document().schemaType("course").documentId(courseId)),
                  S.listItem()
                    .title("View Students")
                    .child(
                      S.documentList()
                        .title("Course Enrollments")
                        .filter('_type == "enrollment" && course._ref == $courseId')
                        .params({ courseId })
                    ),
                ])
            )
        ),

      S.divider(),

      // === Test Series Management ===
      S.listItem()
        .title("Test Series Management")
        .icon(BookOpen)
        .child(
          S.list()
            .title("Test Series")
            .items([
              S.listItem()
                .title("All Test Series")
                .icon(BookOpen)
                .child(
                  S.documentTypeList("testSeries")
                    .title("All Test Series")
                    .filter('_type == "testSeries"')
                    .child((testSeriesId) => S.document().schemaType("testSeries").documentId(testSeriesId))
                ),
              S.listItem()
                .title("Active Test Series")
                .icon(Target)
                .child(
                  S.documentTypeList("testSeries")
                    .title("Active Test Series")
                    .filter('_type == "testSeries" && isActive == true')
                    .child((testSeriesId) => S.document().schemaType("testSeries").documentId(testSeriesId))
                ),
              S.listItem()
                .title("Featured Test Series")
                .icon(Award)
                .child(
                  S.documentTypeList("testSeries")
                    .title("Featured Test Series")
                    .filter('_type == "testSeries" && featured == true')
                    .child((testSeriesId) => S.document().schemaType("testSeries").documentId(testSeriesId))
                ),
              S.listItem()
                .title("By Category")
                .icon(Tag)
                .child(
                  S.documentTypeList("category")
                    .title("Categories")
                    .child((categoryId) =>
                      S.documentList()
                        .title("Test Series in Category")
                        .filter('_type == "testSeries" && category._ref == $categoryId')
                        .params({ categoryId })
                        .child((testSeriesId) => S.document().schemaType("testSeries").documentId(testSeriesId))
                    )
                ),
            ])
        ),

      S.divider(),

      // === Question Bank ===
      S.listItem()
        .title("Question Bank")
        .icon(HelpCircle)
        .child(
          S.list()
            .title("Questions")
            .items([
              S.listItem()
                .title("All Questions")
                .icon(HelpCircle)
                .child(
                  S.documentTypeList("question")
                    .title("All Questions")
                    .filter('_type == "question"')
                    .child((questionId) => S.document().schemaType("question").documentId(questionId))
                ),
              S.listItem()
                .title("By Subject")
                .icon(Tag)
                .child(
                  S.list()
                    .title("Subjects")
                    .items([
                      // Add Subject-Based Filtering Here
                    ])
                ),
              S.listItem()
                .title("By Difficulty")
                .icon(TrendingUp)
                .child(
                  S.list()
                    .title("Difficulty Levels")
                    .items([
                      // Add Difficulty-Based Filtering Here
                    ])
                ),
            ])
        ),

      S.divider(),

      // === User Management ===
      S.listItem()
        .title("User Management")
        .child(
          S.list()
            .title("Select a Type of User")
            .items([
              S.listItem()
                .title("Instructors")
                .schemaType("instructor")
                .child(S.documentTypeList("instructor")),
              S.listItem()
                .title("Students")
                .schemaType("student")
                .child(S.documentTypeList("student")),
            ])
        ),

      S.divider(),

      // === Blog Management ===
      S.listItem()
        .title("Blog Management")
        .child(S.documentTypeList("blogType").title("Blogs")),

      S.divider(),

      // === Settings ===
      S.listItem()
        .title("Settings")
        .icon(Settings)
        .child(
          S.list()
            .title("Application Settings")
            .items([
              S.listItem().title("General Settings").child(
                S.document().schemaType("settings").documentId("settings")
              ),
            ])
        ),
    ]);
