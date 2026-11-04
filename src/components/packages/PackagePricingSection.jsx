import React from 'react';
import {
  Check,
  CheckCircle2,
  Server,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  Smartphone,
  Globe,
  Database,
  Info,
  AlertCircle
} from 'lucide-react';
import { usePackage, PACKAGES } from '../../context/PackageContext';

export const PackagePricingSection = ({ id = 'packages-section' }) => {
  const { packageTier, setPackageTier } = usePackage();

  return (
    <section id={id} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--accent-teal)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.35rem'
            }}
          >
            <Sparkles size={13} color="var(--accent-teal)" />
            Commercial Investment Structure
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}
          >
            Turnkey Development & Hosting Estimates
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '0.3rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Select any package below to dynamically update the demonstration portal experience. Development costs are strictly one-time deliverables; first-year hosting is billed as an annual recurring operational expense. No separate maintenance fees are required.
          </p>
        </div>

        {/* Current Active Indicator */}
        <div
          style={{
            padding: '0.5rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(54, 198, 176, 0.1)',
            border: '1px solid rgba(54, 198, 176, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active View:</span>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--accent-teal)'
            }}
          >
            {PACKAGES.find((p) => p.id === packageTier)?.name || 'PACKAGE 3 – WEBSITE + ANDROID + IOS'}
          </span>
        </div>
      </div>

      {/* 3 Package Cards Grid with Subtle Glass UI */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        }}
      >
        {PACKAGES.map((pkg) => {
          const isActive = packageTier === pkg.id;
          const isFullSuite = pkg.id === 'package3';

          return (
            <div
              key={pkg.id}
              style={{
                borderRadius: 'var(--radius-xl)',
                background: isActive
                  ? 'linear-gradient(180deg, rgba(54, 198, 176, 0.12) 0%, rgba(16, 27, 44, 0.9) 35%)'
                  : 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: isActive
                  ? '2px solid var(--accent-teal)'
                  : isFullSuite
                  ? '1px solid rgba(54, 198, 176, 0.4)'
                  : '1px solid var(--border-light)',
                boxShadow: isActive
                  ? 'var(--shadow-glass)'
                  : 'var(--shadow-sm)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.25s ease',
                transform: isActive ? 'translateY(-3px)' : 'none'
              }}
            >
              {/* Card Header: Badge & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isFullSuite
                      ? 'rgba(54, 198, 176, 0.2)'
                      : pkg.id === 'package2'
                      ? 'rgba(91, 155, 235, 0.18)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isFullSuite
                      ? 'var(--accent-teal)'
                      : pkg.id === 'package2'
                      ? 'var(--accent-blue)'
                      : 'var(--text-secondary)',
                    border: isFullSuite ? '1px solid var(--accent-teal)' : '1px solid var(--border-light)'
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
                      color: 'var(--accent-teal)',
                      background: 'var(--accent-teal-subtle)',
                      border: '1px solid rgba(54, 198, 176, 0.25)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <CheckCircle2 size={12} />
                    Active View
                  </span>
                )}
              </div>

              {/* Package Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '0 0 0.85rem 0'
                }}
              >
                {pkg.name}
              </h3>

              {/* 1. ONE-TIME DEVELOPMENT FEE BLOCK */}
              <div
                style={{
                  padding: '1rem 1.15rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(255, 255, 255, 0.035)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  {pkg.devPriceLabel}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.85rem',
                      fontWeight: 900,
                      color: isFullSuite ? 'var(--accent-teal)' : 'var(--text-primary)'
                    }}
                  >
                    {pkg.devPrice}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    (One-time fee)
                  </span>
                </div>
              </div>

              {/* 2. RECURRING ANNUAL HOSTING ESTIMATE BLOCK */}
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(91, 155, 235, 0.06)',
                  border: '1px dashed rgba(91, 155, 235, 0.35)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '0.04em' }}>
                    {pkg.hostingPriceLabel}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                    Recurring Expense
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {pkg.hostingPrice}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    / year (estimate)
                  </span>
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  • Cloud infrastructure recurring cost (separate from dev fee)
                </div>
              </div>

              {/* Package Tagline */}
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  margin: '0 0 1rem 0',
                  minHeight: '36px'
                }}
              >
                {pkg.tagline}
              </p>

              {/* Includes Checklist */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  PACKAGE INCLUDES:
                </div>
                {pkg.includes.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.78rem' }}>
                    <Check size={14} color="var(--accent-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Honest Delivery Status Tag */}
              <div
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Info size={13} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
                <span>{pkg.statusTag}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setPackageTier(pkg.id)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
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
                    ? 'var(--accent-teal)'
                    : isFullSuite
                    ? 'rgba(54, 198, 176, 0.15)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#07101D' : isFullSuite ? 'var(--accent-teal-light)' : 'var(--text-primary)',
                  border: isActive
                    ? '1px solid var(--accent-teal)'
                    : isFullSuite
                    ? '1px solid rgba(54, 198, 176, 0.35)'
                    : '1px solid var(--border-light)'
                }}
              >
                {isActive ? (
                  <>
                    <CheckCircle2 size={15} />
                    <span>Active Package View</span>
                  </>
                ) : (
                  <>
                    <span>Select {pkg.shortName}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Critical Pricing & Hosting Disclosure Callout in Subtle Glass */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid var(--border-light)',
          padding: '1.25rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(280px, 1fr)',
          gap: '1.5rem',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55
        }}
        className="pricing-disclosure-callout"
      >
        <div>
          <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={15} color="var(--accent-teal)" />
            <span>Important Hosting Cost & Traffic Note</span>
          </div>
          <p style={{ margin: 0 }}>
            Hosting costs are recurring annual estimates based on standard institutional usage. Actual cloud hosting charges recur annually and depend on active student/faculty concurrent traffic, file storage volume (lecture notes, assignments, documents), and server sizing. Hosting is a direct cloud operational cost and is strictly separated from the one-time development fee. No separate maintenance fees are charged.
          </p>
        </div>

        <div>
          <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={15} color="var(--accent-blue)" />
            <span>Deployment Roadmap & Implementation Disclosure</span>
          </div>
          <p style={{ margin: 0 }}>
            The React Web Portal is fully implemented and running live in this demonstration. Native Android and iOS mobile applications are planned delivery roadmap items included in the turnkey scope of Packages 2 & 3 upon institutional agreement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagePricingSection;
