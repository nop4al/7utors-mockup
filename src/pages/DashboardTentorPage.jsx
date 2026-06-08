import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

/* ===== Icons (Lucide/Heroicons SVG) ===== */
const Icons = {
  Dashboard: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  Calendar: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
  Clipboard: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>,
  Money: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V4.22c0-.756-.728-1.296-1.453-1.096a59.769 59.769 0 00-15.797 2.101c-.728.198-1.096.924-1.096 1.651v10.122c0 .727.368 1.453 1.096 1.651zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  User: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  Logout: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>,
  Star: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.18.42l1.05 5.485c.125.649-.571 1.15-1.11.851l-4.75-2.624a.563.563 0 00-.54 0l-4.75 2.624c-.54.299-1.235-.202-1.11-.851l1.05-5.485a.563.563 0 00-.18-.42l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  Info: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
  ChevronDown: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  Check: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  Clock: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Menu: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>,
  Bell: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
  Book: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
  Wallet: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>,
  MapPin: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  Chart: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  UserCheck: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 13l2 2 4-4" /></svg>,
  Book: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
}

/* ===== Dummy Data ===== */
const stats = [
  { label: 'Total Sesi Selesai', value: '42', icon: <Icons.Check />, bg: 'rgba(65,215,122,0.15)', accent: '#006d36', trend: '+4 minggu ini' },
  { label: 'Sesi Tertunda (Belum Dinilai)', value: '3', icon: <Icons.Clipboard />, bg: 'rgba(253,182,75,0.15)', accent: '#825500', trend: null },
  { label: 'Rating Rata-rata', value: '4.9', icon: <Icons.Star />, bg: '#cce5ff', accent: '#006397', trend: 'Stabil' },
  { label: 'Estimasi Pendapatan', value: 'Rp 2.450.000', icon: <Icons.Wallet />, bg: 'rgba(65,215,122,0.15)', accent: '#006d36', trend: 'Bulan ini' },
]

const jadwal = [
  { id: 1, subject: 'Matematika - Ahmad', type: 'Privat', date: 'Jumat, 5 Juni 2026', day: 5, time: '15:00 - 17:00', student: 'Ahmad M.', status: 'Selesai', strip: '#e97c00', topik: 'Trigonometri', link: 'meet.google.com/abc-defg-hij', evaluated: true },
  { id: 2, subject: 'Matematika - Kelas 10 Reguler', type: 'Umum', date: 'Jumat, 5 Juni 2026', day: 5, time: '18:30 - 20:30', student: 'Kelas 10 Reguler (15 Siswa)', status: 'Selesai', strip: '#006397', topik: 'Persamaan Kuadrat', link: 'meet.google.com/xyz-1234-abc', evaluated: false },
  { id: 3, subject: 'Fisika - Clara', type: 'Privat', date: 'Selasa, 9 Juni 2026', day: 9, time: '15:00 - 17:00', student: 'Clara J.', status: 'Terjadwal', strip: '#006d36', topik: 'Hukum Newton', link: 'meet.google.com/uvw-xyza-bcd', evaluated: false },
  { id: 4, subject: 'Fisika - UTBK Camp', type: 'Umum', date: 'Rabu, 10 Juni 2026', day: 10, time: '16:00 - 18:00', student: 'Kelas UTBK Camp (25 Siswa)', status: 'Terjadwal', strip: '#006397', topik: 'Mekanika Klasik', link: 'meet.google.com/efg-hijk-lmn', evaluated: false },
  { id: 5, subject: 'Matematika - Budi', type: 'Privat', date: 'Kamis, 11 Juni 2026', day: 11, time: '18:30 - 20:30', student: 'Budi S.', status: 'Terjadwal', strip: '#e97c00', topik: 'Fungsi Komposisi', link: 'meet.google.com/opq-rstu-vwx', evaluated: false },
]

const pendingEvaluations = jadwal.filter(j => j.status === 'Selesai' && !j.evaluated)

const jadwalAbsensi = [
  { id: 10, subject: 'Matematika - Kelas 10 Reguler', type: 'Umum', date: 'Jumat, 5 Juni 2026', time: '18:30 - 20:30', student: 'Kelas 10 Reguler (15 Siswa)', topik: 'Persamaan Kuadrat', absensiSelesai: false },
  { id: 11, subject: 'Fisika - Budi', type: 'Privat', date: 'Jumat, 5 Juni 2026', time: '18:30 - 20:30', student: 'Budi S.', topik: 'Kinematika', absensiSelesai: false },
]

const riwayatPendapatan = [
  { id: 'PY-2026-005', periode: 'Mei 2026', tanggalCair: '1 Juni 2026', jumlah: 3200000, status: 'Sudah Cair', sesi: 24 },
  { id: 'PY-2026-004', periode: 'April 2026', tanggalCair: '1 Mei 2026', jumlah: 2800000, status: 'Sudah Cair', sesi: 21 },
  { id: 'PY-2026-003', periode: 'Maret 2026', tanggalCair: '1 April 2026', jumlah: 3100000, status: 'Sudah Cair', sesi: 23 },
]

const sidebarItems = [
  { id: 'dashboard', icon: <Icons.Dashboard />, label: 'Dashboard' },
  { id: 'jadwal', icon: <Icons.Calendar />, label: 'Jadwal Mengajar' },
  { id: 'absensi', icon: <Icons.UserCheck />, label: 'Absensi' },
  { id: 'evaluasi', icon: <Icons.Clipboard />, label: 'Evaluasi Siswa' },
  { id: 'modul-belajar', icon: <Icons.Book />, label: 'Modul Belajar' },
  { id: 'pendapatan', icon: <Icons.Money />, label: 'Pendapatan' },
]

const modulData = [
  { id: 'MOD-01', title: 'Matematika: Trigonometri Dasar', type: 'Modul Materi', grade: 'Kelas 10', subject: 'Matematika', date: '2 Jun 2026', color: '#006397', bg: '#eef0ff' },
  { id: 'MOD-02', title: 'Biologi: Sel dan Jaringan', type: 'Rangkuman', grade: 'Kelas 11', subject: 'Biologi', date: '3 Jun 2026', color: '#006d36', bg: 'rgba(65,215,122,0.15)' },
  { id: 'MOD-03', title: 'Bank Soal UTBK Fisika 2025', type: 'Bank Soal', grade: 'Kelas 12', subject: 'Fisika', date: '4 Jun 2026', color: '#825500', bg: '#fff4e5' },
  { id: 'MOD-04', title: 'Prediksi Soal SNBT Gelombang 1', type: 'TryOut', grade: 'Kelas 12', subject: 'Umum', date: '5 Jun 2026', color: '#ba1a1a', bg: '#ffdad6' },
]

const statusStyle = {
  Terjadwal: { background: '#cce5ff', color: '#004b73' },
  Selesai: { background: 'rgba(65,215,122,0.2)', color: '#00592a' },
  Dibatalkan: { background: '#ffdad6', color: '#93000a' },
}

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID')
}

/* ===== Section Components ===== */

function DashboardSection({ onNavigate }) {
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const nextClass = jadwal.find((j) => j.status === 'Terjadwal')

  return (
    <div className="animate-fade-in">
      
      {/* Professional Hero Welcome Banner for Tentor */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '1px solid #c0c7d1',
        borderRadius: '1rem', padding: '2.5rem 2rem', marginBottom: '2rem',
        boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 300px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#707880', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
              {today}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#131b2e', lineHeight: 1.2, marginBottom: '0.5rem' }}>
              Selamat Datang, Rina Amelia.
            </h2>
            <p style={{ fontSize: '1rem', color: '#40484f', maxWidth: '500px', lineHeight: 1.6 }}>
              Ringkasan aktivitas mengajar Anda hari ini. Terdapat <strong>{pendingEvaluations.length} kelas</strong> yang memerlukan laporan evaluasi siswa.
            </p>
          </div>

          {nextClass && (
            <div style={{ 
              flex: '0 1 340px', backgroundColor: '#f8fbff', 
              border: '1px solid #dae2fd', borderRadius: '0.75rem', padding: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '1.25rem'
            }}>
              <div style={{ width: 48, height: 48, borderRadius: '0.5rem', backgroundColor: '#eef0ff', color: '#006397', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icons.Book />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.75rem', color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 2 }}>Sesi Terdekat</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: '#131b2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nextClass.student}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 4 }}>
                  <span style={{ fontSize: '0.75rem', color: '#40484f', display: 'flex', alignItems: 'center', gap: 4 }}><Icons.Clock /> {nextClass.time}</span>
                </div>
              </div>
              <a href={`https://${nextClass.link}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '0.5rem', backgroundColor: '#006d36', color: '#ffffff', cursor: 'pointer', flexShrink: 0 }} title="Masuk Kelas">
                <svg style={{ width: 16, height: 16 }} fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Pending Evaluations Alert */}
      {pendingEvaluations.length > 0 && (
        <div style={{
          backgroundColor: '#fff', borderRadius: '1rem', padding: '1.25rem 1.5rem',
          marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
          boxShadow: '0 4px 20px rgba(253, 182, 75, 0.08)', borderLeft: '4px solid #fdb64b', border: '1px solid #ffebc9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(253,182,75,0.2)', color: '#825500', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icons.Clipboard />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#131b2e' }}>Tugas: Input Evaluasi Siswa</p>
              <p style={{ fontSize: '0.85rem', color: '#40484f', marginTop: 2 }}>Anda memiliki {pendingEvaluations.length} kelas selesai yang belum diberi laporan evaluasi.</p>
            </div>
          </div>
          <Button onClick={() => onNavigate('absensi')} style={{ backgroundColor: '#fdb64b', color: '#704800', border: 'none' }}>
            Input Absensi / Evaluasi
          </Button>
        </div>
      )}

      {/* Stats Dashboard */}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700, color: '#131b2e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icons.Chart /> Ringkasan Performa Anda
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '2.5rem' }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -10, right: -10, color: s.bg, opacity: 0.5, transform: 'scale(2)' }}>
              {s.icon}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: '0.75rem', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent, marginBottom: '1rem' }}>
                {s.icon}
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#131b2e', lineHeight: 1.1, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: '0.75rem', color: '#40484f', fontWeight: 600 }}>{s.label}</p>
              {s.trend && <p style={{ fontSize: '0.7rem', color: '#006d36', fontWeight: 700, marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 2, background: 'rgba(65,215,122,0.15)', padding: '2px 8px', borderRadius: 9999 }}>{s.trend}</p>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function JadwalSection() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Generate 30 days for June 2026 (starts on Monday for simplicity in this dummy view)
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  // Add empty slots for Sunday (0) to align June 1st to Monday (dummy logic)
  const prefixDays = [null]; 
  const displayDays = [...prefixDays, ...calendarDays];
  // Fill suffix to complete grid rows
  const suffixDays = Array.from({ length: (7 - (displayDays.length % 7)) % 7 }, () => null);
  const fullGrid = [...displayDays, ...suffixDays];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e' }}>Jadwal Mengajar Anda</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #c0c7d1' }}>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#40484f' }}>&lt;</button>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#131b2e', minWidth: '100px', textAlign: 'center' }}>Juni 2026</span>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#40484f' }}>&gt;</button>
        </div>
      </div>

      <Card noPadding style={{ overflow: 'hidden' }}>
        <div>
          {/* Calendar Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #dae2fd', backgroundColor: '#f8fbff' }}>
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, i) => (
              <div key={day} className={`text-center uppercase tracking-wider font-bold py-1.5 md:py-3.5 px-1 md:px-2 text-[0.6rem] md:text-xs ${i === 0 ? 'text-[#ba1a1a]' : 'text-[#707880]'}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(80px, auto)', backgroundColor: '#dae2fd', gap: '1px' }}>
            {fullGrid.map((day, index) => {
              const dayEvents = jadwal.filter(j => j.day === day);
              const isToday = day === 8; // Dummy today is June 8, 2026
              const isWeekend = index % 7 === 0 || index % 7 === 6;
              
              return (
                <div key={index} className="flex flex-col relative transition-colors cursor-default"
                  style={{ backgroundColor: isWeekend && day ? '#fcfdff' : '#ffffff', padding: '0.375rem 0.5rem' }}
                  onMouseOver={(e) => { if(day && dayEvents.length) e.currentTarget.style.backgroundColor = '#f2f3ff' }}
                  onMouseOut={(e) => { if(day) e.currentTarget.style.backgroundColor = isWeekend ? '#fcfdff' : '#ffffff' }}
                >
                  {day && (
                    <>
                      <div className="flex justify-center mb-1 md:mb-2">
                        <span className={`flex items-center justify-center rounded-full font-heading font-bold w-6 h-6 md:w-7 md:h-7 text-xs md:text-sm ${isToday ? 'bg-[#006d36] text-white shadow-md' : (index % 7 === 0 ? 'text-[#ba1a1a]' : 'text-[#40484f]')}`}>
                          {day}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 flex-1 overflow-hidden mt-1">
                        {dayEvents.map(ev => (
                          <div key={ev.id} onClick={() => setSelectedEvent(ev)} 
                            className="rounded w-full cursor-pointer flex items-center transition-transform hover:scale-[1.02] overflow-hidden"
                            style={{ 
                              padding: '2px 4px',
                              gap: '2px',
                              backgroundColor: ev.status === 'Selesai' ? '#f2f3ff' : `${ev.strip}`, 
                              border: ev.status === 'Selesai' ? `1px solid ${ev.strip}50` : 'none',
                              color: ev.status === 'Selesai' ? '#40484f' : '#ffffff',
                              boxShadow: ev.status === 'Terjadwal' ? `0 2px 4px ${ev.strip}40` : 'none',
                            }}
                          >
                            <span className="font-bold shrink-0 leading-none" style={{ fontSize: '0.65rem', opacity: ev.status === 'Selesai' ? 0.7 : 0.9 }}>{ev.time.split(' ')[0]}</span>
                            <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0 leading-none" style={{ fontSize: '0.65rem' }}>{ev.student}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="animate-fade-in" style={{
          position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(19, 27, 46, 0.75)', backdropFilter: 'blur(4px)', padding: '1rem'
        }} onClick={() => setSelectedEvent(null)}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '450px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#707880', fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '0.75rem', backgroundColor: `${selectedEvent.strip}15`, color: selectedEvent.strip, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.Book />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e' }}>{selectedEvent.subject}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 4 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 9999, display: 'inline-block', ...(statusStyle[selectedEvent.status]) }}>{selectedEvent.status}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 9999, display: 'inline-block', backgroundColor: selectedEvent.type === 'Umum' ? '#eef0ff' : '#fef2f2', color: selectedEvent.type === 'Umum' ? '#006397' : '#ba1a1a' }}>Kelas {selectedEvent.type}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(192,199,209,0.3)', borderBottom: '1px solid rgba(192,199,209,0.3)', padding: '1.5rem 0', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#707880' }}><Icons.Info /></span>
                <div>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#707880', fontWeight: 700 }}>Topik</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#131b2e' }}>{selectedEvent.topik}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#707880' }}><Icons.Calendar /></span>
                <div>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#707880', fontWeight: 700 }}>Waktu</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500, color: '#131b2e' }}>{selectedEvent.date} <br/> {selectedEvent.time}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#707880' }}><Icons.User /></span>
                <div>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#707880', fontWeight: 700 }}>Siswa</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500, color: '#131b2e' }}>{selectedEvent.student}</p>
                </div>
              </div>
            </div>

            {selectedEvent.status === 'Terjadwal' ? (
              <a href={`https://${selectedEvent.link}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button style={{ width: '100%', backgroundColor: '#006d36', color: '#fff', border: 'none' }}>Mulai Kelas (Google Meet)</Button>
              </a>
            ) : (
              <Button variant="secondary" style={{ width: '100%', borderColor: '#006d36', color: '#006d36' }} onClick={() => setSelectedEvent(null)}>Tutup</Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function EvaluasiSection() {
  const [evalList, setEvalList] = useState(jadwal.filter(j => j.status === 'Selesai'));
  const [selectedForEval, setSelectedForEval] = useState(null);
  
  // Dummy form state
  const [scores, setScores] = useState({ pemahaman: 80, keaktifan: 80, latihan: 80 });
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submit
    setEvalList(prev => prev.map(j => j.id === selectedForEval.id ? { ...j, evaluated: true } : j));
    setSelectedForEval(null);
    setScores({ pemahaman: 80, keaktifan: 80, latihan: 80 });
    setNotes('');
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Input Evaluasi Siswa</h2>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Siswa & Topik</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jadwal</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {evalList.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: idx === evalList.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: '#131b2e' }}>{item.student}</p>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, backgroundColor: item.type === 'Umum' ? '#eef0ff' : '#fef2f2', color: item.type === 'Umum' ? '#006397' : '#ba1a1a' }}>{item.type}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#40484f', marginTop: 2 }}>{item.subject.split(' - ')[0]} • {item.topik}</p>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#40484f' }}>
                  {item.date} <br/> <span style={{ color: '#707880' }}>{item.time}</span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {item.evaluated ? (
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(65,215,122,0.15)', color: '#00592a', padding: '4px 10px', borderRadius: 9999, fontWeight: 600, display: 'inline-block' }}>Sudah Dinilai</span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#fff4e5', color: '#9e6700', padding: '4px 10px', borderRadius: 9999, fontWeight: 600, display: 'inline-block' }}>Perlu Penilaian</span>
                  )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Button 
                    variant={item.evaluated ? 'secondary' : 'primary'} 
                    size="sm"
                    style={item.evaluated ? { borderColor: '#c0c7d1', color: '#707880' } : { backgroundColor: '#006d36', color: '#fff', border: 'none' }}
                    onClick={() => setSelectedForEval(item)}
                    disabled={item.evaluated}
                  >
                    {item.evaluated ? 'Selesai' : 'Input Nilai'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedForEval && (
        <div className="animate-fade-in" style={{
          position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(19, 27, 46, 0.75)', backdropFilter: 'blur(4px)', padding: '1rem'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '500px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e', marginBottom: '1.5rem' }}>Input Nilai: {selectedForEval.student}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Pemahaman Materi (0-100)</label>
                <input type="number" min="0" max="100" className="input-field" value={scores.pemahaman} onChange={(e) => setScores({...scores, pemahaman: e.target.value})} required />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Keaktifan Siswa (0-100)</label>
                <input type="number" min="0" max="100" className="input-field" value={scores.keaktifan} onChange={(e) => setScores({...scores, keaktifan: e.target.value})} required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Pengerjaan Latihan (0-100)</label>
                <input type="number" min="0" max="100" className="input-field" value={scores.latihan} onChange={(e) => setScores({...scores, latihan: e.target.value})} required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Catatan & Rekomendasi</label>
                <textarea className="input-field" rows="4" style={{ resize: 'vertical' }} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tuliskan catatan kemajuan siswa di sesi ini..." required></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" variant="secondary" style={{ flex: 1, borderColor: '#c0c7d1', color: '#40484f' }} onClick={() => setSelectedForEval(null)}>Batal</Button>
                <Button type="submit" style={{ flex: 1, backgroundColor: '#006d36', color: '#fff', border: 'none' }}>Kirim Evaluasi</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function AbsensiSection() {
  const [absensiList, setAbsensiList] = useState(jadwalAbsensi);
  const [selectedForAbsen, setSelectedForAbsen] = useState(null);
  
  // Dummy form state
  const [absenData, setAbsenData] = useState({ tentor: 'Hadir', siswa: 'Hadir', foto: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAbsensiList(prev => prev.map(j => j.id === selectedForAbsen.id ? { ...j, absensiSelesai: true } : j));
    setSelectedForAbsen(null);
    setAbsenData({ tentor: 'Hadir', siswa: 'Hadir', foto: null });
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAbsenData({ ...absenData, foto: e.target.files[0].name });
    }
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Kehadiran & Absensi</h2>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Siswa & Topik</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jadwal</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {absensiList.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: idx === absensiList.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: '#131b2e' }}>{item.student}</p>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, backgroundColor: item.type === 'Umum' ? '#eef0ff' : '#fef2f2', color: item.type === 'Umum' ? '#006397' : '#ba1a1a' }}>{item.type}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#40484f', marginTop: 2 }}>{item.subject.split(' - ')[0]}</p>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#40484f' }}>
                  {item.date} <br/> <span style={{ color: '#707880' }}>{item.time}</span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {item.absensiSelesai ? (
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(65,215,122,0.15)', color: '#00592a', padding: '4px 10px', borderRadius: 9999, fontWeight: 600, display: 'inline-block' }}>Absen Tersimpan</span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#fff4e5', color: '#9e6700', padding: '4px 10px', borderRadius: 9999, fontWeight: 600, display: 'inline-block' }}>Menunggu Absensi</span>
                  )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Button 
                    variant={item.absensiSelesai ? 'secondary' : 'primary'} 
                    size="sm"
                    style={item.absensiSelesai ? { borderColor: '#c0c7d1', color: '#707880' } : { backgroundColor: '#006397', color: '#fff', border: 'none' }}
                    onClick={() => setSelectedForAbsen(item)}
                    disabled={item.absensiSelesai}
                  >
                    {item.absensiSelesai ? 'Selesai' : 'Input Absen'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedForAbsen && (
        <div className="animate-fade-in" style={{
          position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(19, 27, 46, 0.75)', backdropFilter: 'blur(4px)', padding: '1rem'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '500px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e', marginBottom: '1.5rem' }}>Input Absensi: {selectedForAbsen.student}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Kehadiran Tentor</label>
                <select className="input-field" value={absenData.tentor} onChange={(e) => setAbsenData({...absenData, tentor: e.target.value})} required>
                  <option value="Hadir">Hadir</option>
                  <option value="Izin">Izin</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Alpa">Alpa</option>
                </select>
              </div>
              
              {selectedForAbsen.type === 'Privat' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Kehadiran Siswa</label>
                  <select className="input-field" value={absenData.siswa} onChange={(e) => setAbsenData({...absenData, siswa: e.target.value})} required>
                    <option value="Hadir">Hadir</option>
                    <option value="Izin">Izin</option>
                    <option value="Sakit">Sakit</option>
                    <option value="Alpa">Alpa</option>
                  </select>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Laporan Kehadiran Kelas (Group)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#707880' }}>Hadir</span>
                      <input type="number" min="0" placeholder="0" className="input-field" style={{ paddingLeft: '3.5rem' }} required />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#707880' }}>Absen</span>
                      <input type="number" min="0" placeholder="0" className="input-field" style={{ paddingLeft: '3.5rem' }} required />
                    </div>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#707880', marginTop: '0.25rem' }}>Rincian nama siswa yang absen/izin dapat dituliskan secara lengkap di form Evaluasi nanti.</p>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Upload Foto Bukti Mengajar</label>
                <div style={{ border: '2px dashed #c0c7d1', borderRadius: '0.5rem', padding: '1.5rem', textAlign: 'center', backgroundColor: '#f8fbff', position: 'relative' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} required />
                  <Icons.MapPin />
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#40484f', marginTop: '0.5rem' }}>
                    {absenData.foto ? absenData.foto : 'Klik atau seret foto ke sini'}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#ba1a1a', marginTop: '0.25rem', fontWeight: 600 }}>Pastikan foto mengandung metadata lokasi (Geotag) dan waktu untuk validasi.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" variant="secondary" style={{ flex: 1, borderColor: '#c0c7d1', color: '#40484f' }} onClick={() => setSelectedForAbsen(null)}>Batal</Button>
                <Button type="submit" style={{ flex: 1, backgroundColor: '#006397', color: '#fff', border: 'none' }}>Simpan Absensi</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function PendapatanSection() {
  const totalPendapatan = riwayatPendapatan.reduce((acc, curr) => acc + curr.jumlah, 0);

  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountStatus, setAccountStatus] = useState('Aktif'); // 'Aktif', 'Menunggu Persetujuan'

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 3000);
    }, 1500);
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    setAccountStatus('Menunggu Persetujuan Admin');
    setShowAccountModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      
      {/* Toast Notification */}
      {withdrawSuccess && (
        <div className="animate-slide-up" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#006d36', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 50, boxShadow: '0 4px 12px rgba(0,109,54,0.3)', fontWeight: 600 }}>
          <Icons.Check /> Dana berhasil ditarik dan sedang diproses bank!
        </div>
      )}

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e', marginBottom: '1.5rem' }}>Pendapatan & Payroll</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #006d36 0%, #004221 100%)', 
          borderRadius: '1rem', padding: '1.5rem', color: '#fff',
          boxShadow: '0 10px 25px -5px rgba(0, 109, 54, 0.4)',
          position: 'relative', overflow: 'hidden'
        }}>
          <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#41d77a', fontWeight: 700, marginBottom: '0.5rem' }}>Total Saldo Tersedia</p>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1 }}>{formatRupiah(totalPendapatan)}</h3>
          
          <Button 
            onClick={handleWithdraw}
            disabled={isWithdrawing || totalPendapatan === 0}
            style={{ width: '100%', backgroundColor: isWithdrawing ? '#c0c7d1' : '#fff', color: isWithdrawing ? '#40484f' : '#006d36', border: 'none' }}
          >
            {isWithdrawing ? 'Memproses Penarikan...' : 'Tarik Dana Sekarang'}
          </Button>
        </div>

        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700, color: '#131b2e' }}>Rekening Tujuan</h4>
            {accountStatus === 'Menunggu Persetujuan Admin' && (
              <span style={{ fontSize: '0.65rem', fontWeight: 700, backgroundColor: '#fff4e5', color: '#9e6700', padding: '2px 8px', borderRadius: 9999 }}>Menunggu Approval Admin</span>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f2f3ff', borderRadius: '0.75rem', border: '1px solid #dae2fd', opacity: accountStatus === 'Menunggu Persetujuan Admin' ? 0.6 : 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: '0.5rem', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#006397', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              BCA
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#131b2e' }}>Bank Central Asia</p>
              <p style={{ fontSize: '0.85rem', color: '#707880' }}>876543210 • a.n. Rina Amelia</p>
            </div>
          </div>
          
          <Button 
            variant="tertiary" 
            style={{ alignSelf: 'flex-start', marginTop: '0.5rem', paddingLeft: 0, color: accountStatus === 'Menunggu Persetujuan Admin' ? '#707880' : '#006397' }}
            onClick={() => setShowAccountModal(true)}
            disabled={accountStatus === 'Menunggu Persetujuan Admin'}
          >
            {accountStatus === 'Menunggu Persetujuan Admin' ? 'Perubahan Sedang Diproses' : 'Ubah Rekening'}
          </Button>
        </Card>
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#131b2e', marginBottom: '1rem' }}>Riwayat Pencairan</h3>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #dae2fd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fbff', borderBottom: '1px solid #dae2fd' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Periode / Tanggal Cair</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Detail Sesi</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jumlah Nominal</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#707880', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayatPendapatan.map((item, index) => (
              <tr key={index} style={{ borderBottom: index === riwayatPendapatan.length - 1 ? 'none' : '1px solid #eaedff' }}>
                <td style={{ padding: '1rem' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: '#131b2e' }}>Honor {item.periode}</p>
                  <p style={{ fontSize: '0.85rem', color: '#707880', marginTop: 2 }}>{item.tanggalCair}</p>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#40484f' }}>
                  {item.sesi} Sesi Mengajar
                </td>
                <td style={{ padding: '1rem' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: '#006d36' }}>{formatRupiah(item.jumlah)}</p>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#00592a', background: 'rgba(65,215,122,0.15)', padding: '4px 10px', borderRadius: 9999, display: 'inline-block' }}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ubah Rekening Modal */}
      {showAccountModal && (
        <div className="animate-fade-in" style={{
          position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(19, 27, 46, 0.75)', backdropFilter: 'blur(4px)', padding: '1rem'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e', marginBottom: '0.5rem' }}>Pengajuan Ubah Rekening</h3>
            <p style={{ fontSize: '0.85rem', color: '#707880', marginBottom: '1.5rem' }}>Perubahan rekening membutuhkan persetujuan Admin demi keamanan. Proses 1-2 hari kerja.</p>
            
            <form onSubmit={handleAccountSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Bank Tujuan Baru</label>
                <select className="input-field" required>
                  <option value="">Pilih Bank</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BCA">BCA</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Nomor Rekening Baru</label>
                <input type="number" className="input-field" placeholder="Ketik nomor rekening" required />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Nama Pemilik Rekening</label>
                <input type="text" className="input-field" placeholder="Sesuai buku tabungan" required />
                <p style={{ fontSize: '0.7rem', color: '#ba1a1a', fontWeight: 600, marginTop: 4 }}>Nama pemilik harus sama dengan KTP yang didaftarkan.</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" variant="secondary" style={{ flex: 1, borderColor: '#c0c7d1', color: '#40484f' }} onClick={() => setShowAccountModal(false)}>Batal</Button>
                <Button type="submit" style={{ flex: 1, backgroundColor: '#006397', color: '#fff', border: 'none' }}>Ajukan Perubahan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ModulTentorSection() {
  const [filterType, setFilterType] = useState('Semua')
  
  const filteredModul = filterType === 'Semua' 
    ? modulData 
    : modulData.filter(m => m.type === filterType)

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#131b2e' }}>Modul Belajar</h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Semua', 'Modul Materi', 'Bank Soal', 'Rangkuman', 'TryOut'].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid #c0c7d1', 
                backgroundColor: filterType === type ? '#131b2e' : '#fff',
                color: filterType === type ? '#fff' : '#40484f',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModul.map(m => (
          <Card key={m.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, color: m.bg, opacity: 0.5, transform: 'scale(4)' }}>
              <Icons.Book />
            </div>
            
            <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '4px', backgroundColor: m.bg, color: m.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.type}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#707880', fontWeight: 600 }}>{m.date}</span>
              </div>
              
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                {m.title}
              </h3>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', backgroundColor: '#f8fbff', color: '#40484f', padding: '4px 10px', borderRadius: '9999px', border: '1px solid #eaedff' }}>
                  {m.subject}
                </span>
                <span style={{ fontSize: '0.8rem', backgroundColor: '#f8fbff', color: '#40484f', padding: '4px 10px', borderRadius: '9999px', border: '1px solid #eaedff' }}>
                  {m.grade}
                </span>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
              <Button style={{ flex: 1, backgroundColor: '#006397', color: '#fff', border: 'none', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <Icons.Clipboard /> Baca Modul
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* ===== Main Page Component ===== */
export default function DashboardTentorPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showNotifMenu, setShowNotifMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardSection onNavigate={setActiveTab} />
      case 'jadwal': return <JadwalSection />
      case 'absensi': return <AbsensiSection />
      case 'evaluasi': return <EvaluasiSection />
      case 'modul-belajar': return <ModulTentorSection />
      case 'pendapatan': return <PendapatanSection />
      default: return <DashboardSection onNavigate={setActiveTab} />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#faf8ff' }}>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(19, 27, 46, 0.5)', zIndex: 40, backdropFilter: 'blur(2px)' }}
          className="mobile-header animate-fade-in"
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaedff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#006d36', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              7
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#131b2e' }}>7utors <span style={{ color: '#006d36' }}>Tentor</span></span>
          </div>
          <button className="lg:hidden" onClick={toggleSidebar} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#707880' }}>
            <Icons.Logout />
          </button>
        </div>
        
        <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                  borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem', fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'rgba(65,215,122,0.1)' : 'transparent',
                  color: isActive ? '#006d36' : '#707880',
                  transition: 'all 0.2s ease', textAlign: 'left'
                }}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
        </div>
        
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eaedff' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', width: '100%',
              borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
              fontSize: '0.95rem', fontWeight: 600, backgroundColor: '#ffdad6', color: '#ba1a1a', transition: 'all 0.2s ease'
            }}>
              <Icons.Logout />
              Keluar
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header Mobile */}
        <header className="mobile-header" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eaedff', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#006d36', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
              7
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 800, color: '#131b2e' }}>7utors</span>
          </div>
          <button onClick={toggleSidebar} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#131b2e' }}>
            <Icons.Menu />
          </button>
        </header>

        {/* Dynamic Content */}
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header Title (Desktop) */}
          <div className="desktop-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#131b2e' }}>Portal Tentor</h1>
              <p style={{ color: '#707880', fontSize: '0.95rem', marginTop: 4 }}>Kelola jadwal kelas, evaluasi siswa, dan pendapatan Anda.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              
              {/* Notification Bell */}
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => { setShowNotifMenu(!showNotifMenu); setShowProfileMenu(false); }}
                  style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #c0c7d1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#40484f', cursor: 'pointer', position: 'relative' }}
                >
                  <Icons.Bell />
                  <span style={{ position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ba1a1a' }}></span>
                </button>
                
                {showNotifMenu && (
                  <div className="animate-fade-in" style={{ position: 'absolute', top: '3.5rem', right: 0, width: '280px', backgroundColor: '#fff', borderRadius: '0.75rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', border: '1px solid #eaedff', zIndex: 100, overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #eaedff', fontWeight: 700 }}>Notifikasi Baru</div>
                    <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: '#707880', fontSize: '0.85rem' }}>Belum ada notifikasi baru hari ini.</div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div style={{ position: 'relative' }}>
                <div 
                  onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifMenu(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#fff', border: '1px solid #c0c7d1', borderRadius: '9999px', cursor: 'pointer' }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#006d36', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>RA</div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#131b2e' }}>Rina Amelia</span>
                  <Icons.ChevronDown />
                </div>
                
                {showProfileMenu && (
                  <div className="animate-fade-in" style={{ position: 'absolute', top: '3.5rem', right: 0, width: '200px', backgroundColor: '#fff', borderRadius: '0.75rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', border: '1px solid #eaedff', zIndex: 100, overflow: 'hidden' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#ba1a1a' }}>
                      <div 
                        style={{ padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff4e5'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                      >
                        <Icons.Logout /> Keluar Akun
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  )
}
