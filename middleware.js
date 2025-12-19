import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host');
  const url = request.nextUrl;

  // Check if request is from admin subdomain
  const isAdminDomain = hostname?.startsWith('cms.');
  
  // Check if the path is an admin route
  const isAdminPath = url.pathname.startsWith('/admin');

  // If on admin subdomain but not on admin path, redirect to /admin
  if (isAdminDomain && !isAdminPath) {
    // Preserve the path after /admin
    const adminUrl = new URL(`/admin${url.pathname}`, request.url);
    adminUrl.search = url.search;
    return NextResponse.rewrite(adminUrl);
  }

  // Block admin routes on main domain (no redirect, just 404)
  if (!isAdminDomain && isAdminPath) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // If on admin subdomain and admin path, allow
  if (isAdminDomain && isAdminPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
