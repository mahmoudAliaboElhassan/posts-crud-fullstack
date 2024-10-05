"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

import "./introductory.css";
import Heart from "@/assets/heart.png";
import Image from "next/image";

function Introductory() {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

  // Use useInView hook
  const { ref: imgRef, inView: imgInView } = useInView({ triggerOnce: false });
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
  });

  const words = "Welcome To Our Posts CRUD Interaction Application".split(" ");
  const secondText =
    "Feel free to create, edit, and interact with posts!".split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.22, delayChildren: 0.06 * i },
    }),
  };

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
  };

  return (
    <div className={`hero text-center text-md-left`}>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "600px",
        }}
        className="flex-column flex-md-row"
      >
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, y: -100 }}
          animate={imgInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="hero-right"
        >
          <Image
            src={Heart}
            width={60}
            height={60}
            loading="lazy"
            alt="Introductory Image"
          />
        </motion.div>
        <div className="hero-left">
          <h2>
            {/* First Animation */}
            <motion.div
              style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                fontSize: "2rem",
              }}
              ref={textRef}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              variants={container}
              onAnimationComplete={() => setFirstAnimationComplete(true)} // Trigger the second animation
            >
              {words.map((word, index) => (
                <motion.span
                  variants={child}
                  style={{ marginRight: "5px" }}
                  key={index}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Second Animation */}
            {firstAnimationComplete && (
              <motion.div
                style={{
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  fontSize: "1.5rem",
                  marginTop: "20px", // Add space between the two texts
                }}
                initial="hidden"
                animate="visible"
                variants={container}
              >
                {secondText.map((word, index) => (
                  <motion.span
                    variants={child}
                    style={{ marginRight: "5px" }}
                    key={index}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </h2>
        </div>
      </Container>
    </div>
  );
}

export default Introductory;
