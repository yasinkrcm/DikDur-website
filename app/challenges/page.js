"use client";

import { useEffect, useState } from "react";
import { Trophy, Users, Calendar, Target } from "lucide-react";
import Card from "@/components/Card";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/challenges/list", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setChallenges(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, []);

  const weeklyChallenge = {
    title: "Posture Perfect Week",
    description: "Maintain good posture for 80% of your work hours",
    progress: 65,
    daysLeft: 3,
    participants: 87,
  };

  const leaderboard = [
    { rank: 1, name: "Team Alpha", points: 2450, badge: "🥇" },
    { rank: 2, name: "Wellness Warriors", points: 2380, badge: "🥈" },
    { rank: 3, name: "Posture Pros", points: 2210, badge: "🥉" },
    { rank: 4, name: "Stretch Squad", points: 1980, badge: "" },
    { rank: 5, name: "Health Heroes", points: 1875, badge: "" },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness Challenges</h1>
          <p className="text-gray-600">Join challenges, compete with colleagues, and earn rewards</p>
        </div>

        {/* Current Weekly Challenge */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">This Week's Challenge</h2>
                <p className="text-blue-600 font-medium">Featured Challenge</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{weeklyChallenge.daysLeft}</p>
              <p className="text-sm text-gray-600">days left</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{weeklyChallenge.title}</h3>
          <p className="text-gray-600 mb-4">{weeklyChallenge.description}</p>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{weeklyChallenge.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${weeklyChallenge.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm">{weeklyChallenge.participants} participants</span>
            </div>
            <button className="btn-primary">Join Challenge</button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Challenges */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{challenge.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4" />
                        <span>{challenge.points} pts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{challenge.timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full btn-primary">Join Challenge</button>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Leaderboard</h2>
            <Card>
              <div className="space-y-4">
                {leaderboard.map((team, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full font-bold text-gray-900">
                        {team.badge || team.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{team.name}</p>
                        <p className="text-sm text-gray-500">Rank #{team.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{team.points.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full btn-secondary">View Full Leaderboard</button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
