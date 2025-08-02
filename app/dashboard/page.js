"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { TrendingUp, Users } from "lucide-react";
import Card from "@/components/Card";
import PostureRecommendations from "@/components/PostureRecommendations";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/translations";

export default function DashboardPage() {
  useAuth();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [averagePostureScore, setAveragePostureScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      fetch("/api/posture/getAverageScore", { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.json()),
      fetch("/api/users/getUserCount").then((res) => res.json()),
    ]).then(([avgScore, userData]) => {
      setAveragePostureScore(avgScore.averageScore || 0);
      setUserCount(userData.userCount || 0);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">{t('loading', language)}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 py-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-2">{t('wellnessDashboard', language)}</h1>
          <p className="text-blue-dark/80 text-lg">{t('dashboardDescription', language)}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 bg-blue-light/30 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-dark" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-dark/70">{t('avgPostureScore', language)}</p>
                <p className="text-2xl font-bold text-blue-dark">{averagePostureScore.toFixed(1)}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100/80 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-dark/70">{t('activeMembers', language)}</p>
                <p className="text-2xl font-bold text-blue-dark">{userCount}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Posture Recommendations */}
        <PostureRecommendations averageScore={averagePostureScore} />
      </div>
    </div>
  )
}
