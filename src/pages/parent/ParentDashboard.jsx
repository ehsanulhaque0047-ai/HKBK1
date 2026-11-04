import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  GraduationCap,
  UserCheck,
  Award,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const ParentDashboard = () => {
  const { currentUser } = useAuth();
  const {
    studentProfile,
    attendance,
    examinations,
    fees,
    announcements,
    parentMessages
  } = useData();

  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Ward Profile Banner */}
      <div
        className="simp-card-navy"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '1.75rem'
        }}
      >
        <img
          src={studentProfile.avatar}
          alt={studentProfile.name}
          style={{
            width: '90px',
            height: '90px',
            borderRadius: 'var(--radius-lg)',
            objectFit: 'cover',
            border: '3px solid var(--accent-gold)'
          }}
        />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#DFBF77', textTransform: 'uppercase', fontWeight: 700 }}>
              Parent Portal – Linked Ward
            </span>
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.2rem' }}>
            {studentProfile.name}
          </h1>

          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.82rem', color: '#CBD5E1', flexWrap: 'wrap' }}>
            <span>USN: <strong className="mono-font" style={{ color: '#DFBF77' }}>{studentProfile.usn}</strong></span>
            <span>Program: <strong>B.E. {studentProfile.department}</strong></span>
            <span>Current Term: <strong>{studentProfile.semester}th Semester (Sec {studentProfile.section})</strong></span>
          </div>

          <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94A3B8' }}>
            Parent Account: {currentUser?.name} ({currentUser?.relation}) • Phone: {currentUser?.phone}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Button
            variant="gold"
            size="sm"
            icon={MessageSquare}
            onClick={() => navigate('/parent/communication')}
          >
            Contact Mentor / Proctor
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={CreditCard}
            onClick={() => navigate('/parent/fees')}
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Fee Summary
          </Button>
        </div>
      </div>

      {/* 2. Key Ward Indicators Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={UserCheck}
          label="Ward Attendance"
          value={`${attendance.overallPercentage}%`}
          subvalue={`${attendance.totalClassesAttended} / ${attendance.totalClassesConducted} Attended`}
          color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
          trend={attendance.overallPercentage >= 75 ? '✓ Exam Eligible' : '⚠ Shortage Alert'}
          onClick={() => navigate('/parent/attendance')}
        />
        <StatsCard
          icon={Award}
          label="Cumulative CGPA"
          value={examinations.cumulativeStats.cgpa}
          subvalue="Current SGPA: 8.85"
          color="gold"
          trend="Top 5% in Class"
          onClick={() => navigate('/parent/results')}
        />
        <StatsCard
          icon={CreditCard}
          label="Outstanding College Fees"
          value={`₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue="Due Date: 30-Nov-2024"
          color={fees.outstandingFee > 0 ? 'warning' : 'success'}
          onClick={() => navigate('/parent/fees')}
        />
        <StatsCard
          icon={MessageSquare}
          label="Proctor Messages"
          value={`${parentMessages.length} Messages`}
          subvalue="Dr. A. K. Manjunath"
          color="navy"
          onClick={() => navigate('/parent/communication')}
        />
      </div>

      {/* 3. Main Dashboard Two-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Attendance Health & Latest Internal Assessment Marks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Subject Attendance Health */}
          <Card
            title="Subject-wise Attendance Snapshot"
            subtitle="VTU requires minimum 75% per course"
            icon={UserCheck}
            accent
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/parent/attendance')}
              >
                Detailed Log
              </Button>
            }
          >
            <div className="simp-table-container">
              <table className="simp-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Held</th>
                    <th>Attended</th>
                    <th>Percentage</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.subjects.slice(0, 4).map((sub) => (
                    <tr key={sub.subjectCode}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{sub.subjectName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub.faculty}</div>
                      </td>
                      <td>{sub.total}</td>
                      <td style={{ fontWeight: 600 }}>{sub.attended}</td>
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            color: sub.percentage <= 75 ? 'var(--status-danger)' : 'var(--status-success)'
                          }}
                        >
                          {sub.percentage}%
                        </span>
                      </td>
                      <td>
                        {sub.percentage <= 75 ? (
                          <Badge variant="warning">Borderline (75%)</Badge>
                        ) : (
                          <Badge variant="success">Safe</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Continuous Internal Evaluation (CIE) */}
          <Card
            title="Continuous Internal Evaluation (CIE) Performance"
            subtitle="IA-1 & IA-2 Assessment Scores"
            icon={Award}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/parent/results')}
              >
                Full Scorecard
              </Button>
            }
          >
            <div className="simp-table-container">
              <table className="simp-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>IA-1 (/30)</th>
                    <th>IA-2 (/30)</th>
                    <th>Avg IA</th>
                    <th>Total CIE (/50)</th>
                  </tr>
                </thead>
                <tbody>
                  {examinations.internalMarks.slice(0, 4).map((m) => (
                    <tr key={m.code}>
                      <td style={{ fontWeight: 700 }}>{m.subject}</td>
                      <td>{m.ia1}</td>
                      <td>{m.ia2 !== null ? m.ia2 : '—'}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>{m.avgIa}</td>
                      <td style={{ fontWeight: 800, color: 'var(--status-success)' }}>
                        {m.totalInternal} / 50
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Mentor Contacts, Institutional Notices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Proctor / Faculty Contact Card */}
          <Card title="Assigned Faculty Mentor" icon={HeartHandshake} accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                  alt=""
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Dr. A. K. Manjunath
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Associate Professor & PG Coordinator, CSE
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} color="var(--accent-gold-dark)" />
                  <span>manjunath.ak@hkbk.edu.in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} color="var(--accent-gold-dark)" />
                  <span>+91 94481 77652 (Proctor Desk AB-208)</span>
                </div>
              </div>

              <Button
                variant="gold"
                size="sm"
                icon={MessageSquare}
                onClick={() => navigate('/parent/communication')}
                style={{ marginTop: '0.25rem' }}
              >
                Send Message to Proctor
              </Button>
            </div>
          </Card>

          {/* Institutional Circulars for Parents */}
          <Card title="Institutional Circulars" icon={Sparkles}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {announcements.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold-dark)' }}>
                      {notif.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, marginTop: '0.2rem' }}>
                    {notif.title}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
