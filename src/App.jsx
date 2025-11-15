import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import Events from './components/Events';
import GiftOptions from './components/GiftOptions';
import PaymentMethods from './components/PaymentMethods';
import ProfilePage from './components/ProfilePage';
import DebugEvents from './components/DebugEvents';
import './global.css';

function App() {
  const { currentUser } = useAuth();
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  // Public route component (redirects logged in users)
  const PublicRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/events" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        } />
        <Route path="/events/:eventId/gifts" element={
          <ProtectedRoute>
            <GiftOptions />
          </ProtectedRoute>
        } />
        <Route path="/payments" element={
          <ProtectedRoute>
            <PaymentMethods />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/debug" element={
          <ProtectedRoute>
            <DebugEvents />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/events" />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

export default AppWrapper;