import { vazirmatn } from "@/app/fonts";
import { renderContent } from "@/lib/content-parser";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useMemo } from "react";

interface BlogContentProps {
  content: string | ContentBlock[];
  className?: string;
  fallback?: ReactNode;
}

// Custom components for different HTML elements
const CustomImage = ({ src, alt, ...props }: any) => (
  <div className="my-6">
    <Image
      src={src}
      alt={alt || "Blog image"}
      width={800}
      height={400}
      className="rounded-lg shadow-lg w-full h-auto"
      {...props}
    />
  </div>
);

const CustomLink = ({ href, children, ...props }: any) => (
  <Link
    href={href}
    className="text-accent hover:text-accent/80 underline transition-colors duration-200"
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    {...props}
  >
    {children}
  </Link>
);

const CustomCode = ({ children, ...props }: any) => (
  <code
    className="bg-gray-800/50 text-gray-200 px-2 py-1 rounded text-sm font-mono border border-gray-700"
    {...props}
  >
    {children}
  </code>
);

const CustomPre = ({ children, ...props }: any) => (
  <pre
    className="bg-gray-800/50 p-4 rounded-lg overflow-x-auto border border-gray-700 my-6"
    {...props}
  >
    {children}
  </pre>
);

const CustomBlockquote = ({ children, ...props }: any) => (
  <blockquote
    className="border-l-4 border-accent pl-6 italic text-gray-300 my-6 bg-gray-800/30 py-4 rounded-r-lg"
    {...props}
  >
    {children}
  </blockquote>
);

const CustomTable = ({ children, ...props }: any) => (
  <div className="overflow-x-auto my-6">
    <table
      className="min-w-full border-collapse border border-gray-700 bg-gray-800/30 rounded-lg"
      {...props}
    >
      {children}
    </table>
  </div>
);

const CustomTh = ({ children, ...props }: any) => (
  <th
    className="border border-gray-700 px-4 py-2 text-left font-semibold text-white bg-gray-700/50"
    {...props}
  >
    {children}
  </th>
);

const CustomTd = ({ children, ...props }: any) => (
  <td className="border border-gray-700 px-4 py-2 text-gray-200" {...props}>
    {children}
  </td>
);

export default function BlogContent({
  content,
  className = "",
  fallback = <div className="text-gray-400">Content not available</div>,
}: Readonly<BlogContentProps>) {
  // Memoize the content type detection to avoid unnecessary re-renders
  const contentInfo = useMemo(() => {
    try {
      return renderContent(content);
    } catch (error) {
      console.error("Error parsing content:", error);
      return { type: "html" as const, content: "" };
    }
  }, [content]);

  // Parser options for html-react-parser
  const options: HTMLReactParserOptions = useMemo(
    () => ({
      replace: (domNode) => {
        if (domNode instanceof Element) {
          const { name, attribs, children } = domNode;

          switch (name) {
            case "img":
              return (
                <CustomImage
                  src={attribs?.src}
                  alt={attribs?.alt}
                  width={attribs?.width}
                  height={attribs?.height}
                />
              );

            case "a":
              return (
                <CustomLink href={attribs?.href}>
                  {domToReact(children as any, options)}
                </CustomLink>
              );

            case "code":
              return (
                <CustomCode>{domToReact(children as any, options)}</CustomCode>
              );

            case "pre":
              return (
                <CustomPre>{domToReact(children as any, options)}</CustomPre>
              );

            case "blockquote":
              return (
                <CustomBlockquote>
                  {domToReact(children as any, options)}
                </CustomBlockquote>
              );

            case "table":
              return (
                <CustomTable>
                  {domToReact(children as any, options)}
                </CustomTable>
              );

            case "th":
              return (
                <CustomTh>{domToReact(children as any, options)}</CustomTh>
              );

            case "td":
              return (
                <CustomTd>{domToReact(children as any, options)}</CustomTd>
              );

            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              return (
                <Element
                  name={name}
                  attribs={{
                    ...attribs,
                    className: `text-white font-bold mb-4 mt-8 first:mt-0 ${
                      name === "h1"
                        ? "text-3xl"
                        : name === "h2"
                        ? "text-2xl"
                        : name === "h3"
                        ? "text-xl"
                        : name === "h4"
                        ? "text-lg"
                        : name === "h5"
                        ? "text-base"
                        : "text-sm"
                    }`,
                  }}
                >
                  {domToReact(children as any, options)}
                </Element>
              );

            case "p":
              return (
                <Element
                  name={name}
                  attribs={{
                    ...attribs,
                    className: "mb-4 text-gray-200 leading-relaxed",
                  }}
                >
                  {domToReact(children as any, options)}
                </Element>
              );

            case "ul":
            case "ol":
              return (
                <Element
                  name={name}
                  attribs={{
                    ...attribs,
                    className: `mb-6 ${
                      name === "ul" ? "list-disc" : "list-decimal"
                    } list-inside space-y-2`,
                  }}
                >
                  {domToReact(children as any, options)}
                </Element>
              );

            case "li":
              return (
                <Element
                  name={name}
                  attribs={{
                    ...attribs,
                    className: "text-gray-200",
                  }}
                >
                  {domToReact(children as any, options)}
                </Element>
              );

            case "strong":
            case "b":
              return (
                <Element
                  name="strong"
                  attribs={{
                    ...attribs,
                    className: "font-bold text-white",
                  }}
                >
                  {domToReact(children as any, options)}
                </Element>
              );

            case "em":
            case "i":
              return (
                <Element
                  name="em"
                  attribs={{
                    ...attribs,
                    className: "italic text-gray-300",
                  }}
                >
                  {domToReact(children as any, options)}
                </Element>
              );

            case "hr":
              return <hr className="my-8 border-gray-700" />;
          }
        }
      },
    }),
    []
  );

  // Render content based on type
  const renderContentByType = () => {
    if (contentInfo.type === "structured") {
      return <StructuredBlogContent blocks={contentInfo.content} />;
    }

    // Handle HTML content
    if (typeof contentInfo.content === "string" && contentInfo.content.trim()) {
      try {
        return parse(contentInfo.content, options);
      } catch (error) {
        console.error("Error parsing HTML content:", error);
        return fallback;
      }
    }

    return fallback;
  };

  return (
    <div
      className={`prose prose-invert prose-lg max-w-none ${
        true ? vazirmatn.className : ""
      } ${className}`}
      dir={true ? "rtl" : "ltr"}
    >
      {renderContentByType()}
    </div>
  );
}

// Future-proof interface for structured JSON blocks
export interface ContentBlock {
  type: "paragraph" | "heading" | "image" | "code" | "quote" | "list" | "table";
  content: string;
  metadata?: {
    level?: number; // for headings
    language?: string; // for code blocks
    caption?: string; // for images
    items?: string[]; // for lists
    ordered?: boolean; // for lists
    data?: string[][]; // for tables
    [key: string]: any;
  };
}

// Future component for rendering structured content
export function StructuredBlogContent({
  blocks,
  className = "",
}: {
  blocks: ContentBlock[];
  className?: string;
}) {
  const locale = useLocale();
  const isFarsi = locale === "fa";

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 text-gray-200 leading-relaxed">
            {block.content}
          </p>
        );

      case "heading":
        const level = block.metadata?.level || 2;
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        const headingClasses =
          {
            1: "text-3xl",
            2: "text-2xl",
            3: "text-xl",
            4: "text-lg",
            5: "text-base",
            6: "text-sm",
          }[level] || "text-2xl";

        return (
          <Tag
            key={index}
            className={`text-white font-bold mb-4 mt-8 first:mt-0 ${headingClasses}`}
          >
            {block.content}
          </Tag>
        );

      case "image":
        return (
          <div key={index} className="my-6">
            <Image
              src={block.content}
              alt={block.metadata?.caption || "Blog image"}
              width={800}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
            {block.metadata?.caption && (
              <p className="text-center text-gray-400 text-sm mt-2">
                {block.metadata.caption}
              </p>
            )}
          </div>
        );

      case "code":
        return (
          <pre
            key={index}
            className="bg-gray-800/50 p-4 rounded-lg overflow-x-auto border border-gray-700 my-6"
          >
            <code className="text-gray-200 font-mono">{block.content}</code>
          </pre>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-accent pl-6 italic text-gray-300 my-6 bg-gray-800/30 py-4 rounded-r-lg"
          >
            {block.content}
          </blockquote>
        );

      case "list":
        const items = block.metadata?.items || [];
        const isOrdered = block.metadata?.ordered;
        const ListTag = isOrdered ? "ol" : "ul";
        const listClass = isOrdered ? "list-decimal" : "list-disc";

        return (
          <ListTag
            key={index}
            className={`mb-6 ${listClass} list-inside space-y-2`}
          >
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-200">
                {item}
              </li>
            ))}
          </ListTag>
        );

      case "table":
        const data = block.metadata?.data || [];
        if (data.length === 0) return null;

        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-700 bg-gray-800/30 rounded-lg">
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-700 px-4 py-2 text-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`prose prose-invert prose-lg max-w-none ${
        isFarsi ? vazirmatn.className : ""
      } ${className}`}
      dir={isFarsi ? "rtl" : "ltr"}
    >
      {blocks.map(renderBlock)}
    </div>
  );
}
