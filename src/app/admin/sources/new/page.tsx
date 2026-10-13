import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function createSource(formData: FormData) {
  'use server'

  const name = formData.get('name') as string
  const type = formData.get('type') as string
  const url = (formData.get('url') as string) || null
  const handle = (formData.get('handle') as string) || null
  const description = (formData.get('description') as string) || null

  if (!name || !type) {
    throw new Error('Name and type are required')
  }

  await prisma.source.create({
    data: {
      name,
      type,
      url,
      handle,
      description,
      isActive: true,
    },
  })

  revalidatePath('/admin/sources')
  redirect('/admin/sources')
}

export default function NewSourcePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Source</h1>
        <p className="text-gray-500 mt-1">Website, RSS, Twitter, Telegram channel, or anything else</p>
      </div>

      <form action={createSource} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Name *</label>
          <input
            name="name"
            required
            placeholder="e.g. SecurityWeek, Krebs on Security"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Type *</label>
          <select
            name="type"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="website">Website</option>
            <option value="rss">RSS Feed</option>
            <option value="twitter">Twitter / X</option>
            <option value="telegram">Telegram (public channel)</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">URL</label>
          <input
            name="url"
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Handle (for Twitter / Telegram)</label>
          <input
            name="handle"
            placeholder="@username or channel name"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary">
            Save Source
          </button>
          <a href="/admin/sources" className="btn-secondary">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
