import { connectToDatabase } from '../../lib/db';
import User from '../../models/User';
import requireAuth from '../../middleware/auth';

export default requireAuth(async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  await connectToDatabase();
  const user = await User.findById(req.user.id).select('-password -resetToken -resetTokenExpiry');
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  res.status(200).json({ user });
}); 