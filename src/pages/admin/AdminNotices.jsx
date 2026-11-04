import React, { useState } from 'react';
import {
  Bell,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Send,
  Calendar,
  Users
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminNotices = () => {
  const { announcements, addAnnouncement } = useData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [targetRole, setTargetRole] = useState('all');
  const [isUrgent, setIsUrgent] = useState(false);
  const [description, setDescription] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addAnnouncement(title, category, description, targetRole, isUrgent);
    setIsCreateModalOpen(false);
    setTitle('');
    setDescription('');
    setIsUrgent(false);
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Institutional Circulars & Notifications Manager</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Broadcast academic notifications, examination schedules, fee deadlines & emergency alerts.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Publish New Institutional Circular
        </Button>
      </div>

      {/* Broadcast History */}
      <Card title="Published Circulars & Announcements Feed" icon={Bell} accent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {announcements.map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: notif.isUrgent ? 'var(--status-danger-bg)' : 'var(--bg-muted)',
                border: notif.isUrgent ? '1.5px solid var(--status-danger-border)' : '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Badge variant={notif.isUrgent ? 'danger' : 'gold'}>
                    {notif.category}
                  </Badge>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Target: {notif.targetRole}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    • Published on {notif.date}
                  </span>
                </div>

                {notif.isUrgent && (
                  <Badge variant="warning" icon={AlertTriangle}>
                    High Priority
                  </Badge>
                )}
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {notif.title}
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {notif.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Publish Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Broadcast Institutional Notice"
          subtitle="Signed by Office of the Registrar & Academic Deans"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Send} onClick={handlePublish}>
                Broadcast Circular
              </Button>
            </div>
          }
        >
          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Notice Title</label>
              <input
                className="simp-input"
                placeholder="e.g. Schedule for VTU Theory Semester End Examinations Dec 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid-cols-2">
              <div className="simp-form-group">
                <label className="simp-label">Category</label>
                <select
                  className="simp-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Academic">Academic Schedule</option>
                  <option value="Attendance">Attendance Regulations</option>
                  <option value="Fees">Fee Reminders</option>
                  <option value="Placement">Campus Placements</option>
                  <option value="Examination">VTU Examinations</option>
                </select>
              </div>

              <div className="simp-form-group">
                <label className="simp-label">Audience Target</label>
                <select
                  className="simp-select"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                >
                  <option value="all">Entire Campus (All Users)</option>
                  <option value="student">Students Only</option>
                  <option value="faculty">Faculty & Teaching Staff</option>
                  <option value="parent">Parents & Guardians</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="urgentCheck"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
              <label htmlFor="urgentCheck" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--status-danger)' }}>
                Mark as High Priority / Urgent Notice
              </label>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Notice Body & Details</label>
              <textarea
                className="simp-textarea"
                rows={4}
                placeholder="Enter complete notification text, instructions, and deadlines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
