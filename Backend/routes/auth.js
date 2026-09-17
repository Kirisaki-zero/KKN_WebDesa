import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { generateToken, verifyTokenMiddleware } from '../config/jwt.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login admin dan menghasilkan JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi.',
      });
    }

    // Cari admin berdasarkan username
    const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah.',
      });
    }

    const admin = rows[0];

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah.',
      });
    }

    // Buat token JWT
    const token = generateToken({
      id: admin.id,
      username: admin.username,
      namaLengkap: admin.nama_lengkap,
    });

    return res.json({
      success: true,
      message: 'Login berhasil.',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        namaLengkap: admin.nama_lengkap,
      },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat login.',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Ambil info profil admin yang sedang login
 */
router.get('/me', verifyTokenMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, nama_lengkap, created_at FROM admin_users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Akun admin tidak ditemukan.',
      });
    }

    return res.json({
      success: true,
      admin: rows[0],
    });
  } catch (error) {
    console.error('Error fetching admin info:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil informasi profil admin.',
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/auth/change-password
 * @desc    Ubah password admin
 */
router.put('/change-password', verifyTokenMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password lama dan password baru wajib diisi.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password baru minimal 6 karakter.',
      });
    }

    const [rows] = await pool.query('SELECT * FROM admin_users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Akun admin tidak ditemukan.',
      });
    }

    const admin = rows[0];

    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Password lama tidak sesuai.',
      });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [newHash, req.user.id]);

    return res.json({
      success: true,
      message: 'Password berhasil diperbarui.',
    });
  } catch (error) {
    console.error('Error changing admin password:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui password.',
      error: error.message,
    });
  }
});

export default router;
