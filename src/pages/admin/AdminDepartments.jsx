import React from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const AdminDepartments = () => {
  const { departments } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Academic Departments & AICTE Sanctioned Intake</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Undergraduate Engineering Programs (B.E.) affiliated to Visvesvaraya Technological University.
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid-cols-2">
        {departments.map((dept) => (
          <Card key={dept.id} accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mono-font" style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-blue)' }}>
                      {dept.code}
                    </span>
                    <Badge variant="gold">B.E. Program</Badge>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.25rem' }}>
                    {dept.name}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {dept.studentCount}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enrolled Students</div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-muted)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.82rem'
                }}
                className="dept-meta-grid"
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Head of Department (HOD)
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>{dept.hod}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Faculty Ratio
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>{dept.facultyCount} Teachers</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Sanctioned Intake
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '0.2rem', color: 'var(--status-success)' }}>
                    {dept.intake} / Year
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                <span>NBA Accredited</span>
                <span>•</span>
                <span>VTU Research Center Approved</span>
                <span>•</span>
                <span>AICTE Compliant</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

