// Confirmed directly by the client: +2348060889334 (the number carried
// over from the old site had an extra digit — this is the corrected one).
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348060889334";

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
