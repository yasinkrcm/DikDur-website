import { verifyJWT } from "../../_utils/auth";
import User from "../../_models/User";
import { dbConnect } from "../../_db";

export async function GET(req) {
  try {
    const user = await verifyJWT(req);
    if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });

    await dbConnect();
    
    const userData = await User.findById(user.id).select('-password');
    if (!userData) {
      return Response.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return Response.json({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      phone: userData.phone,
      position: userData.position,
      totalPoints: userData.totalPoints,
      joinDate: userData.joinDate,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ message: "Sunucu hatası" }, { status: 500 });
  }
} 