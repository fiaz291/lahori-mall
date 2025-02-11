"use client";
import React, { useEffect, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import config from "../config";
import useAuthUser from "./authUser";
import { API_URLS } from "../apiUrls";

export default function useRecentViewedItems() {
  const recentViewedItems = useStore(store, (state) => state.recentViewedItems);
  const { user } = useAuthUser();
  const [recentItemsLoading, setRecentItemsLoading] = useState(true);

  useEffect(() => {
    async function getRecentViewedItems() {
      try {
        const response = await axios.get(
          config.url + API_URLS.PRODUCT_VIEW + "?userId=" + user.id
        );
        if (response?.data?.data) {
          store.setState((state) => {
            return {
              ...state,
              recentViewedItems: response.data.data,
            };
          });
        }
        setRecentItemsLoading(false);
      } catch (err) {
        console.log('err', err)
      } finally {
      }
    }
    if (user) {
      getRecentViewedItems();
    }
  }, [user]);

  return { recentViewedItems, recentItemsLoading };
}
