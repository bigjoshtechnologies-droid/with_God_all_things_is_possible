// Server-side only — never import this from a "use client" component.
// Talks to Paystack's REST API directly with plain fetch, no SDK needed.

const PAYSTACK_BASE = "https://api.paystack.co";

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error(
      "PAYSTACK_SECRET_KEY is not set. Add it in Vercel's environment " +
        "variables once the Paystack account exists — see .env.example."
    );
  }
  return key;
}

export function isPaystackConfigured() {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export async function initializeTransaction({ email, amountKobo, reference, callbackUrl, metadata }) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountKobo, // Paystack expects the smallest currency unit (kobo)
      reference,
      callback_url: callbackUrl,
      metadata,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Paystack initialize failed");
  }
  return data.data; // { authorization_url, access_code, reference }
}

export async function verifyTransaction(reference) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Paystack verify failed");
  }
  return data.data; // { status: "success" | "failed" | ..., amount, metadata, ... }
}
