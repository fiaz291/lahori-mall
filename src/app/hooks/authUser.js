import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();
  console.log({ user });
  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    setUserLoading(false);
  }, []);

  const logout = useCallback(() => {
    deleteCookie("user");
    deleteCookie("token");
    location.reload();
  }, [router]);
  return { user, userLoading, logout };
}
