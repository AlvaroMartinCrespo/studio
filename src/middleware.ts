import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is now empty, but we keep the file for potential future use.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // Disabled
};
