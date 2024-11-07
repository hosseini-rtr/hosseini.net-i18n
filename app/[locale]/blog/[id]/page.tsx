import { notFound } from "next/navigation";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
};

async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await fetchBlogPost(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
