import { verifyJwt } from '../lib/jwt';

export default function requireAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      req.user = verifyJwt(token);
      return handler(req, res);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
} 