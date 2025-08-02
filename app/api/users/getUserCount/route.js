import { dbConnect } from "../../_db";
import User from "../../_models/User";

export async function GET(req) {
  try {
    await dbConnect();
    
    const userCount = await User.countDocuments();
    
    return Response.json({
      userCount: userCount
    });

  } catch (error) {
    console.error('Error fetching user count:', error);
    return Response.json({
      error: "Kullanıcı sayısı alınamadı",
      userCount: 0
    }, { status: 500 });
  }
} 