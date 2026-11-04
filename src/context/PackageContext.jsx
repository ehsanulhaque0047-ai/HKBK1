import React, { createContext, useContext, useState, useEffect } from 'react';

const PACKAGE_STORAGE_KEY = 'hkbk_package_tier';

export const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Campus Portal',
    price: '₹2,00,000',
    priceNumeric: 200000,
    period: 'One-time Implementation & License',
    badge: 'Foundation Package',
    tagline: 'Essential academic and administrative digital operations',
    description: 'A solid foundation for institutional digitization featuring sleek 3D-styled cards, realistic shadows, and multi-role dashboards.',
    highlights: [
      'Premium 3D-styled dashboard cards with layered depth',
      'Realistic shadows, elevated borders & glassmorphism',
      'Smooth micro-interactions and route transitions',
      'Fully responsive Student, Faculty, Admin and Parent portals',
      'Core academic modules (Attendance, Timetable, Profile, Results)',
      'Document request tracking & grievance submission',
      'Role-based security & demo authentication',
      'Light and Dark academic theme support'
    ],
    visualFeatures: {
      cardDepth: 'Subtle 3D Layered Shadows',
      interactions: 'Smooth CSS Transitions',
      analytics: 'Standard 2D Charts (Recharts)',
      threeJsCanvases: false,
      mobileAppsProposal: 'Web Portal Only (Mobile Responsive)'
    }
  },
  {
    id: 'advanced',
    name: 'Advanced College Management',
    price: '₹3,50,000',
    priceNumeric: 350000,
    period: 'One-time Implementation & License',
    badge: 'Most Popular Choice',
    tagline: 'Interactive 3D academic analytics & dynamic visual intelligence',
    description: 'Elevates institutional intelligence with interactive 3D parallax cards, dynamic attendance rings, and multidimensional performance visualizers.',
    highlights: [
      'Everything in Basic Campus Portal included',
      'Interactive 3D-inspired academic analytics & performance gauges',
      'Gyroscope & mouse-reactive 3D parallax card tilt physics',
      'Animated attendance radial rings with depth layers',
      'Interactive Continuous Evaluation (CIE) 3D bar visualizer',
      'Dynamic fee receipt inspection with holographic seal preview',
      'Advanced proctorial student cohort performance matrix',
      'Performance-tuned for 60 FPS across desktop and mobile browsers'
    ],
    visualFeatures: {
      cardDepth: 'Interactive 3D Mouse Parallax Tilt',
      interactions: 'Layered Spatial Micro-physics',
      analytics: '3D Depth Rings & Dimensional Charts',
      threeJsCanvases: 'Subtle Holographic Accents',
      mobileAppsProposal: 'PWA Web-App Ready'
    }
  },
  {
    id: 'complete',
    name: 'Complete Digital Campus',
    price: '₹4,50,000',
    priceNumeric: 450000,
    period: 'Comprehensive Turnkey Solution',
    badge: 'Enterprise Flagship',
    tagline: 'Flagship Web Experience + Native Mobile Apps Included in Proposal',
    description: 'The pinnacle of institutional technology: real-time Three.js 3D WebGL visuals throughout the portal PLUS native Android & iOS mobile applications included in the delivery proposal roadmap.',
    highlights: [
      'Everything in Advanced College Management included',
      'Interactive WebGL 3D Digital Campus orbital sphere with academic satellites',
      'Interactive 3D Mobile App Device Showcase previewing native Android & iOS interfaces',
      'Native Android (.apk) & iOS (.ipa) applications included in package roadmap',
      'Real-time Three.js spatial lighting, specular glares & particle atmospheres',
      '3D Holographic VTU Academic Seal & Hall Ticket inspector',
      'Priority VTU / AICTE regulatory compliance integration',
      'Respects prefers-reduced-motion for universal accessibility'
    ],
    visualFeatures: {
      cardDepth: 'Full 3D WebGL & Physics Layering',
      interactions: 'Real-time Particle Atmospheric Depth',
      analytics: 'Multi-axis 3D Interactive Analytics Engine',
      threeJsCanvases: 'Interactive WebGL 3D Campus & Holograms',
      mobileAppsProposal: 'Dedicated Android & iOS Native Apps Included'
    }
  }
];

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [packageTier, setPackageTierState] = useState(() => {
    return localStorage.getItem(PACKAGE_STORAGE_KEY) || 'complete';
  });

  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(PACKAGE_STORAGE_KEY, packageTier);
    document.documentElement.setAttribute('data-package-tier', packageTier);
  }, [packageTier]);

  const setPackageTier = (tier) => {
    if (['basic', 'advanced', 'complete'].includes(tier)) {
      setPackageTierState(tier);
    }
  };

  const currentPackage = PACKAGES.find((p) => p.id === packageTier) || PACKAGES[2];

  return (
    <PackageContext.Provider
      value={{
        packageTier,
        setPackageTier,
        currentPackage,
        packages: PACKAGES,
        isComparisonModalOpen,
        setIsComparisonModalOpen
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within PackageProvider');
  }
  return context;
};

