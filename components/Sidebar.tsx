import { BotMessageSquare, PencilLine, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Sidebar() {
  return (
    <div className="bg-white text-white p-5">
      <ul className="flex lg:flex-col gap-5 justify-around">
        <li>
          <Link
            href="/create-chatbot"
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-4 rounded-md bg-[#2991EE]"
          >
            <BotMessageSquare className="h-6 w-6 lg:h-8 lg:w-8" />
            <div className="hidden md:inline">
              <p className="text-xl">Create</p>
              <p className="text-sm font-extralight">New Chatbot</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/view-chatbots"
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-4 rounded-md bg-[#2991EE]"
          >
            <PencilLine className="h-6 w-6 lg:h-8 lg:w-8" />
            <div className="hidden md:inline">
              <p className="text-xl">Edit</p>
              <p className="text-sm font-extralight">Chatbots</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/review-sessions"
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-4 rounded-md bg-[#2991EE]"
          >
            <SearchIcon className="h-6 w-6 lg:h-8 lg:w-8" />
            <div className="hidden md:inline">
              <p className="text-xl">View</p>
              <p className="text-sm font-extralight">Sessions</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
