import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = 'Semua' | 'Pemerintahan' | 'Ekonomi' | 'Pertanian' | 'Sosial'

interface Article {
  id: number
  category: Exclude<Category, 'Semua'>
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  isFeatured?: boolean
}

// ── Fallback Initial Data ──────────────────────────────────────────────────────

const fallbackFeatured: Article = {
  id: 0,
  category: 'Pemerintahan',
  title: 'Musyawarah Desa Banjarejo Sepakati Rencana Pembangunan Jangka Menengah 2027–2032',
  excerpt:
    'Seluruh elemen masyarakat Desa Banjarejo berkumpul dalam musyawarah tahunan untuk menyepakati prioritas pembangunan lima tahun ke depan, mencakup pembangunan infrastruktur jalan dukuh, pemberdayaan ekonomi warga, dan peningkatan kualitas layanan kesehatan dasar di tiga dukuh.',
  date: '14 Agustus 2026',
  author: 'Sudarmanto',
  image: 'https://images.unsplash.com/photo-1752760023440-6e912553de03?w=1400&h=700&fit=crop&auto=format',
}

const fallbackArticles: Article[] = [
  {
    id: 1,
    category: 'Pemerintahan',
    title: 'Realisasi APBDes Banjarejo Semester I 2026 Capai 74 Persen',
    excerpt: 'Pemerintah Desa Banjarejo mempublikasikan laporan realisasi anggaran semester pertama dengan tingkat serapan 74% dari total pagu Rp 980 juta, didominasi sektor infrastruktur dan pemberdayaan masyarakat.',
    date: '10 Agustus 2026',
    author: 'Sri Wahyuni',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    category: 'Ekonomi',
    title: 'BUMDes Banjarejo Mandiri Cetak Omzet Rp 95 Juta di Semester Pertama',
    excerpt: 'Badan Usaha Milik Desa Banjarejo mencatat pertumbuhan omzet 28% dibanding periode yang sama tahun lalu, ditopang unit usaha penggilingan padi dan simpan pinjam perempuan.',
    date: '8 Agustus 2026',
    author: 'Joko Purnomo',
    image: 'https://images.unsplash.com/photo-1561504935-4e7d4516a2d1?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 3,
    category: 'Pertanian',
    title: 'Panen Padi Musim Tanam Pertama Dukuh Ngasem Hasilkan 48 Ton Gabah',
    excerpt: 'Petani Dukuh Ngasem berhasil memanen 48 ton gabah kering pada musim tanam pertama 2026, melampaui target produksi berkat penerapan sistem irigasi teknis dan bibit unggul bersubsidi.',
    date: '6 Agustus 2026',
    author: 'Agus Suryanto',
    image: 'https://images.unsplash.com/photo-1574263867128-1d54d63e2b4e?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 4,
    category: 'Sosial',
    title: 'Posyandu Balita Desa Banjarejo Catat Kehadiran Tertinggi Sepanjang 2026',
    excerpt: 'Sebanyak 187 balita hadir dalam kegiatan posyandu bulan Agustus, menjadi angka kehadiran tertinggi tahun ini dengan cakupan gizi baik mencapai 94% dan tidak ada kasus gizi buruk.',
    date: '4 Agustus 2026',
    author: 'Ratna Sari',
    image: 'https://images.unsplash.com/photo-1542315099045-93937d70c67a?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 5,
    category: 'Pertanian',
    title: 'Kelompok Tani Ngrombo Mulai Uji Coba Pertanian Organik di Lahan 1,2 Ha',
    excerpt: 'Kelompok Tani Makmur Dukuh Ngrombo memulai uji coba pertanian organik pada lahan seluas 1,2 hektar dengan pendampingan dari Dinas Pertanian Kabupaten Magetan.',
    date: '2 Agustus 2026',
    author: 'Agus Suryanto',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 6,
    category: 'Ekonomi',
    title: 'Program Simpan Pinjam Perempuan Banjarejo Perluas Jangkauan ke 60 Anggota',
    excerpt: 'Kelompok SPP Desa Banjarejo menambah 18 anggota baru di Dukuh Genjeng, memperluas akses permodalan bagi perempuan pelaku usaha rumah tangga.',
    date: '30 Juli 2026',
    author: 'Dewi Lestari',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop&auto=format',
  }
]

const categories: Category[] = ['Semua', 'Pemerintahan', 'Ekonomi', 'Pertanian', 'Sosial']

const categoryAccent: Record<Exclude<Category, 'Semua'>, string> = {
  Pemerintahan: '#1e3a5f',
  Ekonomi: '#065f46',
  Pertanian: '#047857',
  Sosial: '#7c3aed',
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

// ── News Card ─────────────────────────────────────────────────────────────────

function NewsCard({ article }: { article: Article }) {
  const accent = categoryAccent[article.category] || '#065f46'
  return (
    <article
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      style={{ borderColor: '#e8edf2', boxShadow: '0 2px 12px rgba(14,32,60,0.06)' }}
    >
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '192px', backgroundColor: '#0c1a30' }}>
        <img
          src={article.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format'}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: accent }}
          >
            {article.category}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: '#8a9fae' }}>
          <CalendarIcon />
          <span>{article.date}</span>
          <span className="mx-1">•</span>
          <span>{article.author}</span>
        </div>

        <h3
          className="text-base font-bold leading-snug mb-3 transition-colors group-hover:text-emerald-700"
          style={{
            fontFamily: 'var(--font-sans)',
            color: '#0c1a30',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </h3>

        <p
          className="text-xs leading-relaxed flex-1 mb-4"
          style={{
            color: '#6b7f8a',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>
      </div>
    </article>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Semua')
  const [featuredArticle, setFeaturedArticle] = useState<Article>(fallbackFeatured)
  const [articleList, setArticleList] = useState<Article[]>(fallbackArticles)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true)
      try {
        const url = activeCategory === 'Semua' 
          ? 'http://localhost:5000/api/news' 
          : `http://localhost:5000/api/news?category=${encodeURIComponent(activeCategory)}`
        const res = await fetch(url)
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const feat = json.data.find((a: Article) => a.isFeatured) || json.data[0]
          const others = json.data.filter((a: Article) => a.id !== feat.id)
          setFeaturedArticle(feat)
          setArticleList(others.length > 0 ? others : json.data)
        }
      } catch (err) {
        console.warn('Backend news API offline, using fallback client data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [activeCategory])

  const filtered = activeCategory === 'Semua'
    ? articleList
    : articleList.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8faf9' }}>

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
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
            Informasi Desa
          </span>
          <h1
            className="text-3xl lg:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Berita Seputar Desa Banjarejo
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Kabar terkini — transparan, aktual, dan terpercaya untuk seluruh warga.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">

        {/* ── Featured Article ─────────────────────────────────────────────── */}
        {featuredArticle && (
          <div
            className="group grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden mb-12 cursor-pointer border transition-all duration-300 hover:shadow-2xl"
            style={{ borderColor: '#dde8e2', boxShadow: '0 4px 32px rgba(6,95,70,0.09)', backgroundColor: '#fff' }}
          >
            <div className="relative lg:col-span-3 overflow-hidden" style={{ minHeight: '320px', backgroundColor: '#0c1a30' }}>
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: '320px' }}
              />
              <div className="absolute top-5 left-5">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: '#065f46' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Artikel Utama
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#f0f7f3', color: '#065f46' }}
                >
                  {featuredArticle.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: '#9ab8a8' }}>
                  <CalendarIcon />
                  <span>{featuredArticle.date}</span>
                </div>
              </div>

              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-4"
                style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
              >
                {featuredArticle.title}
              </h2>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#5a707e' }}>
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                Baca Artikel Selengkapnya <ArrowRight />
              </div>
            </div>
          </div>
        )}

        {/* ── Category Filters ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                style={
                  activeCategory === cat
                    ? { backgroundColor: '#065f46', color: '#fff', boxShadow: '0 4px 12px rgba(6,95,70,0.2)' }
                    : { backgroundColor: '#fff', color: '#5a707e', border: '1px solid #e2ede8' }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs" style={{ color: '#8a9fae' }}>
            Menampilkan <strong style={{ color: '#0c1a30' }}>{filtered.length}</strong> artikel
          </p>
        </div>

        {/* ── Articles Grid ────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-sm">Belum ada artikel dalam kategori {activeCategory}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((art) => (
              <NewsCard key={art.id} article={art} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
