import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();

  return slugs
    .map((slug) => {
      const filePath = getPostFilePath(slug);
      if (!filePath) return null;

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: (data.title as string) || slug,
        date: (data.date as string) || "",
        description: (data.description as string) || "",
      };
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

function getPostFilePath(slug: string): string | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) return mdxPath;

  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(mdPath)) return mdPath;

  return null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = getPostFilePath(slug);
  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const result = await remark().use(html).process(content);

  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    description: (data.description as string) || "",
    html: result.toString(),
  };
}
