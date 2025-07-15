import { dbConnect } from "../../_db";
import Ergonomics from "../../_models/Ergonomics";
import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const data = await Ergonomics.find({ user: user.id });
  return Response.json({ success: true, data });
}

export async function POST(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const body = await req.json();
  const doc = await Ergonomics.create({ ...body, user: user.id });
  return Response.json({ success: true, doc }, { status: 201 });
} 