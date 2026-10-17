# Egbo Store — Phase 1

Next.js 15 rebuild of the egbo / ground beans powder store. Purple +
chocolate theme, both products, working cart, checkout hands off to
WhatsApp (Paystack checkout is Phase 2, once the account exists).

## Deploying (GitHub + Vercel)

1. Create a new GitHub repo and upload everything in this zip to its
   **root** — don't upload the folder itself as a subfolder. If using
   GitHub's web uploader, drag the *contents* of the extracted folder
   in, not the folder.
2. In Vercel, import that repo. Framework preset should auto-detect as
   Next.js. Leave **Root Directory** as `.` (this zip has no nested
   wrapper folder, so no adjustment should be needed this time).
3. Deploy. No environment variables are required for Phase 1 — the
   site works out of the box.

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

## What's next (Phase 2+)

- Wire Paystack in directly once the Starter Business account exists,
  as a second payment option alongside the WhatsApp/bank-transfer flow
- Swap in real product photography once packaging is finalized
- Replace placeholder beans powder pricing with confirmed numbers
- Revisit international shipping once CAC/NAFDAC and a target market
  are settled
