import { connectToDatabase } from '../../lib/db';
import User from '../../models/User';
import { signJwt } from '../../lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectToDatabase();
  const { email, password, role, department, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Eksik alan' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Kullanıcı zaten var' });
  const user = await User.create({ email, password, role, department, name });
  const token = signJwt({ id: user._id, role: user.role });
  res.status(201).json({ token, user: { email: user.email, role: user.role, department: user.department, name: user.name } });
} 