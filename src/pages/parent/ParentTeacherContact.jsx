import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Mail,
  Phone,
  User,
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ParentTeacherContact = () => {
  const { currentUser } = useAuth();
  const { parentMessages, sendParentMessage, studentProfile } = useData();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    sendParentMessage(
      `${currentUser?.name || 'Mr. Tariq Ahmed'} (Parent)`,
      'Dr. A. K. Manjunath (Proctor / Faculty)',
      subject,
      message,
      studentProfile.usn
    );
    setSubject('');
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Proctorial & Parent-Teacher Communication</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Direct communication channel with assigned academic mentor and proctor Dr. A. K. Manjunath.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Messages Thread */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Send New Message Box */}
          <Card title="Compose Message to Proctor" icon={Send} accent>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="simp-form-group">
                <label className="simp-label">Subject</label>
                <input
                  className="simp-input"
                  placeholder="e.g. Query regarding upcoming IA-2 test schedule..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="simp-form-group">
                <label className="simp-label">Message Details</label>
                <textarea
                  className="simp-textarea"
                  rows={4}
                  placeholder="Type your message or request for an appointment..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="gold" icon={Send}>
                  Send Message
                </Button>
              </div>
            </form>
          </Card>

          {/* Conversation History */}
          <Card title="Communication History" icon={MessageSquare}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {parentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      From: <strong>{msg.from}</strong> • {msg.date}
                    </div>
                    <Badge variant={msg.status === 'Replied' ? 'success' : 'gold'}>
                      {msg.status}
                    </Badge>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {msg.subject}
                  </h4>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Mentor Office Hours & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Mentor / Proctor Profile" icon={User} accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                  alt=""
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Dr. A. K. Manjunath</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Associate Professor & PG Coordinator, CSE
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                <div>Cabin: <strong>Admin Block AB-208</strong></div>
                <div>Email: <strong>manjunath.ak@hkbk.edu.in</strong></div>
                <div>Contact: <strong>+91 94481 77652</strong></div>
                <div>Visiting Hours: <strong>Mon - Fri: 03:00 PM – 04:30 PM</strong></div>
              </div>

              <div style={{ padding: '0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Parents may schedule in-person consultations during visiting hours by giving prior intimation via this portal or telephone.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
