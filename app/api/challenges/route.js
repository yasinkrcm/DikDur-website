import { dbConnect } from "../_db";
import Challenge from "../_models/Challenge";
import { verifyJWT } from "../_utils/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const data = await Challenge.find();
  return Response.json({ success: true, data });
}

export async function POST(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  const body = await req.json();
  const doc = await Challenge.create(body);
  return Response.json({ success: true, doc }, { status: 201 });
} 