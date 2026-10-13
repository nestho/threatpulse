import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        source: true,
      },
    })
  } catch {
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="text-gray-500 mt-1">Manage all news and analysis</p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="card overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No articles yet.</p>
            <Link href="/admin/articles/new" className="btn-primary mt-4 inline-flex">
              Write the first article
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Views</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/articles/${a.id}`} className="font-medium hover:text-brand-600">
                      {a.titleEn}
                    </Link>
                    {a.titleFa && (
                      <div className="text-xs text-gray-400 mt-0.5 dir-rtl">{a.titleFa}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {a.category?.nameEn || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">{a.views}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
