import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 md:p-10 bg-white m-4 md:m-10 rounded-md w-full max-w-2xl mx-auto h-screen md:h-max">
      <h1 className="text-3xl md:text-4xl font-light mb-4 md:mb-6">
        Welcome to{" "}
        <span className="text-[#6485F5] font-semibold">AI AssistBot</span>
      </h1>
      <h2 className="text-base md:text-lg mt-2 mb-6 md:mb-10">
        Your customisable AI chat agent that helps you manage your customer
        conversations.
      </h2>
      <Link href="/create-chatbot">
        <Button className="bg-[#6485F5] w-full md:w-auto">
          Lets get started by creating your first chatbot
        </Button>
      </Link>
    </main>
  );
}