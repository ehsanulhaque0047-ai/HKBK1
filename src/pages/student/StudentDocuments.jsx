import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Printer,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const StudentDocuments = () => {
  const { documentRequests, requestDocument, studentProfile } = useData();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [docType, setDocType] = useState('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!purpose.trim()) return;
    requestDocument(docType, purpose);
    setIsApplyModalOpen(false);
    setPurpose('');
  };

  const handlePrintCert = () => {
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Institutional Document & Certificate Requests</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Request verified official academic certificates signed by Principal & Registrar Secretariat.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsApplyModalOpen(true)}
        >
          New Certificate Request
        </Button>
      </div>

      {/* Requests History Table */}
      <Card title="Active & Completed Document Requests" icon={FileCheck} accent className="no-print">
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Certificate Type</th>
                <th>Applied Purpose</th>
                <th>Applied Date</th>
                <th>Current Status</th>
                <th>Admin Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documentRequests.map((req) => {
                const isApproved = req.status.includes('Approved') || req.downloadReady;
                return (
                  <tr key={req.id}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {req.id}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{req.docType}</td>
                    <td style={{ fontSize: '0.82rem' }}>{req.purpose}</td>
                    <td>{req.appliedDate}</td>
                    <td>
                      {isApproved ? (
                        <Badge variant="success" icon={CheckCircle2}>Ready for Download</Badge>
                      ) : (
                        <Badge variant="warning" icon={Clock}>{req.status}</Badge>
                      )}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {req.adminRemarks}
                    </td>
                    <td>
                      {isApproved ? (
                        <Button
                          variant="gold"
                          size="sm"
                          icon={Download}
                          onClick={() => setSelectedCert(req)}
                        >
                          View & Print
                        </Button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Processing</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Available Document Types Info */}
      <div className="grid-cols-3 no-print">
        <div style={{ padding: '1.25rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Bonafide Certificate</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Issued for passport verification, bank accounts, visa applications, and student concessions.
          </div>
        </div>
        <div style={{ padding: '1.25rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Study & Conduct Certificate</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Required for National Scholarship Portal (NSP), state e-Pass, and higher education.
          </div>
        </div>
        <div style={{ padding: '1.25rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Duplicate ID Card Request</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Issued in case of lost or damaged campus smart ID card with security RFID chip.
          </div>
        </div>
      </div>

      {/* Apply Request Modal */}
      {isApplyModalOpen && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title="Submit Academic Document Application"
          subtitle="Registrar Office – Verification SLA: 24 to 48 hours"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={FileCheck} onClick={handleSubmit}>
                Submit Application
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Certificate Type</label>
              <select
                className="simp-select"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
              >
                <option value="Bonafide Certificate">Bonafide Certificate</option>
                <option value="Study & Conduct Certificate">Study & Conduct Certificate</option>
                <option value="Character Certificate">Character & Disciplinary Certificate</option>
                <option value="Student ID Card Replacement">Smart ID Card Replacement (Loss/Damage)</option>
                <option value="Fee Paid Structure Certificate">Annual Fee Paid Certificate (For Income Tax)</option>
              </select>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Purpose of Request</label>
              <textarea
                className="simp-textarea"
                rows={3}
                placeholder="e.g. Applying for Regional Passport Office verification / Scholarship renewal..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Note: Digital certificates include official cryptographic verification barcode and institutional seal.
            </div>
          </form>
        </Modal>
      )}

      {/* Printable Certificate Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Digital Academic Certificate Preview"
          subtitle={`Ref No: ${selectedCert.certificateNo || 'HKBK/CERT/2024/1142'}`}
          maxWidth="700px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedCert(null)}>
                Close Preview
              </Button>
              <Button variant="gold" icon={Printer} onClick={handlePrintCert}>
                Print Certificate
              </Button>
            </div>
          }
        >
          {/* Official Certificate Layout */}
          <div
            style={{
              padding: '2.5rem',
              border: '4px double #0B1E36',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FFFFFF',
              color: '#0B1E36',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Top Seal */}
            <img src="/hkbk-crest.svg" alt="" style={{ width: '70px', height: '70px', margin: '0 auto 0.75rem' }} />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.04em' }}>
              HKBK COLLEGE OF ENGINEERING
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#475569' }}>
              Autonomous Institution | Affiliated to VTU Belagavi | Approved by AICTE, New Delhi
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
              22/1, Nagawara, Manyata Tech Park Road, Bengaluru - 560045, Karnataka
            </p>

            <div style={{ width: '80%', height: '1.5px', background: '#D4AF37', margin: '1rem auto' }} />

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0B1E36', margin: '1.5rem 0' }}>
              {selectedCert.docType}
            </h3>

            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, textAlign: 'justify', margin: '1.5rem 0' }}>
              This is to certify that <strong>{studentProfile.name}</strong>, bearing University Seat Number (USN) <strong>{studentProfile.usn}</strong>, is a bona fide regular student of this institution studying in <strong>6th Semester, Bachelor of Engineering (B.E.)</strong> in the Department of <strong>{studentProfile.department}</strong> for the Academic Year <strong>2024–2025</strong>.
            </p>

            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, textAlign: 'justify', margin: '1rem 0' }}>
              According to the college records, his conduct and character during the course of study have been found to be <strong>GOOD</strong>. This certificate is issued upon his request for the purpose of: <em>"{selectedCert.purpose}"</em>.
            </p>

            {/* Signature & Seal Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '3.5rem', paddingTop: '1rem' }}>
              <div style={{ textAlign: 'left', fontSize: '0.78rem' }}>
                <div>Date of Issue: <strong>{selectedCert.completedDate || selectedCert.appliedDate}</strong></div>
                <div>Certificate No: <strong>{selectedCert.certificateNo || 'HKBK/CERT/2024/1142'}</strong></div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '130px', borderBottom: '1px solid #000', marginBottom: '0.4rem' }} />
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>PRINCIPAL / REGISTRAR</div>
                <div style={{ fontSize: '0.72rem', color: '#475569' }}>HKBK College of Engineering</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

