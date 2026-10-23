export const metadata = {
  title: "Privacy — With God All Things Are Possible",
};

export default function PrivacyPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Policy</span>
          <h1>Privacy</h1>
        </div>

        <div className="policy-body">
          <h2>What we collect</h2>
          <p>
            When you check out, we ask for your name, phone number,
            delivery address, and — if you&rsquo;re paying by card — an
            email address. If you add a note, we see that too. That&rsquo;s
            the full list; we don&rsquo;t collect anything beyond what the
            checkout form itself asks for.
          </p>

          <h2>What it&rsquo;s used for</h2>
          <p>
            Getting your order right: confirming payment, knowing where
            to deliver it, and reaching you if there&rsquo;s a problem with
            it. Nothing here is used for anything beyond fulfilling your
            order.
          </p>

          <h2>Where it goes</h2>
          <p>
            If you pay by card, your order details are sent to Paystack,
            our payment processor, to process the transaction — your
            actual card number goes directly to Paystack and is never
            seen or stored by this site. We also get an automatic email
            when a card payment succeeds, so we know to prepare and send
            your order.
          </p>
          <p>
            If you check out via WhatsApp instead, your order details are
            only sent when you personally tap send in WhatsApp — the
            site itself doesn&rsquo;t transmit anything on that path
            without you doing it.
          </p>
          <p>
            We don&rsquo;t sell your information, and we don&rsquo;t share
            it with advertisers or anyone outside what&rsquo;s needed to
            get your order to you.
          </p>

          <h2>What we store, and where</h2>
          <p>
            Your cart lives only in your own browser while you shop — it
            isn&rsquo;t sent anywhere until you check out. We don&rsquo;t
            currently keep a separate customer database; order records
            live in the Paystack dashboard for card orders, or in our
            WhatsApp conversation history for orders placed that way.
          </p>

          <h2>Questions, or want your data removed?</h2>
          <p>
            Message us on WhatsApp — there&rsquo;s a button in the bottom
            corner of every page — and we&rsquo;ll sort it out directly.
          </p>
        </div>

        <p className="policy-updated">Last updated: October 2026.</p>
      </div>
    </main>
  );
}
