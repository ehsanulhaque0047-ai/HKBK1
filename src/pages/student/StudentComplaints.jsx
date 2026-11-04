import React, { useState } from 'react';
import {
  AlertTriangle,
  Plus,
  Clock,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const StudentComplaints = () => {
  const { complaints, submitComplaint, studentProfile } = useData();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [category, setCategory] = useState('Academic & Laboratory');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    submitComplaint(category, title, description);
    setIsSubmitModalOpen(false);
    setTitle('');
    setDescription('');
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Grievance & Redressal Cell</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            AICTE & VTU Mandated Ombudsman & Internal Grievance Cell | Confidential & Time-bound Resolution
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsSubmitModalOpen(true)}
        >
          Lodge New Grievance
        </Button>
      </div>

      {/* Complaints Tracking List */}
      <Card title="Submitted Grievance Tickets & Redressal Status" icon={AlertTriangle} accent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {complaints.map((cmp) => {
            const isResolved = cmp.status === 'Resolved';
            const isInProgress = cmp.status === 'In Progress';

            return (
              <div
                key={cmp.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-muted)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span className="mono-font" style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent-blue)' }}>
                        {cmp.id}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)'
                        }}
                      >
                        {cmp.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        • Logged on {cmp.submittedDate}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                      {cmp.title}
                    </h3>
                  </div>

                  <div>
                    {isResolved ? (
                      <Badge variant="success" icon={CheckCircle2}>Resolved</Badge>
                    ) : isInProgress ? (
                      <Badge variant="warning" icon={Clock}>Under Review / In Progress</Badge>
                    ) : (
                      <Badge variant="info" icon={Clock}>Open</Badge>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {cmp.description}
                </p>

                {/* Administrator Action & Response */}
                {cmp.adminResponse && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isResolved ? 'var(--status-success-bg)' : 'var(--bg-card)',
                      border: isResolved ? '1px solid var(--status-success-border)' : '1px solid var(--border-light)',
                      display: 'flex',
                      gap: '0.65rem',
                      alignItems: 'flex-start'
                    }}
                  >
                    <MessageSquare
                      size={16}
                      color={isResolved ? 'var(--status-success)' : 'var(--accent-blue)'}
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    <div style={{ fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>
                        Grievance Redressal Committee Response:{' '}
                      </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{cmp.adminResponse}</span>
                      {cmp.resolvedDate && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          Resolved on: {cmp.resolvedDate}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* New Grievance Modal */}
      {isSubmitModalOpen && (
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          title="Lodge Grievance with Redressal Cell"
          subtitle="All grievances are handled confidentially by HOD & Academic Ombudsman"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsSubmitModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Send} onClick={handleSubmit}>
                Submit Grievance
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Grievance Category</label>
              <select
                className="simp-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Academic & Laboratory">Academic & Laboratory Facilities</option>
                <option value="Campus Transport">College Bus & Transport</option>
                <option value="Hostel & Mess">Hostel, Hygiene & Mess</option>
                <option value="Examination & IA Marks">Examination, Evaluation & Marks</option>
                <option value="Library & Computing">Library, WiFi & Computing Center</option>
                <option value="General Administration">General Administration & Helpdesk</option>
              </select>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Subject / Title</label>
              <input
                className="simp-input"
                placeholder="Brief summary of the issue..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Detailed Description</label>
              <textarea
                className="simp-textarea"
                rows={4}
                placeholder="Provide specific details including lab number, terminal ID, date, or specific difficulty experienced..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Note: Frivolous submissions may delay genuine redressal. Please provide factual details.
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

