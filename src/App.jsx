import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PackageProvider, usePackage } from './context/PackageContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppRoutes } from './routes/AppRoutes';
import { PackageComparisonModal } from './components/packages/PackageComparisonModal';
import './styles/index.css';
import './styles/components.css';

function AppContent() {
  const { isComparisonModalOpen, setIsComparisonModalOpen } = usePackage();
  return (
    <>
      <AppRoutes />
      <PackageComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PackageProvider>
          <AuthProvider>
            <DataProvider>
              <AppContent />
            </DataProvider>
          </AuthProvider>
        </PackageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
