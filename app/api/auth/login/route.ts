import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envUsername || !envPassword) {
      console.error("Missing ADMIN_USERNAME or ADMIN_PASSWORD in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (username === envUsername && password === envPassword) {
      const cookieStore = await cookies();
      
      cookieStore.set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 day
      });

      return NextResponse.json({ success: true });
    }

    // Add simple delay on failed login (hardening)
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
