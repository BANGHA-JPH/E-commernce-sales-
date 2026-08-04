import express from 'express';
import { SPARE_PARTS, VINTAGE_CARS, ENGINE_HOTSPOTS, YOUTUBE_SHOWCASE } from '../data/db.js';

const router = express.Router();

// GET /api/parts - Search & filter spare parts (Guest Accessible)
router.get('/parts', (req, res) => {
  const { search, era, category, carModelId, sortBy } = req.query;

  let results = [...SPARE_PARTS];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.oemNumber.toLowerCase().includes(q) ||
      p.carModelName.toLowerCase().includes(q) ||
      p.castingCode.toLowerCase().includes(q)
    );
  }

  if (era && era !== 'ALL') {
    results = results.filter(p => p.era === era);
  }

  if (category && category !== 'ALL') {
    results = results.filter(p => p.category === category);
  }

  if (carModelId && carModelId !== 'ALL') {
    results = results.filter(p => p.carModelId === carModelId);
  }

  if (sortBy === 'PRICE_LOW') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'PRICE_HIGH') {
    results.sort((a, b) => b.price - a.price);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/parts/:id
router.get('/parts/:id', (req, res) => {
  const part = SPARE_PARTS.find(p => p.id === req.params.id);
  if (!part) {
    return res.status(404).json({ success: false, message: 'Spare part not found' });
  }
  res.json({ success: true, data: part });
});

// GET /api/cars - List all vintage car models
router.get('/cars', (req, res) => {
  res.json({ success: true, count: VINTAGE_CARS.length, data: VINTAGE_CARS });
});

// GET /api/hotspots - Engine diagram hotspot pins
router.get('/hotspots', (req, res) => {
  res.json({ success: true, data: ENGINE_HOTSPOTS });
});

// GET /api/videos - YouTube Workshop Video Showcase Playlist
router.get('/videos', (req, res) => {
  res.json({ success: true, data: YOUTUBE_SHOWCASE });
});

export default router;
