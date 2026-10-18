# Egbo Store — Phase 1 + 2

Next.js 15 rebuild of the egbo / ground beans powder store. Purple +
chocolate theme, both products, a real cart, and two checkout paths:
WhatsApp (live today) and Paystack card payment (built, waiting on a
real account to switch on).

## Deploying (GitHub + Vercel)

1. Create a new GitHub repo and upload everything in this zip to its
   **root** — don't upload the folder itself as a subfolder. If using
   GitHub's web uploader, drag the *contents* of the extracted folder
   in, not the folder.
2. In Vercel, import that repo. Framework preset should auto-detect as
   Next.js. Leave **Root Directory** as `.` (this zip has no nested
   wrapper folder, so no adjustment should be needed this time).
3. Deploy. No environment variables are required to go live — the
   site works out of the box with WhatsApp as the only checkout path
   until card payment is switched on (see below).

## Activating card payments, when ready

Nothing below is needed yet — the site works without it. Do this once
the Paystack Starter Business account exists:

1. In the Paystack dashboard, go to Settings > API Keys & Webhooks and
   copy the secret key.
2. In Vercel, add two environment variables: `PAYSTACK_SECRET_KEY`
   (the key from step 1) and `NEXT_PUBLIC_PAYSTACK_ENABLED` set to
   `true`. Redeploy — the `NEXT_PUBLIC_` one is baked in at build time,
   so a plain restart isn't enough, it needs a new deploy.
3. Back in the Paystack dashboard, set the webhook URL to
   `https://<your-domain>/api/webhooks/paystack`. This is what
   confirms a payment even if a customer's browser never makes it back
   to the site after paying.

Once those three things are done, a "Pay with card" button appears on
checkout automatically, above the WhatsApp option. Until then, the
button simply doesn't render — nothing is broken either way.

There's no database behind this yet, so the Paystack dashboard itself
is the order record for now — every transaction carries the full
order (items, name, phone, address) in its metadata. A real
notification (email or WhatsApp message to the business the moment a
payment lands) is a reasonable next addition once that's wanted —
see `app/api/webhooks/paystack/route.js`, which is already verifying
and logging each event, just not forwarding it anywhere yet.

## Flagged — check before launch

- **WhatsApp number**: carried over from the old site
  (`lib/whatsapp.js`), but it's one digit longer than a standard
  Nigerian number, and the old file had a leftover comment reading
  *"REPLACE the href below with your actual WhatsApp number"* right
  next to it. It may never have been swapped for the real one.
  Confirm the real number, then either set it as the
  `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable in Vercel, or
  edit the fallback directly in `lib/whatsapp.js`.
- **Business name**: still showing as "With God All Things Are
  Possible" (header, footer, page title) — confirm that's staying.
- **Beans powder pricing**: every price for that product in
  `data/products.js` is a placeholder (marked `placeholder: true`
  and commented TODO). Egbo's 5 cup prices are the real ones from the
  old site.
- **Product photos**: both products currently show a drawn
  placeholder instead of a photo — see
  `public/images/ADD-PHOTOS-HERE.txt` for how to wire real ones in.

## What's in Phase 1

- Purple/chocolate design system (no third color — matches the brief)
- Both products listed, each with its own sizes and add-to-cart
- A real cart (drawer, persists in the browser) instead of static
  WhatsApp links per price tier
- Checkout page that collects name/phone/address and hands the whole
  order to WhatsApp pre-filled, instead of the old per-item links
- FAQ carried over and extended for beans powder; reviews intentionally
  left off this version rather than re-using the old placeholder ones
- Nigeria-only delivery messaging throughout — nothing claims
  international shipping yet

## What's in Phase 2

- Paystack card checkout, built the secure way: the browser never sees
  a secret key, and the price charged is recalculated server-side from
  `data/products.js` rather than trusted from the browser
  (`app/api/checkout/initialize/route.js`)
- A verify step (`app/api/checkout/verify/route.js`) and confirmation
  page (`app/checkout/success/page.js`) that double-check payment
  actually succeeded before showing "order confirmed"
- A signature-verified webhook (`app/api/webhooks/paystack/route.js`)
  so a payment still gets recorded even if the customer's browser
  never makes it back to the site
- Sits alongside WhatsApp, not instead of it — both stay available
  once card payment is switched on
- Hidden by default (no button rendered) until the three activation
  steps above are done, so there's nothing half-working to trip over
  in the meantime

## What's next (Phase 3+)

- Switch on card payment once the Paystack Starter Business account
  exists (steps above)
- A real payment notification (email or WhatsApp message) the moment
  an order comes in, instead of only the Vercel function logs
- Swap in real product photography once packaging is finalized
- Replace placeholder beans powder pricing with confirmed numbers
- Revisit international shipping once CAC/NAFDAC and a target market
  are settled
