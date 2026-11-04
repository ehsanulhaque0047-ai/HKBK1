import React from 'react';
import { usePackage } from '../../context/PackageContext';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AttendanceRing3D = ({
  percentage = 84.6,
  totalAttended = 220,
  totalHeld = 260,
  threshold = 75.0,
  size = 200,
  strokeWidth = 14
}) => {
  const { packageTier } = usePackage();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isSafe = percentage >= threshold;
  const enableAdvanced3D = packageTier !== 'package1' && packageTier !== 'basic';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          perspective: 600
        }}
      >
        {/* Ambient 3D Depth Shadow Ring */}
        {enableAdvanced3D && (
          <div
            style={{
              position: 'absolute',
              width: size * 0.85,
              height: size * 0.85,
              borderRadius: '50%',
              background: isSafe
                ? 'radial-gradient(circle, rgba(21, 128, 61, 0.22) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(185, 28, 28, 0.25) 0%, transparent 70%)',
              filter: 'blur(10px)',
              transform: 'translateZ(-10px)'
            }}
          />
        )}

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            transform: 'rotate(-90deg)',
            overflow: 'visible'
          }}
        >
          <defs>
            <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E5AB" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A32" />
            </linearGradient>

            <linearGradient id="ringSafe" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <linearGradient id="ringTrack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--border-light)" />
              <stop offset="100%" stopColor="var(--bg-subtle)" />
            </linearGradient>

            <filter id="ring3DShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Track with 3D Depth */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#ringTrack)"
            strokeWidth={strokeWidth}
            fill="transparent"
            opacity={0.7}
          />

          {/* Active Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isSafe ? 'url(#ringSafe)' : '#EF4444'}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={enableAdvanced3D ? 'url(#ring3DShadow)' : undefined}
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* VTU 75% Threshold Marker Dot */}
          <circle
            cx={size / 2 + radius * Math.cos((threshold / 100) * 2 * Math.PI)}
            cy={size / 2 + radius * Math.sin((threshold / 100) * 2 * Math.PI)}
            r={4}
            fill="#D4AF37"
            stroke="#0B1E36"
            strokeWidth={1.5}
          />
        </svg>

        {/* Center 3D Glass Disc with Attendance % */}
        <div
          style={{
            position: 'absolute',
            width: size * 0.65,
            height: size * 0.65,
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            boxShadow: enableAdvanced3D ? 'var(--shadow-3d-md)' : 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: enableAdvanced3D ? 'translateZ(18px)' : 'none',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: size > 160 ? '1.75rem' : '1.35rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
              color: isSafe ? 'var(--text-primary)' : 'var(--status-danger)'
            }}
          >
            {percentage}%
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginTop: '0.2rem'
            }}
          >
            {totalAttended} / {totalHeld} Class
          </div>
        </div>
      </div>

      {/* Compliance Badge */}
      <div
        style={{
          marginTop: '0.75rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          background: isSafe ? 'var(--status-success-bg)' : 'var(--status-danger-bg)',
          color: isSafe ? 'var(--status-success)' : 'var(--status-danger)',
          border: `1px solid ${isSafe ? 'var(--status-success-border)' : 'var(--status-danger-border)'}`
        }}
      >
        {isSafe ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
        <span>{isSafe ? 'VTU 75% Requirement Satisfied' : 'Attendance Shortage Alert'}</span>
      </div>
    </div>
  );
};

