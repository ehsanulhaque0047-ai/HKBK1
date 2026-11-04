import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Award,
  ChevronRight,
  FolderUp,
  FileClock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const FacultyDashboard = () => {
  const { currentUser } = useAuth();
  const { subjects, assignments, announcements } = useData();
  const navigate = useNavigate();

  // Assigned subjects for the logged-in faculty
  const mySubjects = subjects.filter((s) => s.facultyName?.includes('Manjunath') || s.facultyName?.includes('Ramesh'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Faculty Welcome Banner in Subtle Glass */}
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
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'}
            alt={currentUser?.name}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#F1F5F9', margin: 0 }}>
                {currentUser?.name || 'Dr. A. K. Manjunath'}
              </h1>
              <span
                style={{
                  background: 'var(--accent-teal-subtle)',
                  color: 'var(--accent-teal-light)',
                  border: '1px solid rgba(54, 198, 176, 0.3)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {currentUser?.employeeId || 'HKBK-FAC-108'}
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--accent-teal-light)', marginTop: '0.2rem', marginBottom: 0, fontWeight: 600 }}>
              {currentUser?.designation || 'Associate Professor & Proctor'} – Dept. of Computer Science & Engineering
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.8rem', color: '#A5B4C7', flexWrap: 'wrap' }}>
              <span>Assigned Class: <strong style={{ color: '#F1F5F9' }}>6th Sem CSE 'A' (62 Students)</strong></span>
              <span>Cabin: <strong style={{ color: '#F1F5F9' }}>Admin Block AB-208</strong></span>
              <span>Affiliation: <strong style={{ color: '#F1F5F9' }}>VTU Belagavi</strong></span>
            </div>
          </div>
        </div>

        <div className="portal-hero-actions">
          <Button
            variant="teal"
            size="sm"
            icon={UserCheck}
            onClick={() => navigate('/faculty/attendance')}
          >
            Mark Daily Attendance
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Award}
            onClick={() => navigate('/faculty/internal-marks')}
          >
            Enter CIE Marks
          </Button>
        </div>
      </div>

      {/* 2. Faculty Performance & Responsibility Metrics */}
      <div className="grid-cols-4">
        <StatsCard
          icon={BookOpen}
          label="Assigned Subjects"
          value={mySubjects.length}
          subvalue="Theory & Laboratory Sections"
          color="navy"
          onClick={() => navigate('/faculty/materials')}
        />
        <StatsCard
          icon={Users}
          label="Assigned Classes"
          value="62 Students"
          subvalue="6th Sem CSE Section A"
          color="gold"
          onClick={() => navigate('/faculty/students')}
        />
        <StatsCard
          icon={FileText}
          label="Assignments"
          value={`${assignments.length} Active`}
          subvalue="Continuous Evaluation"
          color="warning"
          onClick={() => navigate('/faculty/assignments')}
        />
        <StatsCard
          icon={Clock}
          label="Lectures Today"
          value="3 Sessions"
          subvalue="Period 1, Period 5 & Lab"
          color="success"
        />
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="dashboard-split-grid">
        {/* Left Column: Assigned Subjects & Today's Teaching Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Assigned Subjects Card */}
          <Card title="Assigned Subjects & Curriculum Progress" icon={BookOpen} accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {mySubjects.map((sub) => (
                <div
                  key={sub.code}
                  style={{
                    padding: '0.95rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-teal)', fontSize: '0.82rem' }}>
                        {sub.code}
                      </span>
                      <Badge variant={sub.type === 'Laboratory' ? 'navy' : 'teal'}>
                        {sub.credits} Credits • {sub.type}
                      </Badge>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '0.25rem', color: '#F1F5F9' }}>
                      {sub.name}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Class: 6th Sem CSE-A • Hall: {sub.room} • Syllabus: 72% Delivered
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/faculty/attendance')}
                    >
                      Attendance
                    </Button>
                    <Button
                      variant="subtle"
                      size="sm"
                      onClick={() => navigate('/faculty/internal-marks')}
                    >
                      Marks
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Teaching Schedule */}
          <Card title="Today's Teaching Schedule (Monday)" icon={Clock}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: '3.5px solid var(--status-success)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F1F5F9' }}>Period 1: System Software & Compilers (18CS61)</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>09:00 AM – 10:00 AM • Room AB-304 • 6th Sem CSE-A</div>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>

              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: '3.5px solid var(--accent-blue)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F1F5F9' }}>Period 5 & 6: System Software Laboratory (18CSL66)</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>02:00 PM – 04:00 PM • Turing Lab AB-102 • Batch 1</div>
                </div>
                <Badge variant="warning">Upcoming Next</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Attendance Management & Student Performance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Student Performance & Cohort Attendance Summary */}
          <Card title="Student Performance & Cohort Attendance" icon={Users}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <span>Regular Attendance (&gt;75% Cutoff):</span>
                <strong style={{ color: 'var(--status-success)' }}>54 Students (87%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <span>Shortage Warning (&lt;75% Cutoff):</span>
                <strong style={{ color: 'var(--status-danger)' }}>8 Students (13%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <span>Class Average CIE-1 Score:</span>
                <strong style={{ color: 'var(--accent-teal)' }}>41.8 / 50 Marks</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Proctorial Mentorship Reviews:</span>
                <strong style={{ color: 'var(--status-warning)' }}>2 Pending</strong>
              </div>

              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/faculty/students')}
                style={{ marginTop: '0.5rem' }}
              >
                Inspect Cohort Roster (62 Students)
              </Button>
            </div>
          </Card>

          {/* Notices and Announcements for Faculty */}
          <Card title="Notices and Circulars" icon={Bell}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {announcements.slice(0, 2).map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.025)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase' }}>
                      {notif.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', marginTop: '0.2rem', color: '#F1F5F9' }}>
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

export default FacultyDashboard;
