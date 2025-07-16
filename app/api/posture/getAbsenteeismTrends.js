import { connectToDatabase } from '../../lib/db';
import PostureScore from '../../models/PostureScore';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  await connectToDatabase();
  const { department } = req.query;
  if (!department) return res.status(400).json({ message: 'Departman zorunlu.' });

  const now = new Date();
  const weeks = [];
  for (let i = 0; i < 12; i++) {
    const start = new Date(now - (i + 1) * 7 * 24 * 60 * 60 * 1000);
    const end = new Date(now - i * 7 * 24 * 60 * 60 * 1000);
    const scores = await PostureScore.find({
      department,
      createdAt: { $gte: start, $lt: end }
    });
    const avg = scores.length ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length : null;
    weeks.unshift({ week: 12 - i, averageScore: avg });
  }
  res.status(200).json({ department, trends: weeks });
} 