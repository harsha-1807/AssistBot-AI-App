import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, context: { params: { id: string } }) {

  try {
    const { id } = context.params;

    if (!id) {
      console.error("Missing session ID");
      return NextResponse.json({ message: "Missing session ID" }, { status: 400 });
    }

    const chatSession = await prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: "desc" } },
        chatbot: { select: { name: true } },
        guest: { select: { name: true, email: true } }, 
      },
    });

    if (!chatSession) {
      console.error("Chat session not found:", id);
      return NextResponse.json({ message: "Chat session not found" }, { status: 404 });
    }

    console.log("Chat session found:", chatSession);
    return NextResponse.json(chatSession, { status: 200 });

  } catch (error) {
    console.error("Error fetching session messages:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
