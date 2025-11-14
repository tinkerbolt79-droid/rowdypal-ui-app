import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login: (email, password) => signInWithEmailAndPassword(auth, email, password).catch(err => {
      console.error('Login error:', err);
      throw err;
    }),
    signup: (email, password) => createUserWithEmailAndPassword(auth, email, password).catch(err => {
      console.error('Signup error:', err);
      throw err;
    }),
    logout: () => signOut(auth).catch(err => {
      console.error('Logout error:', err);
      throw err;
    }),
    googleSignIn: () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider).catch(err => {
        console.error('Google sign-in error:', err);
        throw err;
      });
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}