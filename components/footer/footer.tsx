"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { Container } from "react-bootstrap";
import Image from "next/image";

import "./footer.css";
import HeartImage from "@/assets/heart.png";

const Footer = () => {
  const pathname = usePathname();
  const date = new Date();
  return (
    <div
      className="footer-container"
      style={{ marginTop: pathname === "/signup" ? "5rem" : "" }}
    >
      <Container>
        <h3 className="text-center">
          Made with{" "}
          <Image src={HeartImage} width={30} height={30} alt="heart-img" /> by{" "}
          <span>Mahmoud</span> {date.getFullYear()}
        </h3>
      </Container>
    </div>
  );
};

export default Footer;
