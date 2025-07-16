import { connectToDatabase } from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectToDatabase();
  const { token, password } = req.body;
  const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token' });
  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.status(200).json({ message: 'Şifre başarıyla güncellendi' });
} 