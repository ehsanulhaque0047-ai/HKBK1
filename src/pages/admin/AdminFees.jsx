import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Download,
  Search,
  DollarSign
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const AdminFees = () => {
  const { fees, payFee } = useData();

  const [collectUsn, setCollectUsn] = useState('1HK21CS042');
  const [collectAmount, setCollectAmount] = useState('10000');

  const handleAdminCollect = (e) => {
    e.preventDefault();
    try {
      payFee(Number(collectAmount), 'Cash / DD (Accounts Section Counter)', 'Administrative Counter Collection');
    } catch (err) {
      // handled by context toast
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Institutional Fee Revenue & Accounts Section</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Tuition, VTU Examination Fees, Laboratory Licenses & College Development Fund Reconciliation.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={CreditCard}
          label="Total Fee Allocated"
          value={`₹ ${fees.totalFee.toLocaleString('en-IN')}`}
          subvalue="Even Semester 2024–25"
          color="navy"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Collected Revenue"
          value={`₹ ${fees.paidFee.toLocaleString('en-IN')}`}
          subvalue="Audited via Banking gateway"
          color="success"
        />
        <StatsCard
          icon={AlertCircle}
          label="Pending Receivables"
          value={`₹ ${fees.outstandingFee.toLocaleString('en-IN')}`}
          subvalue="Due Date: 30-Nov-2024"
          color={fees.outstandingFee > 0 ? 'danger' : 'success'}
        />
        <StatsCard
          icon={Receipt}
          label="Reconciled Receipts"
          value={fees.transactions.length}
          subvalue="Digital & Counter Vouchers"
          color="gold"
        />
      </div>

      {/* 2-Column: Manual Cash/DD Counter Collection & Receipts Ledger */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.5rem' }}>
        {/* Cash Counter Collection Box */}
        <Card title="Accounts Counter Fee Collection" icon={DollarSign} accent>
          <form onSubmit={handleAdminCollect} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Student University Seat No (USN)</label>
              <input
                className="simp-input mono-font"
                value={collectUsn}
                onChange={(e) => setCollectUsn(e.target.value)}
                required
              />
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Amount Received (₹)</label>
              <input
                type="number"
                min="100"
                max={fees.outstandingFee || 50000}
                className="simp-input"
                value={collectAmount}
                onChange={(e) => setCollectAmount(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              disabled={fees.outstandingFee <= 0}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {fees.outstandingFee <= 0 ? 'All Dues Cleared' : 'Record Counter Receipt'}
            </Button>
          </form>
        </Card>

        {/* Transaction Ledger */}
        <Card title="Fee Transactions & Receipts Register" icon={Receipt}>
          <div className="simp-table-container">
            <table className="simp-table">
              <thead>
                <tr>
                  <th>Receipt No</th>
                  <th>Date</th>
                  <th>Mode / Reference</th>
                  <th>Head / Category</th>
                  <th>Amount Paid</th>
                  <th>Audit Status</th>
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
                    <td>
                      <div>{tx.mode}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tx.bankReference}</div>
                    </td>
                    <td>{tx.category}</td>
                    <td style={{ fontWeight: 800 }}>₹ {tx.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <Badge variant="success">Audited ✓</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
