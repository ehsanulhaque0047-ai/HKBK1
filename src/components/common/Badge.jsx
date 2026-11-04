import React from 'react';

export const Badge = ({ children, variant = 'info', icon: Icon, className = '' }) => {
  const variantClass = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    gold: 'badge-gold',
    navy: 'badge-navy'
  }[variant] || 'badge-info';

  return (
    <span className={`simp-badge ${variantClass} ${className}`}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};
