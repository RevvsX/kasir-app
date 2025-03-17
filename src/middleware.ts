import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { url } from "./lib/routes";

export { default } from "next-auth/middleware"


export async function middleware(req: NextRequest) {
    const sess = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if(!sess){
        return NextResponse.redirect(new URL("/login", req.url))
    }

    const pathname = req.nextUrl.pathname;

    const route = url.flatMap(category => category.url).find(route => route.url === pathname);

    if(route){
        if (!route?.canAccess.includes(sess?.role as string)) {
            return NextResponse.redirect(new URL("/applications/dashboard", req.url));
        }
    }


    return NextResponse.next();
}



export const config = {
    matcher: ["/applications/:path*", "/transactions/:path*"],
};
