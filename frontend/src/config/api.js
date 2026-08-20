// Central API configuration for Full-Stack Vercel + Local Development
// Dynamic API_BASE_URL resolution:
// 1. Uses VITE_API_URL environment variable if set (e.g. external backend)
// 2. In local development mode (DEV), defaults to 'http://localhost:5000'
// 3. On Vercel / production, defaults to '' (same-origin relative /api routes handled serverlessly)

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, ''); // Strip trailing slashes
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  return ''; // On Vercel, requests to /api/... route seamlessly to serverless Express backend
};

export const API_BASE_URL = getApiBaseUrl();
