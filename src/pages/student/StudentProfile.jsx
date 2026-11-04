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
  Edit3,
  Save,
  CheckCircle2,
  FileCheck,
  Building,
  Download,
  Award,
  FileText
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
      {/* 1. Profile Hero Card (Desktop: 2-column balanced, Mobile: Clean vertical stack) */}
      <div className="student-profile-hero">
        <div className="student-profile-desktop-grid">
          {/* Left Column: Avatar + Identity + Contact */}
          <div className="student-profile-left-col">
            <div className="student-avatar-container">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="student-avatar-img"
              />
              <span className="student-status-badge">
                ACTIVE
              </span>
            </div>

            <div className="student-identity-text">
              <h1 className="student-name-title">
                {studentProfile.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="student-usn-chip">
                  USN: {studentProfile.usn}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-teal-light)', fontWeight: 600 }}>
                  {studentProfile.course} • Sem {studentProfile.semester}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '0.4rem',
                  fontSize: '0.78rem',
                  color: '#A5B4C7',
                  flexWrap: 'wrap'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={13} color="var(--accent-teal)" />
                  {studentProfile.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Phone size={13} color="var(--accent-teal)" />
                  {studentProfile.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Metadata + Actions */}
          <div className="student-profile-right-col">
            <div className="student-academic-meta-grid">
              <div className="student-meta-item">
                <GraduationCap size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Department: </span>
                  <strong>{studentProfile.department}</strong>
                </span>
              </div>
              <div className="student-meta-item">
                <Calendar size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Semester: </span>
                  <strong>6th Sem (AY 2024–25)</strong>
                </span>
              </div>
              <div className="student-meta-item">
                <Shield size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Mentor: </span>
                  <strong>{studentProfile.mentor?.name}</strong>
                </span>
              </div>
              <div className="student-meta-item">
                <Bus size={15} color="var(--accent-teal)" />
                <span>
                  <span className="student-meta-label">Quota / Bus: </span>
                  <strong>{studentProfile.quota} • Route {studentProfile.transport?.routeNo || '14'}</strong>
                </span>
              </div>
            </div>

            <div className="student-profile-actions">
              <Button
                variant="teal"
                icon={Edit3}
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Contact Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Profile Completion Status Bar */}
      <div
        className="simp-card"
        style={{
          padding: '1.1rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-teal-subtle)',
              border: '1px solid rgba(54, 198, 176, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckCircle2 size={18} color="var(--accent-teal)" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F1F5F9' }}>
              Institutional Profile Completion: 95% Verified
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              All mandatory VTU student data, biometric record, and proctor verification verified.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '120px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '95%',
                height: '100%',
                background: 'var(--accent-teal)',
                borderRadius: 'var(--radius-full)'
              }}
            />
          </div>
          <Badge variant="success">95%</Badge>
        </div>
      </div>

      {/* 3. Balanced Two-Column Details Grid */}
      <div className="grid-cols-2">
        {/* Academic Profile */}
        <Card title="Academic Details & Affiliation" icon={GraduationCap} accent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="simp-label">Institution</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>HKBK College of Engineering</div>
            </div>
            <div>
              <div className="simp-label">Affiliated University</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>VTU Belagavi (2021 Scheme)</div>
            </div>
            <div>
              <div className="simp-label">Department</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.department}</div>
            </div>
            <div>
              <div className="simp-label">Degree & Semester</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.course} – Sem {studentProfile.semester}</div>
            </div>
            <div>
              <div className="simp-label">Section & Batch</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>Section {studentProfile.section} (Batch {studentProfile.batch})</div>
            </div>
            <div>
              <div className="simp-label">Quota & Admission</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.quota} ({studentProfile.admissionYear})</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="simp-label">Assigned Faculty Mentor / Proctor</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-teal)' }}>
                {studentProfile.mentor?.name} ({studentProfile.mentor?.designation})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Cabin: {studentProfile.mentor?.cabin} • Email: {studentProfile.mentor?.email}
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Details */}
        <Card title="Personal Information & Emergency Contact" icon={User} accent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="simp-label">Date of Birth</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.dob} (Age: 21)</div>
            </div>
            <div>
              <div className="simp-label">Gender</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.gender}</div>
            </div>
            <div>
              <div className="simp-label">Blood Group</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--status-danger)' }}>
                {studentProfile.bloodGroup}
              </div>
            </div>
            <div>
              <div className="simp-label">Nationality & Domicile</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>Indian (Karnataka State)</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="simp-label">Permanent Residential Address</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem', lineHeight: 1.4, color: '#A5B4C7' }}>
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
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.parent?.fatherName}</div>
            </div>
            <div>
              <div className="simp-label">Mother's Name</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.parent?.motherName}</div>
            </div>
            <div>
              <div className="simp-label">Father's Occupation</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem', color: '#A5B4C7' }}>{studentProfile.parent?.occupation}</div>
            </div>
            <div>
              <div className="simp-label">Annual Family Income</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem', color: '#A5B4C7' }}>{studentProfile.parent?.annualIncome}</div>
            </div>
            <div>
              <div className="simp-label">Parent Contact Number</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F1F5F9' }}>{studentProfile.parent?.phone}</div>
            </div>
            <div>
              <div className="simp-label">Parent Email ID</div>
              <div style={{ fontWeight: 500, fontSize: '0.88rem', color: '#A5B4C7' }}>{studentProfile.parent?.email}</div>
            </div>
          </div>
        </Card>

        {/* Document Access & Certificates */}
        <Card title="Document Access & Institutional Certificates" icon={FileCheck} accent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#F1F5F9' }}>Bonafide Student Certificate</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified by Registrar • Valid for AY 2024–25</div>
              </div>
              <Button variant="outline" size="sm" icon={Download}>
                Download PDF
              </Button>
            </div>

            <div
              style={{
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#F1F5F9' }}>Semester Grade Card (Sem 5)</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SGPA: 8.85 • Official VTU Transcript</div>
              </div>
              <Button variant="outline" size="sm" icon={Download}>
                Download PDF
              </Button>
            </div>

            <div
              style={{
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#F1F5F9' }}>Digital College Identity Card</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Smart Card ID with QR verification</div>
              </div>
              <Button variant="outline" size="sm" icon={Download}>
                Download PDF
              </Button>
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
            <Button variant="teal" icon={Save} onClick={handleEditSubmit}>
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

export default StudentProfile;
