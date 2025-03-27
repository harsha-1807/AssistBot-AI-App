"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Chatbot } from "@/types/types";
import { Button } from "@/components/ui/button";
import Avatar from "../../../../components/Avatar";
import Link from "next/link";
import Loading from "../loading";

export const dynamic = "force-dynamic";

function ViewChatbots() {
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

  // sorting the chatbots by created date
  const sortedChatbots = [...chatbots].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!user?.id) return;
  if (loading) return <Loading/>;

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>
      {sortedChatbots.length === 0 && (
        <div>
          <p>
            You have not created any chatbots yet, Click on the button below to
            create one.
          </p>
          <Link href="/create-chatbot">
            <Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
              Create Chatbot
            </Button>
          </Link>
        </div>
      )}
      <ul className="flex flex-col space-y-5">
        {sortedChatbots.map((chatbot) => (
          <Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Avatar seed={chatbot.name} />
                  <h2 className="text-xl font-bold">{chatbot.name}</h2>
                </div>

                <p className="absolute top-5 right-5 text-xs text-gray-400">
                  Created: {new Date(chatbot.createdAt).toLocaleString()}
                </p>
              </div>

              <hr className="mt-4" />
              <div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
                <h3 className="italic">Characteristics:</h3>

                <ul className="text-xs">
                  {!chatbot.chatbotCharacteristics.length && (
                    <p>No characteristics added yet.</p>
                  )}

                  {chatbot.chatbotCharacteristics.map((characteristic) => (
                    <li
                      className="list-disc break-words"
                      key={characteristic.id}
                    >
                      {characteristic.content}
                    </li>
                  ))}
                </ul>

                <h3 className="italic">No. of Sessions:</h3>
                <p>{chatbot.chatSessions.length}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ViewChatbots;
