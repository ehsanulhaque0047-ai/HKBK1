import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, getStoredData } from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = storageService.getCurrentUser();
    if (saved) return saved;
    // Default to student for instant preview experience
    const initial = getStoredData();
    const defaultStudent = initial.users.find((u) => u.role === 'student');
    storageService.setCurrentUser(defaultStudent);
    return defaultStudent;
  });

  const [loading, setLoading] = useState(false);

  const login = async (username, password, role) => {
    setLoading(true);
    try {
      const res = await storageService.login(username, password, role);
      setCurrentUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    const data = getStoredData();
    const user = data.users.find((u) => u.role === role);
    if (user) {
      storageService.setCurrentUser(user);
      setCurrentUser(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || null,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
