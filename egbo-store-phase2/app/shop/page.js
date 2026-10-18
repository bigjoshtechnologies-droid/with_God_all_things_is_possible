import ProductSection from "@/components/ProductSection";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop — With God All Things Are Possible",
};

export default function ShopPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Shop</span>
          <h1>Egbo and beans, by the cup</h1>
          <p>Pick a size for each, add to cart, and checkout when you&rsquo;re ready.</p>
        </div>

        {products.map((product, i) => (
          <ProductSection product={product} reverse={i % 2 === 1} key={product.id} />
        ))}
      </div>
    </main>
  );
}
