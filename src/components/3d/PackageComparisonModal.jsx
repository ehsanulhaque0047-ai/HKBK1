import React, { useEffect } from 'react';
import {
  X,
  Check,
  Sparkles,
  Layers,
  Smartphone,
  Eye,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Sliders,
  Award
} from 'lucide-react';
import { usePackage, PACKAGES } from '../../context/PackageContext';

export const PackageComparisonModal = ({ isOpen, onClose }) => {
  const { packageTier, setPackageTier } = usePackage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const comparisonFeatures = [
    {
      category: 'UI & 3D Spatial Experience',
      items: [
        {
          name: 'Dashboard Cards Styling',
          basic: 'Layered 3D Shadows & Glassmorphism',
          advanced: 'Interactive Mouse Parallax Gyro Tilt (±12°)',
          complete: 'Full Physics Parallax + Dynamic Glare Mesh'
        },
        {
          name: 'Attendance Visualization',
          basic: 'Flat SVG Progress Bars',
          advanced: '3D Depth Radial Ring Gauge with Thresholds',
          complete: 'Multi-layer 3D Radial Gauge + VTU Seal'
        },
        {
          name: 'Academic Analytics Engine',
          basic: 'Standard 2D Charts',
          advanced: 'Interactive 3D Dimensional CIE Mark Cylinders',
          complete: 'Multi-axis 3D Dynamic Continuous Analytics'
        },
        {
          name: 'Three.js WebGL Campus Experience',
          basic: '— (Standard CSS)',
          advanced: '— (Standard CSS)',
          complete: 'Interactive 3D WebGL Spire & Orbital Satellites'
        }
      ]
    },
    {
      category: 'Mobile & Platform Delivery Proposal',
      items: [
        {
          name: 'Responsive Web Portal',
          basic: 'Full Mobile Responsive',
          advanced: 'PWA Web-App Ready',
          complete: 'Native Responsive + PWA'
        },
        {
          name: 'Android & iOS Native Apps',
          basic: 'Not Included in Proposal',
          advanced: 'Not Included in Proposal',
          complete: 'Included in Turnkey Proposal (.apk & .ipa)'
        },
        {
          name: 'Offline Smart ID & Bus Pass',
          basic: 'Web Verification Only',
          advanced: 'Cached Digital ID',
          complete: 'Biometric Offline Token + QR Pass'
        }
      ]
    },
    {
      category: 'Core Portal Modules & Roles',
      items: [
        {
          name: 'Supported User Roles',
          basic: 'Student, Faculty, Admin, Parent',
          advanced: 'Student, Faculty, Admin, Parent',
          complete: 'Student, Faculty, Admin, Parent + Dean View'
        },
        {
          name: 'VTU / AICTE Compliance',
          basic: 'Attendance 75% Alerts',
          advanced: 'CIE & SEE Auto-Calculation Matrix',
          complete: 'Full VTU Compliance & Hall Ticket Generation'
        },
        {
          name: 'Demonstration Persistence',
          basic: 'LocalStorage State',
          advanced: 'LocalStorage State',
          complete: 'LocalStorage + Simulated Backend Export'
        }
      ]
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(5, 11, 20, 0.75)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-2xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-muted) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)'
              }}
            >
              <Sliders size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    margin: 0,
                    color: 'var(--text-primary)'
                  }}
                >
                  HKBK SIMP – Implementation Packages Comparison
                </h2>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    background: 'rgba(197, 160, 89, 0.12)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(197, 160, 89, 0.25)'
                  }}
                >
                  Live Visual Switcher
                </span>
              </div>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Select any package below to instantly preview the visual depth and interaction differences across all dashboards.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="simp-btn-subtle"
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-muted)'
            }}
            title="Close dialog (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          {/* Top 3 Package Selection Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            {PACKAGES.map((pkg) => {
              const isActive = packageTier === pkg.id;
              const isFlagship = pkg.id === 'complete';
              const isPopular = pkg.id === 'advanced';

              return (
                <div
                  key={pkg.id}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: isActive
                      ? '2px solid var(--accent-gold)'
                      : isFlagship
                      ? '1px solid rgba(197, 160, 89, 0.4)'
                      : '1px solid var(--border-light)',
                    background: isActive
                      ? 'linear-gradient(180deg, var(--accent-gold-subtle) 0%, var(--bg-card) 45%)'
                      : 'var(--bg-surface)',
                    boxShadow: isActive ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                    padding: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    transform: isActive ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {/* Package Top Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isFlagship
                          ? 'rgba(197, 160, 89, 0.2)'
                          : isPopular
                          ? 'rgba(37, 99, 235, 0.15)'
                          : 'var(--bg-subtle)',
                        color: isFlagship
                          ? 'var(--accent-gold)'
                          : isPopular
                          ? 'var(--accent-blue)'
                          : 'var(--text-secondary)',
                        border: isFlagship ? '1px solid var(--accent-gold)' : 'none'
                      }}
                    >
                      {pkg.badge}
                    </span>

                    {isActive && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#10B981',
                          background: 'rgba(16, 185, 129, 0.1)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <CheckCircle2 size={12} />
                        Active View
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      margin: '0 0 0.25rem 0',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {pkg.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.4rem 0 0.75rem 0' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.65rem',
                        fontWeight: 900,
                        color: isFlagship ? 'var(--accent-gold)' : 'var(--text-primary)'
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pkg.period}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      margin: '0 0 1rem 0',
                      minHeight: '48px'
                    }}
                  >
                    {pkg.description}
                  </p>

                  {/* Key Package Features List */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                    {pkg.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem' }}>
                        <Check size={14} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Switch / Active Button */}
                  <button
                    onClick={() => setPackageTier(pkg.id)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.15s ease',
                      backgroundColor: isActive
                        ? 'var(--primary-navy)'
                        : isFlagship
                        ? 'var(--accent-gold)'
                        : 'var(--bg-subtle)',
                      color: isActive ? '#FFFFFF' : isFlagship ? '#0B132B' : 'var(--text-primary)',
                      border: isActive
                        ? '1px solid var(--accent-gold)'
                        : '1px solid var(--border-light)'
                    }}
                  >
                    {isActive ? (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Currently Active</span>
                      </>
                    ) : (
                      <>
                        <Eye size={15} />
                        <span>Preview This Package</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Detailed Feature Comparison Matrix */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '0.5rem'
              }}
            >
              <Award size={18} color="var(--accent-gold)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Comprehensive Package Capabilities Matrix
              </h3>
            </div>

            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                background: 'var(--bg-surface)'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(180px, 1.4fr) repeat(3, minmax(130px, 1fr))',
                  background: 'var(--bg-muted)',
                  borderBottom: '1px solid var(--border-light)',
                  padding: '0.85rem 1rem',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: 'var(--text-primary)'
                }}
              >
                <div>Platform Feature</div>
                <div style={{ textAlign: 'center' }}>Basic (₹2.0L)</div>
                <div style={{ textAlign: 'center' }}>Advanced (₹3.5L)</div>
                <div style={{ textAlign: 'center', color: 'var(--accent-gold)' }}>Complete (₹4.5L)</div>
              </div>

              {comparisonFeatures.map((group, gIdx) => (
                <div key={gIdx}>
                  <div
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--bg-subtle)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-light)'
                    }}
                  >
                    {group.category}
                  </div>

                  {group.items.map((row, rIdx) => (
                    <div
                      key={rIdx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(180px, 1.4fr) repeat(3, minmax(130px, 1fr))',
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid var(--border-light)',
                        fontSize: '0.78rem',
                        alignItems: 'center',
                        backgroundColor: rIdx % 2 === 0 ? 'transparent' : 'var(--bg-muted)'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
                      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{row.basic}</div>
                      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {row.advanced}
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          color: 'var(--accent-gold)',
                          fontWeight: 700
                        }}
                      >
                        {row.complete}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            Active Package: <strong style={{ color: 'var(--text-primary)' }}>{PACKAGES.find((p) => p.id === packageTier)?.name}</strong>
          </div>
          <button
            onClick={onClose}
            className="simp-btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
          >
            Apply & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageComparisonModal;

