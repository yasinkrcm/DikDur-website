import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json([
    {
      id: 1,
      name: "FitLife Gym - 1 Month Membership",
      points: 1500,
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Gym Membership",
    },
    {
      id: 2,
      name: "PowerFit - Personal Training Session",
      points: 800,
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Personal Training",
    },
    {
      id: 3,
      name: "YogaZen - 10 Class Package",
      points: 1200,
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Yoga Classes",
    },
    {
      id: 4,
      name: "AquaFit - Swimming Pool Access",
      points: 600,
      discount: "Free",
      image: "/placeholder.svg?height=150&width=200",
      category: "Swimming",
    },
  ]);
} 