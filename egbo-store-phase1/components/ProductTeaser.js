import Link from "next/link";
import { products, formatNaira } from "@/data/products";

export default function ProductTeaser() {
  return (
    <section className="section" id="shop">
      <div className="container">
        <div className="section-head">
          <span className="tag">What we sell</span>
          <h2>Two staples, prepared properly</h2>
          <p>Pick a size on the shop page — both are priced per cup, confirmed at checkout.</p>
        </div>

        <div className="teaser-grid">
          {products.map((product) => {
            const fromPrice = Math.min(...product.variants.map((v) => v.price));
            return (
              <Link href={`/shop#${product.slug}`} key={product.id} className="teaser-card">
                <div className="teaser-card__media">
                  <div className="teaser-card__placeholder">
                    <ProductGlyph id={product.id} />
                  </div>
                </div>
                <div className="teaser-card__body">
                  <h3>{product.name}</h3>
                  <p>{product.tagline}</p>
                  <div className="teaser-card__foot">
                    <span className="teaser-card__from">
                      From <strong>{formatNaira(fromPrice)}</strong> {product.unit}
                    </span>
                    <span className="btn btn--ghost-dark btn--sm">View options</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductGlyph({ id }) {
  // Small inline mark so the placeholder media area looks intentional
  // rather than a broken image, until real product photos are added.
  if (id === "egbo") {
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="12" rx="6" ry="9" />
        <path d="M12 3v18M7 7.5c2 1 8 1 10 0M7 16.5c2-1 8-1 10 0" />
      </svg>
    );
  }
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="10" r="2.6" />
      <circle cx="15" cy="9" r="2.6" />
      <circle cx="12" cy="15" r="2.6" />
      <circle cx="7" cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  );
}
