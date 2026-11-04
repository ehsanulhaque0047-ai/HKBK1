import React, { createContext, useContext, useState, useCallback } from 'react';
import { storageService, resetStoredData } from '../services/storageService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Reactive state synced with storageService
  const [collegeInfo, setCollegeInfo] = useState(() => storageService.getCollegeInfo());
  const [studentProfile, setStudentProfile] = useState(() => storageService.getStudentProfile());
  const [attendance, setAttendance] = useState(() => storageService.getAttendance());
  const [timetable, setTimetable] = useState(() => storageService.getTimetable());
  const [subjects, setSubjects] = useState(() => storageService.getSubjects());
  const [assignments, setAssignments] = useState(() => storageService.getAssignments());
  const [examinations, setExaminations] = useState(() => storageService.getExaminations());
  const [fees, setFees] = useState(() => storageService.getFees());
  const [library, setLibrary] = useState(() => storageService.getLibrary());
  const [studyMaterials, setStudyMaterials] = useState(() => storageService.getStudyMaterials());
  const [documentRequests, setDocumentRequests] = useState(() => storageService.getDocumentRequests());
  const [complaints, setComplaints] = useState(() => storageService.getComplaints());
  const [placements, setPlacements] = useState(() => storageService.getPlacements());
  const [announcements, setAnnouncements] = useState(() => storageService.getAnnouncements('all'));
  const [parentMessages, setParentMessages] = useState(() => storageService.getParentMessages());
  const [facultyLeaves, setFacultyLeaves] = useState(() => storageService.getFacultyLeaves());
  const [studentsRoster, setStudentsRoster] = useState(() => storageService.getStudentsRoster());
  const [departments, setDepartments] = useState(() => storageService.getDepartments());

  // Notification Toast Helper
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Action methods
  const updateProfile = (updatedFields) => {
    const updated = storageService.updateStudentProfile(studentProfile.usn, updatedFields);
    if (updated) {
      setStudentProfile({ ...updated });
      showToast('Profile details updated successfully');
    }
  };

  const markAttendanceBatch = (subjectCode, date, records) => {
    const updated = storageService.markAttendanceBatch(subjectCode, date, records);
    setAttendance({ ...updated });
    showToast(`Attendance marked for ${records.length} students`);
  };

  const submitAssignment = (assignmentId, fileName, comments) => {
    const asg = storageService.submitAssignment(assignmentId, fileName, comments);
    setAssignments([...storageService.getAssignments()]);
    showToast(`Assignment "${asg.title}" submitted successfully!`);
    return asg;
  };

  const createAssignment = (newAsg) => {
    const asg = storageService.createAssignment(newAsg);
    setAssignments([...storageService.getAssignments()]);
    showToast(`New assignment "${asg.title}" assigned to class`);
    return asg;
  };

  const gradeAssignment = (assignmentId, marks, feedback) => {
    const asg = storageService.gradeAssignment(assignmentId, marks, feedback);
    setAssignments([...storageService.getAssignments()]);
    showToast(`Grade recorded: ${marks}/${asg.maxMarks}`);
    return asg;
  };

  const updateInternalMarks = (code, ia1, ia2, assignment) => {
    const updated = storageService.updateInternalMarks(code, ia1, ia2, assignment);
    setExaminations({ ...storageService.getExaminations() });
    showToast(`Internal marks updated for ${code}`);
    return updated;
  };

  const payFee = (amount, mode, remarks) => {
    try {
      const tx = storageService.payFee(amount, mode, remarks);
      setFees({ ...storageService.getFees() });
      showToast(`Payment of ₹ ${amount.toLocaleString('en-IN')} successful! Receipt #${tx.receiptNo}`);
      return tx;
    } catch (err) {
      showToast(err.message, 'danger');
      throw err;
    }
  };

  const renewBook = (bookId) => {
    const b = storageService.renewBook(bookId);
    setLibrary({ ...storageService.getLibrary() });
    showToast(`Book renewed: "${b.title}". New due date: ${b.dueDate}`);
  };

  const uploadStudyMaterial = (mat) => {
    const created = storageService.uploadStudyMaterial(mat);
    setStudyMaterials([...storageService.getStudyMaterials()]);
    showToast(`Material "${created.title}" uploaded`);
    return created;
  };

  const requestDocument = (docType, purpose) => {
    const req = storageService.requestDocument(docType, purpose);
    setDocumentRequests([...storageService.getDocumentRequests()]);
    showToast(`Request submitted for ${docType} (Ref: ${req.id})`);
    return req;
  };

  const updateDocumentStatus = (reqId, status, remarks, certNo) => {
    const updated = storageService.updateDocumentStatus(reqId, status, remarks, certNo);
    setDocumentRequests([...storageService.getDocumentRequests()]);
    showToast(`Document request ${reqId} marked as ${status}`);
    return updated;
  };

  const submitComplaint = (cat, title, desc) => {
    const cmp = storageService.submitComplaint(cat, title, desc);
    setComplaints([...storageService.getComplaints()]);
    showToast(`Grievance ticket ${cmp.id} logged successfully`);
    return cmp;
  };

  const respondToComplaint = (id, status, response) => {
    const updated = storageService.respondToComplaint(id, status, response);
    setComplaints([...storageService.getComplaints()]);
    showToast(`Complaint status updated to ${status}`);
    return updated;
  };

  const applyForPlacement = (placementId) => {
    const plc = storageService.applyForPlacement(placementId);
    setPlacements([...storageService.getPlacements()]);
    showToast(`Application submitted to ${plc.company}!`);
    return plc;
  };

  const addAnnouncement = (title, category, desc, targetRole, isUrgent) => {
    const notif = storageService.addAnnouncement(title, category, desc, targetRole, isUrgent);
    setAnnouncements([...storageService.getAnnouncements('all')]);
    showToast(`Announcement published: ${title}`);
    return notif;
  };

  const markAnnouncementRead = (id) => {
    storageService.markAnnouncementRead(id);
    setAnnouncements([...storageService.getAnnouncements('all')]);
  };

  const sendParentMessage = (from, to, subject, message, usn) => {
    const msg = storageService.sendParentMessage(from, to, subject, message, usn);
    setParentMessages([...storageService.getParentMessages()]);
    showToast('Message sent to teacher/mentor');
    return msg;
  };

  const applyFacultyLeave = (leaveData) => {
    const leave = storageService.applyFacultyLeave(leaveData);
    setFacultyLeaves([...storageService.getFacultyLeaves()]);
    showToast('Leave request submitted to Dean Office');
    return leave;
  };

  const resetAllData = () => {
    const defaults = resetStoredData();
    setCollegeInfo(defaults.collegeInfo);
    setStudentProfile(defaults.users[0]);
    setAttendance(defaults.attendance);
    setTimetable(defaults.timetable);
    setSubjects(defaults.subjects);
    setAssignments(defaults.assignments);
    setExaminations(defaults.examinations);
    setFees(defaults.fees);
    setLibrary(defaults.library);
    setStudyMaterials(defaults.studyMaterials);
    setDocumentRequests(defaults.documentRequests);
    setComplaints(defaults.complaints);
    setPlacements(defaults.placements);
    setAnnouncements(defaults.announcements);
    setParentMessages(defaults.parentMessages);
    setFacultyLeaves(defaults.facultyLeaves);
    setStudentsRoster(defaults.studentsRoster);
    setDepartments(defaults.departments);
    showToast('System data reset to default demo values', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        collegeInfo,
        studentProfile,
        attendance,
        timetable,
        subjects,
        assignments,
        examinations,
        fees,
        library,
        studyMaterials,
        documentRequests,
        complaints,
        placements,
        announcements,
        parentMessages,
        facultyLeaves,
        studentsRoster,
        departments,
        toast,
        showToast,
        updateProfile,
        markAttendanceBatch,
        submitAssignment,
        createAssignment,
        gradeAssignment,
        updateInternalMarks,
        payFee,
        renewBook,
        uploadStudyMaterial,
        requestDocument,
        updateDocumentStatus,
        submitComplaint,
        respondToComplaint,
        applyForPlacement,
        addAnnouncement,
        markAnnouncementRead,
        sendParentMessage,
        applyFacultyLeave,
        resetAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
