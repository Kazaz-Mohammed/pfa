import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the path the user is trying to access
  const path = request.nextUrl.pathname;
  
  // Define which paths require authentication
  const protectedPaths = [
    '/eleveur-dashboard',
    '/sheep-management',
    '/scn-management',
    '/inventory',
    '/messages',
    '/analytics',
    '/settings'
    ];
  
  // Check if the path is protected
  const isPathProtected = protectedPaths.some(
    (protectedPath) => path.startsWith(protectedPath)
  );

  // Get the authentication cookie directly from the request
  const sessionCookie = request.cookies.get('session_id')?.value;
  
  // If the path is protected and there's no session cookie, redirect to login
  if (isPathProtected && !sessionCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(path));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Apply to all paths except these
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};