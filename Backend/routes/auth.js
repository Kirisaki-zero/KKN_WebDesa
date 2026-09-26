import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { generateToken, verifyTokenMiddleware } from '../config/jwt.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login admin dan menghasilkan JWT token resmi
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan kata sandi wajib diisi.',
      });
    }

    const [rows] = await pool.query(
      'SELECT id, username, password_hash, nama_lengkap, role, jabatan FROM admin_users WHERE username = ?', 
      [username.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Username atau kata sandi tidak sesuai.',
      });
    }

    const admin = rows[0];

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Username atau kata sandi tidak sesuai.',
      });
    }

    const role = admin.role || (admin.username === 'admin' ? 'superadmin' : admin.username === 'sekdes' ? 'sekdes' : 'petugas');
    const jabatan = admin.jabatan || 'Perangkat Desa';
    const nama = admin.nama_lengkap || 'Administrator';
    const initials = nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const token = generateToken({
      id: admin.id,
      username: admin.username,
      namaLengkap: nama,
      role,
      jabatan,
    });

    return res.json({
      success: true,
      message: 'Login berhasil.',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        nama,
        role,
        jabatan,
        initials,
      },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan sistem saat memproses login.',
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
      'SELECT id, username, nama_lengkap, role, jabatan, created_at FROM admin_users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Akun admin tidak ditemukan.',
      });
    }

    const admin = rows[0];
    const nama = admin.nama_lengkap || 'Administrator';
    const initials = nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return res.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        nama,
        role: admin.role,
        jabatan: admin.jabatan,
        initials,
      },
    });
  } catch (error) {
    console.error('Error fetching admin info:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil informasi profil admin.',
    });
  }
});

/**
 * @route   PUT /api/auth/change-password
 * @desc    Ubah password admin yang sedang aktif
 */
const handleChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, username } = req.body;

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

    let rows = [];
    if (req.user && req.user.id) {
      const [userRows] = await pool.query('SELECT * FROM admin_users WHERE id = ?', [req.user.id]);
      rows = userRows;
    } else if (username) {
      const [userRows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [username.trim()]);
      rows = userRows;
    } else {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Silakan login terlebih dahulu.',
      });
    }

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
    await pool.query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [newHash, admin.id]);

    return res.json({
      success: true,
      message: 'Password berhasil diperbarui. Silakan gunakan password baru saat login berikutnya.',
    });
  } catch (error) {
    console.error('Error changing admin password:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengubah password.',
    });
  }
};

router.put('/change-password', (req, res, next) => {
  if (req.headers.authorization) return verifyTokenMiddleware(req, res, next);
  next();
}, handleChangePassword);

router.post('/change-password', (req, res, next) => {
  if (req.headers.authorization) return verifyTokenMiddleware(req, res, next);
  next();
}, handleChangePassword);

export default router;
