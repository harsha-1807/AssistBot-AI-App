"use client"

import { motion } from "framer-motion"
import { Brain, Link, BarChart, RefreshCw, BookOpen, Globe, MessageSquare, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

const features = [
  {
    title: "AI Personality Crafting",
    description: "Create unique AI personalities tailored to your brand voice and customer needs.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Instant Deployment Links",
    description: "Deploy your chatbot instantly with shareable links for any platform.",
    icon: Link,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Conversation Analytics",
    description: "Gain insights from customer interactions to improve your chatbot over time.",
    icon: BarChart,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Real-time Configuration Sync",
    description: "Update your chatbot's behavior and knowledge in real-time without downtime.",
    icon: RefreshCw,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Dynamic Learning",
    description: "Your chatbot continuously improves from conversations and feedback.",
    icon: BookOpen,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Multi-language Support",
    description: "Communicate with customers in their preferred language with automatic translation.",
    icon: Globe,
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Contextual Memory",
    description: "Chatbot remembers previous interactions for more personalized conversations.",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Security and Encryption",
    description: "Enterprise-grade security to protect sensitive customer information.",
    icon: Shield,
    color: "from-slate-500 to-gray-500",
  },
]

// Optimized Feature Card component to improve performance
interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: Math.min(index * 0.1, 0.3), duration: 0.5 }}
      className="group"
    >
      <Card className="h-full border-none bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-xl">
        <CardContent className="p-6">
          <div
            className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-md"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${feature.color.replace("from-", "").replace("to-", "")})`,
            }}
          >
            <feature.icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-4"
        >
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Powerful Features</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-400 mb-4"
        >
          Everything You Need to Build Intelligent Chatbots
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Create chatbots that understand your customers, learn from interactions, and represent your brand perfectly
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
