"use client";

import { useEffect, useMemo, useState } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { AppIcon } from "../AppIcons";
import { Icon } from "../ui/Icon";
import { Img } from "../ui/Img";
import { SidebarItem } from "../ui/SidebarItem";
import { writingCategories } from "@/data/writing";
import type { BlogPostMeta } from "@/lib/blog";

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function PostCard({ post, selected, onClick }: { post: BlogPostMeta; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex gap-4 p-[11px] rounded-[10px] text-left transition-colors ${selected ? "" : "hover:bg-white/[0.04]"}`}
      style={selected ? { background: "#3d2522", border: "1.5px solid #6a3325" } : { border: "1.5px solid transparent" }}
    >
      <Img src={post.thumbnail} alt="" className="w-[97px] h-[141px] rounded-[6px] shrink-0" />
      <div className="min-w-0 flex flex-col">
        <h3 className="text-[17px] font-semibold text-white leading-[1.3]">{post.title}</h3>
        <p className="mt-1.5 text-[15px] leading-[1.42] text-[#d7cfcc] line-clamp-3">{post.description}</p>
        <p className="mt-auto pt-2 text-[14px] text-[#b3a9a6]">
          {formatDate(post.date)}
          <span className="mx-2.5">•</span>
          {post.readTime}
        </p>
      </div>
    </button>
  );
}

export function BlogContent() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [postHtml, setPostHtml] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data: BlogPostMeta[]) => {
        setPosts(data);
        setSelectedSlug(data[0]?.slug ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    let cancelled = false;
    fetch(`/api/blog/${selectedSlug}`)
      .then((res) => res.json())
      .then((data) => !cancelled && setPostHtml(data.html))
      .catch(() => !cancelled && setPostHtml("<p>Error loading post.</p>"));
    return () => {
      cancelled = true;
    };
  }, [selectedSlug]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: posts.length };
    for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || `${p.title} ${p.description}`.toLowerCase().includes(q))
    );
  }, [posts, category, query]);

  const selected = posts.find((p) => p.slug === selectedSlug) ?? null;
  const selectedIndex = visible.findIndex((p) => p.slug === selectedSlug);
  const categoryLabel = writingCategories.find((c) => c.id === category)?.label ?? "All posts";

  const { width } = useWindowChrome();
  // Layout tiers: full (design) → icon rail + list + reader → icon rail + list OR reader
  const tier = width >= 1180 ? "full" : width >= 860 ? "rail" : "narrow";
  const rail = tier !== "full";
  const [readerOpen, setReaderOpen] = useState(false);
  const showList = tier !== "narrow" || !readerOpen;
  const showReader = tier !== "narrow" || readerOpen;

  function selectPost(slug: string) {
    setReaderOpen(true);
    if (slug === selectedSlug) return;
    setPostHtml("");
    setSelectedSlug(slug);
  }

  return (
    <div className="flex h-full os-glass" style={{ background: "var(--os-surface)" }}>
      {/* Sidebar */}
      <DragRegion
        className={`flex flex-col shrink-0 ${rail ? "w-[80px] px-[10px]" : "w-[234px] px-[10px]"}`}
        style={{ background: "rgba(40, 26, 32, 0.55)" }}
      >
        <TrafficLights className={rail ? "mt-[17px] mx-auto" : "mt-[17px] ml-[13px]"} />
        <div className={`flex items-center gap-[14px] mt-[23px] ${rail ? "justify-center" : "ml-[14px]"}`}>
          <AppIcon icon="writing" size={32} />
          {!rail && <span className="text-[18px] font-medium text-white">Writing</span>}
        </div>
        <div className="mt-[22px] space-y-[5px]" data-no-drag>
          {writingCategories.map((c) => (
            <SidebarItem
              key={c.id}
              compact={rail}
              className="h-[44px] text-[15.5px]"
              icon={<Icon name={c.icon} size={21} strokeWidth={1.6} />}
              label={c.label}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              trailing={
                <span
                  className="min-w-[24px] h-[24px] px-1.5 rounded-full text-[13px] flex items-center justify-center text-white/85"
                  style={{ background: category === c.id ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)" }}
                >
                  {counts[c.id] ?? 0}
                </span>
              }
            />
          ))}
        </div>
      </DragRegion>

      {/* Post list */}
      {showList && (
      <div
        className={`flex flex-col border-l border-white/[0.06] ${tier === "narrow" ? "flex-1 min-w-0" : tier === "rail" ? "w-[350px] shrink-0" : "w-[383px] shrink-0"}`}
        style={{ background: "rgba(26, 22, 30, 0.6)" }}
      >
        <DragRegion className="h-[98px] shrink-0 flex items-end pb-[18px] pl-[17px] pr-[12px] gap-3">
          {searchOpen ? (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts"
              className="flex-1 h-[36px] rounded-[8px] bg-white/10 px-3 text-[15px] text-white placeholder:text-white/40 outline-none"
            />
          ) : (
            <h2 className="flex-1 text-[19.5px] font-semibold text-white">{categoryLabel}</h2>
          )}
          <button
            onClick={() => {
              setSearchOpen((v) => !v);
              setQuery("");
            }}
            className="w-9 h-9 flex items-center justify-center text-white/90 hover:text-white"
            aria-label="Search"
          >
            <Icon name="search" size={21} />
          </button>
          <button className="w-9 h-9 rounded-[6px] flex items-center justify-center text-white" style={{ background: "#c4532f" }} aria-label="New post">
            <Icon name="plus" size={22} strokeWidth={2} />
          </button>
        </DragRegion>
        <div className="flex-1 overflow-auto dark-scrollbar px-[9px] pb-4 space-y-[8px]">
          {loading && <p className="px-3 text-[14px] text-white/50">Loading posts…</p>}
          {!loading && visible.length === 0 && <p className="px-3 text-[14px] text-white/50">No posts here yet.</p>}
          {visible.map((p) => (
            <PostCard key={p.slug} post={p} selected={p.slug === selectedSlug} onClick={() => selectPost(p.slug)} />
          ))}
        </div>
      </div>
      )}

      {/* Reader */}
      {showReader && (
      <div className="flex flex-1 min-w-0 flex-col border-l border-white/[0.06]" style={{ background: "rgba(22, 19, 26, 0.62)" }}>
        <DragRegion className="h-[82px] shrink-0 flex items-center pl-[30px] pr-[28px] gap-6 text-white/85">
          {tier === "narrow" && (
            <button onClick={() => setReaderOpen(false)} className="flex items-center gap-2 text-[15px] text-white/90 -ml-2 mr-2">
              <Icon name="arrow-left" size={19} />
              {categoryLabel}
            </button>
          )}
          <button
            aria-label="Previous post"
            disabled={selectedIndex <= 0}
            onClick={() => selectedIndex > 0 && selectPost(visible[selectedIndex - 1].slug)}
            className="disabled:opacity-40"
          >
            <Icon name="chevron-left" size={22} />
          </button>
          <button
            aria-label="Next post"
            disabled={selectedIndex < 0 || selectedIndex >= visible.length - 1}
            onClick={() => selectedIndex < visible.length - 1 && selectPost(visible[selectedIndex + 1].slug)}
            className="disabled:opacity-40"
          >
            <Icon name="chevron-right" size={22} />
          </button>
          <div className="flex-1" />
          <span className="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center bg-white/[0.1]">
            <Icon name="pencil" size={19} />
          </span>
          <Icon name="more-horizontal" size={22} />
          <Icon name="copy" size={20} />
        </DragRegion>

        <div className="flex-1 overflow-auto dark-scrollbar px-[22px] pb-10">
          {selected && (
            <>
              <Img src={selected.cover} alt="" className="w-full h-[194px] rounded-[10px]" />
              <div className="px-[4px]">
                {selected.tag && (
                  <span className="inline-block mt-[21px] px-[10px] py-[3px] rounded-[6px] text-[13.5px] font-medium" style={{ background: "#4a211c", color: "#ff9a70" }}>
                    {selected.tag}
                  </span>
                )}
                <h1 className="mt-[12px] text-[34px] font-semibold text-white leading-[1.15]">{selected.title}</h1>
                <div className="mt-[14px] flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] text-[#d1c8c5]">
                  <span className="flex items-center gap-2.5">
                    <Icon name="calendar" size={18} />
                    {formatDate(selected.date)}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Icon name="clock" size={18} />
                    {selected.readTime}
                  </span>
                  {selected.tags.length > 0 && (
                    <span className="flex items-center gap-2.5 italic">
                      <Icon name="tag" size={18} className="not-italic" />
                      {selected.tags.join(", ")}
                    </span>
                  )}
                </div>
                <div className="mt-[20px] prose-os">
                  {postHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: postHtml }} />
                  ) : (
                    <p className="text-white/50">Loading post…</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
