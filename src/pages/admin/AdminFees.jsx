import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Download,
  Search,
  DollarSign,
  User,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';
import { Modal } from '../../components/common/Modal';

export const AdminFees = () => {
  const { studentsRoster, fees, payFee } = useData();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // All, BalanceDue, Cleared
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMode, setPayMode] = useState('Cash (Accounts Counter)');
  const [remarks, setRemarks] = useState('Administrative Counter Payment');

  const filteredStudents = studentsRoster.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.usn.toLowerCase().includes(search.toLowerCase());
    if (filter === 'BalanceDue') return matchesSearch && (s.feeBalance || 0) > 0;
    if (filter === 'Cleared') return matchesSearch && (s.feeBalance || 0) === 0;
    return matchesSearch;
  });

  const studentsWithBalance = studentsRoster.filter((s) => (s.feeBalance || 0) > 0);
  const clearedStudents = studentsRoster.filter((s) => (s.feeBalance || 0) === 0);

  const handleOpenCollect = (student) => {
    setSelectedStudent(student);
    setPayAmount(student.feeBalance || 10000);
    setRemarks(`Fee payment for ${student.name} (${student.usn})`);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!selectedStudent || !payAmount) return;
    try {
      payFee(Number(payAmount), payMode, remarks, selectedStudent.usn);
      setSelectedStudent(null);
    } catch (err) {
      // Error handled by context toast
    }
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Fee Balances & Accounts Section</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage individual student fee accounts, verify balances, and record payments.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant={filter === 'All' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('All')}
          >
            All Students ({studentsRoster.length})
          </Button>
          <Button
            variant={filter === 'BalanceDue' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('BalanceDue')}
          >
            Balance Due ({studentsWithBalance.length})
          </Button>
          <Button
            variant={filter === 'Cleared' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('Cleared')}
          >
            Fully Cleared ({clearedStudents.length})
          </Button>
        </div>
      </div>

      {/* Account Overview Stats (Student account counts - NO aggregate pending fee collection) */}
      <div className="grid-cols-4">
        <StatsCard
          icon={User}
          label="Total Student Accounts"
          value={studentsRoster.length}
          subvalue="6th Sem CSE Section A"
          color="navy"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Fully Cleared Accounts"
          value={clearedStudents.length}
          subvalue="Zero balance students"
          color="success"
        />
        <StatsCard
          icon={AlertCircle}
          label="Accounts with Balance"
          value={studentsWithBalance.length}
          subvalue="Pending individual dues"
          color="warning"
        />
        <StatsCard
          icon={Receipt}
          label="Reconciled Receipts"
          value={fees.transactions.length}
          subvalue="Digital & Counter Vouchers"
          color="gold"
        />
      </div>

      {/* Each Student's Fee Balance Table */}
      <Card
        title="Each Student's Fee Structure & Outstanding Balance"
        subtitle="Individual course fee accounts, amount paid, and current fee balance"
        icon={CreditCard}
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
                <th>Student USN</th>
                <th>Student Name</th>
                <th>Class & Sec</th>
                <th>Total Course Fee (₹)</th>
                <th>Amount Paid (₹)</th>
                <th>Individual Fee Balance (₹)</th>
                <th>Fee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((std) => {
                const balance = std.feeBalance || 0;
                const isCleared = balance === 0;

                return (
                  <tr key={std.usn}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {std.usn}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{std.name}</td>
                    <td>B.E. CSE – {std.sem}th Sem ({std.sec})</td>
                    <td style={{ fontWeight: 600 }}>
                      ₹ {(std.totalFee || 118500).toLocaleString('en-IN')}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--status-success)' }}>
                      ₹ {(std.paidFee || 0).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          fontFamily: 'var(--font-mono)',
                          color: isCleared ? 'var(--status-success)' : 'var(--status-danger)'
                        }}
                      >
                        ₹ {balance.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td>
                      {isCleared ? (
                        <Badge variant="success" icon={CheckCircle2}>
                          Cleared
                        </Badge>
                      ) : (
                        <Badge variant="warning" icon={AlertCircle}>
                          Balance Due
                        </Badge>
                      )}
                    </td>
                    <td>
                      {!isCleared ? (
                        <Button
                          variant="gold"
                          size="sm"
                          icon={DollarSign}
                          onClick={() => handleOpenCollect(std)}
                        >
                          Record Payment
                        </Button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          No Balance
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Payments Ledger */}
      <Card title="Recent Student Fee Transactions & Receipts" icon={Receipt}>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Date</th>
                <th>Student USN / Name</th>
                <th>Payment Mode</th>
                <th>Amount Paid</th>
                <th>Transaction Reference</th>
                <th>Status</th>
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
                    <div style={{ fontWeight: 700 }}>{tx.studentName || 'Syed Rayan Ahmed'}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {tx.studentUsn || '1HK21CS042'}
                    </div>
                  </td>
                  <td>{tx.mode}</td>
                  <td style={{ fontWeight: 800 }}>₹ {tx.amount.toLocaleString('en-IN')}</td>
                  <td className="mono-font" style={{ fontSize: '0.75rem' }}>{tx.bankReference}</td>
                  <td>
                    <Badge variant="success">Cleared ✓</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Collect / Record Payment Modal for Selected Student */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Record Fee Payment: ${selectedStudent.name}`}
          subtitle={`USN: ${selectedStudent.usn} | Current Fee Balance: ₹ ${(selectedStudent.feeBalance || 0).toLocaleString('en-IN')}`}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                Cancel
              </Button>
              <Button variant="gold" icon={CheckCircle2} onClick={handleRecordPayment}>
                Confirm & Record ₹ {Number(payAmount).toLocaleString('en-IN')}
              </Button>
            </div>
          }
        >
          <form onSubmit={handleRecordPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-muted)',
                border: '1px solid var(--border-light)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.82rem'
              }}
            >
              <div>Total Allocated Fee: <strong>₹ {(selectedStudent.totalFee || 118500).toLocaleString('en-IN')}</strong></div>
              <div>Already Paid: <strong style={{ color: 'var(--status-success)' }}>₹ {(selectedStudent.paidFee || 0).toLocaleString('en-IN')}</strong></div>
              <div style={{ gridColumn: 'span 2' }}>
                Current Outstanding Balance: <strong style={{ color: 'var(--status-danger)', fontSize: '0.95rem' }}>₹ {(selectedStudent.feeBalance || 0).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Payment Amount (₹)</label>
              <input
                type="number"
                min="100"
                max={selectedStudent.feeBalance}
                className="simp-input"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                required
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Max payable balance for this student: ₹ {(selectedStudent.feeBalance || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Payment Mode</label>
              <select
                className="simp-select"
                value={payMode}
                onChange={(e) => setPayMode(e.target.value)}
              >
                <option value="Cash (Accounts Counter)">Cash (Accounts Section Counter)</option>
                <option value="Demand Draft (DD) / Cheque">Demand Draft (DD) / Bank Cheque</option>
                <option value="Bank NEFT / RTGS Transfer">Direct Bank NEFT / RTGS Transfer</option>
                <option value="Online Payment Gateway (UPI)">Online Payment Gateway (UPI / Card)</option>
              </select>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Administrative Remarks / Reference</label>
              <input
                className="simp-input"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
