"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Messages from "../../../../../components/Messages";
import { ChatSession } from "@/types/types";





export default function ReviewSession() {
  const { id } = useParams();
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSession = async () => {
      try {
        
        const response = await fetch(`/api/chatbot-session/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        const data = await response.json();
        
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  if (loading) return <p>Loading chat session messages...</p>;
  if (!session) return <p>No chat session found.</p>;

  return (
   <div className="flex-1 p-10 pb-24">
  <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>

  <p className="font-light text-xs text-gray-400 mt-2">
    Started at {new Date(session.createdAt).toLocaleString()}
  </p>

  <h2 className="font-light mt-2">
    Between {session.chatbot.name} &{" "}
    <span className="font-extrabold">
      {session.guest?.name|| "anon"} ({session.guest?.email||"no email"})
    </span>
  </h2>

  <hr className="my-10" />

  <Messages
    messages={session.messages}
    // chatSessionId={session.id}
    chatbotName={session.chatbot.name}
    // guestName={session.guest?.name}
  />
</div>

  );
}
