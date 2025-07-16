"use client";
import { useEffect, useState } from "react";
import { Trophy, Star, Zap, Target, Award } from "lucide-react";
import Card from "@/components/Card";

export default function RewardsPage() {
  const [userStats, setUserStats] = useState(null);
  const [earnedRewards, setEarnedRewards] = useState([]);
  const [rewardCatalog, setRewardCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      fetch("/api/rewards/user-stats", { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.json()),
      fetch("/api/rewards/earned", { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.json()),
      fetch("/api/rewards/catalog", { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.json()),
    ]).then(([stats, earned, catalog]) => {
      setUserStats(stats);
      setEarnedRewards(Array.isArray(earned) ? earned : earned.data || []);
      setRewardCatalog(Array.isArray(catalog) ? catalog : catalog.data || []);
      setLoading(false);
    });
  }, []);

  const handleRedeem = async (rewardId) => {
    setMessage("");
    const token = localStorage.getItem("token");
    const res = await fetch("/api/rewards/redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ rewardId }),
    });
    if (res.ok) {
      setMessage("Reward redeemed!");
    } else {
      setMessage("Redeem failed.");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Points</h1>
          <p className="text-gray-600">Redeem your wellness points for amazing rewards</p>
        </div>

        {/* User Stats */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userStats?.totalPoints != null ? userStats.totalPoints.toLocaleString() : "-"}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </Card>
            <Card className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">+{userStats.weeklyPoints}</p>
              <p className="text-sm text-gray-600">This Week</p>
            </Card>
            <Card className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">#{userStats.rank}</p>
              <p className="text-sm text-gray-600">Company Rank</p>
            </Card>
            <Card className="text-center">
              <div className="p-3 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userStats.streak} days</p>
              <p className="text-sm text-gray-600">Current Streak</p>
            </Card>
          </div>
        )}

        {/* Earned Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earnedRewards.map((reward) => (
              <Card key={reward.id} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${reward.color} mb-4`}>
                  {/* reward.icon yerine sabit ikonlar kullanılabilir */}
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">+{reward.points}</span>
                  <span className="text-sm text-gray-500">points</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Earned on {new Date(reward.dateEarned).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Reward Catalog */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reward Catalog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardCatalog.map((reward) => (
              <Card key={reward.id}>
                <img src={reward.image || "/placeholder.svg"} alt={reward.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{reward.category}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-600 font-bold">{reward.points} pts</span>
                  {reward.discount && <span className="text-green-600 font-semibold">{reward.discount}</span>}
                </div>
                {message && <div className="mb-4 text-green-700">{message}</div>}
                <button className="btn-primary w-full mt-2" onClick={() => handleRedeem(reward.id)}>Redeem</button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
