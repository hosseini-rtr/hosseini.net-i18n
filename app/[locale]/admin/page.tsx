"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Eye,
  FileText,
  Loader2,
  LogOut,
  Plus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  username: string;
  role: string;
}

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  recentPosts: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Check authentication and load dashboard data
  useEffect(() => {
    let isMounted = true;

    const checkAuthAndLoadData = async () => {
      try {
        // Check if user is authenticated
        const authResponse = await fetch("/api/auth/verify");
        if (!authResponse.ok && isMounted) {
          router.push(`/${locale}/login`);
          return;
        }

        const authData = await authResponse.json();
        if (!authData.authenticated && isMounted) {
          router.push(`/${locale}/login`);
          return;
        }

        if (isMounted) {
          setUser(authData.user);
        }

        // Load dashboard statistics
        const postsResponse = await fetch("/api/posts");
        if (postsResponse.ok && isMounted) {
          const posts = await postsResponse.json();
          const totalPosts = posts.length;
          const publishedPosts = posts.length; // All posts are published in our simple system
          const draftPosts = 0; // We don't have drafts yet
          const recentPosts = posts.slice(0, 5); // Get 5 most recent posts

          setStats({
            totalPosts,
            publishedPosts,
            draftPosts,
            recentPosts,
          });
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        if (isMounted) {
          setError("Failed to load dashboard data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuthAndLoadData();

    return () => {
      isMounted = false;
    };
  }, [router, locale]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                CMS Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, <strong>{user?.username}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalPosts || 0}</div>
              <p className="text-xs text-muted-foreground">
                All published content
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.publishedPosts || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Live on the website
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.draftPosts || 0}</div>
              <p className="text-xs text-muted-foreground">Work in progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might want to perform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href={`/${locale}/admin/create-post`}>
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
              <Link href={`/${locale}/admin/posts`}>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Manage Posts
                </Button>
              </Link>
              <Link href={`/${locale}/blog`}>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View Blog
                </Button>
              </Link>
              <Link href={`/${locale}/api-docs`}>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  API Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest content updates</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.recentPosts && stats.recentPosts.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()} •{" "}
                          {post.locale.toUpperCase()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/${locale}/blog/${post.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No posts yet. Create your first post!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Version:</span> 1.0.0
              </div>
              <div>
                <span className="font-medium">Environment:</span>{" "}
                {process.env.NODE_ENV || "development"}
              </div>
              <div>
                <span className="font-medium">Current Locale:</span>{" "}
                {locale.toUpperCase()}
              </div>
              <div>
                <span className="font-medium">User Role:</span>{" "}
                {user?.role || "admin"}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
