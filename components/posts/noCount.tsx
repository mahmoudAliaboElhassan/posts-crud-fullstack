import React from "react"
import { motion } from "framer-motion"
import { FaInbox } from "react-icons/fa"

function NoCount({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-12 text-center max-w-md">
        <FaInbox className="text-6xl text-zinc-300 dark:text-zinc-600 mx-auto mb-6" />
        <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400">
          {children}
        </p>
      </div>
    </motion.div>
  )
}

export default NoCount
