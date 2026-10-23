// Server-side only. Sends the order-notification email via Resend's API
// with plain fetch — no SDK needed, same approach as lib/paystack.js.
//
// IMPORTANT setup detail: until a custom domain is verified in Resend,
// email can only be sent FROM "onboarding@resend.dev" TO the exact email
// address the Resend account itself was signed up with. So for this to
// work with zero setup, sign up for Resend using the same address that
// should receive order notifications (ORDER_NOTIFICATION_EMAIL below).
// Once a real domain exists, both of those restrictions lift.

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ORDER_NOTIFICATION_EMAIL);
}

export async function sendOrderNotification({ reference, amount, metadata }) {
  if (!isEmailConfigured()) {
    console.log("[email] Skipped — RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL not set.");
    return;
  }

  const items = metadata?.items || [];
  const itemLines = items
    .map((i) => `<li>${i.product} (${i.variant}) × ${i.qty}</li>`)
    .join("");

  const html = `
    <h2>New paid order — ₦${amount.toLocaleString("en-NG")}</h2>
    <p><strong>Customer:</strong> ${metadata?.customer_name || "—"}</p>
    <p><strong>Phone:</strong> ${metadata?.customer_phone || "—"}</p>
    <p><strong>Delivery address:</strong> ${metadata?.delivery_address || "—"}${metadata?.delivery_city ? ", " + metadata.delivery_city : ""}</p>
    ${metadata?.notes ? `<p><strong>Notes:</strong> ${metadata.notes}</p>` : ""}
    <p><strong>Items:</strong></p>
    <ul>${itemLines}</ul>
    <p style="color:#777;font-size:13px;">Paystack reference: ${reference}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Egbo Store <onboarding@resend.dev>",
        to: process.env.ORDER_NOTIFICATION_EMAIL,
        subject: `New order — ₦${amount.toLocaleString("en-NG")} from ${metadata?.customer_name || "a customer"}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[email] Resend send failed:", res.status, body);
    } else {
      console.log("[email] Order notification sent.");
    }
  } catch (err) {
    // Never let an email failure break the webhook response to Paystack.
    console.error("[email] Send error:", err.message);
  }
}
