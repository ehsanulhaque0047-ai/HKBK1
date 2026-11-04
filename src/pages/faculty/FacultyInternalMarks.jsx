import React, { useState } from 'react';
import {
  Award,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const FacultyInternalMarks = () => {
  const { examinations, updateInternalMarks } = useData();

  const [selectedSubject, setSelectedSubject] = useState('21CS61');

  const currentCourse = examinations.internalMarks.find((s) => s.code === selectedSubject) || examinations.internalMarks[0];

  const [ia1, setIa1] = useState(currentCourse.ia1 || 27);
  const [ia2, setIa2] = useState(currentCourse.ia2 || 28);
  const [assignment, setAssignment] = useState(currentCourse.assignment || 19);

  const handleSubjectChange = (code) => {
    setSelectedSubject(code);
    const sub = examinations.internalMarks.find((s) => s.code === code);
    if (sub) {
      setIa1(sub.ia1 || 0);
      setIa2(sub.ia2 || 0);
      setAssignment(sub.assignment || 0);
    }
  };

  const handleSaveMarks = () => {
    updateInternalMarks(selectedSubject, Number(ia1), Number(ia2), Number(assignment));
  };

  const avgIa = ((Number(ia1) + Number(ia2)) / 2).toFixed(1);
  const totalCie = (Number(avgIa) + Number(assignment)).toFixed(1);

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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Continuous Internal Evaluation (CIE) Entry</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Enter IA-1, IA-2, and Assignment scores. Verified marks are submitted to VTU Belagavi.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Save}
          onClick={handleSaveMarks}
        >
          Save & Publish CIE Scores
        </Button>
      </div>

      {/* Course Selection */}
      <Card title="Select Course for CIE Entry" icon={Award} accent>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {examinations.internalMarks.map((sub) => (
            <Button
              key={sub.code}
              variant={selectedSubject === sub.code ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleSubjectChange(sub.code)}
            >
              {sub.code} – {sub.subject}
            </Button>
          ))}
        </div>
      </Card>

      {/* Marks Matrix Card */}
      <Card
        title={`Student Continuous Internal Assessment Matrix: ${selectedSubject}`}
        subtitle={`Course: ${currentCourse.subject} | Max CIE Marks: 50`}
        icon={Award}
      >
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>USN</th>
                <th>Student Name</th>
                <th>IA-1 (/30)</th>
                <th>IA-2 (/30)</th>
                <th>Avg IA (/30)</th>
                <th>Assignment (/20)</th>
                <th>Total CIE (/50)</th>
                <th>VTU SEE Eligibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                    1HK21CS042
                  </span>
                </td>
                <td style={{ fontWeight: 700 }}>Syed Rayan Ahmed</td>
                <td>
                  <input
                    type="number"
                    max="30"
                    min="0"
                    className="simp-input"
                    style={{ width: '80px', padding: '0.35rem 0.5rem' }}
                    value={ia1}
                    onChange={(e) => setIa1(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    max="30"
                    min="0"
                    className="simp-input"
                    style={{ width: '80px', padding: '0.35rem 0.5rem' }}
                    value={ia2}
                    onChange={(e) => setIa2(e.target.value)}
                  />
                </td>
                <td>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-gold)' }}>
                    {avgIa}
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    max="20"
                    min="0"
                    className="simp-input"
                    style={{ width: '80px', padding: '0.35rem 0.5rem' }}
                    value={assignment}
                    onChange={(e) => setAssignment(e.target.value)}
                  />
                </td>
                <td>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: Number(totalCie) >= 40 ? 'var(--status-success)' : 'var(--text-primary)'
                    }}
                  >
                    {totalCie} / 50
                  </span>
                </td>
                <td>
                  {Number(totalCie) >= 20 ? (
                    <Badge variant="success">Eligible (&gt;=20)</Badge>
                  ) : (
                    <Badge variant="danger">Not Eligible</Badge>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          VTU Guidelines: Minimum eligibility for Semester End Examination (SEE) is 40% in CIE (20 out of 50). Changes are committed directly to institutional database.
        </div>
      </Card>
    </div>
  );
};
