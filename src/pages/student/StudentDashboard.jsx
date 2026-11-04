import React from 'react';
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
  Sparkles,
  Download,
  Activity,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
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
    announcements
  } = useData();

  const navigate = useNavigate();

  // Pending assignments count
  const pendingAssignments = assignments.filter((a) => a.status === 'Pending');

  // Today's classes from timetable (Monday schedule)
  const todayClasses = timetable.schedule.Monday || [];

  // Academic SGPA performance chart data
  const performanceData = (examinations.semesterHistory || [
    { sem: 'Sem 1', sgpa: 8.40, cgpa: 8.40 },
    { sem: 'Sem 2', sgpa: 8.55, cgpa: 8.48 },
    { sem: 'Sem 3', sgpa: 8.62, cgpa: 8.53 },
    { sem: 'Sem 4', sgpa: 8.70, cgpa: 8.58 },
    { sem: 'Sem 5', sgpa: 8.85, cgpa: 8.64 },
    { sem: 'Sem 6 (Cur)', sgpa: 8.82, cgpa: 8.74 }
  ]).map((s) => ({
    name: s.sem.split(' ')[0],
    sgpa: s.sgpa,
    cgpa: s.cgpa || 8.74
  }));

  // Recent system activity log
  const recentActivities = [
    {
      id: 1,
      title: 'Even Semester Fee Receipt Generated',
      time: 'Today, 10:30 AM',
      type: 'finance',
      icon: CreditCard,
      color: 'var(--accent-teal)'
    },
    {
      id: 2,
      title: 'IA-2 Internal Marks Uploaded (18CS61)',
      time: 'Yesterday, 4:15 PM',
      type: 'academic',
      icon: Award,
      color: 'var(--accent-blue)'
    },
    {
      id: 3,
      title: 'VTU Final Hall Ticket Verified by Proctor',
      time: '02 Nov 2024',
      type: 'exam',
      icon: FileCheck,
      color: 'var(--status-success)'
    },
    {
      id: 4,
      title: 'Lab Assignment 3 Submitted Successfully',
      time: '30 Oct 2024',
      type: 'assignment',
      icon: FileText,
      color: 'var(--accent-teal)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. TOP SECTION: Professional Subtle Glass Welcome Header */}
      <div
        className="student-profile-hero"
        style={{
          background: 'linear-gradient(135deg, rgba(25, 40, 59, 0.75) 0%, rgba(16, 27, 44, 0.9) 100%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(54, 198, 176, 0.28)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem 1.75rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-glass)'
        }}
      >
        <div className="student-profile-desktop-grid">
          {/* Left Column: Avatar + Welcome Message + Identity */}
          <div className="student-profile-left-col">
            <div className="student-avatar-container">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="student-avatar-img"
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: 'var(--radius-lg)',
                  objectFit: 'cover',
                  border: '2.5px solid var(--accent-teal)'
                }}
              />
              <span className="student-status-badge">
                ACTIVE
              </span>
            </div>

            <div className="student-identity-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--accent-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Sparkles size={13} color="var(--accent-teal)" />
                  Student Management Portal
                </span>
              </div>

              <h1 className="student-name-title" style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0.1rem 0' }}>
                Welcome back, {studentProfile.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span className="student-usn-chip">
                  USN: {studentProfile.usn}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#A5B4C7', fontWeight: 600 }}>
                  {studentProfile.course} • Section {studentProfile.section}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Metadata Grid + Action Buttons */}
          <div className="student-profile-right-col">
            <div className="student-academic-meta-grid">
              <div className="student-meta-item">
                <GraduationCap size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Dept: </span>
                  <strong>{studentProfile.department}</strong>
                </span>
              </div>
              <div className="student-meta-item">
                <BookOpen size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Semester: </span>
                  <strong>Semester {studentProfile.semester} (AY 2024–25)</strong>
                </span>
              </div>
              <div className="student-meta-item">
                <UserCheck size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Proctor: </span>
                  <strong>{studentProfile.mentor?.name}</strong>
                </span>
              </div>
              <div className="student-meta-item">
                <MapPin size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Admission: </span>
                  <strong>{studentProfile.quota} Quota • VTU 1HK</strong>
                </span>
              </div>
            </div>

            <div className="student-profile-actions">
              <Button
                variant="teal"
                size="sm"
                icon={Download}
                onClick={() => navigate('/student/examination')}
              >
                VTU Hall Ticket
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/student/profile')}
              >
                View Full Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATISTICS CARDS: 4 Core Indicators with Subtle Glass */}
      <div className="grid-cols-4">
        {/* Attendance Percentage */}
        <StatsCard
          icon={UserCheck}
          color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
          label="Attendance Percentage"
          value={`${attendance.overallPercentage}%`}
          subvalue={`${attendance.totalClassesAttended}/${attendance.totalClassesConducted} Classes Attended`}
          trend={attendance.overallPercentage >= 75 ? 'Above 75% VTU Cutoff' : 'Attendance Shortage Warning'}
          onClick={() => navigate('/student/attendance')}
        />

        {/* Upcoming Assignments */}
        <StatsCard
          icon={FileText}
          color={pendingAssignments.length > 0 ? 'warning' : 'success'}
          label="Upcoming Assignments"
          value={`${pendingAssignments.length} Due`}
          subvalue="Next: Lab submission in 3 days"
          trend="Active Submissions"
          onClick={() => navigate('/student/assignments')}
        />

        {/* Examination Results / CGPA */}
        <StatsCard
          icon={Award}
          color="gold"
          label="Examination Results"
          value={`${examinations.cumulativeStats.cgpa} CGPA`}
          subvalue="Current SGPA: 8.85 • Top 5%"
          trend="CIE Average: 44/50"
          onClick={() => navigate('/student/results')}
        />

        {/* Fee Status */}
        <StatsCard
          icon={CreditCard}
          color={fees.outstandingFee > 0 ? 'danger' : 'success'}
          label="Fee Payment Status"
          value={fees.outstandingFee === 0 ? 'Dues Cleared' : `₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue={`Paid: ₹ ${fees.paidFee.toLocaleString('en-IN')}`}
          trend={fees.outstandingFee === 0 ? 'All Even Sem Fees Paid' : 'Due: 30-Nov-2024'}
          onClick={() => navigate('/student/fees')}
        />
      </div>

      {/* 3. MAIN CONTENT: Split Grid Layout */}
      <div className="dashboard-split-grid">
        {/* Left Column (1.3fr): Timetable, Subject Attendance, Academic Performance Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* A. Today's Timetable */}
          <Card
            title="Today's Timetable (Monday)"
            subtitle="Department of CSE | Class Section 6-B"
            icon={Clock}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/student/timetable')}
              >
                Full Schedule
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
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)',
                    borderLeft: item.type === 'Lab' ? '3.5px solid var(--accent-blue)' : '3.5px solid var(--accent-teal)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        padding: '0.25rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        textAlign: 'center',
                        minWidth: '50px'
                      }}
                    >
                      P-{item.period}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {item.subject}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {item.faculty} • Room: <strong style={{ color: '#F1F5F9' }}>{item.room}</strong>
                      </div>
                    </div>
                  </div>

                  <Badge variant={item.type === 'Lab' ? 'navy' : 'teal'}>
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* B. Subject Attendance Overview */}
          <Card
            title="Subject Attendance Overview"
            subtitle="Real-time compliance tracking against VTU 75% cutoff"
            icon={UserCheck}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/student/attendance')}
              >
                Attendance Portal
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {attendance.subjects.map((sub) => {
                const isSafe = sub.percentage >= 75;
                return (
                  <div key={sub.code}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="mono-font" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
                          {sub.code}
                        </span>
                        <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {sub.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {sub.attended}/{sub.conducted} Classes
                        </span>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            color: isSafe ? 'var(--accent-teal)' : 'var(--status-danger)'
                          }}
                        >
                          {sub.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Subtle Glass Progress Track */}
                    <div
                      style={{
                        height: '7px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${sub.percentage}%`,
                          backgroundColor: isSafe ? 'var(--accent-teal)' : 'var(--status-danger)',
                          borderRadius: 'var(--radius-full)',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* C. Academic Performance Chart (Recharts Subtle Glass Curve) */}
          <Card
            title="Academic Performance Progression"
            subtitle="Semester-by-semester SGPA & CGPA trajectory"
            icon={TrendingUp}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/student/results')}
              >
                Detailed Marks
              </Button>
            }
          >
            <div style={{ width: '100%', height: '220px', marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#36C6B0" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#36C6B0" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                  <XAxis
                    dataKey="name"
                    stroke="#718096"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[7.5, 10]}
                    stroke="#718096"
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101B2C',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#F1F5F9',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#36C6B0"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#tealGradient)"
                    name="Semester SGPA"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column (1fr): Upcoming Assignments, Recent Notices, Recent Activities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* D. Upcoming Assignments */}
          <Card
            title="Upcoming Course Assignments"
            subtitle="Submit lab problem sets and mini projects"
            icon={FileText}
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/student/assignments')}
              >
                Submit All
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
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="mono-font" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {asg.subjectCode}
                    </span>
                    <Badge variant="warning">Due Soon</Badge>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.3rem', color: '#F1F5F9' }}>
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
                    <span>Max Marks: <strong>{asg.maxMarks}</strong></span>
                    <span>Cutoff: <strong>{new Date(asg.deadline).toLocaleDateString()}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* E. Recent Notices & Circulars */}
          <Card
            title="Recent Notices & Circulars"
            subtitle="Official administrative announcements"
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
                    backgroundColor: notif.isUrgent ? 'var(--status-danger-bg)' : 'rgba(255, 255, 255, 0.03)',
                    border: notif.isUrgent ? '1px solid var(--status-danger-border)' : '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: notif.isUrgent ? 'var(--status-danger)' : 'var(--accent-teal)'
                      }}
                    >
                      {notif.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.date}</span>
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.84rem',
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
                      marginTop: '0.25rem',
                      lineHeight: 1.35
                    }}
                  >
                    {notif.description}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* F. Recent Activities Log */}
          <Card
            title="Recent Activity Log"
            subtitle="System events & institutional transactions"
            icon={Activity}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Icon size={16} color={act.color} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {act.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                        {act.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
