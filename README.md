# Click A Yoga — Studio Ops

A live, shared studio management app: customers, packages, trainers, scheduling,
payments, and tiered commission — synced in real time across everyone who's signed in.

## 1. Create your free Supabase project (the live database)

1. Go to https://supabase.com → sign up → "New project". Pick any name/region, set a database password (save it somewhere safe).
2. Once it's created, go to **SQL Editor → New query**, paste in the contents of `supabase-schema.sql` (in this folder), and click **Run**. This creates the 5 tables and turns on real-time sync.
3. Go to **Project Settings → API**. Copy the **Project URL** and the **anon public** key — you'll need both next.
4. Go to **Authentication → Users → Add user** and create one login (email + password) for each of your 3 staff members. That's their sign-in for the app — no separate signup screen needed.

## 2. Add your keys

Copy `.env.example` to a new file named `.env`, and fill in the two values from step 1.3:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Run it locally (optional, to test before publishing)

```
npm install
npm run dev
```

## 4. Publish it live (Vercel — free)

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com → sign up → **Add New → Project** → import that repo.
3. In the Vercel project settings, add the same two environment variables from step 2 (**Settings → Environment Variables**).
4. Deploy. You'll get a live URL like `click-a-yoga.vercel.app` (or connect a custom domain in Vercel's domain settings if you'd like one).

## 5. Install it as a phone app

On each staff member's phone, open the live URL in the browser:
- **iPhone (Safari):** tap Share → "Add to Home Screen"
- **Android (Chrome):** tap the menu (⋮) → "Add to Home screen" / "Install app"

It'll appear as an app icon and open full-screen like a native app — schedule changes made by any of the 3 signed-in staff show up for the others in real time.

## Notes

- All 3 staff accounts see and edit the same shared data — there's no per-person data separation, since this is one studio.
- Supabase's free tier comfortably covers 3 users and typical studio volume. If you ever outgrow it, Supabase Pro is $25/month.
- The app deliberately doesn't cache data offline (see `public/sw.js`) — it always shows the live schedule, not a stale cached one.
