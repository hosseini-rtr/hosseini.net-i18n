import { vazirmatn } from "@/app/fonts";
import { PostService } from "@/app/lib/services/post-service";
import ShareModal from "@/components/ShareModal";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const posts = await PostService.getAllPosts();
    const locales = ["en", "fa", "it"];
    const paths = [];

    for (const post of posts) {
      // Generate paths for all locales since we want the page to be available in all languages
      for (const locale of locales) {
        paths.push({
          locale,
          id: post.id.toString(),
        });
      }
    }

    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return at least the default English paths to prevent build failure
    return [
      {
        locale: "en",
        id: "1",
      },
    ];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
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
      url: `${baseUrl}/${post.locale}/blog/${post.id}`,
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
      canonical: `${baseUrl}/${post.locale}/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await PostService.getPostById(params.id);

  if (!post) {
    notFound(); // This will show your 404 page
  }

  const isFarsi = post.locale === "fa";

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

          <div
            className={`prose prose-invert prose-lg max-w-none headings:mb-6 p:mb-6 li:mb-2 ul:mb-6 ol:mb-6 blockquote:mb-6 pre:mb-6 img:mb-6 hr:mb-6 table:mb-6 code:bg-gray-800 code:px-2 code:py-1 code:rounded code:text-sm pre:bg-gray-800/50 pre:p-4 pre:rounded-lg blockquote:border-l-4 blockquote:border-accent blockquote:pl-6 blockquote:italic blockquote:text-gray-300 strong:text-white/90 em:text-white/90 ${
              isFarsi ? vazirmatn.className : ""
            }`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <div>
                Last updated:{" "}
                <time dateTime={post.update_at} itemProp="dateModified">
                  {new Date(post.update_at).toLocaleDateString()}
                </time>
              </div>
              <ShareModal
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/${post.locale}/blog/${post.id}`}
                title={post.title}
              />
            </div>
          </footer>
        </div>
      </section>
    </article>
  );
}
