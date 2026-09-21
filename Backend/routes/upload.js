import express from 'express';
import { verifyTokenMiddleware } from '../config/jwt.js';
import multer from 'multer';
import path from 'path';
import fsExtra from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fsExtra.existsSync(uploadDir)) { 
  fsExtra.mkdirSync(uploadDir, { recursive: true }); 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Sanitize original filename
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 30);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e4);
    cb(null, `${cleanName}-${unique}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // Max 8MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/i;
    if (allowed.test(path.extname(file.originalname)) && allowed.test(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error('Hanya file gambar (JPEG, PNG, WebP, GIF) maks 8MB yang diperbolehkan.'));
  }
});

const router = express.Router();

// Helper format size
function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// ── GET /api/upload : List all uploaded media files ───────────
router.get('/', (req, res) => {
  try {
    if (!fsExtra.existsSync(uploadDir)) {
      return res.json({ success: true, count: 0, data: [] });
    }

    const files = fsExtra.readdirSync(uploadDir);
    const imageFiles = files.filter(f => {
      const ext = path.extname(f).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
    });

    const fileList = imageFiles.map(file => {
      const filePath = path.join(uploadDir, file);
      try {
        const stats = fsExtra.statSync(filePath);
        return {
          filename: file,
          url: '/uploads/' + file,
          size: stats.size,
          sizeFormatted: formatBytes(stats.size),
          createdAt: stats.birthtime || stats.mtime,
          modifiedAt: stats.mtime,
          ext: path.extname(file).toLowerCase()
        };
      } catch (err) {
        return {
          filename: file,
          url: '/uploads/' + file,
          size: 0,
          sizeFormatted: '0 B',
          createdAt: new Date(),
          modifiedAt: new Date(),
          ext: path.extname(file).toLowerCase()
        };
      }
    });

    // Sort newest first
    fileList.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));

    res.json({
      success: true,
      count: fileList.length,
      data: fileList
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil daftar gambar.', error: err.message });
  }
});

// ── POST /api/upload : Single image upload ───────────────────
router.post('/', verifyTokenMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Tidak ada file gambar yang diunggah.' });
    }
    const fileUrl = '/uploads/' + req.file.filename;
    return res.json({
      success: true,
      message: 'Upload berhasil.',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      sizeFormatted: formatBytes(req.file.size)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengunggah file.', error: err.message });
  }
});

// ── POST /api/upload/multiple : Multi-file upload ────────────
router.post('/multiple', verifyTokenMiddleware, upload.array('images', 12), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada file gambar yang diunggah.' });
    }
    const uploaded = req.files.map(f => ({
      filename: f.filename,
      url: '/uploads/' + f.filename,
      size: f.size,
      sizeFormatted: formatBytes(f.size)
    }));
    return res.json({
      success: true,
      message: `${uploaded.length} gambar berhasil diunggah.`,
      files: uploaded
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengunggah gambar.', error: err.message });
  }
});

// ── DELETE /api/upload/:filename : Delete an image ───────────
router.delete('/:filename', verifyTokenMiddleware, (req, res) => {
  try {
    const filename = path.basename(req.params.filename); // Sanitize traversal attacks
    const filePath = path.join(uploadDir, filename);

    if (!fsExtra.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File gambar tidak ditemukan.' });
    }

    fsExtra.unlinkSync(filePath);
    return res.json({ success: true, message: `Gambar ${filename} berhasil dihapus.` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus file.', error: err.message });
  }
});

export default router;
