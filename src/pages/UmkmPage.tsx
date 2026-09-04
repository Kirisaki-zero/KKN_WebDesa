import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'umkm' | 'bumdes' | 'kopdes'

interface Business {
  id: number
  name: string
  category: string
  description: string
  location: string
  dukuh: string
  whatsapp: string
  instagram: string
  thumbnail: string
  owner: string
  since: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const businesses: Business[] = [
  {
    id: 1,
    name: 'Kerupuk Puli',
    category: 'Produk Olahan',
    description: 'Kerupuk puli tradisional berbahan singkong pilihan, diproses secara higienis oleh keluarga Pak Slamet sejak tiga generasi. Dipasarkan ke seluruh Kabupaten Magetan.',
    location: 'Dukuh Ngasem',
    dukuh: 'Ngasem',
    whatsapp: '6281234567801',
    instagram: 'kerupukpuli_banjarejo',
    thumbnail: 'https://images.unsplash.com/photo-1604908177524-83cf2e3e7c34?w=600&h=340&fit=crop&auto=format',
    owner: 'Slamet Riyadi',
    since: '1987',
  },
  {
    id: 2,
    name: 'Keripik Tempe',
    category: 'Produk Olahan',
    description: 'Keripik tempe renyah berbumbu rempah khas Jawa Timur. Diproduksi dari kedelai lokal non-GMO, tanpa pengawet, tersedia dalam kemasan 100g, 250g, dan 500g.',
    location: 'Dukuh Ngrombo',
    dukuh: 'Ngrombo',
    whatsapp: '6281234567802',
    instagram: 'keripiktempe_ngrombo',
    thumbnail: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=340&fit=crop&auto=format',
    owner: 'Dewi Rahayu',
    since: '2015',
  },
  {
    id: 3,
    name: 'Peternakan Ayam Petelur',
    category: 'Peternakan',
    description: 'Usaha ternak ayam petelur modern kapasitas 800 ekor. Telur segar didistribusikan harian ke pasar Panekan dan Magetan kota. Pembelian partai besar tersedia.',
    location: 'Dukuh Genjeng',
    dukuh: 'Genjeng',
    whatsapp: '6281234567803',
    instagram: 'peternakanbanjarejo',
    thumbnail: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=340&fit=crop&auto=format',
    owner: 'Agus Wibowo',
    since: '2018',
  },
  {
    id: 4,
    name: 'Jamu Tradisional Mbok Inem',
    category: 'Minuman Herbal',
    description: 'Jamu gendong dan kemasan dari rempah-rempah pilihan: beras kencur, kunyit asam, dan jahe merah. Resep turun-temurun, tersedia grosir untuk warung dan apotek.',
    location: 'Dukuh Ngasem',
    dukuh: 'Ngasem',
    whatsapp: '6281234567804',
    instagram: 'jamu_mbokinem',
    thumbnail: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=340&fit=crop&auto=format',
    owner: 'Suparinem',
    since: '2005',
  },
  {
    id: 5,
    name: 'Kerajinan Bambu Genjeng',
    category: 'Kerajinan Tangan',
    description: 'Anyaman bambu berkualitas tinggi: tampah, bakul, caping, dan furnitur dekorasi. Menerima pesanan custom untuk souvenir pernikahan dan oleh-oleh khas Magetan.',
    location: 'Dukuh Genjeng',
    dukuh: 'Genjeng',
    whatsapp: '6281234567805',
    instagram: 'bambu_genjeng',
    thumbnail: 'https://images.unsplash.com/photo-1587160688793-e5d7d2e4e234?w=600&h=340&fit=crop&auto=format',
    owner: 'Poniman Susanto',
    since: '2010',
  },
  {
    id: 6,
    name: 'Budidaya Lele Organik',
    category: 'Perikanan',
    description: 'Kolam lele organik sistem bioflok dengan kapasitas panen 2 ton per siklus. Benih dan pakan alami diproduksi sendiri. Siap mitra dengan rumah makan dan pengepul.',
    location: 'Dukuh Ngrombo',
    dukuh: 'Ngrombo',
    whatsapp: '6281234567806',
    instagram: 'lelebanjarejo',
    thumbnail: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&h=340&fit=crop&auto=format',
    owner: 'Yanto Prasetyo',
    since: '2021',
  },
]

// (bumdesUnits removed — BUM Desa now only operates Simpan Pinjam)

// ── Icons ─────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.77.465 3.435 1.28 4.887L2 22l5.25-1.378A9.954 9.954 0 0 0 12.004 22C17.531 22 22 17.523 22 12.004 22 6.477 17.531 2 12.004 2z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

// ── Business Card ─────────────────────────────────────────────────────────────

function BusinessCard({ biz }: { biz: Business }) {
  const [playing, setPlaying] = useState(false)

  return (
    <article
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ borderColor: '#e8f0eb', boxShadow: '0 2px 16px rgba(6,95,70,0.07)' }}
    >
      {/* ── Video placeholder ── */}
      <div
        className="relative overflow-hidden flex-shrink-0 cursor-pointer"
        style={{ height: '200px', backgroundColor: '#0c1a30' }}
        onClick={() => setPlaying(true)}
      >
        <img
          src={biz.thumbnail}
          alt={biz.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: playing ? 'brightness(1)' : 'brightness(0.75)' }}
          loading="lazy"
        />

        {/* Category chip */}
        <span
          className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: 'rgba(6,95,70,0.85)', color: '#fff', backdropFilter: 'blur(4px)' }}
        >
          {biz.category}
        </span>

        {/* YouTube-style play button */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: '#ff0000', boxShadow: '0 4px 20px rgba(255,0,0,0.45)', paddingLeft: '4px' }}
            >
              <PlayIcon />
            </div>
          </div>
        )}

        {/* YouTube branding strip */}
        {!playing && (
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex items-center gap-1.5"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
          >
            <svg width="14" height="10" viewBox="0 0 90 63" fill="#ff0000">
              <path d="M88.2 9.8C87.1 5.7 84 2.5 80 1.4 73 0 45 0 45 0S17 0 10 1.4C6 2.5 2.9 5.7 1.8 9.8 0 16.8 0 31.5 0 31.5s0 14.7 1.8 21.7c1.1 4.1 4.2 7.3 8.2 8.4C17 63 45 63 45 63s28 0 35-1.4c4-1.1 7.1-4.3 8.2-8.4 1.8-7 1.8-21.7 1.8-21.7s0-14.7-1.8-21.7z"/>
              <path d="M36 45L59 31.5 36 18z" fill="#fff"/>
            </svg>
            <span className="text-xs text-white font-medium opacity-80">Profil Video UMKM</span>
          </div>
        )}

        {/* Playing state — show embedded YouTube (demo) */}
        {playing && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">▶</div>
              <p className="text-xs opacity-60">Video profil usaha</p>
              <button
                className="mt-3 text-xs underline opacity-50 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setPlaying(false) }}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Owner + since */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #065f46, #0a7c5c)' }}
          >
            {biz.owner.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-xs font-semibold leading-none" style={{ color: '#0c1a30' }}>{biz.owner}</p>
            <div className="flex items-center gap-1 mt-0.5" style={{ color: '#9ab8a8' }}>
              <CalendarIcon />
              <span className="text-xs">Sejak {biz.since}</span>
            </div>
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-xl font-bold leading-snug mb-2"
          style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
        >
          {biz.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{
            color: '#6b7f8a',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {biz.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-5" style={{ color: '#9ab8a8' }}>
          <PinIcon />
          <span className="text-xs font-medium">{biz.location}, Desa Banjarejo</span>
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-auto">
          <a
            href={`https://wa.me/${biz.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ backgroundColor: '#25d366' }}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          <a
            href={`https://instagram.com/${biz.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 transition-all duration-200 hover:border-pink-400 hover:text-pink-500 flex-shrink-0"
            style={{ borderColor: '#e8f0eb', color: '#6b7f8a' }}
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </article>
  )
}

// ── Registration modal ────────────────────────────────────────────────────────

type JenisLayanan = 'simpanan' | 'pinjaman' | ''
interface RegForm {
  nama: string; nik: string; hp: string; dukuh: string
  jenis: JenisLayanan; jumlah: string; tujuan: string
}
const emptyForm: RegForm = { nama: '', nik: '', hp: '', dukuh: '', jenis: '', jumlah: '', tujuan: '' }

function RegistrationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RegForm>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<RegForm>>({})

  const set = (k: keyof RegForm, v: string) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Partial<RegForm> = {}
    if (!form.nama.trim()) e.nama = 'Wajib diisi'
    if (!/^\d{16}$/.test(form.nik)) e.nik = 'NIK harus 16 digit'
    if (!/^\d{9,13}$/.test(form.hp.replace(/\D/g, ''))) e.hp = 'Nomor tidak valid'
    if (!form.dukuh) e.dukuh = 'Pilih dukuh'
    if (!form.jenis) e.jenis = 'Pilih jenis layanan'
    if (form.jenis === 'pinjaman' && !form.jumlah.trim()) e.jumlah = 'Wajib diisi'
    if (form.jenis === 'pinjaman' && !form.tujuan.trim()) e.tujuan = 'Wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) setSubmitted(true) }

  const fieldStyle = (k: keyof RegForm): React.CSSProperties => ({
    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem',
    fontSize: '0.875rem', outline: 'none', transition: 'box-shadow 0.2s',
    border: `1.5px solid ${errors[k] ? '#f87171' : '#d4e4d8'}`,
    boxShadow: errors[k] ? '0 0 0 3px rgba(248,113,113,0.12)' : undefined,
    backgroundColor: '#fff',
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(7,15,30,0.6)', backdropFilter: 'blur(5px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full bg-white rounded-2xl overflow-hidden"
        style={{ maxWidth: '500px', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(7,15,30,0.3)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b" style={{ borderColor: '#e8f0eb' }}>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#065f46' }}>BUM Desa Banjarejo</p>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>Pendaftaran Awal</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" style={{ color: '#9ca3af' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {submitted ? (
          /* Success */
          <div className="flex flex-col items-center text-center px-8 py-14">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#f0f7f3' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>Pendaftaran Diterima</h4>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7f8a' }}>
              Terima kasih, <strong style={{ color: '#0c1a30' }}>{form.nama}</strong>. Pengurus BUM Desa akan menghubungi Anda melalui WhatsApp dalam 1–2 hari kerja untuk konfirmasi dan tahap selanjutnya.
            </p>
            <div className="w-full rounded-xl px-5 py-4 text-left mb-6 text-sm space-y-1" style={{ backgroundColor: '#f8faf9', border: '1px solid #e8f0eb' }}>
              <p className="font-semibold mb-2" style={{ color: '#0c1a30' }}>Ringkasan</p>
              <p style={{ color: '#6b7f8a' }}>Nama: <span className="font-medium" style={{ color: '#0c1a30' }}>{form.nama}</span></p>
              <p style={{ color: '#6b7f8a' }}>Dukuh: <span className="font-medium" style={{ color: '#0c1a30' }}>{form.dukuh}</span></p>
              <p style={{ color: '#6b7f8a' }}>Layanan: <span className="font-medium capitalize" style={{ color: '#065f46' }}>{form.jenis}</span></p>
              {form.jenis === 'pinjaman' && <p style={{ color: '#6b7f8a' }}>Jumlah: <span className="font-medium" style={{ color: '#0c1a30' }}>Rp {form.jumlah}</span></p>}
            </div>
            <button onClick={onClose} className="px-8 py-3 rounded-xl text-sm font-bold text-white cursor-pointer hover:brightness-110 transition-all" style={{ backgroundColor: '#065f46' }}>Selesai</button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

            {/* Nama */}
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Nama Lengkap <span style={{ color: '#f87171' }}>*</span></label>
              <input type="text" placeholder="Sesuai KTP" value={form.nama} onChange={e => set('nama', e.target.value)} style={fieldStyle('nama')} />
              {errors.nama && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.nama}</p>}
            </div>

            {/* NIK + HP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>NIK <span style={{ color: '#f87171' }}>*</span></label>
                <input type="text" inputMode="numeric" maxLength={16} placeholder="16 digit" value={form.nik} onChange={e => set('nik', e.target.value.replace(/\D/g, ''))} style={fieldStyle('nik')} />
                {errors.nik && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.nik}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>No. WhatsApp <span style={{ color: '#f87171' }}>*</span></label>
                <input type="tel" placeholder="08xxxxxxxxxx" value={form.hp} onChange={e => set('hp', e.target.value)} style={fieldStyle('hp')} />
                {errors.hp && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.hp}</p>}
              </div>
            </div>

            {/* Dukuh */}
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Dukuh <span style={{ color: '#f87171' }}>*</span></label>
              <select value={form.dukuh} onChange={e => set('dukuh', e.target.value)} style={fieldStyle('dukuh')}>
                <option value="">-- Pilih Dukuh --</option>
                <option>Dukuh Ngasem</option>
                <option>Dukuh Ngrombo</option>
                <option>Dukuh Genjeng</option>
              </select>
              {errors.dukuh && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.dukuh}</p>}
            </div>

            {/* Jenis layanan */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: '#374151' }}>Jenis Layanan <span style={{ color: '#f87171' }}>*</span></label>
              <div className="grid grid-cols-2 gap-3">
                {(['simpanan', 'pinjaman'] as JenisLayanan[]).map(j => (
                  <label
                    key={j}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200"
                    style={{ borderColor: form.jenis === j ? '#065f46' : '#d4e4d8', backgroundColor: form.jenis === j ? '#f0f7f3' : '#fff', boxShadow: form.jenis === j ? '0 0 0 2px rgba(6,95,70,0.18)' : undefined }}
                  >
                    <input type="radio" name="jenis" value={j} checked={form.jenis === j} onChange={() => set('jenis', j)} className="sr-only" />
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: form.jenis === j ? '#065f46' : '#d4e4d8' }}>
                      {form.jenis === j && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#065f46' }} />}
                    </div>
                    <span className="text-sm font-semibold capitalize" style={{ color: form.jenis === j ? '#065f46' : '#6b7f8a' }}>
                      {j === 'simpanan' ? '💰 Simpanan' : '📋 Pinjaman'}
                    </span>
                  </label>
                ))}
              </div>
              {errors.jenis && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.jenis}</p>}
            </div>

            {/* Pinjaman fields */}
            {form.jenis === 'pinjaman' && (
              <>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Jumlah Pinjaman (Rp) <span style={{ color: '#f87171' }}>*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold pointer-events-none" style={{ color: '#9ab8a8' }}>Rp</span>
                    <input type="text" inputMode="numeric" placeholder="Maks. 5.000.000" value={form.jumlah} onChange={e => set('jumlah', e.target.value)} style={{ ...fieldStyle('jumlah'), paddingLeft: '2.5rem' }} />
                  </div>
                  {errors.jumlah && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.jumlah}</p>}
                  <p className="text-xs mt-1" style={{ color: '#9ab8a8' }}>Maksimum Rp 5.000.000 per pengajuan</p>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Tujuan Penggunaan Dana <span style={{ color: '#f87171' }}>*</span></label>
                  <textarea rows={3} placeholder="Contoh: modal usaha keripik tempe, pembelian bibit, dll." value={form.tujuan} onChange={e => set('tujuan', e.target.value)} style={{ ...fieldStyle('tujuan'), resize: 'none' }} />
                  {errors.tujuan && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.tujuan}</p>}
                </div>
              </>
            )}

            {/* Privacy note */}
            <div className="flex gap-2.5 px-4 py-3 rounded-xl text-xs leading-relaxed" style={{ backgroundColor: '#f0f7f3', color: '#4a6475' }}>
              <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              Data Anda digunakan hanya untuk administrasi BUM Desa Banjarejo dan tidak disebarkan kepada pihak ketiga.
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all duration-200" style={{ backgroundColor: '#065f46', boxShadow: '0 4px 16px rgba(6,95,70,0.25)' }}>
              Kirim Pendaftaran
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ── BUM Desa Tab ──────────────────────────────────────────────────────────────

function BumDesaContent() {
  const [playing, setPlaying] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="max-w-5xl mx-auto">

      {modalOpen && <RegistrationModal onClose={() => setModalOpen(false)} />}

      {/* ── Wide featured card ─────────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: '#dde8e2', backgroundColor: '#fff', boxShadow: '0 8px 48px rgba(6,95,70,0.10), 0 2px 8px rgba(6,95,70,0.05)' }}
      >
        <div className="flex flex-col lg:flex-row">

          {/* Left: video / photo placeholder */}
          <div
            className="relative flex-shrink-0 overflow-hidden cursor-pointer"
            style={{ minHeight: '300px', backgroundColor: '#0c1a30' }}
            onClick={() => setPlaying(v => !v)}
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format"
              alt="BUM Desa Banjarejo"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.8)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(7,15,30,0.1) 0%, rgba(7,15,30,0.55) 100%)' }} aria-hidden="true" />
            <div className="absolute top-5 left-5">
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full inline-block" style={{ backgroundColor: 'rgba(6,95,70,0.85)', color: '#a7f3d0', backdropFilter: 'blur(6px)' }}>
                Badan Usaha Milik Desa
              </span>
            </div>
            {!playing ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110" style={{ backgroundColor: 'rgba(6,95,70,0.85)', backdropFilter: 'blur(8px)', paddingLeft: '4px', boxShadow: '0 4px 24px rgba(6,95,70,0.5)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3">
                <p className="text-white text-sm opacity-60">Video profil BUM Desa</p>
                <button className="text-xs text-white/40 underline cursor-pointer" onClick={e => { e.stopPropagation(); setPlaying(false) }}>Tutup</button>
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="flex flex-col justify-between p-8 lg:p-10 flex-1">
            <div>
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold mb-1 leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>
                BUM Desa Banjarejo
              </h2>
              <div className="flex items-center gap-3 mt-3 mb-6">
                <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: '#065f46' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#9ab8a8' }}>Perdes No. 4 Tahun 2019</span>
              </div>

              {/* Unit label */}
              <p className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-sans)', color: '#065f46' }}>
                Unit Usaha Simpan Pinjam
              </p>

              {/* Description */}
              <p className="text-base leading-relaxed mb-7" style={{ color: '#4a6475' }}>
                Melayani fasilitas simpanan warga dan pinjaman modal untuk mendukung perekonomian UMKM Desa Banjarejo.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pb-6 mb-6" style={{ borderBottom: '1px solid #e8f0eb' }}>
                {[{ value: '60', label: 'Anggota Aktif' }, { value: 'Rp 5 Jt', label: 'Maks. Pinjaman' }, { value: '2019', label: 'Tahun Berdiri' }].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold leading-none mb-0.5" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>{s.value}</p>
                    <p className="text-xs" style={{ color: '#9ab8a8' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Operational info */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span className="text-sm" style={{ color: '#4a6475' }}>
                    <span className="font-semibold" style={{ color: '#0c1a30' }}>Jam Pelayanan: </span>Senin – Jumat, 08.00 – 14.00 WIB
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span className="text-sm" style={{ color: '#4a6475' }}>Kantor Desa Banjarejo, Kec. Panekan, Kab. Magetan</span>
                </div>
              </div>
            </div>

            {/* Two action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] cursor-pointer"
                style={{ backgroundColor: '#065f46', boxShadow: '0 4px 16px rgba(6,95,70,0.28)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Pendaftaran Awal
              </button>
              <a
                href="#"
                download
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold border-2 transition-all duration-200 hover:bg-emerald-50 cursor-pointer"
                style={{ borderColor: '#065f46', color: '#065f46' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Unduh Formulir (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <p className="text-center text-xs mt-8 leading-relaxed" style={{ color: '#b0c4ba' }}>
        BUM Desa Banjarejo diawasi oleh Pemerintah Desa Banjarejo dan Badan Permusyawaratan Desa (BPD).
        <br />Laporan keuangan dipublikasikan setiap semester secara transparan kepada warga.
      </p>
    </div>
  )
}

// ── Kopdes Tab (Coming Soon) ──────────────────────────────────────────────────

function KopdesContent() {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6"
        style={{ backgroundColor: '#f0f7f3' }}
      >
        🏪
      </div>
      <span
        className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
        style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
      >
        Segera Hadir
      </span>
      <h2
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
      >
        Kopdes Merah Putih
      </h2>
      <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: '#6b7f8a' }}>
        Koperasi Desa Merah Putih Banjarejo sedang dalam tahap persiapan dan pendaftaran anggota.
        Program nasional ini akan menghadirkan koperasi modern untuk menopang ketahanan ekonomi
        seluruh warga desa.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { icon: '📋', label: 'Pendaftaran Anggota', sub: 'Agustus – Oktober 2026' },
          { icon: '🏛️', label: 'Legalitas & SK', sub: 'November 2026' },
          { icon: '🚀', label: 'Operasional Perdana', sub: 'Januari 2027' },
        ].map((step) => (
          <div
            key={step.label}
            className="flex flex-col items-center px-6 py-5 rounded-xl border text-center"
            style={{ borderColor: '#e8f0eb', minWidth: '140px' }}
          >
            <span className="text-3xl mb-2">{step.icon}</span>
            <p className="text-xs font-bold mb-1" style={{ color: '#0c1a30' }}>{step.label}</p>
            <p className="text-xs" style={{ color: '#9ab8a8' }}>{step.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UmkmPage() {
  const [activeTab, setActiveTab] = useState<Tab>('umkm')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'umkm', label: 'UMKM Warga' },
    { id: 'bumdes', label: 'BUM Desa' },
    { id: 'kopdes', label: 'Kopdes Merah Putih (Segera Hadir)' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8faf9' }}>

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#0c1a30' }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #065f46, #1e3a5f)' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(167,243,208,0.3)', color: '#a7f3d0', backgroundColor: 'rgba(6,95,70,0.25)' }}
          >
            Ekonomi Desa
          </span>
          <h1
            className="text-3xl lg:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Potensi Ekonomi &amp; UMKM Desa Banjarejo
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Menampilkan pelaku usaha lokal yang menjadi tulang punggung perekonomian Desa Banjarejo.
          </p>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b" style={{ borderColor: '#e8f0eb' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-wrap items-center gap-8">
            {[
              { value: '6+', label: 'UMKM Terdaftar' },
              { value: '3', label: 'Dukuh Aktif Usaha' },
              { value: 'Rp 95 Jt', label: 'Omzet BUMDes S1 2026' },
              { value: '60', label: 'Anggota Koperasi' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-xl font-bold" style={{ color: '#065f46', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                <span className="text-sm" style={{ color: '#6b7f8a' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">

        {/* ── Category Tabs ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-10" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const isKopdes = tab.id === 'kopdes'
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2"
                style={
                  isActive
                    ? { backgroundColor: '#065f46', color: '#fff', boxShadow: '0 4px 14px rgba(6,95,70,0.3)' }
                    : { backgroundColor: '#fff', color: '#4a6475', border: '1px solid #d4e4d8' }
                }
              >
                {tab.label}
                {isKopdes && (
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#fef3c7', color: isActive ? '#fff' : '#92400e' }}
                  >
                    Baru
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────────── */}
        {activeTab === 'umkm' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm" style={{ color: '#9ab8a8' }}>
                Menampilkan <span className="font-semibold" style={{ color: '#065f46' }}>{businesses.length}</span> usaha
              </p>
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ backgroundColor: '#f0f7f3', color: '#065f46' }}
              >
                Tiga Dukuh: Ngasem · Ngrombo · Genjeng
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {businesses.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </div>
            {/* CTA to register */}
            <div
              className="mt-12 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ backgroundColor: '#f0f7f3', border: '1px solid #d4e4d8' }}
            >
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
                >
                  Punya usaha di Desa Banjarejo?
                </h3>
                <p className="text-sm" style={{ color: '#6b7f8a' }}>
                  Daftarkan UMKM Anda agar tampil di direktori ini dan jangkau lebih banyak pelanggan.
                </p>
              </div>
              <a
                href="https://wa.me/6281234567800"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: '#065f46' }}
              >
                <WhatsAppIcon />
                Daftarkan Usaha
              </a>
            </div>
          </div>
        )}

        {activeTab === 'bumdes' && <BumDesaContent />}
        {activeTab === 'kopdes' && <KopdesContent />}
      </div>
    </div>
  )
}
