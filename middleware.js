import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const protectedRoutes = ["/dashboard", "/account", "/profile"];
  const path = req.nextUrl.pathname;

  // Allow access to public routes
  if (
    path.startsWith("/accounts/register") ||
    path.startsWith("/accounts/login")
  ) {
    return NextResponse.next();
  }

  // Check for token on protected routes
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/accounts/login";
      return NextResponse.redirect(url);
    }

    try {
      const secret = process.env.JWT_SECRET;
      jwt.verify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.log("Invalid token:", error);
      const url = req.nextUrl.clone();
      url.pathname = "/accounts/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
