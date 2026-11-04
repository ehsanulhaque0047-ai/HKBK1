import React from 'react';
import { Sparkles, Sliders, CheckCircle2, ShieldCheck, Server, Smartphone, Globe } from 'lucide-react';
import { usePackage, PACKAGES } from '../../context/PackageContext';
import { PackagePricingSection } from '../../components/packages/PackagePricingSection';
import { Button } from '../../components/common/Button';

export const PackagesPage = () => {
  const { packageTier, setPackageTier, setIsComparisonModalOpen } = usePackage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Institutional Packages Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-navy-dark) 0%, var(--primary-navy) 100%)',
          border: '1px solid rgba(197, 160, 89, 0.35)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
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
              background: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: 'var(--accent-gold-light)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={13} color="var(--accent-gold)" />
            Commercial Proposal & Deployment Packages
          </div>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: '0 0 0.75rem 0',
              lineHeight: 1.2
            }}
          >
            Institutional Portal Packages & Cloud Infrastructure
          </h1>

          <p
            style={{
              fontSize: '0.95rem',
              color: '#CBD5E1',
              lineHeight: 1.6,
              margin: '0 0 1.5rem 0'
            }}
          >
            Transparent, turnkey pricing for HKBK College of Engineering digitization. Development fees are one-time capital expenditures for full software delivery. First-year hosting estimates cover secure cloud server hosting, PostgreSQL database, and high-availability traffic, billed annually with no separate maintenance fee.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              variant="gold"
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
                color: 'var(--accent-gold-light)',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <ShieldCheck size={16} color="var(--accent-gold)" />
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
