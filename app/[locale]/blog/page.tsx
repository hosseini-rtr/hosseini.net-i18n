"use client";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";

type Post = {
  id: number,
  tags: string[],
  author: string,
  title: string,
  content: string,
  slug: string,
  created_at: string,
  update_at: string,
  locale: string,
  og_description: string,
  image: string
};


export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
          cache: 'no-store',
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="min-h-[80vh] py-12 xl:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <Link
              href={`/${locale}/blog/${post.id}`}
              key={post.id}
              className="group flex flex-col bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-all duration-300">
                  {post.title}
                </h3>
                <p className="text-white/60 line-clamp-3">
                  {post.og_description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-white/40">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-accent">{post.author}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
