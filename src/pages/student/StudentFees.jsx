import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  Receipt,
  FileText,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';
import { Modal } from '../../components/common/Modal';

export const StudentFees = () => {
  const { fees, payFee, studentProfile } = useData();

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [payAmount, setPayAmount] = useState(fees.outstandingFee || 23500);
  const [payMode, setPayMode] = useState('UPI / QR Code');
  const [paying, setPaying] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      try {
        const tx = payFee(payAmount, payMode, 'Semester 6 Balance Installment');
        setPaying(false);
        setIsPayModalOpen(false);
        setSelectedReceipt(tx);
      } catch (err) {
        setPaying(false);
      }
    }, 700);
  };

  const handlePrintReceipt = () => {
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Fee Structure & Payment Portal</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Academic Year {fees.academicYear} | {fees.semester} | Accounts Department
          </p>
        </div>

        {fees.outstandingFee > 0 && (
          <Button
            variant="gold"
            icon={CreditCard}
            onClick={() => {
              setPayAmount(fees.outstandingFee);
              setIsPayModalOpen(true);
            }}
          >
            Pay Balance (₹ {fees.outstandingFee.toLocaleString('en-IN')})
          </Button>
        )}
      </div>

      {/* Summary Stats Row */}
      <div className="grid-cols-4 no-print">
        <StatsCard
          icon={CreditCard}
          label="Total Semester Fees"
          value={`₹ ${fees.totalFee.toLocaleString('en-IN')}`}
          subvalue="VTU Quota Subsidized"
          color="navy"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Fees Paid To Date"
          value={`₹ ${fees.paidFee.toLocaleString('en-IN')}`}
          subvalue="Reconciled by Accounts"
          color="success"
        />
        <StatsCard
          icon={AlertCircle}
          label="Outstanding Balance"
          value={`₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue="Due Date: 30-Nov-2024"
          color={fees.outstandingFee > 0 ? 'danger' : 'success'}
        />
        <StatsCard
          icon={Receipt}
          label="Payment Status"
          value={fees.status}
          subvalue={`${fees.transactions.length} Receipts Generated`}
          color={fees.outstandingFee === 0 ? 'success' : 'warning'}
        />
      </div>

      {/* Fee Itemized Breakdown */}
      <Card title="Semester Fee Structure Breakdown" icon={CreditCard} accent className="no-print">
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Fee Head / Component</th>
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

      {/* Transaction Payment History */}
      <Card title="Payment Receipts & Transaction Ledger" icon={Receipt} className="no-print">
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Payment Date</th>
                <th>Category</th>
                <th>Payment Mode & Ref</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Receipt</th>
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
                  <td style={{ fontWeight: 600 }}>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td>
                    <div>{tx.mode}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {tx.bankReference}
                    </div>
                  </td>
                  <td style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                    ₹ {tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <Badge variant="success">Cleared</Badge>
                  </td>
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

      {/* Interactive Pay Modal */}
      {isPayModalOpen && (
        <Modal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          title="Online College Fee Payment"
          subtitle={`Student: ${studentProfile.name} (USN: ${studentProfile.usn})`}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsPayModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={CreditCard} loading={paying} onClick={handlePayment}>
                Pay ₹ {Number(payAmount).toLocaleString('en-IN')}
              </Button>
            </div>
          }
        >
          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Amount to Pay (₹)</label>
              <input
                type="number"
                className="simp-input"
                min="100"
                max={fees.outstandingFee}
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Max payable balance: ₹ {fees.outstandingFee.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Select Payment Method</label>
              <select
                className="simp-select"
                value={payMode}
                onChange={(e) => setPayMode(e.target.value)}
              >
                <option value="UPI / QR Code">UPI (Google Pay / PhonePe / Paytm)</option>
                <option value="NetBanking (HDFC / SBI / ICICI)">NetBanking (Direct Bank Transfer)</option>
                <option value="Credit / Debit Card">Credit / Debit Card (Visa, RuPay, MasterCard)</option>
              </select>
            </div>

            <div
              style={{
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-gold-subtle)',
                border: '1px solid var(--border-accent)',
                fontSize: '0.78rem',
                color: 'var(--text-primary)'
              }}
            >
              Payment directly credits the official accounts ledger of <strong>HKBK College of Engineering</strong>. An automated stamped receipt is immediately generated upon confirmation.
            </div>
          </form>
        </Modal>
      )}

      {/* Official Fee Receipt Modal (Printable) */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="HKBK College of Engineering – Fee Receipt"
          subtitle={`Receipt No: ${selectedReceipt.receiptNo}`}
          maxWidth="680px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
              <Button variant="gold" icon={Printer} onClick={handlePrintReceipt}>
                Print Receipt
              </Button>
            </div>
          }
        >
          <div
            style={{
              padding: '1.5rem',
              border: '2px solid #0B1E36',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              color: '#0B1E36'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid #0B1E36', paddingBottom: '1rem' }}>
              <img src="/hkbk-crest.svg" alt="" style={{ width: '54px', height: '54px' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>HKBK COLLEGE OF ENGINEERING</div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                  22/1, Nagawara, Manyata Tech Park Road, Bengaluru - 560045, Karnataka
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', marginTop: '0.2rem' }}>
                  OFFICIAL FEE RECEIPT (ACCOUNTS SECTION)
                </div>
              </div>
            </div>

            {/* Receipt Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', padding: '1rem 0', fontSize: '0.82rem', borderBottom: '1px solid #CBD5E1' }}>
              <div><strong>Receipt Number:</strong> {selectedReceipt.receiptNo}</div>
              <div><strong>Transaction Date:</strong> {selectedReceipt.date}</div>
              <div><strong>Student Name:</strong> {studentProfile.name}</div>
              <div><strong>USN:</strong> {studentProfile.usn}</div>
              <div><strong>Degree & Sem:</strong> B.E. (CSE) – 6th Semester</div>
              <div><strong>Payment Mode:</strong> {selectedReceipt.mode}</div>
              <div><strong>Bank Reference:</strong> {selectedReceipt.bankReference}</div>
              <div><strong>Payment Status:</strong> SUCCESSFUL</div>
            </div>

            {/* Paid Amount Box */}
            <div style={{ margin: '1.25rem 0', padding: '1rem', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Particulars</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{selectedReceipt.category}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Amount Paid</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803D' }}>
                  ₹ {selectedReceipt.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Stamp & Seal Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', fontSize: '0.75rem', color: '#475569' }}>
              <div>
                <div>Computer Generated Digital Receipt</div>
                <div>Authorized by HKBK Accounts Section</div>
              </div>
              <div style={{ textAlign: 'center', border: '1.5px dashed #D4AF37', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                <div style={{ fontWeight: 700, color: '#0B1E36' }}>HKBK ACCOUNTS SEC</div>
                <div style={{ color: '#15803D', fontWeight: 800 }}>PAID & VERIFIED</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

