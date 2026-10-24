import Link from "next/link";

export default function PolicyNote() {
  return (
    <p className="checkout__note" style={{ marginTop: 16 }}>
      By ordering, you agree to our{" "}
      <Link href="/refund-policy" style={{ textDecoration: "underline" }}>refund policy</Link>
      {" "}and{" "}
      <Link href="/privacy" style={{ textDecoration: "underline" }}>privacy policy</Link>.
    </p>
  );
}
