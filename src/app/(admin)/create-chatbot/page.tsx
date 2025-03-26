"use client";

import React, { useState } from "react";
import Avatar from "../../../../components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateChatbot() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/chatbots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user?.id, name }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Chatbot "${data.name}" created successfully!`);
        setName("");
        router.push(`/edit-chatbot/${data.id}`);
      } else {
        toast.error(data.message || "Error creating chatbot.");
      }
    } catch (error) {
      toast.error("Failed to create chatbot.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
      <Avatar seed="create-chatbot" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your conversations with your
          customers.
        </h2>
        <form
          className="flex flex-col md:flex-row gap-2 mt-5"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="ChatBot Name..."
            className="max-w-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? "Creating..." : "Create Chatbot"}
          </Button>
        </form>
        <p className="text-gray-500 text-sm mt-2">
          Example: Customer Support Chatbot
        </p>
        {/* {message && <p className="mt-3 text-center text-sm">{message}</p>} */}
      </div>
    </div>
  );
}

export default CreateChatbot;
