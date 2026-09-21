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
  readTime?: string
  fullContent?: string[]
  tags?: string[]
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
  readTime: '4 menit baca',
  tags: ['Musdes', 'Pembangunan', 'Banjarejo 2032', 'Transparansi'],
  fullContent: [
    'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Desa Banjarejo yang diselenggarakan di Balai Pertemuan Desa pada Rabu malam dihadiri oleh lebih dari 120 perwakilan warga dari Dukuh Ngasem, Dukuh Ngrombo, dan Dukuh Genjeng. Pertemuan ini menjadi momentum strategis dalam merumuskan arah kebijakan pembangunan desa untuk periode lima tahun mendatang.',
    'Kepala Desa Banjarejo menyampaikan bahwa fokus utama RPJMDes 2027–2032 terbagi dalam tiga pilar prioritas: pertama, modernisasi dan pengerasan jalan usaha tani guna mempercepat mobilitas hasil panen warga; kedua, penguatan modal dan pemasaran digital bagi UMKM olahan pangan lokal; serta ketiga, optimalisasi sarana posyandu dan peningkatan sanitasi lingkungan pemukiman.',
    'Badan Permusyawaratan Desa (BPD) bersama para tokoh masyarakat memberikan apresiasi atas transparansi dan pelibatan aktif generasi muda dalam penyusunan usulan program kerja. Dokumen kesepakatan musyawarah ini telah ditandatangani bersama dan akan diajukan ke tingkat kecamatan sebagai rujukan penyusunan RKP Desa tahun anggaran berikutnya.',
    'Diharapkan dengan adanya sinergi antar-dukuh dan komitmen pengelolaan dana desa yang akuntabel, Banjarejo dapat tumbuh menjadi desa mandiri yang sejahtera dan berdaya saing tinggi di Kabupaten Magetan.'
  ]
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
    readTime: '3 menit baca',
    tags: ['APBDes', 'Transparansi', 'Keuangan Desa'],
    fullContent: [
      'Pemerintah Desa Banjarejo secara resmi mempublikasikan laporan pertanggungjawaban realisasi Anggaran Pendapatan dan Belanja Desa (APBDes) Semester I Tahun Anggaran 2026 melalui papan informasi desa dan portal digital resmi.',
      'Dari total pagu anggaran sebesar Rp 980 juta, serapan belanja telah mencapai Rp 725,2 juta atau sekitar 74%. Sektor pembangunan fisik berupa perbaikan drainase pemukiman dan pengaspalan jalan lingkar Dukuh Ngasem menyerap proporsi terbesar.',
      'Sekretaris Desa menegaskan bahwa transparansi pengelolaan anggaran merupakan kewajiban moral untuk menjaga kepercayaan warga serta memastikan setiap rupiah bermanfaat langsung bagi masyarakat luas.'
    ]
  },
  {
    id: 2,
    category: 'Ekonomi',
    title: 'BUMDes Banjarejo Mandiri Cetak Omzet Rp 95 Juta di Semester Pertama',
    excerpt: 'Badan Usaha Milik Desa Banjarejo mencatat pertumbuhan omzet 28% dibanding periode yang sama tahun lalu, ditopang unit usaha penggilingan padi dan simpan pinjam perempuan.',
    date: '8 Agustus 2026',
    author: 'Joko Purnomo',
    image: 'https://images.unsplash.com/photo-1561504935-4e7d4516a2d1?w=600&h=400&fit=crop&auto=format',
    readTime: '3 menit baca',
    tags: ['BUMDes', 'Ekonomi Desa', 'Simpan Pinjam'],
    fullContent: [
      'BUMDes Banjarejo Mandiri membukukan kinerja keuangan yang menggembirakan sepanjang paruh pertama tahun 2026 dengan perolehan omzet kumulatif mencapai Rp 95,4 juta, meningkat 28% dibanding tahun sebelumnya.',
      'Pengurus BUMDes menyatakan kontribusi utama berasal dari unit layanan simpan pinjam produktif yang menjangkau lebih dari 60 pelaku UMKM lokal serta jasa sewa traktor pertanian untuk kelompok tani.',
      'Sebagian dividen hasil usaha ini akan dialokasikan kembali ke kas desa sebagai Pendapatan Asli Desa (PADes) guna mendanai santunan lansia dan beasiswa anak berprestasi.'
    ]
  },
  {
    id: 3,
    category: 'Pertanian',
    title: 'Panen Padi Musim Tanam Pertama Dukuh Ngasem Hasilkan 48 Ton Gabah',
    excerpt: 'Petani Dukuh Ngasem berhasil memanen 48 ton gabah kering pada musim tanam pertama 2026, melampaui target produksi berkat penerapan sistem irigasi teknis dan bibit unggul bersubsidi.',
    date: '6 Agustus 2026',
    author: 'Agus Suryanto',
    image: 'https://images.unsplash.com/photo-1574263867128-1d54d63e2b4e?w=600&h=400&fit=crop&auto=format',
    readTime: '4 menit baca',
    tags: ['Pertanian', 'Panen Raya', 'Dukuh Ngasem', 'Ketahanan Pangan'],
    fullContent: [
      'Musim panen pertama tahun 2026 di areal persawahan Dukuh Ngasem mencatatkan hasil panen yang sangat memuaskan, mencapai 48 ton gabah kering panen dari total luasan sawah 8 hektar.',
      'Ketua Gapoktan Banjarejo mengemukakan bahwa peningkatan produktivitas ini tidak lepas dari pemanfaatan irigasi teknis terpadu serta pemilihan varietas padi tahan wereng yang dibagikan secara bersubsidi oleh dinas pertanian.',
      'Petani kini dapat menjual hasil panen dengan harga stabil melalui kerjasama penyerapan gabah bersama BUMDes, sehingga stabilitas pendapatan keluarga tani dapat terlindungi dari fluktuasi tengkulak.'
    ]
  },
  {
    id: 4,
    category: 'Sosial',
    title: 'Posyandu Balita Desa Banjarejo Catat Kehadiran Tertinggi Sepanjang 2026',
    excerpt: 'Sebanyak 187 balita hadir dalam kegiatan posyandu bulan Agustus, menjadi angka kehadiran tertinggi tahun ini dengan cakupan gizi baik mencapai 94% dan tidak ada kasus gizi buruk.',
    date: '4 Agustus 2026',
    author: 'Ratna Sari',
    image: 'https://images.unsplash.com/photo-1542315099045-93937d70c67a?w=600&h=400&fit=crop&auto=format',
    readTime: '3 menit baca',
    tags: ['Posyandu', 'Kesehatan', 'Balita', 'Cegah Stunting'],
    fullContent: [
      'Kegiatan rutin Pos Pelayanan Terpadu (Posyandu) Balita yang diselenggarakan serentak di tiga dukuh Desa Banjarejo mencatatkan rekor partisipasi tertinggi dengan kehadiran 187 balita dan baduta.',
      'Tim penggerak PKK bersama bidan desa melakukan penimbangan berat badan, pengukuran tinggi badan, imunisasi rutin, serta pembagian makanan tambahan (PMT) berbasis pangan lokal bernutrisi tinggi.',
      'Hasil evaluasi menunjukkan 94% balita berada pada kurva pertumbuhan gizi optimal dan angka stunting di Desa Banjarejo berhasil ditekan mendekati angka nol persen.'
    ]
  },
  {
    id: 5,
    category: 'Pertanian',
    title: 'Kelompok Tani Ngrombo Mulai Uji Coba Pertanian Organik di Lahan 1,2 Ha',
    excerpt: 'Kelompok Tani Makmur Dukuh Ngrombo memulai uji coba pertanian organik pada lahan seluas 1,2 hektar dengan pendampingan dari Dinas Pertanian Kabupaten Magetan.',
    date: '2 Agustus 2026',
    author: 'Agus Suryanto',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format',
    readTime: '3 menit baca',
    tags: ['Organik', 'Inovasi Pertanian', 'Dukuh Ngrombo'],
    fullContent: [
      'Dalam upaya mengurangi ketergantungan pada pupuk kimia sintetis dan memperbaiki kesuburan tanah, Kelompok Tani Makmur Dukuh Ngrombo menginisiasi demplot pertanian organik seluas 1,2 hektar.',
      'Petani menggunakan pupuk kompos kotoran sapi hasil olahan lokal serta pestisida nabati berbahan ekstrak daun mimba dan tembakau. Metode ini terbukti menekan biaya input produksi hingga 35%.',
      'Jika uji coba musim tanam ini berhasil, program pertanian organik ramah lingkungan ini akan diperluas ke areal persawahan Dukuh Genjeng dan Ngasem pada musim berikutnya.'
    ]
  },
  {
    id: 6,
    category: 'Ekonomi',
    title: 'Program Simpan Pinjam Perempuan Banjarejo Perluas Jangkauan ke 60 Anggota',
    excerpt: 'Kelompok SPP Desa Banjarejo menambah 18 anggota baru di Dukuh Genjeng, memperluas akses permodalan bagi perempuan pelaku usaha rumah tangga.',
    date: '30 Juli 2026',
    author: 'Dewi Lestari',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop&auto=format',
    readTime: '3 menit baca',
    tags: ['SPP', 'Pemberdayaan Perempuan', 'UMKM'],
    fullContent: [
      'Program Simpan Pinjam Perempuan (SPP) di bawah naungan BUMDes Banjarejo secara resmi memperluas jangkauan pembiayaan dengan menerima 18 pengusaha mikro perempuan baru dari Dukuh Genjeng.',
      'Dengan penambahan ini, total anggota aktif SPP kini mencapai 60 orang yang bergerak di bidang kerajinan anyaman bambu, olahan krupuk lempeng, serta warung kelontong tradisional.',
      'Skema pinjaman tanpa agunan berbunga sangat ringan ini diharapkan dapat membebaskan warga dari jeratan rentenir dan memperkuat kemandirian ekonomi keluarga di desa.'
    ]
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

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Helper to resolve full article content ────────────────────────────────────

function getArticleParagraphs(article: Article): string[] {
  if (article.fullContent && article.fullContent.length > 0) {
    return article.fullContent
  }
  return [
    article.excerpt,
    'Pemerintah Desa Banjarejo terus berkomitmen untuk memberikan transparansi informasi publik secara berkala kepada seluruh warga masyarakat. Berbagai program dan inisiatif pembangunan yang dirancang bersama melalui musyawarah desa senantiasa diarahkan demi mewujudkan kemandirian, kesejahteraan, dan kemajuan bersama di seluruh penjuru dukuh.',
    'Dukungan dan partisipasi aktif dari seluruh elemen warga, mulai dari perangkat desa, BPD, tokoh masyarakat, hingga generasi muda menjadi pilar utama keberhasilan setiap program yang telah direncanakan.'
  ]
}

// ── Interactive News Detail Modal (Quick View) ────────────────────────────────

interface ArticleModalProps {
  article: Article | null
  onClose: () => void
}

function ArticleDetailModal({ article, onClose }: ArticleModalProps) {

  useEffect(() => {
    if (!article) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [article, onClose])

  if (!article) return null

  const accent = categoryAccent[article.category] || '#065f46'
  const paragraphs = getArticleParagraphs(article)

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
          maxWidth: '760px',
          maxHeight: '92vh',
          borderColor: '#e2ede8',
          boxShadow: '0 25px 70px -10px rgba(6,95,70,0.25)',
        }}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0" style={{ borderColor: '#eef3f0', backgroundColor: '#fafcfb' }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: accent }}
            >
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#7a8f83' }}>
              <CalendarIcon />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#065f46' }}>
              <ClockIcon />
              <span>{article.readTime || '3 menit baca'}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Tutup artikel"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-6 sm:px-9 py-6 flex-1 space-y-6">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ maxHeight: '340px', backgroundColor: '#0c1a30' }}>
            <img
              src={article.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=500&fit=crop&auto=format'}
              alt={article.title}
              className="w-full h-full object-cover"
              style={{ maxHeight: '340px' }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-xs text-white/90 font-medium">Dokumentasi Desa Banjarejo • Kecamatan Panekan, Magetan</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
            >
              {article.title}
            </h2>

            {/* Author bar */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: '#eef3f0' }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs"
                style={{ background: 'linear-gradient(135deg, #065f46, #0d9488)' }}
              >
                {article.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight" style={{ color: '#0c1a30' }}>{article.author}</p>
                <p className="text-[11px] leading-tight mt-0.5" style={{ color: '#8a9fae' }}>Jurnalis Warga / Tim Informasi Desa Banjarejo</p>
              </div>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl text-sm sm:text-base font-medium leading-relaxed" style={{ backgroundColor: '#f0f7f3', color: '#065f46', borderLeft: '4px solid #065f46' }}>
            {article.excerpt}
          </div>

          {/* Full Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-left" style={{ color: '#334155' }}>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t flex flex-wrap items-center gap-2" style={{ borderColor: '#eef3f0' }}>
              <span className="text-xs font-semibold" style={{ color: '#8a9fae' }}>Topik terkait:</span>
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium border"
                  style={{ backgroundColor: '#f8faf9', borderColor: '#d4e4d8', color: '#065f46' }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t flex items-center justify-end gap-3 flex-shrink-0" style={{ borderColor: '#eef3f0', backgroundColor: '#fafcfb' }}>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 cursor-pointer shadow-md"
            style={{ backgroundColor: '#065f46' }}
          >
            Tutup Artikel
          </button>
        </div>
      </div>
    </div>
  )
}

// ── News Card ─────────────────────────────────────────────────────────────────

function NewsCard({ article, onSelect }: { article: Article; onSelect: (art: Article) => void }) {
  const accent = categoryAccent[article.category] || '#065f46'
  return (
    <article
      onClick={() => onSelect(article)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer text-left relative"
      style={{ borderColor: '#e8edf2', boxShadow: '0 2px 14px rgba(14,32,60,0.06)' }}
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

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-md flex items-center gap-1.5" style={{ backgroundColor: 'rgba(6,95,70,0.9)', backdropFilter: 'blur(4px)' }}>
            <span>Buka Baca</span>
            <ArrowRight />
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

        <div className="flex items-center justify-between pt-3 border-t mt-auto text-xs font-semibold" style={{ borderColor: '#f1f5f3' }}>
          <span style={{ color: '#9ab8a8' }}>{article.readTime || '3 menit baca'}</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:translate-x-0.5 transition-transform">
            Baca Selengkapnya <ArrowRight />
          </span>
        </div>
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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true)
      try {
        const url = activeCategory === 'Semua' 
          ? 'https://desabanjarejo.my.id/api/news' 
          : `https://desabanjarejo.my.id/api/news?category=${encodeURIComponent(activeCategory)}`
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
            onClick={() => setSelectedArticle(featuredArticle)}
            className="group grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden mb-12 cursor-pointer border transition-all duration-300 hover:shadow-2xl hover:border-emerald-700/40 relative"
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

            <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-10 text-left">
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
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#065f46' }}>
                  <ClockIcon />
                  <span>{featuredArticle.readTime || '4 menit baca'}</span>
                </div>
              </div>

              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-4 group-hover:text-emerald-800 transition-colors"
                style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
              >
                {featuredArticle.title}
              </h2>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#5a707e' }}>
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 group-hover:translate-x-1.5 transition-transform">
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
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
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
              <NewsCard key={art.id} article={art} onSelect={(a) => setSelectedArticle(a)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Article Detail Modal ─────────────────────────────────────────────── */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  )
}
