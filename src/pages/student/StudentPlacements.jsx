import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  CheckCircle2,
  Calendar,
  Award,
  Send,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const StudentPlacements = () => {
  const { placements, applyForPlacement, studentProfile } = useData();

  const [activeTab, setActiveTab] = useState('placements'); // 'placements' or 'internships'

  const fullTimeDrives = placements.filter((p) => p.id.startsWith('PLC'));
  const internships = placements.filter((p) => p.id.startsWith('INT'));

  const currentList = activeTab === 'placements' ? fullTimeDrives : internships;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Department Training & Placement Cell (T&P)</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          HKBK Placement Division | Top Recruiter Campus Drives, Pre-Placement Talks & Internships
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={Briefcase}
          label="Active Drives"
          value={fullTimeDrives.length}
          subvalue="Eligible for CSE 6th Sem"
          color="navy"
        />
        <StatsCard
          icon={Award}
          label="Highest Package Offered"
          value="₹ 11.20 LPA"
          subvalue="Bosch Global Software"
          color="gold"
        />
        <StatsCard
          icon={Sparkles}
          label="Internship Openings"
          value={internships.length}
          subvalue="Stipend up to ₹ 45k/mo"
          color="success"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Student Eligibility"
          value="100% Eligible"
          subvalue={`CGPA: ${studentProfile.usn ? '8.72' : '8.5+'}`}
          color="success"
        />
      </div>

      {/* Tabs */}
      <div className="simp-tabs">
        <button
          className={`simp-tab-btn ${activeTab === 'placements' ? 'active' : ''}`}
          onClick={() => setActiveTab('placements')}
        >
          Full-Time Campus Placements ({fullTimeDrives.length})
        </button>
        <button
          className={`simp-tab-btn ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          Internships & Stipends ({internships.length})
        </button>
      </div>

      {/* Drives Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {currentList.map((item) => (
          <Card key={item.id} accent={item.hasApplied}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={item.logo}
                    alt={item.company}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-light)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {item.company}
                    </h3>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-blue)', marginTop: '0.15rem' }}>
                      {item.role}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--status-success)' }}>
                    {item.package}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Location: {item.location}
                  </div>
                </div>
              </div>

              {/* Eligibility & Dates Box */}
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-muted)',
                  border: '1px solid var(--border-light)',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.82rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Eligibility Criteria
                  </div>
                  <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{item.eligibility}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Application Cutoff
                  </div>
                  <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{item.deadline}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Drive / Assessment Date
                  </div>
                  <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{item.driveDate}</div>
                </div>
              </div>

              {/* Footer Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                <div>
                  {item.hasApplied ? (
                    <Badge variant="success" icon={CheckCircle2}>
                      {item.applicationStatus}
                    </Badge>
                  ) : (
                    <Badge variant="gold">Open for Registrations</Badge>
                  )}
                </div>

                <div>
                  {item.hasApplied ? (
                    <Button variant="outline" size="sm" disabled>
                      Application Active
                    </Button>
                  ) : (
                    <Button
                      variant="gold"
                      size="sm"
                      icon={Send}
                      onClick={() => applyForPlacement(item.id)}
                    >
                      Apply via Campus Drive
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

