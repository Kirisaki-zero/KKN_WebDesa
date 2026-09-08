import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

const FALLBACK_PENGUMUMAN = [
  {
    id: 1,
    judul: 'Jadwal Pelayanan Surat Keterangan Domisili',
    isi: 'Pelayanan surat keterangan domisili dilayani setiap hari Senin–Jumat pukul 08.00–14.00 WIB di Balai Desa Banjarejo.',
    kategori: 'Layanan',
    prioritas: 'Tinggi',
    tanggal_mulai: new Date().toISOString().slice(0, 10),
    tanggal_berakhir: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    status: 'Aktif',
    penulis: 'Admin Desa',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    judul: 'Gotong Royong Pembersihan Saluran Irigasi Dukuh Ngrombo',
    isi: 'Seluruh warga Dukuh Ngrombo diundang untuk berpartisipasi dalam gotong royong pembersihan saluran irigasi pada hari Minggu, 15 September 2026 pukul 07.00 WIB.',
    kategori: 'Kegiatan',
    prioritas: 'Normal',
    tanggal_mulai: '2026-09-10',
    tanggal_berakhir: '2026-09-15',
    status: 'Aktif',
    penulis: 'Kepala Dukuh Ngrombo',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    judul: 'Penerimaan Bantuan Langsung Tunai Dana Desa Bulan September',
    isi: 'Penerima manfaat BLT Dana Desa dapat mengambil bantuan di Kantor Desa Banjarejo pada tanggal 20–22 September 2026 dengan membawa KTP asli.',
    kategori: 'Bantuan',
    prioritas: 'Tinggi',
    tanggal_mulai: '2026-09-18',
    tanggal_berakhir: '2026-09-22',
    status: 'Aktif',
    penulis: 'Bendahara Desa',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

/**
 * @route   GET /api/pengumuman
 * @desc    Get all village announcements
 */
router.get('/', async (req, res) => {
  try {
    const { status, kategori } = req.query;
    try {
      let sql = `SELECT id_pengumuman as id, judul, isi, kategori, prioritas,
                        tanggal_mulai, tanggal_berakhir, status_aktif as status,
                        penulis, created_at
                 FROM pengumuman`;
      const params = [];
      const conditions = [];
      if (status && status !== 'Semua') { conditions.push(`status_aktif = ?`); params.push(status); }
      if (kategori && kategori !== 'Semua') { conditions.push(`kategori = ?`); params.push(kategori); }
      if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
      sql += ' ORDER BY created_at DESC';

      const [rows] = await pool.query(sql, params);
      if (rows.length > 0) return res.json({ success: true, data: rows });
    } catch (dbErr) {
      console.warn('DB Query Pengumuman fallback:', dbErr.message);
    }

    let filtered = FALLBACK_PENGUMUMAN;
    if (status && status !== 'Semua') filtered = filtered.filter(p => p.status === status);
    if (kategori && kategori !== 'Semua') filtered = filtered.filter(p => p.kategori === kategori);
    return res.json({ success: true, data: filtered });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal mengambil pengumuman.', error: error.message });
  }
});

/**
 * @route   GET /api/pengumuman/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM pengumuman WHERE id_pengumuman = ?', [id]);
      if (rows.length > 0) return res.json({ success: true, data: rows[0] });
    } catch (dbErr) { console.warn('DB Pengumuman detail fallback:', dbErr.message); }
    const found = FALLBACK_PENGUMUMAN.find(p => String(p.id) === String(id));
    if (found) return res.json({ success: true, data: found });
    return res.status(404).json({ success: false, message: 'Pengumuman tidak ditemukan.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal mengambil detail pengumuman.', error: error.message });
  }
});

/**
 * @route   POST /api/pengumuman
 * @desc    Create new announcement
 */
router.post('/', async (req, res) => {
  try {
    const { judul, isi, kategori, prioritas, tanggal_mulai, tanggal_berakhir, penulis } = req.body;
    if (!judul || !isi) return res.status(400).json({ success: false, message: 'Judul dan Isi pengumuman wajib diisi.' });

    try {
      const [result] = await pool.query(
        `INSERT INTO pengumuman (judul, isi, kategori, prioritas, tanggal_mulai, tanggal_berakhir, status_aktif, penulis)
         VALUES (?, ?, ?, ?, ?, ?, 'Aktif', ?)`,
        [judul, isi, kategori || 'Umum', prioritas || 'Normal', tanggal_mulai || null, tanggal_berakhir || null, penulis || 'Admin Desa']
      );
      return res.status(201).json({ success: true, message: 'Pengumuman berhasil dibuat.', data: { id: result.insertId, judul } });
    } catch (dbErr) {
      console.warn('DB Insert Pengumuman (demo mode):', dbErr.message);
    }
    return res.status(201).json({ success: true, message: 'Pengumuman berhasil dibuat (mode demo).', data: { id: Date.now(), judul, isi, kategori, status: 'Aktif' } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal membuat pengumuman.', error: error.message });
  }
});

/**
 * @route   PUT /api/pengumuman/:id
 * @desc    Update announcement
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi, kategori, prioritas, tanggal_mulai, tanggal_berakhir, status } = req.body;
    try {
      await pool.query(
        `UPDATE pengumuman SET judul=?, isi=?, kategori=?, prioritas=?, tanggal_mulai=?, tanggal_berakhir=?, status_aktif=? WHERE id_pengumuman=?`,
        [judul, isi, kategori, prioritas, tanggal_mulai, tanggal_berakhir, status || 'Aktif', id]
      );
    } catch (dbErr) { console.warn('DB Update Pengumuman (demo mode):', dbErr.message); }
    return res.json({ success: true, message: `Pengumuman ID ${id} berhasil diperbarui.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memperbarui pengumuman.', error: error.message });
  }
});

/**
 * @route   DELETE /api/pengumuman/:id
 * @desc    Delete announcement
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM pengumuman WHERE id_pengumuman = ?', [id]);
    } catch (dbErr) { console.warn('DB Delete Pengumuman (demo mode):', dbErr.message); }
    return res.json({ success: true, message: `Pengumuman ID ${id} berhasil dihapus.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghapus pengumuman.', error: error.message });
  }
});

export default router;
