import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary, gold, outline, subtle, danger
  size = 'md', // sm, md, lg
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'simp-btn-sm' : size === 'lg' ? 'simp-btn-lg' : '';
  const variantClass = `simp-btn-${variant}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`simp-btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="simp-spinner-inline" />
      ) : (
        Icon && <Icon size={size === 'sm' ? 14 : 16} />
      )}
      <span>{children}</span>
      {IconRight && !loading && <IconRight size={size === 'sm' ? 14 : 16} />}
    </button>
  );
};
