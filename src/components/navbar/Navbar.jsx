import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  GraduationCap,
  Users,
  Shield,
  HeartHandshake,
  ExternalLink,
  X,
  Sparkles,
  ChevronDown,
  Layers,
  User,
  LogOut,
  Settings,
  BookOpen,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { usePackage, PACKAGES } from '../../context/PackageContext';

export const Navbar = ({ onToggleMobile }) => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const { announcements, markAnnouncementRead } = useData();
  const { packageTier, setPackageTier, currentPackage, setIsComparisonModalOpen } = usePackage();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showPackageDropdown, setShowPackageDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const packageDropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (packageDropdownRef.current && !packageDropdownRef.current.contains(e.target)) {
        setShowPackageDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = announcements.filter((a) => !a.read).length;

  const handleRoleChange = (newRole) => {
    switchRole(newRole);
    if (newRole === 'student') navigate('/student/dashboard');
    else if (newRole === 'faculty') navigate('/faculty/dashboard');
    else if (newRole === 'admin') navigate('/admin/dashboard');
    else if (newRole === 'parent') navigate('/parent/dashboard');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;

    if (q.includes('attend')) navigate(`/${role}/attendance`);
    else if (q.includes('time') || q.includes('sched')) navigate(`/${role}/timetable`);
    else if (q.includes('fee') || q.includes('pay')) navigate(`/${role}/fees`);
    else if (q.includes('exam') || q.includes('mark') || q.includes('result')) navigate(`/${role}/examination`);
    else if (q.includes('prof') || q.includes('user')) navigate(`/${role}/profile`);
    else if (q.includes('pack') || q.includes('price')) navigate('/packages');
    else if (q.includes('assign')) navigate(`/${role}/assignments`);
    else navigate(`/${role}/dashboard`);

    setSearchQuery('');
  };

  const roleConfigs = [
    { key: 'student', label: 'Student', icon: GraduationCap },
    { key: 'faculty', label: 'Faculty', icon: Users },
    { key: 'admin', label: 'Admin', icon: Shield },
    { key: 'parent', label: 'Parent', icon: HeartHandshake }
  ];

  return (
    <header className="simp-navbar">
      {/* Left: Mobile Hamburger Toggle + HKBK Brand Identity */}
      <div className="simp-navbar-left">
        <button
          onClick={onToggleMobile}
          aria-label="Toggle Navigation Menu"
          className="mobile-nav-toggle"
          id="mobile-nav-toggle"
        >
          <Menu size={20} />
        </button>

        <div
          className="simp-navbar-brand"
          onClick={() => handleRoleChange(role)}
          title="HKBK College of Engineering – SIMP"
        >
          <img
            src="/hkbk-crest.svg"
            alt="HKBK Crest"
            className="simp-navbar-brand-logo"
          />
          <div className="simp-navbar-title-wrap">
            <div className="simp-navbar-title-row">
              <span className="simp-navbar-college-name-desktop">
                HKBK College of Engineering
              </span>
              <span className="simp-navbar-college-name-mobile">
                HKBK CE
              </span>
              <span className="simp-navbar-sem-badge">
                AY 2024–25 (Even Sem)
              </span>
            </div>
            <div className="simp-navbar-subtitle">
              Visvesvaraya Technological University (VTU) Belagavi | Center Code: 1HK
            </div>
          </div>
        </div>
      </div>

      {/* Center: Main Role Navigation (Desktop) */}
      <nav className="simp-navbar-center" aria-label="Portal Role Navigation">
        {roleConfigs.map((cfg) => {
          const Icon = cfg.icon;
          const isSelected = role === cfg.key;
          return (
            <button
              key={cfg.key}
              onClick={() => handleRoleChange(cfg.key)}
              className={`simp-nav-pill ${isSelected ? 'active' : ''}`}
              title={`Switch to ${cfg.label} Dashboard`}
            >
              <Icon size={14} color={isSelected ? 'var(--accent-teal)' : 'var(--text-muted)'} />
              <span>{cfg.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Search, Notifications, Package selector, User Profile Menu */}
      <div className="simp-navbar-right">
        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="navbar-search-box">
          <Search size={14} className="navbar-search-icon" />
          <input
            type="text"
            placeholder="Search portal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
        </form>

        {/* Compact Package Selector with Subtle Glass Dropdown */}
        <div className="package-selector-wrapper" ref={packageDropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowPackageDropdown(!showPackageDropdown)}
            title="Switch demo package"
            className="package-tier-pill"
            style={{
              background: 'rgba(54, 198, 176, 0.12)',
              border: '1px solid rgba(54, 198, 176, 0.35)',
              color: 'var(--accent-teal-light)'
            }}
          >
            <Sparkles size={13} color="var(--accent-teal)" />
            <span className="package-tier-pill-name">
              {currentPackage?.shortName || currentPackage?.name}
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: 'var(--accent-teal)'
              }}
            >
              {currentPackage?.devPrice}
            </span>
            <ChevronDown size={12} style={{ opacity: 0.7 }} />
          </button>

          {/* Compact Dropdown Menu */}
          {showPackageDropdown && (
            <div className="package-selector-dropdown">
              <div
                style={{
                  padding: '0.35rem 0.6rem 0.45rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border-light)',
                  letterSpacing: '0.04em'
                }}
              >
                Select Package Tier
              </div>

              {PACKAGES.map((pkg) => {
                const isSelected = packageTier === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      setPackageTier(pkg.id);
                      setShowPackageDropdown(false);
                    }}
                    className={`package-selector-item ${isSelected ? 'active' : ''}`}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        P{pkg.number}: {pkg.shortName}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        Dev: <strong style={{ color: 'var(--accent-teal)' }}>{pkg.devPrice}</strong> • Host: {pkg.hostingPrice}/yr
                      </div>
                    </div>
                  </button>
                );
              })}

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.35rem', marginTop: '0.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <button
                  onClick={() => {
                    setShowPackageDropdown(false);
                    navigate('/packages');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.4rem 0.6rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--accent-teal)',
                    background: 'rgba(54, 198, 176, 0.1)',
                    border: '1px solid rgba(54, 198, 176, 0.25)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Sparkles size={13} color="var(--accent-teal)" />
                  <span>Dedicated Packages Page ➔</span>
                </button>

                <button
                  onClick={() => {
                    setShowPackageDropdown(false);
                    setIsComparisonModalOpen(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--accent-blue)',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Layers size={13} />
                  <span>Compare Feature Matrix ↗</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dark / Light Mode Switch */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="simp-btn-subtle"
          style={{
            padding: '0.45rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {isDark ? <Sun size={16} color="var(--accent-teal)" /> : <Moon size={16} color="var(--accent-blue)" />}
        </button>

        {/* Notifications Popover Toggle */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="simp-btn-subtle"
            style={{
              padding: '0.45rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Announcements & Notices"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--status-danger)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '320px',
                maxWidth: '90vw',
                background: '#101B2C',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-glass)',
                zIndex: 200,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#F1F5F9' }}>
                  Notices & Circulars ({unreadCount} new)
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <X size={15} />
                </button>
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {announcements.slice(0, 5).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAnnouncementRead(notif.id)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid var(--border-light)',
                      backgroundColor: notif.read ? 'transparent' : 'rgba(54, 198, 176, 0.06)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: notif.isUrgent ? 'var(--status-danger)' : 'var(--accent-teal)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {notif.category}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: notif.read ? 500 : 700,
                        marginTop: '0.2rem',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {notif.title}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: '0.65rem',
                  borderTop: '1px solid var(--border-light)',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate(`/${role}/notifications`);
                  }}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent-teal)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>View All Circulars</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu (Desktop & Mobile) */}
        <div style={{ position: 'relative' }} ref={userMenuRef}>
          <div
            className="navbar-user-chip"
            onClick={() => setShowUserMenu(!showUserMenu)}
            title="User Profile & Settings"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
              alt=""
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-teal)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {currentUser?.name?.split(' ')[0] || 'User'}
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--accent-teal)', textTransform: 'uppercase', fontWeight: 700 }}>
                {role}
              </span>
            </div>
            <ChevronDown size={12} color="var(--text-muted)" />
          </div>

          {/* User Profile Popover */}
          {showUserMenu && (
            <div className="user-menu-popover">
              <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#F1F5F9' }}>
                  {currentUser?.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {currentUser?.email}
                </div>
                <div
                  style={{
                    marginTop: '0.35rem',
                    fontSize: '0.65rem',
                    color: 'var(--accent-teal)',
                    background: 'rgba(54, 198, 176, 0.1)',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    display: 'inline-block',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  Role: {role}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate(`/${role}/profile`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <User size={14} color="var(--accent-teal)" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/packages');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={14} color="var(--accent-teal)" />
                <span>Commercial Packages</span>
              </button>

              <div style={{ borderTop: '1px solid var(--border-light)', margin: '0.2rem 0' }} />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                  navigate('/login');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.78rem',
                  color: 'var(--status-danger)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
