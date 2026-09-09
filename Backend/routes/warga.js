import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Fallback data warga untuk mode demo
const FALLBACK_WARGA = [
  { nik: '3520011204900001', nama_lengkap: 'Budi Santoso',      dukuh: 'Ngasem',  jenis_kelamin: 'L', agama: 'Islam', pekerjaan: 'Petani',   status_kawin: 'Kawin' },
  { nik: '3520014508950002', nama_lengkap: 'Siti Aminah',       dukuh: 'Ngrombo', jenis_kelamin: 'P', agama: 'Islam', pekerjaan: 'Pedagang', status_kawin: 'Kawin' },
  { nik: '3520011010880003', nama_lengkap: 'Slamet Riyadi',     dukuh: 'Genjeng', jenis_kelamin: 'L', agama: 'Islam', pekerjaan: 'Petani',   status_kawin: 'Kawin' },
  { nik: '3520016702000004', nama_lengkap: 'Dewi Rahayu',       dukuh: 'Ngasem',  jenis_kelamin: 'P', agama: 'Islam', pekerjaan: 'Buruh',    status_kawin: 'Belum Kawin' },
  { nik: '3520013005750005', nama_lengkap: 'Wahyudi Sulistyo',  dukuh: 'Ngrombo', jenis_kelamin: 'L', agama: 'Islam', pekerjaan: 'PNS',      status_kawin: 'Kawin' },
  { nik: '3520010109850006', nama_lengkap: 'Agus Prasetyo',     dukuh: 'Genjeng', jenis_kelamin: 'L', agama: 'Kristen', pekerjaan: 'Pedagang', status_kawin: 'Kawin' },
];

/**
 * @route   GET /api/warga
 * @desc    Get all citizens (with optional search by NIK or name)
 */
router.get('/', async (req, res) => {
  try {
    const { q, dukuh, page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    try {
      let sql = `SELECT nik, nama_lengkap, dukuh, jenis_kelamin, alamat_detail,
                        DATE_FORMAT(created_at, '%d %b %Y') as tanggal_daftar
                 FROM warga`;
      const params = [];
      const conditions = [];

      if (q) {
        conditions.push(`(nama_lengkap LIKE ? OR nik LIKE ?)`);
        params.push(`%${q}%`, `%${q}%`);
      }
      if (dukuh && dukuh !== 'Semua') {
        conditions.push(`dukuh = ?`);
        params.push(dukuh);
      }
      if (conditions.length) sql += ` WHERE ` + conditions.join(' AND ');
      sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
      params.push(Number(limit), offset);

      const [rows] = await pool.query(sql, params);
      const [[{ total }]] = await pool.query(
        `SELECT COUNT(*) as total FROM warga${conditions.length ? ' WHERE ' + conditions.join(' AND ') : ''}`,
        params.slice(0, -2)
      );

      return res.json({ success: true, data: rows, total, page: Number(page), limit: Number(limit) });
    } catch (dbErr) {
      console.warn('DB Query Warga fallback:', dbErr.message);
    }

    // Fallback
    let filtered = FALLBACK_WARGA;
    if (q) filtered = filtered.filter(w => w.nama_lengkap.toLowerCase().includes(q.toLowerCase()) || w.nik.includes(q));
    if (dukuh && dukuh !== 'Semua') filtered = filtered.filter(w => w.dukuh === dukuh);
    return res.json({ success: true, data: filtered, total: filtered.length, page: 1, limit: 50 });

  } catch (error) {
    console.error('Error fetching warga:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data warga.', error: error.message });
  }
});

/**
 * @route   GET /api/warga/:nik
 * @desc    Get single citizen by NIK
 */
router.get('/:nik', async (req, res) => {
  try {
    const { nik } = req.params;
    try {
      const [rows] = await pool.query('SELECT nik, nama_lengkap, dukuh, jenis_kelamin, alamat_detail FROM warga WHERE nik = ?', [nik]);
      if (rows.length > 0) return res.json({ success: true, data: rows[0] });
    } catch (dbErr) {
      console.warn('DB Warga detail fallback:', dbErr.message);
    }
    const found = FALLBACK_WARGA.find(w => w.nik === nik);
    if (found) return res.json({ success: true, data: found });
    return res.status(404).json({ success: false, message: 'Warga dengan NIK tersebut tidak ditemukan.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal mengambil data warga.', error: error.message });
  }
});

/**
 * @route   POST /api/warga
 * @desc    Add new citizen
 */
router.post('/', async (req, res) => {
  try {
    const { nik, nama_lengkap, dukuh, jenis_kelamin, alamat_detail } = req.body;
    if (!nik || !nama_lengkap || !dukuh || !jenis_kelamin) {
      return res.status(400).json({ success: false, message: 'NIK, Nama Lengkap, Dukuh, dan Jenis Kelamin wajib diisi.' });
    }
    if (nik.length !== 16) {
      return res.status(400).json({ success: false, message: 'NIK harus 16 digit.' });
    }
    try {
      await pool.query(
        `INSERT INTO warga (nik, nama_lengkap, dukuh, jenis_kelamin, alamat_detail)
         VALUES (?, ?, ?, ?, ?)`,
        [nik, nama_lengkap, dukuh, jenis_kelamin, alamat_detail || '']
      );
      return res.status(201).json({ success: true, message: `Data warga ${nama_lengkap} berhasil ditambahkan.`, data: { nik, nama_lengkap, dukuh, jenis_kelamin, alamat_detail } });
    } catch (dbErr) {
      console.warn('DB Insert Warga (demo mode):', dbErr.message);
      return res.status(500).json({ success: false, message: dbErr.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menambah data warga.', error: error.message });
  }
});

/**
 * @route   PUT /api/warga/:nik
 * @desc    Update citizen data
 */
router.put('/:nik', async (req, res) => {
  try {
    const { nik } = req.params;
    const { nama_lengkap, dukuh, jenis_kelamin, alamat_detail } = req.body;
    try {
      await pool.query(
        `UPDATE warga SET nama_lengkap = ?, dukuh = ?, jenis_kelamin = ?, alamat_detail = ?
         WHERE nik = ?`,
        [nama_lengkap, dukuh, jenis_kelamin, alamat_detail, nik]
      );
      return res.json({ success: true, message: `Data warga NIK ${nik} berhasil diperbarui.` });
    } catch (dbErr) {
      console.warn('DB Update Warga:', dbErr.message);
      return res.status(500).json({ success: false, message: dbErr.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memperbarui data warga.', error: error.message });
  }
});

/**
 * @route   DELETE /api/warga/:nik
 * @desc    Delete citizen record
 */
router.delete('/:nik', async (req, res) => {
  try {
    const { nik } = req.params;
    try {
      await pool.query('DELETE FROM warga WHERE nik = ?', [nik]);
      return res.json({ success: true, message: `Data warga NIK ${nik} berhasil dihapus.` });
    } catch (dbErr) {
      console.warn('DB Delete Warga:', dbErr.message);
      return res.status(500).json({ success: false, message: dbErr.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghapus data warga.', error: error.message });
  }
});

export default router;
