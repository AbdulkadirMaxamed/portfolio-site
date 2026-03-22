import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#c0c0c0] p-8 font-[Arial]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/blog"
            className="px-3 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs hover:bg-[#d4d0c8] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
          >
            ← Back
          </Link>
          <Link
            href="/"
            className="px-3 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs hover:bg-[#d4d0c8] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
          >
            🖥️ Desktop
          </Link>
        </div>

        <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-6">
          <h1 className="text-lg font-bold mb-1">{post.title}</h1>
          <p className="text-xs text-[#808080] mb-4">{post.date}</p>

          <div className="border border-t-[#808080] border-l-[#808080] border-b-white border-r-white mb-4" />

          <div
            className="prose-retro text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </div>
  );
}
