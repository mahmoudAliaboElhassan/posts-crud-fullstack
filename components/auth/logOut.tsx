"use client"

import axiosInstance from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import Swal from "sweetalert2"

function LogOut() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const handleLogOut = async () => {
    setLoading(true)
    try {
      await axiosInstance.get("/api/users/logout")
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      Swal.fire({
        title: "Error in Logging",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "ok",
        customClass: {
          confirmButton: "px-4 py-2 font-medium rounded-md text-white",
          cancelButton: "px-4 py-2 font-medium rounded-md text-white",
          actions: "gap-4",
        },

        buttonsStyling: false,

        didRender: () => {
          const confirmBtn = Swal.getConfirmButton()
          const cancelBtn = Swal.getCancelButton()

          // إضافة الخلفيات المطلوبة
          if (confirmBtn) confirmBtn.style.backgroundColor = "#e14d4d"
          if (cancelBtn) cancelBtn.style.backgroundColor = "#6b7280" // gray-500 تقريباً
        },
      })
    }
  }
  return (
    <div>
      <button disabled={loading} onClick={handleLogOut}>
        LogOut
      </button>
    </div>
  )
}

export default LogOut
