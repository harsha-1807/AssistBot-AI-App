import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  context: { params: { chatSessionId: string } }
) {
  const { chatSessionId } = context.params;

  try {
    // Check if chat session exists
    const chatSession = await prisma.chatSession.findUnique({
      where: { id: chatSessionId },
    });

    if (!chatSession) {
      return NextResponse.json(
        { message: "Chat session not found" },
        { status: 404 }
      );
    }

    // Fetch messages for the given chatSessionId
    const messages = await prisma.message.findMany({
      where: { chatSessionId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
