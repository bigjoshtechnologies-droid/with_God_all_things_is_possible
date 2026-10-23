export default function AboutSection() {
  return (
    <section className="section" id="our-story">
      <div className="container">
        <div className="section-head">
          <span className="tag">Our story</span>
          <h2>A staple passed down, not invented</h2>
        </div>

        <div className="about__panel">
          <blockquote>
            “Egbo and beans is one of the oldest pairings in a Yoruba
            kitchen — we just do the slow part before it gets to you.”
            <footer>With God All Things Are Possible</footer>
          </blockquote>

          <div className="about__body">
            <p>
              Long before it was sold in cups and bags, egbo and beans was
              the meal that stretched furthest — slow-cooked, filling, and
              built from ingredients every household already had on hand.
              We still prepare it the same way: maize dried and cleaned by
              hand, beans dried and ground the same day they&rsquo;re
              ordered.
            </p>
            <p>
              We don&rsquo;t dress it up as something it isn&rsquo;t. It&rsquo;s
              a kitchen staple, prepared properly, so the only thing left
              for you to do is cook.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
