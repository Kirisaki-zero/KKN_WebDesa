import express from 'express';
import multer from 'multer';
import path from 'path';
import fsExtra from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fsExtra.existsSync(uploadDir)) { fsExtra.mkdirSync(uploadDir, { recursive: true }); }

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'img-' + unique + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/i;
    if (allowed.test(path.extname(file.originalname)) && allowed.test(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error('Hanya file gambar (JPEG, PNG, WebP, GIF) yang diperbolehkan.'));
  }
});

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Tidak ada file gambar yang diunggah.' });
    }
    const fileUrl = '/uploads/' + req.file.filename;
    return res.json({ success: true, message: 'Upload berhasil.', url: fileUrl, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengunggah file.', error: err.message });
  }
});

export default router;