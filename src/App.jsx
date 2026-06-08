import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardTentorPage from './pages/DashboardTentorPage'
import AdminLoginPage from './pages/AdminLoginPage'
import DashboardAdminPage from './pages/DashboardAdminPage'

function App() {
  return (
    <Routes>
      {/* Public routes with Navbar & Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Dashboard (own layout, no public navbar) */}
      <Route path="/tentor" element={<DashboardTentorPage />} />

      {/* Admin Portal */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
    </Routes>
  )
}

export default App
