"use client";
import React from "react";
import { useTheme } from "next-themes";
import { IoMdSunny } from "react-icons/io";
import { GoSun } from "react-icons/go";
import { Button } from "react-bootstrap";

function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      style={{ cursor: "pointer" }}
      // size="lg"
      // variant={theme === "dark" ? "dark" : "light"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <IoMdSunny size={25} /> : <GoSun size={25} />}
    </div>
  );
}

export default ModeToggle;
