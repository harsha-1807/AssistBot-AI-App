import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const chatbot = await prisma.chatbot.findUnique({
      where: { id: params.id },
      include: {
        chatbotCharacteristics: true, // Include chatbot characteristics
        chatSessions: true, // Include chat sessions
      }, 
    });

    if (!chatbot) {
      return NextResponse.json({ message: "Chatbot not found" }, { status: 404 });
    }

    return NextResponse.json(chatbot, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
