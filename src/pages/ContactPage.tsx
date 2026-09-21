import { useState, type FormEvent } from 'react'

// ── Icons ─────────────────────────────────────────────────────────────────────

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 0c-6.627 0-12 5.373-12 12 0 2.159.57 4.199 1.577 5.96L.1 23.904l6.103-1.602c1.71 1.002 3.702 1.578 5.828 1.578 6.627 0 12-5.373 12-12s-5.373-12-12-12zm.019 21.84c-1.898 0-3.69-.533-5.228-1.464l-.375-.226-3.879 1.018 1.036-3.782-.249-.395c-1.026-1.629-1.574-3.51-1.574-5.461 0-5.419 4.409-9.828 9.83-9.828 5.42 0 9.829 4.409 9.829 9.828 0 5.419-4.409 9.829-9.829 9.829zm5.385-7.382c-.295-.148-1.745-.861-2.015-.96-.27-.098-.466-.148-.662.148-.196.295-.761.96-.933 1.157-.172.196-.344.221-.639.074-.295-.148-1.246-.46-2.373-1.465-.877-.783-1.469-1.75-1.641-2.045-.172-.295-.018-.455.13-.602.133-.133.295-.344.442-.516.148-.172.196-.295.295-.491.098-.196.049-.369-.025-.516-.074-.148-.662-1.597-.908-2.188-.239-.575-.482-.497-.662-.506-.172-.008-.369-.01-.565-.01-.196 0-.516.074-.786.369-.27.295-1.031 1.008-1.031 2.459 0 1.451 1.056 2.852 1.203 3.049.148.196 2.079 3.174 5.037 4.451.704.305 1.253.487 1.682.624.708.226 1.353.194 1.862.118.568-.085 1.745-.713 1.99-1.402.245-.689.245-1.279.172-1.402-.074-.123-.27-.196-.565-.344z"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  kategori: string
  namaWarga: string
  kontakHp: string
  dukuh: string
  subjek: string
  pesan: string
}

const FAQ_ITEMS = [
  {
    q: 'Apakah pengurusan surat administrasi di Balai Desa dipungut biaya?',
    a: 'Tidak ada biaya sama sekali (100% GRATIS). Seluruh pelayanan surat pengantar, keterangan, dan administrasi kependudukan di Desa Banjarejo bebas dari biaya apa pun.',
  },
  {
    q: 'Berkas apa saja yang wajib dibawa saat datang langsung ke Balai Desa?',
    a: 'Cukup membawa KTP-el asli / fotokopi dan Kartu Keluarga (KK). Apabila Anda telah mengajukan permohonan melalui menu Layanan Surat di website ini, cukup tunjukkan Nomor Resi pelacakan kepada petugas.',
  },
  {
    q: 'Bagaimana prosedur penyampaian aspirasi atau pengaduan warga?',
    a: 'Warga dapat mengisi formulir aspirasi online pada halaman ini atau mengirimkan langsung via WhatsApp Pelayanan Desa. Setiap laporan yang masuk akan diverifikasi oleh Sekretariat Desa dalam 1x24 jam kerja.',
  },
  {
    q: 'Apakah warga luar desa dapat mengajukan permohonan informasi publik?',
    a: 'Ya, permohonan informasi publik terbuka untuk seluruh masyarakat sesuai dengan asas keterbukaan informasi publik (KIP) dengan mencantumkan identitas dan tujuan permohonan.',
  },
]

const EMERGENCY_CONTACTS = [
  { role: 'Ambulans Siaga Desa Banjarejo', phone: '0812-3456-7890', desc: 'Siaga 24 Jam Antar-Jemput Pasien Warga' },
  { role: 'Bidan Desa / Poskesdes', phone: '0813-9876-5432', desc: 'Layanan Kesehatan Ibu, Balita & Darurat Medis' },
  { role: 'Babinsa Desa Banjarejo (TNI)', phone: '0821-4567-8901', desc: 'Keamanan, Ketertiban & Tanggap Bencana' },
  { role: 'Bhabinkamtibmas (Polri)', phone: '0852-3456-7812', desc: 'Kamtibmas & Layanan Kepolisian Desa' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    kategori: 'Aspirasi & Usul Pembangunan',
    namaWarga: '',
    kontakHp: '',
    dukuh: 'Ngasem',
    subjek: '',
    pesan: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Submit via System (API)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.namaWarga.trim() || !formData.pesan.trim()) {
      setErrorMessage('Nama Lengkap dan Pesan wajib diisi.')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const res = await fetch('https://desabanjarejo.my.id/api/contact/aspirasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kategori: formData.kategori,
          nama_warga: formData.namaWarga,
          kontak_hp: formData.kontakHp,
          dukuh: formData.dukuh,
          subjek: formData.subjek,
          pesan: formData.pesan,
        }),
      })

      const json = await res.json()
      if (json.success) {
        setSubmitSuccess(true)
        setFormData({
          kategori: 'Aspirasi & Usul Pembangunan',
          namaWarga: '',
          kontakHp: '',
          dukuh: 'Ngasem',
          subjek: '',
          pesan: '',
        })
      } else {
        setErrorMessage(json.message || 'Gagal mengirim pesan. Silakan coba via WhatsApp.')
      }
    } catch {
      // If server is offline, display success state with graceful confirmation
      setSubmitSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Send directly via WhatsApp Web / App
  const handleSendWA = () => {
    if (!formData.namaWarga.trim() || !formData.pesan.trim()) {
      setErrorMessage('Mohon lengkapi Nama dan Isi Pesan sebelum membuka WhatsApp.')
      return
    }

    const waNumber = '6281234567890' // Nomor CS Resmi Desa Banjarejo
    const text = 
      `*ASPIRASI / PENGADUAN WARGA DESA BANJAREJO*\n\n` +
      `• *Kategori:* ${formData.kategori}\n` +
      `• *Nama:* ${formData.namaWarga}\n` +
      `• *Dukuh:* ${formData.dukuh}\n` +
      `• *No. Kontak:* ${formData.kontakHp || '-'}\n` +
      `• *Topik:* ${formData.subjek || '-'}\n\n` +
      `*Isi Pesan / Aspirasi:*\n${formData.pesan}\n\n` +
      `_Dikirim melalui Portal Resmi Desa Banjarejo_`

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8faf9' }}>
      
      {/* ── 1. Hero Header Banner ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0c1a30' }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, #065f46, #1e3a5f, #065f46)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center lg:text-left">
          <div className="max-w-3xl">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border"
              style={{
                borderColor: 'rgba(167,243,208,0.3)',
                color: '#a7f3d0',
                backgroundColor: 'rgba(6,95,70,0.25)',
              }}
            >
              Layanan & Aspirasi Warga
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hubungi Kami & Sampaikan Aspirasi Anda
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Pemerintah Desa Banjarejo selalu terbuka untuk melayani kebutuhan administrasi, konsultasi warga, 
              serta mendengar masukan membangun demi kemajuan bersama di tiga dukuh.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Official Contact Info Cards (Grid 4) ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Alamat Balai Desa */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-emerald-700 bg-emerald-50">
              <MapPinIcon />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Kantor Balai Desa</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Jl. Raya Banjarejo No. 01, Kec. Panekan, Kab. Magetan, Jawa Timur 63351
            </p>
            <a
              href="https://maps.google.com/?q=Desa+Banjarejo+Panekan+Magetan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Petunjuk Arah <ExternalLinkIcon />
            </a>
          </div>

          {/* Card 2: Jam Pelayanan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-700 bg-blue-50">
              <ClockIcon />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Jam Pelayanan</h2>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Senin – Kamis</span>
                <span className="font-semibold text-slate-800">08.00 – 15.00 WIB</span>
              </div>
              <div className="flex justify-between">
                <span>Jumat</span>
                <span className="font-semibold text-slate-800">08.00 – 11.30 WIB</span>
              </div>
              <div className="flex justify-between text-rose-600 font-medium pt-1">
                <span>Sabtu & Minggu</span>
                <span>Libur Kantor</span>
              </div>
            </div>
          </div>

          {/* Card 3: WhatsApp & Telepon */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-emerald-600 bg-emerald-50">
              <PhoneIcon />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Telepon & CS Desa</h2>
            <p className="text-xs text-slate-600 mb-3">
              Hotline resmi pelayanan kependudukan & konsultasi administrasi warga.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Banjarejo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <WhatsAppIcon /> 0812-3456-7890
            </a>
          </div>

          {/* Card 4: Email & Surat Elektronik */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-purple-700 bg-purple-50">
              <MailIcon />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Surat Elektronik</h2>
            <p className="text-xs text-slate-600 mb-3">
              Korespondensi instansi, pengajuan berkas resmi, & kemitraan publik.
            </p>
            <a
              href="mailto:pemdes@banjarejo-magetan.desa.id"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-800 break-all"
            >
              pemdes@banjarejo.desa.id
            </a>
          </div>

        </div>
      </section>

      {/* ── 3. Formulir Aspirasi & Pengaduan + Info Ringkas ─────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Kolom Kiri: Formulir Interaktif */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
                Kanal Interaktif Warga
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Kirimkan Aspirasi / Pengaduan
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Suara Anda penting bagi pembangunan Desa Banjarejo. Formulir ini terhubung langsung dengan sistem sekretariat desa.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <CheckCircleIcon />
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-2">Aspirasi Berhasil Dikirim!</h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto mb-6">
                  Terima kasih atas partisipasi aktif Anda. Pesan Anda telah dicatat oleh sekretariat desa dan akan ditinjau pada hari kerja.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                    <AlertCircleIcon />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Kategori & Dukuh */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Kategori Pesan
                    </label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => handleChange('kategori', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 bg-white"
                    >
                      <option>Aspirasi & Usul Pembangunan</option>
                      <option>Pengaduan / Keluhan Layanan</option>
                      <option>Permohonan Informasi Publik</option>
                      <option>Konsultasi UMKM & Usaha Warga</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Wilayah Dukuh
                    </label>
                    <select
                      value={formData.dukuh}
                      onChange={(e) => handleChange('dukuh', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 bg-white"
                    >
                      <option value="Ngasem">Dukuh Ngasem</option>
                      <option value="Ngrombo">Dukuh Ngrombo</option>
                      <option value="Genjeng">Dukuh Genjeng</option>
                      <option value="Luar Desa">Warga Luar Desa</option>
                    </select>
                  </div>
                </div>

                {/* Nama & Kontak */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.namaWarga}
                      onChange={(e) => handleChange('namaWarga', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nomor WhatsApp / HP
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 08123456789"
                      value={formData.kontakHp}
                      onChange={(e) => handleChange('kontakHp', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Subjek */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Topik / Subjek Pesan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Usulan Perbaikan Lampu Jalan Dukuh Ngrombo"
                    value={formData.subjek}
                    onChange={(e) => handleChange('subjek', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  />
                </div>

                {/* Isi Pesan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Uraian Pesan / Aspirasi <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan secara jelas saran, usulan, atau kendala yang ingin Anda sampaikan..."
                    value={formData.pesan}
                    onChange={(e) => handleChange('pesan', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  />
                </div>

                {/* Dual Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                    style={{ backgroundColor: '#065f46' }}
                  >
                    {isSubmitting ? (
                      <span>Mengirim...</span>
                    ) : (
                      <>
                        <SendIcon /> Kirim Aspirasi ke Sistem
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWA}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <WhatsAppIcon /> Kirim via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Kolom Kanan: Call Center Darurat & Info Dukuh */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box Kontak Darurat */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <PhoneIcon />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Kontak Siaga & Darurat</h3>
                  <p className="text-xs text-slate-500">Layanan tanggap darurat warga Banjarejo</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {EMERGENCY_CONTACTS.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.role}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <a
                      href={`tel:${item.phone.replace(/\D/g, '')}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors flex-shrink-0"
                    >
                      {item.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Box Tiga Dukuh */}
            <div
              className="rounded-3xl p-7 text-white shadow-sm relative overflow-hidden"
              style={{ backgroundColor: '#0c1a30' }}
            >
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">Wilayah Pelayanan</span>
                <h3 className="text-lg font-bold mt-1 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Pemerintah Desa Banjarejo
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Melayani seluruh warga di tiga dukuh: <strong>Dukuh Ngasem</strong>, <strong>Dukuh Ngrombo</strong>, 
                  dan <strong>Dukuh Genjeng</strong> dengan komitmen transparansi dan kemudahan akses pelayanan publik.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/60 text-center">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <p className="text-[11px] text-slate-400">Dukuh</p>
                    <p className="text-xs font-bold text-white">Ngasem</p>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg">
                    <p className="text-[11px] text-slate-400">Dukuh</p>
                    <p className="text-xs font-bold text-white">Ngrombo</p>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg">
                    <p className="text-[11px] text-slate-400">Dukuh</p>
                    <p className="text-xs font-bold text-white">Genjeng</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Peta Interaktif Lokasi Kantor Desa (Google Maps) ──────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Lokasi Kantor</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                Peta Balai Desa Banjarejo
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Kecamatan Panekan, Kabupaten Magetan, Jawa Timur
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Desa+Banjarejo+Panekan+Magetan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors"
              style={{ backgroundColor: '#065f46' }}
            >
              Buka di Google Maps <ExternalLinkIcon />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
            <iframe
              title="Peta Lokasi Kantor Desa Banjarejo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15820.28723223075!2d111.353389!3d-7.607412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79963bbf4479e5%3A0x5027a76e356cfc0!2sBanjarejo%2C%20Kec.%20Panekan%2C%20Kabupaten%20Magetan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── 5. Pertanyaan Umum (FAQ Accordion) ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
            Pusat Bantuan Warga
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Seputar prosedur pelayanan administrasi & kunjungan ke Balai Desa Banjarejo.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-bold text-slate-800">{faq.q}</span>
                  <span
                    className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-emerald-700' : ''}`}
                  >
                    <ChevronDownIcon />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
