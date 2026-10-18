import { NextResponse } from "next/server";
import { findVariant } from "@/data/products";
import { initializeTransaction, isPaystackConfigured } from "@/lib/paystack";

export async function POST(request) {
  if (!isPaystackConfigured()) {
    return NextResponse.json(
      { error: "Card payment isn't set up yet — the Paystack account/keys aren't configured." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { items, customer } = body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }
  if (!customer?.email || !customer?.name || !customer?.phone || !customer?.address) {
    return NextResponse.json({ error: "Missing required customer details." }, { status: 400 });
  }

  // Recompute the total server-side from our own product data — never
  // trust a price or total sent from the browser.
  let amountNaira = 0;
  const lineItems = [];
  for (const line of items) {
    const found = findVariant(line.variantId);
    const qty = Number(line.qty);
    if (!found || !Number.isInteger(qty) || qty < 1) {
      return NextResponse.json({ error: `Invalid cart item: ${line?.variantId}` }, { status: 400 });
    }
    const { product, variant } = found;
    amountNaira += variant.price * qty;
    lineItems.push({
      product: product.name,
      variant: variant.label,
      qty,
      unitPrice: variant.price,
    });
  }

  const reference = `egbo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const origin = request.headers.get("origin") || new URL(request.url).origin;

  try {
    const result = await initializeTransaction({
      email: customer.email,
      amountKobo: Math.round(amountNaira * 100),
      reference,
      callbackUrl: `${origin}/checkout/success`,
      metadata: {
        customer_name: customer.name,
        customer_phone: customer.phone,
        delivery_address: customer.address,
        delivery_city: customer.city || "",
        notes: customer.notes || "",
        items: lineItems,
      },
    });

    return NextResponse.json({ authorizationUrl: result.authorization_url, reference });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not start payment." }, { status: 502 });
  }
}
