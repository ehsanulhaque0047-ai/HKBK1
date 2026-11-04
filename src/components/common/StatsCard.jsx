import React from 'react';

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  subvalue,
  trend,
  color = 'gold', // gold, navy, success, warning, danger
  className = '',
  onClick
}) => {
  const colorMap = {
    gold: {
      bg: 'var(--accent-gold-subtle)',
      text: 'var(--accent-gold-dark)',
      border: 'var(--border-accent)'
    },
    navy: {
      bg: 'var(--accent-blue-subtle)',
      text: 'var(--accent-blue)',
      border: 'rgba(29, 99, 184, 0.2)'
    },
    success: {
      bg: 'var(--status-success-bg)',
      text: 'var(--status-success)',
      border: 'var(--status-success-border)'
    },
    warning: {
      bg: 'var(--status-warning-bg)',
      text: 'var(--status-warning)',
      border: 'var(--status-warning-border)'
    },
    danger: {
      bg: 'var(--status-danger-bg)',
      text: 'var(--status-danger)',
      border: 'var(--status-danger-border)'
    }
  }[color] || { bg: 'var(--bg-muted)', text: 'var(--text-primary)', border: 'var(--border-light)' };

  return (
    <div
      className={`simp-stat-card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div
        className="simp-stat-icon"
        style={{
          background: colorMap.bg,
          color: colorMap.text,
          border: `1px solid ${colorMap.border}`
        }}
      >
        {Icon && <Icon size={24} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="simp-stat-label">{label}</div>
        <div className="simp-stat-value">{value}</div>
        {(subvalue || trend) && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginTop: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {trend && <span style={{ fontWeight: 600 }}>{trend}</span>}
            {subvalue && <span>{subvalue}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

