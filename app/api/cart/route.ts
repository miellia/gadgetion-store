import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// THIS ROUTE IS FOR FUTURE USE ONLY
// IT IS NOT CURRENTLY CONNECTED TO THE FRONTEND

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const items = await prisma.cartItem.findMany({
      where: { sessionId },
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity, sessionId } = body;

    if (!productId || !quantity || !sessionId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        productId,
        quantity,
        sessionId,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
