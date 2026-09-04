import { useState, useEffect, useRef } from 'react'

// ── TOC data ─────────────────────────────────────────────────────────────────

const tocSections = [
  { id: 'asal-usul-nama',  label: 'Asal Usul Nama' },
  { id: 'punden-seringin', label: 'Punden Seringin' },
  { id: 'arca-belanga',    label: 'Arca Belanga' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-2xl font-bold mt-16 mb-5 scroll-mt-28"
      style={{
        fontFamily: 'var(--font-sans)',
        color: '#111827',
        letterSpacing: '-0.02em',
        lineHeight: 1.25,
      }}
    >
      {children}
    </h2>
  )
}

function BodyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-lg leading-[1.9] mb-7"
      style={{ fontFamily: 'var(--font-display)', color: '#374151', fontWeight: 400 }}
    >
      {children}
    </p>
  )
}

function Blockquote({ children, source }: { children: React.ReactNode; source?: string }) {
  return (
    <blockquote
      className="my-10 pl-8 py-2"
      style={{ borderLeft: '5px solid #065f46' }}
    >
      <p
        className="text-xl italic leading-[1.85] mb-3"
        style={{ fontFamily: 'var(--font-display)', color: '#1e3a5f', fontWeight: 400 }}
      >
        {children}
      </p>
      {source && (
        <cite
          className="block text-sm not-italic font-semibold tracking-wide"
          style={{ color: '#065f46', fontFamily: 'var(--font-sans)' }}
        >
          — {source}
        </cite>
      )}
    </blockquote>
  )
}

function InlineHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold" style={{ color: '#065f46', fontFamily: 'var(--font-sans)' }}>
      {children}
    </span>
  )
}

function HistoryFigure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-10 -mx-2">
      <div className="overflow-hidden rounded-xl" style={{ backgroundColor: '#d1fae5' }}>
        <img
          src={src}
          alt={caption}
          className="w-full object-cover"
          style={{ maxHeight: '400px' }}
          loading="lazy"
        />
      </div>
      <figcaption
        className="text-sm text-center mt-3 italic"
        style={{ color: '#6b7280', fontFamily: 'var(--font-display)' }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [activeSection, setActiveSection] = useState('asal-usul-nama')
  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = tocSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{ minHeight: '480px', backgroundColor: '#0c1a30' }}
      >
        <img
          src="https://images.unsplash.com/photo-1655178353433-2e774ba32ff4?w=1800&h=600&fit=crop&auto=format"
          alt="Lanskap Desa Banjarejo"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.38) saturate(0.75)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(7,15,30,0.2) 0%, rgba(7,15,30,0.5) 50%, rgba(7,15,30,0.88) 100%)' }}
          aria-hidden="true"
        />

        <div
          className="relative z-10 mt-auto w-full max-w-5xl mx-auto px-8 lg:px-12 pb-14"
          style={{ paddingTop: '96px' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(167,243,208,0.3)', color: '#a7f3d0', backgroundColor: 'rgba(6,95,70,0.28)' }}
          >
            Sejarah Desa
          </span>
          <h1
            className="text-4xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 28px rgba(0,0,0,0.45)', maxWidth: '720px' }}
          >
            Sejarah Desa Banjarejo, Kecamatan Panekan, Magetan
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span>Tim Arsip Desa Banjarejo</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span>Diperbarui Agustus 2026</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span>± 12 menit baca</span>
          </div>
        </div>
      </div>

      {/* ── Reading progress ─────────────────────────────────────────────────── */}
      <ReadingProgress articleRef={articleRef} />

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <div className="flex gap-14 items-start">

          {/* ── Sticky TOC — 25% ────────────────────────────────────────────── */}
          <aside
            className="hidden lg:block flex-shrink-0 sticky"
            style={{ width: '22%', top: '6rem' }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: '#9ca3af', fontFamily: 'var(--font-sans)', letterSpacing: '0.12em' }}
            >
              Daftar Isi
            </p>

            <nav>
              <ul className="space-y-px">
                {tocSections.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollTo(section.id)}
                        className="w-full text-left py-2 px-0 text-sm transition-all duration-200 cursor-pointer flex items-center gap-3"
                        style={{
                          color: isActive ? '#065f46' : '#9ca3af',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: isActive ? 600 : 400,
                          background: 'none',
                          border: 'none',
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-px transition-all duration-200"
                          style={{
                            height: isActive ? '20px' : '12px',
                            backgroundColor: isActive ? '#065f46' : '#e5e7eb',
                            alignSelf: 'center',
                          }}
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{section.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #f3f4f6' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#d1d5db', fontFamily: 'var(--font-sans)' }}>
                Sumber: Arsip Pemerintah Desa Banjarejo, tradisi lisan, dan penelitian lapangan.
              </p>
            </div>
          </aside>

          {/* ── Article — 75% ───────────────────────────────────────────────── */}
          <article ref={articleRef} className="flex-1 min-w-0" style={{ maxWidth: '680px' }}>

            {/* Lead */}
            <p
              className="text-xl leading-[1.85] mb-12"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#374151',
                fontWeight: 400,
              }}
            >
              Desa Banjarejo di Kecamatan Panekan, Kabupaten Magetan, Jawa Timur menyimpan jejak
              sejarah yang terpahat jauh sebelum catatan resmi dibuat. Asal usul namanya, keberadaan
              punden keramat Seringin, dan temuan arca kuno Belanga — tiga fragmen yang bersama-sama
              merangkai kisah tentang desa yang lahir dari perpaduan alam, kepercayaan, dan manusia.
            </p>

            {/* ── Section 1: Asal Usul Nama ── */}
            <SectionHeading id="asal-usul-nama">Asal Usul Nama</SectionHeading>

            <BodyParagraph>
              Nama <InlineHighlight>Banjarejo</InlineHighlight> berakar dari dua kata bahasa Jawa:
              <em> banjar</em>, yang berarti barisan atau deretan rumah, dan <em>rejo</em>, yang
              bermakna makmur atau sejahtera. Secara harfiah, Banjarejo dapat dimaknai sebagai
              "barisan rumah yang makmur" — sebuah doa leluhur yang terpatri dalam identitas desa
              sejak pertama kali komunitas ini menetap dan memberi nama pada tanah yang mereka
              tinggali.
            </BodyParagraph>

            <BodyParagraph>
              Menurut tutur lisan yang direkam dalam dokumen sejarah desa tahun 1978, penamaan ini
              konon diberikan oleh <InlineHighlight>Kyai Haji Suromenggolo</InlineHighlight> sekitar
              awal abad ke-19, tidak lama setelah sekelompok keluarga dari wilayah Madiun barat
              membuka lahan di tepian sungai kecil yang mengalir tenang di lereng Gunung Lawu.
              Mereka memilih lokasi itu karena kesuburan tanahnya dan dekatnya sumber air.
            </BodyParagraph>

            <Blockquote source="Penuturan Mbah Karso, sesepuh Desa Banjarejo, 1978">
              "Wong-wong mbiyen paring jeneng banjar, mergo omah-omahe jejer rapi kaya baris
              tentara. Rejo — supoyo subur, makmur, slamet."
              <br />
              <span className="text-base not-italic" style={{ color: '#6b7280' }}>
                ("Orang-orang dahulu memberi nama banjar karena rumah-rumah mereka berjajar rapi
                seperti barisan tentara. Rejo — agar subur, makmur, selamat.")
              </span>
            </Blockquote>

            <BodyParagraph>
              Pilihan nama itu bukan sekadar deskripsi geografis. Ia adalah pengharapan kolektif —
              bahwa tanah yang baru dibuka ini akan memberi kehidupan yang layak bagi semua yang
              menetap di sana. Nama Banjarejo bertahan melewati pergantian kekuasaan, penjajahan,
              kemerdekaan, dan modernisasi, dan hingga kini masih diucapkan dengan rasa memiliki
              oleh lebih dari dua ribu jiwa yang menghuni tiga dukuhnya: Ngasem, Ngrombo, dan Genjeng.
            </BodyParagraph>

            <HistoryFigure
              src="https://images.unsplash.com/photo-1534952965222-6b4e8dd8bd56?w=900&h=480&fit=crop&auto=format"
              caption="Gapura desa yang menghadap ke jalan utama — titik masuk ke Banjarejo yang menyimpan kisah panjang."
            />

            {/* ── Section 2: Punden Seringin ── */}
            <SectionHeading id="punden-seringin">Punden Seringin</SectionHeading>

            <BodyParagraph>
              Di sudut tenggara Dukuh Ngasem, di bawah naungan pohon beringin berusia ratusan tahun,
              terdapat situs yang oleh warga disebut <InlineHighlight>Punden Seringin</InlineHighlight>.
              Kata <em>punden</em> dalam tradisi Jawa merujuk pada tempat keramat tempat bersemayamnya
              roh para leluhur pendiri, sementara <em>seringin</em> adalah penyebutan setempat untuk
              pohon beringin (<em>Ficus benjamina</em>) yang menjadi penanda sakral.
            </BodyParagraph>

            <BodyParagraph>
              Pohon beringin di Punden Seringin dipercaya telah ada jauh sebelum desa ini berdiri.
              Lingkar batangnya mencapai lebih dari empat meter, dan akar-akar udaranya yang
              menjuntai membentuk tirai alami yang menaungi sebuah altar batu kecil di bawahnya.
              Di altar itu biasa diletakkan sesaji bunga dan kemenyan pada malam-malam tertentu
              dalam kalender Jawa.
            </BodyParagraph>

            <BodyParagraph>
              Tradisi <InlineHighlight>bersih desa</InlineHighlight> yang dilaksanakan setiap bulan
              Suro selalu dimulai dari Punden Seringin. Kepala desa beserta para sesepuh berkumpul
              di sana sebelum fajar, memanjatkan doa dan memohon keselamatan bagi seluruh warga.
              Sesudahnya, gotong royong membersihkan jalan-jalan desa dan saluran irigasi dimulai
              bersama-sama. Tradisi ini tidak pernah terputus sejak dikenal oleh generasi yang paling
              tua sekalipun.
            </BodyParagraph>

            <Blockquote source="Agus Suryanto, Kamituwo Ngasem, Agustus 2024">
              "Punden Seringin bukan sekadar pohon tua. Ia adalah pusat gravitasi budaya desa ini.
              Selama pohon itu masih berdiri, selama itulah warga Banjarejo ingat dari mana mereka berasal."
            </Blockquote>

            <BodyParagraph>
              Peneliti dari Balai Arkeologi Yogyakarta yang mengunjungi situs ini pada 2017
              mencatat bahwa altar batu di bawah Punden Seringin kemungkinan merupakan bagian dari
              struktur pemujaan era Hindu-Buddha akhir, diperkirakan dari abad ke-14 hingga ke-16.
              Lapisan kebudayaan yang saling menumpuk — dari kepercayaan animisme, pengaruh Hindu,
              hingga Islam abangan — menjadikan Punden Seringin sebagai palimpsest spiritual yang
              hidup.
            </BodyParagraph>

            <HistoryFigure
              src="https://images.unsplash.com/photo-1625501901770-29a49c5a16a3?w=900&h=480&fit=crop&auto=format"
              caption="Pohon beringin tua yang menjadi penanda keramat — serupa karakter Punden Seringin yang menjadi jantung ritual desa."
            />

            {/* ── Section 3: Arca Belanga ── */}
            <SectionHeading id="arca-belanga">Arca Belanga</SectionHeading>

            <BodyParagraph>
              Pada tahun 1963, saat penggalian fondasi balai desa yang baru, para pekerja menemukan
              sebuah benda batu yang kemudian dikenal sebagai <InlineHighlight>Arca Belanga</InlineHighlight>.
              Nama itu merujuk pada bentuknya yang menyerupai <em>belanga</em> — periuk tanah liat
              tradisional yang digunakan untuk memasak — meskipun dalam kenyataannya benda tersebut
              adalah fragmen arca batu andesit bergaya Jawa Klasik Akhir.
            </BodyParagraph>

            <BodyParagraph>
              Tingginya sekitar 60 sentimeter. Sebagian wajah dan tangan kirinya telah aus termakan
              waktu, tetapi ornamen busana dan mahkota kecil yang tersisa masih cukup jelas untuk
              diidentifikasi. Para ahli dari Universitas Gadjah Mada yang menelitinya pada 1989
              memperkirakan arca ini berasal dari abad ke-13 hingga ke-15, kemungkinan merupakan
              perwujudan tokoh dewa pelindung atau seorang raja-pendeta.
            </BodyParagraph>

            <BodyParagraph>
              Keberadaan arca ini menjadi bukti arkeologis paling konkret bahwa wilayah Banjarejo
              telah menjadi bagian dari jaringan budaya dan keagamaan Jawa jauh sebelum pembentukan
              desa secara formal. Temuan ini sekaligus menempatkan Banjarejo dalam peta arkeologi
              Magetan yang selama ini masih kurang terdokumentasi dibanding daerah-daerah lain di
              Jawa Timur.
            </BodyParagraph>

            <Blockquote source="Dr. Retno Purwanti, Balai Arkeologi Jawa Tengah, 2017">
              "Arca Belanga adalah artefak yang kehadirannya melampaui batas desa. Ia adalah
              pernyataan bahwa tempat ini pernah menjadi bagian dari peradaban yang lebih besar —
              bahwa Banjarejo bukan pinggiran, melainkan simpul dari jaringan budaya yang luas."
            </Blockquote>

            <BodyParagraph>
              Arca Belanga kini disimpan di Kantor Kepala Desa Banjarejo dalam lemari kaca khusus,
              dibuatkan duplikat replikanya dari gips untuk keperluan pameran dan pendidikan.
              Setiap tahun pada peringatan hari jadi desa, arca ini diarak keliling kampung dalam
              prosesi budaya — sebuah cara warga Banjarejo merayakan kedalaman sejarah mereka
              sendiri dengan rasa syukur dan bangga.
            </BodyParagraph>

            <BodyParagraph>
              Tiga fragmen ini — nama yang mengandung doa, pohon keramat yang menjaga ingatan
              kolektif, dan arca kuno yang membuktikan peradaban — bukan tiga cerita terpisah.
              Mereka adalah satu narasi yang saling menopang: tentang desa yang tahu siapa dirinya
              karena ia tahu dari mana ia berasal.
            </BodyParagraph>

            {/* Closing ornament */}
            <div className="flex items-center gap-4 mt-14 pt-10" style={{ borderTop: '1px solid #f3f4f6' }}>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d1fae5', outline: '1.5px solid #065f46' }} />
                ))}
              </div>
            </div>
            <p
              className="text-sm mt-5 italic leading-relaxed"
              style={{ color: '#9ca3af', fontFamily: 'var(--font-display)' }}
            >
              Dokumen sejarah ini merupakan karya hidup yang terus diperbarui. Kontribusi,
              koreksi, dan sumber primer dapat disampaikan langsung ke Kantor Desa Banjarejo,
              Kecamatan Panekan, Kabupaten Magetan.
            </p>

          </article>
        </div>
      </div>
    </div>
  )
}

// ── Reading Progress Bar ──────────────────────────────────────────────────────

function ReadingProgress({ articleRef }: { articleRef: React.RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const pct = Math.min(100, (scrolled / (el.offsetHeight - window.innerHeight)) * 100)
      setProgress(isNaN(pct) ? 0 : pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [articleRef])

  return (
    <div className="sticky z-40 h-0.5 w-full" style={{ top: '64px', backgroundColor: '#f3f4f6' }}>
      <div
        className="h-full transition-all duration-75"
        style={{ width: `${progress}%`, backgroundColor: '#065f46' }}
      />
    </div>
  )
}
