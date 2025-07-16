import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json({
    name: "Jane Doe",
    email: "jane@example.com",
    id: user.id,
  });
} 