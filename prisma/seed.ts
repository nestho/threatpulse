import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding ThreatPulse...')

  const password = await hash('ThreatPulse2026!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@threatpulse.io' },
    update: {},
    create: {
      email: 'admin@threatpulse.io',
      name: 'Admin',
      password,
      role: 'admin',
    },
  })

  const categories = [
    { nameEn: 'Malware & Threats', nameFa: 'بدافزار و تهدیدات', slug: 'malware', color: '#dc2626' },
    { nameEn: 'Vulnerabilities', nameFa: 'آسیب‌پذیری‌ها', slug: 'vulnerabilities', color: '#ea580c' },
    { nameEn: 'Cloud Security', nameFa: 'امنیت ابری', slug: 'cloud', color: '#2563eb' },
    { nameEn: 'AI Security', nameFa: 'امنیت هوش مصنوعی', slug: 'ai-security', color: '#7c3aed' },
    { nameEn: 'ICS / OT', nameFa: 'سیستم‌های صنعتی', slug: 'ics-ot', color: '#059669' },
    { nameEn: 'Security Operations', nameFa: 'عملیات امنیتی', slug: 'security-ops', color: '#0891b2' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  // Sample sources
  const sources = [
    { name: 'SecurityWeek', type: 'website', url: 'https://www.securityweek.com', isActive: true },
    { name: 'The Hacker News', type: 'rss', url: 'https://feeds.feedburner.com/TheHackersNews', isActive: true },
    { name: 'BleepingComputer', type: 'website', url: 'https://www.bleepingcomputer.com', isActive: true },
    { name: 'Krebs on Security', type: 'website', url: 'https://krebsonsecurity.com', isActive: true },
  ]

  for (const s of sources) {
    const existing = await prisma.source.findFirst({ where: { name: s.name } })
    if (!existing) {
      await prisma.source.create({ data: s })
    }
  }

  console.log('Seed complete.')
  console.log('Admin login: admin@threatpulse.io / ThreatPulse2026!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
