import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import partsRoutes from './routes/partsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
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

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Aura Vintage Engineering REST API Server',
    guestBrowsing: 'ENABLED',
    version: '1.0.0'
  });
});

export default app;
