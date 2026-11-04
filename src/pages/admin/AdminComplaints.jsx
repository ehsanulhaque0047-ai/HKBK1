import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  Send
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminComplaints = () => {
  const { complaints, respondToComplaint } = useData();

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseStatus, setResponseStatus] = useState('Resolved');
  const [responseText, setResponseText] = useState('');

  const handleResolve = (e) => {
    e.preventDefault();
    if (!responseText.trim()) return;
    respondToComplaint(selectedComplaint.id, responseStatus, responseText);
    setSelectedComplaint(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Institutional Grievance Redressal Committee</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Review campus infrastructure, lab, transport, and academic grievances logged by students.
        </p>
      </div>

      {/* Complaints List */}
      <Card title="Grievance Tickets & Redressal Ledger" icon={AlertTriangle} accent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {complaints.map((cmp) => {
            const isResolved = cmp.status === 'Resolved';
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
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {cmp.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        • Student: {cmp.studentName} ({cmp.studentUsn}) on {cmp.submittedDate}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: '0.25rem' }}>
                      {cmp.title}
                    </h3>
                  </div>

                  <div>
                    <Badge variant={isResolved ? 'success' : 'warning'}>
                      {cmp.status}
                    </Badge>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  {cmp.description}
                </p>

                {cmp.adminResponse && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      gap: '0.65rem'
                    }}
                  >
                    <MessageSquare size={16} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.82rem' }}>
                      <strong>Committee Action: </strong>
                      <span>{cmp.adminResponse}</span>
                      {cmp.resolvedDate && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Resolved on: {cmp.resolvedDate}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                  <Button
                    variant="gold"
                    size="sm"
                    icon={MessageSquare}
                    onClick={() => {
                      setSelectedComplaint(cmp);
                      setResponseStatus(cmp.status === 'Resolved' ? 'Resolved' : 'Resolved');
                      setResponseText(cmp.adminResponse || '');
                    }}
                  >
                    {isResolved ? 'Update Response' : 'Respond & Resolve Ticket'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Redressal Response Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          title={`Action Ticket: ${selectedComplaint.id}`}
          subtitle={selectedComplaint.title}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Send} onClick={handleResolve}>
                Post Official Redressal
              </Button>
            </div>
          }
        >
          <form onSubmit={handleResolve} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Resolution Status</label>
              <select
                className="simp-select"
                value={responseStatus}
                onChange={(e) => setResponseStatus(e.target.value)}
              >
                <option value="Resolved">Resolved (Matter Addressed & Rectified)</option>
                <option value="In Progress">In Progress (Assigned to Maintenance/Dept Head)</option>
                <option value="Under Review">Under Review (Committee Meeting Scheduled)</option>
              </select>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Official Committee Redressal Action / Response</label>
              <textarea
                className="simp-textarea"
                rows={4}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="State the corrective measures taken by college administration..."
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

