import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ThreatPulse | Cybersecurity News',
    template: '%s | ThreatPulse',
  },
  description: 'Modern bilingual cybersecurity news, threat intelligence and analysis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
