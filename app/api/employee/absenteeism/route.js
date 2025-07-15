import { dbConnect } from "../../_db";
import Absenteeism from "../../_models/Absenteeism";
import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const data = await Absenteeism.find({ user: user.id });
  return Response.json({ success: true, data });
}

export async function POST(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const body = await req.json();
  const doc = await Absenteeism.create({ ...body, user: user.id });
  return Response.json({ success: true, doc }, { status: 201 });
} 