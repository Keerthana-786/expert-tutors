# Expert Tutors — interactive marketplace prototype

A responsive React + Vite frontend prototype using the supplied Expert Tutors logo.

## Run locally
1. Install Node.js 18+.
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run build` for a production frontend build.

## Included interactions
- Cinematic animated book intro with skip control (shown once per browser session).
- Responsive landing page, discovery feed, tutor directory and mission board.
- Search, category filters, sorting, save/bookmark missions.
- Post-a-mission modal with metadata and file selection.
- Student and tutor dashboard views, tabs, XP progression, application interactions, leaderboard and demo chat.
- Local browser persistence for posted missions, XP, applications and saved missions.

## Important production boundary
This is a functional **frontend prototype** with local demo state. It is not yet a production marketplace backend. Before real users or money are involved, integrate:
- Supabase/Firebase authentication, server-side role-based authorization and database policies.
- Private object storage with file validation, malware scanning, access control and signed URLs.
- Realtime chat/notifications and server-side deadline jobs.
- A payment provider (e.g. Razorpay/Stripe), webhooks, refunds, escrow/hold rules and auditable ledger.
- Tutor KYC/verification, admin moderation, disputes, abuse reporting and audit logs.
- Server-side validation, rate limiting, privacy/terms, academic-integrity policy and security testing.

The file input in the demo only records the selected filename in UI state; it does not upload the file. Demo chat and payment/earnings data are illustrative. Never treat browser localStorage as a trusted source for balances, roles, payments or permissions.
