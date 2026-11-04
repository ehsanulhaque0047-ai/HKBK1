import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  GraduationCap,
  Users,
  Building2,
  CreditCard,
  FileCheck,
  AlertTriangle,
  Bell,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Calendar,
  Activity,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const {
    departments,
    documentRequests,
    complaints,
    announcements
  } = useData();

  const navigate = useNavigate();

  const totalStudentsCount = 2840;
  const totalFacultyCount = 142;
  const pendingRequestsCount = documentRequests.filter((d) => !d.downloadReady).length;
  const openComplaintsCount = complaints.filter((c) => c.status !== 'Resolved').length;

  const recentSystemActivities = [
    {
      id: 1,
      title: 'Academic Year 2024–25 Even Semester Rollout',
      category: 'Curriculum',
      time: 'Today, 09:00 AM',
      status: 'Active'
    },
    {
      id: 2,
      title: 'VTU Examination Center Hall Allocation Finalized',
      category: 'Examinations',
      time: 'Yesterday, 03:30 PM',
      status: 'Verified'
    },
    {
      id: 3,
      title: 'Faculty Bio-metric Attendance Synced (142 Faculty)',
      category: 'Attendance',
      time: '02 Nov 2024',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Audit Report Generated for AICTE Inspection',
      category: 'Compliance',
      time: '31 Oct 2024',
      status: 'Archived'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Admin Command Center Header Banner in Subtle Glass */}
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
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'}
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
                {currentUser?.name || 'Prof. Syed Mustafa'}
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
                {currentUser?.employeeId || 'HKBK-ADM-003'}
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--accent-teal-light)', marginTop: '0.2rem', marginBottom: 0, fontWeight: 600 }}>
              Dean Academics & SIMP System Controller – Office of the Registrar
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.8rem', color: '#A5B4C7', flexWrap: 'wrap' }}>
              <span>Office: <strong style={{ color: '#F1F5F9' }}>Principal Secretariat, Main Block, 1st Flr</strong></span>
              <span>Affiliation: <strong style={{ color: '#F1F5F9' }}>VTU Center Code 1HK</strong></span>
              <span>System: <strong style={{ color: '#F1F5F9' }}>Full Administrator Privileges</strong></span>
            </div>
          </div>
        </div>

        <div className="portal-hero-actions">
          <Button
            variant="teal"
            size="sm"
            icon={FileCheck}
            onClick={() => navigate('/admin/documents')}
          >
            Review Certificates ({pendingRequestsCount})
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Bell}
            onClick={() => navigate('/admin/notices')}
          >
            Broadcast Circular
          </Button>
        </div>
      </div>

      {/* 2. Institutional Macro Stats */}
      <div className="grid-cols-4">
        <StatsCard
          icon={GraduationCap}
          label="Total Students"
          value={totalStudentsCount.toLocaleString('en-IN')}
          subvalue="Across 8 Engineering Branches"
          color="navy"
          onClick={() => navigate('/admin/students')}
        />
        <StatsCard
          icon={Users}
          label="Faculty Overview"
          value={`${totalFacultyCount} Members`}
          subvalue="Professors & Assistant Profs"
          color="gold"
          onClick={() => navigate('/admin/faculty')}
        />
        <StatsCard
          icon={Building2}
          label="Department Overview"
          value={`${departments.length} Depts`}
          subvalue="CSE, ISE, ECE, AI&DS, ME, CV"
          color="gold"
          onClick={() => navigate('/admin/departments')}
        />
        <StatsCard
          icon={AlertTriangle}
          label="Grievance Tickets"
          value={`${openComplaintsCount} Active`}
          subvalue="Campus & Academic Redressal"
          color={openComplaintsCount > 0 ? 'warning' : 'success'}
          onClick={() => navigate('/admin/complaints')}
        />
      </div>

      {/* 3. Departmental Intake Matrix & System Administration */}
      <div className="dashboard-split-grid">
        {/* Left Column: Department Overview & Fee Balances */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Department Overview Table */}
          <Card
            title="Department Overview & Sanctioned Intake"
            subtitle="AICTE approved intake and active student enrolment"
            icon={Building2}
            accent
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/admin/departments')}
              >
                All Departments
              </Button>
            }
          >
            <div className="simp-table-container">
              <table className="simp-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Department</th>
                    <th>Head of Dept (HOD)</th>
                    <th>Faculty</th>
                    <th>Students</th>
                    <th>Sanctioned</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>
                        <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>
                          {dept.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{dept.name}</td>
                      <td style={{ fontSize: '0.82rem', color: '#A5B4C7' }}>{dept.hod}</td>
                      <td style={{ fontWeight: 600 }}>{dept.facultyCount}</td>
                      <td style={{ fontWeight: 700 }}>{dept.studentCount}</td>
                      <td>
                        <Badge variant="teal">{dept.intake} Seats</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Institutional Fee Overview */}
          <Card
            title="Institutional Fee Overview & Collections"
            subtitle="Semester academic & infrastructure fee summary"
            icon={CreditCard}
            action={
              <Button
                variant="outline"
                size="sm"
                iconRight={ChevronRight}
                onClick={() => navigate('/admin/fees')}
              >
                Fee Ledger
              </Button>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Invoiced</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F1F5F9', marginTop: '0.2rem' }}>₹ 2.22 Cr</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AY 2024–25 Term</div>
              </div>
              <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--status-success-bg)', border: '1px solid var(--status-success-border)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--status-success)', textTransform: 'uppercase', fontWeight: 700 }}>Collected</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--status-success)', marginTop: '0.2rem' }}>₹ 1.85 Cr</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--status-success)' }}>83.3% Realized</div>
              </div>
              <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--status-warning-bg)', border: '1px solid var(--status-warning-border)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--status-warning)', textTransform: 'uppercase', fontWeight: 700 }}>Pending Dues</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--status-warning)', marginTop: '0.2rem' }}>₹ 37.0 Lakh</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--status-warning)' }}>Cutoff: 30-Nov-2024</div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Automated reminders sent to 142 students with balances over ₹10,000. Examination hall tickets automatically gated for clearance.
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Activities & Compliance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Recent System Activities */}
          <Card title="Recent System Activities" subtitle="Administrative audit trail & operations" icon={Activity}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentSystemActivities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase' }}>
                      {act.category}
                    </span>
                    <Badge variant="success">{act.status}</Badge>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', marginTop: '0.25rem', color: '#F1F5F9' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {act.time}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Academic Year & Regulatory Status */}
          <Card title="Academic Year & Accreditation" icon={Shield}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border-light)' }}>
                <span>Academic Year & Term:</span>
                <strong style={{ color: 'var(--accent-teal)' }}>2024–25 (Even Semester)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border-light)' }}>
                <span>VTU Center Affiliation:</span>
                <strong style={{ color: 'var(--status-success)' }}>Active (Code: 1HK)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border-light)' }}>
                <span>AICTE Approval Extension:</span>
                <strong style={{ color: 'var(--status-success)' }}>Current Term Valid</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>NAAC Accreditation:</span>
                <strong style={{ color: 'var(--accent-teal-light)' }}>Grade A Verified</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
