"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className = "" }) {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    window.dispatchEvent(new Event("authChanged"));
    router.push("/login");
  }
  return (
    <button onClick={handleLogout} className={className}>
      Çıkış
    </button>
  );
} 