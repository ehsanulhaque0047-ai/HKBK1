import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  CalendarDays,
  BookOpen,
  FileText,
  Award,
  CreditCard,
  Library,
  FileCheck,
  HelpCircle,
  Briefcase,
  Bell,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
  LogOut,
  Sparkles,
  MessageSquare,
  FolderUp,
  FileClock,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { usePackage } from '../../context/PackageContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { packageTier, currentPackage } = usePackage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Student Navigation Links matching Section 4
  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/profile', label: 'My Profile', icon: GraduationCap },
    { to: '/student/attendance', label: 'Attendance', icon: UserCheck, badge: '84.6%' },
    { to: '/student/timetable', label: 'Timetable', icon: CalendarDays },
    { to: '/student/academics', label: 'Subjects', icon: BookOpen },
    { to: '/student/assignments', label: 'Assignments', icon: FileText, badge: '2 Due' },
    { to: '/student/examination', label: 'Examinations', icon: Award },
    { to: '/student/results', label: 'Results', icon: BarChart3 },
    { to: '/student/fees', label: 'Fees', icon: CreditCard },
    { to: '/student/library', label: 'Study Materials', icon: Library },
    { to: '/student/notifications', label: 'Notices', icon: Bell },
    { to: '/student/documents', label: 'Documents', icon: FileCheck },
    { to: '/student/complaints', label: 'Help and Support', icon: HelpCircle },
    { to: '/packages', label: 'Commercial Packages', icon: Sparkles }
  ];

  // Faculty Navigation Links
  const facultyLinks = [
    { to: '/faculty/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/faculty/attendance', label: 'Mark Attendance', icon: UserCheck },
    { to: '/faculty/assignments', label: 'Assignment Manager', icon: FileText },
    { to: '/faculty/internal-marks', label: 'Internal Assessment Marks', icon: Award },
    { to: '/faculty/materials', label: 'Upload Study Notes', icon: FolderUp },
    { to: '/faculty/students', label: 'Student Cohort (6th CSE)', icon: Users },
    { to: '/faculty/leaves', label: 'Faculty Leave Request', icon: FileClock },
    { to: '/packages', label: 'Commercial Packages', icon: Sparkles }
  ];

  // Administrator Navigation Links
  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Command Center', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Student Records', icon: GraduationCap },
    { to: '/admin/faculty', label: 'Faculty Roster', icon: Users },
    { to: '/admin/departments', label: 'Departments & Intake', icon: Building2 },
    { to: '/admin/fees', label: 'Student Fee Balances', icon: CreditCard },
    { to: '/admin/documents', label: 'Certificate Approvals', icon: FileCheck },
    { to: '/admin/complaints', label: 'Grievance Redressal', icon: HelpCircle },
    { to: '/admin/notices', label: 'Broadcast Circulars', icon: Bell },
    { to: '/packages', label: 'Commercial Packages', icon: Sparkles }
  ];

  // Parent Navigation Links
  const parentLinks = [
    { to: '/parent/dashboard', label: 'Ward Overview', icon: LayoutDashboard },
    { to: '/parent/attendance', label: 'Subject Attendance', icon: UserCheck },
    { to: '/parent/results', label: 'Academic Performance', icon: Award },
    { to: '/parent/fees', label: 'Fee Dues & Receipts', icon: CreditCard },
    { to: '/parent/communication', label: 'Proctor Communication', icon: MessageSquare },
    { to: '/packages', label: 'Commercial Packages', icon: Sparkles }
  ];

  const roleLinks = {
    student: studentLinks,
    faculty: facultyLinks,
    admin: adminLinks,
    parent: parentLinks
  }[role] || studentLinks;

  const roleTitle = {
    student: 'Student Portal',
    faculty: 'Faculty Portal',
    admin: 'Administrator',
    parent: 'Parent Portal'
  }[role] || 'Academic Portal';

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="simp-sidebar-backdrop"
        />
      )}

      <aside
        className={`simp-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          className="sidebar-brand-header"
          style={{
            padding: '1.2rem 1.35rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <img
            src="/hkbk-crest.svg"
            alt="HKBK Crest"
            style={{ width: '40px', height: '40px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  color: '#FFFFFF'
                }}
              >
                HKBK
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal)',
                  background: 'var(--accent-teal-subtle)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(54, 198, 176, 0.25)'
                }}
              >
                SIMP
              </span>
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: '#718096',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              College of Engineering
            </div>
          </div>
        </div>

        {/* Role Pill Banner */}
        <div
          style={{
            padding: '0.65rem 1.35rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-teal-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={12} color="var(--accent-teal)" />
            {roleTitle}
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            VTU / AICTE
          </span>
        </div>

        {/* Quick Role Switcher */}
        <div
          style={{
            padding: '0.5rem 0.75rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.25rem'
          }}
          className="sidebar-role-switcher"
        >
          {[
            { key: 'student', label: 'Student' },
            { key: 'faculty', label: 'Faculty' },
            { key: 'admin', label: 'Admin' },
            { key: 'parent', label: 'Parent' }
          ].map((r) => (
            <button
              key={r.key}
              onClick={() => {
                switchRole(r.key);
                navigate(`/${r.key}/dashboard`);
                if (onCloseMobile) onCloseMobile();
              }}
              style={{
                padding: '0.35rem 0.2rem',
                fontSize: '0.68rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                backgroundColor: role === r.key ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.04)',
                color: role === r.key ? '#07101D' : '#A5B4C7',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Navigation Items with Subtle Glass & Teal Active Indicator */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.85rem 0.7rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem'
          }}
        >
          {roleLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : '#A5B4C7',
                  backgroundColor: isActive ? 'rgba(54, 198, 176, 0.12)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent-teal)' : '3px solid transparent',
                  transition: 'all 0.15s ease'
                })}
              >
                <Icon size={17} style={{ flexShrink: 0, opacity: 0.95 }} />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.12rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(54, 198, 176, 0.15)',
                      color: 'var(--accent-teal-light)',
                      border: '1px solid rgba(54, 198, 176, 0.3)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Subtle Glass Commercial Package Banner */}
        <div
          onClick={() => {
            navigate('/packages');
            if (onCloseMobile) onCloseMobile();
          }}
          style={{
            margin: '0.4rem 0.75rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(54, 198, 176, 0.08)',
            border: '1px solid rgba(54, 198, 176, 0.25)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease'
          }}
          title="View Packages: P1 Website (₹1.20L) / P2 +Android (₹1.68L) / P3 +Android+iOS (₹2.16L)"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <Sparkles size={15} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: 'var(--accent-teal-light)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentPackage?.shortName || currentPackage?.name}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#718096' }}>
                {currentPackage?.devPrice} Dev • {currentPackage?.hostingPrice}
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-teal)', fontWeight: 800, flexShrink: 0 }}>
            ➔
          </span>
        </div>

        {/* User Mini Profile Footer */}
        <div
          style={{
            padding: '0.85rem 1rem',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'rgba(11, 18, 32, 0.6)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.6rem'
            }}
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
              alt={currentUser?.name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-teal)'
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#F1F5F9',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentUser?.name}
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--accent-teal)',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                {role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.74rem',
              fontWeight: 600,
              color: 'var(--status-danger)',
              background: 'var(--status-danger-bg)',
              border: '1px solid var(--status-danger-border)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
