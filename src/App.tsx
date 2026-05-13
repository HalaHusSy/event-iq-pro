import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { ApiPlaygroundPage } from './pages/ApiPlaygroundPage'
import { EventAdminPage } from './pages/EventAdminPage'
import { EventMatchPage } from './pages/EventMatchPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { PlatformPage } from './pages/PlatformPage'
import { RootDashboard } from './pages/RootDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="platform" element={<PlatformPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="root" element={<RootDashboard />} />
          <Route path="root/api-lab" element={<ApiPlaygroundPage />} />
          <Route path="e/:eventId/admin" element={<EventAdminPage />} />
          <Route path="e/:eventId/match" element={<EventMatchPage />} />
          <Route path="visitor" element={<Navigate to="/events" replace />} />
          <Route path="exhibitor" element={<Navigate to="/events" replace />} />
          <Route path="admin" element={<Navigate to="/events" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
