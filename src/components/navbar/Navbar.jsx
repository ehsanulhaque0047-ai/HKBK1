import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export const Navbar = ({ onToggleMobile }) => {
  const { currentUser, role, switchRole } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const { announcements, markAnnouncementRead } = useData();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

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
    <header
      style={{
        height: 'var(--navbar-height)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      {/* Left: Mobile Toggle & Page Academic Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleMobile}
          aria-label="Toggle Navigation Menu"
          className="simp-btn-subtle"
          style={{
            padding: '0.45rem',
            borderRadius: 'var(--radius-md)',
            display: 'none' // enabled via media query in css
          }}
          id="mobile-nav-toggle"
        >
          <Menu size={20} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              HKBK College of Engineering
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-subtle)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600
              }}
            >
              AY 2024–25 (Even Sem)
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Visvesvaraya Technological University (VTU) Belagavi | Campus: Nagawara, Bengaluru
          </div>
        </div>
      </div>

      {/* Center/Right: Role Switcher Demo Pills + Theme + Notifications */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Quick 1-Click Role Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-subtle)',
            padding: '0.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}
          className="role-switcher-container"
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0 0.5rem',
              letterSpacing: '0.04em'
            }}
          >
            Role:
          </span>
          {roleConfigs.map((cfg) => {
            const Icon = cfg.icon;
            const isSelected = role === cfg.key;
            return (
              <button
                key={cfg.key}
                onClick={() => handleRoleChange(cfg.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--primary-navy)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid transparent',
                  boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} color={isSelected ? 'var(--accent-gold)' : undefined} />
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dark / Light Mode Switch */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="simp-btn-subtle"
          style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}
        >
          {isDark ? <Sun size={18} color="#DFBF77" /> : <Moon size={18} color="var(--primary-navy)" />}
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
              position: 'relative'
            }}
            title="Announcements & Notices"
          >
            <Bell size={18} />
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
                width: '360px',
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
                  style={{ color: 'var(--text-muted)' }}
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
                    gap: '0.3rem'
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

