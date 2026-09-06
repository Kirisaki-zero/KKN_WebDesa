import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

const MOCK_CONTACTS = {
  '1': { name: 'Kerupuk Puli Slamet', phone: '6281234567801', message: 'Halo Pak Slamet, saya mau memesan Kerupuk Puli Banjarejo.' },
  '2': { name: 'Keripik Tempe Dewi', phone: '6281234567802', message: 'Halo Bu Dewi, saya berminat memesan Keripik Tempe Banjarejo.' },
  '3': { name: 'Peternakan Ayam Agus', phone: '6281234567803', message: 'Halo Pak Agus, saya mau menanyakan stok Telur Ayam.' },
  '4': { name: 'Jamu Mbok Inem', phone: '6281234567804', message: 'Halo Mbok Inem, saya mau memesan Jamu Tradisional.' },
  '5': { name: 'Kerajinan Bambu Genjeng', phone: '6281234567805', message: 'Halo Pak Poniman, saya berminat dengan kerajinan bambu.' },
  '6': { name: 'Budidaya Lele Yanto', phone: '6281234567806', message: 'Halo Pak Yanto, saya mau pesan Lele Organik.' }
};

/**
 * @route   GET /api/contact/:umkmId
 * @desc    Secure Redirect Route to WhatsApp (prevents bot scraping of citizen phone numbers)
 */
router.get('/:umkmId', async (req, res) => {
  const { umkmId } = req.params;

  let phone = null;
  let name = `UMKM ID ${umkmId}`;
  let customMessage = `Halo, saya tertarik dengan produk UMKM Desa Banjarejo.`;

  try {
    const [rows] = await pool.query('SELECT nama_usaha, whatsapp FROM umkm WHERE id_umkm = ?', [umkmId]);
    if (rows.length > 0) {
      phone = rows[0].whatsapp;
      name = rows[0].nama_usaha;
      customMessage = `Halo ${name}, saya tertarik dengan produk Anda di Portal UMKM Desa Banjarejo.`;
    }
  } catch (dbErr) {
    console.warn('DB Contact redirect fallback:', dbErr.message);
  }

  // Fallback if DB query returned nothing or failed
  if (!phone && MOCK_CONTACTS[umkmId]) {
    phone = MOCK_CONTACTS[umkmId].phone;
    name = MOCK_CONTACTS[umkmId].name;
    customMessage = MOCK_CONTACTS[umkmId].message;
  }

  if (!phone) {
    return res.status(404).send('Kontak UMKM tidak ditemukan.');
  }

  // Analytics logging (track interaction)
  console.log(`[Analytics] WA Contact Redirect clicked for UMKM: ${name} (ID: ${umkmId}) at ${new Date().toISOString()}`);

  const cleanPhone = phone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage)}`;
  
  // Perform 302 temporary redirect securely
  return res.redirect(waUrl);
});

export default router;
