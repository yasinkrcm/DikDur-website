import { dbConnect } from "../../_db";
import User from "../../_models/User";
import bcrypt from "bcryptjs";
import Therapist from "../../_models/Therapist";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password, role, name, phone, bio, imageUrl, available } = await req.json();
    if (!email || !password) return Response.json({ message: "Email ve şifre zorunlu" }, { status: 400 });
    const existing = await User.findOne({ email });
    if (existing) return Response.json({ message: "Email zaten kayıtlı" }, { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });
    // Therapist ise therapists koleksiyonuna da ekle
    if (role === "therapist") {
      await Therapist.create({ name, email, phone, bio, imageUrl, available });
    }
    return Response.json({ success: true, user: { id: user._id, email: user.email, role: user.role } }, { status: 201 });
  } catch (err) {
    console.error("Register API error:", err);
    return Response.json({ success: false, message: err.message || "Internal server error" }, { status: 500 });
  }
} 