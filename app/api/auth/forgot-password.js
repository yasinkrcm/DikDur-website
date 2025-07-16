import { connectToDatabase } from '../../lib/db';
import User from '../../models/User';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectToDatabase();
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 dakika
  await user.save();
  // Burada e-posta gönderimi yapılabilir (sendMail fonksiyonu ile)
  res.status(200).json({ message: 'Şifre sıfırlama bağlantısı gönderildi', token });
} 