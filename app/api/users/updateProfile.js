import { connectToDatabase } from '../../lib/db';
import User from '../../models/User';
import requireAuth from '../../middleware/auth';

export default requireAuth(async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end();
  await connectToDatabase();
  const { name, department } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, department },
    { new: true }
  ).select('-password -resetToken -resetTokenExpiry');
  res.status(200).json({ user });
}); 