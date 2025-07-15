import { Trophy, Star, Zap, Target, Award } from "lucide-react"
import Card from "@/components/Card"

export default function RewardsPage() {
  const userStats = {
    totalPoints: 2450,
    weeklyPoints: 180,
    rank: 12,
    streak: 7,
  }

  const earnedRewards = [
    {
      id: 1,
      title: "Posture Champion",
      description: "Maintained good posture for 7 consecutive days",
      points: 200,
      dateEarned: "2024-01-20",
      icon: Trophy,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      id: 2,
      title: "Step Master",
      description: "Walked 10,000+ steps for 5 days straight",
      points: 150,
      dateEarned: "2024-01-18",
      icon: Target,
      color: "text-green-600 bg-green-100",
    },
    {
      id: 3,
      title: "Wellness Warrior",
      description: "Completed 3 wellness challenges this month",
      points: 300,
      dateEarned: "2024-01-15",
      icon: Award,
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: 4,
      title: "Early Bird",
      description: "Attended 5 morning stretch sessions",
      points: 100,
      dateEarned: "2024-01-12",
      icon: Star,
      color: "text-blue-600 bg-blue-100",
    },
  ]

  const gymRewards = [
    {
      id: 1,
      name: "FitLife Gym - 1 Month Membership",
      points: 1500,
      originalPrice: "$89",
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Gym Membership",
      rating: 4.8,
      locations: "5 locations nearby",
    },
    {
      id: 2,
      name: "PowerFit - Personal Training Session",
      points: 800,
      originalPrice: "$75",
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Personal Training",
      rating: 4.9,
      locations: "3 locations nearby",
    },
    {
      id: 3,
      name: "YogaZen - 10 Class Package",
      points: 1200,
      originalPrice: "$150",
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Yoga Classes",
      rating: 4.7,
      locations: "2 locations nearby",
    },
    {
      id: 4,
      name: "AquaFit - Swimming Pool Access",
      points: 600,
      originalPrice: "$45",
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Swimming",
      rating: 4.6,
      locations: "1 location nearby",
    },
  ]

  const corporatePackages = [
    {
      id: 1,
      name: "Wellness Weekend Retreat",
      points: 3000,
      description: "2-day wellness retreat with yoga, meditation, and spa treatments",
      image: "/placeholder.svg?height=150&width=200",
      includes: ["Accommodation", "All meals", "Spa access", "Yoga classes"],
      availability: "Limited spots available",
    },
    {
      id: 2,
      name: "Ergonomic Office Setup",
      points: 2500,
      description: "Complete ergonomic assessment and equipment upgrade for your workspace",
      image: "/placeholder.svg?height=150&width=200",
      includes: ["Ergonomic chair", "Standing desk", "Monitor arm", "Assessment"],
      availability: "Available",
    },
    {
      id: 3,
      name: "Health & Wellness Coaching",
      points: 2000,
      description: "3-month personalized wellness coaching program",
      image: "/placeholder.svg?height=150&width=200",
      includes: ["Weekly sessions", "Meal planning", "Exercise program", "Progress tracking"],
      availability: "Available",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Points</h1>
          <p className="text-gray-600">Redeem your wellness points for amazing rewards</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.totalPoints.toLocaleString()}</p>
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

        {/* Earned Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earnedRewards.map((reward) => (
              <Card key={reward.id} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${reward.color} mb-4`}>
                  <reward.icon className="h-8 w-8" />
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

        {/* Gym Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gym & Fitness Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymRewards.map((reward) => (
              <Card key={reward.id}>
                <img
                  src={reward.image || "/placeholder.svg"}
                  alt={reward.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <div className="mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {reward.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{reward.rating}</span>
                  <span className="text-sm text-gray-400 ml-2">{reward.locations}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-blue-600">{reward.points} pts</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{reward.originalPrice}</span>
                  </div>
                  <span className="text-green-600 font-semibold">{reward.discount}</span>
                </div>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    userStats.totalPoints >= reward.points
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={userStats.totalPoints < reward.points}
                >
                  {userStats.totalPoints >= reward.points ? "Redeem Now" : "Not Enough Points"}
                </button>
              </Card>
            ))}
          </div>
        </section>

        {/* Corporate Packages */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Corporate Wellness Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporatePackages.map((pkg) => (
              <Card key={pkg.id}>
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Includes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">{pkg.points} pts</span>
                  <span
                    className={`text-sm font-medium ${
                      pkg.availability === "Available" ? "text-green-600" : "text-orange-600"
                    }`}
                  >
                    {pkg.availability}
                  </span>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    userStats.totalPoints >= pkg.points && pkg.availability === "Available"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={userStats.totalPoints < pkg.points || pkg.availability !== "Available"}
                >
                  {userStats.totalPoints >= pkg.points ? "Redeem Package" : "Not Enough Points"}
                </button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
