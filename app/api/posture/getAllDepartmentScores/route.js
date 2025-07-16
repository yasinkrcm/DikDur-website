import { connectToDatabase } from '../../../lib/db';
import PostureScore from '../../../models/PostureScore';
import User from '../../../models/User';

export async function GET(req) {
  await connectToDatabase();
  const departments = await User.distinct('department');
  const results = [];
  for (const department of departments) {
    if (!department) continue;
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
  return Response.json(results);
} 