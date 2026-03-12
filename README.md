# Members Portal — Email/Password Authentication

Build a members-only portal with email and password authentication using Supabase Auth.

## What You'll Learn

- `supabase.auth.signUp` for user registration
- `supabase.auth.signInWithPassword` for login
- `supabase.auth.signOut` for logout
- `supabase.auth.getUser` to check auth state
- Protected pages and redirects

## Tech Stack

- **React Router v7** (framework mode) — pages and routing
- **Supabase** — database and auth
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

---

## Exercise: Step-by-Step Instructions

> **Read each step carefully.** We tell you exactly _where_ to do each thing — your VSCode terminal, the Supabase dashboard, a specific file, or Claude.

---

### Step 1: Clone the repository

> 📍 **Where:** Your VSCode terminal (`` Ctrl + ` `` to open it)

```bash
cd ~/Desktop
git clone https://github.com/LoisBN/fpp-members-auth.git
cd fpp-members-auth
code .
```

---

### Step 2: Install dependencies

> 📍 **Where:** Your VSCode terminal

```bash
npm install
```

---

### Step 3: Set up your environment file

> 📍 **Where:** Your VSCode terminal

**On Mac/Linux:**
```bash
cp .env.example .env
```

**On Windows (Command Prompt):**
```bash
copy .env.example .env
```

**On Windows (PowerShell):**
```bash
Copy-Item .env.example .env
```

> 📍 **Where:** VSCode — open the `.env` file

Replace the placeholder values with your Supabase credentials:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> 💡 **Where do I find these?** Supabase dashboard → your project → **Settings** (gear icon) → **API**. Copy "Project URL" and the "anon public" key.

---

### Step 4: Enable Email authentication in Supabase

> 📍 **Where:** Your browser — Supabase Dashboard

This step is done entirely in the Supabase dashboard (no code needed):

1. Go to your Supabase project
2. In the left sidebar, click **"Authentication"** (the person icon)
3. Click **"Providers"** in the top menu
4. Find **"Email"** in the list — it should already be enabled by default
5. **Important:** For this exercise, turn **OFF** "Confirm email" (toggle it off). This makes testing easier — users can sign up and log in immediately without checking their email.
6. Click **"Save"**

> 💡 **What just happened?** You configured Supabase to allow users to sign up and log in with email and password. Supabase handles all the password hashing and session management for you!

---

### Step 5: Start the app

> 📍 **Where:** Your VSCode terminal

```bash
npm run dev
```

> 📍 **Where:** Your browser

Open [http://localhost:5173](http://localhost:5173). You should see a landing page with links to Sign Up and Log In pages.

---

### Step 6: Implement the signup page

> 📍 **Where:** VSCode — open `app/routes/signup.tsx`

Find this file: `app` → `routes` → `signup.tsx`.

Your job is to write a function that:
1. Gets the email and password from the form
2. Calls `supabase.auth.signUp({ email, password })`
3. Handles errors (e.g. password too short)
4. Redirects to the dashboard on success

> 💡 **Ask Claude!** Try: *"I need to implement a signup form in React Router v7 that calls supabase.auth.signUp with email and password. Show me the action function and how to handle errors."*

---

### Step 7: Implement the login page

> 📍 **Where:** VSCode — open `app/routes/login.tsx`

Similar to signup, but uses a different Supabase method:

1. Gets the email and password from the form
2. Calls `supabase.auth.signInWithPassword({ email, password })`
3. Handles errors (e.g. wrong password)
4. Redirects to the dashboard on success

> 💡 **Ask Claude!** Try: *"I need to implement a login form that calls supabase.auth.signInWithPassword. Show me the action function."*

---

### Step 8: Show the user's email on the dashboard

> 📍 **Where:** VSCode — open `app/routes/dashboard.tsx`

The dashboard page should:
1. Check if a user is logged in using `supabase.auth.getUser()`
2. If not logged in, redirect to the login page
3. If logged in, display the user's email

> 💡 **Ask Claude!** Try: *"How do I use supabase.auth.getUser() in a React Router v7 loader to check if someone is logged in, and redirect to /login if they're not?"*

---

### Step 9: Implement logout

> 📍 **Where:** VSCode — still in `app/routes/dashboard.tsx`

Add a "Sign Out" button that:
1. Calls `supabase.auth.signOut()`
2. Redirects back to the home page

> 💡 **Ask Claude!** Try: *"How do I add a logout button in React that calls supabase.auth.signOut() and redirects to the home page?"*

---

### Step 10: Test your work

> 📍 **Where:** Your browser — [http://localhost:5173](http://localhost:5173)

1. Go to the **Sign Up** page and create an account (use any email and a password of 6+ characters)
2. After signing up, you should be redirected to the **Dashboard** and see your email displayed
3. Click **Sign Out** — you should be redirected to the home page
4. Go to the **Log In** page and sign in with the same email/password
5. You should be back on the Dashboard

> 📍 **Where:** Supabase Dashboard → Authentication → Users

Check the **Authentication** section of your Supabase dashboard. You should see the user you just created!

---

### Step 11: Commit and push your work

> 📍 **Where:** Your VSCode terminal

```bash
git add .
git commit -m "Implement email auth with signup, login, and logout"
git push
```

---

## Ask Claude for Help

- **"What's the difference between signUp and signInWithPassword?"** — signUp creates a new account, signIn logs into an existing one
- **"How do I protect a page so only logged-in users can see it?"**
- **"How do I redirect the user after they log in?"**
- **"My signup says 'User already registered' — what do I do?"** — Use the login page instead, or delete the user in Supabase dashboard
- **"I'm getting this error: [paste error]. What's wrong?"**

---

## Project Structure

```
app/
├── routes/
│   ├── home.tsx          ← Landing page with links (no need to edit)
│   ├── signup.tsx        ← ⭐ SIGN UP — implement signUp here!
│   ├── login.tsx         ← ⭐ LOG IN — implement signInWithPassword here!
│   └── dashboard.tsx     ← ⭐ DASHBOARD — show user info and logout button!
└── lib/
    └── supabase.ts       ← Supabase client setup (no need to edit)
```

---

## Troubleshooting

**"Invalid login credentials" error:**
- Make sure you signed up first before trying to log in
- Check that the email and password match exactly

**Signup seems to work but nothing happens:**
- Make sure "Confirm email" is turned OFF in Supabase (Step 4)
- Check the browser console (`F12` → Console) for errors

**Dashboard doesn't show the user email:**
- Make sure your loader calls `supabase.auth.getUser()` and passes the user data to the component

**"npm install" fails:**
- Make sure you have Node.js version 18+ installed. Check with `node --version`

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
