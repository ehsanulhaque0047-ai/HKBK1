import React, { useState } from 'react';
import {
  Award,
  Calendar,
  FileCheck,
  TrendingUp,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';
import { Modal } from '../../components/common/Modal';

export const StudentExams = () => {
  const { examinations, studentProfile } = useData();

  const [activeTab, setActiveTab] = useState('internal'); // 'internal', 'timetable', 'results', 'hallticket'
  const [showHallTicketModal, setShowHallTicketModal] = useState(false);

  const sgpaChartData = examinations.semesterHistory.map((s) => ({
    semester: s.sem.split(' ')[0],
    sgpa: s.sgpa
  }));

  const handlePrintHallTicket = () => {
    window.print();
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
        className="no-print"
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Examinations, Results & Hall Tickets</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            VTU Belagavi Examination Portal | Center Code: 1HK (HKBK College of Engineering)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button
            variant="gold"
            size="sm"
            icon={Download}
            onClick={() => setShowHallTicketModal(true)}
          >
            Generate VTU Hall Ticket
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid-cols-4 no-print">
        <StatsCard
          icon={Award}
          label="Cumulative CGPA"
          value={examinations.cumulativeStats.cgpa}
          subvalue="Target: Distinction"
          color="gold"
        />
        <StatsCard
          icon={TrendingUp}
          label="Last Semester SGPA"
          value="8.92"
          subvalue="5th Sem Result"
          color="success"
        />
        <StatsCard
          icon={Calendar}
          label="Earned Credits"
          value={`${examinations.cumulativeStats.earnedCredits} / ${examinations.cumulativeStats.totalCredits}`}
          subvalue="VTU Degree Requirement"
          color="navy"
        />
        <StatsCard
          icon={FileCheck}
          label="Hall Ticket Status"
          value="Approved"
          subvalue="Eligible (Attendance Safe)"
          color="success"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="simp-tabs no-print">
        <button
          className={`simp-tab-btn ${activeTab === 'internal' ? 'active' : ''}`}
          onClick={() => setActiveTab('internal')}
        >
          Internal Assessment (CIE) Marks
        </button>
        <button
          className={`simp-tab-btn ${activeTab === 'timetable' ? 'active' : ''}`}
          onClick={() => setActiveTab('timetable')}
        >
          VTU Semester Examination Timetable
        </button>
        <button
          className={`simp-tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Semester Result History (SGPA/CGPA)
        </button>
      </div>

      {/* TAB 1: INTERNAL MARKS */}
      {activeTab === 'internal' && (
        <Card
          title="Continuous Internal Evaluation (CIE) Scorecard"
          subtitle="IA-1, IA-2, Lab & Coursework Marks out of 50"
          icon={Award}
          accent
        >
          <div className="simp-table-container">
            <table className="simp-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>IA-1 (/30)</th>
                  <th>IA-2 (/30)</th>
                  <th>Avg IA (/30)</th>
                  <th>Assignment (/20)</th>
                  <th>Total CIE (/50)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {examinations.internalMarks.map((m) => (
                  <tr key={m.code}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {m.code}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{m.subject}</td>
                    <td style={{ fontWeight: 600 }}>{m.ia1}</td>
                    <td style={{ fontWeight: 600 }}>{m.ia2 !== null ? m.ia2 : '—'}</td>
                    <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>{m.avgIa}</td>
                    <td style={{ fontWeight: 600 }}>{m.assignment}</td>
                    <td>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          color: m.totalInternal >= 40 ? 'var(--status-success)' : 'var(--text-primary)'
                        }}
                      >
                        {m.totalInternal} / {m.maxTotal}
                      </span>
                    </td>
                    <td>
                      <Badge variant="success">Eligible</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Note: Maximum Continuous Internal Evaluation (CIE) marks per course = 50. VTU requires a minimum of 20 out of 50 to qualify for the Semester End Examination (SEE).
          </div>
        </Card>
      )}

      {/* TAB 2: EXAM TIMETABLE */}
      {activeTab === 'timetable' && (
        <Card
          title="Semester End Examination (SEE) Schedule – Dec 2024"
          subtitle="Visvesvaraya Technological University Official Theory Timetable"
          icon={Calendar}
          accent
        >
          <div className="simp-table-container">
            <table className="simp-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time & Session</th>
                  <th>Course Code</th>
                  <th>Subject Title</th>
                  <th>Examination Center</th>
                </tr>
              </thead>
              <tbody>
                {examinations.semesterExamSchedule.map((exam, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{exam.date}</td>
                    <td>
                      <div>{exam.time}</div>
                      <Badge variant="navy" style={{ marginTop: '0.2rem' }}>{exam.session}</Badge>
                    </td>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {exam.code}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{exam.subject}</td>
                    <td>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>HKBK College of Engineering</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Center Code: 1HK</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: RESULT HISTORY & CGPA TREND */}
      {activeTab === 'results' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* CGPA Trend Chart */}
          <Card title="Semester SGPA Progression Trend" icon={TrendingUp}>
            <div style={{ width: '100%', height: '240px', marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sgpaChartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                  <XAxis dataKey="semester" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis domain={[7.0, 10.0]} stroke="var(--text-muted)" fontSize={12} />
                  <Tooltip
                    formatter={(val) => [val, 'SGPA']}
                    contentStyle={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-light)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#0B1E36', stroke: '#D4AF37', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Past Semester Grade Cards */}
          <Card title="VTU Official Semester Grade History" icon={Award}>
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
      )}

      {/* VTU OFFICIAL HALL TICKET MODAL (PRINT READY) */}
      {showHallTicketModal && (
        <Modal
          isOpen={showHallTicketModal}
          onClose={() => setShowHallTicketModal(false)}
          title="VTU Semester Examination Hall Ticket"
          subtitle="Official Admission Ticket – Dec 2024 / Jan 2025"
          maxWidth="720px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Button variant="outline" onClick={() => setShowHallTicketModal(false)}>
                Close
              </Button>
              <Button variant="gold" icon={Printer} onClick={handlePrintHallTicket}>
                Print Hall Ticket
              </Button>
            </div>
          }
        >
          {/* Printable Hall Ticket Layout */}
          <div
            style={{
              padding: '1.5rem',
              border: '2px solid #0B1E36',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              color: '#0B1E36'
            }}
          >
            {/* Header with Crest */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid #0B1E36', paddingBottom: '1rem' }}>
              <img src="/hkbk-crest.svg" alt="" style={{ width: '60px', height: '60px' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                  VISVESVARAYA TECHNOLOGICAL UNIVERSITY, BELAGAVI
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                  HKBK COLLEGE OF ENGINEERING, BENGALURU (CENTER CODE: 1HK)
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#D4AF37', marginTop: '0.2rem' }}>
                  OFFICIAL ADMISSION TICKET – B.E. 6TH SEMESTER EXAMINATION (DEC 2024)
                </div>
              </div>
            </div>

            {/* Candidate Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', padding: '1rem 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.82rem' }}>
                <div>
                  <strong>Candidate Name:</strong>
                  <div>{studentProfile.name}</div>
                </div>
                <div>
                  <strong>University Seat No (USN):</strong>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1D63B8' }}>{studentProfile.usn}</div>
                </div>
                <div>
                  <strong>Department / Branch:</strong>
                  <div>Computer Science & Engg. (CSE)</div>
                </div>
                <div>
                  <strong>Semester:</strong>
                  <div>6th Semester (Even Term)</div>
                </div>
                <div>
                  <strong>Hall Ticket Number:</strong>
                  <div style={{ fontFamily: 'monospace' }}>HT-HKBK-2024-6CS042</div>
                </div>
                <div>
                  <strong>Examination Center:</strong>
                  <div>1HK - HKBK College of Engineering</div>
                </div>
              </div>

              {/* Candidate Photograph */}
              <div>
                <img
                  src={studentProfile.avatar}
                  alt={studentProfile.name}
                  style={{ width: '80px', height: '95px', objectFit: 'cover', border: '1px solid #000' }}
                />
                <div style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: '0.2rem' }}>
                  Candidate Photo
                </div>
              </div>
            </div>

            {/* Subjects Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9' }}>
                  <th style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'left' }}>Sub Code</th>
                  <th style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'left' }}>Subject Title</th>
                  <th style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'center' }}>Exam Date</th>
                  <th style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'center' }}>Session</th>
                  <th style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'center' }}>Invigilator Sign</th>
                </tr>
              </thead>
              <tbody>
                {examinations.semesterExamSchedule.map((s) => (
                  <tr key={s.code}>
                    <td style={{ border: '1px solid #CBD5E1', padding: '0.4rem', fontWeight: 700 }}>{s.code}</td>
                    <td style={{ border: '1px solid #CBD5E1', padding: '0.4rem' }}>{s.subject}</td>
                    <td style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'center' }}>{s.date}</td>
                    <td style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'center' }}>{s.session}</td>
                    <td style={{ border: '1px solid #CBD5E1', padding: '0.4rem', textAlign: 'center' }}>___________</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Signature Block */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px dashed #CBD5E1', fontSize: '0.75rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }} />
                <strong>Signature of Candidate</strong>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }} />
                <strong>Chief Superintendent / Principal</strong>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

