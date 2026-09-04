-- ==============================================================================
-- SKEMA DATABASE DESA BANJAREJO
-- ==============================================================================
-- Pastikan Anda membuat database terlebih dahulu di MySQL Anda:
-- CREATE DATABASE desa_banjarejo;
-- USE desa_banjarejo;

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
  -- B-Tree Index untuk mempercepat pencarian nama
  INDEX `idx_warga_nama` (`nama_lengkap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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
  -- Foreign key ke tabel warga
  CONSTRAINT `fk_surat_warga` FOREIGN KEY (`nik_pemohon`) REFERENCES `warga` (`nik`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------------------------
-- 3. TABEL SEARCH INDEX (Omnisearch Global)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `search_index`;
CREATE TABLE `search_index` (
  `id_search` INT NOT NULL AUTO_INCREMENT,
  `keyword` VARCHAR(255) NOT NULL,
  `modul_asal` VARCHAR(50) NOT NULL, -- 'warga', 'surat', 'berita'
  `url_target` VARCHAR(255) NOT NULL,
  `ref_id` VARCHAR(50) NOT NULL, -- Menyimpan NIK atau id_surat sebagai referensi
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_search`),
  -- Full-Text Index untuk pencarian teks yang cepat
  FULLTEXT KEY `ft_idx_keyword` (`keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==============================================================================
-- TRIGGER MYSQL (Otomatisasi Omnisearch)
-- ==============================================================================

-- Trigger: Setelah Warga Baru Ditambahkan
DELIMITER //
CREATE TRIGGER `trg_after_warga_insert` AFTER INSERT ON `warga`
FOR EACH ROW
BEGIN
    -- Masukkan NIK ke index pencarian
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nik, 'warga', CONCAT('/admin/warga/', NEW.nik), NEW.nik);
    
    -- Masukkan Nama ke index pencarian
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nama_lengkap, 'warga', CONCAT('/admin/warga/', NEW.nik), NEW.nik);
END//
DELIMITER ;

-- Trigger: Setelah Permohonan Surat Baru Ditambahkan
DELIMITER //
CREATE TRIGGER `trg_after_surat_insert` AFTER INSERT ON `layanan_surat`
FOR EACH ROW
BEGIN
    -- Masukkan Nomor Pelacakan ke index pencarian
    INSERT INTO `search_index` (`keyword`, `modul_asal`, `url_target`, `ref_id`)
    VALUES (NEW.nomor_pelacakan, 'surat', CONCAT('/admin/surat/', NEW.nomor_pelacakan), NEW.id_surat);
END//
DELIMITER ;

-- Trigger: Setelah Status Surat Diubah (Update)
-- Jika nomor pelacakan atau status berubah (misal opsi fitur advance)
-- Bisa ditambahkan logic trigger UPDATE di sini jika dibutuhkan nantinya.

SET FOREIGN_KEY_CHECKS = 1;
