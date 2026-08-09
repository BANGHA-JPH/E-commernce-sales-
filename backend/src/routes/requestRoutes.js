import express from 'express';
import jwt from 'jsonwebtoken';
import { dbService } from '../config/supabase.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vintage_secret';

// Auth middleware matching orderRoutes.js
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Login required to submit request' });
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

// POST /api/requests - Create a part request / reservation (Protected Route)
router.post('/requests', authenticate, async (req, res) => {
  try {
    const { id, partId, partTitle, partImage, sku, price, compatibility, type, status, userPhone, userCity } = req.body;

    if (!partId && !partTitle) {
      return res.status(400).json({ success: false, message: 'Part details are required for request' });
    }

    const requestInput = {
      id: id || `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: req.user.id,
      userName: req.user.name || 'Restorer Member',
      userEmail: req.user.email,
      userPhone: userPhone || req.user.phone || '',
      userCity: userCity || req.user.city || '',
      partId: partId || '',
      partTitle: partTitle || 'Vintage Part',
      partImage: partImage || '',
      sku: sku || 'N/A',
      price: parseFloat(price) || 0,
      compatibility: compatibility || 'VW Classic',
      type: type || 'REQUEST',
      status: status || 'Pending',
      createdAt: new Date().toISOString()
    };

    const createdRequest = await dbService.addRequest(requestInput);

    res.status(201).json({
      success: true,
      message: 'Request successfully submitted!',
      data: createdRequest
    });
  } catch (err) {
    console.error('Request creation error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/requests - Get logged in user's requests (Protected Route)
router.get('/requests', authenticate, async (req, res) => {
  try {
    const userRequests = await dbService.getRequests(req.user.id);
    res.json({ success: true, count: userRequests.length, data: userRequests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/requests - Return ALL requests for Admin Panel
router.get('/admin/requests', async (req, res) => {
  try {
    const allRequests = await dbService.getRequests();
    res.json({ success: true, count: allRequests.length, data: allRequests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/requests/:id - Update request status
router.put('/admin/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = await dbService.updateRequestStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.json({
      success: true,
      message: `Request #${id} status updated to ${status}`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
