import { dbConnect } from "../../_db";
import PostureScore from "../../_models/PostureScore";
import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  try {
    await dbConnect();
    
    // Kullanıcı kimlik doğrulaması
    const user = await verifyJWT(req);
    if (!user) {
      return Response.json({ message: "Yetkisiz" }, { status: 401 });
    }

    // Son 30 gün içindeki kullanıcının duruş skorlarını al
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const scores = await PostureScore.find({
      userId: user.id,
      timestamp: { $gte: thirtyDaysAgo },
      analysisType: '30_second_session'
    }).sort({ timestamp: -1 });

    if (scores.length === 0) {
      return Response.json({ 
        averageScore: 0,
        totalSessions: 0,
        lastUpdated: null
      });
    }

    // Ortalama skoru hesapla
    const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
    const averageScore = Math.round((totalScore / scores.length) * 10) / 10; // 1 ondalık basamak

    return Response.json({
      averageScore: averageScore,
      totalSessions: scores.length,
      lastUpdated: scores[0].timestamp
    });

  } catch (error) {
    console.error('Error fetching average posture score:', error);
    return Response.json({ 
      error: "Ortalama skor alınamadı",
      averageScore: 0,
      totalSessions: 0,
      lastUpdated: null
    }, { status: 500 });
  }
} 