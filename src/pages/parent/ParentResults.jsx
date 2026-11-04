import React from 'react';
import {
  Award,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const ParentResults = () => {
  const { examinations, studentProfile } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Academic Performance & Examination Results</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Student: <strong>{studentProfile.name}</strong> (USN: {studentProfile.usn}) | Visvesvaraya Technological University Belagavi
        </p>
      </div>

      {/* Stats */}
      <div className="grid-cols-3">
        <StatsCard
          icon={Award}
          label="Cumulative CGPA"
          value={examinations.cumulativeStats.cgpa}
          subvalue="Target: First Class with Distinction"
          color="gold"
        />
        <StatsCard
          icon={TrendingUp}
          label="Latest 5th Sem SGPA"
          value="8.92"
          subvalue="Total Marks: 655 / 750"
          color="success"
        />
        <StatsCard
          icon={FileCheck}
          label="Total Earned Credits"
          value={`${examinations.cumulativeStats.earnedCredits} / 160`}
          subvalue="No backlogs recorded"
          color="navy"
        />
      </div>

      {/* Current Continuous Internal Assessment Scores */}
      <Card title="Current 6th Semester Continuous Internal Assessment (CIE)" icon={Award} accent>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>IA-1 (/30)</th>
                <th>IA-2 (/30)</th>
                <th>Avg IA (/30)</th>
                <th>Assignment (/20)</th>
                <th>Total CIE (/50)</th>
                <th>Qualifying Status</th>
              </tr>
            </thead>
            <tbody>
              {examinations.internalMarks.map((m) => (
                <tr key={m.code}>
                  <td style={{ fontWeight: 700 }}>{m.subject}</td>
                  <td>{m.ia1}</td>
                  <td>{m.ia2 !== null ? m.ia2 : '—'}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>{m.avgIa}</td>
                  <td>{m.assignment}</td>
                  <td style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--status-success)' }}>
                    {m.totalInternal} / 50
                  </td>
                  <td>
                    <Badge variant="success">Eligible</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Semester History Table */}
      <Card title="VTU Official Semester Grade History" icon={Calendar}>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Credits Earned</th>
                <th>SGPA</th>
                <th>Total Marks</th>
                <th>Class Declared</th>
              </tr>
            </thead>
            <tbody>
              {examinations.semesterHistory.map((s, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700 }}>{s.sem}</td>
                  <td>{s.credits} Credits</td>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent-blue)' }}>
                      {s.sgpa}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{s.totalMarks}</td>
                  <td>
                    <Badge variant="gold">{s.result}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

