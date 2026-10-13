import { prisma } from '@/lib/prisma'
import { FileText, Eye, Rss, FolderOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const [articles, published, sources, categories, totalViews] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: 'published' } }),
      prisma.source.count(),
      prisma.category.count(),
      prisma.article.aggregate({ _sum: { views: true } }),
    ])

    const recent = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        titleEn: true,
        status: true,
        views: true,
        createdAt: true,
      },
    })

    return {
      articles,
      published,
      sources,
      categories,
      totalViews: totalViews._sum.views || 0,
      recent,
    }
  } catch {
    return {
      articles: 0,
      published: 0,
      sources: 0,
      categories: 0,
      totalViews: 0,
      recent: [],
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Articles', value: stats.articles, icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Published', value: stats.published, icon: FileText, color: 'bg-green-50 text-green-600' },
    { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'bg-purple-50 text-purple-600' },
    { label: 'Sources', value: stats.sources, icon: Rss, color: 'bg-orange-50 text-orange-600' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, color: 'bg-pink-50 text-pink-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of ThreatPulse</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-semibold mb-4">Recent Articles</h2>
        {stats.recent.length === 0 ? (
          <p className="text-sm text-gray-500">No articles yet. Create your first one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Views</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recent.map((a) => (
                  <tr key={a.id}>
                    <td className="py-3 font-medium">{a.titleEn}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.status === 'published'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3">{a.views}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
