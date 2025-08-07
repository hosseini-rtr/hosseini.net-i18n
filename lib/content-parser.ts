import { ContentBlock } from "@/components/BlogContent";

/**
 * Utility function to convert HTML content to structured JSON blocks
 * This can be used for future migration when the backend starts providing structured content
 */
export function htmlToStructuredBlocks(htmlContent: string): ContentBlock[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const blocks: ContentBlock[] = [];

  // Helper function to extract text content
  const extractText = (element: Element): string => {
    return element.textContent?.trim() || "";
  };

  // Helper function to extract attributes
  const extractAttributes = (element: Element): Record<string, string> => {
    const attrs: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      attrs[attr.name] = attr.value;
    }
    return attrs;
  };

  // Process each child node
  Array.from(doc.body.children).forEach((element) => {
    const tagName = element.tagName.toLowerCase();

    switch (tagName) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        blocks.push({
          type: "heading",
          content: extractText(element),
          metadata: {
            level: parseInt(tagName.charAt(1)),
          },
        });
        break;

      case "p":
        const text = extractText(element);
        if (text) {
          blocks.push({
            type: "paragraph",
            content: text,
          });
        }
        break;

      case "img":
        const attrs = extractAttributes(element);
        blocks.push({
          type: "image",
          content: attrs.src || "",
          metadata: {
            caption: attrs.alt || "",
            width: attrs.width,
            height: attrs.height,
          },
        });
        break;

      case "pre":
        const codeElement = element.querySelector("code");
        if (codeElement) {
          blocks.push({
            type: "code",
            content: extractText(codeElement),
            metadata: {
              language:
                codeElement.className.replace("language-", "") || "text",
            },
          });
        } else {
          blocks.push({
            type: "code",
            content: extractText(element),
          });
        }
        break;

      case "blockquote":
        blocks.push({
          type: "quote",
          content: extractText(element),
        });
        break;

      case "ul":
      case "ol":
        const items = Array.from(element.querySelectorAll("li")).map((li) =>
          extractText(li)
        );
        blocks.push({
          type: "list",
          content: "",
          metadata: {
            items,
            ordered: tagName === "ol",
          },
        });
        break;

      case "table":
        // This is a simplified table parser - you might want to enhance it
        const rows = Array.from(element.querySelectorAll("tr"));
        const tableData = rows.map((row) =>
          Array.from(row.querySelectorAll("td, th")).map((cell) =>
            extractText(cell)
          )
        );
        blocks.push({
          type: "table",
          content: "",
          metadata: {
            data: tableData,
          },
        });
        break;

      case "hr":
        // Skip horizontal rules for now, or add a separator block type
        break;

      default:
        // For any other elements, treat as paragraph
        const defaultText = extractText(element);
        if (defaultText) {
          blocks.push({
            type: "paragraph",
            content: defaultText,
          });
        }
        break;
    }
  });

  return blocks;
}

/**
 * Utility function to convert structured blocks back to HTML
 * Useful for backward compatibility or when you need to convert structured content to HTML
 */
export function structuredBlocksToHtml(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${escapeHtml(block.content)}</p>`;

        case "heading":
          const level = block.metadata?.level || 2;
          return `<h${level}>${escapeHtml(block.content)}</h${level}>`;

        case "image":
          const caption = block.metadata?.caption
            ? ` alt="${escapeHtml(block.metadata.caption)}"`
            : "";
          const width = block.metadata?.width
            ? ` width="${block.metadata.width}"`
            : "";
          const height = block.metadata?.height
            ? ` height="${block.metadata.height}"`
            : "";
          return `<img src="${block.content}"${caption}${width}${height} />`;

        case "code":
          const language = block.metadata?.language
            ? ` class="language-${block.metadata.language}"`
            : "";
          return `<pre><code${language}>${escapeHtml(
            block.content
          )}</code></pre>`;

        case "quote":
          return `<blockquote>${escapeHtml(block.content)}</blockquote>`;

        case "list":
          const items = block.metadata?.items || [];
          const tag = block.metadata?.ordered ? "ol" : "ul";
          const listItems = items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("");
          return `<${tag}>${listItems}</${tag}>`;

        case "table":
          // This is a simplified table renderer
          const data = block.metadata?.data || [];
          if (data.length === 0) return "";

          const tableRows = data
            .map((row) => {
              const cells = row
                .map((cell) => `<td>${escapeHtml(cell)}</td>`)
                .join("");
              return `<tr>${cells}</tr>`;
            })
            .join("");

          return `<table>${tableRows}</table>`;

        default:
          return "";
      }
    })
    .join("\n");
}

/**
 * Helper function to escape HTML special characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Type guard to check if content is structured blocks
 */
export function isStructuredContent(
  content: string | ContentBlock[]
): content is ContentBlock[] {
  return Array.isArray(content);
}

/**
 * Smart content renderer that can handle both HTML strings and structured blocks
 */
export function renderContent(content: string | ContentBlock[]): {
  type: "html" | "structured";
  content: string | ContentBlock[];
} {
  if (isStructuredContent(content)) {
    return { type: "structured", content };
  }

  // Check if the string looks like JSON (simple heuristic)
  if (content.trim().startsWith("[") && content.trim().endsWith("]")) {
    try {
      const parsed = JSON.parse(content);
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => item.type && item.content)
      ) {
        return { type: "structured", content: parsed };
      }
    } catch {
      // Not valid JSON, treat as HTML
    }
  }

  return { type: "html", content };
}
