# Members Portal — Email/Password Authentication

Build a members-only portal with email and password authentication using Supabase Auth.

## What You'll Learn
- supabase.auth.signUp for user registration
- supabase.auth.signInWithPassword for login
- supabase.auth.signOut for logout
- supabase.auth.getUser to check auth state
- Auth state management with hooks
- Protected pages and redirects

## Tech Stack
- **React Router v7** (framework mode) — pages and routing
- **Supabase** — database and auth
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

## Getting Started

```bash
# 1. Clone this repo
git clone https://github.com/LoisBN/fpp-members-auth.git
cd fpp-members-auth

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env
# Add your Supabase URL and anon key to .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Project Structure

```
fpp-members-auth/
├── app/
│   ├── routes/
│   │   ├── home.tsx          # Landing page
│   │   ├── login.tsx         # Sign in form
│   │   ├── signup.tsx        # Registration form
│   │   ├── dashboard.tsx     # Members-only dashboard
│   │   └── routes.ts         # Route definitions
│   └── lib/
│       └── supabase.ts       # Supabase client setup
├── .env.example
├── package.json
└── README.md
```

## Exercise Tasks

1. **Set up Supabase Auth** — Enable Email provider in Supabase dashboard
2. **Implement signup** — Create form that calls supabase.auth.signUp({ email, password })
3. **Implement signin** — Create form that calls supabase.auth.signInWithPassword({ email, password })
4. **Show user email** — Display current user's email on dashboard using getUser()
5. **Implement signout** — Create logout button that calls supabase.auth.signOut()

## Hints

- Enable Email provider: Supabase → Authentication → Providers → Email
- Signup: `const { data, error } = await supabase.auth.signUp({ email, password })`
- Signin: `const { data, error } = await supabase.auth.signInWithPassword({ email, password })`
- Get user: `const { data: { user } } = await supabase.auth.getUser()`
- Redirect after login: `const navigate = useNavigate()` then `navigate('/dashboard')`
- Check email confirmation if required in your Supabase settings

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
