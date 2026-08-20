import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import partsRoutes from './routes/partsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();

// Middlewares - Permissive CORS to allow Vercel, Netlify, Render, and Localhost
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Route mounts
app.use('/api', partsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', requestRoutes);
app.use('/api', adminRoutes);
app.use('/api', chatRoutes);

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Classic Aircooled VW Works REST API Server',
    guestBrowsing: 'ENABLED',
    version: '1.0.0'
  });
});

export default app;
