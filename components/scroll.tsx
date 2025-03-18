"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

import { useTheme } from "next-themes";

const ScrollToTopButton = () => {
  const { theme, setTheme } = useTheme();

  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 100 && !showButton) {
      setShowButton(true);
    } else if (window.scrollY <= 100 && showButton) {
      setShowButton(false);
    }
  };

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showButton]); // Only re-add event listener when showButton changes
  // const firstSectionRef = useRef(null);

  return (
    <Button
      variant={theme === "dark" ? "dark" : "light"}
      style={{
        position: "fixed",
        bottom: showButton ? 10 : -50,
        right: 20,
        transition: "bottom 0.6s",
        zIndex: "999",
        borderRadius: "50%",
      }}
    >
      <div onClick={handleButtonClick}>
        <FaArrowUp size={25} />
      </div>
    </Button>
  );
};

export default ScrollToTopButton;
