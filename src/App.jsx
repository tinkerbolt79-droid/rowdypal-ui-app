import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import Dashboard from './components/Dashboard.jsx';
import DebugEvents from './components/DebugEvents.jsx';
import './App.css';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}

function Navigation() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/dashboard">RowdyPal</Link>
      </div>
      <div className="nav-links">
        <div className="user-menu">
          <span className="user-icon">👤</span>
          <div className="user-dropdown">
            <Link 
              to="/dashboard" 
              className={`dropdown-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`dropdown-item ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/debug"
              element={
                <ProtectedRoute>
                  <DebugEvents />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;