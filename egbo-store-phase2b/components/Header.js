"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openDrawer } = useCart();

  return (
    <header className="header">
      <div className="container header__bar">
        <Link href="/" className="header__brand" onClick={() => setMenuOpen(false)}>
          {/* TODO(client): confirm this is still the business name to use */}
          <strong>With God All Things Are Possible</strong>
          <span>Egbo &amp; ground beans</span>
        </Link>

        <nav className="header__nav" data-open={menuOpen}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/#our-story" onClick={() => setMenuOpen(false)}>Our story</Link>
          <Link href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="header__cart"
            onClick={openDrawer}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && <span className="header__cart-count">{count}</span>}
          </button>

          <button
            type="button"
            className="header__menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
