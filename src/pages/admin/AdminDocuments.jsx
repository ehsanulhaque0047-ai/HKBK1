import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Search
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminDocuments = () => {
  const { documentRequests, updateDocumentStatus } = useData();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionRemarks, setActionRemarks] = useState('');
  const [certNo, setCertNo] = useState('');

  const handleApprove = () => {
    updateDocumentStatus(
      selectedRequest.id,
      'Approved & Ready for Download',
      actionRemarks || 'Digitally verified and approved by Office of the Registrar.',
      certNo || `HKBK/CERT/${Math.floor(1000 + Math.random() * 9000)}`
    );
    setSelectedRequest(null);
  };

  const handleReject = () => {
    updateDocumentStatus(
      selectedRequest.id,
      'Rejected / Incomplete Information',
      actionRemarks || 'Discrepancy in purpose or academic clearance. Visit Registrar window.'
    );
    setSelectedRequest(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Document & Certificate Applications</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Review, approve, digitally sign, and issue official university certificates.
        </p>
      </div>

      {/* Applications Table */}
      <Card title="Pending & Processed Certificate Applications" icon={FileCheck} accent>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Student USN</th>
                <th>Student Name</th>
                <th>Certificate Type</th>
                <th>Stated Purpose</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documentRequests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {req.id}
                    </span>
                  </td>
                  <td className="mono-font">{req.studentUsn}</td>
                  <td style={{ fontWeight: 700 }}>{req.studentName}</td>
                  <td style={{ fontWeight: 600 }}>{req.docType}</td>
                  <td style={{ fontSize: '0.82rem' }}>{req.purpose}</td>
                  <td>{req.appliedDate}</td>
                  <td>
                    <Badge variant={req.downloadReady ? 'success' : 'warning'}>
                      {req.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="subtle"
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(req);
                        setActionRemarks(req.adminRemarks || '');
                        setCertNo(req.certificateNo || `HKBK/CERT/${Math.floor(1000 + Math.random() * 9000)}`);
                      }}
                    >
                      Process
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Process Modal */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Process Application: ${selectedRequest.id}`}
          subtitle={`${selectedRequest.docType} for ${selectedRequest.studentName} (${selectedRequest.studentUsn})`}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="danger" icon={XCircle} onClick={handleReject}>
                Reject Application
              </Button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  Cancel
                </Button>
                <Button variant="gold" icon={CheckCircle2} onClick={handleApprove}>
                  Approve & Issue Certificate
                </Button>
              </div>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Official Certificate Number</label>
              <input
                className="simp-input mono-font"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                placeholder="e.g. HKBK/CERT/BON/2024/1142"
              />
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Registrar Office Remarks</label>
              <textarea
                className="simp-textarea"
                rows={3}
                value={actionRemarks}
                onChange={(e) => setActionRemarks(e.target.value)}
                placeholder="Remarks visible to the student upon download..."
              />
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Approving this application will generate the cryptographically verifiable certificate on the student's SIMP dashboard.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

