"use client";

import { useState } from "react";
import { formatNaira } from "@/data/products";
import { useCart } from "./CartProvider";

export default function ProductSection({ product, reverse }) {
  const popular = product.variants.find((v) => v.popular);
  const [variantId, setVariantId] = useState((popular ?? product.variants[0]).id);
  const [qty, setQty] = useState(1);
  const { addItem, openDrawer } = useCart();

  const variant = product.variants.find((v) => v.id === variantId);
  const hasPlaceholderPricing = product.variants.some((v) => v.placeholder);

  function handleAdd() {
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantLabel: variant.label,
      price: variant.price,
      qty,
    });
    setQty(1);
    openDrawer();
  }

  return (
    <div className={`product${reverse ? " product--reverse" : ""}`} id={product.slug}>
      <div className="product__media">
        <div className="product__placeholder">
          <ProductGlyph id={product.id} />
          <span>Photo coming soon</span>
        </div>
      </div>

      <div>
        <h2 className="product__name">{product.name}</h2>
        <p className="product__tagline">{product.tagline}</p>
        <p className="product__desc">{product.description}</p>
        <p className="product__heritage">{product.heritage}</p>

        <div className="product__variants">
          <p className="product__variants-label">Choose a size</p>
          <div className="variant-grid">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className="variant-btn"
                data-selected={v.id === variantId}
                onClick={() => setVariantId(v.id)}
              >
                {v.popular && <span className="variant-btn__popular">Popular</span>}
                <span className="variant-btn__label">{v.label}</span>
                <span className="variant-btn__note">{v.note}</span>
                <span className="variant-btn__price">{formatNaira(v.price)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="product__add-row">
          <div className="qty-control">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button type="button" className="btn btn--primary" onClick={handleAdd}>
            Add to cart — {formatNaira(variant.price * qty)}
          </button>
        </div>

        {hasPlaceholderPricing && (
          <p className="product__placeholder-note">
            Prices on this item are placeholders pending confirmation.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductGlyph({ id }) {
  if (id === "egbo") {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="12" rx="6" ry="9" />
        <path d="M12 3v18M7 7.5c2 1 8 1 10 0M7 16.5c2-1 8-1 10 0" />
      </svg>
    );
  }
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="10" r="2.6" />
      <circle cx="15" cy="9" r="2.6" />
      <circle cx="12" cy="15" r="2.6" />
      <circle cx="7" cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  );
}
