import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡ Classic Aircooled VW Works Backend Server running on http://localhost:${PORT}`);
});

