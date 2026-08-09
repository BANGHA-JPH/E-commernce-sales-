import express from 'express';
import { dbService } from '../config/supabase.js';

const router = express.Router();

// --- SPARE PARTS CRUD ---

// 1. GET ALL PARTS
router.get('/admin/parts', async (req, res) => {
  try {
    const parts = await dbService.getParts();
    res.json({ success: true, data: parts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. ADD NEW PART / POST
router.post('/admin/parts', async (req, res) => {
  try {
    const newPart = await dbService.addPart(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Spare part post created successfully!', 
      data: newPart 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. UPDATE PART / POST
router.put('/admin/parts/:id', async (req, res) => {
  try {
    const updated = await dbService.updatePart(req.params.id, req.body);
    res.json({ 
      success: true, 
      message: 'Part updated successfully!', 
      data: updated 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. DELETE PART / POST
router.delete('/admin/parts/:id', async (req, res) => {
  try {
    await dbService.deletePart(req.params.id);
    res.json({ 
      success: true, 
      message: `Part ${req.params.id} deleted successfully!` 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// --- VINTAGE CARS CRUD ---

// 5. GET ALL CARS
router.get('/admin/cars', async (req, res) => {
  try {
    const cars = await dbService.getCars();
    res.json({ success: true, data: cars });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. ADD NEW CAR MODEL
router.post('/admin/cars', async (req, res) => {
  try {
    const newCar = await dbService.addCar(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Vintage car model added successfully!', 
      data: newCar 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 7. DELETE CAR MODEL
router.delete('/admin/cars/:id', async (req, res) => {
  try {
    await dbService.deleteCar(req.params.id);
    res.json({ 
      success: true, 
      message: `Vintage car ${req.params.id} deleted successfully!` 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
