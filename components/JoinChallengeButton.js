"use client";
import { useRouter } from "next/navigation";

export default function JoinChallengeButton({ challengeId, onJoin }) {
  const router = useRouter();
  function handleJoin() {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    if (onJoin) onJoin();
    // ...join challenge işlemi burada yapılabilir
  }
  return (
    <button onClick={handleJoin} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Join Challenge
    </button>
  );
} 