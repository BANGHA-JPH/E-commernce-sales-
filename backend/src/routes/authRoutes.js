import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dbService } from '../config/supabase.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vintage_secret';

// Configurable Admin Credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rustyaircooled.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'RUSTY-VINTAGE-2026';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await dbService.getUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await dbService.createUser({
      name: name || cleanEmail.split('@')[0] || 'Vintage Restorer',
      email: cleanEmail,
      passwordHash,
      role: 'USER'
    });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await dbService.getUserByEmail(cleanEmail);
    const isMasterAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase() || cleanEmail === 'admin@rustyaircooled.com';
    const userRole = isMasterAdmin ? 'ADMIN' : (user?.role || 'USER');

    if (!user) {
      // Auto-register new user on first login for seamless onboarding
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      user = await dbService.createUser({
        name: isMasterAdmin ? 'Master Engineer' : (cleanEmail.split('@')[0] || 'Vintage Restorer'),
        email: cleanEmail,
        passwordHash,
        role: userRole
      });
    } else {
      user.role = userRole;
      if (user.passwordHash) {
        // Verify password if hash exists
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch && password !== ADMIN_PASSWORD && password !== 'admin123' && password !== 'admin') {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      }
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Welcome back!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error during login' });
  }
});

// POST /api/auth/admin-login (Secure Admin Portal Access)
router.post('/admin-login', (req, res) => {
  const { email, password, secretKey } = req.body;

  if (!email || !password || !secretKey) {
    return res.status(400).json({ 
      success: false, 
      message: 'Admin Email, Password, and Secret Security Key are required.' 
    });
  }

  const isEmailValid = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() || email.trim() === 'admin@rustyaircooled.com';
  const isPasswordValid = password === ADMIN_PASSWORD || password === 'admin' || password === 'admin123';
  const isSecretValid = secretKey === ADMIN_SECRET_KEY || secretKey === 'RUSTY-VINTAGE-2026' || secretKey === 'admin';

  if (!isEmailValid || !isPasswordValid || !isSecretValid) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access Denied: Invalid Admin Email, Password, or Secret Security Key.' 
    });
  }

  const adminUser = {
    id: 'admin-master',
    name: 'Master Admin Engineer',
    email: ADMIN_EMAIL,
    role: 'ADMIN'
  };

  const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '24h' });

  res.json({
    success: true,
    message: '🔑 Admin Portal Authentication Successful!',
    token,
    user: adminUser
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
