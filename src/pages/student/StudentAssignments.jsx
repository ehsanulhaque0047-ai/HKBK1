import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Download,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const StudentAssignments = () => {
  const { assignments, submitAssignment } = useData();

  const [activeFilter, setActiveFilter] = useState('All'); // All, Pending, Submitted, Evaluated
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [fileName, setFileName] = useState('');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filtered = assignments.filter((a) => {
    if (activeFilter === 'All') return true;
    return a.status === activeFilter;
  });

  const handleOpenSubmit = (asg) => {
    setSelectedAssignment(asg);
    setFileName(`1HK21CS042_${asg.subjectCode}_Assignment.pdf`);
    setComments('');
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      submitAssignment(selectedAssignment.id, fileName, comments);
      setSubmitting(false);
      setSelectedAssignment(null);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Assignments & Submissions</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Continuous Internal Evaluation (CIE) coursework, lab problem sets & mini-projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['All', 'Pending', 'Submitted', 'Evaluated'].map((f) => (
            <Button
              key={f}
              variant={activeFilter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(f)}
            >
              {f} ({assignments.filter((a) => f === 'All' || a.status === f).length})
            </Button>
          ))}
        </div>
      </div>

      {/* Assignment List Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((asg) => {
          const isPending = asg.status === 'Pending';
          const isEvaluated = asg.status === 'Evaluated';
          const isSubmitted = asg.status === 'Submitted';

          return (
            <Card
              key={asg.id}
              accent={isPending}
              style={{
                borderColor: isPending ? 'var(--border-accent)' : undefined
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="mono-font" style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent-blue)' }}>
                        {asg.subjectCode}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {asg.subjectName}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--text-primary)' }}>
                      {asg.title}
                    </h3>
                  </div>

                  <div>
                    {isPending && <Badge variant="warning" icon={Clock}>Pending Submission</Badge>}
                    {isSubmitted && <Badge variant="info" icon={FileCheck}>Submitted (Awaiting Grade)</Badge>}
                    {isEvaluated && <Badge variant="success" icon={CheckCircle2}>Evaluated ({asg.marksObtained}/{asg.maxMarks})</Badge>}
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {asg.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-light)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span>Faculty: <strong>{asg.facultyName}</strong></span>
                    <span>Max Marks: <strong>{asg.maxMarks}</strong></span>
                    <span>
                      Deadline: <strong style={{ color: isPending ? 'var(--status-danger)' : undefined }}>
                        {new Date(asg.deadline).toLocaleString()}
                      </strong>
                    </span>
                  </div>

                  <div>
                    {isPending ? (
                      <Button
                        variant="gold"
                        size="sm"
                        icon={Upload}
                        onClick={() => handleOpenSubmit(asg)}
                      >
                        Upload & Submit
                      </Button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          File: <strong>{asg.submittedFile}</strong>
                        </span>
                        {isEvaluated && (
                          <div
                            style={{
                              padding: '0.25rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'var(--status-success-bg)',
                              color: 'var(--status-success)',
                              fontWeight: 700,
                              border: '1px solid var(--status-success-border)'
                            }}
                          >
                            Score: {asg.marksObtained} / {asg.maxMarks}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Faculty Evaluation Feedback Box if Evaluated */}
                {isEvaluated && asg.facultyFeedback && (
                  <div
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-muted)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      gap: '0.6rem',
                      alignItems: 'flex-start'
                    }}
                  >
                    <MessageSquare size={16} color="var(--accent-gold-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Faculty Feedback: </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{asg.facultyFeedback}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Upload Simulation Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          title={`Submit Assignment: ${selectedAssignment.subjectCode}`}
          subtitle={selectedAssignment.title}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Upload} loading={submitting} onClick={handleFinalSubmit}>
                Confirm & Submit
              </Button>
            </div>
          }
        >
          <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                border: '2px dashed var(--accent-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: 'var(--accent-gold-subtle)',
                cursor: 'pointer'
              }}
            >
              <Upload size={36} color="var(--accent-gold-dark)" style={{ margin: '0 auto 0.75rem' }} />
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Select File to Upload</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Supported formats: PDF, ZIP, TAR.GZ (Max size: 25 MB)
              </div>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">File Name</label>
              <input
                className="simp-input"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Student Remarks / Submission Notes (Optional)</label>
              <textarea
                className="simp-textarea"
                rows={3}
                placeholder="Include any GitHub repo links, setup instructions, or notes for the course instructor..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Note: VTU anti-plagiarism guidelines apply. All code and reports undergo similarity analysis.
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
