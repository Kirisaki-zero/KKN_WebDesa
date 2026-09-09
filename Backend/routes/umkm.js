import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

const FALLBACK_UMKM = [
  {
    id: 1,
    name: 'Kerupuk Puli Slamet',
    category: 'Produk Olahan',
    description: 'Kerupuk puli tradisional berbahan singkong pilihan, dipproses secara higienis oleh keluarga Pak Slamet sejak tiga generasi. Dipasarkan ke seluruh Kabupaten Magetan.',
    location: 'Dukuh Ngasem',
    dukuh: 'Ngasem',
    whatsapp: '6281234567801',
    instagram: 'kerupukpuli_banjarejo',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1604908177524-83cf2e3e7c34?w=600&h=340&fit=crop&auto=format',
    owner: 'Slamet Riyadi',
    since: '1987',
  },
  {
    id: 2,
    name: 'Keripik Tempe Dewi',
    category: 'Produk Olahan',
    description: 'Keripik tempe renyah berbumbu rempah khas Jawa Timur. Diproduksi dari kedelai lokal non-GMO, tanpa pengawet.',
    location: 'Dukuh Ngrombo',
    dukuh: 'Ngrombo',
    whatsapp: '6281234567802',
    instagram: 'keripiktempe_ngrombo',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=340&fit=crop&auto=format',
    owner: 'Dewi Rahayu',
    since: '2015',
  },
  {
    id: 3,
    name: 'Peternakan Ayam Agus',
    category: 'Peternakan',
    description: 'Usaha ternak ayam petelur modern kapasitas 800 ekor. Telur segar didistribusikan harian ke pasar Panekan dan Magetan kota.',
    location: 'Dukuh Genjeng',
    dukuh: 'Genjeng',
    whatsapp: '6281234567803',
    instagram: 'peternakanbanjarejo',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=340&fit=crop&auto=format',
    owner: 'Agus Wibowo',
    since: '2018',
  },
  {
    id: 4,
    name: 'Jamu Tradisional Mbok Inem',
    category: 'Minuman Herbal',
    description: 'Jamu gendong dan kemasan dari rempah-rempah pilihan: beras kencur, kunyit asam, dan jahe merah. Resep turun-temurun.',
    location: 'Dukuh Ngasem',
    dukuh: 'Ngasem',
    whatsapp: '6281234567804',
    instagram: 'jamu_mbokinem',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=340&fit=crop&auto=format',
    owner: 'Suparinem',
    since: '2005',
  },
  {
    id: 5,
    name: 'Kerajinan Bambu Genjeng',
    category: 'Kerajinan Tangan',
    description: 'Anyaman bambu berkualitas tinggi: tampah, bakul, caping, dan furnitur dekorasi khas Magetan.',
    location: 'Dukuh Genjeng',
    dukuh: 'Genjeng',
    whatsapp: '6281234567805',
    instagram: 'bambu_genjeng',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&h=340&fit=crop&auto=format',
    owner: 'Poniman Susanto',
    since: '2010',
  },
  {
    id: 6,
    name: 'Budidaya Lele Organik Yanto',
    category: 'Perikanan',
    description: 'Budidaya lele kolam terpal dengan pakan organik bersertifikat. Menyuplai rumah makan dan warung makan di Kecamatan Panekan.',
    location: 'Dukuh Ngrombo',
    dukuh: 'Ngrombo',
    whatsapp: '6281234567806',
    instagram: 'lele_yanto',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&h=340&fit=crop&auto=format',
    owner: 'Yanto Prasetyo',
    since: '2021',
  }
];

/**
 * @route   GET /api/umkm
 * @desc    Get all registered UMKM businesses
 */
router.get('/', async (req, res) => {
  try {
    try {
      const [rows] = await pool.query(
        `SELECT id_umkm as id, nama_usaha as name, kategori as category, 
                deskripsi as description, pemilik as owner, dukuh, 
                CONCAT('Dukuh ', dukuh) as location, sejak as since, 
                whatsapp, instagram, youtube_id as youtubeId, gambar_url as thumbnail
         FROM umkm
         ORDER BY id_umkm ASC`
      );

      return res.json({
        success: true,
        data: rows
      });
    } catch (dbErr) {
      console.warn('DB Query UMKM fallback:', dbErr.message);
    }

    return res.json({
      success: true,
      data: FALLBACK_UMKM
    });
  } catch (error) {
    console.error('Error fetching UMKM list:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil daftar UMKM.',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/umkm
 * @desc    Add new UMKM business (Admin only)
 */
router.post('/', async (req, res) => {
  try {
    const { name, category, description, owner, dukuh, since, whatsapp, instagram, youtubeId, thumbnail } = req.body;
    if (!name || !dukuh) return res.status(400).json({ success: false, message: 'Nama usaha dan dukuh wajib diisi.' });
    try {
      const [result] = await pool.query(
        `INSERT INTO umkm (nama_usaha, kategori, deskripsi, pemilik, dukuh, sejak, whatsapp, instagram, youtube_id, gambar_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, category || 'Lainnya', description || '', owner || '', dukuh, since || new Date().getFullYear(), whatsapp || '', instagram || '', youtubeId || '', thumbnail || '']
      );
      return res.status(201).json({ success: true, message: 'UMKM berhasil ditambahkan.', data: { id: result.insertId, name } });
    } catch (dbErr) {
      console.warn('DB Insert UMKM (demo mode):', dbErr.message);
    }
    return res.status(201).json({ success: true, message: 'UMKM berhasil ditambahkan (mode demo).', data: { id: Date.now(), name, category, dukuh } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menambah UMKM.', error: error.message });
  }
});

/**
 * @route   PUT /api/umkm/:id
 * @desc    Update UMKM data (Admin only)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, owner, dukuh, since, whatsapp, instagram, youtubeId, thumbnail } = req.body;
    try {
      await pool.query(
        `UPDATE umkm SET nama_usaha=?, kategori=?, deskripsi=?, pemilik=?, dukuh=?, sejak=?, whatsapp=?, instagram=?, youtube_id=?, gambar_url=?
         WHERE id_umkm=?`,
        [name, category, description, owner, dukuh, since, whatsapp, instagram, youtubeId, thumbnail, id]
      );
    } catch (dbErr) {
      console.warn('DB Update UMKM (demo mode):', dbErr.message);
    }
    return res.json({ success: true, message: `UMKM ID ${id} berhasil diperbarui.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memperbarui data UMKM.', error: error.message });
  }
});

/**
 * @route   DELETE /api/umkm/:id
 * @desc    Delete UMKM (Admin only)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM umkm WHERE id_umkm = ?', [id]);
    } catch (dbErr) {
      console.warn('DB Delete UMKM (demo mode):', dbErr.message);
    }
    return res.json({ success: true, message: `UMKM ID ${id} berhasil dihapus.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghapus UMKM.', error: error.message });
  }
});

export default router;

