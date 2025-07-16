import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function signJwt(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token) {
  return jwt.verify(token, SECRET);
} 