"use client";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Post } from "@/types/TPost";
import { PostService } from "@/app/lib/services/post-service";
import Image from "next/image";


export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await PostService.getAllPosts();
        setPosts(data);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center m-5">
    <p className="border rounded p-5">
      Error: {error}
    </p>
  </div>;

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
                <div className="relative rounded h-48 w-full mb-4 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform transition-transform group-hover:scale-110 duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
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
