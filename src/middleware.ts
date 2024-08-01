import { NextResponse, type NextRequest } from "next/server";
import { apiClient } from "./helper/api";
import { SESSION_TOKEN } from "./utils/config";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_TOKEN)?.value;

  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }

  try {
    apiClient
      .get(`account/me`, { params: { token: token || "" } })
      .catch((err) => {
        throw err;
      });

    if (token && request.nextUrl.pathname.startsWith("/login")) {
      return Response.redirect(new URL("/", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico|images/logo|images/grid).*)",
  ],
};
