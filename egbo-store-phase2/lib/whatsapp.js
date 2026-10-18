// Carried over from the previous site build. FLAGGED for the client to
// verify — it's one digit longer than a standard Nigerian mobile number,
// and the old file had a leftover "REPLACE the href below with your
// actual WhatsApp number" comment near it, so it may be unconfirmed.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "23480660889334";

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
