import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'umkm' | 'bumdes'

interface Business {
  id: number
  name: string
  category: string
  description: string
  location: string
  dukuh: string
  instagram: string
  thumbnail: string
  owner: string
  since: string
  mapsUrl?: string
  fullStory?: string
  products?: string[]
  priceRange?: string
  operatingHours?: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const businesses: Business[] = [
  {
    id: 1,
    name: 'Kerupuk Puli Tradisional',
    category: 'Produk Olahan',
    description: 'Kerupuk puli tradisional berbahan singkong pilihan, diproses secara higienis oleh keluarga Pak Slamet sejak tiga generasi. Renyah gurih alami dan dipasarkan ke seluruh Kabupaten Magetan.',
    location: 'Dukuh Ngasem',
    dukuh: 'Ngasem',
    instagram: 'kerupukpuli_banjarejo',
    thumbnail: 'https://images.unsplash.com/photo-1604908177524-83cf2e3e7c34?w=600&h=340&fit=crop&auto=format',
    owner: 'Slamet Riyadi',
    since: '1987',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dukuh+Ngasem+Desa+Banjarejo+Panekan+Magetan',
    priceRange: 'Rp 8.000 - Rp 25.000',
    operatingHours: 'Setiap Hari, 07.00 - 17.00 WIB',
    products: ['Kerupuk Puli Bawang Mentah', 'Kerupuk Puli Matang Siap Santap', 'Paket Oleh-oleh Khas Banjarejo'],
    fullStory: 'Usaha Kerupuk Puli Pak Slamet merupakan salah satu warisan kuliner kebanggaan Dukuh Ngasem yang telah bertahan selama tiga generasi. Berawal dari produksi rumahan skala kecil menggunakan tungku kayu bakar, kini telah mengadopsi standar pengeringan higienis dengan bahan baku singkong pilihan dari petani lokal Desa Banjarejo tanpa bahan pengawet sintetis.'
  },
  {
    id: 2,
    name: 'Keripik Tempe Renyah',
    category: 'Produk Olahan',
    description: 'Keripik tempe renyah berbumbu rempah ketumbar dan daun jeruk khas Jawa Timur. Diproduksi dari kedelai lokal non-GMO, tanpa pengawet, dengan irisan super tipis.',
    location: 'Dukuh Ngrombo',
    dukuh: 'Ngrombo',
    instagram: 'keripiktempe_ngrombo',
    thumbnail: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=340&fit=crop&auto=format',
    owner: 'Dewi Rahayu',
    since: '2015',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dukuh+Ngrombo+Desa+Banjarejo+Panekan+Magetan',
    priceRange: 'Rp 10.000 - Rp 35.000',
    operatingHours: 'Senin - Sabtu, 08.00 - 16.00 WIB',
    products: ['Keripik Tempe Gurih Daun Jeruk', 'Keripik Tempe Pedas Manis', 'Kemasan Pouch 250g & 500g'],
    fullStory: 'Keripik Tempe Bu Dewi diolah dari kedelai pilihan dengan irisan super tipis dan racikan rempah ketumbar serta daun jeruk khas Jawa Timur. Menghasilkan tekstur yang sangat renyah, gurih tahan lama tanpa pengawet sintetis. Cocok dijadikan lauk harian maupun camilan santai keluarga.'
  },
  {
    id: 3,
    name: 'Peternakan Ayam Petelur Barokah',
    category: 'Peternakan',
    description: 'Usaha ternak ayam petelur modern kapasitas 800 ekor. Telur segar berbutir cokelat bersih didistribusikan harian ke pasar Panekan dan Magetan kota. Pembelian partai besar tersedia.',
    location: 'Dukuh Genjeng',
    dukuh: 'Genjeng',
    instagram: 'peternakanbanjarejo',
    thumbnail: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=340&fit=crop&auto=format',
    owner: 'Agus Wibowo',
    since: '2018',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dukuh+Genjeng+Desa+Banjarejo+Panekan+Magetan',
    priceRange: 'Sesuai Harga Pasar Harian (Per Kg / Krat)',
    operatingHours: 'Setiap Hari, 06.00 - 18.00 WIB',
    products: ['Telur Ayam Segar Harian Grade A', 'Pemesanan Grosir & Eceran', 'Pupuk Organik Fermentasi Kotoran Ayam'],
    fullStory: 'Peternakan ayam ras petelur yang dikelola Pak Agus di Dukuh Genjeng menerapkan sistem sanitasi kandang modern dengan sirkulasi udara optimal dan pakan berkualitas seimbang. Menghasilkan telur ayam bersih, berkerabang tebal, segar setiap pagi, bebas residu antibiotik berbahaya.'
  },
  {
    id: 4,
    name: 'Jamu Tradisional Mbok Inem',
    category: 'Minuman Herbal',
    description: 'Jamu racikan rempah-rempah alami pilihan: beras kencur, kunyit asam, dan jahe merah. Resep turun-temurun berkhasiat menjaga imunitas dan kebugaran tubuh.',
    location: 'Dukuh Ngasem',
    dukuh: 'Ngasem',
    instagram: 'jamu_mbokinem',
    thumbnail: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=340&fit=crop&auto=format',
    owner: 'Suparinem',
    since: '2005',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dukuh+Ngasem+Desa+Banjarejo+Panekan+Magetan',
    priceRange: 'Rp 5.000 - Rp 20.000',
    operatingHours: 'Setiap Hari, 05.30 - 12.00 WIB',
    products: ['Beras Kencur Segar Botol', 'Kunyit Asam Sirih', 'Wedang Jahe Merah Instan'],
    fullStory: 'Mbok Inem telah melayani racikan jamu tradisional sejak tahun 2005 di Dukuh Ngasem. Menggunakan 100% rimpang segar yang ditanam langsung di pekarangan desa tanpa pemanis atau perisa buatan, menjaga kebugaran warga secara sehat dan alami.'
  },
  {
    id: 5,
    name: 'Kerajinan Anyaman Bambu Genjeng',
    category: 'Kerajinan Tangan',
    description: 'Anyaman bambu apus berkualitas tinggi: tampah, bakul, caping petani, dan dekorasi interior. Menerima pesanan custom untuk souvenir pernikahan dan oleh-oleh Magetan.',
    location: 'Dukuh Genjeng',
    dukuh: 'Genjeng',
    instagram: 'bambu_genjeng',
    thumbnail: 'https://images.unsplash.com/photo-1587160688793-e5d7d2e4e234?w=600&h=340&fit=crop&auto=format',
    owner: 'Poniman Susanto',
    since: '2010',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dukuh+Genjeng+Desa+Banjarejo+Panekan+Magetan',
    priceRange: 'Rp 15.000 - Rp 150.000',
    operatingHours: 'Senin - Sabtu, 08.00 - 17.00 WIB',
    products: ['Tampah & Bakul Nasi Tradisional', 'Caping Anyaman Halus', 'Souvenir Anyaman & Kotak Hantaran'],
    fullStory: 'Sentra kerajinan anyaman bambu Dukuh Genjeng memanfaatkan rumpun bambu apus lokal yang ulet dan awet. Melalui tangan terampil pengrajin desa, bambu disulap menjadi aneka peralatan rumah tangga bernilai estetika tinggi yang diminati hingga luar kota.'
  },
  {
    id: 6,
    name: 'Budidaya Lele Bioflok Mandiri',
    category: 'Perikanan',
    description: 'Kolam lele sistem bioflok dengan daging padat manis dan tidak bau lumpur. Menggunakan pakan berkualitas dan sirkulasi air teratur. Siap bermitra dengan warung makan & pengepul.',
    location: 'Dukuh Ngrombo',
    dukuh: 'Ngrombo',
    instagram: 'lelebanjarejo',
    thumbnail: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&h=340&fit=crop&auto=format',
    owner: 'Yanto Prasetyo',
    since: '2021',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dukuh+Ngrombo+Desa+Banjarejo+Panekan+Magetan',
    priceRange: 'Rp 22.000 - Rp 26.000 / kg',
    operatingHours: 'Setiap Hari, 07.00 - 17.00 WIB',
    products: ['Lele Segar Hidup Siap Masak', 'Lele Bumbu Frozen Higienis', 'Bibit Lele Sangkuriang Unggul'],
    fullStory: 'Budidaya lele bioflok Dukuh Ngrombo memanfaatkan kolam bundar terpal dengan mikroorganisme pengurai alami. Menghasilkan daging lele yang manis gurih, tidak berbau lumpur, dan sangat digemari warung makan serta rumah tangga di sekitar Magetan.'
  },
]

// ── Google Maps URL Generator ─────────────────────────────────────────────────

function getMapsUrl(biz: Business): string {
  if (biz.mapsUrl) return biz.mapsUrl
  const query = encodeURIComponent(`${biz.name} ${biz.location || biz.dukuh} Desa Banjarejo Panekan Magetan`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Interactive UMKM Detail Modal (Quick View) ────────────────────────────────

interface BusinessModalProps {
  biz: Business | null
  onClose: () => void
}

function BusinessDetailModal({ biz, onClose }: BusinessModalProps) {
  useEffect(() => {
    if (!biz) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [biz, onClose])

  if (!biz) return null

  const mapsUrl = getMapsUrl(biz)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ backgroundColor: 'rgba(7,15,30,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border"
        style={{
          maxWidth: '780px',
          maxHeight: '92vh',
          borderColor: '#d4e4d8',
          boxShadow: '0 25px 70px -10px rgba(6,95,70,0.25)',
        }}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0" style={{ borderColor: '#eef3f0', backgroundColor: '#fafcfb' }}>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: '#065f46' }}
            >
              {biz.category}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: '#f0f7f3', color: '#065f46', border: '1px solid #d4e4d8' }}
            >
              📍 {biz.location}
            </span>
            <span className="text-xs" style={{ color: '#8a9fae' }}>
              Sejak {biz.since}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Tutup detail UMKM"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 sm:px-9 py-6 flex-1 space-y-6">
          {/* Photo banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ maxHeight: '300px', backgroundColor: '#0c1a30' }}>
            <img
              src={biz.thumbnail}
              alt={biz.name}
              className="w-full h-full object-cover"
              style={{ maxHeight: '300px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">Potensi UMKM Desa Banjarejo</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {biz.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Owner info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#f9fbf9', borderColor: '#e2ede8' }}>
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                style={{ background: 'linear-gradient(135deg, #065f46, #0a7c5c)' }}
              >
                {biz.owner.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="text-left">
                <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">Pemilik Usaha</p>
                <p className="text-base font-bold" style={{ color: '#0c1a30' }}>{biz.owner}</p>
                <p className="text-xs" style={{ color: '#6b7f8a' }}>{biz.location}, Desa Banjarejo, Kec. Panekan</p>
              </div>
            </div>

            {biz.priceRange && (
              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
                <p className="text-xs font-semibold" style={{ color: '#8a9fae' }}>Estimasi Harga:</p>
                <p className="text-sm font-bold text-emerald-800">{biz.priceRange}</p>
              </div>
            )}
          </div>

          {/* Description & Story */}
          <div className="text-left space-y-3">
            <h4 className="text-base font-bold" style={{ color: '#0c1a30' }}>Profil &amp; Keunggulan Produk</h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#4a6475' }}>
              {biz.fullStory || biz.description}
            </p>
          </div>

          {/* Product Items */}
          {biz.products && biz.products.length > 0 && (
            <div className="text-left space-y-2.5">
              <h4 className="text-sm font-bold" style={{ color: '#0c1a30' }}>Varian &amp; Layanan Unggulan:</h4>
              <div className="flex flex-wrap gap-2">
                {biz.products.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ backgroundColor: '#f0f7f3', color: '#065f46', border: '1px solid #d4e4d8' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Operating hours */}
          {biz.operatingHours && (
            <div className="flex items-center gap-2 text-xs p-3 rounded-xl" style={{ backgroundColor: '#f8faf9', color: '#526673', border: '1px solid #e8f0eb' }}>
              <CalendarIcon />
              <span><strong>Jam Operasional:</strong> {biz.operatingHours}</span>
            </div>
          )}

          {/* ── MAP SECTION (Direct Link) ── */}
          <div
            className="p-4 rounded-2xl border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{ backgroundColor: '#f0f7f3', borderColor: '#cde4d5' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-700 text-white flex-shrink-0">
                <PinIcon />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">Lokasi Sentra Usaha</h4>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 underline inline-flex items-center gap-1.5 transition-colors"
                  title="Buka titik koordinat di Google Maps"
                >
                  <span>{biz.location}, Desa Banjarejo, Kec. Panekan</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline hover:no-underline transition-colors flex-shrink-0"
            >
              <span>Buka di Google Maps</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t flex items-center justify-between gap-3 flex-shrink-0" style={{ borderColor: '#eef3f0', backgroundColor: '#fafcfb' }}>
          {biz.instagram ? (
            <a
              href={`https://instagram.com/${biz.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors hover:bg-pink-50 hover:border-pink-300 text-slate-700"
              style={{ borderColor: '#d4e4d8' }}
              aria-label="Instagram"
            >
              <InstagramIcon />
              <span>@{biz.instagram}</span>
            </a>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 cursor-pointer shadow-md"
            style={{ backgroundColor: '#065f46' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Business Card ─────────────────────────────────────────────────────────────

function BusinessCard({ biz, onSelect }: { biz: Business; onSelect: (b: Business) => void }) {
  const mapsUrl = getMapsUrl(biz)

  return (
    <article
      onClick={() => onSelect(biz)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer text-left relative"
      style={{ borderColor: '#e8f0eb', boxShadow: '0 2px 16px rgba(6,95,70,0.07)' }}
    >
      {/* ── Gambar Tampilan Produk ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: '200px', backgroundColor: '#0c1a30' }}
      >
        <img
          src={biz.thumbnail}
          alt={biz.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category chip */}
        <span
          className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: 'rgba(6,95,70,0.85)', color: '#fff', backdropFilter: 'blur(4px)' }}
        >
          {biz.category}
        </span>

        {/* Quick view hover badge */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-md flex items-center gap-1.5" style={{ backgroundColor: 'rgba(6,95,70,0.92)', backdropFilter: 'blur(4px)' }}>
            <span>Lihat Detail</span>
            <ExternalLinkIcon />
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 text-left">
        {/* Owner + since */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #065f46, #0a7c5c)' }}
          >
            {biz.owner.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold leading-tight text-left" style={{ color: '#0c1a30' }}>{biz.owner}</p>
            <div className="flex items-center gap-1 mt-0.5" style={{ color: '#9ab8a8' }}>
              <CalendarIcon />
              <span className="text-xs leading-none">Sejak {biz.since}</span>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="min-h-[3rem] flex items-center mb-2">
          <h3
            className="text-xl font-bold leading-snug text-left line-clamp-2 group-hover:text-emerald-800 transition-colors"
            style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
          >
            {biz.name}
          </h3>
        </div>

        {/* Description */}
        <div className="min-h-[4.25rem] mb-4 flex-1">
          <p
            className="text-sm leading-relaxed text-left"
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
        </div>

        {/* Location with CLICKABLE GOOGLE MAPS LINK */}
        <div className="flex items-center justify-between mb-4 pt-2 border-t text-left" style={{ borderColor: '#f1f5f3' }}>
          <div className="flex items-center gap-1.5" style={{ color: '#065f46' }}>
            <PinIcon />
            <span className="text-xs font-semibold">{biz.location}</span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors underline"
            title="Buka lokasi di Google Maps"
          >
            <span>Buka Peta</span>
            <ExternalLinkIcon />
          </a>
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-auto">
          {biz.instagram && (
            <a
              href={`https://instagram.com/${biz.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border transition-all duration-200 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50/50"
              style={{ borderColor: '#e8f0eb', color: '#6b7f8a' }}
              aria-label="Instagram"
            >
              <InstagramIcon />
              <span>@{biz.instagram}</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onSelect(biz)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:brightness-110 cursor-pointer shadow-sm"
            style={{ backgroundColor: '#065f46' }}
          >
            <span>Lihat Detail</span>
            <ExternalLinkIcon />
          </button>
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
    if (!/^d{16}$/.test(form.nik)) e.nik = 'NIK harus 16 digit'
    if (!/^d{9,13}$/.test(form.hp.replace(/D/g, ''))) e.hp = 'Nomor tidak valid'
    if (!form.dukuh) e.dukuh = 'Pilih dukuh'
    if (!form.jenis) e.jenis = 'Pilih jenis layanan' as any
    if (form.jenis === 'pinjaman' && !form.jumlah.trim()) e.jumlah = 'Wajib diisi'
    if (form.jenis === 'pinjaman' && !form.tujuan.trim()) e.tujuan = 'Wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await fetch('https://desabanjarejo.my.id/api/bumdes/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            namaLengkap: form.nama,
            nik: form.nik,
            noWa: form.hp,
            dukuh: form.dukuh,
            jenisLayanan: form.jenis,
            jumlahPinjaman: form.jumlah,
            tujuanPenggunaan: form.tujuan
          })
        });
      } catch (err) {
        console.warn('BUMDes API offline, fallback:', err);
      }
      setSubmitted(true);
    }
  }

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
            <CloseIcon />
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
              Terima kasih, <strong style={{ color: '#0c1a30' }}>{form.nama}</strong>. Pengurus BUM Desa akan menghubungi Anda melalui nomor telepon / kontak terdaftar dalam 1–2 hari kerja untuk konfirmasi dan tahap selanjutnya.
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
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>No. Telepon / HP <span style={{ color: '#f87171' }}>*</span></label>
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

  return (
    <div className="max-w-5xl mx-auto">

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
          <div className="flex flex-col justify-between p-8 lg:p-10 flex-1 text-left">
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
                  <PinIcon />
                  <span className="text-sm" style={{ color: '#4a6475' }}>Kantor Desa Banjarejo, Kec. Panekan, Kab. Magetan</span>
                </div>
              </div>
            </div>

            {/* Informational Action Card */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Konsultasi &amp; Informasi Tatap Muka di Kantor Desa
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kantor+Desa+Banjarejo+Panekan+Magetan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold border-2 border-emerald-700 text-emerald-800 transition-all duration-200 hover:bg-emerald-50 cursor-pointer"
              >
                <PinIcon />
                <span>Lihat Peta Kantor Desa ↗</span>
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


// ── Page ──────────────────────────────────────────────────────────────────────

export default function UmkmPage() {
  const [activeTab, setActiveTab] = useState<Tab>('umkm')
  const [bizList, setBizList] = useState<Business[]>(businesses)
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null)

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        const res = await fetch('https://desabanjarejo.my.id/api/umkm')
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setBizList(json.data)
        }
      } catch (err) {
        console.warn('UMKM API offline, using fallback:', err)
      }
    }
    fetchUmkm()
  }, [])

  const tabs: { id: Tab; label: string }[] = [
    { id: 'umkm', label: 'UMKM Warga' },
    { id: 'bumdes', label: 'BUM Desa' },
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">

        {/* ── Category Tabs ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-10" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
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
              </button>
            )
          })}
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────────── */}
        {activeTab === 'umkm' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm" style={{ color: '#9ab8a8' }}>
                Menampilkan <span className="font-semibold" style={{ color: '#065f46' }}>{bizList.length}</span> usaha
              </p>
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ backgroundColor: '#f0f7f3', color: '#065f46' }}
              >
                Tiga Dukuh: Ngasem · Ngrombo · Genjeng
              </span>
            </div>

            {/* Grid with interactive business cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {bizList.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} onSelect={(b) => setSelectedBiz(b)} />
              ))}
            </div>

            {/* CTA to register */}
            <div
              className="mt-12 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ backgroundColor: '#f0f7f3', border: '1px solid #d4e4d8' }}
            >
              <div className="text-left">
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
                href="https://desabanjarejo.my.id/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:brightness-110 shadow-md transition-all cursor-pointer"
                style={{ backgroundColor: '#065f46' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Kelola di Portal Admin</span>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'bumdes' && <BumDesaContent />}
      </div>

      {/* ── Business Quick-View Modal ────────────────────────────────────────── */}
      <BusinessDetailModal
        biz={selectedBiz}
        onClose={() => setSelectedBiz(null)}
      />
    </div>
  )
}
