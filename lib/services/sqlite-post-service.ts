import db from "@/lib/database/db";
import { Post } from "@/types/TPost";

export interface PostWithTags extends Post {
  tags: string[];
}

export const PostService = {
  async getAllPosts(locale?: string): Promise<PostWithTags[]> {
    try {
      // For server-side calls, use SQLite directly
      if (typeof window === "undefined") {
        let query = `
          SELECT 
            p.*,
            GROUP_CONCAT(t.name) as tag_names
          FROM posts p
          LEFT JOIN post_tags pt ON p.id = pt.post_id
          LEFT JOIN tags t ON pt.tag_id = t.id
        `;

        if (locale) {
          query += ` WHERE p.locale = ?`;
        }

        query += ` GROUP BY p.id ORDER BY p.created_at DESC`;

        const stmt = db.prepare(query);
        const rows: any[] = locale ? stmt.all(locale) : stmt.all();

        return rows.map((row: any) => ({
          id: row.id,
          title: row.title,
          content: row.content,
          slug: row.slug,
          author: row.author,
          locale: row.locale,
          og_description: row.og_description || "",
          image: row.image || "",
          created_at: row.created_at,
          update_at: row.updated_at,
          tags: row.tag_names ? row.tag_names.split(",") : [],
        }));
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

  async getPostById(id: string): Promise<PostWithTags | null> {
    try {
      // For server-side calls, use SQLite directly
      if (typeof window === "undefined") {
        const stmt = db.prepare(`
          SELECT 
            p.*,
            GROUP_CONCAT(t.name) as tag_names
          FROM posts p
          LEFT JOIN post_tags pt ON p.id = pt.post_id
          LEFT JOIN tags t ON pt.tag_id = t.id
          WHERE p.id = ?
          GROUP BY p.id
        `);

        const row: any = stmt.get(id);

        if (!row) {
          return null;
        }

        return {
          id: row.id,
          title: row.title,
          content: row.content,
          slug: row.slug,
          author: row.author,
          locale: row.locale,
          og_description: row.og_description || "",
          image: row.image || "",
          created_at: row.created_at,
          update_at: row.updated_at,
          tags: row.tag_names ? row.tag_names.split(",") : [],
        };
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

  async getPostBySlug(
    slug: string,
    locale?: string
  ): Promise<PostWithTags | null> {
    try {
      // For server-side calls, use SQLite directly
      if (typeof window === "undefined") {
        let query = `
          SELECT 
            p.*,
            GROUP_CONCAT(t.name) as tag_names
          FROM posts p
          LEFT JOIN post_tags pt ON p.id = pt.post_id
          LEFT JOIN tags t ON pt.tag_id = t.id
          WHERE p.slug = ?
        `;

        if (locale) {
          query += ` AND p.locale = ?`;
        }

        query += ` GROUP BY p.id`;

        const stmt = db.prepare(query);
        const row: any = locale ? stmt.get(slug, locale) : stmt.get(slug);

        if (!row) {
          return null;
        }

        return {
          id: row.id,
          title: row.title,
          content: row.content,
          slug: row.slug,
          author: row.author,
          locale: row.locale,
          og_description: row.og_description || "",
          image: row.image || "",
          created_at: row.created_at,
          update_at: row.updated_at,
          tags: row.tag_names ? row.tag_names.split(",") : [],
        };
      }

      // For client-side calls, use the API
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
      return null;
    }
  },

  async createPost(
    postData: Omit<PostWithTags, "id" | "created_at" | "update_at">
  ): Promise<PostWithTags> {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    return await response.json();
  },

  async updatePost(
    id: string,
    postData: Partial<PostWithTags>
  ): Promise<PostWithTags> {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update post");
    }

    return await response.json();
  },

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete post");
    }
  },
};
