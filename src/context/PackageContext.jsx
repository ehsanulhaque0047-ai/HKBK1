import React, { createContext, useContext, useState, useEffect } from 'react';

const PACKAGE_STORAGE_KEY = 'hkbk_package_tier';

export const PACKAGES = [
  {
    id: 'package1',
    alias: 'basic',
    number: 1,
    name: 'PACKAGE 1 – WEBSITE ONLY',
    shortName: 'Website Only',
    devPrice: '₹1,20,000',
    devPriceNumeric: 120000,
    devPriceLabel: 'One-Time Development Fee',
    hostingPrice: '₹60,000',
    hostingPriceNumeric: 60000,
    hostingPriceLabel: 'First-Year Hosting Estimate',
    hostingPeriod: 'per year (recurring annual expense)',
    badge: 'Core Web Platform',
    tagline: 'Complete institutional digital management portal & database',
    description: 'Comprehensive React web portal serving all 4 user roles, powered by a Spring Boot backend and PostgreSQL database with responsive 3D-inspired academic UI.',
    includes: [
      'React web portal',
      'Student dashboard',
      'Faculty dashboard',
      'Admin dashboard',
      'Parent dashboard',
      'Spring Boot backend',
      'PostgreSQL database',
      'Attendance',
      'Timetable',
      'Assignments',
      'Results',
      'Responsive premium 3D-inspired UI'
    ],
    statusTag: 'Web Portal: Live Demonstration Active',
    hasAndroid: false,
    hasIOS: false,
    visualFeatures: {
      cardDepth: '3D Layered Shadows & Glassmorphism',
      analytics: 'Interactive 2D & 3D Gauges',
      platforms: 'Web Browser (Desktop, Tablet & Mobile)'
    }
  },
  {
    id: 'package2',
    alias: 'advanced',
    number: 2,
    name: 'PACKAGE 2 – WEBSITE + ANDROID',
    shortName: 'Website + Android',
    devPrice: '₹1,68,000',
    devPriceNumeric: 168000,
    devPriceLabel: 'One-Time Development Fee',
    hostingPrice: '₹84,000',
    hostingPriceNumeric: 84000,
    hostingPriceLabel: 'First-Year Hosting Estimate',
    hostingPeriod: 'per year (recurring annual expense)',
    badge: 'Web + Android App',
    tagline: 'Includes everything in Package 1 plus native Android mobile app',
    description: 'Expands institutional reach with a dedicated Android application, real-time push alerts, mobile attendance, and a unified shared backend.',
    includes: [
      'Everything in Package 1 included',
      'Android application',
      'Mobile dashboards',
      'Push notifications',
      'Mobile attendance and results',
      'Shared backend and database'
    ],
    statusTag: 'Android Application: Architecture Proposed (Roadmap Delivery)',
    hasAndroid: true,
    hasIOS: false,
    visualFeatures: {
      cardDepth: '3D Parallax Tilt Physics',
      analytics: 'Interactive 3D Continuous Evaluation (CIE)',
      platforms: 'Web + Android Mobile App'
    }
  },
  {
    id: 'package3',
    alias: 'complete',
    number: 3,
    name: 'PACKAGE 3 – WEBSITE + ANDROID + IOS',
    shortName: 'Website + Android + iOS',
    devPrice: '₹2,16,000',
    devPriceNumeric: 216000,
    devPriceLabel: 'One-Time Development Fee',
    hostingPrice: '₹1,08,000',
    hostingPriceNumeric: 108000,
    hostingPriceLabel: 'First-Year Hosting Estimate',
    hostingPeriod: 'per year (recurring annual expense)',
    badge: 'Full Turnkey Suite',
    tagline: 'Complete turnkey ecosystem: Web portal + Android + iOS applications',
    description: 'The flagship institutional package: React web portal, native Android app, native iOS app, shared high-performance backend, and App Store release preparation.',
    includes: [
      'Everything in Package 2 included',
      'iOS application',
      'iOS mobile dashboards',
      'Shared backend and database',
      'iOS release preparation'
    ],
    statusTag: 'iOS Application: Architecture Proposed (Roadmap Delivery)',
    hasAndroid: true,
    hasIOS: true,
    visualFeatures: {
      cardDepth: '3D Layered Depth, Shadow Physics & Glassmorphism',
      analytics: 'Multi-axis Interactive Continuous Analytics',
      platforms: 'Web Browser + Android + Apple iOS Native'
    }
  }
];

const PackageContext = createContext();

const normalizeTierId = (tier) => {
  if (['package1', 'basic', 'website'].includes(tier)) return 'package1';
  if (['package2', 'advanced', 'android'].includes(tier)) return 'package2';
  if (['package3', 'complete', 'ios'].includes(tier)) return 'package3';
  return 'package3';
};

export const PackageProvider = ({ children }) => {
  const [packageTier, setPackageTierState] = useState(() => {
    const saved = localStorage.getItem(PACKAGE_STORAGE_KEY);
    return normalizeTierId(saved || 'package3');
  });

  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(PACKAGE_STORAGE_KEY, packageTier);
    document.documentElement.setAttribute('data-package-tier', packageTier);
  }, [packageTier]);

  const setPackageTier = (tier) => {
    const normalized = normalizeTierId(tier);
    setPackageTierState(normalized);
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
        setIsComparisonModalOpen,
        isPackage1: packageTier === 'package1',
        hasAndroid: packageTier === 'package2' || packageTier === 'package3',
        hasIOS: packageTier === 'package3'
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

export default PackageContext;
