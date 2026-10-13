# ThreatPulse

Modern bilingual (English + Persian) cybersecurity news platform.

Inspired by SecurityWeek, rebuilt with a clean Material-inspired design, full admin panel, flexible sources (website, RSS, Twitter/X, Telegram public channels), and Postgres.

## Features

- Public news site (latest, featured, categories, search)
- Dual-language articles (title/content in EN + FA)
- Flexible Sources: website / rss / twitter / telegram / other
- Full Admin Panel with dashboard stats & charts
- Ready for Vercel + Postgres (Neon recommended)

## Quick Start (Local)

```bash
git clone https://github.com/nestho/threatpulse.git
cd threatpulse
npm install

# Copy env and fill DATABASE_URL (Neon free tier works great)
cp .env.example .env

# Push schema
npx prisma db push

# Seed admin + sample data (optional)
npm run db:seed

npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/admin  
Default admin after seed: `admin@threatpulse.io` / `ThreatPulse2026!`

## Deploy to Vercel

1. Push this repo to GitHub (already done).
2. Import project in Vercel.
3. Add environment variables:
   - `DATABASE_URL` (Neon / Vercel Postgres)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = your production domain
4. Deploy.

After first deploy run `npx prisma db push` via Vercel CLI or a one-time script.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth.js
- Recharts (dashboard)

## Roadmap (next steps)

- [ ] Automatic RSS ingestion
- [ ] Language switcher + next-intl polish
- [ ] Image upload (Vercel Blob / S3)
- [ ] Auto-translate button (OpenAI)
- [ ] Public API
- [ ] Dark mode

---

Built for real-world use. Keep it simple, keep it fast.
