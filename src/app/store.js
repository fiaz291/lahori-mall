"use client";
import { Store } from "@tanstack/store";

export const store = new Store({
  user: null,
  cart: [],
  showLoginModal: false,
  favorites: [],
  recentViewedItems: [],
});
