import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = "https://matrimoniolowcost.it";

export const metadata: Metadata = {
  title: "Blog Matrimonio Low Cost — Consigli e Guide per Risparmiare",
  description:
    "Articoli, guide e consigli pratici per organizzare un matrimonio economico in Italia. Trucchi per risparmiare su location, catering, fotografo, fiori e molto altro.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog Matrimonio Low Cost — Consigli e Guide",
    description:
      "Guide pratiche per organizzare un matrimonio economico in Italia senza rinunciare alla qualità.",
    type: "website",
    locale: "it_IT",
    url: `${BASE_URL}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Blog Matrimonio Low Cost
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Guide pratiche e consigli per organizzare un matrimonio da sogno senza
          spendere una fortuna.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-8 last:border-b-0">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl md:text-2xl font-bold group-hover:text-rose-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("it-IT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-rose-600 font-medium group-hover:underline">
                    Leggi articolo →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 bg-rose-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Vuoi il piano completo per risparmiare?
          </h2>
          <p className="text-gray-600 mb-6">
            La Guida Tattica &ldquo;Matrimonio da €30K con €8K&rdquo; contiene
            tutto: template, checklist, calcolatore budget e timeline 12 mesi.
          </p>
          <Link
            href="/"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors"
          >
            Scopri la Guida — €19
          </Link>
        </div>
      </div>
    </main>
  );
}
