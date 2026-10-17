const POINTS = [
  {
    title: "Ready to cook, not just dried",
    body: "Every batch of egbo is cleaned and shelled before it reaches you — rinse, add water, and cook. No extra sorting on your end.",
  },
  {
    title: "Beans ground close to your order",
    body: "We grind in small batches rather than keeping powder sitting around, so what arrives is closer to fresh than shelf-stable.",
  },
  {
    title: "Honest cup sizes",
    body: "Prices are shown upfront by size. What you pick is what you pay — nothing is renegotiated after the fact.",
  },
  {
    title: "No middleman markup",
    body: "You're ordering directly from the people who clean, dry, and grind it — not a reseller adding their own margin on top.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Why people reorder</span>
          <h2>What you&rsquo;re actually paying for</h2>
        </div>

        <div className="why-list">
          {POINTS.map((point) => (
            <div className="why-row" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
