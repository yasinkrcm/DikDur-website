"use client"
import Link from "next/link"
import { ArrowRight, Brain, Sparkles, Zap, Heart } from "lucide-react"
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/translations";
import DemoModal from "@/components/DemoModal";
import SiteTour from "@/components/SiteTour";

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
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSiteTourOpen, setIsSiteTourOpen] = useState(false);

  // Check if this is the first visit and show site tour
  useEffect(() => {
    const hasVisited = localStorage.getItem('dikdur-has-visited')
    if (!hasVisited) {
      // Show site tour after a short delay
      const timer = setTimeout(() => {
        setIsSiteTourOpen(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])


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
      <section id="hero-section" className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4682A9] to-[#749BC2] mb-6 leading-tight">
              Dik<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4682A9] to-[#749BC2]">Dur</span>
            </h1>

            {/* Subtitle with Animation */}
            <div className="relative">
              <p className="text-2xl md:text-3xl text-gray-700 mb-4 max-w-4xl mx-auto font-light">
                {t('employeeHealth', language)}{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4682A9] to-[#749BC2]">
                  {t('revolution', language)}
                </span>{" "}
                {t('platform', language)}
              </p>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🚀</div>
            </div>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('aiDescription', language)}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/posture-cam"
                id="posture-analysis-btn"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Brain className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                {t('postureAnalysis', language)}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="group inline-flex items-center px-8 py-4 bg-cream/90 backdrop-blur-sm text-blue-dark font-semibold rounded-2xl border-2 border-blue-light hover:border-blue-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="mr-3 h-6 w-6 text-red-500 group-hover:animate-pulse" />
                {t('guide', language)}
              </button>
            </div>
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
      
      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
      
      {/* Site Tour */}
      <SiteTour 
        isOpen={isSiteTourOpen} 
        onClose={() => setIsSiteTourOpen(false)} 
      />
    </div>
  )
}
