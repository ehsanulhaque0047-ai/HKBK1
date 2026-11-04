import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navbar } from '../components/navbar/Navbar';
import { Toast } from '../components/common/Toast';

export const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-page)' }}>
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: 'var(--sidebar-width)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          transition: 'margin-left 0.3s ease'
        }}
        className="simp-main-wrapper"
      >
        <Navbar onToggleMobile={() => setIsMobileOpen(!isMobileOpen)} />

        <main
          style={{
            flex: 1,
            padding: '1.75rem',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          <Outlet />
        </main>

        {/* Academic Footer */}
        <footer
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-surface)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
          className="no-print"
        >
          <div>
            <strong>HKBK College of Engineering</strong> – Student Information & Management Portal (SIMP) v2.4
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>VTU Permanent Affiliation: 1HK</span>
            <span>NAAC Accredited</span>
            <span>AICTE Approved</span>
          </div>
        </footer>
      </div>

      <Toast />

      {/* Global CSS for layout responsiveness */}
      <style>{`
        @media (max-width: 1024px) {
          .simp-sidebar {
            transform: translateX(-100%);
          }
          .simp-sidebar.mobile-open {
            transform: translateX(0);
          }
          .simp-main-wrapper {
            margin-left: 0 !important;
          }
          #mobile-nav-toggle {
            display: inline-flex !important;
          }
          .role-switcher-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

