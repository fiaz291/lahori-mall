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
