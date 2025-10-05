export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Blog CMS API",
    version: "1.0.0",
    description:
      "A professional blog CMS API with authentication and full CRUD operations",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Post: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Unique identifier for the post",
          },
          title: {
            type: "string",
            description: "Post title",
          },
          content: {
            type: "string",
            description: "Post content in HTML or JSON format",
          },
          slug: {
            type: "string",
            description: "URL-friendly version of the title",
          },
          author: {
            type: "string",
            description: "Post author name",
          },
          locale: {
            type: "string",
            enum: ["en", "fa", "it"],
            description: "Post language locale",
          },
          og_description: {
            type: "string",
            description: "Meta description for social media",
          },
          image: {
            type: "string",
            description: "Featured image URL",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Post tags",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Post creation timestamp",
          },
          update_at: {
            type: "string",
            format: "date-time",
            description: "Post last update timestamp",
          },
        },
        required: ["title", "content", "slug", "author"],
      },
      PostInput: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Post title",
          },
          content: {
            type: "string",
            description: "Post content",
          },
          slug: {
            type: "string",
            description: "URL-friendly slug (auto-generated if not provided)",
          },
          author: {
            type: "string",
            description: "Post author name",
            default: "Admin",
          },
          locale: {
            type: "string",
            enum: ["en", "fa", "it"],
            description: "Post language locale",
            default: "en",
          },
          og_description: {
            type: "string",
            description: "Meta description for social media",
          },
          image: {
            type: "string",
            description: "Featured image URL",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Post tags",
          },
        },
        required: ["title", "content"],
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Unique identifier for the user",
          },
          username: {
            type: "string",
            description: "Username",
          },
          email: {
            type: "string",
            format: "email",
            description: "User email address",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "User creation timestamp",
          },
        },
      },
      LoginCredentials: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "Username",
          },
          password: {
            type: "string",
            description: "Password",
          },
        },
        required: ["username", "password"],
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
        },
      },
    },
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "auth-token",
      },
    },
  },
  paths: {
    "/api/posts": {
      get: {
        summary: "Get all posts",
        description:
          "Retrieve a list of all blog posts, optionally filtered by locale",
        parameters: [
          {
            name: "locale",
            in: "query",
            description: "Filter posts by language locale",
            required: false,
            schema: {
              type: "string",
              enum: ["en", "fa", "it"],
            },
          },
        ],
        responses: {
          "200": {
            description: "List of posts retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Post",
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new post",
        description: "Create a new blog post",
        security: [
          {
            cookieAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PostInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Post created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
          "400": {
            description: "Bad request - invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/posts/{id}": {
      get: {
        summary: "Get post by ID",
        description: "Retrieve a specific blog post by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Post ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Post retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
          "404": {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update post by ID",
        description: "Update an existing blog post",
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Post ID",
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PostInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Post updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
          "400": {
            description: "Bad request - invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete post by ID",
        description: "Delete an existing blog post",
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Post ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Post deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                    deletedPost: {
                      $ref: "#/components/schemas/Post",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "User login",
        description: "Authenticate user and create session",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginCredentials",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        summary: "User logout",
        description: "Logout user and clear session",
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Logout successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/verify": {
      get: {
        summary: "Verify authentication",
        description: "Check if user is authenticated",
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Authentication verified",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    authenticated: {
                      type: "boolean",
                    },
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Not authenticated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
};
