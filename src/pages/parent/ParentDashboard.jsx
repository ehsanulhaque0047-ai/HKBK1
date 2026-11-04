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
  Mail,
  BookOpen,
  FileText,
  Bell
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
      {/* 1. Ward Profile Banner with Option F Subtle Glass */}
      <div
        className="portal-hero-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(25, 40, 59, 0.75) 0%, rgba(16, 27, 44, 0.9) 100%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(54, 198, 176, 0.28)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem 1.75rem',
          boxShadow: 'var(--shadow-glass)'
        }}
      >
        <div className="portal-hero-main">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            style={{
              width: '88px',
              height: '88px',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'cover',
              border: '2.5px solid var(--accent-teal)',
              flexShrink: 0
            }}
          />

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--accent-teal)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                Parent Portal – Linked Ward Academic Record
              </span>
            </div>

            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#F1F5F9', marginTop: '0.15rem', marginBottom: 0 }}>
              {studentProfile.name}
            </h1>

            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.45rem', fontSize: '0.82rem', color: '#A5B4C7', flexWrap: 'wrap' }}>
              <span>USN: <strong className="mono-font" style={{ color: 'var(--accent-teal-light)' }}>{studentProfile.usn}</strong></span>
              <span>Program: <strong style={{ color: '#F1F5F9' }}>B.E. {studentProfile.department}</strong></span>
              <span>Current Term: <strong style={{ color: '#F1F5F9' }}>{studentProfile.semester}th Semester (Sec {studentProfile.section})</strong></span>
            </div>

            <div style={{ marginTop: '0.4rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Authorized Parent: {currentUser?.name} ({currentUser?.relation}) • Phone: {currentUser?.phone}
            </div>
          </div>
        </div>

        <div className="portal-hero-actions">
          <Button
            variant="teal"
            size="sm"
            icon={MessageSquare}
            onClick={() => navigate('/parent/communication')}
          >
            Contact Proctor
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={CreditCard}
            onClick={() => navigate('/parent/fees')}
          >
            Fee Summary
          </Button>
        </div>
      </div>

      {/* 2. Key Ward Indicators Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={UserCheck}
          label="Attendance Overview"
          value={`${attendance.overallPercentage}%`}
          subvalue={`${attendance.totalClassesAttended} / ${attendance.totalClassesConducted} Attended`}
          color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
          trend={attendance.overallPercentage >= 75 ? 'Exam Eligible (>75%)' : 'Shortage Alert (<75%)'}
          onClick={() => navigate('/parent/attendance')}
        />
        <StatsCard
          icon={Award}
          label="Cumulative CGPA"
          value={`${examinations.cumulativeStats.cgpa} CGPA`}
          subvalue="Current SGPA: 8.85"
          color="gold"
          trend="Top 5% in Class"
          onClick={() => navigate('/parent/results')}
        />
        <StatsCard
          icon={CreditCard}
          label="College Fee Standing"
          value={fees.outstandingFee === 0 ? 'Dues Cleared' : `₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue="Even Semester 2024–25"
          color={fees.outstandingFee > 0 ? 'warning' : 'success'}
          trend={fees.outstandingFee === 0 ? 'Paid in Full' : 'Due: 30-Nov-2024'}
          onClick={() => navigate('/parent/fees')}
        />
        <StatsCard
          icon={MessageSquare}
          label="Proctor Messages"
          value={`${parentMessages.length} Messages`}
          subvalue="Dr. A. K. Manjunath (Proctor)"
          color="navy"
          onClick={() => navigate('/parent/communication')}
        />
      </div>

      {/* 3. Main Dashboard Two-Column Grid */}
      <div className="dashboard-split-grid">
        {/* Left Column: Subject Attendance & CIE Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Subject Attendance Health */}
          <Card
            title="Subject-wise Attendance Snapshot"
            subtitle="VTU requires minimum 75% per course for exam eligibility"
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
                    <tr key={sub.subjectCode || sub.code}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#F1F5F9' }}>{sub.subjectName || sub.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub.faculty}</div>
                      </td>
                      <td>{sub.total || sub.conducted}</td>
                      <td style={{ fontWeight: 600 }}>{sub.attended}</td>
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            color: sub.percentage < 75 ? 'var(--status-danger)' : 'var(--accent-teal)'
                          }}
                        >
                          {sub.percentage}%
                        </span>
                      </td>
                      <td>
                        {sub.percentage < 75 ? (
                          <Badge variant="warning">Borderline</Badge>
                        ) : (
                          <Badge variant="success">Eligible</Badge>
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
            title="Continuous Internal Evaluation (CIE) & SGPA"
            subtitle="IA-1 & IA-2 Assessment Scores for 6th Semester"
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
                    <th>Course Title</th>
                    <th>IA-1 (/30)</th>
                    <th>IA-2 (/30)</th>
                    <th>Avg IA</th>
                    <th>Total CIE (/50)</th>
                  </tr>
                </thead>
                <tbody>
                  {examinations.internalMarks.slice(0, 4).map((m) => (
                    <tr key={m.code}>
                      <td style={{ fontWeight: 700, color: '#F1F5F9' }}>{m.subject}</td>
                      <td>{m.ia1}</td>
                      <td>{m.ia2 !== null ? m.ia2 : '—'}</td>
                      <td style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>{m.avgIa}</td>
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
          <Card title="Assigned Faculty Proctor" icon={HeartHandshake} accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                  alt=""
                  style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-teal)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#F1F5F9' }}>
                    Dr. A. K. Manjunath
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Associate Professor & Proctor, Dept. of CSE
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} color="var(--accent-teal)" />
                  <span>manjunath.ak@hkbk.edu.in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} color="var(--accent-teal)" />
                  <span>+91 94481 77652 (Proctor Desk AB-208)</span>
                </div>
              </div>

              <Button
                variant="teal"
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
          <Card title="Institutional Circulars" icon={Bell}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {announcements.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-teal)' }}>
                      {notif.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, marginTop: '0.2rem', color: '#F1F5F9' }}>
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

export default ParentDashboard;
