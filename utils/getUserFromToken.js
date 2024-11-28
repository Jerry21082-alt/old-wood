import { jwtDecode } from "jwt-decode";

export function getUserFromToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
