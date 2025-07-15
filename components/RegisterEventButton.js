"use client";
import { useRouter } from "next/navigation";

export default function RegisterEventButton({ eventId, onRegister }) {
  const router = useRouter();
  function handleRegister() {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    if (onRegister) onRegister();
    // ...register event işlemi burada yapılabilir
  }
  return (
    <button onClick={handleRegister} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#91C8E4] to-[#749BC2] text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Register Now
    </button>
  );
} 