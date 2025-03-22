import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkUserId, name } = body;

    if (!clerkUserId || !name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const chatbot = await prisma.chatbot.create({
      data: { clerkUserId, name },
    });

    return NextResponse.json({ message: "Chatbot created!", id: chatbot.id, name: chatbot.name }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const chatbots = await prisma.chatbot.findMany();
    return NextResponse.json(chatbots, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}