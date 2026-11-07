# CoinTransfer

Admin console for FC coin suppliers — move coins safely from **sender accounts**
(accounts that hold coins) to **client order accounts**. The platform only
**handles the transfer**; it does not sell coins.

Built as a **static site** (HTML + CSS + vanilla JS, no build step, no backend).
State persists in the browser via `localStorage`, so it can be hosted anywhere —
GitHub Pages, Cloudflare Pages, Netlify, or opened straight from disk.

## Pages

| Page | What it does |
|------|--------------|
| **Orders** | Client coin orders: account, amount, platform, coins-from, progress, tax, payout. Actions: copy info link, start transfer, edit, delivered daily, correct price, split, complete, delete |
| **Senders** | Supplier accounts that hold coins: account, platform, group, priority, take/keep limits, coins, taken. Actions: refresh balance, edit, enable/disable, correct cost, coins taken, group taken, reset start, reset taken |
| **Funds** | Add USDT balance (TRC20 / ERC20 / BEP20 addresses with copy), reserve amount, full deposit history with TxID |
| **Admin** | Global transfer rate, payment networks + addresses, platform buy rates, fee, minimum order, support contact, deposit instructions, console account generation |

## Pricing model

- **One global transfer rate** (default $0.50 / 100k) that the admin sets and
  applies to every order — clients pay you at that rate.
- Suppliers are paid separately using the **buy rates** in Admin.
- Every order's payout is shown live in the Add order modal.

## Sign-in

Accounts are **administrator-generated** — there is no public registration.
Only the admin creates sign-ins (Admin → Console accounts → Generate account).
Two roles exist:

- `admin` — sees Senders, Orders, Funds **and** Admin
- `sender` — sees Senders, Orders and Funds

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

- No real credentials are stored — the account fields are internal references.
- All data is client-side. Clearing browser storage resets the console to the
  seeded demo data.
- CoinTransfer only moves coins between accounts; it does not supply them.
