# QurbaniHat — Livestock Booking Platform

A modern Qurbani livestock marketplace built with Next.js App Router, Better Auth, MongoDB Atlas, Tailwind CSS, and React.

## Main Features

- Home page with unique Farm Mela design
- All animals listing from `public/animals.json`
- Price sorting
- Protected animal details page
- Booking form with toast only, no DB/localStorage save
- Better Auth email/password login and registration
- Optional Google login
- MongoDB Atlas authentication database
- My Profile and Update Profile pages
- Responsive navbar and footer

## Quick Start

```bash
npm install
npm run setup-env
npm run test-db
npm run dev
```

Open:

```text
http://localhost:3000
```

## Very Easy MongoDB Setup

This project supports simple env fields. You do not need to manually build the full MongoDB URI.

In `.env.local`:

```env
MONGODB_USERNAME=your-atlas-database-username
MONGODB_PASSWORD=your-atlas-database-password
MONGODB_CLUSTER_HOST=cluster0.xxxxx.mongodb.net
MONGODB_DATABASE=qurbanihat
```

The project will automatically build:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER/qurbanihat?retryWrites=true&w=majority
```

Password special characters are automatically encoded.

## Required Env

```env
BETTER_AUTH_SECRET=your-generated-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

MONGODB_USERNAME=your-atlas-database-username
MONGODB_PASSWORD=your-atlas-database-password
MONGODB_CLUSTER_HOST=cluster0.xxxxx.mongodb.net
MONGODB_DATABASE=qurbanihat
MONGODB_URI=

NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=false
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Generate Better Auth secret:

```bash
npm run secret
```

## Test MongoDB

```bash
npm run test-db
```

Success output:

```text
MongoDB connected successfully
Test document inserted
```

## MongoDB Atlas Network Access

For local testing:

```text
Atlas → Security → Network Access → Add IP Address → 0.0.0.0/0
```

Wait 2–5 minutes before testing.

## Routes

Public:

- `/`
- `/animals`
- `/login`
- `/register`

Protected:

- `/details-page/[id]`
- `/my-profile`
- `/my-profile/update`

## Vercel Deployment

Add these environment variables in Vercel:

```env
BETTER_AUTH_SECRET=same-secret
BETTER_AUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
MONGODB_USERNAME=your-atlas-database-username
MONGODB_PASSWORD=your-atlas-database-password
MONGODB_CLUSTER_HOST=cluster0.xxxxx.mongodb.net
MONGODB_DATABASE=qurbanihat
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=false
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

For Vercel, keep MongoDB Atlas Network Access properly configured.


