import { dbConnect } from "../_db";
import Reward from "../_models/Reward";
import { verifyJWT } from "../_utils/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const data = await Reward.find();
  return Response.json({ success: true, data });
}

export async function POST(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user || user.role !== "admin") return Response.json({ message: "Yetkisiz" }, { status: 403 });
  const body = await req.json();
  const doc = await Reward.create(body);
  return Response.json({ success: true, doc }, { status: 201 });
} 