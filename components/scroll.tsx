"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Button } from "react-bootstrap";

import ArrowPage from "@/assets/arrow.png";

const ScrollToTopButton = () => {
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
        <Image src={ArrowPage} width={25} height={25} alt="Scroll Arrow" />
      </div>
    </Button>
  );
};

export default ScrollToTopButton;
