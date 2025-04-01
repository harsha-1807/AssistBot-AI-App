"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Chatbot } from "@/types/types";
import ChatbotSessions from "../../../../components/ChatbotSessions";
import Loading from "../loading";

function ViewSessions() {
  const { user } = useUser();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchChatbots = async () => {
      try {
        const response = await fetch(`/api/chatbots?clerk_user_id=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chatbots");
        }
        const data = await response.json();
        setChatbots(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatbots();
  }, [user?.id]);

  if (!user?.id) return null;
  if (loading) return <Loading />;

  return (
    <div className="w-[100vw] md:w-5xl mx-auto p-5">
      <h1 className="text-2xl font-bold ">Chat Sessions</h1>
      <h1 className="text-sm mb-4">
        Review all the ChatbotSessions that your chatbot had with your customers
      </h1>
      <ChatbotSessions chatbots={chatbots} />
    </div>
  );
}

export default ViewSessions;
