import React, { useState } from 'react';
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Award,
  Upload,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyAssignments = () => {
  const { assignments, createAssignment, gradeAssignment } = useData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedForGrade, setSelectedForGrade] = useState(null);
  const [gradeMarks, setGradeMarks] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Create Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('21CS61');
  const [newMaxMarks, setNewMaxMarks] = useState(20);
  const [newDeadline, setNewDeadline] = useState('2024-11-25T23:59');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createAssignment({
      subjectCode: newSubject,
      subjectName: newSubject === '21CS61' ? 'System Software and Compilers' : 'Computer Networks',
      title: newTitle,
      description: newDesc,
      facultyName: 'Dr. A. K. Manjunath',
      maxMarks: Number(newMaxMarks),
      deadline: newDeadline
    });
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    if (!gradeMarks) return;
    gradeAssignment(selectedForGrade.id, gradeMarks, gradeFeedback);
    setSelectedForGrade(null);
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Continuous Evaluation: Course Assignments</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Publish lab tasks, problem sets, rubrics and evaluate student submissions.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Publish New Assignment
        </Button>
      </div>

      {/* Assignment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {assignments.map((asg) => (
          <Card key={asg.id} accent={asg.status === 'Submitted'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mono-font" style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--accent-blue)' }}>
                      {asg.subjectCode}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {asg.subjectName}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.2rem' }}>
                    {asg.title}
                  </h3>
                </div>

                <Badge variant={asg.status === 'Evaluated' ? 'success' : asg.status === 'Submitted' ? 'info' : 'warning'}>
                  {asg.status}
                </Badge>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {asg.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <span>Max Marks: <strong>{asg.maxMarks}</strong></span>
                  <span>Deadline: <strong>{new Date(asg.deadline).toLocaleString()}</strong></span>
                  {asg.submittedFile && (
                    <span>Submitted: <strong>{asg.submittedFile}</strong></span>
                  )}
                </div>

                <div>
                  {asg.status === 'Submitted' ? (
                    <Button
                      variant="gold"
                      size="sm"
                      icon={Award}
                      onClick={() => {
                        setSelectedForGrade(asg);
                        setGradeMarks(asg.maxMarks * 0.9);
                        setGradeFeedback('Good work on test cases and documentation.');
                      }}
                    >
                      Evaluate Submission
                    </Button>
                  ) : asg.status === 'Evaluated' ? (
                    <span style={{ fontWeight: 700, color: 'var(--status-success)' }}>
                      Graded: {asg.marksObtained} / {asg.maxMarks}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Awaiting Submissions</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Course Assignment"
          subtitle="Assignments will be published immediately to all enrolled students"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Plus} onClick={handleCreateSubmit}>
                Publish Assignment
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Assigned Course</label>
              <select
                className="simp-select"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              >
                <option value="21CS61">21CS61 – System Software & Compilers</option>
                <option value="21CS62">21CS62 – Computer Networks & Security</option>
                <option value="21CSL66">21CSL66 – System Software Lab</option>
              </select>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Assignment Title</label>
              <input
                className="simp-input"
                placeholder="e.g. Design of 3-Address Code Generator"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid-cols-2">
              <div className="simp-form-group">
                <label className="simp-label">Maximum Marks (CIE)</label>
                <input
                  type="number"
                  className="simp-input"
                  value={newMaxMarks}
                  onChange={(e) => setNewMaxMarks(e.target.value)}
                  required
                />
              </div>
              <div className="simp-form-group">
                <label className="simp-label">Submission Cutoff Date & Time</label>
                <input
                  type="datetime-local"
                  className="simp-input"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Problem Statement & Guidelines</label>
              <textarea
                className="simp-textarea"
                rows={4}
                placeholder="Specify the problem requirements, input/output formats, and evaluation rubric..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Grade Assignment Modal */}
      {selectedForGrade && (
        <Modal
          isOpen={!!selectedForGrade}
          onClose={() => setSelectedForGrade(null)}
          title={`Evaluate Submission: ${selectedForGrade.title}`}
          subtitle={`Student: Syed Rayan Ahmed (USN: 1HK21CS042)`}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedForGrade(null)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Award} onClick={handleGradeSubmit}>
                Submit Grade & Remarks
              </Button>
            </div>
          }
        >
          <form onSubmit={handleGradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Uploaded Student File:</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-blue)', marginTop: '0.2rem' }}>
                📁 {selectedForGrade.submittedFile}
              </div>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Marks Awarded (out of {selectedForGrade.maxMarks})</label>
              <input
                type="number"
                step="0.5"
                max={selectedForGrade.maxMarks}
                min="0"
                className="simp-input"
                value={gradeMarks}
                onChange={(e) => setGradeMarks(e.target.value)}
                required
              />
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Faculty Feedback & Rubric Remarks</label>
              <textarea
                className="simp-textarea"
                rows={3}
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
                placeholder="Constructive feedback for the student..."
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

