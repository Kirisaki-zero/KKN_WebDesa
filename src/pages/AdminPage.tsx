import { useState, useEffect } from 'react';

interface RequestItem {
  id_surat: number;
  nomor_pelacakan: string;
  jenis_layanan: string;
  status: 'PENDING' | 'PROSES' | 'SELESAI' | 'DITOLAK';
  tanggal_pengajuan: string;
  keterangan?: string;
  nama_lengkap: string;
  nik: string;
  dukuh: string;
}

interface SearchResult {
  warga: Array<{ title: string; type: string; url: string; refId: string }>;
  surat: Array<{ title: string; type: string; url: string; refId: string }>;
  konten: Array<{ title: string; type: string; url: string; refId: string }>;
}

export default function AdminPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [statusUpdating, setStatusUpdating] = useState<boolean>(false);

  // Fetch admin service requests list
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/services/admin/list');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRequests(json.data);
      }
    } catch (err) {
      console.warn('Failed to fetch from backend API, using fallback initial data:', err);
      setRequests([
        {
          id_surat: 1,
          nomor_pelacakan: 'RESI-20260906-8A1X',
          jenis_layanan: 'Surat_Keterangan',
          status: 'PENDING',
          tanggal_pengajuan: new Date().toISOString(),
          keterangan: 'Keperluan Pembuatan SIM C',
          nama_lengkap: 'Budi Santoso',
          nik: '3520011204900001',
          dukuh: 'Ngasem'
        },
        {
          id_surat: 2,
          nomor_pelacakan: 'RESI-20260905-9B2Y',
          jenis_layanan: 'Akta_Kelahiran',
          status: 'PROSES',
          tanggal_pengajuan: new Date(Date.now() - 86400000).toISOString(),
          keterangan: 'Pengurusan Akta Kelahiran Anak',
          nama_lengkap: 'Siti Aminah',
          nik: '3520014508950002',
          dukuh: 'Ngrombo'
        },
        {
          id_surat: 3,
          nomor_pelacakan: 'RESI-20260904-7C3Z',
          jenis_layanan: 'Izin_Usaha',
          status: 'SELESAI',
          tanggal_pengajuan: new Date(Date.now() - 172800000).toISOString(),
          keterangan: 'Izin Usaha Mikro Kerupuk Puli',
          nama_lengkap: 'Slamet Riyadi',
          nik: '3520011010880003',
          dukuh: 'Genjeng'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Omnisearch trigger
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(searchQuery)}`);
        const json = await res.json();
        if (json.success) {
          setSearchResults(json.results);
        }
      } catch (err) {
        console.warn('Search query failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update status handler
  const handleUpdateStatus = async (id: number, newStatus: 'PENDING' | 'PROSES' | 'SELESAI' | 'DITOLAK') => {
    setStatusUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/services/admin/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setRequests(prev => prev.map(r => r.id_surat === id ? { ...r, status: newStatus } : r));
        if (selectedRequest && selectedRequest.id_surat === id) {
          setSelectedRequest({ ...selectedRequest, status: newStatus });
        }
      }
    } catch (err) {
      console.warn('Backend update failed, updating UI state directly:', err);
      setRequests(prev => prev.map(r => r.id_surat === id ? { ...r, status: newStatus } : r));
      if (selectedRequest && selectedRequest.id_surat === id) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }
    } finally {
      setStatusUpdating(false);
    }
  };

  const filteredRequests = requests.filter(r => {
    if (filterStatus === 'Semua') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-[#0c1a30] text-white pt-10 pb-16 px-6 lg:px-10 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 border border-emerald-800 text-emerald-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Dasbor Operasional Perangkat Desa
            </div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Pusat Kendali Administrasi &amp; Surat
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Desa Banjarejo · Kecamatan Panekan · Kabupaten Magetan
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-navy-900/80 border border-white/10 px-4 py-3 rounded-xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-emerald-400">{requests.length}</div>
              <div className="text-xs text-gray-400">Total Permohonan</div>
            </div>
            <div className="bg-navy-900/80 border border-amber-500/20 px-4 py-3 rounded-xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-amber-400">{requests.filter(r => r.status === 'PENDING').length}</div>
              <div className="text-xs text-gray-400">Perlu Diproses</div>
            </div>
          </div>
        </div>

        {/* Omnisearch Bar */}
        <div className="max-w-7xl mx-auto mt-8 relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Omnisearch Global: ketik NIK, Nomor Resi, Nama Warga, atau 'surat'..."
              className="w-full bg-white/10 text-white placeholder-gray-400 text-sm px-5 py-3.5 pl-12 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/15 transition-all"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {isSearching && (
              <span className="absolute right-4 top-3.5 text-xs text-emerald-400 animate-pulse">Mencari...</span>
            )}
          </div>

          {/* Omnisearch Dropdown Result */}
          {searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 p-4 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Hasil Pencarian Global MySQL (`search_index`)</span>
                <button onClick={() => setSearchResults(null)} className="text-xs text-gray-400 hover:text-gray-600">Tutup</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Warga */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 block mb-2">🧑‍🤝‍🧑 Data Kependudukan ({searchResults.warga.length})</span>
                  {searchResults.warga.length === 0 ? <p className="text-xs text-gray-400">Tidak ada pencocokan</p> : (
                    searchResults.warga.map((item, idx) => (
                      <div key={idx} className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer py-1">
                        {item.title}
                      </div>
                    ))
                  )}
                </div>
                {/* Surat */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 block mb-2">📄 Layanan Surat ({searchResults.surat.length})</span>
                  {searchResults.surat.length === 0 ? <p className="text-xs text-gray-400">Tidak ada pencocokan</p> : (
                    searchResults.surat.map((item, idx) => (
                      <div key={idx} className="text-xs font-medium text-blue-700 hover:underline cursor-pointer py-1">
                        {item.title}
                      </div>
                    ))
                  )}
                </div>
                {/* Konten */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 block mb-2">📰 Konten / Berita ({searchResults.konten.length})</span>
                  {searchResults.konten.length === 0 ? <p className="text-xs text-gray-400">Tidak ada pencocokan</p> : (
                    searchResults.konten.map((item, idx) => (
                      <div key={idx} className="text-xs font-medium text-gray-700 hover:underline cursor-pointer py-1">
                        {item.title}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Table Toolbar & Filters */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Daftar Permohonan Surat Warga</h2>
              <p className="text-xs text-gray-500">Kelola dan verifikasi berkas permohonan administrasi desa</p>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-200/70 p-1 rounded-xl">
              {['Semua', 'PENDING', 'PROSES', 'SELESAI', 'DITOLAK'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-white text-emerald-800 shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100/70 text-gray-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                  <th className="py-3.5 px-6">No. Resi</th>
                  <th className="py-3.5 px-6">Nama Pemohon</th>
                  <th className="py-3.5 px-6">NIK</th>
                  <th className="py-3.5 px-6">Jenis Layanan</th>
                  <th className="py-3.5 px-6">Dukuh</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400 text-xs">Memuat data permohonan...</td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400 text-xs">Tidak ada permohonan surat dalam kategori ini.</td>
                  </tr>
                ) : (
                  filteredRequests.map(req => (
                    <tr key={req.id_surat} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-gray-800">{req.nomor_pelacakan}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">{req.nama_lengkap}</td>
                      <td className="py-4 px-6 text-gray-500 font-mono text-xs">{req.nik}</td>
                      <td className="py-4 px-6 text-gray-800 font-semibold">{req.jenis_layanan.replace(/_/g, ' ')}</td>
                      <td className="py-4 px-6 text-gray-600">{req.dukuh}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                          req.status === 'PROSES' ? 'bg-blue-100 text-blue-800' :
                          req.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => { setSelectedRequest(req); setIsDetailModalOpen(true); }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all border border-emerald-200"
                        >
                          Kelola / Terbitkan
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail & Status Action Modal */}
      {isDetailModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                📄
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Detail Permohonan Surat</h3>
                <p className="text-xs font-mono text-emerald-700 font-semibold">{selectedRequest.nomor_pelacakan}</p>
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl text-xs text-gray-700 mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Nama Pemohon:</span>
                <span className="font-bold text-gray-900">{selectedRequest.nama_lengkap}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">NIK:</span>
                <span className="font-mono">{selectedRequest.nik}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Dukuh / Wilayah:</span>
                <span className="font-medium">{selectedRequest.dukuh}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Jenis Layanan:</span>
                <span className="font-bold text-emerald-800">{selectedRequest.jenis_layanan.replace(/_/g, ' ')}</span>
              </div>
              {selectedRequest.keterangan && (
                <div className="pt-1">
                  <span className="text-gray-500 block mb-1">Keperluan / Keterangan:</span>
                  <p className="italic bg-white p-2 rounded border border-gray-200">{selectedRequest.keterangan}</p>
                </div>
              )}
            </div>

            {/* Change Status Action */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Ubah Status Permohonan:</label>
              <div className="grid grid-cols-2 gap-2">
                {(['PENDING', 'PROSES', 'SELESAI', 'DITOLAK'] as const).map(st => (
                  <button
                    key={st}
                    disabled={statusUpdating}
                    onClick={() => handleUpdateStatus(selectedRequest.id_surat, st)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      selectedRequest.status === st
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {st === 'SELESAI' ? '✅ SELESAI' : st === 'PROSES' ? '⏳ PROSES' : st === 'DITOLAK' ? '❌ DITOLAK' : '⏸ PENDING'}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3 border-t">
              <a
                href={`http://localhost:5000/api/services/pdf/${selectedRequest.id_surat}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
              >
                🖨️ Terbitkan &amp; Pratinjau PDF
              </a>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="py-3 px-4 rounded-xl text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
