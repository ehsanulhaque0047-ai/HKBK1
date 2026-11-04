import React, { useState } from 'react';
import {
  FileClock,
  Plus,
  CheckCircle2,
  Clock,
  Calendar,
  UserCheck,
  Send
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyLeave = () => {
  const { facultyLeaves, applyFacultyLeave } = useData();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('On Duty (OD) - VTU Academic Work');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [alternateFaculty, setAlternateFaculty] = useState('Prof. Archana S. (CSE)');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason.trim()) return;
    applyFacultyLeave({
      leaveType,
      fromDate,
      toDate,
      days: 2,
      reason,
      alternateFaculty
    });
    setIsApplyModalOpen(false);
    setReason('');
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Faculty Leave & On-Duty (OD) Management</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Submit leave applications with class alternate arrangements for Principal / Dean Academics approval.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsApplyModalOpen(true)}
        >
          Apply for Leave / OD
        </Button>
      </div>

      {/* Leave Ledger */}
      <Card title="Submitted Leave Applications & Status" icon={FileClock} accent>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Leave Type</th>
                <th>Duration (From - To)</th>
                <th>Days</th>
                <th>Reason / Purpose</th>
                <th>Alternate Faculty</th>
                <th>Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {facultyLeaves.map((lv) => (
                <tr key={lv.id}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {lv.id}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{lv.leaveType}</td>
                  <td>
                    {lv.fromDate} to {lv.toDate}
                  </td>
                  <td style={{ fontWeight: 600 }}>{lv.days} Day(s)</td>
                  <td style={{ fontSize: '0.82rem' }}>{lv.reason}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lv.alternateFaculty}</td>
                  <td>
                    <Badge variant={lv.status === 'Approved' ? 'success' : 'warning'}>
                      {lv.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title="Apply for Faculty Leave / On-Duty"
          subtitle="Dean Academics Office approval protocol"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Send} onClick={handleSubmit}>
                Submit Leave Application
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Leave Category</label>
              <select
                className="simp-select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="On Duty (OD) - VTU Academic Work">On Duty (OD) - VTU Exam Valuation / Syllabus Review</option>
                <option value="On Duty (OD) - Research / Conference">On Duty (OD) - IEEE / Scopus Conference Presentation</option>
                <option value="Casual Leave (CL)">Casual Leave (CL)</option>
                <option value="Medical Leave (ML)">Medical Leave (ML)</option>
              </select>
            </div>

            <div className="grid-cols-2">
              <div className="simp-form-group">
                <label className="simp-label">From Date</label>
                <input
                  type="date"
                  className="simp-input"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
              </div>
              <div className="simp-form-group">
                <label className="simp-label">To Date</label>
                <input
                  type="date"
                  className="simp-input"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Alternate Faculty for Assigned Lectures</label>
              <input
                className="simp-input"
                value={alternateFaculty}
                onChange={(e) => setAlternateFaculty(e.target.value)}
                required
              />
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Reason / Justification</label>
              <textarea
                className="simp-textarea"
                rows={3}
                placeholder="Specify the reason or attach reference number..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

