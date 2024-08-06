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
  "Kitchen",
  "Cooking",
  "Baking",
  "Kitchenware",
  "Tools",
  "Appliances",
  "Accessories",
  "Equipment",
  "Gadgets",
  "Design",
  "Decor",
  "Storage",
  "Organization",
  "Essentials",
  "Cleaning",
];

export const specificProductTags = [
  "Cookware",
  "Pots and Pans",
  "Knives",
  "Cutting Boards",
  "Mixers",
  "Blenders",
  "Food Processors",
  "Toasters",
  "Coffee Makers",
  "Ovens",
  "Stoves",
  "Refrigerators",
  "Microwaves",
  "Dishwashers",
  "Sinks",
  "Faucets",
  "Cabinets",
  "Countertops",
  "Kitchen Islands",
];

export const materialTags = [
  "Stainless Steel",
  "Non-Stick",
  "Cast Iron",
  "Ceramic",
  "Glass",
  "Plastic",
  "Wood",
  "Marble",
  "Granite",
];

export const cookingMethodTags = [
  "Boiling",
  "Frying",
  "Baking",
  "Grilling",
  "Roasting",
  "Steaming",
  "Sautéing",
  "Simmering",
  "Poaching",
];

export const occasionTags = [
  "Holiday Cooking",
  "Party Preparation",
  "Everyday Cooking",
  "Special Occasions",
  "BBQ Tools",
  "Baking Supplies",
];

export const priceQualityTags = [
  "Affordable Kitchen Tools",
  "Premium Kitchen Appliances",
  "Budget-Friendly Kitchenware",
  "High-Quality Cookware",
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
  out_for_delivery: { key: "out_for_delivery", name: "Out for Delivery", color: COLORS.gray }, // Order is out for delivery
  delivered: { key: "delivered", name: "Delivered", color: COLORS.green }, // Order has been delivered to the customer
  canceled: { key: "canceled", name: "Canceled", color: COLORS.red }, // Order has been canceled
  returned: { key: "returned", name: "Returned", color: COLORS.red }, // Order has been returned by the customer
  failed: { key: "failed", name: "Failed", color: COLORS.red }, // Delivery attempt failed
};
