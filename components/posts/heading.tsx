import React from "react";

import { motion } from "framer-motion";

import styles from "./user-posts.module.css";

interface Props {
  username?: string;
  text?: string;
}

function HeadingText({ username, text }: Props) {
  return (
    <div>
      <h1 className={styles.headingText}>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {username ? <div>Here is {username}'s Posts</div> : <div>{text}</div>}
        </motion.span>
      </h1>{" "}
      {/* <div style={{ height: "35px" }}></div> */}
    </div>
  );
}

export default HeadingText;
