import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Mail,
  Phone
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminStudents = () => {
  const { studentsRoster } = useData();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = studentsRoster.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.usn.toLowerCase().includes(search.toLowerCase());
    if (filter === 'Shortage') return matchesSearch && s.attendance < 75;
    if (filter === 'Distinction') return matchesSearch && s.cgpa >= 9.0;
    if (filter === 'FeeDue') return matchesSearch && (s.feeBalance || 0) > 0;
    return matchesSearch;
  });

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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Information Database</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Central student register, academic performance, quota allocation, and VTU registration.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'FeeDue', 'Shortage', 'Distinction'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'All' ? 'All Records' : f === 'FeeDue' ? 'Fee Balance Due' : f === 'Shortage' ? 'Attendance Shortage (<75%)' : 'Distinction (≥9.0)'}
            </Button>
          ))}
        </div>
      </div>

      {/* Student Registry Table */}
      <Card
        title="Institutional Student Enrollment Registry"
        icon={GraduationCap}
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
              placeholder="Search USN or student name..."
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
                <th>University Seat No</th>
                <th>Candidate Full Name</th>
                <th>Department & Sem</th>
                <th>Overall Attendance</th>
                <th>Cumulative CGPA</th>
                <th>Fee Balance (₹)</th>
                <th>Status</th>
                <th>View Record</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((std) => (
                <tr key={std.usn}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {std.usn}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{std.name}</td>
                  <td>B.E. CSE – Sem {std.sem} ({std.sec})</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: std.attendance < 75 ? 'var(--status-danger)' : 'var(--status-success)'
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
                    <span
                      style={{
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: (std.feeBalance || 0) > 0 ? 'var(--status-danger)' : 'var(--status-success)'
                      }}
                    >
                      ₹ {(std.feeBalance || 0).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <Badge variant={std.attendance < 75 ? 'danger' : 'success'}>
                      {std.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="subtle"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedStudent(std)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student File: ${selectedStudent.name}`}
          subtitle={`USN: ${selectedStudent.usn} | Department of Computer Science & Engineering`}
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedStudent(null)}>
              Close Record
            </Button>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <div className="simp-label">Full Name</div>
              <div style={{ fontWeight: 700 }}>{selectedStudent.name}</div>
            </div>
            <div>
              <div className="simp-label">University Seat Number</div>
              <div style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{selectedStudent.usn}</div>
            </div>
            <div>
              <div className="simp-label">Program & Class</div>
              <div>B.E. CSE – 6th Semester (Section {selectedStudent.sec})</div>
            </div>
            <div>
              <div className="simp-label">Admission Quota</div>
              <div>KCET (Karnataka Govt. Quota)</div>
            </div>
            <div>
              <div className="simp-label">Cumulative Attendance</div>
              <div style={{ fontWeight: 700, color: selectedStudent.attendance < 75 ? 'var(--status-danger)' : 'var(--status-success)' }}>
                {selectedStudent.attendance}%
              </div>
            </div>
            <div>
              <div className="simp-label">Cumulative Grade Point (CGPA)</div>
              <div style={{ fontWeight: 700 }}>{selectedStudent.cgpa} / 10.0</div>
            </div>
            <div>
              <div className="simp-label">Fee Account Status</div>
              <div style={{ fontWeight: 700, color: (selectedStudent.feeBalance || 0) > 0 ? 'var(--status-danger)' : 'var(--status-success)' }}>
                {(selectedStudent.feeBalance || 0) > 0 ? `Balance Due: ₹ ${(selectedStudent.feeBalance || 0).toLocaleString('en-IN')}` : 'Fully Cleared (₹ 0)'}
              </div>
            </div>
            <div>
              <div className="simp-label">Course Fee Paid</div>
              <div style={{ fontWeight: 700, color: 'var(--status-success)' }}>
                ₹ {(selectedStudent.paidFee || 0).toLocaleString('en-IN')} / ₹ {(selectedStudent.totalFee || 118500).toLocaleString('en-IN')}
              </div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="simp-label">Campus Transport / Bus Facility</div>
              <div>Registered on Route 14 (HBR Layout - Nagawara Campus)</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

