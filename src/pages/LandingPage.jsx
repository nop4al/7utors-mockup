import Button from '../components/Button'
import Card from '../components/Card'

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%207utors%2C%20saya%20ingin%20mendaftar%20bimbel'
const WA_UMUM = 'https://wa.me/6281234567890?text=Halo%207utors%2C%20saya%20ingin%20mendaftar%20bimbel%20umum'
const WA_PRIVAT = 'https://wa.me/6281234567890?text=Halo%207utors%2C%20saya%20ingin%20mendaftar%20bimbel%20private'

/* Simple inline SVG icons */
const IconGradCap = () => (
  <svg style={{ width: 40, height: 40, color: '#006397' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15v-3.375c0-.621.504-1.125 1.125-1.125h.375" />
  </svg>
)

const IconCalendar = () => (
  <svg style={{ width: 40, height: 40, color: '#825500' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
)

const IconChart = () => (
  <svg style={{ width: 40, height: 40, color: '#006d36' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
)

const features = [
  {
    icon: <IconGradCap />,
    title: 'Tentor Berkualitas',
    desc: 'Tentor terseleksi dari universitas ternama dengan pengalaman mengajar yang mumpuni.',
    delay: '0ms',
  },
  {
    icon: <IconCalendar />,
    title: 'Jadwal Fleksibel',
    desc: 'Atur jadwal belajar sesuai kenyamanan Anda. Privat atau kelas umum tersedia.',
    delay: '150ms',
  },
  {
    icon: <IconChart />,
    title: 'Evaluasi Berkala',
    desc: 'Pantau perkembangan belajar anak melalui laporan evaluasi yang detail dan terstruktur.',
    delay: '300ms',
  },
]

export default function LandingPage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ===== Hero Section ===== */}
      <section className="bg-gradient-hero" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '80px', right: '40px', width: '288px', height: '288px', background: 'rgba(125, 196, 255, 0.15)', borderRadius: '50%', filter: 'blur(48px)', animation: 'float 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '80px', left: '40px', width: '224px', height: '224px', background: 'rgba(253, 182, 75, 0.12)', borderRadius: '50%', filter: 'blur(48px)', animation: 'float 8s ease-in-out infinite 1s' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '384px', height: '384px', background: 'rgba(65, 215, 122, 0.08)', borderRadius: '50%', filter: 'blur(48px)' }} />

        <div className="animate-fade-in" style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem', width: '100%' }}>
          <div style={{ maxWidth: '720px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(204, 229, 255, 0.6)', color: '#004b73', fontSize: '0.875rem', fontWeight: 600, padding: '0.375rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              ✨ Platform Bimbel #1 Terpercaya
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 800, color: '#131b2e', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Bimbingan Belajar Terbaik untuk{' '}
              <span className="text-gradient-primary">Masa Depan Cemerlang</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#40484f', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '600px' }}>
              7utors menghubungkan siswa dengan tentor berkualitas melalui
              sistem manajemen modern. Daftar sekarang dan rasakan pengalaman
              belajar yang berbeda.
            </p>
            <div className="hero-cta-wrapper">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button size="lg" style={{ width: '100%' }}>Daftar via WhatsApp</Button>
              </a>
              <a href="#fitur" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg" style={{ width: '100%' }}>
                  Pelajari Lebih Lanjut
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="fitur" style={{ padding: '5rem 0', backgroundColor: '#faf8ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#006397', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Mengapa 7utors?
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#131b2e', marginTop: '0.75rem' }}>
              Keunggulan Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="animate-slide-up"
                style={{ animationDelay: f.delay }}
              >
                <Card className="text-center" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(204, 229, 255, 0.3)', borderRadius: '1rem', width: 'fit-content' }}>
                      {f.icon}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#131b2e', marginBottom: '0.5rem' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: '#40484f', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    {f.desc}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Programs Section ===== */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f2f3ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#006397', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Program
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#131b2e', marginTop: '0.75rem' }}>
              Pilih Program Belajarmu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Bimbel Umum */}
            <Card colorStrip="#006d36">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(65, 215, 122, 0.15)', color: '#006d36', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
                  <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#131b2e' }}>
                  Bimbel Umum
                </h3>
              </div>
              <p style={{ color: '#40484f', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
                Belajar bersama dalam kelompok kecil dengan jadwal yang telah
                ditentukan. Cocok untuk siswa yang ingin suasana belajar interaktif.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#131b2e', marginBottom: '1.5rem' }}>
                {['Kelas kelompok kecil (maks 8 siswa)', 'Jadwal terstruktur', 'Evaluasi rutin', 'Biaya terjangkau'].map(
                  (item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#006d36', fontWeight: 700 }}>✓</span> {item}
                    </li>
                  ),
                )}
              </ul>
              <a href={WA_UMUM} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <Button className="w-full">Daftar via WhatsApp</Button>
              </a>
            </Card>

            {/* Bimbel Private */}
            <Card colorStrip="#825500">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(253, 182, 75, 0.15)', color: '#825500', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
                  <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#131b2e' }}>
                  Bimbel Private
                </h3>
              </div>
              <p style={{ color: '#40484f', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
                Satu tentor untuk satu siswa dengan jadwal fleksibel sesuai
                kebutuhan. Pilih kualifikasi tentor yang Anda inginkan.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#131b2e', marginBottom: '1.5rem' }}>
                {['Satu tentor, satu siswa', 'Jadwal fleksibel', 'Pilih kualifikasi tentor', 'Materi disesuaikan'].map(
                  (item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#825500', fontWeight: 700 }}>✓</span> {item}
                    </li>
                  ),
                )}
              </ul>
              <a href={WA_PRIVAT} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <Button variant="secondary" className="w-full">Daftar via WhatsApp</Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="bg-gradient-primary" style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '240px', height: '240px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(32px)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '288px', height: '288px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(32px)' }} />
        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem' }}>
            Siap Memulai Perjalanan Belajarmu?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Bergabung bersama ribuan siswa yang telah merasakan manfaat bimbel
            bersama 7utors. Daftar sekarang dan tingkatkan prestasi belajarmu!
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button
              className="btn"
              style={{
                backgroundColor: '#ffffff',
                color: '#006397',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.125rem',
                padding: '1rem 2.5rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.backgroundColor = '#cce5ff'; }}
              onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.backgroundColor = '#ffffff'; }}
            >
              Hubungi Kami via WhatsApp
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}
