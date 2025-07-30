"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Activity, Sparkles, Trophy, Bell, User } from "lucide-react"
import LogoutButton from "./LogoutButton";
import ClientOnly from "./ClientOnly";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(!!localStorage.getItem("token"));
      const handleStorage = () => setLoggedIn(!!localStorage.getItem("token"));
      const handleAuthChanged = () => setLoggedIn(!!localStorage.getItem("token"));
      window.addEventListener("storage", handleStorage);
      window.addEventListener("authChanged", handleAuthChanged);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("authChanged", handleAuthChanged);
      };
    }
  }, []);

  // Puanları düzenli olarak güncelle
  useEffect(() => {
    let interval;
    const fetchPoints = () => {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("/api/rewards/user-stats", { headers: { "Authorization": `Bearer ${token}` } })
          .then(async res => {
            if (!res.ok) return null;
            try { return await res.json(); } catch { return null; }
          })
          .then(data => setPoints(data?.totalPoints ?? null));
      } else {
        setPoints(null);
      }
    };
    fetchPoints();
    interval = setInterval(fetchPoints, 10000); // 10 saniyede bir güncelle
    window.addEventListener("storage", fetchPoints);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", fetchPoints);
    };
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" }
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Activity className="h-10 w-10 text-[#4682A9] group-hover:text-[#749BC2] transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#91C8E4] to-[#749BC2] rounded-full animate-pulse"></div>
            </div>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-[#4682A9] group-hover:from-[#4682A9] group-hover:to-[#749BC2] transition-all duration-300">
              DikDur
            </span>
          </Link>

          {/* Mobilde points ve menü */}
          <div className="flex items-center md:hidden">
            <span className="flex items-center text-blue-dark font-bold bg-blue-100 px-3 py-1 rounded-xl text-sm mr-2">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              {points !== null ? points : "0"}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-700 hover:text-[#4682A9] transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-[#4682A9] font-medium transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4682A9] to-[#749BC2] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            {/* Bildirimler ve Profil simgeleri */}
            <Link href="/notifications" className="relative text-gray-700 hover:text-[#4682A9] transition-colors duration-300 group">
              <Bell className="h-6 w-6" />
            </Link>
            <Link href="/users" className="relative text-gray-700 hover:text-[#4682A9] transition-colors duration-300 group">
              <User className="h-6 w-6" />
            </Link>
            <ClientOnly>
              {loggedIn ? (
                <LogoutButton className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group" />
              ) : (
                <>
                  <Link href="/login" className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">Giriş</Link>
                  <Link href="/register" className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#91C8E4] to-[#749BC2] text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">Kayıt Ol</Link>
                </>
              )}
            </ClientOnly>
            <Link 
              href="/posture-cam"
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              Başla
            </Link>
            {/* Desktopta points */}
            <span className="hidden md:flex items-center text-blue-dark font-bold bg-blue-100 px-3 py-1 rounded-xl text-sm ml-2">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              {points !== null ? points : "-"}
            </span>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-gray-200/20 bg-[#FFFBDE]/90 backdrop-blur-md rounded-b-2xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#4682A9] font-medium px-4 py-2 rounded-lg hover:bg-[#FFFBDE] transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <ClientOnly>
                {loggedIn ? (
                  <LogoutButton className="mx-4 mt-4 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" />
                ) : (
                  <>
                    <Link href="/login" className="mx-4 mt-4 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">Giriş</Link>
                    <Link href="/register" className="mx-4 mt-2 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#91C8E4] to-[#749BC2] text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">Kayıt Ol</Link>
                  </>
                )}
              </ClientOnly>
              <Link 
                href="/posture-cam"
                className="mx-4 mt-4 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white font-bold rounded-xl shadow-lg"
              >
                Başla
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
