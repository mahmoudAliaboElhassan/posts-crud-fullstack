"use client"

import { HeaderElement } from "@/utils/types"
import { usePathname } from "next/navigation"

function UseHeaderElements() {
  const headerElementsUser: HeaderElement[] = [
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
  ]
  const headerElementNotUser: HeaderElement[] = [
    {
      href: "/posts",
      label: "POSTS",
    },
  ]
  return { headerElementsUser, headerElementNotUser }
}

export default UseHeaderElements
