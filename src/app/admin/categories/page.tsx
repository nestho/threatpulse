import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { nameEn: 'asc' },
      include: { _count: { select: { articles: true } } },
    })
  } catch {
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-gray-500 mt-1">English + Persian names</p>
      </div>

      <div className="card overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No categories yet. Run the seed script.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">English</th>
                <th className="px-5 py-3 font-medium">Persian</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Articles</th>
                <th className="px-5 py-3 font-medium">Color</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-3 font-medium">{c.nameEn}</td>
                  <td className="px-5 py-3 dir-rtl">{c.nameFa}</td>
                  <td className="px-5 py-3 text-gray-500">{c.slug}</td>
                  <td className="px-5 py-3">{c._count.articles}</td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-block w-5 h-5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
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
