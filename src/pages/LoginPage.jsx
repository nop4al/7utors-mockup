import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); navigate('/tentor') }

  return (
    <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex' }}>
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex bg-gradient-primary"
        style={{ width: '50%', position: 'relative', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ position: 'absolute', top: 80, left: 80, width: 160, height: 160, background: 'rgba(255,255,255,0.06)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: 128, right: 64, width: 224, height: 224, background: 'rgba(255,255,255,0.06)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite 1s' }} />
        <div style={{ position: 'absolute', top: '33%', right: '25%', width: 112, height: 112, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animation: 'float 5s ease-in-out infinite 2s' }} />

        <div style={{ position: 'relative', zIndex: 10, padding: '0 3rem', maxWidth: '420px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.15 }}>
            Selamat Datang Kembali di 7utors
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', lineHeight: 1.7 }}>
            Kelola aktivitas mengajar Anda dengan mudah. Pantau jadwal kelas, berikan evaluasi siswa, dan kelola pendapatan Anda dalam satu platform.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <span style={{ width: 8, height: 8, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
            <span style={{ width: 32, height: 8, backgroundColor: '#ffffff', borderRadius: '9999px' }} />
            <span style={{ width: 8, height: 8, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf8ff', padding: '3rem 1rem' }} className="lg:!w-1/2">
        <div className="animate-scale-in" style={{ width: '100%', maxWidth: '420px' }}>
          {/* Mobile brand */}
          <div className="lg:hidden" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#006397' }}>7utors</span>
            <p style={{ color: '#40484f', fontSize: '0.875rem', marginTop: '4px' }}>Masuk ke akun Anda</p>
          </div>

          {/* Form card */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '1.25rem', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', border: '1px solid rgba(192,199,209,0.5)', padding: '2rem' }}>
            <div className="hidden lg:block" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#131b2e' }}>Masuk</h2>
              <p style={{ color: '#40484f', fontSize: '0.875rem', marginTop: '4px' }}>Masukkan email dan password Anda</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <InputField
                label="Email" id="email" type="email" placeholder="email@contoh.com"
                value={form.email} onChange={handleChange} required
                icon={<svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
              />

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="password" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: '#131b2e' }}>
                  Password <span style={{ color: '#ba1a1a' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#707880' }}>
                    <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  </span>
                  <input
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="Masukkan password"
                    value={form.password} onChange={handleChange} required
                    className="input-field has-icon"
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#707880', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    {showPassword ? (
                      <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.875rem', color: '#006397', fontWeight: 500, cursor: 'pointer' }}>Lupa Password?</span>
              </div>

              <Button type="submit" size="lg" className="w-full">Masuk</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
