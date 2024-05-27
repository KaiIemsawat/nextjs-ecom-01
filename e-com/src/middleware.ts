import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    if ((await isAuthenticated(req)) === false) {
        return new NextResponse("Unauthorized", {
            status: 401,
            headers: { "WWW-Authenticate": "Basic" },
        });
    }
};

const isAuthenticated = async (req: NextRequest) => {
    return Promise.resolve(false);
};

export const config = {
    matcher: "/admin/:path*",
};
