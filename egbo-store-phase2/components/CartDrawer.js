"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatNaira } from "@/data/products";

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, isDrawerOpen, closeDrawer } = useCart();

  return (
    <>
      <div className="cart-overlay" data-open={isDrawerOpen} onClick={closeDrawer} />
      <aside className="cart-drawer" data-open={isDrawerOpen} aria-hidden={!isDrawerOpen}>
        <div className="cart-drawer__head">
          <h3>Your cart</h3>
          <button type="button" className="cart-drawer__close" onClick={closeDrawer} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-line" key={item.variantId}>
                <div className="cart-line__swatch" />
                <div className="cart-line__body">
                  <div className="cart-line__name">{item.productName}</div>
                  <div className="cart-line__variant">{item.variantLabel}</div>
                  <div className="cart-line__foot">
                    <div className="qty-control">
                      <button type="button" onClick={() => updateQty(item.variantId, item.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => updateQty(item.variantId, item.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <span className="cart-line__price">{formatNaira(item.price * item.qty)}</span>
                  </div>
                  <button type="button" className="cart-line__remove" onClick={() => removeItem(item.variantId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-drawer__total">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
            <Link href="/checkout" className="btn btn--primary btn--block" onClick={closeDrawer}>
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
