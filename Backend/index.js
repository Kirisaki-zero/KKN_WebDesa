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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Backend API Desa Banjarejo',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/services', servicesRouter);
app.use('/api/search', searchRouter);
app.use('/api/contact', contactRouter);
app.use('/api/bumdes', bumdesRouter);
app.use('/api/news', newsRouter);
app.use('/api/umkm', umkmRouter);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan di server Backend.`
  });
});

// Start Express Server
app.listen(PORT, async () => {
  console.log(`===================================================`);
  console.log(`🚀 Server Backend Desa Banjarejo berjalan di port ${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);

  // Test MySQL Connection Pool
  await testDbConnection();
});
