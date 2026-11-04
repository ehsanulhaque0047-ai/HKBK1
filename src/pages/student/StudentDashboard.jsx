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
  Download,
  Smartphone,
  Eye,
  Sliders
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { usePackage, PACKAGES } from '../../context/PackageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

// 3D Visual Experience Components
import { Card3D } from '../../components/3d/Card3D';
import { AttendanceRing3D } from '../../components/3d/AttendanceRing3D';
import { Analytics3D } from '../../components/3d/Analytics3D';
import { CampusCanvas3D } from '../../components/3d/CampusCanvas3D';
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

  const { packageTier, setPackageTier, currentPackage, setIsComparisonModalOpen } = usePackage();
  const navigate = useNavigate();

  // Pending assignments count
  const pendingAssignments = assignments.filter((a) => a.status === 'Pending');

  // Today's classes from timetable (Monday by default in demo)
  const todayClasses = timetable.schedule.Monday || [];

  const tiltAmount = packageTier === 'basic' ? 0 : packageTier === 'advanced' ? 7 : 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 0. Package Demonstration Live Switcher Banner */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold)',
              boxShadow: '0 0 8px var(--accent-gold)'
            }}
          />
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Active Demonstration Experience:{' '}
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--accent-gold)'
              }}
            >
              {currentPackage.name} ({currentPackage.price})
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
              • {currentPackage.tagline}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setPackageTier(pkg.id)}
              style={{
                padding: '0.35rem 0.7rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: packageTier === pkg.id ? 'var(--primary-navy)' : 'var(--bg-subtle)',
                color: packageTier === pkg.id ? '#FFFFFF' : 'var(--text-secondary)',
                border: packageTier === pkg.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {pkg.id === 'basic' ? 'Basic (₹2L)' : pkg.id === 'advanced' ? 'Advanced (₹3.5L)' : 'Complete (₹4.5L)'}
            </button>
          ))}
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              color: 'var(--accent-blue)',
              border: '1px dashed var(--accent-blue)',
              cursor: 'pointer'
            }}
          >
            <Sliders size={12} />
            <span>Compare Matrix ▾</span>
          </button>
        </div>
      </div>

      {/* 1. Student Identity Header Banner */}
      <Card3D tiltIntensity={tiltAmount > 0 ? 4 : 0}>
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
                  letterSpacing: '0.02em',
                  margin: 0
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
      </Card3D>

      {/* Flagship Feature: Real-time Three.js WebGL Campus Digital Spire (Included in Complete Digital Campus) */}
      {packageTier === 'complete' && (
        <CampusCanvas3D onNavigateModule={(route) => navigate(route)} />
      )}

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
      {packageTier !== 'basic' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 340px) 1fr',
            gap: '1.5rem',
            alignItems: 'stretch'
          }}
        >
          {/* 3D Radial Attendance Gauge */}
          <AttendanceRing3D
            percentage={attendance.overallPercentage}
            attended={attendance.totalClassesAttended}
            conducted={attendance.totalClassesConducted}
            onViewDetails={() => navigate('/student/attendance')}
          />

          {/* 3D CIE Academic Mark Visualizer */}
          <Analytics3D
            subjects={attendance.subjects}
            onSelectSubject={(sub) => console.log('Selected:', sub)}
          />
        </div>
      ) : (
        /* Subtle upgrade indicator when on Basic tier */
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Basic Campus Portal (₹2,00,000) Active
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                3D Interactive Attendance Depth Gauge and Continuous CIE Analytics are enabled in Advanced (₹3.5L) & Complete (₹4.5L) tiers.
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPackageTier('advanced')}
            style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
          >
            Preview 3D Analytics (Advanced)
          </Button>
        </div>
      )}

      {/* 4. Complete Digital Campus Flagship: Native Android & iOS Applications 3D Showcase */}
      {packageTier === 'complete' ? (
        <MobileAppShowcase3D studentData={studentProfile} />
      ) : (
        /* Package comparison teaser for mobile apps */
        <div
          style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.1rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)'
              }}
            >
              <Smartphone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Turnkey Native Android & iOS Mobile Applications Included in Complete Digital Campus (₹4,50,000)
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Includes React Native codebase, Google Play Store / Apple App Store submission, Digital RFID Student ID & Geofenced QR attendance scanner.
              </div>
            </div>
          </div>

          <Button
            variant="gold"
            size="sm"
            icon={Eye}
            onClick={() => setPackageTier('complete')}
            style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}
          >
            Preview Complete Package (₹4.5L)
          </Button>
        </div>
      )}

      {/* 5. Main Dashboard Two-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '1.5rem' }}>
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
