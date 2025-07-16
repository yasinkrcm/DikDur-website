import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json([
    {
      title: "Step Counter Challenge",
      description: "Walk 10,000 steps daily for a week",
      difficulty: "Easy",
      points: 100,
      participants: 45,
      timeLeft: "5 days",
    },
    {
      title: "Desk Stretch Master",
      description: "Complete 5 desk stretches every 2 hours",
      difficulty: "Medium",
      points: 200,
      participants: 32,
      timeLeft: "2 days",
    },
    {
      title: "Hydration Hero",
      description: "Drink 8 glasses of water daily",
      difficulty: "Easy",
      points: 75,
      participants: 67,
      timeLeft: "1 week",
    },
    {
      title: "Ergonomic Excellence",
      description: "Optimize your workspace setup",
      difficulty: "Hard",
      points: 300,
      participants: 23,
      timeLeft: "3 days",
    },
  ]);
} 