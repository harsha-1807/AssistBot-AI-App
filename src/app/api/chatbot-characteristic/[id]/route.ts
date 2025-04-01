import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate characteristic exists
    const characteristic = await prisma.chatbotCharacteristic.findUnique({
      where: { id: (await params).id },
    });

    if (!characteristic) {
      return NextResponse.json(
        { message: "Characteristic not found" },
        { status: 404 }
      );
    }

    const deleted = await prisma.chatbotCharacteristic.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json(
      { message: "Characteristic deleted", deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting characteristic:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {

    // Validate chatbot exists
    const chatbot = await prisma.chatbot.findUnique({
      where: { id: (await params).id },
    });

    if (!chatbot) {
      return NextResponse.json(
        { message: "Chatbot not found" },
        { status: 404 }
      );
    }

    const { content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const newCharacteristic = await prisma.chatbotCharacteristic.create({
      data: {
        content: content.trim(),
        chatbotId:(await params).id ,
      },
    });

    return NextResponse.json(newCharacteristic, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
