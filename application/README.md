# application

The ReferMate user app — a React 18 + Vite SPA deployed on Vercel. See the [root README](../README.md) for the system-level picture.

## Screens

Defined in `src/routes.tsx`; protected routes require a Clerk session.

| Route | What it does |
|---|---|
| `/login` · `/signup` · `/sso-callback` | Clerk auth — email/password or Google OAuth (requests the Gmail scope used for sending) |
| `/onboarding/basic-info` → `/professional-info` | Two-step onboarding; resume upload with optional auto-fill, then polls profile status while the worker parses |
| `/dashboard` | Outreach stats + paginated, filterable, searchable thread table |
| `/outreach/templates` → `/recipient-info` → `/preview/:id` → `/send/:id` | The 4-step wizard: pick message type → enter contact/job details → edit the AI draft → send via Gmail |
| `/outreach/view/:id` | Thread detail: full conversation, generate follow-up, mark referred/absconded, Gmail sync status |
| `/drafts` · `/profile` · `/settings` | Unsent drafts, profile editing, credits & account |

## How it's wired

- **API access** (`src/hooks/useAPIClient.ts`): a single Axios instance with interceptors — Clerk token injected per request, missing token or a `401` redirects to `/login`. No auth logic lives in components.
- **Server state**: TanStack Query v5 throughout — `src/hooks/` is organized by domain (`auth/`, `profile/`, `threads/`, `messages/`), each wrapping the raw calls in `src/services/`. Components consume hooks, never Axios.
- **Forms**: React Hook Form + Zod resolvers, mirroring the backend's Zod schemas so validation errors match on both sides.
- **Async UX**: onboarding polls the profile status machine (`PROCESSING → PARTIAL`) to reveal auto-filled fields when the resume worker finishes; thread detail surfaces granular Gmail sync errors (missing refresh token, insufficient permissions, thread deleted) with a reconnect prompt instead of a generic failure.
- **Rendering safety**: synced email HTML is sanitized with DOMPurify before display.
- **UI**: Tailwind v4 + shadcn/ui over Radix primitives; toasts via sonner.

## Run

```bash
cp .env.example .env      # fill in keys
npm i
npm run dev               # http://localhost:5173
```

Expects [outreach_backend](../outreach_backend/) at `VITE_BACKEND_BASE_URL` and a Clerk publishable key — see [.env.example](.env.example). Deployment: `vite build` + the SPA rewrite in `vercel.json`.
