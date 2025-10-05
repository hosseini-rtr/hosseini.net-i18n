"use client";

import { PostService } from "@/app/lib/services/post-service";
import AuthGuard from "@/components/AuthGuard";
import LogoutButton from "@/components/LogoutButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types/TPost";
import { Edit, Eye, Loader2, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostsPageContent() {
  const t = useTranslations("Admin");
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await PostService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const success = await PostService.deletePost(postId);

      if (success) {
        // Remove the post from the list
        setPosts(posts.filter((post) => post.id.toString() !== postId));
      } else {
        setError("Failed to delete post.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete post.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {t("posts", { defaultValue: "Blog Posts" })}
          </h1>
          <div className="flex gap-2">
            <Button onClick={() => router.push("/admin/create-post")}>
              <Plus className="mr-2 h-4 w-4" />
              {t("createPost", { defaultValue: "Create Post" })}
            </Button>
            <LogoutButton />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No posts found</p>
              <Button onClick={() => router.push("/admin/create-post")}>
                <Plus className="mr-2 h-4 w-4" />
                Create your first post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {post.title}
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {post.locale.toUpperCase()}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {post.og_description || "No description available"}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/edit-post/${post.id}`)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/blog/${post.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id.toString())}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    <p>Created: {formatDate(post.created_at)}</p>
                    <p>Updated: {formatDate(post.update_at)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PostsPage() {
  return (
    <AuthGuard>
      <PostsPageContent />
    </AuthGuard>
  );
}
