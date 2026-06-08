import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%207utors%2C%20saya%20ingin%20mendaftar%20bimbel'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/login', label: 'Login' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="navbar-glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', padding: '0 1.5rem' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#006397', letterSpacing: '-0.02em' }}>
            7utors
          </span>
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: '#004b73', background: '#cce5ff', padding: '2px 10px', borderRadius: '9999px' }}>
            Bimbel
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.3s',
                color: location.pathname === link.to ? '#006397' : '#40484f',
                backgroundColor: location.pathname === link.to ? 'rgba(204, 229, 255, 0.6)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.75rem', textDecoration: 'none' }}>
            <button className="btn btn-primary btn-sm" style={{ fontSize: '0.85rem' }}>
              Hubungi Kami
            </button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            width: '40px', height: '40px', borderRadius: '0.5rem', border: 'none', background: 'transparent',
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#131b2e', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#131b2e', marginTop: '4px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#131b2e', marginTop: '4px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden"
        style={{
          overflow: 'hidden',
          transition: 'all 0.3s ease-out',
          maxHeight: menuOpen ? '260px' : '0',
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div style={{ padding: '0 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(192,199,209,0.5)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.625rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: location.pathname === link.to ? '#006397' : '#40484f',
                backgroundColor: location.pathname === link.to ? 'rgba(204, 229, 255, 0.6)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary btn-sm"
            style={{ textAlign: 'center', marginTop: '4px', textDecoration: 'none' }}
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  )
}
