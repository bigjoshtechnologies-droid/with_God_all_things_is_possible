import Link from "next/link";

const GRAIN_DOTS = [
  [220, 140, 4], [250, 120, 3], [195, 165, 3], [270, 160, 4], [230, 190, 3],
  [260, 210, 4], [200, 210, 3], [285, 190, 3], [235, 150, 2.5], [210, 185, 2.5],
  [255, 175, 2.5], [245, 230, 3], [215, 240, 2.5], [275, 230, 2.5], [195, 135, 2.5],
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div>
          <span className="hero__eyebrow">Prepared fresh, the traditional way</span>
          <h1>Egbo and beans, ready for your pot.</h1>
          <p>
            Cleaned, dried, and ground by hand — the staples your kitchen
            already trusts, just ready sooner.
          </p>
          <div className="hero__ctas">
            <Link href="/shop" className="btn btn--primary">Shop now</Link>
            <Link href="/#our-story" className="btn btn--ghost-light">Our story</Link>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <svg viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
            <circle cx="260" cy="220" r="170" fill="#3D2415" />
            <circle cx="120" cy="130" r="108" fill="none" stroke="#6B3F7A" strokeWidth="2.5" />
            <circle cx="82" cy="356" r="44" fill="#3B1F49" />
            <path d="M330 90 A150 150 0 0 1 380 220" fill="none" stroke="#B48FC2" strokeWidth="2" strokeLinecap="round" />
            {GRAIN_DOTS.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#F3EAE2" opacity="0.85" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
