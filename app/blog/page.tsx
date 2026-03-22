import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Developer blog posts",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#c0c0c0] p-8 font-[Arial]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/"
            className="px-3 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs hover:bg-[#d4d0c8] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
          >
            ← Desktop
          </Link>
          <h1 className="text-lg font-bold">📝 Blog</h1>
        </div>

        <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-4">
          {posts.length === 0 ? (
            <p className="text-sm text-[#808080]">No posts yet.</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-3 hover:bg-[#000080] hover:text-white group"
                >
                  <h2 className="font-bold text-sm">{post.title}</h2>
                  <p className="text-xs text-[#808080] group-hover:text-[#c0c0c0] mt-1">
                    {post.date} — {post.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
