import { NextResponse } from "next/server";
import { verifyTransaction, isPaystackConfigured } from "@/lib/paystack";

export async function GET(request) {
  if (!isPaystackConfigured()) {
    return NextResponse.json({ error: "Card payment isn't set up yet." }, { status: 503 });
  }

  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  try {
    const data = await verifyTransaction(reference);
    return NextResponse.json({
      status: data.status, // "success" | "failed" | "abandoned" ...
      amount: data.amount / 100,
      reference: data.reference,
      metadata: data.metadata,
      paidAt: data.paid_at,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not verify payment." }, { status: 502 });
  }
}
