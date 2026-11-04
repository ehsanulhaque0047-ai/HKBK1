import React from 'react';
import { Sparkles, Sliders, CheckCircle2, ShieldCheck, Server, Smartphone, Globe } from 'lucide-react';
import { usePackage, PACKAGES } from '../../context/PackageContext';
import { PackagePricingSection } from '../../components/packages/PackagePricingSection';
import { Button } from '../../components/common/Button';

export const PackagesPage = () => {
  const { packageTier, setPackageTier, setIsComparisonModalOpen } = usePackage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Institutional Packages Header Banner with Option F Subtle Glass */}
      <div
        className="portal-hero-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(25, 40, 59, 0.75) 0%, rgba(16, 27, 44, 0.9) 100%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(54, 198, 176, 0.28)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-glass)',
          color: '#FFFFFF'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-teal-subtle)',
              border: '1px solid rgba(54, 198, 176, 0.3)',
              color: 'var(--accent-teal-light)',
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={13} color="var(--accent-teal)" />
            Commercial Proposal & Deployment Packages
          </div>

          <h1
            style={{
              fontSize: '1.95rem',
              fontWeight: 800,
              color: '#F1F5F9',
              letterSpacing: '-0.02em',
              margin: '0 0 0.75rem 0',
              lineHeight: 1.2
            }}
          >
            Institutional Portal Packages & Cloud Infrastructure
          </h1>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#A5B4C7',
              lineHeight: 1.6,
              margin: '0 0 1.5rem 0'
            }}
          >
            Transparent, turnkey pricing for HKBK College of Engineering digitization. Development fees are one-time capital expenditures for complete software delivery. First-year hosting estimates cover high-availability cloud infrastructure, secure PostgreSQL database, and bandwidth, billed annually with zero maintenance fees.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              variant="teal"
              icon={Sliders}
              onClick={() => setIsComparisonModalOpen(true)}
            >
              Open Detailed Comparison Matrix
            </Button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--accent-teal-light)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <ShieldCheck size={16} color="var(--accent-teal)" />
              <span>Zero Separate Maintenance Fees • Standard VTU Curriculum Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Packages Comparison Grid & Critical Disclosures */}
      <PackagePricingSection id="commercial-packages-list" />
    </div>
  );
};

export default PackagesPage;
