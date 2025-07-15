import { dbConnect } from "../../_db";
import User from "../../_models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    if (!email || !password) return Response.json({ message: "Email ve şifre zorunlu" }, { status: 400 });
    const user = await User.findOne({ email });
    if (!user) return Response.json({ message: "Geçersiz bilgiler" }, { status: 400 });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return Response.json({ message: "Geçersiz bilgiler" }, { status: 400 });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return Response.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login API error:", err);
    return Response.json({ success: false, message: err.message || "Internal server error" }, { status: 500 });
  }
} 