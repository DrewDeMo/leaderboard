import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin" element={<AdminDashboard />}>
                <Route path="posts" element={<AdminPosts />} />
                <Route path="leaderboard" element={<AdminLeaderboard />} />
              </Route>
            </Route>
          </Routes>
        </PostsProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
