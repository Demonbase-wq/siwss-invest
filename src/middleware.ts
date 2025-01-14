import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const unapprovedPaths = ["/dashboard", "/dashboard/kyc-details"];
  const publicPaths = ["/login", "/signup", "/"]; // Paths accessible without redirection

  if (session) {
    const isUser = session?.user.role === "user";
    const isAdmin = session?.user.role === "admin";

    // Prevent logged-in users from accessing public paths
    if (publicPaths.includes(pathname)) {
      if (isUser) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (isAdmin) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }
  
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const isUser = session?.user.role === "user";
    const isKycVerified = session?.user.kyc === "Verified";
    const isUnapprovedPath = unapprovedPaths.includes(request.nextUrl.pathname);

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!isKycVerified && !isUnapprovedPath) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if(isKycVerified && pathname === '/dashboard/kyc-details'){
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!isUser) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Handle admin routes
  if (pathname === "/admin") {
    if (!session) {
      // If no session, render the login page
      return NextResponse.next();
    }

    const isAdmin = session?.user.role === "admin";
    if (!isAdmin) {
      // Redirect non-admin users to their dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect logged-in admin to their dashboard if they are already authenticated
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Handle authenticated admin dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    if (!session) {
      // Redirect to the admin login page if not authenticated
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const isAdmin = session?.user.role === "admin";
    if (!isAdmin) {
      // Redirect non-admin users to their dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
