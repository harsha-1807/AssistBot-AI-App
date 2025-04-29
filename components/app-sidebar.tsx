"use client"

import { useState } from "react"
import { BotIcon, Edit, Search } from "lucide-react"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarBody, SidebarLink } from "@/components/ui/sidebar"

export function AppSidebar() {
  const links = [
    {
      label: "Create New Chatbot",
      href: "/create-chatbot",
      icon: <BotIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Edit Your Chatbots",
      href: "/edit-chatbots",
      icon: <Edit className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "View Sessions",
      href: "/view-sessions",
      icon: <Search className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ]

  const [open, setOpen] = useState(false)

  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </SidebarProvider>
  )
}

export const Logo = () => {
  return (
    <a href="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-500 dark:bg-blue-400" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        AI AssistBot
      </motion.span>
    </a>
  )
}

export const LogoIcon = () => {
  return (
    <a href="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-500 dark:bg-blue-400" />
    </a>
  )
}
