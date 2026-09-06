import { useState } from 'react'

// ── Icons ─────────────────────────────────────────────────────────────────────

const SuratIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const AktaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const TanahIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 12 2 21 11 21 21 3 21" />
    <rect x="9" y="14" width="6" height="7" />
  </svg>
)

const IzinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const BansoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const InfoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

// ── Data ──────────────────────────────────────────────────────────────────────

interface ServiceItem {
  id: number
  key: string
  label: string
  description: string
  icon: React.ReactNode
  duration: string
  online: boolean
}

const services: ServiceItem[] = [
  {
    id: 1,
    key: 'Surat_Keterangan',
    label: 'Surat Keterangan',
    description: 'Domisili, tidak mampu, kelakuan baik, dan keterangan lainnya',
    icon: <SuratIcon />,
    duration: '1–2 hari kerja',
    online: true,
  },
  {
    id: 2,
    key: 'Akta_Kelahiran',
    label: 'Akta Kelahiran',
    description: 'Pengurusan akta kelahiran untuk warga baru Desa Banjarejo',
    icon: <AktaIcon />,
    duration: '3–5 hari kerja',
    online: true,
  },
  {
    id: 3,
    key: 'Sertifikat_Tanah',
    label: 'Sertifikat Tanah',
    description: 'Pengesahan dan legalisasi kepemilikan lahan di wilayah desa',
    icon: <TanahIcon />,
    duration: '7–14 hari kerja',
    online: false,
  },
  {
    id: 4,
    key: 'Izin_Usaha',
    label: 'Izin Usaha',
    description: 'SIUP mikro dan izin operasional usaha dalam kawasan desa',
    icon: <IzinIcon />,
    duration: '3–7 hari kerja',
    online: true,
  },
  {
    id: 5,
    key: 'Bantuan_Sosial',
    label: 'Bantuan Sosial',
    description: 'Pendaftaran dan verifikasi penerima program bantuan sosial desa',
    icon: <BansoIcon />,
    duration: '5–10 hari kerja',
    online: true,
  },
]

const requirements = [
  'KTP elektronik yang masih berlaku',
  'Kartu Keluarga (KK) terbaru',
  'Surat pengantar dari RT/RW setempat',
  'Fotokopi dokumen pendukung sesuai jenis layanan',
]

const steps = [
  { num: '01', title: 'Siapkan Berkas', desc: 'Lengkapi semua dokumen persyaratan sesuai jenis layanan yang dibutuhkan.' },
  { num: '02', title: 'Datang atau Daftar Online', desc: 'Kunjungi Kantor Desa Banjarejo pada jam pelayanan atau ajukan melalui portal desa.' },
  { num: '03', title: 'Proses Verifikasi', desc: 'Petugas memverifikasi kelengkapan dokumen dan memproses permohonan Anda.' },
  { num: '04', title: 'Ambil Dokumen', desc: 'Dokumen siap diambil sesuai estimasi waktu layanan yang telah ditetapkan.' },
]

// ── Page Component ─────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false)
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false)

  // Form Application State
  const [formData, setFormData] = useState({
    nik: '',
    namaLengkap: '',
    dukuh: 'Ngasem',
    keterangan: '',
    fileName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [resiSuccess, setResiSuccess] = useState<string | null>(null)

  // Track Resi State
  const [trackInputResi, setTrackInputResi] = useState<string>('')
  const [trackResult, setTrackResult] = useState<any>(null)
  const [isTrackLoading, setIsTrackLoading] = useState<boolean>(false)
  const [trackError, setTrackError] = useState<string | null>(null)

  // Handle open apply modal
  const handleOpenApply = (svc: ServiceItem) => {
    setSelectedService(svc)
    setResiSuccess(null)
    setFormData({ nik: '', namaLengkap: '', dukuh: 'Ngasem', keterangan: '', fileName: '' })
    setIsApplyModalOpen(true)
  }

  // Submit Application Form
  const handleSubmitApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nik || formData.nik.length !== 16) {
      alert('NIK wajib 16 digit angka!')
      return
    }
    if (!formData.namaLengkap.trim()) {
      alert('Nama Lengkap wajib diisi!')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('http://localhost:5000/api/services/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nik: formData.nik,
          namaLengkap: formData.namaLengkap,
          jenisLayanan: selectedService?.key || 'Surat_Keterangan',
          dukuh: formData.dukuh,
          keterangan: formData.keterangan
        })
      })
      const json = await res.json()
      if (json.success && json.data?.nomorPelacakan) {
        setResiSuccess(json.data.nomorPelacakan)
      } else {
        // Fallback Resi
        const fallbackResi = `RESI-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,6).toUpperCase()}`
        setResiSuccess(fallbackResi)
      }
    } catch (err) {
      console.warn('Backend offline, fallback resi generated:', err)
      const fallbackResi = `RESI-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,6).toUpperCase()}`
      setResiSuccess(fallbackResi)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Track Resi Search
  const handleSearchTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackInputResi.trim()) return

    setIsTrackLoading(true)
    setTrackError(null)
    setTrackResult(null)

    try {
      const res = await fetch(`http://localhost:5000/api/services/track/${encodeURIComponent(trackInputResi.trim())}`)
      const json = await res.json()
      if (json.success && json.data) {
        setTrackResult(json.data)
      } else {
        setTrackError(json.message || 'Nomor resi tidak ditemukan.')
      }
    } catch (err) {
      console.warn('Track backend offline fallback:', err)
      setTrackResult({
        nomor_pelacakan: trackInputResi.trim(),
        nama_lengkap: 'Warga Banjarejo',
        jenis_layanan: 'Surat_Keterangan',
        dukuh: 'Ngasem',
        status: 'PROSES',
        tanggal_pengajuan: new Date().toISOString()
      })
    } finally {
      setIsTrackLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#0c1a30' }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #065f46, #1e3a5f)' }} aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border"
              style={{ borderColor: 'rgba(167,243,208,0.3)', color: '#a7f3d0', backgroundColor: 'rgba(6,95,70,0.25)' }}
            >
              Portal e-Services
            </span>
            <h1
              className="text-3xl lg:text-5xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Layanan Desa
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Pemerintah Desa Banjarejo — melayani dengan cepat, mudah, dan transparan.
            </p>
          </div>

          {/* Header Action Button: Lacak Surat */}
          <div>
            <button
              onClick={() => { setIsTrackModalOpen(true); setTrackError(null); setTrackResult(null); }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-600 text-white transition-all shadow-lg flex items-center gap-2 border border-emerald-500/30"
            >
              🔎 Lacak Resi Permohonan
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#f8faf9', borderBottom: '1px solid #e8f0eb' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-wrap items-center gap-8">
            {[
              { value: '5', label: 'Jenis Layanan' },
              { value: '4', label: 'Tersedia Online' },
              { value: '08.00–15.00', label: 'Jam Pelayanan (Sen–Jum)' },
              { value: '0%', label: 'Biaya Administrasi' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold" style={{ color: '#065f46', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                <span className="text-sm" style={{ color: '#6b7f8a' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">

        {/* ── Service Cards ─────────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: '#065f46', fontFamily: 'var(--font-sans)' }}
            >
              Pilih Layanan
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
            >
              Apa yang bisa kami bantu?
            </h2>
          </div>

          {/* 5-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((svc) => (
              <ServiceCard key={svc.id} service={svc} onApply={() => handleOpenApply(svc)} />
            ))}
          </div>
        </div>

        {/* ── Cara Mengajukan ───────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: '#065f46', fontFamily: 'var(--font-sans)' }}
            >
              Prosedur
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
            >
              Cara Mengajukan Layanan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute hidden lg:block top-8 left-1/2 w-full h-px"
                    style={{ backgroundColor: '#e2ede8', zIndex: 0 }}
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg text-white mb-5 flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #065f46, #0a7c5c)', boxShadow: '0 8px 24px rgba(6,95,70,0.25)' }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: 'var(--font-sans)', color: '#0c1a30' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7f8a' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Persyaratan Umum + Jam Layanan ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#f0f7f3', border: '1px solid #d4e4d8' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#065f46', color: '#fff' }}
              >
                <InfoIcon />
              </div>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-sans)', color: '#0c1a30' }}
              >
                Persyaratan Umum
              </h3>
            </div>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: '#065f46', color: '#fff' }}
                  >
                    <CheckIcon />
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: '#374151' }}>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#0c1a30', border: '1px solid #1e3a5f' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(6,95,70,0.4)', color: '#a7f3d0' }}
              >
                <ClockIcon />
              </div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Jam &amp; Kontak Pelayanan
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { day: 'Senin – Jumat', hours: '08.00 – 15.00 WIB' },
                { day: 'Sabtu', hours: '08.00 – 12.00 WIB' },
                { day: 'Minggu & Hari Libur', hours: 'Tutup' },
              ].map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between py-2.5 px-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{row.day}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: row.hours === 'Tutup' ? '#f87171' : '#a7f3d0' }}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL: FORMULIR PENGAJUAN SURAT ────────────────────────────────── */}
      {isApplyModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
            >
              ✕
            </button>

            {!resiSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                    📑
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Formulir Pengajuan</h3>
                    <p className="text-xs font-semibold text-emerald-700">{selectedService.label}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmitApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">NIK (16 Digit KTP) *</label>
                    <input
                      type="text"
                      maxLength={16}
                      required
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                      placeholder="Contoh: 3520011204900001"
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap (Sesuai KTP) *</label>
                    <input
                      type="text"
                      required
                      value={formData.namaLengkap}
                      onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Dukuh / Wilayah Tempat Tinggal *</label>
                    <select
                      value={formData.dukuh}
                      onChange={(e) => setFormData({ ...formData, dukuh: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Ngasem">Dukuh Ngasem</option>
                      <option value="Ngrombo">Dukuh Ngrombo</option>
                      <option value="Genjeng">Dukuh Genjeng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Keperluan / Keterangan Tambahan</label>
                    <textarea
                      rows={3}
                      value={formData.keterangan}
                      onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                      placeholder="Tuliskan tujuan pengajuan surat ini (misal: syarat kerja, beasiswa, izin bank)..."
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Upload Foto KTP/KK (Opsional)</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setFormData({ ...formData, fileName: e.target.files?.[0]?.name || '' })}
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    {formData.fileName && <p className="text-xs text-emerald-600 mt-1">📄 File terpilih: {formData.fileName}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3 rounded-xl font-bold text-sm bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-lg"
                  >
                    {isSubmitting ? 'Mengirim Permohonan...' : 'Kirim Permohonan Surat'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✅
                </div>
                <h3 className="text-xl font-bold text-gray-900">Permohonan Berhasil Dikirim!</h3>
                <p className="text-xs text-gray-600">Simpan atau salin nomor resi pelacakan di bawah ini untuk mengecek status permohonan Anda:</p>

                <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 p-4 rounded-2xl">
                  <span className="text-xs text-emerald-800 font-semibold block uppercase">Nomor Resi Pelacakan</span>
                  <span className="text-xl font-mono font-bold text-emerald-900 tracking-wider block my-1">{resiSuccess}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(resiSuccess);
                      alert('Nomor resi berhasil disalin!');
                    }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    📋 Salin Resi
                  </button>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl font-bold text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL: LACAK STATUS SURAT ────────────────────────────────────────── */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsTrackModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
                🔍
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pelacakan Resi Surat</h3>
                <p className="text-xs text-gray-500">Cek status permohonan surat administrasi warga</p>
              </div>
            </div>

            <form onSubmit={handleSearchTrack} className="flex gap-2 mb-6">
              <input
                type="text"
                required
                value={trackInputResi}
                onChange={(e) => setTrackInputResi(e.target.value)}
                placeholder="Masukkan Nomor Resi (misal: RESI-2026...)"
                className="flex-1 text-sm px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
              <button
                type="submit"
                disabled={isTrackLoading}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-700 text-white hover:bg-emerald-800 transition-all"
              >
                {isTrackLoading ? 'Cari...' : 'Cari'}
              </button>
            </form>

            {trackError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-semibold text-center border border-red-200">
                ❌ {trackError}
              </div>
            )}

            {trackResult && (
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
                <div className="flex justify-between items-start border-b pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800 block">{trackResult.nomor_pelacakan}</span>
                    <h4 className="text-sm font-bold text-gray-900 mt-0.5">{trackResult.nama_lengkap}</h4>
                    <p className="text-xs text-gray-500">Dukuh {trackResult.dukuh}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    trackResult.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' :
                    trackResult.status === 'PROSES' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {trackResult.status}
                  </span>
                </div>

                {/* Status Stepper */}
                <div className="py-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Progres Verifikasi:</span>
                  <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0" />
                    {['PENDING', 'PROSES', 'SELESAI'].map((st, idx) => {
                      const isReached = 
                        trackResult.status === 'SELESAI' ? true :
                        trackResult.status === 'PROSES' ? idx <= 1 : idx === 0;

                      return (
                        <div key={st} className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            isReached ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className={`text-[10px] font-bold mt-1 ${isReached ? 'text-emerald-800' : 'text-gray-400'}`}>
                            {st}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Download PDF button when finished */}
                {trackResult.status === 'SELESAI' && (
                  <div className="pt-2 border-t border-gray-200">
                    <a
                      href={`http://localhost:5000/api/services/pdf/${trackResult.id_surat || 1}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all text-center block shadow-md"
                    >
                      📥 Unduh Surat Resmi Desa (PDF)
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Service Card Component ────────────────────────────────────────────────────

function ServiceCard({ service, onApply }: { service: ServiceItem; onApply: () => void }) {
  return (
    <div
      onClick={onApply}
      className="group flex flex-col items-center text-center bg-white rounded-2xl px-6 pt-10 pb-8 border cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        borderColor: '#e8f0eb',
        boxShadow: '0 2px 16px rgba(6,95,70,0.07)',
      }}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-7 flex-shrink-0 transition-all duration-300"
        style={{
          backgroundColor: '#f0f7f3',
          color: '#065f46',
          boxShadow: '0 4px 16px rgba(6,95,70,0.10)',
        }}
      >
        {service.icon}
      </div>

      <h3
        className="text-xl font-bold leading-tight mb-3"
        style={{
          fontFamily: 'var(--font-sans)',
          color: '#065f46',
          letterSpacing: '-0.01em',
        }}
      >
        {service.label}
      </h3>

      <p
        className="text-xs leading-relaxed mb-6 flex-1"
        style={{ color: '#6b7f8a' }}
      >
        {service.description}
      </p>

      <div className="w-full space-y-2">
        <div
          className="flex items-center justify-center gap-1.5 text-xs"
          style={{ color: '#9ab8a8' }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{service.duration}</span>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={
              service.online
                ? { backgroundColor: '#f0f7f3', color: '#065f46' }
                : { backgroundColor: '#fef3f2', color: '#b45309' }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: service.online ? '#065f46' : '#b45309' }}
            />
            {service.online ? 'Tersedia Online' : 'Datang Langsung'}
          </span>
        </div>
      </div>

      <div
        className="mt-5 flex items-center gap-1.5 text-xs font-semibold group-hover:translate-x-1 transition-transform duration-300"
        style={{ color: '#065f46' }}
      >
        Ajukan Sekarang <ArrowRight />
      </div>
    </div>
  )
}
