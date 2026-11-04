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
  Sparkles
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
    studentsRoster,
    fees,
    documentRequests,
    complaints,
    announcements
  } = useData();

  const navigate = useNavigate();

  const totalStudentsCount = departments.reduce((sum, d) => sum + d.studentCount, 0);
  const totalFacultyCount = departments.reduce((sum, d) => sum + d.facultyCount, 0);
  const pendingRequestsCount = documentRequests.filter((d) => !d.downloadReady).length;
  const openComplaintsCount = complaints.filter((c) => c.status !== 'Resolved').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Admin Command Center Header */}
      <div className="portal-hero-banner">
        <div className="portal-hero-main">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'}
            alt={currentUser?.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'cover',
              border: '3px solid var(--accent-gold)',
              flexShrink: 0
            }}
          />

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                {currentUser?.name || 'Prof. Syed Mustafa'}
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
                {currentUser?.employeeId || 'HKBK-ADM-003'}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#DFBF77', marginTop: '0.2rem', marginBottom: 0 }}>
              Dean Academics & SIMP System Controller – Office of the Registrar
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.6rem', fontSize: '0.8rem', color: '#CBD5E1', flexWrap: 'wrap' }}>
              <span>Office: <strong>Principal Secretariat, Main Block, 1st Flr</strong></span>
              <span>Affiliation: <strong>VTU Belagavi Center Code 1HK</strong></span>
              <span>System Access: <strong>Full Super-Administrator Privileges</strong></span>
            </div>
          </div>
        </div>

        <div className="portal-hero-actions">
          <Button
            variant="gold"
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
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Broadcast Notice
          </Button>
        </div>
      </div>

      {/* 2. Institutional Macro Stats */}
      <div className="grid-cols-4">
        <StatsCard
          icon={GraduationCap}
          label="Total Enrolled Students"
          value={totalStudentsCount.toLocaleString('en-IN')}
          subvalue="Across 6 B.E. Departments"
          color="navy"
          onClick={() => navigate('/admin/students')}
        />
        <StatsCard
          icon={Users}
          label="Teaching Faculty"
          value={totalFacultyCount}
          subvalue="Full-time Professors & PhDs"
          color="gold"
          onClick={() => navigate('/admin/faculty')}
        />
        <StatsCard
          icon={Building2}
          label="Academic Departments"
          value={`${departments.length} Branches`}
          subvalue="CSE, ISE, ECE, AI&ML, ME, CV"
          color="gold"
          onClick={() => navigate('/admin/departments')}
        />
        <StatsCard
          icon={AlertTriangle}
          label="Pending Redressals"
          value={`${openComplaintsCount} Active`}
          subvalue="Student & Campus Tickets"
          color={openComplaintsCount > 0 ? 'danger' : 'success'}
          onClick={() => navigate('/admin/complaints')}
        />
      </div>

      {/* 3. Departmental Intake Matrix & Recent Approvals */}
      <div className="dashboard-split-grid">
        {/* Left Column: Department Overview & Fee Balances */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card
            title="Departmental Enrolment & Sanctioned Intake"
            subtitle="AICTE approved intake and active student strength"
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
                    <th>Department Name</th>
                    <th>HOD</th>
                    <th>Faculty</th>
                    <th>Students</th>
                    <th>Intake</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>
                        <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                          {dept.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{dept.name}</td>
                      <td style={{ fontSize: '0.82rem' }}>{dept.hod}</td>
                      <td style={{ fontWeight: 600 }}>{dept.facultyCount}</td>
                      <td style={{ fontWeight: 700 }}>{dept.studentCount}</td>
                      <td>
                        <Badge variant="gold">{dept.intake} Seats</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Institutional Fee Collection Overview */}
          <Card
            title="Institutional Fee Standing & Balances"
            subtitle="Semester academic & development fee summary"
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
              <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-muted)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Invoiced</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>₹ 2.22 Cr</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AY 2024–25 Term</div>
              </div>
              <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--status-success-bg)', border: '1px solid var(--status-success-border)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--status-success)', textTransform: 'uppercase', fontWeight: 700 }}>Collected</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--status-success)', marginTop: '0.2rem' }}>₹ 1.85 Cr</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--status-success)' }}>83.3% Realized</div>
              </div>
              <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--status-warning-bg)', border: '1px solid var(--status-warning-border)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--status-warning)', textTransform: 'uppercase', fontWeight: 700 }}>Pending Dues</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--status-warning)', marginTop: '0.2rem' }}>₹ 37.0 Lakh</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--status-warning)' }}>Due: 30-Nov-2024</div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Fee notifications sent to 142 students with balances over ₹10,000. Examination hall tickets automatically locked for accounts with pending clearance.
            </div>
          </Card>
        </div>

        {/* Right Column: Pending Approvals & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Certificate Requests Waiting Approval */}
          <Card
            title="Pending Document Approvals"
            icon={FileCheck}
            action={
              <Button
                variant="subtle"
                size="sm"
                onClick={() => navigate('/admin/documents')}
              >
                Manage
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documentRequests.map((req) => (
                <div
                  key={req.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono-font" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {req.id}
                    </span>
                    <Badge variant={req.downloadReady ? 'success' : 'warning'}>
                      {req.status}
                    </Badge>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {req.docType}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Student: {req.studentName} ({req.studentUsn})
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Institutional Compliance & Audit Status */}
          <Card title="Institutional Regulatory Compliance" icon={Shield}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>VTU Permanent Affiliation:</span>
                <strong style={{ color: 'var(--status-success)' }}>Active (Code: 1HK)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>AICTE Approval:</span>
                <strong style={{ color: 'var(--status-success)' }}>Extended for 2024–25</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>NAAC Accreditation:</span>
                <strong style={{ color: 'var(--text-gold)' }}>Grade A Verified</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>NIRF Data Submission:</span>
                <strong style={{ color: 'var(--status-success)' }}>Completed</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

