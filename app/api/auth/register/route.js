import { dbConnect } from "../../_db";
import User from "../../_models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { email, password, role } = await req.json();
  if (!email || !password) return Response.json({ message: "Email ve şifre zorunlu" }, { status: 400 });
  const existing = await User.findOne({ email });
  if (existing) return Response.json({ message: "Email zaten kayıtlı" }, { status: 400 });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, role });
  return Response.json({ success: true, user: { id: user._id, email: user.email, role: user.role } }, { status: 201 });
} 