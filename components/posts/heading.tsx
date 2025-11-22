import React from "react"
import { motion } from "framer-motion"

interface Props {
  username?: string
  text?: string
}

function HeadingText({ username, text }: Props) {
  return (
    <div className="text-center mb-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        {username ? `Here are ${username}'s Posts` : text}
      </motion.h1>
    </div>
  )
}

export default HeadingText
