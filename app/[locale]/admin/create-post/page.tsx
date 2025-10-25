"use client";

import { PostService } from "@/app/lib/services/post-service";
import AuthGuard from "@/components/AuthGuard";
import ErrorBoundary from "@/components/ErrorBoundary";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Checklist from "@editorjs/checklist";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface BlogPostForm {
  title: string;
  og_description: string;
  content: any;
  tags: string[];
  slug: string;
  image: string;
}

function CreatePostPageContent() {
  const t = useTranslations("Admin");
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const editorRef = useRef<EditorJS>();
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [post, setPost] = useState<BlogPostForm>({
    title: "",
    og_description: "",
    content: null,
    tags: [],
    slug: "",
    image: "",
  });

  useEffect(() => {
    // Authentication is handled by cookies automatically
    // No need to check localStorage

    // Capture the container reference early
    const container = editorContainerRef.current;

    // Initialize Editor.js
    const initializeEditor = async () => {
      // Add a small delay to ensure DOM is ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (container && !editorRef.current) {
        try {
          // Clear the container first
          container.innerHTML = "";

          editorRef.current = new EditorJS({
            holder: container,
            tools: {
              header: Header,
              list: List,
              checklist: Checklist,
              quote: Quote,
              marker: Marker,
              code: CodeTool,
              delimiter: Delimiter,
              inlineCode: InlineCode,
              linkTool: {
                class: LinkTool,
                config: {
                  endpoint: "/api/fetch-link",
                },
              },
              image: {
                class: ImageTool,
                config: {
                  endpoints: {
                    byFile: "/api/upload-image",
                    byUrl: "/api/fetch-image",
                  },
                },
              },
              table: Table,
              embed: {
                class: Embed,
                config: {
                  services: {
                    youtube: true,
                    coub: true,
                  },
                },
              },
            },
            placeholder: "Start writing your blog post...",
            onChange: async () => {
              if (editorRef.current) {
                try {
                  const outputData = await editorRef.current.save();
                  setPost((prev) => ({ ...prev, content: outputData }));
                } catch (error) {
                  console.error("Error saving editor content:", error);
                }
              }
            },
          });
        } catch (error) {
          console.error("Editor.js initialization error:", error);
        }
      }
    };
    initializeEditor();

    return () => {
      if (editorRef.current) {
        try {
          if (typeof editorRef.current.destroy === "function") {
            editorRef.current.destroy();
          }
        } catch (error) {
          console.error("Editor cleanup error:", error);
        } finally {
          editorRef.current = undefined;
        }
      }

      // Also clear the container using the captured reference
      if (container) {
        try {
          container.innerHTML = "";
        } catch (error) {
          console.error("Container cleanup error:", error);
        }
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Get the content from Editor.js
      let contentData = post.content;
      if (editorRef.current) {
        contentData = await editorRef.current.save();
      }

      // Generate slug if not provided
      const slug =
        post.slug ||
        post.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");

      const postData = {
        title: post.title,
        content: JSON.stringify(contentData),
        og_description: post.og_description,
        tags: post.tags,
        slug: slug,
        image: post.image,
        locale: locale,
        author: "Admin",
      };

      const createdPost = await PostService.createPost(postData);

      if (createdPost) {
        setSuccess("Blog post created successfully!");
        setTimeout(() => {
          router.push(`/${locale}/admin/posts`);
        }, 2000);
      } else {
        setError("Failed to create blog post.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create blog post.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setPost((prev) => ({ ...prev, tags }));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <LogoutButton />
          </div>
          <h1 className="text-3xl font-bold">
            {t("createPost", { defaultValue: "Create New Blog Post" })}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>
                Basic information about your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  {t("title", { defaultValue: "Title" })}
                </label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder={t("titlePlaceholder", {
                    defaultValue: "Enter post title",
                  })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="og_description" className="text-sm font-medium">
                  {t("description", { defaultValue: "Meta Description" })}
                </label>
                <Textarea
                  id="og_description"
                  value={post.og_description}
                  onChange={(e) =>
                    setPost((prev: BlogPostForm) => ({
                      ...prev,
                      og_description: e.target.value,
                    }))
                  }
                  placeholder={t("descriptionPlaceholder", {
                    defaultValue: "Enter meta description for SEO",
                  })}
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">
                  URL Slug
                </label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) =>
                    setPost((prev: BlogPostForm) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  placeholder="url-friendly-slug (optional)"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Featured Image URL
                </label>
                <Input
                  id="image"
                  value={post.image}
                  onChange={(e) =>
                    setPost((prev: BlogPostForm) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/image.jpg"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium">
                  {t("tags", { defaultValue: "Tags" })}
                </label>
                <Input
                  id="tags"
                  value={post.tags.join(", ")}
                  onChange={handleTagsChange}
                  placeholder={t("tagsPlaceholder", {
                    defaultValue: "Enter tags separated by commas",
                  })}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Write your blog post content using the editor below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={editorContainerRef}
                className="min-h-[500px] border rounded-lg p-4"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("saving", { defaultValue: "Saving..." })}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t("save", { defaultValue: "Save Post" })}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <AuthGuard>
      <ErrorBoundary>
        <CreatePostPageContent />
      </ErrorBoundary>
    </AuthGuard>
  );
}
