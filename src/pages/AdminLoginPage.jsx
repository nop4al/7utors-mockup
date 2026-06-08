import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Dummy login logic
    navigate('/admin/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#faf8ff' }}>
      
      {/* Left Decoration - specific for Admin (Darker, more corporate) */}
      <div className="hidden md:flex flex-col justify-between" style={{ width: '45%', padding: '3rem', background: 'linear-gradient(135deg, #131b2e 0%, #283044 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#fdb64b', color: '#131b2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              7
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>7utors <span style={{ color: '#fdb64b' }}>Admin</span></span>
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Pusat Kendali<br/>Operasional
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#eaedff', maxWidth: '400px', lineHeight: 1.6 }}>
            Akses ke seluruh data siswa, jadwal kelas, keuangan, dan evaluasi tutor. Khusus untuk tim manajemen 7utors.
          </p>
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, color: '#c0c7d1', fontSize: '0.85rem' }}>
          &copy; 2026 7utors Management. Akses Terbatas.
        </div>

        {/* Abstract Background Shapes */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,182,75,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,99,151,0.3) 0%, rgba(0,0,0,0) 70%)', zIndex: 1 }} />
      </div>

      {/* Right Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="animate-scale-in" style={{ width: '100%', maxWidth: '420px', backgroundColor: '#fff', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-elevated)', border: '1px solid #dae2fd' }}>
          
          <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#131b2e', color: '#fdb64b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              7
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#131b2e' }}>7utors <span style={{ color: '#fdb64b' }}>Admin</span></span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#131b2e', marginBottom: '0.5rem', textAlign: 'center' }}>Login Administrator</h2>
          <p style={{ color: '#707880', fontSize: '0.95rem', marginBottom: '2rem', textAlign: 'center' }}>Silakan masuk menggunakan kredensial admin Anda.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Alamat Email Akses</label>
              <InputField 
                id="email"
                type="email" 
                placeholder="admin@7utors.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#131b2e' }}>Kata Sandi</label>
              </div>
              <div style={{ position: 'relative' }}>
                <InputField 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#006397', fontWeight: 600 }}
                >
                  {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
            </div>
            
            <Button type="submit" style={{ width: '100%', marginTop: '0.5rem', backgroundColor: '#131b2e', color: '#fff', border: 'none' }}>
              Masuk ke Portal
            </Button>
          </form>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: '#707880' }}>Bukan admin? <a href="/login" style={{ color: '#006397', fontWeight: 600, textDecoration: 'none' }}>Login sebagai Tentor</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
