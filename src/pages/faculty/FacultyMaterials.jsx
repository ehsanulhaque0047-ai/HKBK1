import React, { useState } from 'react';
import {
  FolderUp,
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyMaterials = () => {
  const { studyMaterials, uploadStudyMaterial } = useData();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [subjectCode, setSubjectCode] = useState('21CS61');
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('3.2 MB');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    uploadStudyMaterial({
      subjectCode,
      title,
      type: 'PDF',
      size,
      uploadedBy: 'Dr. A. K. Manjunath',
      fileUrl: `${subjectCode.toLowerCase()}_notes.pdf`
    });
    setIsUploadModalOpen(false);
    setTitle('');
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Notes & Study Materials Repository</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Publish lecture slides, lab manuals, sample code, and question banks for students.
          </p>
        </div>

        <Button
          variant="gold"
          icon={FolderUp}
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload New Material
        </Button>
      </div>

      {/* Uploaded Materials Table */}
      <Card title="Published Academic Materials" icon={FileText} accent>
        <div className="simp-table-container">
          <table className="simp-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Document Title</th>
                <th>Type</th>
                <th>File Size</th>
                <th>Upload Date</th>
                <th>Student Downloads</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studyMaterials.map((mat) => (
                <tr key={mat.id}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {mat.subjectCode}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{mat.title}</td>
                  <td>
                    <Badge variant="danger">{mat.type}</Badge>
                  </td>
                  <td>{mat.size}</td>
                  <td>{mat.uploadedDate}</td>
                  <td style={{ fontWeight: 600 }}>{mat.downloads} downloads</td>
                  <td>
                    <Button
                      variant="subtle"
                      size="sm"
                      icon={Download}
                      onClick={() => alert(`Simulating download of ${mat.title}`)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Course Study Material"
          subtitle="Materials will be instantly accessible to enrolled students via SIMP"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" icon={Upload} onClick={handleSubmit}>
                Publish Document
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="simp-form-group">
              <label className="simp-label">Course Code</label>
              <select
                className="simp-select"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              >
                <option value="21CS61">21CS61 – System Software & Compilers</option>
                <option value="21CS62">21CS62 – Computer Networks & Security</option>
                <option value="21CSL66">21CSL66 – System Software Lab</option>
              </select>
            </div>

            <div className="simp-form-group">
              <label className="simp-label">Document Title / Chapter Name</label>
              <input
                className="simp-input"
                placeholder="e.g. Module 4: YACC Grammar Specification Handout"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                border: '2px dashed var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-muted)'
              }}
            >
              <Upload size={28} color="var(--accent-gold-dark)" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Select PDF or Document to Upload</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max file size: 50 MB</div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
