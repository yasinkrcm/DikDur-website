import { connectToDatabase } from '../../lib/db';
import PostureScore from '../../models/PostureScore';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  await connectToDatabase();
  const { department } = req.query;
  if (!department) return res.status(400).json({ message: 'Departman zorunlu.' });

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const scores = await PostureScore.find({
    department,
    createdAt: { $gte: thirtyDaysAgo }
  });

  if (!scores.length) return res.status(404).json({ message: 'Veri yok.' });

  const avg = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
  let risk;
  if (avg < 40) risk = 'Yüksek Risk';
  else if (avg < 70) risk = 'Orta Risk';
  else risk = 'Düşük Risk';

  res.status(200).json({
    department,
    averageScore: avg,
    riskLevel: risk,
    count: scores.length
  });
} 