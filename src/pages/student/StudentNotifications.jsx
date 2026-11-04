import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileText,
  CreditCard,
  Briefcase,
  Search,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const StudentNotifications = () => {
  const { announcements, markAnnouncementRead } = useData();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = announcements.filter((a) => {
    const matchesCat = activeCategory === 'All' || a.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Institutional Notices & Circulars</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Official communications from Principal, Registrar, Controller of Examinations & HODs.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['All', 'Academic', 'Attendance', 'Fees', 'Placement', 'Faculty'].map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((item) => (
          <Card
            key={item.id}
            accent={item.isUrgent}
            style={{
              backgroundColor: item.read ? 'var(--bg-card)' : 'var(--bg-surface)',
              borderLeft: item.isUrgent ? '4px solid #B91C1C' : undefined
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Badge variant={item.isUrgent ? 'danger' : 'gold'}>
                    {item.category}
                  </Badge>
                  {item.isUrgent && (
                    <Badge variant="warning" icon={AlertTriangle}>
                      Urgent Action Required
                    </Badge>
                  )}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    • Published on {item.date}
                  </span>
                </div>

                <div>
                  {!item.read ? (
                    <Button
                      variant="subtle"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => markAnnouncementRead(item.id)}
                    >
                      Mark as Read
                    </Button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read ✓</span>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

