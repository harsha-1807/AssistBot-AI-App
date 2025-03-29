import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new  GoogleGenerativeAI(process.env.AI_API_KEY!);



export async function POST(req: NextRequest) {
    try {
      const { chatSessionId, ChatbotId, content, name } = await req.json();
  



      // Validation
      if (!chatSessionId || !ChatbotId || !content || !name) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }
  
      // Fetch chatbot configuration
      const chatbot = await prisma.chatbot.findUnique({
        where: { id: ChatbotId },
        include: { chatbotCharacteristics: true },
      });
  
      if (!chatbot) {
        return NextResponse.json(
          { message: "Chatbot not found" },
          { status: 404 }
        );
      }
  
      // Get previous messages (limited to last 5 for context)
      const previousMessages = await prisma.message.findMany({
        where: { chatSessionId },
        orderBy: { createdAt: "asc" }, // Maintain chronological order
        take: 5,
      });
  
      // Construct system prompt
      const systemPrompt = [
        `You are a helpful assistant for ${name}.`,
        `Key information: ${chatbot.chatbotCharacteristics.map(c => c.content).join(" ")}`,
        "If asked about unrelated topics, politely decline to answer.",
        "Use emojis where appropriate."
      ].join(" ");
  
      // Initialize Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }]
          },
          {
            role: "model",
            parts: [{ text: "Understood. I'm ready to assist." }]
          },
          ...previousMessages.map(msg => ({
            role: msg.sender === "ai" ? "model" : "user" as const,
            parts: [{ text: msg.content }]
          }))
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.9,
        },
      });
  
      // Get AI response
      const result = await chat.sendMessage(content);
      const aiResponse = await result.response.text();
  
      if (!aiResponse) {
        return NextResponse.json(
          { error: "Failed to generate AI response" },
          { status: 500 }
        );
      }
  
      // Save messages to database
      await prisma.$transaction([
        prisma.message.create({
          data: {
            chatSessionId,
            content,
            sender: "user",
          }
        }),
        prisma.message.create({
          data: {
            chatSessionId,
            content: aiResponse,
            sender: "ai",
          }
        })
      ]);
  
      return NextResponse.json({ response: aiResponse }, { status: 200 });
  
    } catch (error) {
      console.error("Error sending message:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }