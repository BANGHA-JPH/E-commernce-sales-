import express from 'express';
import jwt from 'jsonwebtoken';
import { ORDERS } from '../data/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vintage_secret';

// Auth middleware for orders
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Login required to place order' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token, please sign in again' });
  }
};

// POST /api/orders - Place a vintage parts order (Protected Route)
router.post('/orders', authenticate, (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  const order = {
    id: `ORD-VINTAGE-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: req.user.id,
    userName: req.user.name,
    userEmail: req.user.email,
    items,
    totalAmount,
    shippingAddress: shippingAddress || '123 Classic Restorer Blvd, Detroit MI',
    status: 'AUTHENTICATED & PROCESSING',
    createdAt: new Date().toISOString()
  };

  ORDERS.push(order);

  res.status(201).json({
    success: true,
    message: 'Vintage parts order successfully created!',
    data: order
  });
});

// GET /api/orders - Get user orders
router.get('/orders', authenticate, (req, res) => {
  const userOrders = ORDERS.filter(o => o.userId === req.user.id);
  res.json({ success: true, count: userOrders.length, data: userOrders });
});

export default router;
