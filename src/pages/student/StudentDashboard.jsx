import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Calendar,
  Clock,
  UserCheck,
  Award,
  AlertTriangle,
  FileText,
  CreditCard,
  FileCheck,
  ChevronRight,
  TrendingUp,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  Download
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const StudentDashboard = () => {
  const {
    studentProfile,
    attendance,
    timetable,
    assignments,
    examinations,
    fees,
    announcements,
    placements
  } = useData();

  const navigate = useNavigate();

  // Pending assignments count
  const pendingAssignments = assignments.filter((a) => a.status === 'Pending');

  // Today's classes from timetable (Monday by default in demo)
  const todayClasses = timetable.schedule.Monday || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Student Identity Header Banner */}
      <div
        className="simp-card-navy"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '1.75rem'
        }}
      >
        {/* Subtle decorative gold seal background */}
        <div
          style={{
            position: 'absolute',
            right: '-30px',
            bottom: '-40px',
            opacity: 0.08,
            pointerEvents: 'none'
          }}
        >
          <img src="/hkbk-crest.svg" alt="" style={{ width: '280px', height: '280px' }} />
        </div>

        {/* Student Avatar */}
        <div style={{ position: 'relative' }}>
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            style={{
              width: '96px',
              height: '96px',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'cover',
              border: '3px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              background: '#15803D',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              border: '2px solid #0B1E36'
            }}
          >
            ACTIVE
          </span>
        </div>

        {/* Core Student Meta */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.02em'
              }}
            >
              {studentProfile.name}
            </h1>
            <span
              style={{
                background: 'rgba(197, 160, 89, 0.2)',
                color: 'var(--accent-gold-light)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              USN: {studentProfile.usn}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '0.6rem',
              flexWrap: 'wrap',
              fontSize: '0.84rem',
              color: '#CBD5E1'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <GraduationCap size={16} color="var(--accent-gold)" />
              <span>{studentProfile.department} (Sec {studentProfile.section})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <BookOpen size={16} color="var(--accent-gold)" />
              <span>{studentProfile.course} – {studentProfile.semester}th Semester</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={16} color="var(--accent-gold)" />
              <span>Academic Year {studentProfile.academicYear || '2024-2025'}</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '0.5rem',
              fontSize: '0.78rem',
              color: '#94A3B8'
            }}
          >
            <span>Mentor: {studentProfile.mentor?.name}</span>
            <span>•</span>
            <span>Quota: {studentProfile.quota}</span>
            <span>•</span>
            <span>Bus Pass: {studentProfile.transport?.routeNo}</span>
          </div>
        </div>

        {/* Quick Profile & Hall Ticket Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1 }}>
          <Button
            variant="gold"
            size="sm"
            icon={Download}
            onClick={() => navigate('/student/examination')}
          >
            Hall Ticket (VTU)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/student/profile')}
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Complete Profile
          </Button>
        </div>
      </div>

      {/* 2. Key Academic Metric Cards */}
      <div className="grid-cols-4">
        {/* Attendance Percentage */}
        <StatsCard
          icon={UserCheck}
          color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
          label="Overall Attendance"
          value={`${attendance.overallPercentage}%`}
          subvalue={`${attendance.totalClassesAttended} of ${attendance.totalClassesConducted} Classes`}
          trend={attendance.overallPercentage >= 75 ? '✓ VTU Compliant' : '⚠ Shortage Alert'}
          onClick={() => navigate('/student/attendance')}
        />

        {/* CGPA & Academic Standing */}
        <StatsCard
          icon={Award}
          color="gold"
          label="Cumulative CGPA"
          value={examinations.cumulativeStats.cgpa}
          subvalue="Current SGPA: 8.85"
          trend="Top 5% of Department"
          onClick={() => navigate('/student/examination')}
        />

        {/* Pending Assignments */}
        <StatsCard
          icon={FileText}
          color={pendingAssignments.length > 0 ? 'warning' : 'success'}
          label="Pending Assignments"
          value={`${pendingAssignments.length} Due`}
          subvalue="Next deadline: 12-Nov"
          trend="Active Submissions"
          onClick={() => navigate('/student/assignments')}
        />

        {/* Fee Payment Standing */}
        <StatsCard
          icon={CreditCard}
          color={fees.outstandingFee > 0 ? 'danger' : 'success'}
          label="Outstanding Fees"
          value={`₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue={`Paid: ₹ ${fees.paidFee.toLocaleString('en-IN')}`}
          trend={fees.outstandingFee > 0 ? 'Due: 30-Nov-2024' : 'All Dues Cleared'}
          onClick={() => navigate('/student/fees')}
        />
      </div>

      {/* 3. Main Dashboard Two-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Today's Timetable & Upcoming Exams */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Schedule Card */}
          <Card
            title="Today's Academic Schedule (Monday)"
            subtitle="Department of CSE | Class Section 6-A"
            icon={Clock}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/student/timetable')}
              >
                Weekly Grid
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {todayClasses.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border-light)',
                    borderLeft: item.type === 'Lab' ? '4px solid #1D63B8' : '4px solid var(--accent-gold)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        textAlign: 'center',
                        minWidth: '55px'
                      }}
                    >
                      P-{item.period}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {item.subject}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {item.faculty} • Room: <strong>{item.room}</strong>
                      </div>
                    </div>
                  </div>

                  <Badge variant={item.type === 'Lab' ? 'navy' : 'gold'}>
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Examinations & IA-2 Schedule */}
          <Card
            title="Upcoming Examinations (IA-2 & Semester End)"
            subtitle="Visvesvaraya Technological University Examination Schedule"
            icon={Award}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/student/examination')}
              >
                View Results & IA
              </Button>
            }
          >
            <div className="simp-table-container">
              <table className="simp-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Sub Code</th>
                    <th>Subject Title</th>
                    <th>Hall / Room</th>
                  </tr>
                </thead>
                <tbody>
                  {examinations.iaSchedule.map((exam, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{exam.date}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{exam.time}</div>
                      </td>
                      <td>
                        <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                          {exam.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{exam.subject}</td>
                      <td>
                        <Badge variant="info">{exam.room}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Urgent Alerts, Pending Assignments & Placement Drives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Important Institutional Announcements */}
          <Card
            title="Institutional Notices & Circulars"
            subtitle="Official notifications from Registrar & Dean Academics"
            icon={Sparkles}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/student/notifications')}
              >
                All Notices
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {announcements.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: notif.isUrgent ? 'var(--status-danger-bg)' : 'var(--bg-muted)',
                    border: notif.isUrgent ? '1px solid var(--status-danger-border)' : '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: notif.isUrgent ? 'var(--status-danger)' : 'var(--accent-gold-dark)'
                      }}
                    >
                      {notif.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      marginTop: '0.25rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {notif.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.3rem',
                      lineHeight: 1.35
                    }}
                  >
                    {notif.description}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Course Assignments */}
          <Card
            title="Pending Course Assignments"
            subtitle="Submit lab reports & problem sets before cutoff"
            icon={FileText}
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/student/assignments')}
              >
                Submit Now
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pendingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="mono-font" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {asg.subjectCode}
                    </span>
                    <Badge variant="warning">Due Soon</Badge>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.3rem' }}>
                    {asg.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.5rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span>Max Marks: {asg.maxMarks}</span>
                    <span>Deadline: {new Date(asg.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Shortcuts */}
          <Card title="Quick Services & Helpdesk" icon={Briefcase}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <Button
                variant="subtle"
                size="sm"
                icon={FileCheck}
                onClick={() => navigate('/student/documents')}
                style={{ justifyContent: 'flex-start' }}
              >
                Bonafide Certificate
              </Button>
              <Button
                variant="subtle"
                size="sm"
                icon={CreditCard}
                onClick={() => navigate('/student/fees')}
                style={{ justifyContent: 'flex-start' }}
              >
                Pay Semester Fee
              </Button>
              <Button
                variant="subtle"
                size="sm"
                icon={Briefcase}
                onClick={() => navigate('/student/placements')}
                style={{ justifyContent: 'flex-start' }}
              >
                Placement Drives
              </Button>
              <Button
                variant="subtle"
                size="sm"
                icon={AlertTriangle}
                onClick={() => navigate('/student/complaints')}
                style={{ justifyContent: 'flex-start' }}
              >
                Lodge Grievance
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
