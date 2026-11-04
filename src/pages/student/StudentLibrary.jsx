import React, { useState } from 'react';
import {
  Library,
  Book,
  Calendar,
  RotateCw,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bookmark
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatsCard } from '../../components/common/StatsCard';

export const StudentLibrary = () => {
  const { library, renewBook } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('issued'); // 'issued', 'history', 'catalog'

  const demoCatalog = [
    { title: "Introduction to Algorithms (CLRS 4th Ed)", author: "Cormen, Leiserson, Rivest, Stein", status: "Available", rack: "Rack CS-04" },
    { title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", status: "Available", rack: "Rack CS-02" },
    { title: "Artificial Intelligence: A Modern Approach (4th Ed)", author: "Stuart Russell, Peter Norvig", status: "Issued Out", rack: "Rack AI-01" },
    { title: "Database System Concepts (7th Ed)", author: "Silberschatz, Korth, Sudarshan", status: "Available", rack: "Rack DB-03" }
  ];

  const filteredCatalog = demoCatalog.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Central Library & Digital E-Consortium</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          HKBK Central Library | Library Card: <strong>{library.cardNo}</strong> | VTU Consortium Access
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid-cols-4">
        <StatsCard
          icon={Book}
          label="Active Issued Books"
          value={`${library.issuedBooks.length} / ${library.maxAllowed}`}
          subvalue="Quota: 4 Books max"
          color="navy"
        />
        <StatsCard
          icon={Clock}
          label="Overdue Fines"
          value={`₹ ${library.totalFineDue}.00`}
          subvalue="Good Standing (No fine)"
          color="success"
        />
        <StatsCard
          icon={Bookmark}
          label="Lifetime Borrowed"
          value={library.totalBorrowedAllTime}
          subvalue="Circulation records"
          color="gold"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Digital Access"
          value="Active"
          subvalue="IEEE Xplore & DELNET"
          color="success"
        />
      </div>

      {/* Tabs */}
      <div className="simp-tabs">
        <button
          className={`simp-tab-btn ${activeTab === 'issued' ? 'active' : ''}`}
          onClick={() => setActiveTab('issued')}
        >
          Currently Issued Books ({library.issuedBooks.length})
        </button>
        <button
          className={`simp-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveTab('catalog')}
        >
          Search Library Catalog (OPAC)
        </button>
        <button
          className={`simp-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Past Borrowing History
        </button>
      </div>

      {/* TAB 1: ISSUED BOOKS */}
      {activeTab === 'issued' && (
        <Card title="Active Circulations" icon={Book} accent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {library.issuedBooks.map((book) => (
              <div
                key={book.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-muted)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className="mono-font" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {book.accessionNo}
                    </span>
                    <Badge variant="info">Due: {book.dueDate}</Badge>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.3rem', color: 'var(--text-primary)' }}>
                    {book.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Author: {book.author} • ISBN: {book.isbn}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                    Issued on: <strong>{book.issueDate}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={RotateCw}
                    onClick={() => renewBook(book.id)}
                  >
                    Renew Book (+14 Days)
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Renewal Policy: Books can be renewed online up to 2 times provided there are no active reservation holds by other students or faculty.
          </div>
        </Card>
      )}

      {/* TAB 2: SEARCH OPAC CATALOG */}
      {activeTab === 'catalog' && (
        <Card
          title="Online Public Access Catalog (OPAC)"
          icon={Search}
          action={
            <div style={{ position: 'relative', width: '260px' }}>
              <Search
                size={14}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search title, author, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="simp-input"
                style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.82rem' }}
              />
            </div>
          }
        >
          <div className="simp-table-container">
            <table className="simp-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author(s)</th>
                  <th>Shelf Location</th>
                  <th>Circulation Status</th>
                  <th>Reservation</th>
                </tr>
              </thead>
              <tbody>
                {filteredCatalog.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{item.title}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{item.author}</td>
                    <td style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{item.rack}</td>
                    <td>
                      <Badge variant={item.status === 'Available' ? 'success' : 'warning'}>
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="subtle"
                        size="sm"
                        disabled={item.status !== 'Available'}
                        onClick={() => alert(`Reserved "${item.title}". Please collect from library counter within 24 hours.`)}
                      >
                        Reserve
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: BORROWING HISTORY */}
      {activeTab === 'history' && (
        <Card title="Past Circulation History" icon={Clock}>
          <div className="simp-table-container">
            <table className="simp-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Returned On</th>
                  <th>Fine Incurred</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {library.history.map((h, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{h.title}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{h.author}</td>
                    <td>{h.returnDate}</td>
                    <td style={{ fontWeight: 600 }}>₹ {h.finePaid}.00</td>
                    <td>
                      <Badge variant="success">Returned</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
