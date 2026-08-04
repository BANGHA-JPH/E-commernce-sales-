import express from 'express';
import jwt from 'jsonwebtoken';
import { USERS } from '../data/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vintage_secret';

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const existingUser = USERS.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const user = {
    id: `user-${Date.now()}`,
    name: name || 'Vintage Collector',
    email,
    password // Note: hashed in production
  };

  USERS.push(user);

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  let user = USERS.find(u => u.email === email);
  
  // Demo auto-register if user doesn't exist for fast testing
  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0] || 'Restorer',
      email,
      password
    };
    USERS.push(user);
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized guest mode' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

export default router;
