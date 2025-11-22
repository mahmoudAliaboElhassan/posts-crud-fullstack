"use client"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

function Introductory() {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false)

  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: false,
  })

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
  })

  const words = "Welcome To Our Posts CRUD Interaction Application".split(" ")
  const secondText =
    "Feel free to create, edit, and interact with posts!".split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.06 * i,
      },
    }),
  }

  const child = {
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
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Heart Icon */}
          <motion.div
            ref={imgRef}
            variants={imageVariants}
            initial="hidden"
            animate={imgInView ? "visible" : "hidden"}
            className="flex-shrink-0"
          >
            <Heart className="w-32 h-32 lg:w-40 lg:h-40 text-pink-500 fill-pink-500" />
          </motion.div>

          {/* Text Content */}
          <div ref={textRef} className="flex-1 text-center lg:text-left">
            {/* Main Heading */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              onAnimationComplete={() => setFirstAnimationComplete(true)}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {words.map((word, index) => (
                <motion.span
                  variants={child}
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
                variants={container}
                initial="hidden"
                animate="visible"
                className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400"
              >
                {secondText.map((word, index) => (
                  <motion.span
                    variants={child}
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
      </div>
    </section>
  )
}

export default Introductory
