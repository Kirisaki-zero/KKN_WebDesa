// ── Types ─────────────────────────────────────────────────────────────────────

interface OrgMember {
  name: string
  position: string
  detail: string
  initials: string
  avatarFrom: string
  avatarTo: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const headVillage: OrgMember = {
  name: 'Sudarmanto, S.Sos.',
  position: 'Kepala Desa',
  detail: 'Menjabat sejak 2021',
  initials: 'SD',
  avatarFrom: '#065f46',
  avatarTo: '#047857',
}

const secondTier: OrgMember[] = [
  {
    name: 'Sri Wahyuni, A.Md.',
    position: 'Sekretaris Desa',
    detail: 'Menjabat sejak 2019',
    initials: 'SW',
    avatarFrom: '#1e3a5f',
    avatarTo: '#2a5080',
  },
  {
    name: 'Hadi Susanto, S.H.',
    position: 'Ketua BPD',
    detail: 'Periode 2020–2026',
    initials: 'HS',
    avatarFrom: '#1a3258',
    avatarTo: '#1e3a5f',
  },
]

const kamituwo: OrgMember[] = [
  {
    name: 'Agus Suryanto',
    position: 'Kamituwo Ngasem',
    detail: 'Dukuh Ngasem',
    initials: 'AS',
    avatarFrom: '#065f46',
    avatarTo: '#0a7c5c',
  },
  {
    name: 'Joko Purnomo',
    position: 'Kamituwo Ngrombo',
    detail: 'Dukuh Ngrombo',
    initials: 'JP',
    avatarFrom: '#1e3a5f',
    avatarTo: '#2a5080',
  },
  {
    name: 'Ratna Sari, S.Pd.',
    position: 'Kamituwo Genjeng',
    detail: 'Dukuh Genjeng',
    initials: 'RS',
    avatarFrom: '#065f46',
    avatarTo: '#0a7c5c',
  },
]

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  member: OrgMember
  size?: 'lg' | 'md' | 'sm'
}

function ProfileCard({ member, size = 'md' }: CardProps) {
  const avatarSize  = size === 'lg' ? 'w-28 h-28 text-3xl' : size === 'md' ? 'w-20 h-20 text-xl' : 'w-16 h-16 text-base'
  const nameFontSize = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'
  const padding     = size === 'lg' ? 'px-10 py-9' : size === 'md' ? 'px-7 py-6' : 'px-5 py-5'

  return (
    <div
      className={`flex flex-col items-center text-center bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${padding}`}
      style={{
        borderColor: '#e2ede8',
        boxShadow: '0 4px 24px rgba(6,95,70,0.08), 0 1px 4px rgba(6,95,70,0.04)',
      }}
    >
      {/* Avatar */}
      <div
        className={`${avatarSize} rounded-full flex items-center justify-center font-bold text-white mb-4 flex-shrink-0 ring-4 ring-white`}
        style={{
          background: `linear-gradient(135deg, ${member.avatarFrom}, ${member.avatarTo})`,
          boxShadow: `0 6px 20px ${member.avatarFrom}40`,
        }}
      >
        {member.initials}
      </div>

      {/* Position badge */}
      <span
        className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide mb-2"
        style={{ backgroundColor: '#f0f7f3', color: '#065f46' }}
      >
        {member.position}
      </span>

      {/* Name */}
      <h3
        className={`${nameFontSize} font-bold leading-snug mb-1`}
        style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}
      >
        {member.name}
      </h3>

      {/* Detail */}
      <p className="text-xs" style={{ color: '#6b8f7b' }}>
        {member.detail}
      </p>
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────

function TierLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px" style={{ backgroundColor: '#d4e4d8' }} />
      <span
        className="text-xs font-semibold tracking-widest uppercase px-4"
        style={{ color: '#9ab8a8' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: '#d4e4d8' }} />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f9f6' }}>

      {/* Page header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#0c1a30' }}>
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
          style={{ background: 'linear-gradient(90deg, #065f46, #1e3a5f)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(167,243,208,0.3)', color: '#a7f3d0', backgroundColor: 'rgba(6,95,70,0.25)' }}
          >
            Profil Desa
          </span>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pemerintahan Desa Banjarejo
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Desa Banjarejo · Kecamatan Panekan · Kabupaten Magetan · Jawa Timur
          </p>
        </div>
      </div>

      {/* Org chart */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-14 lg:py-20">

        {/* Tier 1 — Kepala Desa */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <ProfileCard member={headVillage} size="lg" />
          </div>
        </div>

        <TierLabel label="Perangkat Desa" />

        {/* Tier 2 — Sekretaris + BPD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          {secondTier.map((m) => (
            <ProfileCard key={m.name} member={m} size="md" />
          ))}
        </div>

        <TierLabel label="Kepala Dukuh" />

        {/* Tier 3 — Kamituwo (exactly 3 dukuh) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {kamituwo.map((m) => (
            <ProfileCard key={m.name} member={m} size="sm" />
          ))}
        </div>

        {/* ── Additional Info Sections ── */}
        
        <div id="profil-desa" className="mt-20 pt-10 border-t border-emerald-900/10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>Profil Desa</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#4a6475' }}>
            Desa Banjarejo adalah sebuah desa agraris yang terletak di Kecamatan Panekan, Kabupaten Magetan. Dengan luas wilayah sekitar 147 Hektar, desa ini menjadi rumah bagi lebih dari 2.800 jiwa yang mayoritas bermatapencaharian sebagai petani dan pelaku UMKM. Desa Banjarejo memiliki tiga dukuh utama: Ngasem, Ngrombo, dan Genjeng, masing-masing dengan keunikan budaya dan potensi ekonomi yang khas.
          </p>
        </div>

        <div id="apbdes" className="mt-12 pt-10 border-t border-emerald-900/10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>APBDes Publik</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a6475' }}>
            Sebagai bentuk transparansi pemerintahan, berikut adalah ringkasan Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun 2026:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border transition-shadow hover:shadow-md" style={{ borderColor: '#e2ede8' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#0a7c5c' }}>Pendapatan Desa</p>
              <p className="text-2xl font-bold" style={{ color: '#0c1a30' }}>Rp 1.450.000.000</p>
            </div>
            <div className="bg-white p-5 rounded-xl border transition-shadow hover:shadow-md" style={{ borderColor: '#e2ede8' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#1e3a5f' }}>Belanja Desa</p>
              <p className="text-2xl font-bold" style={{ color: '#0c1a30' }}>Rp 1.425.000.000</p>
            </div>
          </div>
        </div>

        <div id="komunitas" className="mt-12 pt-10 border-t border-emerald-900/10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>Program Komunitas</h2>
          <ul className="list-disc pl-5 text-sm space-y-3" style={{ color: '#4a6475' }}>
            <li><strong>Pemberdayaan UMKM:</strong> Pelatihan rutin bagi pelaku usaha mikro di ketiga dukuh untuk digitalisasi.</li>
            <li><strong>Posyandu & Kesehatan:</strong> Pemeriksaan gratis untuk balita dan lansia setiap bulan di balai desa.</li>
            <li><strong>Kerja Bakti Rutin:</strong> Pembersihan fasilitas umum dan saluran irigasi secara gotong royong setiap minggu pertama.</li>
          </ul>
        </div>

        <div id="peraturan" className="mt-12 pt-10 border-t border-emerald-900/10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#0c1a30' }}>Peraturan Desa</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#4a6475' }}>
            Seluruh produk hukum, Peraturan Desa (Perdes), dan Surat Keputusan Kepala Desa dapat diakses secara publik oleh warga di Kantor Pelayanan Desa pada jam kerja operasional. Kami berkomitmen untuk selalu mensosialisasikan peraturan baru melalui forum musyawarah tingkat RT/RW.
          </p>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-16 pt-8 border-t" style={{ borderColor: '#d4e4d8', color: '#9ab8a8' }}>
          Data diperbarui: Agustus 2026 · Pemerintah Desa Banjarejo, Kec. Panekan, Kab. Magetan
        </p>
      </div>
    </div>
  )
}
