import React, { useRef, useState } from 'react';
import { usePackage } from '../../context/PackageContext';

export const Card3D = ({
  children,
  className = '',
  style = {},
  accent = false,
  depth = 20, // max tilt angle in degrees
  glow = true,
  onClick,
  ...props
}) => {
  const { packageTier } = usePackage();
  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // If in 'basic' tier or reduced motion preferred, we don't apply 3D gyro tilt
  const enable3DPhysics = packageTier === 'advanced' || packageTier === 'complete';

  const handleMouseMove = (e) => {
    if (!enable3DPhysics || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -1 * (depth * 0.45);
    const rotateY = ((x - centerX) / centerX) * (depth * 0.45);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX,
      glareY,
      opacity: 0.18
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  const transformStyle = enable3DPhysics && isHovered
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`
    : enable3DPhysics
    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)'
    : 'none';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`simp-card simp-card-3d ${accent ? 'simp-card-accent' : ''} tier-${packageTier} ${className}`}
      style={{
        transform: transformStyle,
        transition: isHovered && enable3DPhysics ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style
      }}
      {...props}
    >
      {/* 3D Specular Glare Overlay for Advanced and Complete tiers */}
      {enable3DPhysics && glow && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(223, 191, 119, ${tilt.opacity}), transparent 60%)`,
            transition: 'opacity 0.25s ease',
            zIndex: 10
          }}
        />
      )}

      {/* Layered content container with translateZ for authentic 3D pop */}
      <div
        style={{
          transform: enable3DPhysics && isHovered ? 'translateZ(15px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
};

