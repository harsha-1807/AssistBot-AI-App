"use client"

import { motion } from "framer-motion"
import { BotIcon as Robot, Sliders, Share2, BarChart2 } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Create Your Chatbot",
    description: "Start with a template or build from scratch with our intuitive interface.",
    icon: Robot,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: 2,
    title: "Customize Personality and Knowledge",
    description: "Train your AI with your brand voice, FAQs, and knowledge base.",
    icon: Sliders,
    color: "from-purple-500 to-violet-600",
  },
  {
    number: 3,
    title: "Deploy Instantly via Shareable Link",
    description: "Get a unique link to embed your chatbot anywhere on the web.",
    icon: Share2,
    color: "from-green-500 to-teal-600",
  },
  {
    number: 4,
    title: "Analyze Conversations and Improve",
    description: "Review analytics and refine your chatbot based on real interactions.",
    icon: BarChart2,
    color: "from-orange-500 to-amber-600",
  },
]

export function StepsSection() {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-4"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Simple Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-400 mb-4"
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Get started in minutes with our simple four-step process
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-violet-500/20 to-transparent hidden md:block"></div>

            <div className="space-y-12 md:space-y-24 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <span className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-sm font-medium text-slate-800 dark:text-slate-200 mb-4">
                        Step {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-700 z-10 flex items-center justify-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} text-white shadow-lg`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="hidden items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} text-white shadow-lg`}
                      >
                        <step.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
