import { dbConnect } from "../_db";
import Report from "../_models/Report";
import { verifyJWT } from "../_utils/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const data = await Report.find({ user: user.id });
  return Response.json({ success: true, data });
} 