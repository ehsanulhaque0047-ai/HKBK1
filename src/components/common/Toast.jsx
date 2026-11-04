import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Toast = () => {
  const { toast } = useData();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isDanger = toast.type === 'danger';

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.9rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: isDanger ? '#B91C1C' : isSuccess ? '#0B1E36' : 'var(--primary-navy)',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-lg)',
          borderLeft: isSuccess ? '4px solid var(--accent-gold)' : isDanger ? '4px solid #EF4444' : '4px solid #38BDF8',
          maxWidth: '420px',
          fontSize: '0.9rem',
          fontWeight: 500
        }}
      >
        {isSuccess ? (
          <CheckCircle2 size={20} color="#DFBF77" />
        ) : isDanger ? (
          <AlertCircle size={20} color="#FCA5A5" />
        ) : (
          <Info size={20} color="#7DD3FC" />
        )}
        <div style={{ flex: 1 }}>{toast.message}</div>
      </motion.div>
    </AnimatePresence>
  );
};

