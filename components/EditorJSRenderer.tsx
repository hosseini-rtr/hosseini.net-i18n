"use client";

import { vazirmatn } from "@/app/fonts";
import parse from "html-react-parser";
import { useLocale } from "next-intl";
import Image from "next/image";

interface EditorJSData {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}

interface EditorJSBlock {
  id: string;
  type: string;
  data: any;
}

interface EditorJSRendererProps {
  content: string | EditorJSData;
  className?: string;
}

export default function EditorJSRenderer({
  content,
  className = "",
}: EditorJSRendererProps) {
  const locale = useLocale();
  const isFarsi = locale === "fa";

  // Parse content if it's a string and validate it's Editor.js format
  let editorData: EditorJSData;

  try {
    if (typeof content === "string") {
      // Try to parse as JSON
      const parsed = JSON.parse(content);

      // Check if it's Editor.js format (has blocks array)
      if (parsed && Array.isArray(parsed.blocks)) {
        editorData = parsed;
      } else {
        // Not Editor.js format, create a simple paragraph block
        editorData = {
          time: Date.now(),
          blocks: [
            {
              id: "legacy-content",
              type: "paragraph",
              data: {
                text: content,
              },
            },
          ],
          version: "2.29.0",
        };
      }
    } else {
      editorData = content;
    }
  } catch (error) {
    // If JSON parsing fails, it's plain text - wrap it in a paragraph block
    console.warn("Content is not valid Editor.js JSON, treating as plain text");
    editorData = {
      time: Date.now(),
      blocks: [
        {
          id: "legacy-content",
          type: "paragraph",
          data: {
            text: typeof content === "string" ? content : "",
          },
        },
      ],
      version: "2.29.0",
    };
  }

  const renderBlock = (block: EditorJSBlock) => {
    const { id, type, data } = block;

    switch (type) {
      case "header":
        const HeadingTag = `h${data.level || 2}` as keyof JSX.IntrinsicElements;
        const level = (data.level || 2) as 1 | 2 | 3 | 4 | 5 | 6;
        const headingSize = {
          1: "text-4xl md:text-5xl",
          2: "text-3xl md:text-4xl",
          3: "text-2xl md:text-3xl",
          4: "text-xl md:text-2xl",
          5: "text-lg md:text-xl",
          6: "text-base md:text-lg",
        }[level];

        return (
          <HeadingTag
            key={id}
            className={`font-bold text-white mb-6 mt-10 first:mt-0 ${headingSize}`}
          >
            {parse(data.text)}
          </HeadingTag>
        );

      case "paragraph":
        return (
          <p key={id} className="mb-6 text-gray-200 leading-relaxed text-lg">
            {parse(data.text)}
          </p>
        );

      case "list":
        const ListTag = data.style === "ordered" ? "ol" : "ul";
        const listStyle =
          data.style === "ordered" ? "list-decimal" : "list-disc";

        return (
          <ListTag
            key={id}
            className={`mb-6 ${listStyle} ${
              isFarsi ? "list-inside mr-6" : "list-inside ml-6"
            } space-y-3`}
          >
            {data.items.map((item: string, index: number) => (
              <li key={index} className="text-gray-200 text-lg">
                {parse(item)}
              </li>
            ))}
          </ListTag>
        );

      case "checklist":
        return (
          <ul key={id} className="mb-6 space-y-3">
            {data.items.map((item: any, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="mt-1 h-5 w-5 rounded border-gray-600 bg-gray-800 text-accent focus:ring-accent"
                />
                <span className="text-gray-200 text-lg flex-1">
                  {parse(item.text)}
                </span>
              </li>
            ))}
          </ul>
        );

      case "quote":
        return (
          <blockquote
            key={id}
            className={`border-${isFarsi ? "r" : "l"}-4 border-accent ${
              isFarsi ? "pr-6" : "pl-6"
            } italic text-gray-300 my-8 bg-gray-800/30 py-6 rounded-${
              isFarsi ? "l" : "r"
            }-lg`}
          >
            <p className="text-xl mb-2">{parse(data.text)}</p>
            {data.caption && (
              <footer className="text-sm text-gray-400 not-italic mt-2">
                — {data.caption}
              </footer>
            )}
          </blockquote>
        );

      case "code":
        return (
          <pre
            key={id}
            className="bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-700 my-6"
          >
            <code className="text-gray-200 font-mono text-sm">{data.code}</code>
          </pre>
        );

      case "delimiter":
        return (
          <div key={id} className="flex justify-center my-10">
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
            </div>
          </div>
        );

      case "image":
        return (
          <figure key={id} className="my-8">
            <div className="relative w-full overflow-hidden rounded-lg">
              <Image
                src={data.file.url}
                alt={data.caption || "Blog image"}
                width={1200}
                height={630}
                className={`w-full h-auto ${
                  data.withBorder ? "border-2 border-gray-700" : ""
                } ${data.stretched ? "max-w-full" : "max-w-3xl mx-auto"} ${
                  data.withBackground ? "bg-gray-800 p-4" : ""
                }`}
              />
            </div>
            {data.caption && (
              <figcaption className="text-center text-gray-400 text-sm mt-3">
                {data.caption}
              </figcaption>
            )}
          </figure>
        );

      case "table":
        return (
          <div key={id} className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-gray-700 bg-gray-800/30 rounded-lg">
              <tbody>
                {data.content.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => {
                      const isHeader = data.withHeadings && rowIndex === 0;
                      const CellTag = isHeader ? "th" : "td";

                      return (
                        <CellTag
                          key={cellIndex}
                          className={`border border-gray-700 px-4 py-3 text-${
                            isFarsi ? "right" : "left"
                          } ${
                            isHeader
                              ? "font-semibold text-white bg-gray-700/50"
                              : "text-gray-200"
                          }`}
                        >
                          {parse(cell)}
                        </CellTag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "linkTool":
        return (
          <div
            key={id}
            className="my-6 border border-gray-700 rounded-lg p-4 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="font-semibold text-white mb-1">
                {data.meta?.title || data.link}
              </p>
              {data.meta?.description && (
                <p className="text-gray-400 text-sm">{data.meta.description}</p>
              )}
            </a>
          </div>
        );

      case "embed":
        return (
          <div key={id} className="my-8">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
              <iframe
                src={data.embed}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {data.caption && (
              <p className="text-center text-gray-400 text-sm mt-3">
                {data.caption}
              </p>
            )}
          </div>
        );

      default:
        console.warn(`Unknown block type: ${type}`, data);
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
      {editorData.blocks.map(renderBlock)}
    </div>
  );
}
