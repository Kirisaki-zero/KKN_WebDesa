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

const services = [
  {
    id: 1,
    label: 'Surat Keterangan',
    description: 'Domisili, tidak mampu, kelakuan baik, dan keterangan lainnya',
    icon: <SuratIcon />,
    duration: '1–2 hari kerja',
    online: true,
  },
  {
    id: 2,
    label: 'Akta Kelahiran',
    description: 'Pengurusan akta kelahiran untuk warga baru Desa Banjarejo',
    icon: <AktaIcon />,
    duration: '3–5 hari kerja',
    online: true,
  },
  {
    id: 3,
    label: 'Sertifikat Tanah',
    description: 'Pengesahan dan legalisasi kepemilikan lahan di wilayah desa',
    icon: <TanahIcon />,
    duration: '7–14 hari kerja',
    online: false,
  },
  {
    id: 4,
    label: 'Izin Usaha',
    description: 'SIUP mikro dan izin operasional usaha dalam kawasan desa',
    icon: <IzinIcon />,
    duration: '3–7 hari kerja',
    online: true,
  },
  {
    id: 5,
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
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
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
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

          {/* 5-card grid: 1 col → 2 col → 3 col → 5 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
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
                {/* Connector line */}
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

          {/* Requirements */}
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
            <p className="text-xs mt-5 leading-relaxed" style={{ color: '#9ab8a8' }}>
              Persyaratan tambahan dapat berbeda tergantung jenis layanan. Hubungi kantor desa untuk informasi lebih lanjut.
            </p>
          </div>

          {/* Office hours + contact */}
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

            <div
              className="pt-5 border-t flex flex-col gap-3"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#065f46' }}>
                Hubungi Kami
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Telp: <span className="text-white font-medium">(0351) 123-456</span>
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Email: <span className="text-white font-medium">info@desabanjarejo.go.id</span>
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Desa Banjarejo, Kec. Panekan, Kab. Magetan, Jawa Timur 63362
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Service Card ──────────────────────────────────────────────────────────────

interface ServiceData {
  id: number
  label: string
  description: string
  icon: React.ReactNode
  duration: string
  online: boolean
}

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <div
      className="group flex flex-col items-center text-center bg-white rounded-2xl px-6 pt-10 pb-8 border cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        borderColor: '#e8f0eb',
        boxShadow: '0 2px 16px rgba(6,95,70,0.07)',
      }}
    >
      {/* Icon circle */}
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

      {/* Label */}
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

      {/* Description */}
      <p
        className="text-xs leading-relaxed mb-6 flex-1"
        style={{ color: '#6b7f8a' }}
      >
        {service.description}
      </p>

      {/* Footer meta */}
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

      {/* Hover CTA */}
      <div
        className="mt-5 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#065f46' }}
      >
        Ajukan Sekarang <ArrowRight />
      </div>
    </div>
  )
}
