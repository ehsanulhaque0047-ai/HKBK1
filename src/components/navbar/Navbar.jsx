import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Users,
  Shield,
  HeartHandshake,
  ExternalLink,
  X,
  Sparkles,
  ChevronDown,
  Layers,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { usePackage, PACKAGES } from '../../context/PackageContext';

export const Navbar = ({ onToggleMobile }) => {
  const { currentUser, role, switchRole } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const { announcements, markAnnouncementRead } = useData();
  const { packageTier, setPackageTier, currentPackage, setIsComparisonModalOpen } = usePackage();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showPackageDropdown, setShowPackageDropdown] = useState(false);
  const packageDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (packageDropdownRef.current && !packageDropdownRef.current.contains(e.target)) {
        setShowPackageDropdown(false);
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

  const roleConfigs = [
    { key: 'student', label: 'Student', icon: GraduationCap },
    { key: 'faculty', label: 'Faculty', icon: Users },
    { key: 'admin', label: 'Admin', icon: Shield },
    { key: 'parent', label: 'Parent', icon: HeartHandshake }
  ];

  return (
    <header className="simp-navbar">
      {/* Left: Mobile Hamburger Toggle + HKBK Brand */}
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
          title="HKBK College of Engineering Portal"
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
              Visvesvaraya Technological University (VTU) Belagavi | Campus: Nagawara, Bengaluru
            </div>
          </div>
        </div>
      </div>

      {/* Center: Main Navigation (Desktop) */}
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
              <Icon size={14} color={isSelected ? 'var(--accent-gold)' : 'var(--text-muted)'} />
              <span>{cfg.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Package Selector Dropdown + User Controls (Theme, Notifications, Profile) */}
      <div className="simp-navbar-right">
        {/* Compact Package Selector with Dropdown */}
        <div className="package-selector-wrapper" ref={packageDropdownRef}>
          <button
            onClick={() => setShowPackageDropdown(!showPackageDropdown)}
            title="Switch demo package"
            className="package-selector-btn"
            style={{
              background:
                packageTier === 'package3' || packageTier === 'complete'
                  ? 'linear-gradient(135deg, rgba(214, 172, 98, 0.2) 0%, rgba(20, 36, 58, 0.6) 100%)'
                  : packageTier === 'package2' || packageTier === 'advanced'
                  ? 'rgba(46, 117, 211, 0.16)'
                  : 'var(--bg-subtle)',
              border:
                packageTier === 'package3' || packageTier === 'complete'
                  ? '1px solid var(--accent-gold)'
                  : '1px solid var(--border-light)',
              color: packageTier === 'package3' || packageTier === 'complete' ? 'var(--accent-gold)' : 'var(--text-primary)'
            }}
          >
            <Sparkles size={13} color="var(--accent-gold)" />
            <span className="package-tier-pill-name">
              {currentPackage?.shortName || currentPackage?.name}
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: packageTier === 'package3' || packageTier === 'complete' ? 'var(--accent-gold)' : 'var(--accent-blue)'
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
                        Dev: <strong style={{ color: 'var(--accent-gold)' }}>{pkg.devPrice}</strong> • Host: {pkg.hostingPrice}/yr
                      </div>
                    </div>
                    {isSelected && <Check size={14} color="var(--accent-gold)" />}
                  </button>
                );
              })}

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.35rem', marginTop: '0.2rem' }}>
                <button
                  onClick={() => {
                    setShowPackageDropdown(false);
                    setIsComparisonModalOpen(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.4rem 0.6rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
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
                  <span>Compare All 3 Packages ↗</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Profile Chip (Desktop) */}
        <div className="navbar-user-chip">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
            alt=""
            style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-gold)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {currentUser?.name?.split(' ')[0] || 'User'}
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700 }}>
              {role}
            </span>
          </div>
        </div>

        {/* Dark / Light Mode Switch */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="simp-btn-subtle"
          style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {isDark ? <Sun size={17} color="#D6AC62" /> : <Moon size={17} color="var(--primary-navy)" />}
        </button>

        {/* Notifications Popover Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="simp-btn-subtle"
            style={{
              padding: '0.5rem',
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
            <Bell size={17} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-surface)'
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
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '0.9rem 1.1rem',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-muted)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  Notices & Circulars ({unreadCount} new)
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {announcements.slice(0, 5).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAnnouncementRead(notif.id)}
                    style={{
                      padding: '0.85rem 1.1rem',
                      borderBottom: '1px solid var(--border-light)',
                      backgroundColor: notif.read ? 'transparent' : 'var(--accent-gold-subtle)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: notif.isUrgent ? 'var(--status-danger)' : 'var(--accent-blue)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {notif.category}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.82rem',
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
                  padding: '0.75rem',
                  borderTop: '1px solid var(--border-light)',
                  textAlign: 'center',
                  background: 'var(--bg-muted)'
                }}
              >
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate(`/${role}/notifications`);
                  }}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--accent-blue)',
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
      </div>
    </header>
  );
};

