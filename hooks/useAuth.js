"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(redirect = true) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token") && redirect) {
      router.replace("/login");
    }
  }, [router, redirect]);
} 