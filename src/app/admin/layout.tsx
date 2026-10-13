import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Rss,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/sources', label: 'Sources', icon: Rss },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Allow login page without session
  // (we handle it in the page itself)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-brand-700">
            <Shield className="w-6 h-6" />
            ThreatPulse
          </Link>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="text-sm text-gray-500">
            {session?.user?.email || 'Not signed in'}
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </form>
            ) : (
              <Link href="/admin/login" className="text-sm text-brand-600 font-medium">
                Sign in
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
