import { NextRequest, NextResponse } from "next/server";
import { decode } from "jsonwebtoken";

import { UserStatusEnum, UserRoleEnum } from "./types/Database";
import { CustomJwtPayload } from "./types/CustomJwtPayload";

const getDecodedJwt = (req: NextRequest) => {
  const jwt = req.cookies.get("jwt");

  if (!jwt || !jwt.value) {
    return {
      email: null,
      id: null,
      role: null,
      status: null,
    } as CustomJwtPayload;
  }

  try {
    const decodedJwt = decode(jwt.value, {
      complete: true,
      json: true,
    });

    if (!decodedJwt?.payload) {
      return {
        email: null,
        id: null,
        role: null,
        status: null,
      } as CustomJwtPayload;
    }

    return decodedJwt.payload as CustomJwtPayload;
  } catch {
    return {
      email: null,
      id: null,
      role: null,
      status: null,
    } as CustomJwtPayload;
  }
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const decodedJwt = getDecodedJwt(req);
  const email = decodedJwt.email;
  const id = decodedJwt.id;
  const role = decodedJwt.role;
  const status = decodedJwt.status;

  const isLoggedIn = email && id;
  const isSuspended = status === UserStatusEnum.SUSPENDED;
  const hasNoRole = role === UserRoleEnum.NONE;
  const isImam = role === UserRoleEnum.IMAM;
  const isMosqueManager = role === UserRoleEnum.MOSQUE_MANAGER;
  const isAdmin = role === UserRoleEnum.ADMIN;

  // Shared routes
  const sharedRoutes: string[] = [
    "/contact",
    "/showcase",
    "/faq",
    "/about",
    "/terms-of-service",
    "/privacy-policy",
  ];

  const unauthorizedLoggedInRoutes: string[] = ["/login", "/register"];

  // Authorized routes for non logged in users
  const nonLoggedInRoutes: string[] = [
    "/",
    ...sharedRoutes,
    ...unauthorizedLoggedInRoutes,
  ];

  // Authorized routes for logged in users without a role
  const noRoleRoutes: string[] = [
    ...sharedRoutes,
    "/role-selection",
    "/register-profile",
  ];

  // Authorized routes for imams
  const imamRoutes: string[] = [
    ...sharedRoutes,
    "/home",
    "/mosque",
    "/profile",
    "/apply",
  ];

  // Authorized routes for mosque managers
  const mosqueManagerRoutes: string[] = [
    ...sharedRoutes,
    "/home",
    "/imams",
    "/profile",
    "/publish",
  ];

  // Authorized routes for admins
  const adminRoutes: string[] = [...noRoleRoutes, "/home", "/profile"];

  // Authorized routes for suspended users
  const suspendedRoutes: string[] = [...sharedRoutes, "/user-suspended"];

  // Always allow access to transverse routes
  if (sharedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to login page if user is not logged in and trying to access an authorized route
  if (!isLoggedIn && !nonLoggedInRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect logged in users away from login/register pages
  if (isLoggedIn && unauthorizedLoggedInRoutes.includes(pathname)) {
    if (hasNoRole) {
      return NextResponse.redirect(new URL("/role-selection", req.url));
    }

    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect to user-suspended page if user is suspended and trying to access an authorized route
  if (isSuspended && !suspendedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/user-suspended", req.url));
  }

  // Redirect to home page if user is logged in but has no role and trying to access an authorized route
  if (isLoggedIn && hasNoRole && !noRoleRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/role-selection", req.url));
  }

  // Redirect to home page if user is imam and trying to access an authorized route
  if (isImam && !imamRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect to home page if user is mosque manager and trying to access an authorized route
  if (isMosqueManager && !mosqueManagerRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect to home page if user is admin and trying to access an authorized route
  if (isAdmin && !adminRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
