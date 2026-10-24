# Egbo Store

Next.js 15 store for egbo and ground beans powder. Purple + chocolate
theme, a real cart, two checkout paths (WhatsApp and Paystack card
payment), order email alerts, and refund/privacy policy pages.

This is the whole project, always. Every update from here replaces
this same folder completely — there's no separate "phase" zip to
track or merge.

## Deploying (GitHub + Vercel)

1. Extract this zip. Upload **everything inside it** to the GitHub
   repo's root — select all the extracted folders/files together and
   drag them in at once, not one at a time. GitHub will show existing
   files as updated and new ones as added.
2. In Vercel: Settings → General → **Root Directory** should be
   empty/blank, pointing at the actual repo root — not a subfolder
   name. (This exact setting was the cause of a long stretch of
   "nothing I change seems to work" earlier — if anything ever stops
   updating again, this is the first thing to check.)
3. Deployments → Redeploy. No environment variables are required to
   go live — WhatsApp works as the checkout path out of the box.

## Turning on optional features

Nothing below is needed for the site to work — each one stays off
until its variables are set in Vercel, and turning one on never
breaks the others.

**Card payment** (`PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_ENABLED`) —
confirmed working end to end already. For real money: once the real
Paystack Starter Business account exists, swap the test secret key for
the live one and set the live webhook URL in the Paystack dashboard
the same way the test one was set.

**Order email alerts** (`RESEND_API_KEY`, `ORDER_NOTIFICATION_EMAIL`) —
sends an email the moment a card payment succeeds, so an order
doesn't just sit unnoticed in the Paystack dashboard.
1. Create a free account at resend.com, using whichever email address
   should *receive* order notifications — that detail matters, see
   below.
2. Resend dashboard → API Keys → create one → that's `RESEND_API_KEY`.
3. Set `ORDER_NOTIFICATION_EMAIL` to that **same** email address you
   signed up with. Until a custom domain is verified in Resend, their
   free sender (`onboarding@resend.dev`) can only deliver to the
   account's own signup address — that's a Resend rule, not a
   limitation of this code. Once a real domain exists, this can point
   anywhere and send from a proper address instead.
4. Redeploy.

## Flagged — still open

- **Business name**: still "With God All Things Are Possible" —
  confirm that's staying.
- **Beans powder pricing**: every price in `data/products.js` for
  that product is a placeholder (marked `placeholder: true`). Egbo's
  5 cup prices are the real ones from the old site.
- **Product photos**: both products show a drawn placeholder — see
  `public/images/ADD-PHOTOS-HERE.txt`.
- **Policy pages** (`app/refund-policy/page.js`, `app/privacy/page.js`):
  reasonable plain-language drafts matching what the code actually
  does, not written or reviewed by a lawyer. Fine to launch with as
  is for a business this size — worth a professional look later if
  the business grows enough for it to matter.

## What's built

- Purple/chocolate design system, both products, real cart (persists
  in the browser), checkout
- WhatsApp checkout — live by default, no setup needed
- Paystack card checkout — price recalculated server-side (never
  trusts the browser), payment double-verified (redirect + signed
  webhook), hidden until its variables are set
- Order email alerts on successful payment, off until its variables
  are set
- Refund/returns and privacy policy pages, linked from the footer and
  from checkout
- Nigeria-only delivery messaging throughout — nothing claims
  international shipping yet

## What's next

- Switch card payment from test to live once her Paystack account exists
- Swap in real product photography once packaging is finalized
- Replace placeholder beans powder pricing with confirmed numbers
- Revisit international shipping once CAC/NAFDAC and a target market
  are settled
- A real domain, once ready — current one works fine but a custom
  domain reads as more trustworthy for a stranger about to enter a
  card number
