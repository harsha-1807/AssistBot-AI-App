export interface Chatbot {
  id: number;
  clerkUserId: string;
  name: string;
  createdAt: string;
  chatbotCharacteristics: ChatbotCharacteristic[];
  chatSessions: ChatSession[];
}
export interface ChatbotCharacteristic {
  id: number;
  chatbot: Chatbot;
  chatbotId: number;
  content: string;
  createdAt: string;
}
export interface Guest {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  chatSessions: ChatSession[];
}

export interface ChatSession {
  id: number;
  chatbot: Chatbot;
  chatbotId: number;
  guest: Guest;
  guestId: string | null;
  messages: Message[];
  createdAt: string;
}
export interface Message {
  id: string;
  chatSession?: ChatSession;
  chatSessionId: string;
  content: string;
  sender: "ai" | "user";
  createdAt: string;
}
