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
  AlertTriangle,
  Briefcase,
  Bell,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
  LogOut,
  RotateCcw,
  Sparkles,
  MessageSquare,
  FolderUp,
  FileClock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser, role, logout } = useAuth();
  const { resetAllData } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Student Navigation Links
  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/profile', label: 'Student Profile', icon: GraduationCap },
    { to: '/student/attendance', label: 'Attendance', icon: UserCheck, badge: '84.6%' },
    { to: '/student/timetable', label: 'Timetable', icon: CalendarDays },
    { to: '/student/academics', label: 'Academics & Syllabus', icon: BookOpen },
    { to: '/student/assignments', label: 'Assignments', icon: FileText, badge: '2 Due' },
    { to: '/student/examination', label: 'Examinations & Marks', icon: Award },
    { to: '/student/fees', label: 'Fee Payments', icon: CreditCard, alert: true },
    { to: '/student/library', label: 'Central Library', icon: Library },
    { to: '/student/documents', label: 'Document Requests', icon: FileCheck },
    { to: '/student/complaints', label: 'Grievance / Complaints', icon: AlertTriangle },
    { to: '/student/placements', label: 'Placements & Internships', icon: Briefcase },
    { to: '/student/notifications', label: 'Notices & Circulars', icon: Bell }
  ];

  // Faculty Navigation Links
  const facultyLinks = [
    { to: '/faculty/dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
    { to: '/faculty/attendance', label: 'Mark Attendance', icon: UserCheck },
    { to: '/faculty/assignments', label: 'Assignment Manager', icon: FileText },
    { to: '/faculty/internal-marks', label: 'Internal Assessment Marks', icon: Award },
    { to: '/faculty/materials', label: 'Upload Study Notes', icon: FolderUp },
    { to: '/faculty/students', label: 'Student Cohort (6th CSE)', icon: Users },
    { to: '/faculty/leaves', label: 'Faculty Leave Request', icon: FileClock }
  ];

  // Administrator Navigation Links
  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Command Center', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Student Records', icon: GraduationCap },
    { to: '/admin/faculty', label: 'Faculty Roster', icon: Users },
    { to: '/admin/departments', label: 'Departments & Intake', icon: Building2 },
    { to: '/admin/fees', label: 'Student Fee Balances', icon: CreditCard },
    { to: '/admin/documents', label: 'Certificate Approvals', icon: FileCheck },
    { to: '/admin/complaints', label: 'Grievance Redressal', icon: AlertTriangle },
    { to: '/admin/notices', label: 'Broadcast Circulars', icon: Bell }
  ];

  // Parent Navigation Links
  const parentLinks = [
    { to: '/parent/dashboard', label: 'Ward Overview', icon: LayoutDashboard },
    { to: '/parent/attendance', label: 'Subject Attendance', icon: UserCheck },
    { to: '/parent/results', label: 'Academic Performance', icon: Award },
    { to: '/parent/fees', label: 'Fee Dues & Receipts', icon: CreditCard },
    { to: '/parent/communication', label: 'Proctor Communication', icon: MessageSquare }
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
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 90,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      <aside
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--primary-navy)',
          color: '#F8FAFC',
          borderRight: '1px solid rgba(197, 160, 89, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transition: 'transform 0.3s ease',
          transform: isMobileOpen ? 'translateX(0)' : undefined
        }}
        className={`simp-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.4rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <img
            src="/hkbk-crest.svg"
            alt="HKBK Crest"
            style={{ width: '42px', height: '42px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF'
                }}
              >
                HKBK
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  background: 'rgba(197, 160, 89, 0.15)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(197, 160, 89, 0.3)'
                }}
              >
                SIMP
              </span>
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: '#94A3B8',
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
            padding: '0.75rem 1.4rem',
            background: 'rgba(8, 22, 40, 0.65)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
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
              color: 'var(--accent-gold-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={12} color="var(--accent-gold)" />
            {roleTitle}
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              color: '#94A3B8',
              fontFamily: 'var(--font-mono)'
            }}
          >
            VTU / AICTE
          </span>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
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
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  backgroundColor: isActive ? 'var(--primary-navy-subtle)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
                  transition: 'all 0.15s ease'
                })}
              >
                <Icon size={18} style={{ flexShrink: 0, opacity: 0.9 }} />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(197, 160, 89, 0.2)',
                      color: 'var(--accent-gold-light)',
                      border: '1px solid rgba(197, 160, 89, 0.3)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.alert && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#F87171'
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Mini Profile Footer */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(5, 11, 20, 0.75)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
              alt={currentUser?.name}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-gold)'
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentUser?.name || 'User'}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#94A3B8',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {currentUser?.usn || currentUser?.employeeId || currentUser?.linkedStudentUsn || role.toUpperCase()}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={resetAllData}
              title="Reset sample data to factory defaults"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.45rem',
                fontSize: '0.72rem',
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset Data</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.45rem',
                fontSize: '0.72rem',
                color: '#F87171',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                cursor: 'pointer'
              }}
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
