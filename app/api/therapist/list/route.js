import { verifyJWT } from "../../_utils/auth";
import { dbConnect } from "../../_db";
import Therapist from "../../_models/Therapist";

export async function GET(req) {
  try {
    await dbConnect();
    const user = await verifyJWT(req);
    if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
    const therapists = await Therapist.find();
    return Response.json(Array.isArray(therapists) ? therapists : []);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
} 