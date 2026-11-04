import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Shield,
  HeartHandshake,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('student');
  const [username, setUsername] = useState('1HK21CS042');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = {
    student: {
      role: 'student',
      label: 'Student',
      icon: GraduationCap,
      username: '1HK21CS042',
      password: 'password123',
      name: 'Syed Rayan Ahmed (6th Sem CSE)',
      desc: 'Access attendance, timetable, results, fees, hall tickets, assignments & placements.'
    },
    faculty: {
      role: 'faculty',
      label: 'Teacher / Faculty',
      icon: Users,
      username: 'hkbk.fac.108',
      password: 'password123',
      name: 'Dr. A. K. Manjunath (Assoc. Prof, CSE)',
      desc: 'Mark attendance, post assignments, enter IA marks, upload lecture notes & manage classes.'
    },
    admin: {
      role: 'admin',
      label: 'Administrator',
      icon: Shield,
      username: 'admin.simp',
      password: 'password123',
      name: 'Prof. Syed Mustafa (Dean Academics)',
      desc: 'Manage student records, departments, fee reconciliation, documents & grievance redressal.'
    },
    parent: {
      role: 'parent',
      label: 'Parent / Guardian',
      icon: HeartHandshake,
      username: 'parent.1hk21cs042',
      password: 'password123',
      name: 'Mr. Tariq Ahmed (Father of Rayan)',
      desc: "Monitor child's academic progress, attendance alerts, fee dues & proctor communication."
    }
  };

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setUsername(demoAccounts[roleKey].username);
    setPassword(demoAccounts[roleKey].password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password, selectedRole);
      if (selectedRole === 'student') navigate('/student/dashboard');
      else if (selectedRole === 'faculty') navigate('/faculty/dashboard');
      else if (selectedRole === 'admin') navigate('/admin/dashboard');
      else if (selectedRole === 'parent') navigate('/parent/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const quickDemoLogin = async (roleKey) => {
    handleRoleSelect(roleKey);
    setLoading(true);
    try {
      await login(demoAccounts[roleKey].username, demoAccounts[roleKey].password, roleKey);
      if (roleKey === 'student') navigate('/student/dashboard');
      else if (roleKey === 'faculty') navigate('/faculty/dashboard');
      else if (roleKey === 'admin') navigate('/admin/dashboard');
      else if (roleKey === 'parent') navigate('/parent/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0B1220',
        backgroundImage: 'radial-gradient(circle at 50% 15%, #101B2C 0%, #0B1220 75%)',
        color: '#F1F5F9',
        position: 'relative'
      }}
    >
      {/* Top Academic Ribbon */}
      <header
        style={{
          padding: '1.1rem 2.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.09)',
          backgroundColor: 'rgba(17, 29, 48, 0.75)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="/hkbk-crest.svg"
            alt="HKBK Crest"
            style={{ width: '44px', height: '44px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
          />
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                color: '#F1F5F9'
              }}
            >
              HKBK COLLEGE OF ENGINEERING
            </h1>
            <p style={{ fontSize: '0.74rem', color: '#A5B4C7', letterSpacing: '0.02em' }}>
              Autonomous Institution | Affiliated to VTU Belagavi | Approved by AICTE, New Delhi
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }} className="simp-navbar-badge">
          <span
            style={{
              fontSize: '0.75rem',
              color: '#36C6B0',
              backgroundColor: 'rgba(54, 198, 176, 0.12)',
              border: '1px solid rgba(54, 198, 176, 0.25)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            SIMP Enterprise Portal v2.4
          </span>
        </div>
      </header>

      {/* Main Login Interface */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 1.5rem'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            backgroundColor: 'rgba(255, 255, 255, 0.045)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden'
          }}
          className="login-card-container"
        >
          {/* Left Column: Form & Role Tabs */}
          <div style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#36C6B0',
                  background: 'rgba(54, 198, 176, 0.12)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(54, 198, 176, 0.25)',
                  marginBottom: '0.75rem'
                }}
              >
                <Sparkles size={13} />
                <span>Single Sign-On Authentication</span>
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#F1F5F9' }}>
                Academic Portal Login
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#A5B4C7', marginTop: '0.3rem' }}>
                Select your institutional role to access your internal dashboard.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.4rem',
                backgroundColor: 'rgba(11, 18, 32, 0.75)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {Object.keys(demoAccounts).map((roleKey) => {
                const item = demoAccounts[roleKey];
                const Icon = item.icon;
                const isSelected = selectedRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleRoleSelect(roleKey)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.65rem 0.3rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'rgba(54, 198, 176, 0.15)' : 'transparent',
                      color: isSelected ? '#36C6B0' : '#A5B4C7',
                      border: isSelected ? '1px solid rgba(54, 198, 176, 0.4)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={18} color={isSelected ? '#36C6B0' : '#A5B4C7'} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#FCA5A5',
                  fontSize: '0.82rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: '#A5B4C7',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  {selectedRole === 'student'
                    ? 'Student USN / Registration No.'
                    : selectedRole === 'parent'
                    ? 'Parent User ID'
                    : 'Employee / Faculty ID'}
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    color="#718096"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={
                      selectedRole === 'student' ? 'e.g. 1HK21CS042' : 'Enter institutional user ID'
                    }
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem 0.7rem 2.4rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F1F5F9',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: '#A5B4C7',
                      letterSpacing: '0.04em'
                    }}
                  >
                    Password
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#36C6B0', cursor: 'pointer' }}>
                    Forgot Password?
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="#718096"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem 0.7rem 2.4rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F1F5F9'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="simp-btn-teal"
                style={{
                  marginTop: '0.5rem',
                  width: '100%',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <span>Sign In to {demoAccounts[selectedRole].label}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div
              style={{
                marginTop: '1.5rem',
                fontSize: '0.74rem',
                color: '#718096',
                textAlign: 'center',
                lineHeight: 1.4
              }}
            >
              VTU Exam Registration and Hall Ticket portal secured under SSL 256-bit encryption.
            </div>
          </div>

          {/* Right Column: Demo Accounts Quick-Fill Panel */}
          <div
            style={{
              backgroundColor: 'rgba(16, 27, 44, 0.85)',
              padding: '2.25rem 1.85rem',
              borderLeft: '1px solid rgba(255, 255, 255, 0.09)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={18} color="#36C6B0" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F1F5F9' }}>
                  1-Click Demo Evaluation
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#A5B4C7', marginBottom: '1.25rem' }}>
                Instant login without typing credentials. Click any persona below to launch that role's complete workflow:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.keys(demoAccounts).map((roleKey) => {
                  const item = demoAccounts[roleKey];
                  const Icon = item.icon;
                  const isCurrent = selectedRole === roleKey;
                  return (
                    <div
                      key={roleKey}
                      onClick={() => quickDemoLogin(roleKey)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: isCurrent ? 'rgba(54, 198, 176, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: isCurrent
                          ? '1.5px solid rgba(54, 198, 176, 0.5)'
                          : '1px solid rgba(255, 255, 255, 0.07)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(54, 198, 176, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(54, 198, 176, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#36C6B0'
                            }}
                          >
                            <Icon size={15} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F1F5F9' }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#36C6B0', fontFamily: 'var(--font-mono)' }}>
                              {item.username}
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={14} color="#718096" />
                      </div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: '#A5B4C7',
                          marginTop: '0.4rem',
                          lineHeight: 1.3
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helpdesk Notice */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.72rem',
                color: '#A5B4C7'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#F1F5F9', fontWeight: 600 }}>
                <Info size={13} color="#36C6B0" />
                <span>Need Technical Support?</span>
              </div>
              <div style={{ marginTop: '0.25rem' }}>
                HKBK SIMP Cell: simp.support@hkbk.edu.in | +91 (080) 2544 1722
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 860px) {
          .login-card-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

