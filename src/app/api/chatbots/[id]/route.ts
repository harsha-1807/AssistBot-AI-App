import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const { id } =  context.params;
  try {
    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
      // explicitly including chatbotCharacteristics and chatSessions in the response
      include: {
        chatbotCharacteristics: true,
        chatSessions: true,
      },
    });

    if (!chatbot) {
      return NextResponse.json(
        { message: "Chatbot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(chatbot, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedChatbot = await prisma.chatbot.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Chatbot deleted successfully", deletedChatbot },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chatbot:", error);
    return NextResponse.json(
      { message: "Failed to delete chatbot" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await req.json();

    if (!name.trim()) {
      return NextResponse.json(
        { message: "Chatbot name cannot be empty" },
        { status: 400 }
      );
    }

    const updatedChatbot = await prisma.chatbot.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedChatbot, { status: 200 });
  } catch (error) {
    console.error("Error updating chatbot name:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
