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
          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'}
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

          <p style={{ fontSize: '0.88rem', color: '#DFBF77', marginTop: '0.2rem' }}>
            Dean Academics & SIMP System Controller – Office of the Registrar
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.6rem', fontSize: '0.8rem', color: '#CBD5E1', flexWrap: 'wrap' }}>
            <span>Office: <strong>Principal Secretariat, Main Block, 1st Flr</strong></span>
            <span>Affiliation: <strong>VTU Belagavi Center Code 1HK</strong></span>
            <span>System Access: <strong>Full Super-Administrator Privileges</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
          icon={CreditCard}
          label="Pending Fee Collection"
          value={`₹ ${(fees.outstandingFee * 42).toLocaleString('en-IN')}`}
          subvalue="Even Semester Target"
          color="warning"
          onClick={() => navigate('/admin/fees')}
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        {/* Department Overview */}
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
                  <th>Head of Dept (HOD)</th>
                  <th>Faculty</th>
                  <th>Students</th>
                  <th>Annual Intake</th>
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
