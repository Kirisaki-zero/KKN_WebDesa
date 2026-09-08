import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';

import servicesRouter from './routes/services.js';
import searchRouter from './routes/search.js';
import contactRouter from './routes/contact.js';
import bumdesRouter from './routes/bumdes.js';
import newsRouter from './routes/news.js';
import umkmRouter from './routes/umkm.js';
import wargaRouter from './routes/warga.js';
import pengumumanRouter from './routes/pengumuman.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS: izinkan Web Desa publik & Dashboard Admin ──────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5174', // Admin Web port (Vite default secondary)
  'http://localhost:8443', // Figma Make preview port
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Izinkan request tanpa origin (Postman, curl) dan semua origin yang terdaftar
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Fallback: izinkan semua saat development
      callback(null, true);
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Backend API Desa Banjarejo',
    version: '2.0.0',
    endpoints: [
      '/api/services', '/api/search', '/api/contact',
      '/api/bumdes', '/api/news', '/api/umkm',
      '/api/warga', '/api/pengumuman'
    ],
    timestamp: new Date().toISOString()
  });
});

// ── Mount Routes ─────────────────────────────────────────────
app.use('/api/services',    servicesRouter);
app.use('/api/search',      searchRouter);
app.use('/api/contact',     contactRouter);
app.use('/api/bumdes',      bumdesRouter);
app.use('/api/news',        newsRouter);
app.use('/api/umkm',        umkmRouter);
app.use('/api/warga',       wargaRouter);
app.use('/api/pengumuman',  pengumumanRouter);

// ── Global 404 Handler ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan di server Backend.`
  });
});

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`===================================================`);
  console.log(`🚀 Backend Desa Banjarejo v2.0 — port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📋 Routes: /api/services | /api/news | /api/umkm`);
  console.log(`👥 CRUD  : /api/warga | /api/pengumuman`);
  console.log(`===================================================`);

  await testDbConnection();
});
