import React, { useState } from 'react';
import {
  UserCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Save,
  Clock,
  AlertTriangle,
  Users
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const FacultyAttendance = () => {
  const { subjects, studentsRoster, markAttendanceBatch } = useData();

  const [selectedSubject, setSelectedSubject] = useState('21CS61');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState('Code Generation & Intermediate Representation');

  // Student status mapping: usn -> 'Present' | 'Absent'
  const [attendanceState, setAttendanceState] = useState(() => {
    const map = {};
    studentsRoster.forEach((s) => {
      map[s.usn] = 'Present';
    });
    return map;
  });

  const toggleStatus = (usn) => {
    setAttendanceState((prev) => ({
      ...prev,
      [usn]: prev[usn] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const markAll = (status) => {
    const updated = {};
    studentsRoster.forEach((s) => {
      updated[s.usn] = status;
    });
    setAttendanceState(updated);
  };

  const handleSave = () => {
    const records = Object.keys(attendanceState).map((usn) => ({
      usn,
      status: attendanceState[usn],
      topic
    }));
    markAttendanceBatch(selectedSubject, selectedDate, records);
  };

  const presentCount = Object.values(attendanceState).filter((s) => s === 'Present').length;
  const absentCount = Object.values(attendanceState).filter((s) => s === 'Absent').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Attendance Register</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Mark digital attendance for assigned lectures and laboratory sessions.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Save}
          onClick={handleSave}
        >
          Submit Attendance ({presentCount} Present / {absentCount} Absent)
        </Button>
      </div>

      {/* Session Configuration Card */}
      <Card title="Class Session Parameters" icon={Calendar} accent>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="simp-form-group">
            <label className="simp-label">Select Assigned Course</label>
            <select
              className="simp-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="21CS61">21CS61 – System Software & Compilers (6th Sem A)</option>
              <option value="21CS62">21CS62 – Computer Networks & Security (6th Sem B)</option>
              <option value="21CSL66">21CSL66 – System Software Lab (6th Sem A - Batch 1)</option>
            </select>
          </div>

          <div className="simp-form-group">
            <label className="simp-label">Session Date</label>
            <input
              type="date"
              className="simp-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="simp-form-group">
            <label className="simp-label">Lecture Topic / Experiment</label>
            <input
              type="text"
              className="simp-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. DAG representation for basic blocks"
            />
          </div>
        </div>
      </Card>

      {/* Interactive Roster Table */}
      <Card
        title={`Student Roll Call: ${selectedSubject} (6th Semester Section A)`}
        icon={Users}
        action={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="sm" onClick={() => markAll('Present')}>
              Mark All Present
            </Button>
            <Button variant="outline" size="sm" onClick={() => markAll('Absent')}>
              Mark All Absent
            </Button>
          </div>
        }
      >
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>University Seat No (USN)</th>
                <th>Student Full Name</th>
                <th>Overall Attendance</th>
                <th>Shortage Alert</th>
                <th>Session Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {studentsRoster.map((std) => {
                const isPresent = attendanceState[std.usn] === 'Present';
                const hasShortage = std.attendance < 75;

                return (
                  <tr key={std.usn}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {std.usn}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{std.name}</td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          color: hasShortage ? 'var(--status-danger)' : 'var(--status-success)'
                        }}
                      >
                        {std.attendance}%
                      </span>
                    </td>
                    <td>
                      {hasShortage ? (
                        <Badge variant="danger" icon={AlertTriangle}>
                          Shortage (&lt;75%)
                        </Badge>
                      ) : (
                        <Badge variant="success">Eligible</Badge>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => toggleStatus(std.usn)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.4rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          backgroundColor: isPresent ? 'var(--status-success-bg)' : 'var(--status-danger-bg)',
                          color: isPresent ? 'var(--status-success)' : 'var(--status-danger)',
                          border: isPresent ? '1.5px solid var(--status-success-border)' : '1.5px solid var(--status-danger-border)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isPresent ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{isPresent ? 'PRESENT' : 'ABSENT'}</span>
                      </button>
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

