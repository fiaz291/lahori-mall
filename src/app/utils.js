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
  "Cleaning"
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
  "Kitchen Islands"
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
  "Granite"
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
  "Poaching"
];

export const occasionTags = [
  "Holiday Cooking",
  "Party Preparation",
  "Everyday Cooking",
  "Special Occasions",
  "BBQ Tools",
  "Baking Supplies"
];

export const priceQualityTags = [
  "Affordable Kitchen Tools",
  "Premium Kitchen Appliances",
  "Budget-Friendly Kitchenware",
  "High-Quality Cookware"
];
