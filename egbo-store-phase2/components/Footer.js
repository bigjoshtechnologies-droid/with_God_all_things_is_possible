import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <strong>With God All Things Are Possible</strong>
            <p>
              Egbo and ground beans, cleaned and prepared the traditional
              way — ordered directly from the source.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop">All products</Link></li>
              <li><Link href="/#our-story">Our story</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4>Visit or message us</h4>
            <ul>
              <li>Oke Alaafia Owode Ede, Gbongan, Ibadan Road</li>
              <li>Mon – Sat, 7am – 6pm</li>
              <li>
                <a href={whatsappLink("Hello, I have a question about an order.")} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} With God All Things Are Possible.</span>
          <span>Nigeria-wide delivery today, international shipping coming.</span>
        </div>
      </div>
    </footer>
  );
}
