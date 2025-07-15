import { dbConnect } from "../../_db";
import Challenge from "../../_models/Challenge";
import { verifyJWT } from "../../_utils/auth";

export async function POST(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const { challengeId } = await req.json();
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) return Response.json({ message: "Challenge bulunamadı" }, { status: 404 });
  if (!challenge.participants.includes(user.id)) {
    challenge.participants.push(user.id);
    await challenge.save();
  }
  return Response.json({ success: true, challenge });
} 