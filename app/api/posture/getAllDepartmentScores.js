import { connectToDatabase } from '../../lib/db';
import PostureScore from '../../models/PostureScore';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  await connectToDatabase();

  // Tüm departmanları bul
  const departments = await User.distinct('department');
  const results = [];

  for (const department of departments) {
    if (!department) continue;
    // Son 30 günün skorlarını çek
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const scores = await PostureScore.find({
      department,
      createdAt: { $gte: thirtyDaysAgo }
    });
    const employees = await User.countDocuments({ department });
    let avg = null;
    if (scores.length) {
      avg = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
    }
    results.push({
      name: department,
      employees,
      score: avg !== null ? Math.round(avg) : null
    });
  }

  res.status(200).json(results);
} 