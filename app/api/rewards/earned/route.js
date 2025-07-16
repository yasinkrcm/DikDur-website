import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json([
    {
      id: 1,
      title: "Posture Champion",
      description: "Maintained good posture for 7 consecutive days",
      points: 200,
      dateEarned: "2024-01-20",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      id: 2,
      title: "Step Master",
      description: "Walked 10,000+ steps for 5 days straight",
      points: 150,
      dateEarned: "2024-01-18",
      color: "text-green-600 bg-green-100",
    },
    {
      id: 3,
      title: "Wellness Warrior",
      description: "Completed 3 wellness challenges this month",
      points: 300,
      dateEarned: "2024-01-15",
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: 4,
      title: "Early Bird",
      description: "Attended 5 morning stretch sessions",
      points: 100,
      dateEarned: "2024-01-12",
      color: "text-blue-600 bg-blue-100",
    },
  ]);
} 