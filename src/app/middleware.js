// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
    const token = request.cookies.get("auth_token"); // Get the JWT from cookies

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
        return NextResponse.next(); // Proceed to the requested route
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login on error
    }
}

export const config = {
    matcher: ["/home"], // Protect these routes
};
