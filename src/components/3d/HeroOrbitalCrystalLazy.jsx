import React, { Suspense, lazy } from 'react';
import { Sparkles } from 'lucide-react';

const HeroOrbitalCrystal3D = lazy(() => import('./HeroOrbitalCrystal3D'));

const FallbackLoader = ({ height = 420 }) => (
  <div
    style={{
      width: '100%',
      height: `${height}px`,
      borderRadius: 'var(--radius-xl)',
      background: 'radial-gradient(ellipse at 50% 45%, var(--bg-surface) 0%, var(--bg-card) 65%, var(--bg-muted) 100%)',
      border: '1px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      color: 'var(--text-muted)'
    }}
  >
    <div
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        border: '3px solid rgba(197, 160, 89, 0.2)',
        borderTopColor: 'var(--accent-gold)',
        animation: 'spin 1s linear infinite'
      }}
    />
    <div style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
      <Sparkles size={14} color="var(--accent-gold)" />
      <span>Loading 3D Orbital Crystal Sculpture...</span>
    </div>
  </div>
);

export const HeroOrbitalCrystal = (props) => {
  return (
    <Suspense fallback={<FallbackLoader height={props.height} />}>
      <HeroOrbitalCrystal3D {...props} />
    </Suspense>
  );
};

export default HeroOrbitalCrystal;
