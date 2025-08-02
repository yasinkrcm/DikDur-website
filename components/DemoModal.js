"use client"
import React, { useState } from "react"
import { X, Camera, User, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { t } from "@/lib/translations"

export default function DemoModal({ isOpen, onClose }) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: Camera,
      title: t('step1Title', language),
      description: t('step1Description', language),
      details: t('step1Details', language),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: User,
      title: t('step2Title', language),
      description: t('step2Description', language),
      details: t('step2Details', language),
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      title: t('step3Title', language),
      description: t('step3Description', language),
      details: t('step3Details', language),
      color: "from-purple-500 to-purple-600"
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t('postureAnalysisSetup', language)}
            </h2>
            <p className="text-gray-600 mt-1">
              {t('setupInstructions', language)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep 
                    ? `bg-gradient-to-r ${step.color} text-white` 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {React.createElement(step.icon, { className: "w-5 h-5" })}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${steps[currentStep].color} text-white mb-4`}>
              {React.createElement(steps[currentStep].icon, { className: "w-8 h-8" })}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 mb-4">
              {steps[currentStep].description}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    {t('importantNote', language)}:
                  </p>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {steps[currentStep].details}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('previous', language)}
            </button>

            <div className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center"
              >
                {t('next', language)}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose()
                  // Navigate to posture-cam page
                  window.location.href = '/posture-cam'
                }}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center"
              >
                {t('startAnalysis', language)}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 