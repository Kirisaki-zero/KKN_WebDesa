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

      if (rows.length > 0) {
        return res.json({
          success: true,
          data: rows
        });
      }
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

export default router;
