import React from 'react';
import {
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const ParentAttendance = () => {
  const { attendance, studentProfile } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Ward Attendance Portfolio</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Student: <strong>{studentProfile.name}</strong> (USN: {studentProfile.usn}) | VTU 75% Attendance Requirement
        </p>
      </div>

      {/* Stats */}
      <div className="grid-cols-3">
        <StatsCard
          icon={UserCheck}
          label="Cumulative Attendance"
          value={`${attendance.overallPercentage}%`}
          subvalue="Safe & Compliant (>75%)"
          color={attendance.overallPercentage >= 75 ? 'success' : 'danger'}
        />
        <StatsCard
          icon={CheckCircle2}
          label="Total Classes Attended"
          value={attendance.totalClassesAttended}
          subvalue={`Out of ${attendance.totalClassesConducted} conducted`}
          color="navy"
        />
        <StatsCard
          icon={AlertTriangle}
          label="Borderline Alert"
          value={attendance.subjects.filter((s) => s.percentage <= 75).length}
          subvalue="Course(s) near 75% threshold"
          color="warning"
        />
      </div>

      {/* Subject-wise Register Table */}
      <Card title="Course-wise Attendance Register" icon={UserCheck} accent>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Subject Name</th>
                <th>Course Instructor</th>
                <th>Total Held</th>
                <th>Attended</th>
                <th>Percentage</th>
                <th>VTU Standing</th>
              </tr>
            </thead>
            <tbody>
              {attendance.subjects.map((sub) => {
                const isBorderline = sub.percentage <= 75;
                return (
                  <tr key={sub.subjectCode}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {sub.subjectCode}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{sub.subjectName}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{sub.faculty}</td>
                    <td style={{ fontWeight: 600 }}>{sub.total}</td>
                    <td style={{ fontWeight: 600 }}>{sub.attended}</td>
                    <td>
                      <span
                        style={{
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          color: isBorderline ? 'var(--status-danger)' : 'var(--status-success)'
                        }}
                      >
                        {sub.percentage}%
                      </span>
                    </td>
                    <td>
                      {isBorderline ? (
                        <Badge variant="warning" icon={AlertTriangle}>
                          Warning (≤75%)
                        </Badge>
                      ) : (
                        <Badge variant="success">Eligible</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

