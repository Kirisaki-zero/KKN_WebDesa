import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface OrgMember {
  id?: number | string
  name: string
  position: string
  detail?: string
  initials: string
  image?: string
}

const API_BASE = 'https://desabanjarejo.my.id'

// ── Default Fallback Data ──────────────────────────────────────────────────

const defaultKepalaDesa: OrgMember = {
  name: 'JANTI',
  position: 'KEPALA DESA',
  initials: 'J',
  detail: 'Kepala Desa Janti',
}

const defaultKasiPelayanan: OrgMember = {
  name: 'SUTRISNO',
  position: 'KASI PELAYANAN',
  initials: 'ST',
}

const defaultKasiPemerintahan: OrgMember = {
  name: 'SUPRIYANTO',
  position: 'KASI PEMERINTAHAN',
  initials: 'SP',
}

const defaultStafPemerintahan: OrgMember = {
  name: 'MUJI',
  position: 'STAF',
  initials: 'MJ',
}

const defaultKasiKesejahteraan: OrgMember = {
  name: 'SUPONO',
  position: 'KASI KESEJAHTERAAN',
  initials: 'SP',
}

const defaultSekretarisDesa: OrgMember = {
  name: 'EVY NURDIANI',
  position: 'SEKRETARIS DESA',
  initials: 'EN',
}

const defaultKaurKeuangan: OrgMember = {
  name: 'KUSNO',
  position: 'KAUR KEUANGAN',
  initials: 'KS',
}

const defaultKaurTU: OrgMember = {
  name: 'SUNARTO',
  position: 'KAUR TATA USAHA & UMUM',
  initials: 'SN',
}

const defaultKaurPerencanaan: OrgMember = {
  name: 'NANI APRILIANTO',
  position: 'KAUR PERENCANAAN',
  initials: 'NA',
}

const defaultKamituwoList: OrgMember[] = [
  { name: 'DIDIK SETYAWAN', position: 'KAMITUWO', initials: 'DS' },
  { name: 'GUNAWAN, AN', position: 'KAMITUWO', initials: 'GA' },
  { name: 'DAWAM ANSORI', position: 'KAMITUWO', initials: 'DA' },
]

// Helper untuk generate inisial otomatis dari nama
function getInitials(name: string): string {
  if (!name) return 'PD'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

// ── Header Card Component matching government chart style ────────────────

interface CardProps {
  member: OrgMember
  size?: 'lg' | 'md' | 'sm'
  accentColor?: string
}

function OrgCard({ member, size = 'md', accentColor = 'bg-emerald-700' }: CardProps) {
  const avatarSize = size === 'lg' ? 'w-16 h-16 text-xl' : size === 'md' ? 'w-12 h-12 text-sm' : 'w-10 h-10 text-xs'
  const nameFontSize = size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : 'text-xs'

  return (
    <div
      className="flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 w-full text-center"
      style={{
        boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
      }}
    >
      {/* Top Green Badge (matches theme header) */}
      <div className={`${accentColor} text-white font-bold py-1.5 px-3 text-xs tracking-wider uppercase flex items-center justify-center min-h-[30px]`}>
        {member.position}
      </div>

      {/* Card Content */}
      <div className="p-3 lg:p-4 flex flex-col items-center justify-center flex-1 bg-gradient-to-b from-white to-slate-50">
        {/* Officer Avatar standard */}
        <div
          className={`${avatarSize} rounded-full flex items-center justify-center font-bold text-slate-700 bg-emerald-50 border-2 border-emerald-500/30 mb-2 flex-shrink-0 relative overflow-hidden`}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none'
              }}
            />
          ) : (
            <span className="text-emerald-800">{member.initials}</span>
          )}
        </div>

        {/* Name */}
        <h3
          className={`${nameFontSize} font-bold text-slate-800 tracking-wide uppercase leading-tight`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {member.name}
        </h3>

        {member.detail && (
          <p className="text-[11px] text-slate-500 mt-0.5">{member.detail}</p>
        )}
      </div>
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────

function TierLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-slate-200" />
      <span className="text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [perangkatList, setPerangkatList] = useState<OrgMember[]>([])
  const [loading, setLoading] = useState(true)
  const [profilData, setProfilData] = useState<{
    sejarah?: string
    visi?: string
    misi_1?: string
    misi_2?: string
    misi_3?: string
    misi_4?: string
  } | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    // 1. Sync Langsung dari Editan Web Admin (LocalStorage)
    try {
      const savedNodes = localStorage.getItem('banjarejo_struktur_nodes')
      if (savedNodes) {
        const parsed = JSON.parse(savedNodes)
        const mappedFromLocal: OrgMember[] = Object.values(parsed).map((node: any) => ({
          id: node.id,
          name: node.nama,
          position: node.jabatan,
          detail: node.sub || undefined,
          initials: node.inisial || getInitials(node.nama),
        }))
        if (isMounted && mappedFromLocal.length > 0) {
          setPerangkatList(mappedFromLocal)
        }
      }

      const savedProfil = localStorage.getItem('banjarejo_profil_text')
      if (savedProfil) {
        const parsedProfil = JSON.parse(savedProfil)
        setProfilData({
          sejarah: parsedProfil.sejarah,
          visi: parsedProfil.visi,
          misi_1: parsedProfil.misi1,
          misi_2: parsedProfil.misi2,
          misi_3: parsedProfil.misi3,
          misi_4: parsedProfil.misi4,
        })
      }
    } catch (e) {
      console.warn('LocalStorage sync error:', e)
    }

    // 2. Fetch Data dari Database Backend MySQL (jika tabel MySQL sudah ada)
    fetch(`${API_BASE}/api/perangkat`)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP Status ' + res.status)
        return res.json()
      })
      .then((data) => {
        const rawList = Array.isArray(data) ? data : (data.data || [])
        if (isMounted && Array.isArray(rawList) && rawList.length > 0) {
          const mapped: OrgMember[] = rawList.map((item: any) => ({
            id: item.id_perangkat || item.id || item.kode_key,
            name: item.nama_lengkap || item.nama,
            position: item.jabatan,
            detail: item.sub_keterangan || undefined,
            initials: item.inisial || getInitials(item.nama_lengkap || item.nama),
            image: item.foto_url || undefined,
          }))
          setPerangkatList(mapped)
        }
      })
      .catch((err) => {
        console.warn('MySQL Backend /api/perangkat belum siap:', err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    fetch(`${API_BASE}/api/profil`)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP Status ' + res.status)
        return res.json()
      })
      .then((data) => {
        if (isMounted && data && data.sejarah) {
          setProfilData(data)
        }
      })
      .catch(() => { })

    return () => {
      isMounted = false
    }
  }, [])

  // Helper matcher
  const findMember = (keywords: string[], fallback: OrgMember): OrgMember => {
    if (perangkatList.length === 0) return fallback
    const found = perangkatList.find((m) =>
      keywords.some((k) => m.position.toLowerCase().includes(k.toLowerCase()))
    )
    return found || fallback
  }

  const findMembers = (keywords: string[], fallback: OrgMember[]): OrgMember[] => {
    if (perangkatList.length === 0) return fallback
    const matched = perangkatList.filter((m) =>
      keywords.some((k) => m.position.toLowerCase().includes(k.toLowerCase()))
    )
    return matched.length > 0 ? matched : fallback
  }

  const kepalaDesa = findMember(['kepala desa', 'kades'], defaultKepalaDesa)
  const kasiPelayanan = findMember(['pelayanan'], defaultKasiPelayanan)
  const kasiPemerintahan = findMember(['pemerintahan'], defaultKasiPemerintahan)
  const stafPemerintahan = findMember(['staf'], defaultStafPemerintahan)
  const kasiKesejahteraan = findMember(['kesejahteraan'], defaultKasiKesejahteraan)
  const sekretarisDesa = findMember(['sekretaris'], defaultSekretarisDesa)
  const kaurKeuangan = findMember(['keuangan'], defaultKaurKeuangan)
  const kaurTU = findMember(['tata usaha', 'tu'], defaultKaurTU)
  const kaurPerencanaan = findMember(['perencanaan'], defaultKaurPerencanaan)
  const kamituwoList = findMembers(['kamituwo'], defaultKamituwoList)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Page header */}
      <div className="relative overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-14 lg:py-16 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-950/40">
            Struktur Organisasi
          </span>
          <h1
            className="text-3xl lg:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pemerintah Desa Banjarejo
          </h1>
          <p className="text-sm text-slate-400">
            Bagan Struktur Organisasi dan Tata Kerja Pemerintah Desa Banjarejo
          </p>
        </div>
      </div>

      {/* Main Org Chart Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Desktop Visual Tree / Mobile Grid Layout */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm mb-12 relative">

          {loading && (
            <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Menghubungkan data backend...
            </div>
          )}

          <div className="text-center mb-8 border-b pb-4 border-slate-100">
            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
              Bagan Struktur Organisasi Desa Banjarejo
            </h2>
            <p className="text-xs text-slate-500 mt-1">Sesuai Susunan Penyelenggara Pemerintahan Desa</p>
          </div>

          {/* Tier 1: Kepala Desa */}
          <div className="flex justify-center mb-8 relative">
            <div className="w-64 max-w-full">
              <OrgCard member={kepalaDesa} size="lg" accentColor="bg-emerald-700" />
            </div>
          </div>

          {/* Connecting Line Down from Kepala Desa */}
          <div className="hidden md:block w-0.5 h-8 bg-slate-300 mx-auto -mt-6 mb-2" />

          {/* Horizontal Connector Line for Kasi vs Sekretaris */}
          <div className="hidden md:block relative max-w-4xl mx-auto h-0.5 bg-slate-300 mb-8">
            <div className="absolute left-1/2 -top-2 w-0.5 h-2 bg-slate-300" />
          </div>

          {/* Tier 2: Kasi Side (Left) and Sekretaris Side (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">

            {/* LEFT COLUMN: Kasi Group */}
            <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <div className="text-xs font-bold text-slate-500 tracking-wider uppercase text-center border-b border-slate-200 pb-2">
                Unsur Pelaksana (KASI)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Kasi Pelayanan */}
                <OrgCard member={kasiPelayanan} size="sm" accentColor="bg-emerald-700" />

                {/* Kasi Pemerintahan + Staf */}
                <div className="flex flex-col items-center gap-3">
                  <OrgCard member={kasiPemerintahan} size="sm" accentColor="bg-emerald-700" />

                  {/* Connector Line to Staf */}
                  <div className="w-0.5 h-3 bg-slate-300 -my-1" />

                  {/* Staf Muji */}
                  <OrgCard member={stafPemerintahan} size="sm" accentColor="bg-emerald-800" />
                </div>

                {/* Kasi Kesejahteraan */}
                <OrgCard member={kasiKesejahteraan} size="sm" accentColor="bg-emerald-700" />
              </div>
            </div>

            {/* RIGHT COLUMN: Sekretaris Desa & Kaur Group */}
            <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <div className="text-xs font-bold text-slate-500 tracking-wider uppercase text-center border-b border-slate-200 pb-2">
                Unsur Sekretariat (SEKRETARIS & KAUR)
              </div>

              {/* Sekretaris Desa */}
              <div className="w-full max-w-xs mx-auto">
                <OrgCard member={sekretarisDesa} size="md" accentColor="bg-emerald-700" />
              </div>

              {/* Connector Line to Kaur */}
              <div className="hidden sm:block w-0.5 h-3 bg-slate-300 mx-auto -my-3" />

              {/* Kaur Grid (3 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <OrgCard member={kaurKeuangan} size="sm" accentColor="bg-emerald-700" />
                <OrgCard member={kaurTU} size="sm" accentColor="bg-emerald-700" />
                <OrgCard member={kaurPerencanaan} size="sm" accentColor="bg-emerald-700" />
              </div>
            </div>

          </div>

          <TierLabel label="Unsur Kewilayahan (Kamituwo)" />

          {/* Tier 3: Kamituwo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {kamituwoList.map((kamituwo, idx) => (
              <OrgCard key={kamituwo.id || `${kamituwo.name}-${idx}`} member={kamituwo} size="md" accentColor="bg-emerald-700" />
            ))}
          </div>

        </div>

        {/* Additional Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-3 text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
              Sejarah & Profil Singkat Desa
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {profilData?.sejarah ||
                'Desa Banjarejo bermula dari pemukiman legendaris di lereng Gunung Lawu yang subur dan kaya akan sumber daya alam. Kata "Banjarejo" berasal dari paduan kata "Banjar" yang bermakna kelompok pemukiman dan "Rejo" yang bermakna ramai serta makmur.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-3 text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
              Visi & Misi Desa
            </h2>
            <p className="text-sm font-semibold text-emerald-800 mb-2">
              <strong>Visi:</strong> {profilData?.visi || 'Terwujudnya Desa Banjarejo yang Mandiri, Sejahtera, Berdaya Saing, dan Berkelanjutan.'}
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc pl-5">
              {profilData?.misi_1 && <li>{profilData.misi_1}</li>}
              {profilData?.misi_2 && <li>{profilData.misi_2}</li>}
              {profilData?.misi_3 && <li>{profilData.misi_3}</li>}
              {profilData?.misi_4 && <li>{profilData.misi_4}</li>}
              {!profilData && (
                <>
                  <li>Meningkatkan tata kelola pemerintahan desa yang transparan dan berbasis digital.</li>
                  <li>Mengembangkan ekonomi warga melalui UMKM dan BUMDes.</li>
                  <li>Memperkuat infrastruktur dan pengawasan sarana umum.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-12 pt-6 border-t border-slate-200 text-slate-400">
          Pemerintah Desa Banjarejo · Bagan Struktur Organisasi Resmi
        </p>
      </div>
    </div>
  )
}
