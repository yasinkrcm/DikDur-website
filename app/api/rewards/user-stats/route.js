import { verifyJWT } from "../../_utils/auth";
import { dbConnect } from "../../_db";
import User from "../../_models/User";

export async function GET(req) {
  try {
    await dbConnect();
    const user = await verifyJWT(req);
    if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
    const dbUser = await User.findById(user.id);
    return Response.json({
      totalPoints: dbUser?.totalPoints ?? 0,
      weeklyPoints: 180, // örnek
      rank: 12, // örnek
      streak: 7, // örnek
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
} 