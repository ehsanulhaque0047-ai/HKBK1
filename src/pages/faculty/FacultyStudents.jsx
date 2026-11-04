import React, { useState } from 'react';
import {
  Users,
  Search,
  AlertTriangle,
  CheckCircle2,
  Award,
  Mail,
  MessageSquare,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyStudents = () => {
  const { studentsRoster, sendParentMessage } = useData();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // All, Shortage, Top
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [counselingNote, setCounselingNote] = useState('');

  const filtered = studentsRoster.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.usn.toLowerCase().includes(search.toLowerCase());
    if (filter === 'Shortage') return matchesSearch && s.attendance < 75;
    if (filter === 'Top') return matchesSearch && s.cgpa >= 9.0;
    return matchesSearch;
  });

  const handleSendCounseling = (e) => {
    e.preventDefault();
    if (!counselingNote.trim()) return;
    sendParentMessage(
      'Dr. A. K. Manjunath (Proctor / Faculty)',
      `Parent of ${selectedStudent.name}`,
      `Proctorial Counseling Note: Attendance & Academic Alert`,
      counselingNote,
      selectedStudent.usn
    );
    setSelectedStudent(null);
    setCounselingNote('');
  };

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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Cohort & Proctorial Management</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Class: 6th Semester B.E. Computer Science & Engineering (Section A) • Mentor: Dr. A. K. Manjunath
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Shortage', 'Top'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'All' ? 'All Students (10)' : f === 'Shortage' ? 'Attendance Shortage (<75%)' : 'Distinction (CGPA ≥ 9.0)'}
            </Button>
          ))}
        </div>
      </div>

      {/* Cohort Table */}
      <Card
        title="Student Academic & Attendance Register"
        icon={Users}
        accent
        action={
          <div style={{ position: 'relative', width: '240px' }}>
            <Search
              size={14}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by name or USN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="simp-input"
              style={{ paddingLeft: '2rem', height: '32px', fontSize: '0.82rem' }}
            />
          </div>
        }
      >
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>USN</th>
                <th>Student Full Name</th>
                <th>Class & Sec</th>
                <th>Overall Attendance</th>
                <th>Cumulative CGPA</th>
                <th>Academic Status</th>
                <th>Proctorial Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((std) => {
                const hasShortage = std.attendance < 75;
                return (
                  <tr key={std.usn}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {std.usn}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{std.name}</td>
                    <td>{std.sem}th Sem - {std.sec}</td>
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
                      <span className="mono-font" style={{ fontWeight: 800 }}>
                        {std.cgpa}
                      </span>
                    </td>
                    <td>
                      {hasShortage ? (
                        <Badge variant="danger" icon={AlertTriangle}>
                          Shortage (&lt;75%)
                        </Badge>
                      ) : (
                        <Badge variant="success">Good Standing</Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant={hasShortage ? 'danger' : 'subtle'}
                        size="sm"
                        onClick={() => {
                          setSelectedStudent(std);
                          setCounselingNote(
                            `Dear Parent, this is an official proctorial notice regarding ${std.name}'s current attendance of ${std.attendance}%. Minimum 75% is strictly enforced by VTU for examination eligibility.`
                          );
                        }}
                      >
                        {hasShortage ? 'Issue Warning' : 'Proctor Review'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Proctor Notice / Warning Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Proctorial Counseling Note: ${selectedStudent.name}`}
          subtitle={`USN: ${selectedStudent.usn} | Attendance: ${selectedStudent.attendance}%`}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                Cancel
              </Button>
              <Button variant="gold" icon={MessageSquare} onClick={handleSendCounseling}>
                Dispatch Proctor Note to Parent
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSendCounseling} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Notice Message to Student & Parent</label>
              <textarea
                className="simp-textarea"
                rows={4}
                value={counselingNote}
                onChange={(e) => setCounselingNote(e.target.value)}
                required
              />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Dispatched notices are delivered into the Parent Portal communication inbox and recorded on institutional academic audit log.
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
