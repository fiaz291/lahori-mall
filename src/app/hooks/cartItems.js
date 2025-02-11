"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import config from "../config";
import useAuthUser from "./authUser";
import { API_URLS } from "../apiUrls";

export default function useCartItems() {
  const cartItems = useStore(store, (state) => state.cart);
  const { user } = useAuthUser();

  const [cartLoading, setCartLoading] = useState(true);

  const getCartPrice = useCallback(() => {
    let price = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((cartProd) => {
        if (!cartProd?.product?.isDiscount) {
          price = cartProd?.quantity * cartProd?.product?.price + price;
        } else {
          price = cartProd?.quantity * cartProd?.product?.discountPrice + price;
        }
      });
    }
    return price;
  }, [cartItems]);

  useEffect(() => {
    async function getCartItems() {
      const response = await axios.get(
        config.url + API_URLS.CART + "?userId=" + user.id
      );
      if (response.data) {
        store.setState((state) => {
          return {
            ...state,
            cart: response.data.data,
          };
        });
      }
      setCartLoading(false);
    }
    if (user) {
      getCartItems();
    }
  }, [user]);

  return { cartItems, cartLoading, getCartPrice };
}
