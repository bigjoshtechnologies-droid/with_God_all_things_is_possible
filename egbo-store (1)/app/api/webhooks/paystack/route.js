import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendOrderNotification } from "@/lib/email";

// Configure this URL in the Paystack dashboard under Settings > API Keys
// & Webhooks once the account exists. Paystack calls this server-to-server
// whenever a payment event happens — this is the reliable way to know a
// payment succeeded, in case the customer's browser never makes it back
// to /checkout/success (closed tab, lost connection, etc.).
//
// Right now this only verifies the signature and logs the event (visible
// in Vercel's function logs). There's no database or email/WhatsApp
// notification wired up yet — the Paystack dashboard itself is the order
// record for now, via the metadata attached at initialize time. Adding a
// real notification here (email via Resend/SendGrid, or a WhatsApp
// Business API message) is a reasonable next step once that's wanted.

export async function POST(request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expected = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event.event === "charge.success") {
    const d = event.data;
    console.log("[paystack] payment confirmed", {
      reference: d.reference,
      amount: d.amount / 100,
      customer: d.customer?.email,
      metadata: d.metadata,
    });

    // Fire-and-forget: don't let a slow/failed email delay the response
    // Paystack is waiting on, or make a webhook retry over something
    // that already succeeded as a payment.
    sendOrderNotification({
      reference: d.reference,
      amount: d.amount / 100,
      metadata: d.metadata,
    }).catch((err) => console.error("[email] Unhandled error:", err));
  }

  // Always 200 quickly so Paystack doesn't retry unnecessarily.
  return NextResponse.json({ received: true });
}
