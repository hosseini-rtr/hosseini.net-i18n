"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ApiEndpoint {
  method: string;
  path: string;
  summary: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
  }>;
  requestBody?: {
    description: string;
    schema: string;
  };
  responses: Array<{
    code: string;
    description: string;
  }>;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/posts",
    summary: "Get all posts",
    description:
      "Retrieve a list of all blog posts, optionally filtered by locale",
    parameters: [
      {
        name: "locale",
        type: "string",
        description: "Filter posts by language locale (en, fa, it)",
        required: false,
      },
    ],
    responses: [
      { code: "200", description: "List of posts retrieved successfully" },
      { code: "500", description: "Internal server error" },
    ],
  },
  {
    method: "POST",
    path: "/api/posts",
    summary: "Create a new post",
    description: "Create a new blog post (requires authentication)",
    requestBody: {
      description: "Post data",
      schema: "PostInput",
    },
    responses: [
      { code: "201", description: "Post created successfully" },
      { code: "400", description: "Bad request - invalid input" },
      { code: "401", description: "Unauthorized - authentication required" },
      { code: "500", description: "Internal server error" },
    ],
  },
  {
    method: "GET",
    path: "/api/posts/{id}",
    summary: "Get post by ID",
    description: "Retrieve a specific blog post by its ID",
    parameters: [
      {
        name: "id",
        type: "integer",
        description: "Post ID",
        required: true,
      },
    ],
    responses: [
      { code: "200", description: "Post retrieved successfully" },
      { code: "404", description: "Post not found" },
      { code: "500", description: "Internal server error" },
    ],
  },
  {
    method: "PUT",
    path: "/api/posts/{id}",
    summary: "Update post by ID",
    description: "Update an existing blog post (requires authentication)",
    parameters: [
      {
        name: "id",
        type: "integer",
        description: "Post ID",
        required: true,
      },
    ],
    requestBody: {
      description: "Updated post data",
      schema: "PostInput",
    },
    responses: [
      { code: "200", description: "Post updated successfully" },
      { code: "400", description: "Bad request - invalid input" },
      { code: "401", description: "Unauthorized - authentication required" },
      { code: "404", description: "Post not found" },
      { code: "500", description: "Internal server error" },
    ],
  },
  {
    method: "DELETE",
    path: "/api/posts/{id}",
    summary: "Delete post by ID",
    description: "Delete an existing blog post (requires authentication)",
    parameters: [
      {
        name: "id",
        type: "integer",
        description: "Post ID",
        required: true,
      },
    ],
    responses: [
      { code: "200", description: "Post deleted successfully" },
      { code: "401", description: "Unauthorized - authentication required" },
      { code: "404", description: "Post not found" },
      { code: "500", description: "Internal server error" },
    ],
  },
  {
    method: "POST",
    path: "/api/auth/login",
    summary: "User login",
    description: "Authenticate user and create session",
    requestBody: {
      description: "Login credentials",
      schema: "LoginCredentials",
    },
    responses: [
      { code: "200", description: "Login successful" },
      { code: "401", description: "Invalid credentials" },
      { code: "500", description: "Internal server error" },
    ],
  },
  {
    method: "POST",
    path: "/api/auth/logout",
    summary: "User logout",
    description: "Logout user and clear session",
    responses: [{ code: "200", description: "Logout successful" }],
  },
  {
    method: "GET",
    path: "/api/auth/verify",
    summary: "Verify authentication",
    description: "Check if user is authenticated",
    responses: [
      { code: "200", description: "Authentication verified" },
      { code: "401", description: "Not authenticated" },
    ],
  },
];

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-green-100 text-green-800";
    case "POST":
      return "bg-blue-100 text-blue-800";
    case "PUT":
      return "bg-yellow-100 text-yellow-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getResponseColor = (code: string) => {
  if (code.startsWith("2")) return "bg-green-100 text-green-800";
  if (code.startsWith("4")) return "bg-yellow-100 text-yellow-800";
  if (code.startsWith("5")) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

export default function ApiDocsPage() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleTryEndpoint = (endpoint: ApiEndpoint) => {
    const url = `${baseUrl}${endpoint.path}`;
    if (endpoint.method === "GET") {
      window.open(url, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      alert(`URL copied to clipboard: ${url}`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Blog CMS API Documentation
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Professional REST API for the Blog Content Management System
          </p>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Version 1.0.0
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              JSON API
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Cookie Authentication
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Get started with the Blog CMS API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Base URL</h4>
                  <code className="px-3 py-1 rounded text-sm">
                    {baseUrl || "http://localhost:3000"}
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Authentication</h4>
                  <p className="text-gray-600 text-sm">
                    Login at <code>/api/auth/login</code> to receive
                    authentication cookies. Protected endpoints require valid
                    authentication.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Default Credentials</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-sm">
                      <strong>Username:</strong> admin
                      <br />
                      <strong>Password:</strong> admin123
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white-900">API Endpoints</h2>

          {API_ENDPOINTS.map((endpoint, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`${getMethodColor(
                        endpoint.method
                      )} font-mono text-xs`}
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-lg font-semibold text-sky-300">
                      {endpoint.path}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTryEndpoint(endpoint)}
                  >
                    {endpoint.method === "GET" ? "Try it" : "Copy URL"}
                  </Button>
                </div>
                <CardTitle className="text-xl">{endpoint.summary}</CardTitle>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-gray-600">
                      Parameters
                    </h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="border rounded p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="text-sm font-mono border-white px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <Badge
                              variant={
                                param.required ? "destructive" : "secondary"
                              }
                              className="text-xs"
                            >
                              {param.required ? "required" : "optional"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {param.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {param.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {endpoint.requestBody && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-gray-600">
                      Request Body
                    </h4>
                    <div className="border rounded p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {endpoint.requestBody.schema}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {endpoint.requestBody.description}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-gray-600">
                    Responses
                  </h4>
                  <div className="space-y-2">
                    {endpoint.responses.map((response, responseIndex) => (
                      <div
                        key={responseIndex}
                        className="flex items-center space-x-3"
                      >
                        <Badge
                          className={`${getResponseColor(
                            response.code
                          )} font-mono text-xs`}
                        >
                          {response.code}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {response.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Data Schemas</CardTitle>
              <CardDescription>
                Common data structures used in the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">PostInput Schema</h4>
                  <div className="rounded p-4">
                    <pre className="text-sm text-white-800 overflow-x-auto">
                      {`{
                        "title": "string (required)",
                        "content": "string (required)",
                        "slug": "string (optional, auto-generated)",
                        "author": "string (default: 'Admin')",
                        "locale": "string (en|fa|it, default: 'en')",
                        "og_description": "string (optional)",
                        "image": "string (optional)",
                        "tags": ["string"] (optional)
                        }`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">
                    LoginCredentials Schema
                  </h4>
                  <div className="bg-gray-50 rounded p-4">
                    <pre className="text-sm text-gray-800">
                      {`{
  "username": "string (required)",
  "password": "string (required)"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
