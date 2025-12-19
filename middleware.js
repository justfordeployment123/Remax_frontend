import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host');
  const url = request.nextUrl;

  // Check if request is from admin subdomain
  const isAdminDomain = hostname?.startsWith('admin.');
  
  // Check if the path is an admin route
  const isAdminPath = url.pathname.startsWith('/admin');

  // If on admin subdomain but not on admin path, redirect to /admin
  if (isAdminDomain && !isAdminPath) {
    // Preserve the path after /admin
    const adminUrl = new URL(`/admin${url.pathname}`, request.url);
    adminUrl.search = url.search;
    return NextResponse.rewrite(adminUrl);
  }

  // If NOT on admin subdomain but trying to access admin path, redirect to admin subdomain
  if (!isAdminDomain && isAdminPath) {
    const adminDomain = hostname?.replace(/^(www\.)?/, 'admin.');
    const redirectUrl = new URL(request.url);
    redirectUrl.hostname = adminDomain || `admin.${hostname}`;
    return NextResponse.redirect(redirectUrl);
  }

  // If on admin subdomain and admin path, allow
  if (isAdminDomain && isAdminPath) {
    return NextResponse.next();
  }

  // For main domain, block admin routes
  if (!isAdminDomain && isAdminPath) {
    return NextResponse.redirect(new URL('/', request.url));
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
