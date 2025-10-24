import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "blog.db");

// Create database connection
export const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Initialize database tables
export function initializeDatabase() {
  // Users table for authentication
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Posts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      author TEXT NOT NULL,
      locale TEXT NOT NULL DEFAULT 'en',
      og_description TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tags table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Post-tags junction table
  db.exec(`
    CREATE TABLE IF NOT EXISTS post_tags (
      post_id INTEGER,
      tag_id INTEGER,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_posts_locale ON posts (locale);
    CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
    CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts (created_at);
  `);

  console.log("Database initialized successfully");
}

// Migration function to move data from JSON to SQLite
export function migrateFromJSON() {
  const fs = require("fs");
  const postsJsonPath = path.join(process.cwd(), "data", "posts.json");

  if (fs.existsSync(postsJsonPath)) {
    try {
      const jsonData = JSON.parse(fs.readFileSync(postsJsonPath, "utf8"));

      // Check if we already have data in the database
      const existingPosts = db
        .prepare("SELECT COUNT(*) as count FROM posts")
        .get() as { count: number };

      if (existingPosts.count === 0 && jsonData.length > 0) {
        console.log("Migrating data from JSON to SQLite...");

        const insertPost = db.prepare(`
          INSERT INTO posts (id, title, content, slug, author, locale, og_description, image, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const insertTag = db.prepare(`
          INSERT OR IGNORE INTO tags (name) VALUES (?)
        `);

        const getTagId = db.prepare(`
          SELECT id FROM tags WHERE name = ?
        `);

        const insertPostTag = db.prepare(`
          INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)
        `);

        const transaction = db.transaction((posts: any[]) => {
          for (const post of posts) {
            // Insert post
            insertPost.run(
              post.id,
              post.title,
              post.content,
              post.slug,
              post.author,
              post.locale || "en",
              post.og_description || "",
              post.image || "",
              post.created_at,
              post.update_at || post.created_at
            );

            // Insert tags and link them to the post
            if (post.tags && Array.isArray(post.tags)) {
              for (const tagName of post.tags) {
                insertTag.run(tagName);
                const tag = getTagId.get(tagName) as { id: number } | undefined;
                if (tag) {
                  insertPostTag.run(post.id, tag.id);
                }
              }
            }
          }
        });

        transaction(jsonData);
        console.log(`Migrated ${jsonData.length} posts from JSON to SQLite`);

        // Backup the JSON file
        fs.renameSync(postsJsonPath, postsJsonPath + ".backup");
      }
    } catch (error) {
      console.error("Error migrating from JSON:", error);
    }
  }
}

// Default admin user creation
export function createDefaultAdmin() {
  const bcrypt = require("bcryptjs");

  const existingAdmin = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get("admin");

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync("admin123", 12);

    db.prepare(
      `
      INSERT INTO users (username, password_hash, email)
      VALUES (?, ?, ?)
    `
    ).run("admin", hashedPassword, "admin@example.com");

    console.log("Default admin user created");
  }
}

// Initialize database on module import
if (typeof window === "undefined") {
  try {
    // Ensure data directory exists
    const fs = require("fs");
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    initializeDatabase();
    migrateFromJSON();
    createDefaultAdmin();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

export default db;
