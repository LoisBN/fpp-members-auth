# Members Portal — Email/Password Authentication

Build a members-only portal with signup, login, and logout using Supabase Auth.

## Quick Start

**1. Fork this repo** — Click the **Fork** button at the top right of this page.

**2. Clone your fork:**
```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/fpp-members-auth.git
cd fpp-members-auth
npm install
```

Create `.env` with your Supabase credentials, then `npm run dev`.

**Important:** In Supabase Dashboard → Authentication → Providers → Email, turn OFF "Confirm email" for easier testing.

## Exercise Instructions

This repo is part of the **From Prompt to Production** course.

👉 **[Find the full exercise instructions on the course platform](https://aicode-academy.com)**

## Tech Stack

- React Router v7 (framework mode)
- Supabase Auth
- Tailwind CSS v4
- TypeScript

## Project Structure

```
app/
├── routes/
│   ├── home.tsx          ← Landing page
│   ├── signup.tsx        ← Sign up form + action
│   ├── login.tsx         ← Login form + action
│   └── dashboard.tsx     ← Members content + logout
├── lib/
│   └── supabase.ts       ← Supabase client
└── routes.ts             ← Route configuration
```

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
