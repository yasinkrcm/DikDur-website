import { dbConnect } from "../../_db";
import PostureScore from "../../_models/PostureScore";
import { verifyJWT } from "../../_utils/auth";
import { t } from "@/lib/translations";

export async function POST(req) {
  try {
    await dbConnect();
    
    // Get language from headers
    const language = req.headers.get('accept-language')?.includes('tr') ? 'tr' : 'en';
    
    // Kullanıcı kimlik doğrulaması
    const user = await verifyJWT(req);
    if (!user) {
      return Response.json({ message: t('unauthorized', language) }, { status: 401 });
    }

    const { score, totalScores } = await req.json();
    
    if (typeof score !== 'number') {
      return Response.json({ message: t('invalidScore', language) }, { status: 400 });
    }
    
    // Skoru 0-100 arasında sınırla
    const normalizedScore = Math.min(100, Math.max(0, score));

    // Yeni duruş skorunu kaydet
    const postureScore = new PostureScore({
      userId: user.id,
      score: normalizedScore,
      timestamp: new Date(),
      analysisType: '30_second_session',
      sessionDuration: 30,
      totalScores: totalScores || 1
    });

    await postureScore.save();

        console.log('Posture score saved to MongoDB:', normalizedScore);

    return Response.json({
      message: t('scoreSaved', language),
      score: normalizedScore
    });

  } catch (error) {
    console.error('Posture score submission error:', error);
    return Response.json({
      error: t('scoreNotSaved', language)
    }, { status: 500 });
  }
} 