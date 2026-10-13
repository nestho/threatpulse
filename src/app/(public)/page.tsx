import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 12,
      include: {
        category: true,
        source: true,
      },
    })
    return articles
  } catch {
    return []
  }
}

export default async function HomePage() {
  const articles = await getArticles()

  const featured = articles.filter((a) => a.featured).slice(0, 3)
  const latest = articles.slice(0, 8)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <section className="mb-12">
        <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            ThreatPulse
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-2xl">
            Modern cybersecurity news & threat intelligence. English + Persian.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Featured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="card overflow-hidden group"
              >
                {article.coverImage && (
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  {article.category && (
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${article.category.color}20`, color: article.category.color }}
                    >
                      {article.category.nameEn}
                    </span>
                  )}
                  <h3 className="mt-3 font-semibold text-lg leading-snug group-hover:text-brand-600 transition-colors">
                    {article.titleEn}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {article.excerptEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Latest News</h2>
        </div>

        {latest.length === 0 ? (
          <div className="card p-12 text-center text-gray-500">
            <p className="text-lg">No articles yet.</p>
            <p className="mt-2 text-sm">Go to Admin Panel and publish your first story.</p>
            <Link href="/admin" className="btn-primary mt-6 inline-flex">
              Open Admin
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {latest.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="card p-5 flex gap-5 group hover:border-brand-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    {article.category && (
                      <span className="font-medium text-brand-600">
                        {article.category.nameEn}
                      </span>
                    )}
                    {article.publishedAt && (
                      <span>{formatDate(article.publishedAt)}</span>
                    )}
                    {article.source && (
                      <span className="truncate">via {article.source.name}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-brand-600 transition-colors">
                    {article.titleEn}
                  </h3>
                  {article.excerptEn && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {article.excerptEn}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
