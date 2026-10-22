import { NextResponse, type NextRequest } from "next/server";

// UX-layer guard only: bounce anonymous visitors away from /admin before
// pages render. This is NOT the security boundary — every admin page and
// server action independently validates the session against the database.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !request.cookies.has("kf_admin_session")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
