// Central API configuration for Render backend + Vercel frontend
// Dynamic API_BASE_URL resolution:
// 1. Uses VITE_API_URL environment variable if set (e.g., https://vintage-parts-backend.onrender.com)
// 2. In local development mode (DEV), defaults to 'http://localhost:5000'
// 3. Otherwise defaults to empty string ''

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, ''); // Strip trailing slashes
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  return '';
};

export const API_BASE_URL = getApiBaseUrl();
