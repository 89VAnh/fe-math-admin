import { NextResponse, type NextRequest } from "next/server";
import { authorization } from "./utils/service/account.service";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }

  try {
    authorization(token || "").catch((err) => {
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
