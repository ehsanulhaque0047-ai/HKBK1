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
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const FacultyDashboard = () => {
  const { currentUser } = useAuth();
  const { subjects, assignments, studentsRoster, facultyLeaves } = useData();
  const navigate = useNavigate();

  // Assigned subjects for Dr. Manjunath
  const mySubjects = subjects.filter((s) => s.facultyName?.includes('Manjunath'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Faculty Profile Banner */}
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
          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'}
          alt={currentUser?.name}
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
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF' }}>
              {currentUser?.name || 'Dr. A. K. Manjunath'}
            </h1>
            <span
              style={{
                background: 'rgba(197, 160, 89, 0.25)',
                color: 'var(--accent-gold-light)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {currentUser?.employeeId || 'HKBK-FAC-108'}
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#DFBF77', marginTop: '0.2rem' }}>
            {currentUser?.designation || 'Associate Professor & PG Coordinator'} – Dept. of Computer Science & Engineering
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.6rem', fontSize: '0.8rem', color: '#CBD5E1', flexWrap: 'wrap' }}>
            <span>Cabin: <strong>Admin Block AB-208</strong></span>
            <span>Email: <strong>{currentUser?.email || 'manjunath.ak@hkbk.edu.in'}</strong></span>
            <span>Experience: <strong>14 Years (VTU / IISc)</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Button
            variant="gold"
            size="sm"
            icon={UserCheck}
            onClick={() => navigate('/faculty/attendance')}
          >
            Mark Attendance
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Award}
            onClick={() => navigate('/faculty/internal-marks')}
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Enter IA Marks
          </Button>
        </div>
      </div>

      {/* 2. Faculty Metrics Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={BookOpen}
          label="Assigned Courses"
          value={mySubjects.length}
          subvalue="Theory & Lab Sections"
          color="navy"
        />
        <StatsCard
          icon={Users}
          label="Enrolled Students"
          value="62"
          subvalue="6th Sem CSE Section A"
          color="gold"
        />
        <StatsCard
          icon={FileText}
          label="Course Assignments"
          value={assignments.length}
          subvalue="Continuous Evaluation"
          color="warning"
        />
        <StatsCard
          icon={Clock}
          label="Classes Today"
          value="3 Sessions"
          subvalue="Period 1, 2 & Lab"
          color="success"
        />
      </div>

      {/* 3. Main Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Assigned Subjects & Today's Teaching Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Assigned Courses & Curriculum Delivery" icon={BookOpen} accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {mySubjects.map((sub) => (
                <div
                  key={sub.code}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '0.82rem' }}>
                        {sub.code}
                      </span>
                      <Badge variant={sub.type === 'Laboratory' ? 'navy' : 'gold'}>
                        {sub.credits} Credits
                      </Badge>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                      {sub.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Class: 6th Sem CSE-A (62 Students) • Room: {sub.room}
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

          {/* Today's Teaching Timetable */}
          <Card title="Today's Teaching Schedule (Monday)" icon={Clock}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-muted)',
                  borderLeft: '4px solid var(--accent-gold)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Period 1: System Software & Compilers (21CS61)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>09:00 AM – 10:00 AM • Room AB-304 • 6th Sem CSE-A</div>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>

              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-muted)',
                  borderLeft: '4px solid var(--accent-blue)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Period 5 & 6: System Software Laboratory (21CSL66)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>02:00 PM – 04:00 PM • Turing Lab AB-102 • Batch 1</div>
                </div>
                <Badge variant="warning">Upcoming Next</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Quick Actions & Pending Evaluations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Quick Faculty Actions" icon={Sparkles}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
              <Button
                variant="subtle"
                icon={UserCheck}
                onClick={() => navigate('/faculty/attendance')}
                style={{ justifyContent: 'flex-start' }}
              >
                Take Daily Student Attendance
              </Button>
              <Button
                variant="subtle"
                icon={FileText}
                onClick={() => navigate('/faculty/assignments')}
                style={{ justifyContent: 'flex-start' }}
              >
                Create New Assignment / Task
              </Button>
              <Button
                variant="subtle"
                icon={Award}
                onClick={() => navigate('/faculty/internal-marks')}
                style={{ justifyContent: 'flex-start' }}
              >
                Update IA-1 & IA-2 Scores
              </Button>
              <Button
                variant="subtle"
                icon={FolderUp}
                onClick={() => navigate('/faculty/materials')}
                style={{ justifyContent: 'flex-start' }}
              >
                Upload Lecture Notes / Handouts
              </Button>
              <Button
                variant="subtle"
                icon={FileClock}
                onClick={() => navigate('/faculty/leaves')}
                style={{ justifyContent: 'flex-start' }}
              >
                Apply for On-Duty (OD) / Casual Leave
              </Button>
            </div>
          </Card>

          {/* Student Cohort Attendance Health */}
          <Card title="Class Cohort Health (6th Sem CSE)" icon={Users}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Regular Status (&gt;75% Attendance):</span>
                <strong style={{ color: 'var(--status-success)' }}>54 Students (87%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shortage Warning (&lt;75% Attendance):</span>
                <strong style={{ color: 'var(--status-danger)' }}>8 Students (13%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Proctorial Reviews Pending:</span>
                <strong style={{ color: 'var(--accent-gold-dark)' }}>2 Reviews</strong>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/faculty/students')}
                style={{ marginTop: '0.5rem' }}
              >
                Inspect Cohort Roster
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
