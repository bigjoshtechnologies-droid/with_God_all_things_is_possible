"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How long does egbo last after purchase?",
    a: "When stored in a cool, dry place in an airtight container, dried egbo can last several weeks. Avoid moisture and direct sunlight for best results.",
  },
  {
    q: "How should I store the ground beans powder, and how do I use it?",
    a: "Keep it airtight and dry, the same as the egbo. Mix with water as you would soaked, blended beans — it works straight into moi moi, akara, or ekuru without the usual soaking and peeling step.",
  },
  {
    q: "What quantity should I order for a family of 4?",
    a: "We recommend the Family size (₦1,500 for egbo). It provides a generous portion that cooks into enough for the whole family comfortably.",
  },
  {
    q: "Do you deliver to my area?",
    a: "We currently deliver within Nigeria. Place your order through the cart and confirm your area at checkout — international delivery is coming, but isn't available yet.",
  },
  {
    q: "Is the egbo already cleaned and shelled?",
    a: "Yes. Every batch is cleaned and shelled before it reaches you — rinse, add water, and cook, with no extra processing needed on your end.",
  },
  {
    q: "Can I place a bulk order for my restaurant or event?",
    a: "Yes. Message us on WhatsApp with the quantity you need and we'll work out bulk pricing and delivery together.",
  },
  {
    q: "How do I pay for my order?",
    a: "Add what you want to the cart and checkout — you'll be handed to WhatsApp with your order already filled in, where we confirm payment by bank transfer. Card payment on the site is coming soon.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="tag">Questions</span>
          <h2>Before you order</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className="faq-item" data-open={openIndex === i} key={item.q}>
              <button
                type="button"
                className="faq-item__q"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
              >
                {item.q}
                <span className="faq-item__icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
              <div className="faq-item__a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
