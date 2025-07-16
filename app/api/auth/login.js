import { connectToDatabase } from '../../lib/db';
import User from '../../models/User';
import { signJwt } from '../../lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectToDatabase();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
  }
  const token = signJwt({ id: user._id, role: user.role });
  res.status(200).json({ token, user: { email: user.email, role: user.role, department: user.department, name: user.name } });
} 