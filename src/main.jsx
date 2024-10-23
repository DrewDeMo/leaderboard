import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { PostsProvider } from './contexts/PostsContext'
import App from './App'
import HomePage from './pages/HomePage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminPosts from './pages/AdminPosts'
import AdminLeaderboard from './pages/AdminLeaderboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <PostsProvider>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin">
                <Route path="login" element={<AdminLogin />} />
                <Route path="" element={<AdminDashboard />}>
                  <Route index element={<Navigate to="posts" replace />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="leaderboard" element={<AdminLeaderboard />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </PostsProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
