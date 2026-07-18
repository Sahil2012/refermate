# landing

The ReferMate marketing site — React 19 + Vite, live at [refermate.novacraftsai.com](https://refermate.novacraftsai.com/). See the [root README](../README.md) for the system-level picture.

Single-page layout composed of sections in [src/pages/home/](src/pages/home/) — hero, demo, features, how-it-works, benefits, pricing, CTA. All copy, feature lists, and pricing tiers live as data in [src/data/landing-data.ts](src/data/landing-data.ts), so messaging changes are data edits, not component edits.

Built with the same UI system as the app (Tailwind v4 + shadcn/ui) for visual consistency.

## Run

```bash
npm i
npm run dev
```

Set `VITE_APP_URL` in `.env` to point the sign-in / get-started buttons at the [application](../application/) deployment. Build with `npm run build` (type-checks via `tsc -b` first).
