import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleteCharacteristics = await prisma.chatbotCharacteristic.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Characteristic deleted", deleteCharacteristics },
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
