import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

function text(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (node && typeof node === "object" && "props" in node) return text((node.props as { children?: React.ReactNode }).children);
  return "";
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");

/** Heading ids for deep links, unique within one post ("example", "example-2", …). */
function headingIds() {
  const seen = new Map<string, number>();
  return (children: React.ReactNode) => {
    const base = slugify(text(children)) || "section";
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

function components(): MDXRemoteProps["components"] {
  const id = headingIds();
  return {
    // Posts start at h2; demote stray h1s so the page keeps a single h1.
    h1: ({ children }) => <h2 id={id(children)}>{children}</h2>,
    h2: ({ children }) => <h2 id={id(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={id(children)}>{children}</h3>,
    a: ({ href = "", children }) =>
      href.startsWith("/") && !href.startsWith("//") ? (
        <Link href={href}>{children}</Link>
      ) : /^(https?:)?\/\//.test(href) ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      ),
  };
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-blog">
      <MDXRemote source={source} components={components()} />
    </div>
  );
}
