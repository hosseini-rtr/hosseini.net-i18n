import { Post } from "@/types/TPost";

export const PostService = {
  async getAllPosts(locale?: string): Promise<Post[]> {
    try {
      // For server-side calls, read directly from the file system
      if (typeof window === "undefined") {
        const fs = await import("fs");
        const path = await import("path");

        const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

        if (fs.existsSync(POSTS_FILE)) {
          const data = fs.readFileSync(POSTS_FILE, "utf8");
          const posts = JSON.parse(data);

          if (locale) {
            return posts.filter((post: any) => post.locale === locale);
          }
          return posts;
        }
        return [];
      }

      // For client-side calls, use the API
      const url = locale ? `/api/posts?locale=${locale}` : "/api/posts";
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching all posts:", error);
      return []; // Return empty array instead of failing
    }
  },

  async getPostById(id: string): Promise<Post | null> {
    try {
      // For server-side calls, read directly from the file system
      if (typeof window === "undefined") {
        const fs = await import("fs");
        const path = await import("path");

        const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

        if (fs.existsSync(POSTS_FILE)) {
          const data = fs.readFileSync(POSTS_FILE, "utf8");
          const posts = JSON.parse(data);
          const post = posts.find((p: any) => p.id.toString() === id);
          return post || null;
        }
        return null;
      }

      // For client-side calls, use the API
      const response = await fetch(`/api/posts/${id}`, {
        next: { revalidate: 60 }, // Cache for 60 seconds
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      return null; // Return null for non-existent posts
    }
  },

  async getPostBySlug(slug: string, locale?: string): Promise<Post | null> {
    try {
      const url = locale
        ? `/api/posts/slug/${slug}?locale=${locale}`
        : `/api/posts/slug/${slug}`;
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching post by slug ${slug}:`, error);
      return null; // Return null for non-existent posts
    }
  },

  async createPost(
    postData: Omit<Post, "id" | "created_at" | "update_at">
  ): Promise<Post | null> {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating post:", error);
      return null;
    }
  },

  async updatePost(id: string, postData: Partial<Post>): Promise<Post | null> {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
      return null;
    }
  },

  async deletePost(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
      return false;
    }
  },
};
