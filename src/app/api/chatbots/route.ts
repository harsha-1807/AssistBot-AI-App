import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkUserId, name } = body;

    if (!clerkUserId || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const chatbot = await prisma.chatbot.create({
      data: { clerkUserId, name },
    });

    return NextResponse.json(
      { message: "Chatbot created!", id: chatbot.id, name: chatbot.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerk_user_id");

    if (!clerkUserId) {
      return NextResponse.json(
        { message: "Missing clerk_user_id" },
        { status: 400 }
      );
    }

    const chatbots = await prisma.chatbot.findMany({
      where: { clerkUserId: clerkUserId },
      include: {
        chatbotCharacteristics: true,
        chatSessions: true,
      },
    });

    return NextResponse.json(chatbots, { status: 200 });
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
