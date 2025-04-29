"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "This project is truly impressive! It makes building a customized chatbot incredibly simple and fast. I loved how I could define exactly what features I wanted, and within moments, I had a link to a fully functional chatbot tailored to my needs. It's efficient, and genuinely helpful, a real game-changer for anyone looking to create a chatbot without the hassle!",
    name: "Goutham Krishna",
    institution: "Computer Science Student, LPU",
  },
  {
    quote:
      "This project is really useful for anyone looking to build a chatbot for their website without in-depth knowledge on how to create one. I've used it in my website and it works flawlessly! Kudos to this idea and execution",
    name: "Levin Felix",
    institution: "Computer Science Student, LPU",
  },
  {
    quote:
      "Setting up my AI assistant took less than an hour, and it's helped me organize my study group sessions more efficiently. The interface is incredibly intuitive.",
    name: "Adhrit",
    institution: "Computer Science Student, LPU",
  },
  // {
  //   quote:
  //     "The multi-language support has been a game-changer for our international student association. We can now provide support to students in their native languages.",
  //   name: "Emma Wilson",
  //   institution: "International Studies, NYU",
  // },
  // {
  //   quote:
  //     "I use AI AssistBot to help answer questions about campus resources. It's reduced our support ticket volume by 40% and students get instant answers.",
  //   name: "David Park",
  //   institution: "Student Government, UC Berkeley",
  // },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = useCallback(() => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [next, prev])

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
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Student Testimonials</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-400 mb-4"
        >
          What Our Student Users Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Join students who have transformed their academic experience
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col justify-center p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg rounded-2xl">
                <div className="flex justify-center mb-2">
                  <Quote className="h-8 w-8 text-blue-500/30 dark:text-blue-400/30" />
                </div>
                <blockquote className="text-center">
                  <p className="text-sm md:text-lg text-slate-700 dark:text-slate-300 italic mb-4">
                  &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <footer>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-slate-900 dark:text-white">
                        {testimonials[current].name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonials[current].institution}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false)
                setCurrent(index)
              }}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-blue-500 w-8" : "bg-slate-300 dark:bg-slate-700"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 " />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
