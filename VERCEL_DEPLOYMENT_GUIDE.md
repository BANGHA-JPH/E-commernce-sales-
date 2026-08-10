# 🚀 Hosting Frontend on Vercel (Connecting to Render Backend)

This guide walks you through deploying your **Vite React Frontend** (`frontend/`) to **Vercel** and linking it to your **Render Node.js Backend**.

---

## 🛠️ Step 1: Deploy to Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Select your GitHub repository (`Spare parts website` / `E-commernce-sales-`).
4. Configure the settings:
   - **Framework Preset**: **Vite**
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `cd frontend && npm install && npm run build` (Pre-configured in `vercel.json`)
   - **Output Directory**: `frontend/dist` (Pre-configured in `vercel.json`)

---

## 🔗 Step 2: Set the `VITE_API_URL` Environment Variable

Under **Environment Variables** on Vercel, add:

| Key | Description | Example Value |
|---|---|---|
| `VITE_API_URL` | Live URL of your Render Express Backend | `https://vintage-parts-backend.onrender.com` |

> [!NOTE]
> Make sure to replace `https://vintage-parts-backend.onrender.com` with the actual domain given by Render!

---

## 🚀 Step 3: Deploy

1. Click **Deploy**.
2. Vercel will build your static bundle (`frontend/dist`) with `VITE_API_URL` baked in.
3. Once live, test browsing parts, registration, login, and placing orders. All API calls will route directly to your backend on Render.

---

## ⚡ Architecture Diagram

```
       ┌───────────────────────────────┐
       │     Vercel Frontend App       │
       │  (https://your-app.vercel.app)│
       └───────────────┬───────────────┘
                       │
                       │ fetch(`${VITE_API_URL}/api/...`)
                       ▼
       ┌───────────────────────────────┐
       │     Render Backend Service    │
       │ (https://your-app.onrender.com│
       └───────────────┬───────────────┘
                       │
                       ▼
             Supabase PostgreSQL DB
```

---

## ⚡ Local Development

Local development remains unchanged:
- **Backend**: `cd backend && npm run dev` (Runs on `http://localhost:5000`)
- **Frontend**: `cd frontend && npm run dev` (Runs on `http://localhost:5173`)
