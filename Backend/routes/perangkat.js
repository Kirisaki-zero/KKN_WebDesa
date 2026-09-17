import express from 'express';
import pool from '../config/db.js';
import { upload, uploadToCloudinary } from '../config/cloudinary.js';
import { verifyTokenMiddleware } from '../config/jwt.js';

const router = express.Router();

/**
 * @route   GET /api/perangkat
 * @desc    Ambil daftar seluruh perangkat desa yang aktif
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nama, jabatan, foto_url, urutan, updated_at FROM perangkat_desa WHERE aktif = 1 ORDER BY urutan ASC, id ASC'
    );
    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching perangkat desa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data perangkat desa.',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/perangkat/:id
 * @desc    Ambil detail satu perangkat desa
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM perangkat_desa WHERE id = ? AND aktif = 1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Perangkat desa tidak ditemukan.',
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error('Error fetching detail perangkat:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail perangkat desa.',
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/perangkat
 * @desc    Tambah perangkat desa baru (dengan upload foto opsional ke Cloudinary)
 * @access  Protected (JWT)
 */
router.post('/', verifyTokenMiddleware, upload.single('foto'), async (req, res) => {
  try {
    const { nama, jabatan, urutan } = req.body;

    if (!nama || !jabatan) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan jabatan wajib diisi.',
      });
    }

    let fotoUrl = null;

    // Jika ada file foto yang di-upload
    if (req.file) {
      try {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        fotoUrl = cloudinaryResult.secure_url;
      } catch (cloudErr) {
        console.warn('Cloudinary upload warning:', cloudErr.message);
        // Tetap izinkan simpan jika cloudinary belum disetup, fallback null atau pesan
      }
    }

    const itemUrutan = urutan ? parseInt(urutan) : 99;

    const [result] = await pool.query(
      'INSERT INTO perangkat_desa (nama, jabatan, foto_url, urutan) VALUES (?, ?, ?, ?)',
      [nama, jabatan, fotoUrl, itemUrutan]
    );

    return res.status(201).json({
      success: true,
      message: 'Perangkat desa berhasil ditambahkan.',
      data: {
        id: result.insertId,
        nama,
        jabatan,
        foto_url: fotoUrl,
        urutan: itemUrutan,
      },
    });
  } catch (error) {
    console.error('Error adding perangkat desa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan perangkat desa.',
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/perangkat/:id
 * @desc    Update data perangkat desa (dengan upload/ganti foto opsional)
 * @access  Protected (JWT)
 */
router.put('/:id', verifyTokenMiddleware, upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, jabatan, urutan } = req.body;

    // Cek keberadaan data
    const [existing] = await pool.query('SELECT * FROM perangkat_desa WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Perangkat desa tidak ditemukan.',
      });
    }

    let fotoUrl = existing[0].foto_url;

    // Jika ada upload foto baru
    if (req.file) {
      try {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        fotoUrl = cloudinaryResult.secure_url;
      } catch (cloudErr) {
        console.warn('Cloudinary upload warning:', cloudErr.message);
      }
    }

    const updatedNama = nama || existing[0].nama;
    const updatedJabatan = jabatan || existing[0].jabatan;
    const updatedUrutan = urutan !== undefined ? parseInt(urutan) : existing[0].urutan;

    await pool.query(
      'UPDATE perangkat_desa SET nama = ?, jabatan = ?, foto_url = ?, urutan = ? WHERE id = ?',
      [updatedNama, updatedJabatan, fotoUrl, updatedUrutan, id]
    );

    return res.json({
      success: true,
      message: 'Data perangkat desa berhasil diperbarui.',
      data: {
        id: parseInt(id),
        nama: updatedNama,
        jabatan: updatedJabatan,
        foto_url: fotoUrl,
        urutan: updatedUrutan,
      },
    });
  } catch (error) {
    console.error('Error updating perangkat desa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui perangkat desa.',
      error: error.message,
    });
  }
});

/**
 * @route   DELETE /api/perangkat/:id
 * @desc    Hapus perangkat desa (Soft delete: aktif = 0)
 * @access  Protected (JWT)
 */
router.delete('/:id', verifyTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('UPDATE perangkat_desa SET aktif = 0 WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Perangkat desa tidak ditemukan.',
      });
    }

    return res.json({
      success: true,
      message: 'Perangkat desa berhasil dihapus.',
    });
  } catch (error) {
    console.error('Error deleting perangkat desa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus perangkat desa.',
      error: error.message,
    });
  }
});

export default router;
