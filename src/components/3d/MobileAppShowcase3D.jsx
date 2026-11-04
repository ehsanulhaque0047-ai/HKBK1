import React, { useState } from 'react';
import {
  Smartphone,
  QrCode,
  Bell,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wifi,
  Battery,
  MapPin,
  Calendar,
  Radio,
  Download,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePackage } from '../../context/PackageContext';

export const MobileAppShowcase3D = ({ studentData }) => {
  const { packageTier, setPackageTier, setIsComparisonModalOpen } = usePackage();
  const [platform, setPlatform] = useState('ios'); // 'ios' | 'android'
  const [activeScreen, setActiveScreen] = useState('id-card'); // 'id-card' | 'notifications' | 'attendance'
  const [qrScanned, setQrScanned] = useState(false);

  const student = studentData || {
    name: 'Syed Farhan Ahmed',
    usn: '1HK21CS094',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    bloodGroup: 'O+ve',
    validUpto: 'June 2025'
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="mobile-showcase-container"
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(30px)'
        }}
      />

      {/* Header with Package Distinction Badge */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#B45309',
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                border: '1px solid #F59E0B',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <Sparkles size={12} />
              Included in Complete Digital Campus (₹4,50,000)
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                background: 'var(--bg-subtle)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Proposal Architecture Demo
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}
          >
            Native Android & iOS Mobile Applications
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Turnkey native mobile campus client for students, parents, and faculty with offline caching & biometric login.
          </p>
        </div>

        {/* Platform OS Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-subtle)',
              padding: '0.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}
          >
            <button
              onClick={() => setPlatform('ios')}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: platform === 'ios' ? 'var(--primary-navy)' : 'transparent',
                color: platform === 'ios' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Apple iOS
            </button>
            <button
              onClick={() => setPlatform('android')}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                background: platform === 'android' ? 'var(--primary-navy)' : 'transparent',
                color: platform === 'android' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Google Android
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout: Controls on Left, 3D Smartphone on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(300px, 340px)',
          gap: '2rem',
          alignItems: 'center'
        }}
        className="mobile-showcase-grid"
      >
        {/* Left Column: Interactive Screen Selectors & Feature Specs */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            SIMULATE REAL-TIME MOBILE SCREENS:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {/* Screen 1 Button */}
            <div
              onClick={() => setActiveScreen('id-card')}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: activeScreen === 'id-card' ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                background: activeScreen === 'id-card' ? 'var(--accent-gold-subtle)' : 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: activeScreen === 'id-card' ? 'var(--primary-navy)' : 'var(--bg-subtle)',
                  color: activeScreen === 'id-card' ? 'var(--accent-gold)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CreditCard size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Digital Student Smart ID & RFID Bus Pass
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  VTU barcode, photo identity verification & dynamic hologram
                </div>
              </div>
            </div>

            {/* Screen 2 Button */}
            <div
              onClick={() => setActiveScreen('attendance')}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: activeScreen === 'attendance' ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                background: activeScreen === 'attendance' ? 'var(--accent-gold-subtle)' : 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: activeScreen === 'attendance' ? 'var(--primary-navy)' : 'var(--bg-subtle)',
                  color: activeScreen === 'attendance' ? 'var(--accent-gold)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <QrCode size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Classroom QR Attendance Scanner
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  GPS geofenced QR scanning with anti-proxy validation
                </div>
              </div>
            </div>

            {/* Screen 3 Button */}
            <div
              onClick={() => setActiveScreen('notifications')}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: activeScreen === 'notifications' ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                background: activeScreen === 'notifications' ? 'var(--accent-gold-subtle)' : 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: activeScreen === 'notifications' ? 'var(--primary-navy)' : 'var(--bg-subtle)',
                  color: activeScreen === 'notifications' ? 'var(--accent-gold)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Bell size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Instant Push Circulars & Results Feeds
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Real-time exam schedules, CIE grades, and emergency alerts
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Scope Disclosure */}
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-light)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} color="var(--accent-gold)" />
              <span>Turnkey Package Delivery Scope</span>
            </div>
            Included in the Complete Digital Campus (₹4.5L) contract: Full React Native source code, Google Play Store console deployment, Apple App Store signing, and VTU biometric gateway integration.
          </div>
        </div>

        {/* Right Column: Realistic 3D Smartphone Device Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '290px',
              height: '570px',
              borderRadius: '44px',
              background: 'linear-gradient(145deg, #1e293b, #0f172a)',
              padding: '10px',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 0 0 2px rgba(255, 255, 255, 0.1)',
              position: 'relative',
              perspective: '1000px',
              transform: 'rotateY(-4deg) rotateX(2deg)',
              transition: 'transform 0.4s ease'
            }}
            className="smartphone-3d-chassis"
          >
            {/* Outer Titanium Rim Accent */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '36px',
                background: '#0B132B',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              {/* Top Dynamic Island / Notch */}
              <div
                style={{
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 1.25rem',
                  color: '#94A3B8',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  zIndex: 20
                }}
              >
                <span>9:41</span>
                {platform === 'ios' ? (
                  <div
                    style={{
                      width: '84px',
                      height: '20px',
                      background: '#000000',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      border: '0.5px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontSize: '0.55rem', color: '#94A3B8', letterSpacing: '0.02em' }}>HKBK</span>
                  </div>
                ) : (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000000' }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Wifi size={11} />
                  <Battery size={13} />
                </div>
              </div>

              {/* Phone App Content Screen */}
              <div
                style={{
                  flex: 1,
                  background: '#0F172A',
                  color: '#F8FAFC',
                  overflowY: 'auto',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Screen 1: Digital Smart ID */}
                {activeScreen === 'id-card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', animation: 'fadeIn 0.25s ease' }}>
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
                        border: '1px solid rgba(217, 119, 6, 0.4)',
                        borderRadius: '16px',
                        padding: '0.85rem',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Holographic Watermark Band */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '90px',
                          height: '90px',
                          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                          pointerEvents: 'none'
                        }}
                      />

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <img src="/hkbk-crest.svg" alt="HKBK" style={{ width: '22px', height: '22px' }} />
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F8FAFC' }}>HKBK CE</span>
                        </div>
                        <span style={{ fontSize: '0.6rem', color: '#F59E0B', fontWeight: 700, border: '0.5px solid #F59E0B', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          STUDENT PASS
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                        <img
                          src={student.photo}
                          alt={student.name}
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '10px',
                            objectFit: 'cover',
                            border: '1.5px solid #F59E0B'
                          }}
                        />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {student.name}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                            {student.usn}
                          </div>
                          <div style={{ fontSize: '0.62rem', color: '#CBD5E1', marginTop: '0.15rem' }}>
                            {student.department}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', fontSize: '0.6rem', color: '#94A3B8', borderTop: '0.5px solid rgba(255,255,255,0.1)', paddingTop: '0.45rem' }}>
                        <div>Blood Group: <strong style={{ color: '#FFFFFF' }}>{student.bloodGroup}</strong></div>
                        <div>Valid Upto: <strong style={{ color: '#FFFFFF' }}>{student.validUpto}</strong></div>
                      </div>
                    </div>

                    {/* Barcode & Bus Pass Access */}
                    <div
                      style={{
                        background: '#1E293B',
                        borderRadius: '14px',
                        padding: '0.75rem',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <div style={{ fontSize: '0.65rem', color: '#94A3B8', marginBottom: '0.35rem' }}>
                        DIGITAL VTU CAMPUS RFID TOKEN
                      </div>
                      <div
                        style={{
                          height: '28px',
                          background: 'repeating-linear-gradient(90deg, #FFFFFF 0px, #FFFFFF 2px, transparent 2px, transparent 4px, #FFFFFF 4px, #FFFFFF 7px, transparent 7px, transparent 10px)',
                          margin: '0 auto',
                          width: '85%',
                          borderRadius: '2px'
                        }}
                      />
                      <div style={{ fontSize: '0.58rem', color: '#64748B', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                        *1HK21CS094-VTU-AUTH*
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <div style={{ flex: 1, background: '#1E293B', padding: '0.5rem', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '0.6rem', color: '#94A3B8' }}>Bus Pass Status</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981' }}>Active (Route 14)</div>
                      </div>
                      <div style={{ flex: 1, background: '#1E293B', padding: '0.5rem', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '0.6rem', color: '#94A3B8' }}>Library Access</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38BDF8' }}>Level 3 Clear</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 2: QR Attendance Scanner */}
                {activeScreen === 'attendance' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', animation: 'fadeIn 0.25s ease' }}>
                    <div
                      style={{
                        background: '#020617',
                        borderRadius: '16px',
                        padding: '1rem',
                        border: '1px dashed #38BDF8',
                        position: 'relative',
                        textAlign: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38BDF8', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                        <Radio size={12} color="#38BDF8" />
                        <span>CSE Lab 3 Geofence Active</span>
                      </div>

                      <div
                        style={{
                          width: '120px',
                          height: '120px',
                          margin: '0.5rem auto',
                          border: '2px solid #38BDF8',
                          borderRadius: '12px',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(56, 189, 248, 0.05)'
                        }}
                      >
                        {/* Scanning Laser Line */}
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: '#38BDF8',
                            boxShadow: '0 0 8px #38BDF8',
                            animation: 'scanLaser 2s infinite ease-in-out'
                          }}
                        />
                        <QrCode size={70} color="#CBD5E1" opacity={0.8} />
                      </div>

                      <button
                        onClick={() => setQrScanned(!qrScanned)}
                        style={{
                          width: '100%',
                          padding: '0.45rem',
                          background: qrScanned ? '#10B981' : '#2563EB',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {qrScanned ? <CheckCircle2 size={13} /> : <QrCode size={13} />}
                        <span>{qrScanned ? 'Attendance Marked (9:45 AM)' : 'Simulate Scan Class QR'}</span>
                      </button>
                    </div>

                    <div style={{ background: '#1E293B', borderRadius: '12px', padding: '0.65rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.62rem', color: '#94A3B8', marginBottom: '0.2rem' }}>Current Session</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC' }}>21CS62 - Computer Networks Lab</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                        <MapPin size={10} />
                        <span>Prof. Arshad - Room 304 (Distance: 4m)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 3: Push Notifications Feed */}
                {activeScreen === 'notifications' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeIn 0.25s ease' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.2rem' }}>
                      RECENT CAMPUS NOTICES
                    </div>

                    {[
                      {
                        title: 'VTU Exam Timetable Released',
                        desc: 'Even Sem 2024-25 final dates published.',
                        time: '12m ago',
                        urgent: true
                      },
                      {
                        title: 'CIE-2 Marks Published',
                        desc: 'Check your Cloud Computing internal marks.',
                        time: '1h ago',
                        urgent: false
                      },
                      {
                        title: 'TCS Placement Drive',
                        desc: 'Campus recruitment shortlisted candidates.',
                        time: '3h ago',
                        urgent: false
                      }
                    ].map((notif, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#1E293B',
                          borderRadius: '10px',
                          padding: '0.6rem',
                          borderLeft: notif.urgent ? '3px solid #EF4444' : '3px solid #38BDF8',
                          border: '1px solid rgba(255,255,255,0.06)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFFFFF' }}>{notif.title}</span>
                          <span style={{ fontSize: '0.58rem', color: '#64748B' }}>{notif.time}</span>
                        </div>
                        <div style={{ fontSize: '0.62rem', color: '#94A3B8', marginTop: '0.15rem' }}>{notif.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div
                style={{
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#0B132B'
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.3)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppShowcase3D;

