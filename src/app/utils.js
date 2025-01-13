import { COLORS } from "@/constants";
import { getCookie } from "cookies-next";

export function getJwtToken() {
  const token = getCookie("token");
  if (token) {
    return token;
  }
  return null;
}

export function getUser() {
  const user = getCookie("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const generalKitchenTags = [
  { key: "kitchen", value: "Kitchen" },
  { key: "cooking", value: "Cooking" },
  { key: "baking", value: "Baking" },
  { key: "kitchenware", value: "Kitchenware" },
  { key: "tools", value: "Tools" },
  { key: "appliances", value: "Appliances" },
  { key: "accessories", value: "Accessories" },
  { key: "equipment", value: "Equipment" },
  { key: "gadgets", value: "Gadgets" },
  { key: "design", value: "Design" },
  { key: "decor", value: "Decor" },
  { key: "storage", value: "Storage" },
  { key: "organization", value: "Organization" },
  { key: "essentials", value: "Essentials" },
  { key: "cleaning", value: "Cleaning" },
];

export const materialTags = [
  { key: "stainlessSteel", value: "Stainless Steel" },
  { key: "nonStick", value: "Non-Stick" },
  { key: "castIron", value: "Cast Iron" },
  { key: "ceramic", value: "Ceramic" },
  { key: "glass", value: "Glass" },
  { key: "plastic", value: "Plastic" },
  { key: "wood", value: "Wood" },
  { key: "marble", value: "Marble" },
  { key: "granite", value: "Granite" },
];

export const cookingMethodTags = [
  { key: "boiling", value: "Boiling" },
  { key: "frying", value: "Frying" },
  { key: "baking", value: "Baking" },
  { key: "grilling", value: "Grilling" },
  { key: "roasting", value: "Roasting" },
  { key: "steaming", value: "Steaming" },
  { key: "sauteing", value: "Sautéing" },
  { key: "simmering", value: "Simmering" },
  { key: "poaching", value: "Poaching" },
];

export const occasionTags = [
  { key: "holidayCooking", value: "Holiday Cooking" },
  { key: "partyPreparation", value: "Party Preparation" },
  { key: "everydayCooking", value: "Everyday Cooking" },
  { key: "specialOccasions", value: "Special Occasions" },
  { key: "bbqTools", value: "BBQ Tools" },
  { key: "bakingSupplies", value: "Baking Supplies" },
];

export const priceQualityTags = [
  { key: "affordableKitchenTools", value: "Affordable Kitchen Tools" },
  { key: "premiumKitchenAppliances", value: "Premium Kitchen Appliances" },
  { key: "budgetFriendlyKitchenware", value: "Budget-Friendly Kitchenware" },
  { key: "highQualityCookware", value: "High-Quality Cookware" },
];

export const combineTags = (...tagArrays) => {
  return tagArrays.flat();
};

// Usage
export const allTags = combineTags(
  generalKitchenTags,
  materialTags,
  cookingMethodTags,
  occasionTags,
  priceQualityTags
);

export const sideBarCategories = [
  {
    title: "Price Quality",
    data: priceQualityTags,
  },
  {
    title: "Material Wise",
    data: materialTags,
  },
  {
    title: "General Categories",
    data: generalKitchenTags,
  },
  {
    title: "Cooking Methods ",
    data: cookingMethodTags,
  },
  {
    title: "By Occasions",
    data: occasionTags,
  },
];

export const ENUMS = {
  latest: "latest",
  topWeek: "topWeek",
  onSale: "onSale",
};

export const orderStatuses = {
  pending: { key: "pending", name: "Pending", color: COLORS.gray }, // Order has been placed but not yet processed
  processing: { key: "processing", name: "Processing", color: COLORS.gray }, // Order is being prepared
  shipped: { key: "shipped", name: "Shipped", color: COLORS.gray }, // Order has been shipped out
  out_for_delivery: {
    key: "out_for_delivery",
    name: "Out for Delivery",
    color: COLORS.gray,
  }, // Order is out for delivery
  delivered: { key: "delivered", name: "Delivered", color: COLORS.green }, // Order has been delivered to the customer
  canceled: { key: "canceled", name: "Canceled", color: COLORS.red }, // Order has been canceled
  returned: { key: "returned", name: "Returned", color: COLORS.red }, // Order has been returned by the customer
  failed: { key: "failed", name: "Failed", color: COLORS.red }, // Delivery attempt failed
};

export function buildUrl(baseUrl, queryParams) {
  const queryString = Object.keys(queryParams)
    .filter(
      (key) => queryParams[key] !== undefined && queryParams[key] !== null
    )
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");

  return `${baseUrl}${queryString ? `?${queryString}` : ""}`;
}

