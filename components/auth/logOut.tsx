"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

function LogOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogOut = async () => {
    setLoading(true);
    try {
      await axiosInstance.get("/api/users/logout");
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        title: "Error in Logging",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };
  return (
    <div>
      <button disabled={loading} onClick={handleLogOut}>
        LogOut
      </button>
    </div>
  );
}

export default LogOut;
