import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } } // Fix: Use `context` instead of destructuring directly
) {
  try {
    const { id } = context.params; // Extract `id` properly

    const deleteCharacteristic = await prisma.chatbotCharacteristic.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Characteristic deleted", deleteCharacteristic },
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

export async function POST(
  req: NextRequest,
  context: { params: { id: string } } // Fix: Use `context` properly
) {
  try {
    const { content } = await req.json();

    if (!content.trim()) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const { id: chatbotId } = context.params; // Extract `id` properly

    const newCharacteristic = await prisma.chatbotCharacteristic.create({
      data: {
        content,
        chatbotId, // Correct way to associate with chatbot
      },
    });

    return NextResponse.json(newCharacteristic, { status: 201 });
  } catch (error) {
    console.error("Error adding characteristic:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
