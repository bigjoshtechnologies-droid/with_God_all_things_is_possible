// Product catalog.
//
// Egbo pricing below is carried over from the live site that was already
// built (5 cup sizes, confirmed real prices). Beans powder has no pricing
// yet — it's set to round placeholder numbers so the site runs end to end,
// but every number is marked TODO. Replace before launch.

export const products = [
  {
    id: "egbo",
    slug: "egbo",
    name: "Egbo (Dried Maize Corn)",
    tagline: "Cleaned, shelled, and ready to cook — the way your kitchen remembers it.",
    description:
      "Whole maize corn, dried and carefully cleaned by hand. No shortcuts, no shortcuts skipped — rinse, add water, and cook. Pairs naturally with beans for a classic Yoruba staple.",
    heritage:
      "Egbo and beans together is one of the oldest combinations in Yoruba home cooking — simple ingredients, slow-cooked, and made to stretch a long way for a family.",
    image: "/images/egbo.jpg",
    variants: [
      { id: "egbo-taster", label: "Taster", note: "Great for trying it out", price: 500 },
      { id: "egbo-regular", label: "Regular", note: "Perfect for one household", price: 1000 },
      { id: "egbo-family", label: "Family", note: "Best for family cooking", price: 1500, popular: true },
      { id: "egbo-large", label: "Large", note: "For bigger households", price: 2000 },
      { id: "egbo-jumbo", label: "Jumbo", note: "Maximum value, best deal", price: 2500 },
    ],
    unit: "per cup",
  },
  {
    id: "beans-powder",
    slug: "ground-beans-powder",
    name: "Ground Beans Powder",
    tagline: "Beans, already ground — skip the soaking and peeling.",
    description:
      "Dried beans, cleaned and ground to a fine powder. Mix with water straight into moi moi, akara, or ekuru without the usual soaking, peeling, and blending.",
    heritage:
      "Grinding beans by hand is the slow part of making moi moi and akara — this does that work ahead of time, the same way it's always been done, just faster to get to your pot.",
    image: "/images/beans-powder.jpg",
    // TODO(client): confirm real cup prices for beans powder — these are
    // placeholders only, roughly mirroring the egbo tiers so the site has
    // working numbers. Do not launch with these unconfirmed.
    variants: [
      { id: "beans-taster", label: "Taster", note: "Great for trying it out", price: 600, placeholder: true },
      { id: "beans-regular", label: "Regular", note: "Perfect for one household", price: 1200, placeholder: true },
      { id: "beans-family", label: "Family", note: "Best for family cooking", price: 1800, placeholder: true, popular: true },
      { id: "beans-large", label: "Large", note: "For bigger households", price: 2400, placeholder: true },
    ],
    unit: "per cup",
  },
];

export function findVariant(variantId) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

export function formatNaira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
