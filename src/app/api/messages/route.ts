import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { chatSessionId, content, sender } = body;

    
        if (!chatSessionId || !content || !sender) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // post message using Prisma
        const message = await prisma.message.create({
            data: {
                chatSessionId,
                content,
                sender,
            },
        });

        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        console.error("Error inserting message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
