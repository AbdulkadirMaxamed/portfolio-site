// Writing app configuration. Posts themselves live in content/blog/*.mdx
// (frontmatter: title, date, description, category, readTime, tag, tags, cover, thumbnail).

export type WritingCategory = "essays" | "technical" | "notes" | "drafts";

export const writingCategories: { id: "all" | WritingCategory; label: string; icon: string }[] = [
  { id: "all", label: "All posts", icon: "file-text" },
  { id: "essays", label: "Essays", icon: "book-open" },
  { id: "technical", label: "Technical", icon: "code" },
  { id: "notes", label: "Notes", icon: "notes" },
  { id: "drafts", label: "Drafts", icon: "pencil" },
];
