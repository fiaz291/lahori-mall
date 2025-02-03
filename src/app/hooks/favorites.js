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

export default function useFavorites() {
  const favorites = useStore(store, (state) => state.favorites);
  const { user } = useAuthUser();

  const [favLoading, setFavoritesLoading] = useState(true);
  console.log('here');
  useEffect(() => {
    async function getFavoriteItems() {
      const response = await axios.get(
        config.url + API_URLS.FAVORITS + "?userId=" + user.id
      );
      if (response.data) {
        store.setState((state) => {
          return {
            ...state,
            favorites: response.data,
          };
        });
      }
      setFavoritesLoading(false);
    }
    if (user && !favorites) {
      getFavoriteItems();
    }
  }, [user]);

  return { favorites, favLoading };
}
