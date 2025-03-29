import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const guest = await prisma.guest.create({
            data: { name, email },
        });

        return NextResponse.json(guest, { status: 201 });
    } catch (error) {
        console.error("Error creating guest:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
