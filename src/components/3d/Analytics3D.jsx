import React, { useState } from 'react';
import { usePackage } from '../../context/PackageContext';
import { Award, TrendingUp, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Analytics3D = ({ internalMarks, subjects = [], semesterHistory = [], onSelectSubject }) => {
  const { packageTier } = usePackage();
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

  const enable3D = packageTier !== 'package1' && packageTier !== 'basic';

  // Normalize marks list: prefer internalMarks, fallback to subjects
  const marksList = (internalMarks && internalMarks.length > 0)
    ? internalMarks
    : (subjects && subjects.length > 0)
    ? subjects.map((s) => ({
        code: s.code,
        subject: s.name || s.subject,
        ia1: Math.round((s.percentage || 80) * 0.28),
        ia2: Math.round((s.percentage || 80) * 0.27),
        assignment: 19,
        totalInternal: Math.round(((s.percentage || 80) / 100) * 45) + 3,
        maxTotal: 50
      }))
    : [];

  const selectedCourse = marksList[selectedSubjectIndex] || marksList[0];

  const handleSelectCourse = (idx, course) => {
    setSelectedSubjectIndex(idx);
    if (onSelectSubject) {
      onSelectSubject(course);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 3D Assessment Pillar Matrix */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
          perspective: '1000px'
        }}
      >
        {marksList.map((m, idx) => {
          const isSelected = selectedSubjectIndex === idx;
          const percentage = (m.totalInternal / m.maxTotal) * 100;

          return (
            <div
              key={m.code}
              onClick={() => handleSelectCourse(idx, m)}
              style={{
                cursor: 'pointer',
                padding: '1rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-muted)',
                border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                boxShadow: enable3D && isSelected ? 'var(--shadow-3d-gold)' : 'var(--shadow-xs)',
                transform: enable3D && isSelected ? 'translateY(-6px) rotateX(4deg)' : 'none',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {enable3D && isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #DFBF77, #997A32)'
                  }}
                />
              )}

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono-font" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                    {m.code}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-gold)' }}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    marginTop: '0.35rem',
                    lineHeight: 1.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {m.subject}
                </div>
              </div>

              {/* 3D Vertical Bar Cylinder */}
              <div style={{ marginTop: '0.75rem' }}>
                <div
                  style={{
                    height: '80px',
                    width: '100%',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '3px',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${Math.min(percentage, 100)}%`,
                      borderRadius: 'var(--radius-xs)',
                      background: isSelected
                        ? 'linear-gradient(180deg, #DFBF77 0%, #C5A059 50%, #0B1E36 100%)'
                        : 'linear-gradient(180deg, #3B82F6 0%, #1D63B8 100%)',
                      transition: 'height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      position: 'relative',
                      boxShadow: enable3D ? '0 4px 8px rgba(0,0,0,0.15)' : 'none'
                    }}
                  >
                    {enable3D && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: '#FFF8DC',
                          borderRadius: '2px',
                          opacity: 0.8
                        }}
                      />
                    )}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    textAlign: 'center',
                    marginTop: '0.35rem',
                    color: isSelected ? 'var(--accent-gold-dark)' : 'var(--text-secondary)'
                  }}
                >
                  {m.totalInternal} / {m.maxTotal}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Assessment Detailed 3D Inspector */}
      {selectedCourse && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            boxShadow: enable3D ? 'var(--shadow-3d-md)' : 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '1.25rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Badge variant="navy">{selectedCourse.code}</Badge>
              <Badge variant="gold">Max CIE: {selectedCourse.maxTotal} Marks</Badge>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              {selectedCourse.subject}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Continuous Internal Evaluation (CIE) breakdown vetted under VTU CBCS rubrics.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>IA-1 Test: </span>
                <strong>{selectedCourse.ia1} / 30</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>IA-2 Test: </span>
                <strong>{selectedCourse.ia2 !== null ? selectedCourse.ia2 : '—'} / 30</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Assignment: </span>
                <strong>{selectedCourse.assignment} / 20</strong>
              </div>
            </div>
          </div>

          {/* 3D Score Badge */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary-navy-dark) 0%, var(--primary-navy) 100%)',
              color: '#FFFFFF',
              border: '1px solid var(--border-accent)',
              boxShadow: enable3D ? 'var(--shadow-3d-gold)' : 'none',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#DFBF77' }}>
              Final Continuous Score
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#FFFFFF', margin: '0.2rem 0' }}>
              {selectedCourse.totalInternal} <span style={{ fontSize: '1rem', color: '#94A3B8' }}>/ {selectedCourse.maxTotal}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
              {selectedCourse.totalInternal >= 20 ? '✓ VTU Examination Eligible' : '⚠ Remedial Assessment Required'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

