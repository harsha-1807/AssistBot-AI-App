"use client";
import { Chatbot, Message } from "@/types/types";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import startNewChat from "@/lib/startNewChat";
import Avatar from "../../../../../components/Avatar";
import Messages from "../../../../../components/Messages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  message: z.string().min(2, "Your message is too short!"),
});

function ChatbotPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatBotData, setchatBotData] = useState<Chatbot>();
  const [messageLoading,setmessageLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return; // Ensure ID is available

    const fetchChatbot = async () => {
      try {
        const response = await fetch(`/api/chatbots/${id}`);
        if (!response.ok) {
          throw new Error("Chatbot not found");
        }
        const data = await response.json();

        setchatBotData(data);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };

    fetchChatbot();
  }, [id]);
  const fetchMessages = async (chatSessionId: string) => {
    try {
      const response = await fetch(`/api/messages/${chatSessionId}`);
      if (!response.ok) throw new Error("Messages not found");

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleInformationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const chatId = await startNewChat(name, email, String(id));
    setChatId(chatId);

    fetchMessages(String(chatId));

    setLoading(false);
    setIsOpen(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setmessageLoading(true);
    const { message: formMessage } = values;
    const message = formMessage;
    form.reset();

    if (!name || !email) {
      setIsOpen(true);
      setLoading(false);
      return;
    }

    if (!message.trim()) return;

    // Create temporary messages
    const userMessage: Message = {
      id: Date.now().toString(), 
      content: message,
      createdAt: new Date().toISOString(),
      chatSessionId: chatId.toString(), 
      sender: "user",
    };

    const loadingMessage: Message = {
      id: "temp-" + Date.now().toString(), // Temporary ID
      content: "Thinking...",
      createdAt: new Date().toISOString(),
      chatSessionId: chatId.toString(),
      sender: "ai",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      loadingMessage,
    ]);

    try {
      if (!chatId || !id || !message || !name) {
        console.error("Missing required fields", { chatId, id, message, name });
        return;
      }

      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          chatSessionId: chatId.toString(),
          ChatbotId: id.toString(), 
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Update messages correctly
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                id: result.id, 
                content: result.response,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Update with error message
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, content: "Sorry, something went wrong!" }
            : msg
        )
      );
    } finally {
      setmessageLoading(false);
    }
  }

  return (
    <div className="w-full flex bg-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleInformationSubmit}>
            <DialogHeader>
              <DialogTitle>Lets help you out! </DialogTitle>
              <DialogDescription>
                I just need a few details to get started.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="John@mail.com"
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!name || !email || loading}
                  className="cursor-pointer"
                >
                  {!loading ? "Continue" : "Loading..."}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col w-full max-w-xl mx-auto bg-white md:rounded-t-lg shadow-2xl ">
        <div className="pb-4 border-b sticky top-0 z-50 bg-[#407DFB] py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-4">
          <Avatar
            seed={chatBotData?.name || "anonymous"}
            className="h-12 w-12 bg-white rounded-full border-2 border-white"
          />

          <div>
            <h1 className="truncate text-lg">{chatBotData?.name}</h1>
            <p className="text-sm text-gray-300">Typically replies Instantly</p>
          </div>
        </div>

        <Messages
          messages={messages}
          chatbotName={chatBotData?.name || "anonymous"}
        />

        <Form {...form}>
          <form
            className="flex items-start sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Type a message..."
                      {...field}
                      className="p-4 w-full resize-none overflow-y-auto min-h-[60px] max-h-[200px] bg-white focus:ring-2 focus:ring-blue-500"
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      
                    onKeyDown={(e)=>{
                      if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-full cursor-pointer"
              disabled={form.formState.isSubmitting || !form.formState.isValid || messageLoading}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ChatbotPage;
