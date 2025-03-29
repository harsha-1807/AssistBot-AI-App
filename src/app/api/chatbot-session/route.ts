import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { chatbotId, guestId } = body;

        if (!chatbotId || typeof chatbotId !== "string") {
            return NextResponse.json({ error: "chatbotId is required and must be a string" }, { status: 400 });
        }

        // Check if guestId exists before inserting
        if (guestId) {
            const existingGuest = await prisma.guest.findUnique({
                where: { id: guestId },
            });

            if (!existingGuest) {
                return NextResponse.json({ error: "Invalid guestId: Guest does not exist" }, { status: 400 });
            }
        }

        // Create the chatbot session
        const chatSession = await prisma.chatSession.create({
            data: {
                chatbotId,
                guestId: guestId || null, // Allow null guestId
            },
        });

        return NextResponse.json(chatSession, { status: 201 });

    } catch (error) {
        console.error("Error creating chatbot session:", error);
        return NextResponse.json({
            error: "Internal Server Error",
        }, { status: 500 });
    }
}
