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
  Award,
  AlertCircle,
  Info
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
      category: 'Platforms & Applications Included',
      items: [
        {
          name: 'React Web Portal (4 Dashboards)',
          p1: 'Included (Student, Faculty, Admin, Parent)',
          p2: 'Included (Student, Faculty, Admin, Parent)',
          p3: 'Included (Student, Faculty, Admin, Parent)'
        },
        {
          name: 'Android Native Mobile App',
          p1: '— (Not Included)',
          p2: 'Included in Scope (Roadmap Delivery)',
          p3: 'Included in Scope (Roadmap Delivery)'
        },
        {
          name: 'Apple iOS Native Mobile App',
          p1: '— (Not Included)',
          p2: '— (Not Included)',
          p3: 'Included in Scope (Roadmap Delivery)'
        },
        {
          name: 'Mobile Push Notifications',
          p1: 'In-app Web Notifications',
          p2: 'Native Android Push Service',
          p3: 'Multi-platform APNs & FCM Push'
        }
      ]
    },
    {
      category: 'Backend & Database Architecture',
      items: [
        {
          name: 'Java Spring Boot REST Services',
          p1: 'Included (Enterprise Architecture)',
          p2: 'Included (Shared Web & Mobile)',
          p3: 'Included (Shared High-Concurrence)'
        },
        {
          name: 'PostgreSQL Relational Database',
          p1: 'Included (ACID Compliant)',
          p2: 'Included (Unified Schema)',
          p3: 'Included (Optimized Indexes)'
        },
        {
          name: 'First-Year Cloud Hosting Estimate',
          p1: '₹60,000 / year (Estimate)',
          p2: '₹84,000 / year (Estimate)',
          p3: '₹1,08,000 / year (Estimate)'
        }
      ]
    },
    {
      category: 'Academic Modules & 3D Visual Experience',
      items: [
        {
          name: 'Academic Modules (Attendance, Timetable, CIE)',
          p1: 'Full Access (All Roles)',
          p2: 'Full Access (Web + Mobile)',
          p3: 'Full Access (Web + Mobile + iOS)'
        },
        {
          name: '3D Spatial Visuals & Micro-Interactions',
          p1: 'Layered 3D Depth & Shadows',
          p2: '3D Parallax Tilt + CIE Visualizer',
          p3: 'Interactive Radial Gauges & Turnkey Ecosystem'
        },
        {
          name: 'Separate Maintenance Fee',
          p1: '₹0 (No Separate Maintenance)',
          p2: '₹0 (No Separate Maintenance)',
          p3: '₹0 (No Separate Maintenance)'
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
          maxWidth: '1140px',
          maxHeight: '92vh',
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
                  HKBK SIMP – Implementation Packages & Pricing
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
                  Live Architecture Switcher
                </span>
              </div>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                One-time development fees and recurring annual hosting estimates are strictly separated with zero hidden maintenance charges.
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
              const isFullSuite = pkg.id === 'package3';

              return (
                <div
                  key={pkg.id}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: isActive
                      ? '2px solid var(--accent-gold)'
                      : isFullSuite
                      ? '1px solid rgba(197, 160, 89, 0.45)'
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
                        backgroundColor: isFullSuite
                          ? 'rgba(197, 160, 89, 0.2)'
                          : pkg.id === 'package2'
                          ? 'rgba(37, 99, 235, 0.15)'
                          : 'var(--bg-subtle)',
                        color: isFullSuite
                          ? 'var(--accent-gold)'
                          : pkg.id === 'package2'
                          ? 'var(--accent-blue)'
                          : 'var(--text-secondary)',
                        border: isFullSuite ? '1px solid var(--accent-gold)' : 'none'
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

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      margin: '0 0 0.65rem 0',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {pkg.name}
                  </h3>

                  {/* 1. ONE-TIME DEVELOPMENT PRICE */}
                  <div
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-muted)',
                      border: '1px solid var(--border-light)',
                      marginBottom: '0.65rem'
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      One-Time Development Fee
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.15rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.65rem',
                          fontWeight: 900,
                          color: isFullSuite ? 'var(--accent-gold)' : 'var(--text-primary)'
                        }}
                      >
                        {pkg.devPrice}
                      </span>
                    </div>
                  </div>

                  {/* 2. RECURRING ANNUAL HOSTING ESTIMATE */}
                  <div
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(37, 99, 235, 0.05)',
                      border: '1px dashed rgba(37, 99, 235, 0.25)',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-blue)' }}>
                      First-Year Hosting Estimate (Recurring)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginTop: '0.15rem' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {pkg.hostingPrice}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        / year (traffic estimate)
                      </span>
                    </div>
                  </div>

                  {/* Includes List */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                    {pkg.includes.slice(0, 5).map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.76rem' }}>
                        <Check size={13} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                    {pkg.includes.length > 5 && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '1.25rem' }}>
                        + {pkg.includes.length - 5} additional modules included
                      </div>
                    )}
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
                        : isFullSuite
                        ? 'var(--accent-gold)'
                        : 'var(--bg-subtle)',
                      color: isActive ? '#FFFFFF' : isFullSuite ? '#0B132B' : 'var(--text-primary)',
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
                        <span>Preview {pkg.shortName}</span>
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
                Detailed Deliverables & Architecture Matrix
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
                <div>Deliverable / Feature</div>
                <div style={{ textAlign: 'center' }}>Package 1 (₹1.20L)</div>
                <div style={{ textAlign: 'center' }}>Package 2 (₹1.68L)</div>
                <div style={{ textAlign: 'center', color: 'var(--accent-gold)' }}>Package 3 (₹2.16L)</div>
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
                      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{row.p1}</div>
                      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {row.p2}
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          color: 'var(--accent-gold)',
                          fontWeight: 700
                        }}
                      >
                        {row.p3}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Hosting Disclosure Callout */}
          <div
            style={{
              marginTop: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-light)',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.76rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={14} color="var(--accent-gold)" />
              <span>Hosting Cost & Roadmap Notice</span>
            </div>
            <div>
              • <strong>Recurring Hosting Estimate:</strong> First-year hosting figures (₹60,000, ₹84,000, and ₹1,08,000) are recurring annual infrastructure estimates based on expected concurrent college traffic, database sizing, and file storage. They are direct cloud hosting operational expenses and are strictly separated from one-time development pricing. No separate maintenance fees are charged.
            </div>
            <div>
              • <strong>Application Scope:</strong> The React Web Portal is active and running in this demonstration. Native Android and iOS applications are planned deliverables under Packages 2 & 3 upon institutional commissioning.
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
