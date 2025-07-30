"use client"
import Link from "next/link"
import { ArrowRight, BarChart3, Gamepad2, Users, Brain, Calendar, Trophy, Sparkles, Zap, Heart } from "lucide-react"
import FeatureCard from "@/components/FeatureCard"
import AnimatedCounter from "@/components/AnimatedCounter"
import { useEffect, useState } from "react";

// AnimatedParticles bileşeni
function AnimatedParticles({ count = 20 }) {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    setBubbles(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 3 + Math.random() * 4,
      }))
    );
  }, [count]);
  return (
    <div className="absolute inset-0">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-light/40 rounded-full animate-float"
          style={{
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            animationDelay: `${bubble.animationDelay}s`,
            animationDuration: `${bubble.animationDuration}s`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const features = [
    {
      icon: BarChart3,
      title: "HR Dashboard",
      description: "AI-powered analytics that transform workplace wellness data into actionable insights.",
      color: "from-[#4682A9] to-[#749BC2]",
      bgPattern: "bg-gradient-to-br",
    },
    {
      icon: Gamepad2,
      title: "Gamified Wellness",
      description: "Turn healthy habits into an addictive game with rewards, streaks, and team competitions.",
      color: "from-[#749BC2] to-[#91C8E4]",
      bgPattern: "bg-gradient-to-br",
    },
    {
      icon: Users,
      title: "Therapy Network",
      description: "Connect instantly with certified physiotherapists through our smart matching algorithm.",
      color: "from-[#4682A9] to-[#91C8E4]",
      bgPattern: "bg-gradient-to-br",
    },
    {
      icon: Brain,
      title: "Smart AI Reminders",
      description: "Personalized wellness nudges that learn your patterns and optimize your health routine.",
      color: "from-[#749BC2] to-[#4682A9]",
      bgPattern: "bg-gradient-to-br",
    },
    {
      icon: Calendar,
      title: "Live Wellness Events",
      description: "Join immersive wellness experiences with colleagues in real-time virtual environments.",
      color: "from-[#91C8E4] to-[#749BC2]",
      bgPattern: "bg-gradient-to-br",
    },
    {
      icon: Trophy,
      title: "Reward Ecosystem",
      description: "Earn wellness coins and unlock premium gym memberships, spa treatments, and more.",
      color: "from-[#4682A9] to-[#749BC2]",
      bgPattern: "bg-gradient-to-br",
    },
  ]

  const stats = [
    { number: 10000, suffix: "+", label: "Happy Employees" },
    { number: 95, suffix: "%", label: "Wellness Score" },
    { number: 500, suffix: "+", label: "Partner Gyms" },
    { number: 24, suffix: "/7", label: "AI Support" },
  ]

  return (
    <div className="min-h-screen overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBDE] via-[#FFFBDE] to-[#91C8E4]/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#91C8E4] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#749BC2] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-[#4682A9] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#4682A9] to-[#749BC2] text-white rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Sparkles className="w-4 h-4 mr-2" />
              Türkiye'nin #1 Kurumsal Wellness Platformu
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4682A9] to-[#749BC2] mb-6 leading-tight">
              Dik<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4682A9] to-[#749BC2]">Dur</span>
            </h1>

            {/* Subtitle with Animation */}
            <div className="relative">
              <p className="text-2xl md:text-3xl text-gray-700 mb-4 max-w-4xl mx-auto font-light">
                Çalışan Sağlığını{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4682A9] to-[#749BC2]">
                  Devrim
                </span>{" "}
                Yapan Platform
              </p>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🚀</div>
            </div>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI destekli fizyoterapi çözümleri, gamifikasyon ve uzman ağımızla çalışanlarınızın sağlığını bir sonraki
              seviyeye taşıyın.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-dark to-blue-medium text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Hemen Başla
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-dark to-blue-medium rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </Link>

              <Link
                href="/posture-cam"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Brain className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Duruş Analizi
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group inline-flex items-center px-8 py-4 bg-cream/90 backdrop-blur-sm text-blue-dark font-semibold rounded-2xl border-2 border-blue-light hover:border-blue-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Heart className="mr-3 h-6 w-6 text-red-500 group-hover:animate-pulse" />
                Demo İzle
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-cream/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-light/30">
                    <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-dark to-blue-medium mb-2">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-blue-dark/80 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-light/50 to-blue-medium/50 text-blue-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Özellikler
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Wellness'ı Yeniden{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-dark to-blue-medium">
                Tanımlıyoruz
              </span>
            </h2>
            <p className="text-xl text-blue-dark/80 max-w-3xl mx-auto leading-relaxed">
              Her özellik, çalışanlarınızın sağlığını ve mutluluğunu artırmak için özenle tasarlandı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.color}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-dark via-blue-medium to-blue-dark"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated particles */}
        <AnimatedParticles count={20} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-cream mb-6">Hazır mısın?</h2>
          <p className="text-xl text-cream/80 mb-12 max-w-3xl mx-auto">
            Binlerce şirket zaten DikDur ile çalışanlarının sağlığını ve verimliliğini artırıyor.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-cream to-blue-light text-blue-dark font-bold rounded-2xl shadow-2xl hover:shadow-blue-light/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Ücretsiz Başla
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cream to-blue-light rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap gap-4 justify-center mt-12">
        {/* Kaldırıldı: Dashboard, Profil, Ödüller, Etkinlikler, Meydan Okumalar, Terapistler, Ergonomi, Bildirimler */}
      </div>
    </div>
  )
}
