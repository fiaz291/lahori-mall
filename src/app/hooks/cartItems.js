"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import config from "../config";
import useAuthUser from "./authUser";

export default function useCartItems() {
  const cartItems = useStore(store, (state) => state.cart);
  const { user } = useAuthUser();

  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    async function getCartItems() {
      const response = await axios.get(
        config.url + "/api/cart" + "?userId=" + user.id
      );
      if (response.data) {
        store.setState((state) => {
          return {
            ...state,
            cart: response.data,
          };
        });
      }
      setCartLoading(false);
    }
    if (user) {
      getCartItems();
    }
  }, [user]);

  return { cartItems, cartLoading };
}
