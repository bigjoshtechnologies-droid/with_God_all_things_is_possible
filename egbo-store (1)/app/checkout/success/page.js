"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatNaira } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";

function SuccessContent() {
  const reference = useSearchParams().get("reference");
  const { clear } = useCart();
  const [state, setState] = useState("checking"); // checking | success | failed | error

  useEffect(() => {
    if (!reference) {
      setState("error");
      return;
    }
    fetch(`/api/checkout/verify?reference=${encodeURIComponent(reference)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "success") {
          setState({ status: "success", data });
          clear();
        } else {
          setState("failed");
        }
      })
      .catch(() => setState("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (state === "checking") {
    return (
      <div className="empty-state">
        <h1>Confirming your payment…</h1>
        <p>This only takes a moment.</p>
      </div>
    );
  }

  if (state === "failed" || state === "error") {
    return (
      <div className="empty-state">
        <h1>We couldn&rsquo;t confirm that payment</h1>
        <p>
          If money left your account, it will be refunded automatically if
          the order didn&rsquo;t go through. You can also message us directly
          to confirm.
        </p>
        <a href={whatsappLink(`Hi, I had trouble confirming a payment. Reference: ${reference || "unknown"}`)} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  const { data } = state;
  const items = data.metadata?.items || [];

  return (
    <div className="empty-state">
      <h1>Order confirmed</h1>
      <p>
        Thank you, {data.metadata?.customer_name || "there"} — payment of{" "}
        {formatNaira(data.amount)} received. We&rsquo;ll start getting your
        order ready.
      </p>

      <div className="checkout__summary" style={{ textAlign: "left", maxWidth: 420, margin: "0 auto 28px" }}>
        <h3>What you ordered</h3>
        {items.map((i, idx) => (
          <div className="summary-line" key={idx}>
            <div>
              <div className="summary-line__name">{i.product}</div>
              <div className="summary-line__meta">{i.variant} × {i.qty}</div>
            </div>
          </div>
        ))}
        <div className="checkout__note">Reference: {data.reference}</div>
      </div>

      <Link href="/shop" className="btn btn--ghost-dark">Continue shopping</Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="container">
      <Suspense fallback={<div className="empty-state"><h1>Loading…</h1></div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
