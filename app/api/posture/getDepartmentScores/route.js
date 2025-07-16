import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json([
    { name: "Engineering", score: 85, employees: 45, color: "bg-green-500" },
    { name: "Marketing", score: 78, employees: 23, color: "bg-blue-500" },
    { name: "Sales", score: 72, employees: 31, color: "bg-yellow-500" },
    { name: "HR", score: 91, employees: 12, color: "bg-green-600" },
    { name: "Finance", score: 68, employees: 18, color: "bg-orange-500" },
  ]);
} 