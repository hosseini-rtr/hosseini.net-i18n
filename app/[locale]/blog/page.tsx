"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  // Fetch data client-side
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);


  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
      }}
      className="flex flex-row gap-4 flex-wrap container mx-auto"
    >
      {blogs.map((item: any, index) => (
        <Link
          href={`blog/${item.slug}`}
          className="w-1/2 h-[150px] flex flex-col gap-4 rounded border-2 border-white"
          key={index}
        >
          <p>{item.title}</p>
          <p className="text-white/60 text-sm">{item.createdAt}</p>
        </Link>
      ))}
    </motion.section>
  );
}
