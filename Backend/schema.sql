-- ==============================================================================
-- SKEMA DATABASE DESA BANJAREJO (LENGKAP)
-- ==============================================================================
-- Pastikan database dibuat dan dipilih otomatis:
CREATE DATABASE IF NOT EXISTS `desa_banjarejo`;
USE `desa_banjarejo`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. TABEL WARGA (Data Kependudukan Master)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `warga`;
CREATE TABLE `warga` (
  `nik` VARCHAR(16) NOT NULL,
  `nama_lengkap` VARCHAR(100) NOT NULL,
  `dukuh` ENUM('Ngasem', 'Ngrombo', 'Genjeng') NOT NULL,
  `alamat_detail` TEXT,
  `jenis_kelamin` ENUM('L', 'P') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nik`),
  INDEX `idx_warga_nama` (`nama_lengkap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Warga
INSERT INTO `warga` (`nik`, `nama_lengkap`, `dukuh`, `alamat_detail`, `jenis_kelamin`) VALUES
('3520011204900001', 'Budi Santoso', 'Ngasem', 'RT 02 RW 01 Dukuh Ngasem', 'L'),
('3520014508950002', 'Siti Aminah', 'Ngrombo', 'RT 04 RW 02 Dukuh Ngrombo', 'P'),
('3520011010880003', 'Slamet Riyadi', 'Ngasem', 'RT 01 RW 01 Dukuh Ngasem', 'L'),
('3520012503920004', 'Dewi Rahayu', 'Ngrombo', 'RT 03 RW 02 Dukuh Ngrombo', 'P'),
('3520011507850005', 'Agus Wibowo', 'Genjeng', 'RT 01 RW 03 Dukuh Genjeng', 'L');


-- ------------------------------------------------------------------------------
-- 2. TABEL LAYANAN SURAT (e-Services)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `layanan_surat`;
CREATE TABLE `layanan_surat` (
  `id_surat` INT NOT NULL AUTO_INCREMENT,
  `nomor_pelacakan` VARCHAR(20) NOT NULL,
  `nik_pemohon` VARCHAR(16) NOT NULL,
  `jenis_layanan` ENUM('Surat_Keterangan', 'Akta_Kelahiran', 'Sertifikat_Tanah', 'Izin_Usaha', 'Bantuan_Sosial') NOT NULL,
  `keterangan` TEXT,
  `status` ENUM('PENDING', 'PROSES', 'SELESAI', 'DITOLAK') DEFAULT 'PENDING',
  `file_pdf_url` VARCHAR(255) DEFAULT NULL,
  `tanggal_pengajuan` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_surat`),
  UNIQUE KEY `idx_nomor_pelacakan` (`nomor_pelacakan`),
  CONSTRAINT `fk_surat_warga` FOREIGN KEY (`nik_pemohon`) REFERENCES `warga` (`nik`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Layanan Surat
INSERT INTO `layanan_surat` (`nomor_pelacakan`, `nik_pemohon`, `jenis_layanan`, `keterangan`, `status`, `file_pdf_url`) VALUES
('RESI-20260906-8A1X', '3520011204900001', 'Surat_Keterangan', 'Keperluan Pembuatan SIM C', 'PENDING', NULL),
('RESI-20260905-9B2Y', '3520014508950002', 'Akta_Kelahiran', 'Pengurusan Akta Kelahiran Anak', 'PROSES', NULL),
('RESI-20260904-7C3Z', '3520011010880003', 'Izin_Usaha', 'Izin Usaha Mikro Kerupuk Puli', 'SELESAI', '/api/services/pdf/3');


-- ------------------------------------------------------------------------------
-- 3. TABEL ARTIKEL (Berita Desa)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `artikel`;
CREATE TABLE `artikel` (
  `id_artikel` INT NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  `kategori` ENUM('Pemerintahan', 'Ekonomi', 'Pertanian', 'Sosial') NOT NULL,
  `ringkasan` TEXT NOT NULL,
  `isi` LONGTEXT,
  `penulis` VARCHAR(100) DEFAULT 'Pemerintah Desa',
  `gambar_url` VARCHAR(255) DEFAULT NULL,
  `tanggal` DATE NOT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_artikel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Artikel
INSERT INTO `artikel` (`judul`, `kategori`, `ringkasan`, `penulis`, `gambar_url`, `tanggal`, `is_featured`) VALUES
('Musyawarah Desa Banjarejo Sepakati Rencana Pembangunan Jangka Menengah 2027–2032', 'Pemerintahan', 'Seluruh elemen masyarakat Desa Banjarejo berkumpul dalam musyawarah tahunan untuk menyepakati prioritas pembangunan lima tahun ke depan.', 'Sudarmanto', 'https://images.unsplash.com/photo-1752760023440-6e912553de03?w=1400&h=700&fit=crop&auto=format', '2026-08-14', 1),
('Realisasi APBDes Banjarejo Semester I 2026 Capai 74 Persen', 'Pemerintahan', 'Pemerintah Desa Banjarejo mempublikasikan laporan realisasi anggaran semester pertama dengan tingkat serapan 74% dari total pagu Rp 980 juta.', 'Sri Wahyuni', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format', '2026-08-10', 0),
('BUMDes Banjarejo Mandiri Cetak Omzet Rp 95 Juta di Semester Pertama', 'Ekonomi', 'Badan Usaha Milik Desa Banjarejo mencatat pertumbuhan omzet 28% dibanding periode yang sama tahun lalu.', 'Joko Purnomo', 'https://images.unsplash.com/photo-1561504935-4e7d4516a2d1?w=600&h=400&fit=crop&auto=format', '2026-08-08', 0),
('Panen Padi Musim Tanam Pertama Dukuh Ngasem Hasilkan 48 Ton Gabah', 'Pertanian', 'Petani Dukuh Ngasem berhasil memanen 48 ton gabah kering pada musim tanam pertama 2026, melampaui target produksi.', 'Agus Suryanto', 'https://images.unsplash.com/photo-1574263867128-1d54d63e2b4e?w=600&h=400&fit=crop&auto=format', '2026-08-06', 0),
('Posyandu Balita Dukuh Genjeng Catat Kehadiran Tertinggi 2026', 'Sosial', 'Program penimbangan balita dan pemberian makanan tambahan di Dukuh Genjeng mencatat tingkat kehadiran 96%.', 'Ratna Sari', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop&auto=format', '2026-08-04', 0);


-- ------------------------------------------------------------------------------
-- 4. TABEL UMKM (Direktori Usaha Warga)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `umkm`;
CREATE TABLE `umkm` (
  `id_umkm` INT NOT NULL AUTO_INCREMENT,
  `nama_usaha` VARCHAR(150) NOT NULL,
  `kategori` VARCHAR(50) NOT NULL,
  `deskripsi` TEXT NOT NULL,
  `pemilik` VARCHAR(100) NOT NULL,
  `dukuh` ENUM('Ngasem', 'Ngrombo', 'Genjeng') NOT NULL,
  `sejak` VARCHAR(4) DEFAULT '2020',
  `whatsapp` VARCHAR(20) NOT NULL,
  `instagram` VARCHAR(100) DEFAULT NULL,
  `youtube_id` VARCHAR(50) DEFAULT NULL,
  `gambar_url` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_umkm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data UMKM
INSERT INTO `umkm` (`nama_usaha`, `kategori`, `deskripsi`, `pemilik`, `dukuh`, `sejak`, `whatsapp`, `instagram`, `youtube_id`, `gambar_url`) VALUES
('Kerupuk Puli Slamet', 'Produk Olahan', 'Kerupuk puli tradisional berbahan singkong pilihan, diproses secara higienis oleh keluarga Pak Slamet sejak tiga generasi. Dipasarkan ke seluruh Kabupaten Magetan.', 'Slamet Riyadi', 'Ngasem', '1987', '6281234567801', 'kerupukpuli_banjarejo', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1604908177524-83cf2e3e7c34?w=600&h=340&fit=crop&auto=format'),
('Keripik Tempe Dewi', 'Produk Olahan', 'Keripik tempe renyah berbumbu rempah khas Jawa Timur. Diproduksi dari kedelai lokal non-GMO, tanpa pengawet.', 'Dewi Rahayu', 'Ngrombo', '2015', '6281234567802', 'keripiktempe_ngrombo', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=340&fit=crop&auto=format'),
('Peternakan Ayam Agus', 'Peternakan', 'Usaha ternak ayam petelur modern kapasitas 800 ekor. Telur segar didistribusikan harian ke pasar Panekan dan Magetan kota.', 'Agus Wibowo', 'Genjeng', '2018', '6281234567803', 'peternakanbanjarejo', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=340&fit=crop&auto=format'),
('Jamu Tradisional Mbok Inem', 'Minuman Herbal', 'Jamu gendong dan kemasan dari rempah-rempah pilihan: beras kencur, kunyit asam, dan jahe merah. Resep turun-temurun.', 'Suparinem', 'Ngasem', '2005', '6281234567804', 'jamu_mbokinem', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=340&fit=crop&auto=format'),
('Kerajinan Bambu Genjeng', 'Kerajinan Tangan', 'Anyaman bambu berkualitas tinggi: tampah, bakul, caping, dan furnitur dekorasi khas Magetan.', 'Poniman Susanto', 'Genjeng', '2010', '6281234567805', 'bambu_genjeng', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&h=340&fit=crop&auto=format'),
('Budidaya Lele Organik Yanto', 'Perikanan', 'Budidaya lele kolam terpal dengan pakan organik bersertifikat. Menyuplai rumah makan dan warung makan di Kecamatan Panekan.', 'Yanto Prasetyo', 'Ngrombo', '2021', '6281234567806', 'lele_yanto', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&h=340&fit=crop&auto=format');


-- ------------------------------------------------------------------------------
-- 5. TABEL SEARCH INDEX (Omnisearch Global)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `search_index`;
CREATE TABLE `search_index` (
  `id_search` INT NOT NULL AUTO_INCREMENT,
  `keyword` VARCHAR(255) NOT NULL,
  `modul_asal` VARCHAR(50) NOT NULL, -- 'warga', 'surat', 'berita', 'umkm'
  `url_target` VARCHAR(255) NOT NULL,
  `ref_id` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_search`),
  FULLTEXT KEY `ft_idx_keyword` (`keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Omnisearch
INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`) VALUES
('Budi Santoso', 'warga', '/admin/warga/3520011204900001', '3520011204900001'),
('Siti Aminah', 'warga', '/admin/warga/3520014508950002', '3520014508950002'),
('RESI-20260906-8A1X', 'surat', '/admin/surat/RESI-20260906-8A1X', '1'),
('RESI-20260905-9B2Y', 'surat', '/admin/surat/RESI-20260905-9B2Y', '2'),
('Kerupuk Puli Slamet', 'umkm', '/umkm/1', '1'),
('Musyawarah Desa Banjarejo', 'berita', '/news/1', '1');


-- ==============================================================================
-- TRIGGER MYSQL (Otomatisasi Omnisearch)
-- ==============================================================================

DELIMITER //
CREATE TRIGGER `trg_after_warga_insert` AFTER INSERT ON `warga`
FOR EACH ROW
BEGIN
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nik, 'warga', CONCAT('/admin/warga/', NEW.nik), NEW.nik);
    
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nama_lengkap, 'warga', CONCAT('/admin/warga/', NEW.nik), NEW.nik);
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `trg_after_surat_insert` AFTER INSERT ON `layanan_surat`
FOR EACH ROW
BEGIN
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nomor_pelacakan, 'surat', CONCAT('/admin/surat/', NEW.nomor_pelacakan), NEW.id_surat);
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `trg_after_artikel_insert` AFTER INSERT ON `artikel`
FOR EACH ROW
BEGIN
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.judul, 'berita', CONCAT('/news/', NEW.id_artikel), NEW.id_artikel);
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `trg_after_umkm_insert` AFTER INSERT ON `umkm`
FOR EACH ROW
BEGIN
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nama_usaha, 'umkm', CONCAT('/umkm/', NEW.id_umkm), NEW.id_umkm);
END//
DELIMITER ;

SET FOREIGN_KEY_CHECKS = 1;
