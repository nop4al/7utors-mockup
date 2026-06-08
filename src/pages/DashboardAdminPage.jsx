import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/Card'
import Button from '../components/Button'

/* ===== Icons (Lucide/Heroicons SVG) ===== */
const Icons = {
  Dashboard: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  Calendar: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
  Users: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  UserCircle: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Briefcase: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
  Money: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V4.22c0-.756-.728-1.296-1.453-1.096a59.769 59.769 0 00-15.797 2.101c-.728.198-1.096.924-1.096 1.651v10.122c0 .727.368 1.453 1.096 1.651zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Activity: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  Logout: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>,
  Menu: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>,
  Check: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  Eye: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  XCircle: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Bell: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
  Book: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
}

/* ===== Dummy Data ===== */
const stats = [
  { label: 'Total Siswa', value: '340', icon: <Icons.Users />, bg: '#eef0ff', accent: '#006397' },
  { label: 'Total Tentor', value: '45', icon: <Icons.UserCircle />, bg: '#fff4e5', accent: '#825500' },
  { label: 'Kelas Aktif Hari Ini', value: '12', icon: <Icons.Briefcase />, bg: 'rgba(65,215,122,0.15)', accent: '#006d36' },
  { label: 'Pendapatan Bulan Ini', value: 'Rp 45.000.000', icon: <Icons.Money />, bg: '#eef0ff', accent: '#006397' },
]

const siswaData = [
  { id: 1, name: 'Ahmad Maulana', grade: 'Kelas 10', status: 'Aktif' },
  { id: 2, name: 'Clara Jesica', grade: 'Kelas 12', status: 'Aktif' },
  { id: 3, name: 'Budi Santoso', grade: 'Kelas 11', status: 'Menunggu Verifikasi' },
  { id: 4, name: 'Siti Aminah', grade: 'Kelas 9', status: 'Aktif' },
  { id: 5, name: 'Dewi Lestari', grade: 'Kelas 12', status: 'Menunggu Verifikasi' },
]

const tentorData = [
  { id: 1, name: 'Rina Amelia', subjects: ['Matematika', 'Fisika'], status: 'Aktif' },
  { id: 2, name: 'Bambang Pamungkas', subjects: ['Biologi', 'Kimia'], status: 'Aktif' },
  { id: 3, name: 'Sri Wahyuni', subjects: ['Bahasa Inggris'], status: 'Aktif' },
]

const withdrawalDataInit = [
  { id: 'WD-001', tentor: 'Rina Amelia', amount: 2450000, date: '5 Juni 2026', status: 'Menunggu' },
  { id: 'WD-002', tentor: 'Bambang Pamungkas', amount: 3200000, date: '4 Juni 2026', status: 'Selesai' },
  { id: 'WD-003', tentor: 'Sri Wahyuni', amount: 1500000, date: '5 Juni 2026', status: 'Menunggu' },
]

const pemantauanData = [
  { id: 1, class: 'Matematika Privat', tentor: 'Rina Amelia', siswa: 'Ahmad Maulana', date: '5 Juni 2026', evalScore: '85/100', absensi: 'Hadir' },
  { id: 2, class: 'Biologi Umum', tentor: 'Bambang Pamungkas', siswa: 'Clara Jesica', date: '4 Juni 2026', evalScore: '90/100', absensi: 'Hadir' },
  { id: 3, class: 'Fisika Privat', tentor: 'Rina Amelia', siswa: 'Siti Aminah', date: '4 Juni 2026', evalScore: 'Belum Dinilai', absensi: 'Hadir' },
]

const sidebarItems = [
  { id: 'dashboard', icon: <Icons.Dashboard />, label: 'Dashboard' },
  { id: 'kelola-siswa', icon: <Icons.Users />, label: 'Kelola Siswa' },
  { id: 'kelola-tentor', icon: <Icons.UserCircle />, label: 'Kelola Tentor' },
  { id: 'penjadwalan', icon: <Icons.Calendar />, label: 'Penjadwalan' },
  { id: 'modul-belajar', icon: <Icons.Book />, label: 'Modul Belajar' },
  { id: 'keuangan', icon: <Icons.Money />, label: 'Keuangan' },
  { id: 'pemantauan', icon: <Icons.Eye />, label: 'Pemantauan' },
]

const modulData = [
  { id: 'MOD-01', title: 'Matematika: Trigonometri Dasar', type: 'Modul Materi', grade: 'Kelas 10', subject: 'Matematika', date: '2 Jun 2026' },
  { id: 'MOD-02', title: 'Biologi: Sel dan Jaringan', type: 'Rangkuman', grade: 'Kelas 11', subject: 'Biologi', date: '3 Jun 2026' },
  { id: 'MOD-03', title: 'Bank Soal UTBK Fisika 2025', type: 'Bank Soal', grade: 'Kelas 12', subject: 'Fisika', date: '4 Jun 2026' },
  { id: 'MOD-04', title: 'Prediksi Soal SNBT Gelombang 1', type: 'TryOut', grade: 'Kelas 12', subject: 'Umum', date: '5 Jun 2026' },
]

function formatRupiah(num) {
  return typeof num === 'number' ? 'Rp ' + num.toLocaleString('id-ID') : num
}

const chartData = [
  { name: 'Jan', pendapatan: 25000000, pendaftar: 45 },
  { name: 'Feb', pendapatan: 30000000, pendaftar: 52 },
  { name: 'Mar', pendapatan: 28000000, pendaftar: 38 },
  { name: 'Apr', pendapatan: 35000000, pendaftar: 65 },
  { name: 'Mei', pendapatan: 42000000, pendaftar: 70 },
  { name: 'Jun', pendapatan: 45000000, pendaftar: 85 },
]

/* ===== Section Components ===== */

function DashboardSection() {
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>
        Dashboard Admin
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '2.5rem' }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -10, right: -10, color: s.bg, opacity: 0.8, transform: 'scale(2.5)' }}>
              {s.icon}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: '0.75rem', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent, marginBottom: '1rem' }}>
                {s.icon}
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: '#131b2e', lineHeight: 1.1, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: '0.85rem', color: '#40484f', fontWeight: 600 }}>{s.label}</p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Overview Chart mock / placeholder */}
      <Card>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Grafik Pendapatan & Pendaftaran</h3>
        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaedff" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#707880', fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis 
                yAxisId="left" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#707880', fontSize: 12, fontWeight: 600 }} 
                tickFormatter={(value) => `Rp${value / 1000000}Jt`}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 99, 151, 0.05)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                formatter={(value, name) => {
                  if (name === 'pendapatan') return [formatRupiah(value), 'Pendapatan'];
                  return [value, 'Pendaftar Baru'];
                }}
              />
              <Bar yAxisId="left" dataKey="pendapatan" fill="#006397" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

function KelolaSiswaSection() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e' }}>Kelola Siswa</h2>
        <Button style={{ backgroundColor: '#006397', color: '#fff', border: 'none' }}>+ Tambah Siswa</Button>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Nama Siswa</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Kelas / Tingkat</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {siswaData.map((s, idx) => (
              <tr key={s.id} style={{ borderBottom: idx === siswaData.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: '#131b2e' }}>{s.name}</td>
                <td style={{ padding: '1rem', color: '#40484f', fontSize: '0.85rem' }}>{s.grade}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 9999,
                    backgroundColor: s.status === 'Aktif' ? 'rgba(65,215,122,0.15)' : '#fff4e5',
                    color: s.status === 'Aktif' ? '#00592a' : '#9e6700'
                  }}>
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Button size="sm" variant="secondary" style={{ borderColor: '#c0c7d1', color: '#40484f' }}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function KelolaTentorSection() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e' }}>Kelola Tentor</h2>
        <Button style={{ backgroundColor: '#006397', color: '#fff', border: 'none' }}>+ Tambah Tentor</Button>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Nama Tentor</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Mata Pelajaran</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tentorData.map((t, idx) => (
              <tr key={t.id} style={{ borderBottom: idx === tentorData.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: '#131b2e' }}>{t.name}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {t.subjects.map(sub => (
                      <span key={sub} style={{ fontSize: '0.7rem', backgroundColor: '#eef0ff', color: '#006397', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 9999, backgroundColor: 'rgba(65,215,122,0.15)', color: '#00592a' }}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Button size="sm" variant="secondary" style={{ borderColor: '#c0c7d1', color: '#40484f' }}>Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PenjadwalanSection() {
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Penjadwalan Kelas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <Card className="lg:col-span-1" style={{ alignSelf: 'start' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.25rem' }}>Buat Jadwal Baru</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Siswa</label>
              <select className="input-field" required>
                <option value="">-- Pilih Siswa --</option>
                {siswaData.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Tentor</label>
              <select className="input-field" required>
                <option value="">-- Pilih Tentor --</option>
                {tentorData.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Tanggal & Waktu</label>
              <input type="datetime-local" className="input-field" required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Mata Pelajaran / Topik</label>
              <input type="text" className="input-field" placeholder="Contoh: Matematika - Trigonometri" required />
            </div>
            <Button style={{ backgroundColor: '#006d36', color: '#fff', border: 'none', marginTop: '0.5rem' }}>
              Simpan Jadwal
            </Button>
          </form>
        </Card>

        {/* Right: Mock Calendar / List */}
        <Card className="lg:col-span-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#131b2e' }}>Jadwal Hari Ini</h3>
            <span style={{ fontSize: '0.85rem', color: '#707880', fontWeight: 600 }}>5 Juni 2026</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { time: '15:00 - 17:00', title: 'Matematika Privat', tentor: 'Rina Amelia', student: 'Ahmad M.', strip: '#006397' },
              { time: '16:00 - 18:00', title: 'Biologi Umum', tentor: 'Bambang Pamungkas', student: 'Kelas 10 Reguler', strip: '#006d36' },
              { time: '18:30 - 20:30', title: 'Bahasa Inggris', tentor: 'Sri Wahyuni', student: 'Clara J.', strip: '#825500' },
            ].map((j, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f8fbff', borderLeft: `4px solid ${j.strip}`, borderRadius: '0.5rem', borderRight: '1px solid #eaedff', borderTop: '1px solid #eaedff', borderBottom: '1px solid #eaedff' }}>
                <div style={{ width: '100px', flexShrink: 0, fontWeight: 700, color: '#131b2e', fontSize: '0.9rem' }}>
                  {j.time.split(' - ').map(t => <div key={t}>{t}</div>)}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#131b2e', fontSize: '1rem', marginBottom: '0.25rem' }}>{j.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#40484f' }}>Tentor: <strong>{j.tentor}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: '#40484f' }}>Siswa/Kelas: {j.student}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function KeuanganSection() {
  const [data, setData] = useState(withdrawalDataInit);

  const handleMarkDone = (id) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, status: 'Selesai' } : item));
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Permintaan Penarikan Dana (Payroll)</h2>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>ID / Tanggal</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Tentor</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Jumlah</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: idx === data.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem', color: '#40484f', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 700, color: '#131b2e', display: 'block' }}>{item.id}</span>
                  {item.date}
                </td>
                <td style={{ padding: '1rem', fontWeight: 600, color: '#131b2e' }}>{item.tentor}</td>
                <td style={{ padding: '1rem', fontWeight: 700, color: '#006d36' }}>{formatRupiah(item.amount)}</td>
                <td style={{ padding: '1rem' }}>
                  {item.status === 'Selesai' ? (
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(65,215,122,0.15)', color: '#00592a', padding: '4px 10px', borderRadius: 9999, fontWeight: 600 }}>Telah Ditransfer</span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#fff4e5', color: '#9e6700', padding: '4px 10px', borderRadius: 9999, fontWeight: 600 }}>Menunggu</span>
                  )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Button 
                    size="sm" 
                    variant={item.status === 'Selesai' ? 'secondary' : 'primary'}
                    style={item.status === 'Selesai' ? { borderColor: '#c0c7d1', color: '#707880' } : { backgroundColor: '#006397', color: '#fff', border: 'none' }}
                    disabled={item.status === 'Selesai'}
                    onClick={() => handleMarkDone(item.id)}
                  >
                    {item.status === 'Selesai' ? 'Selesai' : 'Tandai Telah Ditransfer'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PemantauanSection() {
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Pemantauan Kelas & Evaluasi</h2>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Kelas & Tanggal</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Tentor & Siswa</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Evaluasi</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Absensi</th>
            </tr>
          </thead>
          <tbody>
            {pemantauanData.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: idx === pemantauanData.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem' }}>
                  <p style={{ fontWeight: 700, color: '#131b2e', fontSize: '0.95rem' }}>{p.class}</p>
                  <p style={{ fontSize: '0.85rem', color: '#707880', marginTop: '0.25rem' }}>{p.date}</p>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#40484f' }}>
                  <p>T: <strong>{p.tentor}</strong></p>
                  <p>S: {p.siswa}</p>
                </td>
                <td style={{ padding: '1rem' }}>
                  {p.evalScore === 'Belum Dinilai' ? (
                    <span style={{ fontSize: '0.75rem', color: '#ba1a1a', fontWeight: 600 }}>Belum Dinilai</span>
                  ) : (
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#006d36' }}>{p.evalScore}</span>
                  )}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(65,215,122,0.15)', color: '#00592a', padding: '4px 10px', borderRadius: 9999, fontWeight: 600 }}>
                    {p.absensi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ModulAdminSection() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e' }}>Kelola Modul Pembelajaran</h2>
        <Button style={{ backgroundColor: '#006d36', color: '#fff', border: 'none' }}>+ Upload Modul</Button>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Judul & Tipe Dokumen</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Sasaran</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase' }}>Tanggal Upload</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {modulData.map((m, idx) => (
              <tr key={m.id} style={{ borderBottom: idx === modulData.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem' }}>
                  <p style={{ fontWeight: 700, color: '#131b2e', fontSize: '0.95rem' }}>{m.title}</p>
                  <span style={{ display: 'inline-block', marginTop: '4px', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#eef0ff', color: '#006397', fontWeight: 600 }}>
                    {m.type}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#40484f' }}>
                  <p style={{ fontWeight: 600, color: '#131b2e' }}>{m.subject}</p>
                  <p>{m.grade}</p>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#707880', fontWeight: 500 }}>
                  {m.date}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Button size="sm" variant="secondary" style={{ borderColor: '#c0c7d1', color: '#40484f' }}>Edit</Button>
                    <Button size="sm" style={{ backgroundColor: '#ba1a1a', color: '#fff', border: 'none' }}>Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ===== Main Admin Dashboard Component ===== */

export default function DashboardAdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardSection />
      case 'kelola-siswa': return <KelolaSiswaSection />
      case 'kelola-tentor': return <KelolaTentorSection />
      case 'penjadwalan': return <PenjadwalanSection />
      case 'modul-belajar': return <ModulAdminSection />
      case 'keuangan': return <KeuanganSection />
      case 'pemantauan': return <PemantauanSection />
      default: return <DashboardSection />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#faf8ff' }}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(19, 27, 46, 0.5)', zIndex: 40, backdropFilter: 'blur(4px)' }}
          onClick={() => setIsSidebarOpen(false)}
          className="mobile-header animate-fade-in"
        />
      )}

      {/* Dark Corporate Sidebar */}
      <aside 
        className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}
        style={{ backgroundColor: '#131b2e', borderRight: '1px solid #00517c', padding: 0 }}
      >
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '0.5rem', backgroundColor: '#006397', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              7
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              7utors <span style={{ fontSize: '0.8rem', color: '#7dc4ff', fontWeight: 600, verticalAlign: 'middle', marginLeft: '4px' }}>ADMIN</span>
            </span>
          </div>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#c0c7d1', cursor: 'pointer' }}>
            <Icons.XCircle />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sidebarItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.875rem 1rem',
                  borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                  backgroundColor: isActive ? 'rgba(125, 196, 255, 0.15)' : 'transparent',
                  color: isActive ? '#7dc4ff' : '#c0c7d1',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff' } }}
                onMouseOut={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c0c7d1' } }}
              >
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#2a3449', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
              AD
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Administrator</p>
              <p style={{ fontSize: '0.75rem', color: '#707880' }}>Sistem 7utors</p>
            </div>
          </div>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', borderColor: 'rgba(255,255,255,0.2)', color: '#ffdad6', backgroundColor: 'transparent' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(186, 26, 26, 0.1)'; e.currentTarget.style.borderColor = '#ba1a1a' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            >
              <Icons.Logout /> Keluar
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Mobile Header */}
        <header className="mobile-header" style={{ backgroundColor: '#fff', borderBottom: '1px solid #dae2fd', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '0.5rem', backgroundColor: '#006397', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              7
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e' }}>7utors <span style={{ fontSize: '0.8rem', color: '#7dc4ff', fontWeight: 600, verticalAlign: 'middle', marginLeft: '4px' }}>ADMIN</span></span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#40484f', cursor: 'pointer' }}>
            <Icons.Menu />
          </button>
        </header>

        {/* Content Wrapper */}
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header Title (Desktop) */}
          <div className="desktop-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#131b2e' }}>Portal Admin</h1>
              <p style={{ color: '#707880', fontSize: '0.95rem', marginTop: 4 }}>Pusat kendali operasional 7utors.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #c0c7d1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#40484f', cursor: 'pointer', position: 'relative' }}>
                <Icons.Bell />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#fff', border: '1px solid #c0c7d1', borderRadius: '9999px', cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#2a3449', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>AD</div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#131b2e' }}>Administrator</span>
              </div>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
