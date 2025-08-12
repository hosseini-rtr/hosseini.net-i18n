"use client";

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
import axios from "axios";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface BlogPost {
  title: string;
  description: string;
  content: any;
  tags: string[];
  published: boolean;
}

function CreatePostPageContent() {
  const t = useTranslations("Admin");
  const router = useRouter();
  const editorRef = useRef<EditorJS>();
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [post, setPost] = useState<BlogPost>({
    title: "",
    description: "",
    content: null,
    tags: [],
    published: false,
  });

  useEffect(() => {
    // Authentication is handled by cookies automatically
    // No need to check localStorage

    // Initialize Editor.js
    if (editorContainerRef.current && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
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
        placeholder: "Let's write something amazing!",
        onChange: async () => {
          if (editorRef.current) {
            const outputData = await editorRef.current.save();
            setPost((prev) => ({ ...prev, content: outputData }));
          }
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current = undefined;
      }
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Get the content from Editor.js
      if (editorRef.current) {
        const outputData = await editorRef.current.save();
        setPost((prev) => ({ ...prev, content: outputData }));
      }

      const response = await axios.post(
        "https://api.datamdynamics.com/api/posts", // Adjust this endpoint as needed
        {
          ...post,
          content: JSON.stringify(post.content),
        },
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      setSuccess("Blog post created successfully!");
      setTimeout(() => {
        router.push("/admin/posts");
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create blog post."
      );
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
                <label htmlFor="description" className="text-sm font-medium">
                  {t("description", { defaultValue: "Description" })}
                </label>
                <Textarea
                  id="description"
                  value={post.description}
                  onChange={(e) =>
                    setPost((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder={t("descriptionPlaceholder", {
                    defaultValue: "Enter post description",
                  })}
                  required
                  disabled={isLoading}
                  rows={3}
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

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={post.published}
                  onChange={(e) =>
                    setPost((prev) => ({
                      ...prev,
                      published: e.target.checked,
                    }))
                  }
                  disabled={isLoading}
                  className="rounded"
                />
                <label htmlFor="published" className="text-sm font-medium">
                  {t("published", { defaultValue: "Publish immediately" })}
                </label>
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
      <CreatePostPageContent />
    </AuthGuard>
  );
}
