import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * @route   GET /api/search?q=:keyword
 * @desc    Omnisearch Global Search Engine for Admin & Public
 */
router.get('/', async (req, res) => {
  try {
    const keyword = (req.query.q || '').trim();

    if (!keyword) {
      return res.json({
        success: true,
        query: '',
        results: {
          warga: [],
          surat: [],
          konten: []
        }
      });
    }

    // Intent recognition check
    const lowerKey = keyword.toLowerCase();
    let filterModul = null;

    if (lowerKey.startsWith('nik:') || lowerKey === 'nik') {
      filterModul = 'warga';
    } else if (lowerKey.startsWith('surat:') || lowerKey === 'surat') {
      filterModul = 'surat';
    } else if (lowerKey.startsWith('berita:') || lowerKey === 'berita') {
      filterModul = 'berita';
    }

    const cleanQuery = keyword.replace(/^(nik:|surat:|berita:)/i, '').trim() || keyword;

    // Search query with full-text / LIKE fallback from search_index table
    const sql = `
      SELECT id_search, keyword, modul_asal, url_target, ref_id
      FROM search_index
      WHERE keyword LIKE ?
      ORDER BY id_search DESC
    `;
    const searchPattern = `%${cleanQuery}%`;
    const [rows] = await pool.query(sql, [searchPattern]);

    // Group results by category (Limit max 3 per category)
    const categorized = {
      warga: [],
      surat: [],
      konten: []
    };

    for (const row of rows) {
      if (row.modul_asal === 'warga' && categorized.warga.length < 3) {
        if (!filterModul || filterModul === 'warga') {
          categorized.warga.push({
            title: row.keyword,
            type: 'Warga',
            url: row.url_target,
            refId: row.ref_id
          });
        }
      } else if (row.modul_asal === 'surat' && categorized.surat.length < 3) {
        if (!filterModul || filterModul === 'surat') {
          categorized.surat.push({
            title: `Resi: ${row.keyword}`,
            type: 'Layanan Surat',
            url: row.url_target,
            refId: row.ref_id
          });
        }
      } else if (row.modul_asal === 'berita' && categorized.konten.length < 3) {
        if (!filterModul || filterModul === 'berita') {
          categorized.konten.push({
            title: row.keyword,
            type: 'Konten/Berita',
            url: row.url_target,
            refId: row.ref_id
          });
        }
      }
    }

    return res.json({
      success: true,
      query: keyword,
      results: categorized
    });
  } catch (error) {
    console.error('Error executing Omnisearch:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menjalankan pencarian Omnisearch.',
      error: error.message
    });
  }
});

export default router;
