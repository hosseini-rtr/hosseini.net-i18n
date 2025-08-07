import { PostService } from "@/app/lib/services/post-service";
import ShareModal from "@/components/ShareModal";
import { locales } from "@/i18n";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const posts = await PostService.getAllPosts();
    const paths = [];

    // Generate paths for each post
    for (const post of posts) {
      // If the post has a specific locale, only generate that locale
      if (post.locale && locales.includes(post.locale)) {
        paths.push({
          locale: post.locale,
          id: post.id.toString(),
        });
      } else {
        // If no specific locale or invalid locale, generate for all locales
        for (const locale of locales) {
          paths.push({
            locale,
            id: post.id.toString(),
          });
        }
      }
    }

    // If no posts found, generate at least one path to prevent build failure
    if (paths.length === 0) {
      paths.push({
        locale: "en",
        id: "1",
      });
    }

    console.log(`Generated ${paths.length} static paths for blog posts`);
    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return at least the default paths to prevent build failure
    return [
      {
        locale: "en",
        id: "1",
      },
      {
        locale: "fa",
        id: "1",
      },
      {
        locale: "it",
        id: "1",
      },
    ];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; locale: string };
}): Promise<Metadata> {
  const post = await PostService.getPostById(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found",
    };
  }
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: post.title,
    description: post.og_description,
    authors: [{ name: "Seyed Hossein Hosseini" }],
    keywords: [...post.tags, post.title],
    openGraph: {
      title: post.title,
      description: post.og_description,
      type: "article",
      url: `${baseUrl}/${params.locale}/blog/${post.id}`,
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.og_description,
      images: [post.image],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${params.locale}/blog/${post.id}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const post = await PostService.getPostById(params.id);

  if (!post) {
    notFound(); // This will show your 404 page
  }

  const isFarsi = params.locale === "fa";

  return (
    <article
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header className="relative w-full h-[60vh] overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={`Cover image for ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-800 to-indigo-800" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-16">
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl"
              itemProp="headline"
            >
              {post.title}
            </h1>
            <div className="flex items-center text-gray-300 space-x-4">
              <span itemProp="author">{post.author}</span>
              <span>•</span>
              <time dateTime={post.created_at} itemProp="datePublished">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12" itemProp="articleBody">
        <div className="max-w-4xl mx-auto">
          {post.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div dangerouslySetInnerHTML={{ __html:post.content}} ></div>

          <footer className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <div>
                Last updated:{" "}
                <time dateTime={post.update_at} itemProp="dateModified">
                  {new Date(post.update_at).toLocaleDateString()}
                </time>
              </div>
              <ShareModal
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/blog/${post.id}`}
                title={post.title}
              />
            </div>
          </footer>
        </div>
      </section>
    </article>
  );
}
