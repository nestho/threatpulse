import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-brand-700 mb-3">
              <Shield className="w-6 h-6" />
              ThreatPulse
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              Modern cybersecurity news and threat intelligence. English & Persian.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/category/malware">Malware</Link></li>
                <li><Link href="/category/vulnerabilities">Vulnerabilities</Link></li>
                <li><Link href="/category/cloud">Cloud Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/admin">Admin</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ThreatPulse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
