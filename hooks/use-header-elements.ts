"use client";

import { HeaderElement } from "@/utils/types";
import { usePathname } from "next/navigation";

function UseHeaderElements() {
  const pathName = usePathname();
  const headerElements: HeaderElement[] = [
    {
      href: "/posts/add",
      label: "ADD POST",
    },
    {
      href: "/posts",
      label: "POSTS",
    },
    {
      href: "/posts/user",
      label: "YOUR POSTS",
    },
  ];
  return { headerElements };
}

export default UseHeaderElements;
