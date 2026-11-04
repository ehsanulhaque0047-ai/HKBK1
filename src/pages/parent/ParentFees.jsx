import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Download,
  Printer
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';
import { Modal } from '../../components/common/Modal';

export const ParentFees = () => {
  const { fees, studentProfile } = useData();

  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>College Fee Details & Payment Ledger</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Student: <strong>{studentProfile.name}</strong> (USN: {studentProfile.usn}) | Academic Year 2024–25
        </p>
      </div>

      {/* Stats */}
      <div className="grid-cols-3">
        <StatsCard
          icon={CreditCard}
          label="Total Annual Fee"
          value={`₹ ${fees.totalFee.toLocaleString('en-IN')}`}
          subvalue="VTU Govt Quota Subsidized"
          color="navy"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Total Amount Cleared"
          value={`₹ ${fees.paidFee.toLocaleString('en-IN')}`}
          subvalue="Reconciled by Accounts"
          color="success"
        />
        <StatsCard
          icon={AlertCircle}
          label="Outstanding Dues"
          value={`₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue="Due Date: 30-Nov-2024"
          color={fees.outstandingFee > 0 ? 'warning' : 'success'}
        />
      </div>

      {/* Fee Breakdown */}
      <Card title="Semester Fee Head Breakdown" icon={CreditCard} accent>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Total Allocated (₹)</th>
                <th>Paid Amount (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.breakdown.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{item.item}</td>
                  <td style={{ fontWeight: 700 }}>₹ {item.amount.toLocaleString('en-IN')}</td>
                  <td style={{ fontWeight: 600, color: 'var(--status-success)' }}>
                    ₹ {item.paid.toLocaleString('en-IN')}
                  </td>
                  <td>
                    {item.paid >= item.amount ? (
                      <Badge variant="success">Cleared</Badge>
                    ) : (
                      <Badge variant="warning">{item.status}</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Receipts History */}
      <Card title="Official Receipts History" icon={Receipt}>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Receipt Number</th>
                <th>Payment Date</th>
                <th>Particulars</th>
                <th>Mode / Reference</th>
                <th>Amount</th>
                <th>Receipt Document</th>
              </tr>
            </thead>
            <tbody>
              {fees.transactions.map((tx) => (
                <tr key={tx.receiptNo}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {tx.receiptNo}
                    </span>
                  </td>
                  <td>{tx.date}</td>
                  <td style={{ fontWeight: 600 }}>{tx.category}</td>
                  <td>{tx.mode}</td>
                  <td style={{ fontWeight: 800 }}>₹ {tx.amount.toLocaleString('en-IN')}</td>
                  <td>
                    <Button
                      variant="subtle"
                      size="sm"
                      icon={Download}
                      onClick={() => setSelectedReceipt(tx)}
                    >
                      View Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="HKBK College of Engineering – Fee Receipt"
          subtitle={`Receipt No: ${selectedReceipt.receiptNo}`}
          maxWidth="640px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
              <Button variant="gold" icon={Printer} onClick={handlePrint}>
                Print Receipt
              </Button>
            </div>
          }
        >
          <div style={{ padding: '1.5rem', border: '2px solid #0B1E36', borderRadius: 'var(--radius-md)', background: '#FFFFFF', color: '#0B1E36' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0B1E36', paddingBottom: '1rem' }}>
              <img src="/hkbk-crest.svg" alt="" style={{ width: '50px', height: '50px', margin: '0 auto' }} />
              <div style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.4rem' }}>HKBK COLLEGE OF ENGINEERING</div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>Nagawara, Manyata Tech Park Road, Bengaluru - 560045</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#D4AF37', marginTop: '0.2rem' }}>
                FEE PAYMENT RECEIPT (ACCOUNTS SECTION)
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', padding: '1rem 0', fontSize: '0.82rem', borderBottom: '1px solid #CBD5E1' }}>
              <div><strong>Receipt No:</strong> {selectedReceipt.receiptNo}</div>
              <div><strong>Date:</strong> {selectedReceipt.date}</div>
              <div><strong>Student Name:</strong> {studentProfile.name}</div>
              <div><strong>USN:</strong> {studentProfile.usn}</div>
              <div><strong>Payment Mode:</strong> {selectedReceipt.mode}</div>
              <div><strong>Bank Reference:</strong> {selectedReceipt.bankReference}</div>
            </div>

            <div style={{ margin: '1rem 0', padding: '1rem', background: '#F8FAFC', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Head:</div>
                <div style={{ fontWeight: 700 }}>{selectedReceipt.category}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Amount Paid:</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803D' }}>
                  ₹ {selectedReceipt.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem', fontSize: '0.75rem', color: '#475569' }}>
              <div>Authorized System Generated Receipt</div>
              <div style={{ border: '1px dashed #D4AF37', padding: '0.4rem 0.8rem', textAlign: 'center' }}>
                <strong style={{ color: '#15803D' }}>VERIFIED & PAID</strong>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

