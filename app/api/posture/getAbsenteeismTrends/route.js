import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json([
    { month: "Jan", days: 45 },
    { month: "Feb", days: 38 },
    { month: "Mar", days: 52 },
    { month: "Apr", days: 41 },
    { month: "May", days: 35 },
    { month: "Jun", days: 29 },
  ]);
} 