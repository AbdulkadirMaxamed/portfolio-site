"use client";

import { useEffect, useState } from "react";

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export function BlogContent() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPostMeta | null>(null);
  const [postHtml, setPostHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleOpenPost(post: BlogPostMeta) {
    setSelectedPost(post);
    setPostHtml("");
    fetch(`/api/blog/${post.slug}`)
      .then((res) => res.json())
      .then((data) => setPostHtml(data.html))
      .catch(() => setPostHtml("<p>Error loading post.</p>"));
  }

  if (loading) {
    return (
      <div className="p-4 text-[13px] font-[Arial]">
        <div className="flex items-center gap-2">
          <span className="animate-pulse">⏳</span>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Single post view
  if (selectedPost) {
    return (
      <div className="p-4 font-[Arial] text-[13px] text-black">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-2 px-2 py-[2px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[11px] hover:bg-[#d4d0c8] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
        >
          ← Back
        </button>

        <h2 className="text-base font-bold mb-1">{selectedPost.title}</h2>
        <p className="text-[11px] text-[#808080] mb-3">{selectedPost.date}</p>

        <div className="border border-t-[#808080] border-l-[#808080] border-b-white border-r-white mb-3" />

        {postHtml ? (
          <div
            className="prose-retro text-[12px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: postHtml }}
          />
        ) : (
          <div className="flex items-center gap-2">
            <span className="animate-pulse">⏳</span>
            <span>Loading post...</span>
          </div>
        )}
      </div>
    );
  }

  // Blog index
  return (
    <div className="p-2 font-[Arial] text-[13px] text-black">
      <div className="flex items-center gap-1 mb-2 px-1">
        <span className="text-[11px] text-[#808080]">📁 C:\Users\Blog</span>
      </div>

      <div className="border border-t-[#808080] border-l-[#808080] border-b-white border-r-white mb-2" />

      {posts.length === 0 ? (
        <p className="text-[11px] text-[#808080] p-2">No blog posts found.</p>
      ) : (
        <div className="space-y-1">
          {/* Table header */}
          <div className="flex gap-2 px-2 py-[2px] bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[11px] font-bold">
            <span className="w-6">📄</span>
            <span className="flex-1">Name</span>
            <span className="w-24">Date</span>
          </div>

          {posts.map((post) => (
            <button
              key={post.slug}
              onClick={() => handleOpenPost(post)}
              className="flex gap-2 px-2 py-[2px] w-full text-left hover:bg-[#000080] hover:text-white group cursor-pointer text-[11px]"
            >
              <span className="w-6">📝</span>
              <span className="flex-1 truncate">{post.title}</span>
              <span className="w-24 text-[#808080] group-hover:text-[#c0c0c0]">{post.date}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 text-[11px] text-[#808080]">
        {posts.length} object(s)
      </div>
    </div>
  );
}
