import { verifyJWT } from "../../_utils/auth";
import User from "../../_models/User";
import { dbConnect } from "../../_db";

export async function POST(req) {
  try {
    const user = await verifyJWT(req);
    if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });

    const { name, email, phone, position, department } = await req.json();

    await dbConnect();
    
    // Email değişikliği varsa, başka kullanıcıda aynı email var mı kontrol et
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: user.id } });
      if (existingUser) {
        return Response.json({ message: "Bu email adresi zaten kullanılıyor" }, { status: 400 });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        name,
        email,
        phone,
        position,
        department
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return Response.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Profil başarıyla güncellendi",
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return Response.json({ message: "Sunucu hatası" }, { status: 500 });
  }
} 