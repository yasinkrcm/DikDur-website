"use client"
import React, { useState, useEffect } from "react"
import { Brain, Lightbulb, TrendingUp, Clock, Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { t } from "@/lib/translations"

export default function PostureRecommendations({ averageScore }) {
  const { language } = useLanguage()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateRecommendations = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/posture/getRecommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          averageScore: averageScore,
          language: language
        })
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      const data = await response.json()
      setRecommendations(data.recommendations || [])
    } catch (err) {
      console.error("Error fetching recommendations:", err)
      setError(err.message)
      // Fallback recommendations
      setRecommendations(getFallbackRecommendations(averageScore))
    } finally {
      setLoading(false)
    }
  }

  const getFallbackRecommendations = (score) => {
    if (score >= 80) {
      return [
        {
          title: t('excellentPosture', language),
          description: t('excellentPostureDesc', language),
          icon: 'Sparkles',
          priority: 'high',
          category: 'maintenance'
        },
        {
          title: t('advancedExercises', language),
          description: t('advancedExercisesDesc', language),
          icon: 'TrendingUp',
          priority: 'medium',
          category: 'improvement'
        }
      ]
    } else if (score >= 60) {
      return [
        {
          title: t('goodPosture', language),
          description: t('goodPostureDesc', language),
          icon: 'Lightbulb',
          priority: 'high',
          category: 'improvement'
        },
        {
          title: t('stretchingRoutine', language),
          description: t('stretchingRoutineDesc', language),
          icon: 'Clock',
          priority: 'medium',
          category: 'routine'
        }
      ]
    } else {
      return [
        {
          title: t('improvePosture', language),
          description: t('improvePostureDesc', language),
          icon: 'Brain',
          priority: 'high',
          category: 'critical'
        },
        {
          title: t('ergonomicSetup', language),
          description: t('ergonomicSetupDesc', language),
          icon: 'Lightbulb',
          priority: 'high',
          category: 'setup'
        }
      ]
    }
  }

  useEffect(() => {
    if (averageScore > 0) {
      generateRecommendations()
    }
  }, [averageScore, language])

  const getIconComponent = (iconName) => {
    const icons = {
      Brain: Brain,
      Lightbulb: Lightbulb,
      TrendingUp: TrendingUp,
      Clock: Clock,
      Sparkles: Sparkles
    }
    return icons[iconName] || Brain
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      case 'low':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'critical':
        return 'text-red-600'
      case 'improvement':
        return 'text-blue-600'
      case 'maintenance':
        return 'text-green-600'
      case 'setup':
        return 'text-purple-600'
      case 'routine':
        return 'text-orange-600'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          <span className="text-gray-600">{t('generatingRecommendations', language)}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('aiPostureRecommendations', language)}
            </h3>
            <p className="text-sm text-gray-500">
              {t('personalizedAdvice', language)}: {averageScore.toFixed(1)}/100
            </p>
          </div>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          <span>{t('refresh', language)}</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => {
          const IconComponent = getIconComponent(recommendation.icon)
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getPriorityColor(recommendation.priority)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <IconComponent className={`h-5 w-5 ${getCategoryColor(recommendation.category)}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {recommendation.title}
                    </h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(recommendation.category)} bg-white`}>
                      {t(recommendation.category, language)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {recommendation.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 mb-1">
              {t('aiPowered', language)}
            </p>
            <p className="text-xs text-blue-600">
              {t('aiPoweredDesc', language)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 