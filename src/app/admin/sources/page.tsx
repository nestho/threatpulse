import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Globe, Rss, Twitter, MessageCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

const typeIcon: Record<string, any> = {
  website: Globe,
  rss: Rss,
  twitter: Twitter,
  telegram: MessageCircle,
  other: Globe,
}

async function getSources() {
  try {
    return await prisma.source.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { articles: true } } },
    })
  } catch {
    return []
  }
}

export default async function SourcesPage() {
  const sources = await getSources()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sources</h1>
          <p className="text-gray-500 mt-1">Manage websites, RSS, Twitter, Telegram channels...</p>
        </div>
        <Link href="/admin/sources/new" className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add Source
        </Link>
      </div>

      <div className="card overflow-hidden">
        {sources.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No sources yet.</p>
            <Link href="/admin/sources/new" className="btn-primary mt-4 inline-flex">
              Add your first source
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">URL / Handle</th>
                <th className="px-5 py-3 font-medium">Articles</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sources.map((s) => {
                const Icon = typeIcon[s.type] || Globe
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium">{s.name}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 capitalize">
                        <Icon className="w-4 h-4 text-gray-400" />
                        {s.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600 truncate max-w-xs">
                      {s.url || s.handle || '—'}
                    </td>
                    <td className="px-5 py-3">{s._count.articles}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {s.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
