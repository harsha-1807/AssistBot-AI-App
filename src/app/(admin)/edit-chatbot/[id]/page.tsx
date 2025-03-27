"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import Avatar from "../../../../../components/Avatar";
import Characteristic from "../../../../../components/Characteristic";
import { ChatbotCharacteristic } from "@/types/types";
import Loading from "../../loading";

function EditChatbot() {
  const params = useParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatbotName, setChatbotName] = useState("");
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const [characteristics, setCharacteristics] = useState<
    ChatbotCharacteristic[]
  >([]);
  const router = useRouter();

  const fetchChatbots = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/chatbots/${params.id}`);
      const data = await response.json();
      if (response.ok) {
        setChatbotName(data.name || "Unnamed Chatbot");
        setCharacteristics(data.chatbotCharacteristics);
      }
    } catch (error) {
      toast.error("Failed to fetch chatbot");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.id) {
      fetchChatbots();
    }
  }, [params.id]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/chatbot/${params.id}`;
    setUrl(url);
  }, [params]);

  //  Handle deletion of characteristics in real-time
  const handleDeleteCharacteristic = async (id: string) => {
    if (id) {
      await fetchChatbots();
    }
  };

  const handleDeleteChatbot = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this chatbot?"
    );
    if (!confirmDelete) return;
    try {
      const deletePromise = fetch(`/api/chatbots/${params.id}`, {
        method: "DELETE",
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to delete chatbot");
        }
        return res.json(); //  Ensure response is properly handled
      });

      toast.promise(deletePromise, {
        loading: "Deleting chatbot...",
        success: "Chatbot deleted successfully",
        error: "Failed to delete chatbot",
      });

      setTimeout(() => {
        router.push("/"); // Redirect only after successful deletion
      }, 500);
    } catch {
      toast.error("Failed to delete chatbot");
    }
  };

  // add characteristics
  const handleAddCharacteristic = async (content: string) => {
    if (!content.trim()) {
      return toast.error("Content is required");
    }

    try {
      // Perform the fetch inside `toast.promise`
      await toast.promise(
        fetch(`/api/chatbot-characteristic/${params.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to add characteristic");
          }
          return res.json();
        }),
        {
          loading: "Adding characteristic...",
          success: "Characteristic added successfully",
          error: "Failed to add characteristic",
        }
      );

      await fetchChatbots();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateChatbotName = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatbotName.trim()) {
      return toast.error("Chatbot name cannot be empty");
    }

    try {
      await toast.promise(
        fetch(`/api/chatbots/${params.id}`, {
          method: "PATCH", // Use PATCH or PUT depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: chatbotName }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to update chatbot name");
          }
          return res.json();
        }),
        {
          loading: "Updating chatbot name...",
          success: "Chatbot name updated successfully",
          error: "Failed to update chatbot name",
        }
      );

      await fetchChatbots(); // Refresh chatbot data after updating name
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <Loading/>;
  return (
    <div className="px-0 md:p-10">
      {/* link and copy container */}
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your customers to start conversations with your
          chatbot
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Link href={url} className="w-full cursor-pointer hover:opacity-50">
            <Input value={url} readOnly className="cursor-pointer bg-white" />
          </Link>
          <Button
            size="sm"
            className="px-3 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Link copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* chatbot info container */}
      <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg ">
        <Button
          variant="destructive"
          className="absolute top-2 right-2 h-8 w-8 cursor-pointer "
          onClick={() => {
            handleDeleteChatbot();
          }}
        >
          <Trash />
        </Button>

        <div className="flex space-x-4">
          {/* <h1 className="text-xl lg:text-3xl font-semibold">Chatbots</h1> */}
          <Avatar seed={chatbotName} className="w-14 " />
          <form
            // onSubmit={handleUpdateChatbot}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              value={chatbotName}
              onChange={(e) => {
                setChatbotName(e.target.value);
              }}
              placeholder={chatbotName}
              className="max-w-lg"
              required
            ></Input>
            <Button
              type="submit"
              disabled={!chatbotName}
              onClick={handleUpdateChatbotName}
              className="cursor-pointer"
            >
              Update
            </Button>
          </form>
        </div>
        {/* {loading ? <p>Loading...</p> : <ul>{chatbotName}</ul>} */}
        <h2 className="text-xl font-bold mt-10">Heres what your AI knows...</h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversations with your customers & users
        </p>

        <div className="bg-gray-200 p-5 rounded-md mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCharacteristic(newCharacteristic);
              setNewCharacteristic("");
            }}
            className="flex space-x-2 items-center"
          >
            <Input
              type="text"
              placeholder="Example: If customer asks for prices , provide pricing page: www.example.com/pricing"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!newCharacteristic}
              className="cursor-pointer"
            >
              Add
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-5 mt-4">
            {characteristics.map((characteristic) => (
              <Characteristic
                key={characteristic.id}
                characteristic={characteristic}
                onDelete={handleDeleteCharacteristic}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default EditChatbot;
