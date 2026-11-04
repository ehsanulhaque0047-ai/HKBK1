import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '560px',
  footer
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="simp-modal-overlay" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="simp-modal-content"
            style={{ maxWidth }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="simp-card-header" style={{ padding: '1.25rem 1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {title}
                </h3>
                {subtitle && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="simp-btn-subtle"
                style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="simp-card-body" style={{ padding: '1.5rem', overflowY: 'auto' }}>
              {children}
            </div>
            {footer && (
              <div className="simp-card-footer" style={{ padding: '1rem 1.5rem' }}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

