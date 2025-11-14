import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import Events from './components/Events.jsx';
import Payments from './components/Payments.jsx';
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
        <Link to="/events">RowdyPal</Link>
      </div>
      <div className="nav-links">
        <div className="user-menu">
          <span className="user-icon">👤</span>
          <div className="user-dropdown">
            <Link 
              to="/events" 
              className={`dropdown-item ${location.pathname === '/events' ? 'active' : ''}`}
            >
              Events
            </Link>
            <Link 
              to="/payments" 
              className={`dropdown-item ${location.pathname === '/payments' ? 'active' : ''}`}
            >
              Payments
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
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
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
            {process.env.NODE_ENV === 'development' && (
            <Route
              path="/debug"
              element={
                <ProtectedRoute>
                  <DebugEvents />
                </ProtectedRoute>
              }
            />
            )}
            <Route path="/" element={<Navigate to="/events" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;