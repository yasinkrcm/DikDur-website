import { dbConnect } from '../../_db';
import Posture from '../../_models/Posture';
import User from '../../_models/User';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const department = searchParams.get('department');
  if (!department) return Response.json({ message: 'Departman zorunlu.' }, { status: 400 });

  // Son 30 günün skorlarını çek
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const scores = await Posture.find({
    department,
    date: { $gte: thirtyDaysAgo }
  }).sort({ date: -1 });

  // Departmandaki çalışan sayısı
  const employees = await User.find({ department });
  const employeeCount = employees.length;

  // Ortalama skor, min/max skor, risk seviyesi hesapla
  let avg = null, max = null, min = null, risk = null;
  if (scores.length) {
    avg = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
    max = Math.max(...scores.map(s => s.score));
    min = Math.min(...scores.map(s => s.score));
    if (avg < 40) risk = 'High';
    else if (avg < 70) risk = 'Medium';
    else risk = 'Low';
  }

  return Response.json({
    department,
    avgScore: avg,
    maxScore: max,
    minScore: min,
    riskLevel: risk,
    employeeCount,
    scores: scores.map(s => ({
      date: s.date,
      score: s.score,
      user: s.user
    })),
    message: scores.length === 0 ? "Bu departman için henüz veri yok." : undefined
  });
} 