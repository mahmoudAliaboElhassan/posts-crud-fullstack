"use client"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { MessageSquare, Users, Edit3, Trash2 } from "lucide-react"

function Introductory() {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false)

  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  const mainHeading = "Welcome To Our Posts CRUD Interaction Application".split(
    " "
  )
  const subtitle =
    "Create, edit, delete, and interact with posts in real-time!".split(" ")

  const features = [
    {
      icon: Edit3,
      title: "Create Posts",
      description: "Share your thoughts and ideas with the community",
    },
    {
      icon: MessageSquare,
      title: "Comment & Discuss",
      description: "Engage in meaningful conversations on any post",
    },
    {
      icon: Users,
      title: "User Profiles",
      description: "Manage your profile and track your contributions",
    },
    {
      icon: Trash2,
      title: "Full Control",
      description: "Edit or delete your content anytime you want",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.06,
      },
    },
  }

  const wordVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const imageVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  const featureCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Animated Icon */}
          <motion.div
            ref={imgRef}
            variants={imageVariants}
            initial="hidden"
            animate={imgInView ? "visible" : "hidden"}
            className="flex-shrink-0 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
            <MessageSquare
              className="w-32 h-32 lg:w-40 lg:h-40 text-pink-500 relative z-10"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Text Content */}
          <div ref={textRef} className="flex-1 text-center lg:text-left">
            {/* Main Heading */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              onAnimationComplete={() => setFirstAnimationComplete(true)}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              {mainHeading.map((word, index) => (
                <motion.span
                  variants={wordVariants}
                  key={index}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            {firstAnimationComplete && (
              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium"
              >
                {subtitle.map((word, index) => (
                  <motion.span
                    variants={wordVariants}
                    key={index}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            )}
          </div>
        </div>

        {/* Features Grid */}
        {firstAnimationComplete && (
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  custom={index}
                  variants={featureCardVariants}
                  className="p-6 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Introductory
