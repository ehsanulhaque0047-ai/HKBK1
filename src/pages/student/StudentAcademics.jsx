import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  CheckCircle2,
  ExternalLink,
  Search,
  Layers,
  Award
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentAcademics = () => {
  const { subjects, studyMaterials } = useData();

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [activeTab, setActiveTab] = useState('syllabus'); // 'syllabus' or 'materials'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = studyMaterials.filter(
    (mat) =>
      mat.subjectCode === selectedSubject.code &&
      mat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Academic Curriculum & Study Materials</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          VTU 2021 Scheme Curriculum | Department of Computer Science & Engineering – 6th Semester
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="academics-split-grid">
        {/* Left Column: Course Subjects List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            Enrolled Courses ({subjects.length})
          </h3>

          {subjects.map((sub) => {
            const isSelected = selectedSubject.code === sub.code;
            return (
              <div
                key={sub.code}
                onClick={() => setSelectedSubject(sub)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-card)',
                  border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className="mono-font"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isSelected ? 'var(--accent-gold-dark)' : 'var(--accent-blue)'
                    }}
                  >
                    {sub.code}
                  </span>
                  <Badge variant={sub.type === 'Laboratory' ? 'navy' : 'gold'}>
                    {sub.credits} Credits
                  </Badge>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
                  {sub.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Instructor: {sub.facultyName}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Course Syllabus & Materials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Course Banner */}
          <Card variant="navy" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {selectedSubject.code} • {selectedSubject.type}
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.25rem', color: '#FFFFFF' }}>
                  {selectedSubject.name}
                </h2>
                <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.82rem', color: '#CBD5E1' }}>
                  <span>Credits: <strong>{selectedSubject.credits}</strong></span>
                  <span>Faculty: <strong>{selectedSubject.facultyName}</strong></span>
                  <span>Venue: <strong>{selectedSubject.room}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant={activeTab === 'syllabus' ? 'gold' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('syllabus')}
                  style={{ color: activeTab === 'syllabus' ? '#0B1E36' : '#FFFFFF' }}
                >
                  Syllabus Modules
                </Button>
                <Button
                  variant={activeTab === 'materials' ? 'gold' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('materials')}
                  style={{ color: activeTab === 'materials' ? '#0B1E36' : '#FFFFFF' }}
                >
                  Lecture Notes ({studyMaterials.filter((m) => m.subjectCode === selectedSubject.code).length})
                </Button>
              </div>
            </div>
          </Card>

          {/* TAB 1: SYLLABUS MODULES */}
          {activeTab === 'syllabus' && (
            <Card title="VTU Approved Course Syllabus" icon={BookOpen} accent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedSubject.syllabus?.map((module, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-muted)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-navy)',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {index + 1}
                      </span>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {module}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                <strong>Textbook Reference:</strong> Prescribed as per VTU Curriculum (2021 CBCS Scheme). Copies available in Central Library Stack Room & Digital E-Consortium portal.
              </div>
            </Card>
          )}

          {/* TAB 2: STUDY MATERIALS & LECTURE NOTES */}
          {activeTab === 'materials' && (
            <Card
              title="Faculty Lecture Notes & Problem Sheets"
              icon={FileText}
              action={
                <div style={{ position: 'relative', width: '220px' }}>
                  <Search
                    size={14}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="simp-input"
                    style={{ paddingLeft: '2rem', paddingRight: '0.5rem', fontSize: '0.8rem', height: '32px' }}
                  />
                </div>
              }
            >
              {filteredMaterials.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No study materials found"
                  description="No lecture notes match your search. Try a different keyword or check back later."
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {filteredMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-muted)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--status-danger-bg)',
                            color: 'var(--status-danger)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            border: '1px solid var(--status-danger-border)'
                          }}
                        >
                          PDF
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                            {mat.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            Uploaded by {mat.uploadedBy} on {mat.uploadedDate} • Size: {mat.size} • {mat.downloads} downloads
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        icon={Download}
                        onClick={() => alert(`Downloading "${mat.title}" (${mat.size})`)}
                      >
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

