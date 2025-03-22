"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import Avatar from "../../../../../components/Avatar";
import { Chatbot } from "@/types/types";

function EditChatbot() {
  const params = useParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatbotName, setChatbotName] = useState("");
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const[data,setdata] = useState<Chatbot>(); 

  useEffect(() => {
    const fetchChatbots = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/chatbots/${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setdata(data);
          console.log(data);
          
          setChatbotName(data.name || "Unnamed Chatbot");
        } else {
          toast.error(data.message || "Error fetching chatbot");
        }
      } catch (error) {
        toast.error("Failed to fetch chatbot");
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchChatbots();
    }
  }, [params.id]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/chatbot/${params.id}`;
    setUrl(url);
  }, [params]);

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
            className="px-3"
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
          className="absolute top-2 right-2 h-8 w-2"
          // onClick={() => {}}
        >
          X
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
            <Button type="submit" disabled={!chatbotName}>
              Update
            </Button>
          </form>
        </div>
          {/* {loading ? <p>Loading...</p> : <ul>{chatbotName}</ul>} */}
          <h2 className="text-xl font-bold mt-10">
            Heres what your AI knows...
          </h2>
          <p>
            Your chatbot is equipped with the following information to assist
            you in your conversations with your customers & users
          </p>

          <div>
            <form 
            // onSubmit={}
            
            >
              <Input
              type="text"
              placeholder="Example: If customer asks for prices , provise pricing page: www.example.com/pricing"
              value={newCharacteristic}
              onChange={(e)=>setNewCharacteristic(e.target.value)}/>
              <Button type="submit" disabled={!newCharacteristic}>
                Add
              </Button>
            </form>

            <ul>
  {data?.chatbotCharacteristics?.length ? (
    data.chatbotCharacteristics.map((characteristic) => (
      <li key={characteristic.id} className="flex items-center justify-between">
        <span>{characteristic.content}</span>
        <Button variant="destructive">
          X
        </Button>
      </li>
    ))
  ) : (
    <p className="text-gray-500 italic">No characteristics available.</p>
  )}
</ul>
          </div>
      </section>
    </div>
  );
}

export default EditChatbot;
