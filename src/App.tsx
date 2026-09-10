import { useState, useEffect, useCallback } from 'react'
import AboutPage from '@/pages/AboutPage'
import NewsPage from '@/pages/NewsPage'
import HistoryPage from '@/pages/HistoryPage'
import ServicesPage from '@/pages/ServicesPage'
import UmkmPage from '@/pages/UmkmPage'
import AdminPage from '@/pages/AdminPage'

type Page = 'home' | 'about' | 'news' | 'history' | 'services' | 'umkm' | 'admin'

// ── Icons ────────────────────────────────────────────────────────────────────

const AreaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h7v7H3z" /><path d="M14 3h7v7h-7z" /><path d="M3 14h7v7H3z" />
    <path d="M17.5 17.5m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
  </svg>
)

const PopulationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const HamletIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.88a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Luas Desa', value: '147', unit: 'Hektar', subtext: null, icon: <AreaIcon /> },
  { label: 'Jumlah Penduduk', value: '2.847', unit: 'Jiwa', subtext: null, icon: <PopulationIcon /> },
  { label: 'Tiga Dukuh', value: '3', unit: 'Dukuh', subtext: 'Ngasem · Ngrombo · Genjeng', icon: <HamletIcon /> },
]

const news = [
  {
    id: 1,
    category: 'Infrastruktur',
    categoryColor: 'bg-navy text-white',
    title: 'Pengaspalan Jalan Dukuh Ngrombo Sepanjang 800 Meter Hampir Selesai',
    excerpt: 'Tim pekerjaan umum desa telah menyelesaikan 90% pengaspalan jalan utama Dukuh Ngrombo, dan diperkirakan akan dibuka penuh pada akhir bulan ini.',
    date: '12 Agustus 2026',
    author: 'Budi Santoso',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=380&fit=crop&auto=format',
  },
  {
    id: 2,
    category: 'Komunitas',
    categoryColor: 'bg-emerald-dark text-white',
    title: 'Festival Panen Raya Banjarejo Kembali Digelar September Ini',
    excerpt: 'Warga diundang untuk menikmati tiga hari penuh pertunjukan seni, pasar produk lokal, dan kesenian tradisional dalam rangka merayakan warisan budaya desa.',
    date: '10 Agustus 2026',
    author: 'Sari Dewi',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=380&fit=crop&auto=format',
  },
  {
    id: 3,
    category: 'Kesehatan',
    categoryColor: 'bg-navy-700 text-white',
    title: 'Pemeriksaan Kesehatan Gratis Dibuka untuk Seluruh Warga Desa',
    excerpt: 'Puskesmas Pembantu Desa Banjarejo menawarkan pemeriksaan tekanan darah, diabetes, dan kolesterol gratis melalui kemitraan pemerintah provinsi Jawa Timur.',
    date: '8 Agustus 2026',
    author: 'Dr. Indah Pertiwi',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=380&fit=crop&auto=format',
  },
]

const navLinks = [
  { label: 'Home', href: '#home', page: 'home' as Page, anchor: 'home' },
  { label: 'About', href: '#', page: 'about' as Page, anchor: null },
  { label: 'Services', href: '#', page: 'services' as Page, anchor: null },
  { label: 'News', href: '#', page: 'news' as Page, anchor: null },
  { label: 'History', href: '#', page: 'history' as Page, anchor: null },
  { label: 'UMKM', href: '#', page: 'umkm' as Page, anchor: null },
  { label: 'Contact', href: '#contact', page: 'home' as Page, anchor: 'contact' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = useCallback((page: Page | null, anchor: string | null) => {
    setMenuOpen(false)
    if (page === 'about' || page === 'news' || page === 'history' || page === 'services' || page === 'umkm') {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (page === 'home' || currentPage !== 'home') {
      setCurrentPage('home')
      if (anchor) {
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentPage])

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(14,32,60,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('home', 'home')}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#065f46' }}
            >
              <HamletIcon />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight tracking-wide">Desa Banjarejo</p>
              <p className="text-emerald-200 text-xs leading-tight tracking-widest uppercase">Panekan · Magetan</p>
            </div>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                (link.page === currentPage && link.page !== 'home') ||
                (link.page === 'home' && currentPage === 'home' && link.label === 'Home')
              return (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page, link.anchor)}
                    className="text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
                    style={{ color: isActive ? '#a7f3d0' : 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={(e) => { if (!isActive) (e.target as HTMLElement).style.color = 'white' }}
                    onMouseLeave={(e) => { if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)' }}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('services', null); }}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: '#065f46' }}
            >
              e-Services
            </a>
            <button
              className="lg:hidden text-white"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: '#0c1a30' }} className="lg:hidden border-t border-white/10">
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    className="block w-full text-left py-2.5 text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                    onClick={() => navigate(link.page, link.anchor)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('services', null); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white"
                  style={{ backgroundColor: '#065f46' }}
                >
                  e-Services
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ── Admin Page ───────────────────────────────────────────────────────── */}
      {currentPage === 'admin' && <AdminPage />}

      {/* ── Services Page ───────────────────────────────────────────────────── */}
      {currentPage === 'services' && <ServicesPage />}

      {/* ── UMKM Page ───────────────────────────────────────────────────────── */}
      {currentPage === 'umkm' && <UmkmPage />}

      {/* ── About Page ──────────────────────────────────────────────────────── */}
      {currentPage === 'about' && <AboutPage />}

      {/* ── News Page ───────────────────────────────────────────────────────── */}
      {currentPage === 'news' && <NewsPage />}

      {/* ── History Page ────────────────────────────────────────────────────── */}
      {currentPage === 'history' && <HistoryPage />}

      {/* ── Homepage ────────────────────────────────────────────────────────── */}
      {currentPage === 'home' && <>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
        style={{ backgroundColor: '#0c1a30' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1776584324215-7a551a3cbe02?w=1800&h=900&fit=crop&auto=format')`,
          }}
          aria-hidden="true"
        />
        {/* Multi-layer overlay: navy bottom, emerald tint top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(6,95,70,0.55) 0%, rgba(14,32,60,0.75) 40%, rgba(7,15,30,0.92) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Subtle horizontal scan line texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-10 flex flex-col items-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 border"
            style={{ borderColor: 'rgba(167,243,208,0.4)', color: '#a7f3d0', backgroundColor: 'rgba(6,95,70,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
            Portal Resmi Pemerintah Desa
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Selamat Datang di
            <br />
            <span style={{ color: '#a7f3d0', fontStyle: 'italic' }}>Desa Banjarejo</span>
          </h1>

          <p className="text-base sm:text-lg text-white/60 font-medium tracking-wide mb-4 uppercase" style={{ letterSpacing: '0.06em' }}>
            Kecamatan Panekan, Kabupaten Magetan, Jawa Timur
          </p>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
            Desa yang tumbuh bersama masyarakatnya — berkomitmen pada pemerintahan yang transparan,
            sejahtera, dan berkelanjutan untuk setiap warga Banjarejo.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('services', null); }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-semibold text-white text-base transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: '#065f46' }}
            >
              Jelajahi Layanan
              <ChevronRight />
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('about', null); }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-semibold text-sm border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
            >
              Tentang Desa
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── Stats Cards ─────────────────────────────────────────────────────── */}
      <section
        className="relative z-10 -mt-1"
        style={{ backgroundColor: '#f8faf9' }}
      >
        {/* Top edge accent */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #065f46, #1e3a5f)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group flex items-center gap-6 bg-white rounded-xl p-7 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderColor: '#e8f0eb', boxShadow: '0 2px 12px rgba(6,95,70,0.06)' }}
              >
                {/* Left accent bar */}
                <div
                  className="w-1 self-stretch rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#065f46' }}
                />
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: '#f0f7f3', color: '#065f46' }}
                >
                  {stat.icon}
                </div>
                {/* Text */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#6b8f7b' }}>
                    {stat.label}
                  </p>
                  <p
                    className="text-4xl font-bold leading-none mb-1"
                    style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#1e3a5f' }}>{stat.unit}</p>
                  {stat.subtext && (
                    <p className="text-xs mt-1.5 font-medium" style={{ color: '#065f46' }}>{stat.subtext}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ─────────────────────────────────────────────────────── */}
      <section id="news" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#065f46' }}>
                Pembaruan Desa
              </p>
              <h2
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
              >
                Berita Terbaru
              </h2>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('news', null); }}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3 duration-200 flex-shrink-0"
              style={{ color: '#065f46' }}
            >
              Lihat Semua Berita <ChevronRight />
            </a>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {news.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{ borderColor: '#e8edf2', boxShadow: '0 2px 10px rgba(14,32,60,0.07)' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52 flex-shrink-0" style={{ backgroundColor: '#0c1a30' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded ${article.categoryColor}`}
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-lg font-bold leading-snug mb-3 group-hover:text-emerald-dark transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#4a6475' }}>
                    {article.excerpt}
                  </p>
                  {/* Meta row */}
                  <div
                    className="flex items-center justify-between pt-4 border-t text-xs font-medium"
                    style={{ borderColor: '#e8edf2', color: '#7a8fa0' }}
                  >
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map ─────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#f0f5f1' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#065f46' }}>
              Temukan Kami
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
            >
              Lokasi Desa
            </h2>
            <p className="mt-3 text-base" style={{ color: '#4a6475' }}>
              Kecamatan Panekan, Kabupaten Magetan, Jawa Timur
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              borderColor: '#d4e4d8',
              boxShadow: '0 8px 40px rgba(6,95,70,0.12)',
            }}
          >
            {/* Map header bar */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <div className="flex items-center gap-3 text-white">
                <MapPinIcon />
                <div>
                  <p className="text-sm font-semibold">Kantor Desa Banjarejo</p>
                  <p className="text-xs text-white/60">Kec. Panekan, Kab. Magetan, Jawa Timur 63362</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps?q=-7.5911745,111.3180323"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
              >
                Buka Peta Google <ChevronRight />
              </a>
            </div>

            {/* Google Maps Embed iframe with Marker Pin at -7.5911745,111.3180323 */}
            <div className="relative w-full overflow-hidden" style={{ height: '450px' }}>
              <iframe
                title="Lokasi Kantor Desa Banjarejo Magetan"
                src="https://maps.google.com/maps?q=-7.5911745,111.3180323+(Kantor%20Desa%20Banjarejo)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer id="contact" style={{ backgroundColor: '#070f1e' }}>
        {/* Top accent */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #065f46, #1e3a5f, #065f46)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#065f46' }}
                >
                  <HamletIcon />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Desa Banjarejo</p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: '#a7f3d0' }}>Panekan · Magetan</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#5a7a8a' }}>
                Melayani warga Desa Banjarejo dengan tata kelola yang transparan, akuntabel, dan partisipatif sejak 1946.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Tautan Cepat</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Profil Desa', id: 'profil-desa' },
                  { label: 'Struktur Pemerintahan', id: null },
                  { label: 'APBDes Publik', id: 'apbdes' },
                  { label: 'Program Komunitas', id: 'komunitas' },
                  { label: 'Peraturan Desa', id: 'peraturan' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigate('about', item.id); }}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: '#5a7a8a' }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Layanan Desa</h4>
              <ul className="space-y-3">
                {['Surat Keterangan', 'Akta Kelahiran', 'Sertifikat Tanah', 'Izin Usaha', 'Bantuan Sosial'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigate('services', null); }}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: '#5a7a8a' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#065f46' }}><MapPinIcon /></span>
                  <span className="text-sm leading-relaxed" style={{ color: '#5a7a8a' }}>
                    Desa Banjarejo, Kec. Panekan,<br />Kab. Magetan, Jawa Timur 63362
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ color: '#065f46' }}><PhoneIcon /></span>
                  <a href="tel:+62351123456" className="text-sm hover:text-white transition-colors" style={{ color: '#5a7a8a' }}>
                    (0351) 123-456
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ color: '#065f46' }}><MailIcon /></span>
                  <a href="mailto:info@desabanjarejo.go.id" className="text-sm hover:text-white transition-colors" style={{ color: '#5a7a8a' }}>
                    info@desabanjarejo.go.id
                  </a>
                </li>
              </ul>

              {/* Office hours */}
              <div className="mt-6 pt-5 border-t" style={{ borderColor: '#1a2f4a' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#065f46' }}>
                  Jam Pelayanan
                </p>
                <p className="text-sm" style={{ color: '#5a7a8a' }}>Sen – Jum: 08:00 – 15:00</p>
                <p className="text-sm" style={{ color: '#5a7a8a' }}>Sab: 08:00 – 12:00</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ borderColor: '#111e30', color: '#3a5a70' }}
          >
            <p>© 2026 Pemerintah Desa Banjarejo. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-5">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Ketentuan Penggunaan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('admin', null); }} className="hover:text-emerald-400 font-semibold text-emerald-500 transition-colors">🔐 Admin Dasbor</a>
            </div>
          </div>
        </div>
      </footer>

      </>}

    </div>
  )
}
