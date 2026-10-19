"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatNaira } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";

const PAYSTACK_ENABLED = process.env.NEXT_PUBLIC_PAYSTACK_ENABLED === "true";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", notes: "" });
  const [payState, setPayState] = useState("idle"); // idle | loading | error
  const [payError, setPayError] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  const hasContactDetails = items.length > 0 && form.name.trim() && form.phone.trim() && form.address.trim();
  const canPayWithCard = hasContactDetails && /\S+@\S+\.\S+/.test(form.email.trim());

  function buildMessage() {
    const lines = [
      "Hello, I'd like to place an order:",
      "",
      ...items.map(
        (i) => `• ${i.productName} (${i.variantLabel}) x${i.qty} — ${formatNaira(i.price * i.qty)}`
      ),
      "",
      `Total: ${formatNaira(total)}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Delivery address: ${form.address}${form.city ? ", " + form.city : ""}`,
    ];
    if (form.notes.trim()) lines.push(`Notes: ${form.notes}`);
    return lines.join("\n");
  }

  async function handlePayWithCard() {
    setPayState("loading");
    setPayError("");
    try {
      const res = await fetch("/api/checkout/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.variantId, qty: i.qty })),
          customer: form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not start payment.");
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setPayState("error");
      setPayError(err.message);
    }
  }

  if (items.length === 0) {
    return (
      <main className="container">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Add something from the shop before checking out.</p>
          <Link href="/shop" className="btn btn--primary">Go to shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Checkout</span>
          <h1>Confirm your order</h1>
          <p>
            {PAYSTACK_ENABLED
              ? "Pay by card below, or confirm via WhatsApp and pay by bank transfer instead."
              : "Card payment on the site is coming soon — for now, confirming here hands your order straight to WhatsApp with everything already filled in."}
          </p>
        </div>

        <div className="checkout">
          <form className="checkout__form" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" value={form.name} onChange={update("name")} placeholder="Your name" />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" value={form.phone} onChange={update("phone")} placeholder="080..." />
              </div>
              <div className="field">
                <label htmlFor="email">Email {PAYSTACK_ENABLED ? "" : "(optional)"}</label>
                <input id="email" type="email" value={form.email} onChange={update("email")} placeholder="for your receipt" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="address">Delivery address</label>
              <textarea id="address" rows={3} value={form.address} onChange={update("address")} placeholder="Street address" />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="city">City / area</label>
                <input id="city" value={form.city} onChange={update("city")} placeholder="e.g. Gbongan" />
              </div>
              <div className="field">
                <label htmlFor="notes">Notes (optional)</label>
                <input id="notes" value={form.notes} onChange={update("notes")} placeholder="Anything else to add" />
              </div>
            </div>
          </form>

          <aside className="checkout__summary">
            <h3>Order summary</h3>
            {items.map((item) => (
              <div className="summary-line" key={item.variantId}>
                <div>
                  <div className="summary-line__name">{item.productName}</div>
                  <div className="summary-line__meta">{item.variantLabel} × {item.qty}</div>
                </div>
                <span>{formatNaira(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>

            {PAYSTACK_ENABLED && (
              <>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 20, opacity: canPayWithCard ? 1 : 0.5 }}
                  disabled={!canPayWithCard || payState === "loading"}
                  onClick={handlePayWithCard}
                >
                  {payState === "loading" ? "Starting payment…" : "Pay with card"}
                </button>
                {payState === "error" && <p className="checkout__note" style={{ color: "#e2a0a0" }}>{payError}</p>}
                <p className="checkout__note">
                  {canPayWithCard ? "Secure payment via Paystack." : "Fill in name, phone, email, and address to pay by card."}
                </p>
                <div style={{ textAlign: "center", margin: "16px 0", color: "var(--choc-300)", fontSize: "0.82rem" }}>or</div>
              </>
            )}

            <a
              href={hasContactDetails ? whatsappLink(buildMessage()) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={PAYSTACK_ENABLED ? "btn btn--ghost-light btn--block" : "btn btn--primary btn--block"}
              style={{ marginTop: PAYSTACK_ENABLED ? 0 : 20, opacity: hasContactDetails ? 1 : 0.5, pointerEvents: hasContactDetails ? "auto" : "none" }}
              onClick={() => hasContactDetails && clear()}
            >
              Confirm via WhatsApp
            </a>
            {!PAYSTACK_ENABLED && (
              <p className="checkout__note">
                {hasContactDetails
                  ? "Opens WhatsApp with your order filled in — payment is confirmed there."
                  : "Fill in your name, phone, and address to continue."}
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
