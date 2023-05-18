import { NextResponse } from "next/server";

export function middleware(request) {
    let token = null;
    if (typeof window !== "undefined") {
        // token = localStorage.getItem("token");
        // console.log(token);
    }

    if (request.nextUrl.pathname.includes("/index")) {
        console.log("validating index page");
    }

    return NextResponse.next();
}
