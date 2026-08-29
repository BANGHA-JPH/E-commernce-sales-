import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Universal root configuration so Vercel can build from project root or frontend folder
export default defineConfig({
  root: path.resolve(__dirname, 'frontend'),
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
