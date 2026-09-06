import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Fallback seed articles for demo mode when DB is not initialized
const FALLBACK_ARTICLES = [
  {
    id: 0,
    category: 'Pemerintahan',
    title: 'Musyawarah Desa Banjarejo Sepakati Rencana Pembangunan Jangka Menengah 2027–2032',
    excerpt: 'Seluruh elemen masyarakat Desa Banjarejo berkumpul dalam musyawarah tahunan untuk menyepakati prioritas pembangunan lima tahun ke depan, mencakup pembangunan infrastruktur jalan dukuh, pemberdayaan ekonomi warga, dan peningkatan kualitas layanan kesehatan dasar di tiga dukuh.',
    date: '14 Agustus 2026',
    author: 'Sudarmanto',
    image: 'https://images.unsplash.com/photo-1752760023440-6e912553de03?w=1400&h=700&fit=crop&auto=format',
    isFeatured: true
  },
  {
    id: 1,
    category: 'Pemerintahan',
    title: 'Realisasi APBDes Banjarejo Semester I 2026 Capai 74 Persen',
    excerpt: 'Pemerintah Desa Banjarejo mempublikasikan laporan realisasi anggaran semester pertama dengan tingkat serapan 74% dari total pagu Rp 980 juta, didominasi sektor infrastruktur dan pemberdayaan masyarakat.',
    date: '10 Agustus 2026',
    author: 'Sri Wahyuni',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format',
    isFeatured: false
  },
  {
    id: 2,
    category: 'Ekonomi',
    title: 'BUMDes Banjarejo Mandiri Cetak Omzet Rp 95 Juta di Semester Pertama',
    excerpt: 'Badan Usaha Milik Desa Banjarejo mencatat pertumbuhan omzet 28% dibanding periode yang sama tahun lalu, ditopang unit usaha penggilingan padi dan simpan pinjam perempuan.',
    date: '8 Agustus 2026',
    author: 'Joko Purnomo',
    image: 'https://images.unsplash.com/photo-1561504935-4e7d4516a2d1?w=600&h=400&fit=crop&auto=format',
    isFeatured: false
  },
  {
    id: 3,
    category: 'Pertanian',
    title: 'Panen Padi Musim Tanam Pertama Dukuh Ngasem Hasilkan 48 Ton Gabah',
    excerpt: 'Petani Dukuh Ngasem berhasil memanen 48 ton gabah kering pada musim tanam pertama 2026, melampaui target produksi berkat penerapan sistem irigasi teknis dan bibit unggul bersubsidi.',
    date: '6 Agustus 2026',
    author: 'Agus Suryanto',
    image: 'https://images.unsplash.com/photo-1574263867128-1d54d63e2b4e?w=600&h=400&fit=crop&auto=format',
    isFeatured: false
  },
  {
    id: 4,
    category: 'Sosial',
    title: 'Posyandu Balita Dukuh Genjeng Catat Kehadiran Tertinggi 2026',
    excerpt: 'Program penimbangan balita dan pemberian makanan tambahan di Dukuh Genjeng mencatat tingkat kehadiran 96%, didorong oleh sinergi kader PKK dan bidan desa.',
    date: '4 Agustus 2026',
    author: 'Ratna Sari',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop&auto=format',
    isFeatured: false
  }
];

/**
 * @route   GET /api/news
 * @desc    Get all village news articles (with category filter)
 */
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    try {
      let sql = `SELECT id_artikel as id, judul as title, kategori as category, 
                        ringkasan as excerpt, penulis as author, gambar_url as image, 
                        DATE_FORMAT(tanggal, '%d %M %Y') as date, is_featured as isFeatured
                 FROM artikel`;
      const params = [];

      if (category && category !== 'Semua') {
        sql += ` WHERE kategori = ?`;
        params.push(category);
      }
      sql += ` ORDER BY tanggal DESC`;

      const [rows] = await pool.query(sql, params);

      if (rows.length > 0) {
        return res.json({
          success: true,
          data: rows
        });
      }
    } catch (dbErr) {
      console.warn('DB Query News fallback:', dbErr.message);
    }

    // Fallback response
    let filtered = FALLBACK_ARTICLES;
    if (category && category !== 'Semua') {
      filtered = FALLBACK_ARTICLES.filter(a => a.category === category);
    }

    return res.json({
      success: true,
      data: filtered
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil berita.',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/news/:id
 * @desc    Get single article detail
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        `SELECT id_artikel as id, judul as title, kategori as category, 
                ringkasan as excerpt, isi, penulis as author, gambar_url as image, 
                DATE_FORMAT(tanggal, '%d %M %Y') as date
         FROM artikel WHERE id_artikel = ?`,
        [id]
      );
      if (rows.length > 0) {
        return res.json({ success: true, data: rows[0] });
      }
    } catch (dbErr) {
      console.warn('DB Query Article detail fallback:', dbErr.message);
    }

    const found = FALLBACK_ARTICLES.find(a => String(a.id) === String(id));
    if (found) {
      return res.json({ success: true, data: found });
    }

    return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
  } catch (error) {
    console.error('Error fetching article detail:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil detail berita.' });
  }
});

export default router;
