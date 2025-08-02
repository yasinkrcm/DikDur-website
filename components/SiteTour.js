"use client"
import React, { useState, useEffect } from "react"
import { X, ArrowRight, ArrowLeft, Play, Camera, Users, Trophy, Calendar, Brain, BarChart3 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { t } from "@/lib/translations"

export default function SiteTour({ isOpen, onClose }) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  const tourSteps = [
    {
      icon: Play,
      title: t('tourWelcomeTitle', language),
      description: t('tourWelcomeDesc', language),
      highlight: 'hero-section',
      position: 'center'
    },
    {
      icon: Camera,
      title: t('tourPostureTitle', language),
      description: t('tourPostureDesc', language),
      highlight: 'posture-analysis-btn',
      position: 'bottom'
    },
    {
      icon: Brain,
      title: t('tourAITitle', language),
      description: t('tourAIDesc', language),
      highlight: 'ai-features',
      position: 'top'
    },
    {
      icon: Users,
      title: t('tourCommunityTitle', language),
      description: t('tourCommunityDesc', language),
      highlight: 'community-section',
      position: 'left'
    },
    {
      icon: Trophy,
      title: t('tourRewardsTitle', language),
      description: t('tourRewardsDesc', language),
      highlight: 'rewards-section',
      position: 'right'
    },
    {
      icon: BarChart3,
      title: t('tourDashboardTitle', language),
      description: t('tourDashboardDesc', language),
      highlight: 'dashboard-btn',
      position: 'center'
    }
  ]

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem('dikdur-has-visited')
    if (!hasVisited && isOpen) {
      setIsFirstVisit(true)
      localStorage.setItem('dikdur-has-visited', 'true')
    }
    
    // Scroll to first element when tour opens
    if (isOpen && currentStep === 0) {
      setTimeout(() => {
        const element = document.getElementById(tourSteps[0].highlight)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 500)
    }
  }, [isOpen, currentStep, tourSteps])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Scroll to highlighted element
      setTimeout(() => {
        const element = document.getElementById(tourSteps[currentStep + 1].highlight)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Scroll to highlighted element
      setTimeout(() => {
        const element = document.getElementById(tourSteps[currentStep - 1].highlight)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  if (!isOpen) return null

  const currentTourStep = tourSteps[currentStep]

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Highlighted Element Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {/* This will be positioned dynamically based on the highlighted element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-32 bg-white/10 rounded-lg border-2 border-white/30 shadow-2xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tour Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <currentTourStep.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t('siteTour', language)}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentStep + 1} / {tourSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <currentTourStep.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {currentTourStep.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {currentTourStep.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('previous', language)}
              </button>

              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                {currentStep === tourSteps.length - 1 ? t('finish', language) : t('next', language)}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Skip Button */}
            <div className="text-center mt-4">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {t('skipTour', language)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 