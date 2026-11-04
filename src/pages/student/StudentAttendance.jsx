import React, { useState } from 'react';
import {
  UserCheck,
  AlertTriangle,
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp,
  Info,
  Clock,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';
import { Modal } from '../../components/common/Modal';
import { usePackage } from '../../context/PackageContext';
import { AttendanceRing3D } from '../../components/3d/AttendanceRing3D';
import { Card3D } from '../../components/3d/Card3D';

export const StudentAttendance = () => {
  const { attendance } = useData();
  const { packageTier } = usePackage();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filterType, setFilterType] = useState('All'); // All, Good, Borderline

  const filteredSubjects = attendance.subjects.filter((sub) => {
    if (filterType === 'Borderline') return sub.percentage <= 75;
    if (filterType === 'Good') return sub.percentage > 75;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Header Banner & Shortage Warning */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Attendance Portfolio</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            VTU Belagavi Mandated Minimum: <strong>75.0%</strong> per course for Hall Ticket issuance.
          </p>
        </div>

        {attendance.overallPercentage < 75 ? (
          <Badge variant="danger" icon={AlertTriangle} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            CRITICAL ATTENDANCE SHORTAGE
          </Badge>
        ) : (
          <Badge variant="success" icon={CheckCircle} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            REGULAR STATUS (75%+ COMPLIANT)
          </Badge>
        )}
      </div>

      {/* 2. Key Stats Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={UserCheck}
          label="Cumulative Attendance"
          value={`${attendance.overallPercentage}%`}
          subvalue="Target: 85%+"
          color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
        />
        <StatsCard
          icon={CheckCircle}
          label="Lectures Attended"
          value={attendance.totalClassesAttended}
          subvalue="Valid physical attendances"
          color="navy"
        />
        <StatsCard
          icon={Clock}
          label="Total Classes Held"
          value={attendance.totalClassesConducted}
          subvalue="Odd & Even term lectures"
          color="gold"
        />
        <StatsCard
          icon={AlertTriangle}
          label="Shortage Warning"
          value={attendance.subjects.filter((s) => s.percentage <= 75).length}
          subvalue="Course(s) near/below 75%"
          color="warning"
        />
      </div>

      {/* 3. 3D Radial Depth Gauge (Advanced & Complete Packages) */}
      {packageTier !== 'basic' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 360px) 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
          <AttendanceRing3D
            percentage={attendance.overallPercentage}
            attended={attendance.totalClassesAttended}
            conducted={attendance.totalClassesConducted}
          />
          <Card title="VTU Attendance Regulations & Compliance Status" icon={Info} accent>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '0.85rem', background: 'var(--status-warning-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--status-warning-border)' }}>
                <div style={{ fontWeight: 700, color: 'var(--status-warning)' }}>Notice: 75% Mandatory VTU Rule</div>
                <p style={{ marginTop: '0.25rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                  VTU Academic Regulations Clause 18OB4.1 strictly prohibits students with &lt; 75% aggregate attendance from appearing in Semester End Examinations and issuance of Hall Tickets.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <strong>Medical Condonation:</strong> Max 10% condonation (65% to 75%) permitted on principal-endorsed medical proof.
                </div>
                <div>
                  <strong>Proctorial Support:</strong> Regular monitoring by department mentor Prof. Dr. A. K. Manjunath.
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 4. Monthly Attendance Trend Chart & Threshold Alert */}
      <div style={{ display: 'grid', gridTemplateColumns: packageTier !== 'basic' ? '1fr' : '1.6fr 1fr', gap: '1.5rem' }}>
        <Card
          title="Monthly Attendance Trend (%)"
          subtitle="Attendance percentage progression across months"
          icon={TrendingUp}
        >
          <div style={{ width: '100%', height: '240px', marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendance.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis domain={[50, 100]} stroke="var(--text-muted)" fontSize={12} unit="%" />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Attendance']}
                  contentStyle={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-light)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="percentage" fill="#0B1E36" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {packageTier === 'basic' && (
          <Card title="VTU Attendance Regulations" icon={Info} accent>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--status-warning-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--status-warning-border)' }}>
                <div style={{ fontWeight: 700, color: 'var(--status-warning)' }}>Notice: 75% Mandatory Rule</div>
                <p style={{ marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                  VTU Academic Regulations Clause 18OB4.1 strictly prohibits students with &lt; 75% attendance from appearing in Semester End Examinations.
                </p>
              </div>
              <div>
                <strong>Medical Condonation:</strong> Maximum 10% condonation (65% to 75%) is permitted only upon submission of verified medical certificates endorsed by Principal within 3 days.
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* 4. Subject-wise Attendance Table */}
      <Card
        title="Subject-wise Attendance Register"
        subtitle="Detailed register of lectures conducted, attended, and percentage by subject"
        icon={UserCheck}
        action={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant={filterType === 'All' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterType('All')}
            >
              All Subjects
            </Button>
            <Button
              variant={filterType === 'Good' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterType('Good')}
            >
              Safe (&gt;75%)
            </Button>
            <Button
              variant={filterType === 'Borderline' ? 'danger' : 'outline'}
              size="sm"
              onClick={() => setFilterType('Borderline')}
            >
              Borderline (≤75%)
            </Button>
          </div>
        }
      >
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course Name</th>
                <th>Course Instructor</th>
                <th>Held</th>
                <th>Attended</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map((sub) => {
                const isBorderline = sub.percentage <= 75;
                return (
                  <tr key={sub.subjectCode}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {sub.subjectCode}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{sub.subjectName}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{sub.faculty}</td>
                    <td style={{ fontWeight: 600 }}>{sub.total}</td>
                    <td style={{ fontWeight: 600 }}>{sub.attended}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                          style={{
                            width: '60px',
                            height: '6px',
                            borderRadius: '3px',
                            background: 'var(--bg-subtle)',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.min(sub.percentage, 100)}%`,
                              height: '100%',
                              backgroundColor: isBorderline ? '#B91C1C' : '#15803D'
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            color: isBorderline ? 'var(--status-danger)' : 'var(--text-primary)'
                          }}
                        >
                          {sub.percentage}%
                        </span>
                      </div>
                    </td>
                    <td>
                      {isBorderline ? (
                        <Badge variant="warning" icon={AlertTriangle}>
                          Borderline
                        </Badge>
                      ) : (
                        <Badge variant="success" icon={CheckCircle}>
                          Good
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="subtle"
                        size="sm"
                        onClick={() => setSelectedSubject(sub)}
                      >
                        Log History
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Subject Attendance Detail Modal */}
      {selectedSubject && (
        <Modal
          isOpen={!!selectedSubject}
          onClose={() => setSelectedSubject(null)}
          title={`Attendance History: ${selectedSubject.subjectName}`}
          subtitle={`Subject Code: ${selectedSubject.subjectCode} | Faculty: ${selectedSubject.faculty}`}
          maxWidth="640px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Attended <strong>{selectedSubject.attended}</strong> of <strong>{selectedSubject.total}</strong> ({selectedSubject.percentage}%)
              </div>
              <Button variant="primary" size="sm" onClick={() => setSelectedSubject(null)}>
                Close Window
              </Button>
            </div>
          }
        >
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Recent Class Sessions
            </h4>
            <div className="simp-table-container">
              <table className="simp-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Topic Covered</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubject.history?.map((rec, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>{rec.date}</td>
                      <td style={{ fontSize: '0.82rem' }}>{rec.topic}</td>
                      <td>
                        {rec.status === 'Present' ? (
                          <Badge variant="success" icon={CheckCircle}>
                            Present
                          </Badge>
                        ) : (
                          <Badge variant="danger" icon={XCircle}>
                            Absent
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

