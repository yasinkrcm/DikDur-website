import { verifyJWT } from "../../_utils/auth";

export async function POST(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Normalde burada veritabanı güncellemesi yapılır
  return Response.json({ success: true });
} 