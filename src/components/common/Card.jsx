import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  footer,
  accent = false,
  variant = 'default', // default, navy
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  ...props
}) => {
  const cardClasses = [
    'simp-card',
    accent ? 'simp-card-accent' : '',
    variant === 'navy' ? 'simp-card-navy' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {(title || action) && (
        <div className={`simp-card-header ${headerClassName}`}>
          <div>
            <div className="simp-card-title">
              {Icon && <Icon size={18} className="text-gold" />}
              <span>{title}</span>
            </div>
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="simp-card-actions">{action}</div>}
        </div>
      )}
      <div className={`simp-card-body ${bodyClassName}`}>{children}</div>
      {footer && <div className={`simp-card-footer ${footerClassName}`}>{footer}</div>}
    </div>
  );
};
