import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Post } from "@/types/TPost";
import { PostService } from "@/app/lib/services/post-service";

export default function LatestPosts() {
  const locale = useLocale();
  const t = useTranslations("Home");
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const data = await PostService.getAllPosts();
        setLatestPosts(data.slice(0, 4)); // Get only the 4 latest posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchLatestPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      >
        {latestPosts.map((post) => (
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
      <div className="flex justify-center">
        <Link
          href={`/${locale}/blog`}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-all duration-300"
        >
          {t("View All Posts")}
        </Link>
      </div>
    </motion.div>
  );
}