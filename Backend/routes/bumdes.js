import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * @route   POST /api/bumdes/register
 * @desc    Submit BUMDes savings or loan pre-registration form
 */
router.post('/register', async (req, res) => {
  try {
    const { namaLengkap, nik, noWa, dukuh, jenisLayanan, jumlahPinjaman, tujuanPenggunaan } = req.body;

    if (!namaLengkap || !nik || !noWa || !dukuh || !jenisLayanan) {
      return res.status(400).json({
        success: false,
        message: 'Mohon lengkapi seluruh kolom formulir yang wajib diisi.'
      });
    }

    if (nik.length !== 16) {
      return res.status(400).json({
        success: false,
        message: 'NIK harus tepat 16 digit angka.'
      });
    }

    // In future DB schema, can log to `bumdes_pendaftaran` table
    console.log(`[BUMDes Register] New pre-registration from ${namaLengkap} (NIK: ${nik}, WA: ${noWa}, Dukuh: ${dukuh}, Layanan: ${jenisLayanan})`);

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran BUMDes berhasil diterima. Pengurus akan menghubungi via WhatsApp dalam 1–2 hari kerja.',
      data: {
        namaLengkap,
        nik,
        dukuh,
        jenisLayanan,
        jumlahPinjaman: jenisLayanan === 'pinjaman' ? jumlahPinjaman : null,
        tanggal: new Date()
      }
    });
  } catch (error) {
    console.error('Error registering for BUMDes:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses pendaftaran BUMDes.',
      error: error.message
    });
  }
});

export default router;
