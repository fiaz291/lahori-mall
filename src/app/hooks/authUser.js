"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";

export default function useAuthUser() {
  const loggedInUser = useStore(store, (state) => state.user);
  
  const [userLoading, setUserLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      store.setState((state) => {
        return {
          ...state,
          user: JSON.parse(userCookie),
        };
      });
    }
    setUserLoading(false);
  }, []);

  const logout = useCallback(() => {
    deleteCookie("user");
    deleteCookie("token");
    store.setState(() => {
      return {
        user: null,
      };
    });
  }, [router]);

  return { user: loggedInUser, userLoading, logout };
}
