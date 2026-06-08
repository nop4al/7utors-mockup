import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#283044', color: '#eef0ff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              7utors
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(238, 240, 255, 0.7)', lineHeight: 1.7 }}>
              Platform Manajemen Bimbingan Belajar terpercaya. Menghubungkan
              siswa dengan tentor berkualitas untuk masa depan yang lebih cerah.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'rgba(238, 240, 255, 0.5)' }}>
              Navigasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { to: '/', label: 'Beranda' },
                { to: '/login', label: 'Login' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{ fontSize: '0.875rem', color: 'rgba(238, 240, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.target.style.color = '#eef0ff')}
                    onMouseOut={(e) => (e.target.style.color = 'rgba(238, 240, 255, 0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'rgba(238, 240, 255, 0.5)' }}>
              Informasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {['Tentang Kami', 'Hubungi Kami', 'Kebijakan Privasi'].map(
                (item) => (
                  <li key={item}>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(238, 240, 255, 0.7)', cursor: 'pointer', transition: 'color 0.2s' }}>
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(238, 240, 255, 0.1)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(238, 240, 255, 0.5)' }}>
            &copy; 2026 7utors. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
