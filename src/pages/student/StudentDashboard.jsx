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
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  Download
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { usePackage } from '../../context/PackageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

// 3D Visual Experience Components
import { Card3D } from '../../components/3d/Card3D';
import { AttendanceRing3D } from '../../components/3d/AttendanceRing3D';
import { Analytics3D } from '../../components/3d/Analytics3D';
import { MobileAppShowcase3D } from '../../components/3d/MobileAppShowcase3D';

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

  const { packageTier } = usePackage();
  const navigate = useNavigate();

  // Pending assignments count
  const pendingAssignments = assignments.filter((a) => a.status === 'Pending');

  // Today's classes from timetable (Monday by default in demo)
  const todayClasses = timetable.schedule.Monday || [];

  const tiltAmount = packageTier === 'basic' ? 0 : packageTier === 'advanced' ? 7 : 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Student Identity Header Banner (Desktop: 2-column, Mobile: Clean vertical stack) */}
      <Card3D tiltIntensity={tiltAmount > 0 ? 3 : 0}>
        <div className="student-profile-hero">
          {/* Subtle decorative gold seal background */}
          <img
            src="/hkbk-crest.svg"
            alt=""
            className="student-profile-hero-bg-crest"
          />

          <div className="student-profile-desktop-grid">
            {/* Desktop Left Column / Mobile Items 1, 2, 3: Photo + Identity Details */}
            <div className="student-profile-left-col">
              <div className="student-avatar-container">
                <img
                  src={studentProfile.avatar}
                  alt={studentProfile.name}
                  className="student-avatar-img"
                />
                <span className="student-status-badge">
                  ACTIVE
                </span>
              </div>

              <div className="student-identity-text">
                <h1 className="student-name-title">
                  {studentProfile.name}
                </h1>
                <span className="student-usn-chip">
                  USN: {studentProfile.usn}
                </span>
                <div style={{ fontSize: '0.82rem', color: '#DFBF77', fontWeight: 600 }}>
                  {studentProfile.course} – Section {studentProfile.section}
                </div>
              </div>
            </div>

            {/* Desktop Right Column / Mobile Items 4, 5, 6: Academic Info + Action Buttons */}
            <div className="student-profile-right-col">
              {/* Academic Info Grid (Dept, Sem, Year, Mentor, Quota, Bus) */}
              <div className="student-academic-meta-grid">
                <div className="student-meta-item">
                  <GraduationCap size={15} color="var(--accent-gold)" />
                  <span>
                    <span className="student-meta-label">Dept: </span>
                    <strong>{studentProfile.department}</strong>
                  </span>
                </div>
                <div className="student-meta-item">
                  <BookOpen size={15} color="var(--accent-gold)" />
                  <span>
                    <span className="student-meta-label">Term: </span>
                    <strong>{studentProfile.semester}th Sem (AY 2024–25)</strong>
                  </span>
                </div>
                <div className="student-meta-item">
                  <UserCheck size={15} color="var(--accent-gold)" />
                  <span>
                    <span className="student-meta-label">Mentor: </span>
                    <strong>{studentProfile.mentor?.name}</strong>
                  </span>
                </div>
                <div className="student-meta-item">
                  <MapPin size={15} color="var(--accent-gold)" />
                  <span>
                    <span className="student-meta-label">Quota / Bus: </span>
                    <strong>{studentProfile.quota} • {studentProfile.transport?.routeNo || 'Route 14'}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons: Stacked on mobile, side-by-side on desktop */}
              <div className="student-profile-actions">
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
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.25)' }}
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card3D>

      {/* 2. Key Academic Metric Cards (Wrapped in 3D Parallax Tilt) */}
      <div className="grid-cols-4">
        {/* Attendance Percentage */}
        <Card3D tiltIntensity={tiltAmount}>
          <StatsCard
            icon={UserCheck}
            color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
            label="Overall Attendance"
            value={`${attendance.overallPercentage}%`}
            subvalue={`${attendance.totalClassesAttended} of ${attendance.totalClassesConducted} Classes`}
            trend={attendance.overallPercentage >= 75 ? '✓ VTU Compliant' : '⚠ Shortage Alert'}
            onClick={() => navigate('/student/attendance')}
          />
        </Card3D>

        {/* CGPA & Academic Standing */}
        <Card3D tiltIntensity={tiltAmount}>
          <StatsCard
            icon={Award}
            color="gold"
            label="Cumulative CGPA"
            value={examinations.cumulativeStats.cgpa}
            subvalue="Current SGPA: 8.85"
            trend="Top 5% of Department"
            onClick={() => navigate('/student/examination')}
          />
        </Card3D>

        {/* Pending Assignments */}
        <Card3D tiltIntensity={tiltAmount}>
          <StatsCard
            icon={FileText}
            color={pendingAssignments.length > 0 ? 'warning' : 'success'}
            label="Pending Assignments"
            value={`${pendingAssignments.length} Due`}
            subvalue="Next deadline: 12-Nov"
            trend="Active Submissions"
            onClick={() => navigate('/student/assignments')}
          />
        </Card3D>

        {/* Fee Payment Standing */}
        <Card3D tiltIntensity={tiltAmount}>
          <StatsCard
            icon={CreditCard}
            color={fees.outstandingFee > 0 ? 'danger' : 'success'}
            label="Outstanding Fees"
            value={`₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
            subvalue={`Paid: ₹ ${fees.paidFee.toLocaleString('en-IN')}`}
            trend={fees.outstandingFee > 0 ? 'Due: 30-Nov-2024' : 'All Dues Cleared'}
            onClick={() => navigate('/student/fees')}
          />
        </Card3D>
      </div>

      {/* 3. 3D Spatial Intelligence Section: Dynamic 3D Attendance Ring + Continuous CIE Analytics Engine */}
      {packageTier !== 'package1' && packageTier !== 'basic' && (
        <div className="spatial-intelligence-grid">
          {/* 3D Radial Attendance Gauge */}
          <AttendanceRing3D
            percentage={attendance.overallPercentage}
            attended={attendance.totalClassesAttended}
            conducted={attendance.totalClassesConducted}
            onViewDetails={() => navigate('/student/attendance')}
          />

          {/* 3D CIE Academic Mark Visualizer */}
          <Analytics3D
            internalMarks={examinations.internalMarks}
            subjects={attendance.subjects}
            onSelectSubject={() => navigate('/student/examination')}
          />
        </div>
      )}

      {/* 4. Complete Digital Campus Flagship: Native Android & iOS Applications 3D Showcase */}
      {(packageTier === 'package3' || packageTier === 'complete') && (
        <MobileAppShowcase3D studentData={studentProfile} />
      )}

      {/* 5. Main Dashboard Two-Column Grid */}
      <div className="dashboard-split-grid">
        {/* Left Column: Today's Timetable & Upcoming Exams */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Schedule Card */}
          <Card3D tiltIntensity={tiltAmount > 0 ? 3 : 0}>
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
          </Card3D>

          {/* Upcoming Examinations & IA-2 Schedule */}
          <Card3D tiltIntensity={tiltAmount > 0 ? 3 : 0}>
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
          </Card3D>
        </div>

        {/* Right Column: Urgent Alerts, Pending Assignments & Placement Drives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Important Institutional Announcements */}
          <Card3D tiltIntensity={tiltAmount > 0 ? 3 : 0}>
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
          </Card3D>

          {/* Pending Course Assignments */}
          <Card3D tiltIntensity={tiltAmount > 0 ? 3 : 0}>
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
          </Card3D>

          {/* Quick Shortcuts */}
          <Card3D tiltIntensity={tiltAmount > 0 ? 3 : 0}>
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
          </Card3D>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
