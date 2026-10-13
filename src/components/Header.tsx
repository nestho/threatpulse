'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, Shield } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/category/malware', label: 'Malware' },
  { href: '/category/vulnerabilities', label: 'Vulnerabilities' },
  { href: '/category/cloud', label: 'Cloud' },
  { href: '/category/ai-security', label: 'AI Security' },
  { href: '/category/ics-ot', label: 'ICS/OT' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
            <Shield className="w-7 h-7" />
            <span>ThreatPulse</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-brand-600">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-gray-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
