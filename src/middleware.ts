import { NextRequest, NextResponse } from "next/server";

const envIdCookieName = "envId";

export const middleware = (request: NextRequest) => {
  const currentEnvId = request.cookies.get(envIdCookieName)?.value ?? 1;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  currentEnvId as never;

  console.log("middleware: ", request.nextUrl.pathname);

  const envId = request.nextUrl.pathname.split("/")[1];
  
  if(envId && envId !== currentEnvId){
    const response = NextResponse.redirect(new URL(`/`, request.url));
    response.cookies.set(envIdCookieName, envId);

    return response;
  }

  return NextResponse.rewrite(new URL(`/${currentEnvId}`, request.url));
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}