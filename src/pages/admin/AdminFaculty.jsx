import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  BookOpen,
  Award,
  Building2
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminFaculty = () => {
  const [search, setSearch] = useState('');

  const facultyList = [
    {
      id: 'fac-108',
      name: 'Dr. A. K. Manjunath',
      empId: 'HKBK-FAC-108',
      designation: 'Associate Professor & PG Coordinator',
      dept: 'Computer Science & Engineering',
      qualification: 'Ph.D. (Distributed Systems, VTU/IISc), M.Tech',
      email: 'manjunath.ak@hkbk.edu.in',
      phone: '+91 94481 77652',
      subjects: '21CS61 (Compilers), 21CS62 (Networks), 21CSL66 (Lab)',
      status: 'Active'
    },
    {
      id: 'fac-112',
      name: 'Prof. Archana S.',
      empId: 'HKBK-FAC-112',
      designation: 'Assistant Professor',
      dept: 'Computer Science & Engineering',
      qualification: 'M.Tech (Network Security), (Ph.D.)',
      email: 'archana.s@hkbk.edu.in',
      phone: '+91 98452 11984',
      subjects: '21CS62 (Computer Networks), 21CSL67 (Networks Lab)',
      status: 'Active'
    },
    {
      id: 'fac-119',
      name: 'Prof. Imran Basha',
      empId: 'HKBK-FAC-119',
      designation: 'Assistant Professor',
      dept: 'Computer Science & Engineering',
      qualification: 'M.Tech (Software Engineering)',
      email: 'imran.basha@hkbk.edu.in',
      phone: '+91 97410 88219',
      subjects: '21CS63 (Full Stack Web Development)',
      status: 'Active'
    },
    {
      id: 'fac-104',
      name: 'Dr. Tabassum Sultana',
      empId: 'HKBK-FAC-104',
      designation: 'Professor & Head of Department (HOD)',
      dept: 'Computer Science & Engineering',
      qualification: 'Ph.D. (Artificial Intelligence & Machine Learning)',
      email: 'hod.cse@hkbk.edu.in',
      phone: '+91 98450 12044',
      subjects: 'Department Administration & Doctoral Research',
      status: 'Active'
    },
    {
      id: 'fac-125',
      name: 'Dr. Naseeruddin',
      empId: 'HKBK-FAC-125',
      designation: 'Associate Professor',
      dept: 'Computer Science & Engineering',
      qualification: 'Ph.D. (Cloud Computing & Big Data)',
      email: 'naseer.cse@hkbk.edu.in',
      phone: '+91 99801 33452',
      subjects: '21CS642 (Cloud Computing & DevOps)',
      status: 'Active'
    }
  ];

  const filtered = facultyList.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.empId.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Teaching Faculty Roster & Workload</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Faculty profiles, employee codes, academic qualifications, and course allocations.
        </p>
      </div>

      {/* Faculty Table */}
      <Card
        title="Faculty Academic Roster"
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
              placeholder="Search faculty name or ID..."
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
                <th>Emp ID</th>
                <th>Faculty Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Qualifications</th>
                <th>Assigned Subjects</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fac) => (
                <tr key={fac.id}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {fac.empId}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{fac.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fac.email}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{fac.designation}</td>
                  <td>{fac.dept}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{fac.qualification}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '200px' }}>
                    {fac.subjects}
                  </td>
                  <td>
                    <Badge variant="success">{fac.status}</Badge>
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
