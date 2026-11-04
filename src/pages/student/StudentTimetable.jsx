import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Printer,
  MapPin,
  User,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const StudentTimetable = () => {
  const { timetable, studentProfile } = useData();

  const [activeDay, setActiveDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('weekly'); // 'weekly' or 'daily'

  const handlePrint = () => {
    window.print();
  };

  const scheduleSlots = timetable.slots;
  const currentDayClasses = timetable.schedule[activeDay] || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header with Title and Mode Switcher */}
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Class & Laboratory Timetable</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Department of {studentProfile.department} | 6th Semester Section A | Academic Year 2024–25
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div
            style={{
              background: 'var(--bg-subtle)',
              padding: '0.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              gap: '0.25rem'
            }}
          >
            <Button
              variant={viewMode === 'weekly' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('weekly')}
            >
              Weekly Master Grid
            </Button>
            <Button
              variant={viewMode === 'daily' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('daily')}
            >
              Daily Schedule View
            </Button>
          </div>

          <Button variant="gold" size="sm" icon={Printer} onClick={handlePrint}>
            Print Timetable
          </Button>
        </div>
      </div>

      {/* Official College Header for Print */}
      <div className="print-only" style={{ display: 'none', marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>HKBK COLLEGE OF ENGINEERING, BENGALURU</h2>
        <p style={{ fontSize: '0.9rem' }}>Department of Computer Science & Engineering – Class Timetable (Even Sem 2024–25)</p>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>Student: {studentProfile.name} (USN: {studentProfile.usn}) | Classroom: Block AB-304</p>
      </div>

      {/* View Mode: WEEKLY MASTER GRID */}
      {viewMode === 'weekly' ? (
        <Card title="Weekly Master Timetable (6th Sem CSE - A)" icon={CalendarDays}>
          <div className="simp-table-container">
            <table className="simp-table" style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ width: '110px', textAlign: 'left' }}>Day / Period</th>
                  {scheduleSlots.map((slot) => (
                    <th key={slot.id} style={{ minWidth: '150px' }}>
                      <div>Period {slot.period}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {slot.time}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.weekdays.map((day) => {
                  const dayEvents = timetable.schedule[day] || [];
                  return (
                    <tr key={day}>
                      <td
                        style={{
                          textAlign: 'left',
                          fontWeight: 700,
                          backgroundColor: 'var(--bg-muted)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {day}
                      </td>
                      {scheduleSlots.map((slot) => {
                        const event = dayEvents.find((e) => e.period === slot.id);
                        if (!event) {
                          return (
                            <td key={slot.id} style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                              —
                            </td>
                          );
                        }

                        const isLab = event.type === 'Lab';
                        const isPlacement = event.type === 'Placement';

                        return (
                          <td
                            key={slot.id}
                            style={{
                              padding: '0.65rem 0.5rem',
                              backgroundColor: isLab
                                ? 'rgba(29, 99, 184, 0.08)'
                                : isPlacement
                                ? 'rgba(197, 160, 89, 0.1)'
                                : 'transparent'
                            }}
                          >
                            <div
                              style={{
                                display: 'inline-block',
                                padding: '0.15rem 0.4rem',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                color: isLab ? 'var(--accent-blue)' : 'var(--text-gold)',
                                background: 'var(--bg-subtle)'
                              }}
                            >
                              {event.code}
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '0.82rem', marginTop: '0.2rem' }}>
                              {event.subject}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                              {event.faculty}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                              📍 {event.room}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* View Mode: DAILY SCHEDULE */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Day selection tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.25rem'
            }}
          >
            {timetable.weekdays.map((day) => (
              <Button
                key={day}
                variant={activeDay === day ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>

          <Card title={`Schedule for ${activeDay}`} icon={Clock}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentDayClasses.map((item, idx) => {
                const slot = scheduleSlots.find((s) => s.id === item.period);
                const isLab = item.type === 'Lab';

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr auto',
                      alignItems: 'center',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-muted)',
                      border: '1px solid var(--border-light)',
                      borderLeft: isLab ? '4px solid #1D63B8' : '4px solid var(--accent-gold)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        Period {item.period} {item.span && `(to ${item.period + item.span - 1})`}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {slot ? slot.time : '02:00 PM - 04:00 PM'}
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '0.82rem' }}>
                          {item.code}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {item.subject}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <User size={13} />
                          {item.faculty}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={13} color="var(--accent-gold-dark)" />
                          Room / Lab: <strong>{item.room}</strong>
                        </span>
                      </div>
                    </div>

                    <div>
                      <Badge variant={isLab ? 'navy' : 'gold'}>
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Classrooms and Laboratories Reference */}
      <div className="grid-cols-3">
        <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Lectures Classroom</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Room AB-304 (Main Academic Block, 3rd Floor)
          </div>
        </div>
        <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Turing Laboratory</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Room AB-102 (System Software & Compiler Lab)
          </div>
        </div>
        <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Ada Lovelace Lab</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Room AB-104 (Networks & Cybersecurity Simulation Lab)
          </div>
        </div>
      </div>
    </div>
  );
};
