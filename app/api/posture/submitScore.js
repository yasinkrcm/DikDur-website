import { connectToDatabase } from '../../lib/db';
import PostureScore from '../../models/PostureScore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectToDatabase();
  const { department, score } = req.body;
  if (!department || typeof score !== 'number') {
    return res.status(400).json({ message: 'Departman ve skor zorunlu.' });
  }
  if (score < 0 || score > 100) {
    return res.status(400).json({ message: 'Skor 0-100 arası olmalı.' });
  }
  const newScore = await PostureScore.create({ department, score });
  res.status(201).json({ message: 'Skor kaydedildi.', data: newScore });
} 