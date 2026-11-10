# score tracker

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/insane20230111-1371s-projects/v0-mahjong-score-tracker)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/cv1i3UWEGwT)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/insane20230111-1371s-projects/v0-mahjong-score-tracker](https://vercel.com/insane20230111-1371s-projects/v0-mahjong-score-tracker)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/cv1i3UWEGwT](https://v0.app/chat/cv1i3UWEGwT)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
## Neon backend

Set the variables in `.env.example` through the deployment environment. Database
credentials, authentication secrets, and mail keys must stay in local ignored
files or Vercel's sensitive environment settings. `NEXT_PUBLIC_BACKEND=neon`
selects Neon Postgres, Better Auth, the application's row-level-security API,
and database-backed avatar storage. Existing bcrypt password hashes and user
UUIDs are retained. Resend delivers verification, reset, and invitation emails.

Run `pnpm exec tsc --noEmit` and `pnpm build` before deployment. Migration and
verification utilities are under `scripts/migration`; they use local credentials
and keep database snapshots inside `.git`, outside source control and deployment
uploads. `restore_neon.py` is an initial staging restore and replaces the target
public schema; do not rerun it against a live application database.
