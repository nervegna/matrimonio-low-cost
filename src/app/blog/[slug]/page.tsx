import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = "https://matrimoniolowcost.it";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — Matrimonio Low Cost`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "it_IT",
      url: `${BASE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

function markdownToHtml(md: string): string {
  const html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl md:text-4xl font-bold mb-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-rose-600 underline hover:text-rose-700">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    // Paragraphs
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<hr") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol")) {
        return trimmed;
      }
      return `<p class="text-gray-700 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const contentHtml = markdownToHtml(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Tommaso Nervegna",
    },
    publisher: {
      "@type": "Organization",
      name: "Matrimonio Low Cost",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="text-rose-600 hover:underline text-sm font-medium"
            >
              ← Torna al blog
            </Link>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("it-IT", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>di Tommaso Nervegna</span>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="mt-16 bg-rose-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Vuoi risparmiare migliaia di euro sul tuo matrimonio?
            </h2>
            <p className="text-gray-600 mb-6">
              La Guida Tattica contiene tutte le strategie, template email,
              checklist e calcolatore budget per il tuo matrimonio low cost.
            </p>
            <Link
              href="/"
              className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors"
            >
              Scarica la Guida — €19
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
