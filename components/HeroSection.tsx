"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-blue-500/10 to-violet-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-6">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                AI-Powered Chatbot Platform
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400 mb-6"
            >
              Build Intelligent Chatbots in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto md:mx-0"
            >
              Create, customize, and deploy AI chatbots that understand your
              customers and represent your brand perfectly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              
              <Link href="/create-chatbot" className="flex items-center justify-center" >
                <Button
                  size="lg"
                  variant="outline"

                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 text-lg font-medium cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                Watch Demo
              </Button>
                </Link>
             
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex items-center justify-center md:justify-start gap-6"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  2,500+
                </span>{" "}
                businesses trust us
              </div>
            </motion.div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 backdrop-blur-sm" />
              <div className="relative p-8">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        AI AssistBot
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Online
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="bg-blue-50 dark:bg-slate-800 rounded-lg rounded-tl-none p-3 text-sm text-slate-700 dark:text-slate-300">
                        Hello! How can I help you today?
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-blue-600 rounded-lg rounded-tr-none p-3 text-sm text-white">
                        I need help setting up my online store.
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 mt-1" />
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="bg-blue-50 dark:bg-slate-800 rounded-lg rounded-tl-none p-3 text-sm text-slate-700 dark:text-slate-300">
                        I&apos;d be happy to help with your online store setup! Let&apos;s
                        start with the basics. What platform are you using for
                        your store?
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full h-12 px-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Zap className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 blur-3xl opacity-20" />
            <div className="absolute -bottom-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 blur-2xl opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
