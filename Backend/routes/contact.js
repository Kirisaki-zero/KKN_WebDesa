import express from 'express';

const router = express.Router();

// Mock database or store for UMKM WhatsApp numbers protected on backend
const UMKM_CONTACTS = {
  '1': { name: 'Kerupuk Puli Slamet', phone: '6281234567890', message: 'Halo Pak Slamet, saya mau memesan Kerupuk Puli Banjarejo.' },
  '2': { name: 'Keripik Tempe Dewi', phone: '6282345678901', message: 'Halo Bu Dewi, saya berminat memesan Keripik Tempe Banjarejo.' },
  '3': { name: 'Peternakan Ayam Agus', phone: '6283456789012', message: 'Halo Pak Agus, saya mau menanyakan stok Telur Ayam.' },
  '4': { name: 'Jamu Mbok Inem', phone: '6284567890123', message: 'Halo Mbok Inem, saya mau memesan Jamu Tradisional.' },
  '5': { name: 'Kerajinan Bambu Genjeng', phone: '6285678901234', message: 'Halo Pak Poniman, saya berminat dengan kerajinan bambu.' },
  '6': { name: 'Budidaya Lele Yanto', phone: '6286789012345', message: 'Halo Pak Yanto, saya mau pesan Lele Organik.' }
};

/**
 * @route   GET /api/contact/:umkmId
 * @desc    Secure Redirect Route to WhatsApp (prevents bot scraping of citizen phone numbers)
 */
router.get('/:umkmId', (req, res) => {
  const { umkmId } = req.params;
  const umkm = UMKM_CONTACTS[umkmId];

  if (!umkm) {
    return res.status(404).send('Contact UMKM tidak ditemukan.');
  }

  // Analytics logging (track click count)
  console.log(`[Analytics] Contact click recorded for UMKM ID: ${umkmId} (${umkm.name}) at ${new Date().toISOString()}`);

  const waUrl = `https://wa.me/${umkm.phone}?text=${encodeURIComponent(umkm.message)}`;
  
  // Perform 302 temporary redirect securely
  return res.redirect(waUrl);
});

export default router;
