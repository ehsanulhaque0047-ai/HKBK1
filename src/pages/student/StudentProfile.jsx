import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  GraduationCap,
  Calendar,
  Bus,
  Home,
  Edit3,
  Save,
  CheckCircle2,
  FileCheck,
  Building
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const StudentProfile = () => {
  const { studentProfile, updateProfile } = useData();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: studentProfile.phone || '',
    email: studentProfile.email || '',
    bloodGroup: studentProfile.bloodGroup || 'O+',
    street: studentProfile.address?.street || '',
    locality: studentProfile.address?.locality || '',
    city: studentProfile.address?.city || 'Bengaluru',
    pincode: studentProfile.address?.pincode || '560043',
    emergencyName: studentProfile.emergencyContact?.name || '',
    emergencyPhone: studentProfile.emergencyContact?.phone || ''
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      address: {
        ...studentProfile.address,
        street: formData.street,
        locality: formData.locality,
        city: formData.city,
        pincode: formData.pincode
      },
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: 'Father'
      }
    });
    setIsEditModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Profile Card */}
      <div
        className="simp-card"
        style={{
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '2rem',
          background: 'var(--bg-surface)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: 'var(--radius-xl)',
              objectFit: 'cover',
              border: '3px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <Badge
            variant="gold"
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap'
            }}
          >
            6th Sem CSE
          </Badge>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{studentProfile.name}</h1>
            <span
              className="mono-font"
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                background: 'var(--accent-blue-subtle)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              USN: {studentProfile.usn}
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {studentProfile.course} in {studentProfile.department}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '0.75rem',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={14} color="var(--accent-gold-dark)" />
              {studentProfile.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={14} color="var(--accent-gold-dark)" />
              {studentProfile.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} color="var(--accent-gold-dark)" />
              Bengaluru, Karnataka
            </span>
          </div>
        </div>

        <div>
          <Button
            variant="gold"
            icon={Edit3}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Contact Details
          </Button>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Academic Profile */}
        <Card title="Academic Details & Affiliation" icon={GraduationCap} accent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="simp-label">Institution</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>HKBK College of Engineering</div>
            </div>
            <div>
              <div className="simp-label">Affiliated University</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>VTU Belagavi (2021 Scheme)</div>
            </div>
            <div>
              <div className="simp-label">Department</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.department}</div>
            </div>
            <div>
              <div className="simp-label">Degree & Semester</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.course} – Sem {studentProfile.semester}</div>
            </div>
            <div>
              <div className="simp-label">Section & Batch</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Section {studentProfile.section} (Batch {studentProfile.batch})</div>
            </div>
            <div>
              <div className="simp-label">Quota & Admission</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.quota} ({studentProfile.admissionYear})</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="simp-label">Assigned Faculty Mentor / Proctor</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-blue)' }}>
                {studentProfile.mentor?.name} ({studentProfile.mentor?.designation})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Cabin: {studentProfile.mentor?.cabin} • Email: {studentProfile.mentor?.email}
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Details */}
        <Card title="Personal Information" icon={User} accent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="simp-label">Date of Birth</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.dob} (Age: 21)</div>
            </div>
            <div>
              <div className="simp-label">Gender</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.gender}</div>
            </div>
            <div>
              <div className="simp-label">Blood Group</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--status-danger)' }}>
                {studentProfile.bloodGroup}
              </div>
            </div>
            <div>
              <div className="simp-label">Nationality & Domicile</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Indian (Karnataka State)</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="simp-label">Permanent Residential Address</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem', lineHeight: 1.4 }}>
                {studentProfile.address?.street}, {studentProfile.address?.locality},{' '}
                {studentProfile.address?.city}, {studentProfile.address?.state} - {studentProfile.address?.pincode}
              </div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="simp-label">Emergency Contact</div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--status-danger)' }}>
                {studentProfile.emergencyContact?.name}: {studentProfile.emergencyContact?.phone}
              </div>
            </div>
          </div>
        </Card>

        {/* Parent & Guardian Info */}
        <Card title="Parent / Guardian Information" icon={Heart} accent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="simp-label">Father's Name</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.parent?.fatherName}</div>
            </div>
            <div>
              <div className="simp-label">Mother's Name</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.parent?.motherName}</div>
            </div>
            <div>
              <div className="simp-label">Father's Occupation</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{studentProfile.parent?.occupation}</div>
            </div>
            <div>
              <div className="simp-label">Annual Family Income</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{studentProfile.parent?.annualIncome}</div>
            </div>
            <div>
              <div className="simp-label">Parent Contact Number</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{studentProfile.parent?.phone}</div>
            </div>
            <div>
              <div className="simp-label">Parent Email ID</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{studentProfile.parent?.email}</div>
            </div>
          </div>
        </Card>

        {/* Transport & Campus Accommodation */}
        <Card title="Campus Transport & Hostels" icon={Bus} accent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-muted)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>College Bus Facility</span>
                <Badge variant="success">Active Bus Pass</Badge>
              </div>
              <div style={{ fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--text-secondary)' }}>
                Route: <strong>{studentProfile.transport?.routeNo}</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Pass Number: {studentProfile.transport?.busPassNo}
              </div>
            </div>

            <div
              style={{
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-muted)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Hostel Accommodation</span>
                <Badge variant="info">Day Scholar</Badge>
              </div>
              <div style={{ fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>
                Student commutes daily from HBR Layout / Kalyan Nagar residence.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Contact & Address Information"
        subtitle="Institutional policy requires verified contact info for VTU records"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={Save} onClick={handleEditSubmit}>
              Save Profile Changes
            </Button>
          </div>
        }
      >
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="grid-cols-2">
            <div className="simp-form-group">
              <label className="simp-label">Primary Mobile Phone</label>
              <input
                className="simp-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="simp-form-group">
              <label className="simp-label">Blood Group</label>
              <select
                className="simp-select"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                <option value="O+">O positive (O+)</option>
                <option value="O-">O negative (O-)</option>
                <option value="A+">A positive (A+)</option>
                <option value="A-">A negative (A-)</option>
                <option value="B+">B positive (B+)</option>
                <option value="B-">B negative (B-)</option>
                <option value="AB+">AB positive (AB+)</option>
                <option value="AB-">AB negative (AB-)</option>
              </select>
            </div>
          </div>

          <div className="simp-form-group">
            <label className="simp-label">House / Flat & Street Address</label>
            <input
              className="simp-input"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
            />
          </div>

          <div className="grid-cols-3">
            <div className="simp-form-group">
              <label className="simp-label">Locality / Area</label>
              <input
                className="simp-input"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
              />
            </div>
            <div className="simp-form-group">
              <label className="simp-label">City</label>
              <input
                className="simp-input"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="simp-form-group">
              <label className="simp-label">PIN Code</label>
              <input
                className="simp-input"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-cols-2">
            <div className="simp-form-group">
              <label className="simp-label">Emergency Contact Name</label>
              <input
                className="simp-input"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                required
              />
            </div>
            <div className="simp-form-group">
              <label className="simp-label">Emergency Contact Phone</label>
              <input
                className="simp-input"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

