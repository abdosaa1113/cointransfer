# CoinTransfer

Admin console for FC coin suppliers — manage sender (coin-holding) accounts,
client orders, delivery progress and payouts from one place.

Built as a **static site** (HTML + CSS + vanilla JS, no build step, no backend).
State persists in the browser via `localStorage`, so it can be hosted anywhere —
GitHub Pages, Cloudflare Pages, Netlify, or opened straight from disk.

## Pages

| Page | What it does |
|------|--------------|
| **Senders** | Register supplier accounts (platform, stock, coins taken, group, priority, buy rate), edit/delete, filter, export CSV |
| **Orders** | Log client orders, track delivery progress, advance status, filter by state, export CSV |
| **Admin** | Payment networks (USDT TRC20 / ERC20 / BEP20 addresses + enable/disable), platform fee, minimum order, support contact, payout instructions, and console account generation |

## Sign-in

Accounts are **administrator-generated** — there is no public registration.
Only the admin can create sign-ins (Admin → Console accounts → Generate account).
Two roles exist:

- `admin` — sees Senders, Orders **and** Admin
- `sender` — sees Senders and Orders only

Default bootstrap account: `admin` / `admin123` — **change it after first login.**

## Run locally

Just open `index.html` in a browser (no server required).

Or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Files

```
index.html     markup shell (login + app)
styles.css     theme and layout
app.js         state, rendering, routing, modals
logo.svg       brand mark
*.png          platform icons (PlayStation / Xbox / PC)
```

## Notes

- No real credentials are stored. The sender "account" field is an internal
  handle/reference, not a login.
- All data is client-side. Clearing browser storage resets the console to the
  seeded demo data.
