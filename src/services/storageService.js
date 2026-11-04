import { INITIAL_MOCK_DATA } from '../data/mockData';

const STORAGE_KEY = 'hkbk_simp_data_v1';
const CURRENT_USER_KEY = 'hkbk_current_user';
const THEME_KEY = 'hkbk_theme_mode';

// Initialize storage with fresh mock data if empty or corrupted
export const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_DATA));
      return INITIAL_MOCK_DATA;
    }
    const parsed = JSON.parse(raw);
    // Ensure studentsRoster has fee attributes
    if (parsed.studentsRoster && !parsed.studentsRoster[0]?.totalFee) {
      parsed.studentsRoster = INITIAL_MOCK_DATA.studentsRoster;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.error('Failed reading localStorage, re-initializing with mock data', err);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_DATA));
    return INITIAL_MOCK_DATA;
  }
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed writing to localStorage', err);
  }
};

export const resetStoredData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_DATA));
  return INITIAL_MOCK_DATA;
};

// --- SPRING BOOT REST SERVICE CONFIGURATION ---
// Configurable backend API URL through Vite environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const storageService = {
  // Current logged in user session
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  getTheme: () => {
    return localStorage.getItem(THEME_KEY) || 'light';
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme);
  },

  // Auth login simulation
  login: async (username, password, role) => {
    const data = getStoredData();
    const user = data.users.find(
      (u) =>
        u.username.toLowerCase() === username.trim().toLowerCase() &&
        u.password === password &&
        u.role === role
    );
    if (!user) {
      // Demo fallback: check if user matches role for easy testing
      const roleDefault = data.users.find((u) => u.role === role);
      if (roleDefault && (password === 'password123' || password === 'admin' || password === 'demo')) {
        storageService.setCurrentUser(roleDefault);
        return { success: true, user: roleDefault };
      }
      throw new Error('Invalid credentials or role mismatch. Please use demo credentials.');
    }
    storageService.setCurrentUser(user);
    return { success: true, user };
  },

  // Student Profile
  getStudentProfile: (usn = '1HK21CS042') => {
    const data = getStoredData();
    return data.users.find((u) => u.role === 'student' && (u.usn === usn || !usn)) || data.users[0];
  },

  updateStudentProfile: (usn, updatedFields) => {
    const data = getStoredData();
    const userIndex = data.users.findIndex((u) => u.usn === usn);
    if (userIndex !== -1) {
      data.users[userIndex] = {
        ...data.users[userIndex],
        ...updatedFields,
        address: { ...data.users[userIndex].address, ...(updatedFields.address || {}) },
        emergencyContact: { ...data.users[userIndex].emergencyContact, ...(updatedFields.emergencyContact || {}) }
      };
      saveStoredData(data);
      // update current user in session if it's the student
      const cur = storageService.getCurrentUser();
      if (cur && cur.usn === usn) {
        storageService.setCurrentUser(data.users[userIndex]);
      }
      return data.users[userIndex];
    }
    return null;
  },

  // Attendance
  getAttendance: () => {
    const data = getStoredData();
    return data.attendance;
  },

  markAttendanceBatch: (subjectCode, date, records) => {
    const data = getStoredData();
    const subject = data.attendance.subjects.find((s) => s.subjectCode === subjectCode);
    if (subject) {
      // update student Syed Rayan's record if included
      const studentRec = records.find((r) => r.usn === '1HK21CS042');
      if (studentRec) {
        subject.total += 1;
        if (studentRec.status === 'Present') {
          subject.attended += 1;
        }
        subject.percentage = parseFloat(((subject.attended / subject.total) * 100).toFixed(1));
        subject.status = subject.percentage >= 75 ? 'Good' : 'Borderline';
        subject.history.unshift({
          date: date || new Date().toISOString().split('T')[0],
          status: studentRec.status,
          topic: studentRec.topic || 'Regular Class'
        });
      }
      // Recompute overall
      const totalAll = data.attendance.subjects.reduce((sum, s) => sum + s.total, 0);
      const attendedAll = data.attendance.subjects.reduce((sum, s) => sum + s.attended, 0);
      data.attendance.totalClassesConducted = totalAll;
      data.attendance.totalClassesAttended = attendedAll;
      data.attendance.overallPercentage = parseFloat(((attendedAll / totalAll) * 100).toFixed(1));
      saveStoredData(data);
    }
    return data.attendance;
  },

  // Timetable
  getTimetable: () => {
    const data = getStoredData();
    return data.timetable;
  },

  // Subjects & Syllabus
  getSubjects: () => {
    const data = getStoredData();
    return data.subjects;
  },

  // Assignments
  getAssignments: () => {
    const data = getStoredData();
    return data.assignments;
  },

  submitAssignment: (assignmentId, fileName, comments = '') => {
    const data = getStoredData();
    const asg = data.assignments.find((a) => a.id === assignmentId);
    if (asg) {
      asg.status = 'Submitted';
      asg.submittedFile = fileName || '1HK21CS042_Assignment_Submission.pdf';
      asg.submissionDate = new Date().toISOString();
      asg.studentComments = comments;
      saveStoredData(data);
      return asg;
    }
    return null;
  },

  createAssignment: (newAsg) => {
    const data = getStoredData();
    const created = {
      id: `asg-${Date.now().toString().slice(-4)}`,
      status: 'Pending',
      submittedFile: null,
      submissionDate: null,
      marksObtained: null,
      facultyFeedback: null,
      attachments: ['HKBK_Assignment_Guidelines.pdf'],
      ...newAsg
    };
    data.assignments.unshift(created);
    saveStoredData(data);
    return created;
  },

  gradeAssignment: (assignmentId, marksObtained, facultyFeedback) => {
    const data = getStoredData();
    const asg = data.assignments.find((a) => a.id === assignmentId);
    if (asg) {
      asg.status = 'Evaluated';
      asg.marksObtained = parseFloat(marksObtained);
      asg.facultyFeedback = facultyFeedback;
      saveStoredData(data);
      return asg;
    }
    return null;
  },

  // Examinations
  getExaminations: () => {
    const data = getStoredData();
    return data.examinations;
  },

  updateInternalMarks: (subjectCode, ia1, ia2, assignment) => {
    const data = getStoredData();
    const sub = data.examinations.internalMarks.find((s) => s.code === subjectCode);
    if (sub) {
      if (ia1 !== undefined) sub.ia1 = Number(ia1);
      if (ia2 !== undefined) sub.ia2 = Number(ia2);
      if (assignment !== undefined) sub.assignment = Number(assignment);
      const validIAs = [sub.ia1, sub.ia2].filter((m) => m !== null && m !== undefined);
      sub.avgIa = validIAs.length ? parseFloat((validIAs.reduce((a, b) => a + b, 0) / validIAs.length).toFixed(1)) : 0;
      sub.totalInternal = parseFloat((sub.avgIa + (sub.assignment || 0)).toFixed(1));
      saveStoredData(data);
      return sub;
    }
    return null;
  },

  // Fees
  getFees: () => {
    const data = getStoredData();
    return data.fees;
  },

  payFee: (amount, paymentMode = 'UPI / NetBanking', remarks = 'Online Portal Payment', usn = '1HK21CS042') => {
    const data = getStoredData();
    const amt = Number(amount);
    if (amt <= 0) throw new Error('Enter valid payment amount.');

    // Find student in roster if exists
    const student = data.studentsRoster?.find((s) => s.usn === usn);
    const maxBalance = student ? student.feeBalance : data.fees.outstandingFee;

    if (amt > maxBalance && maxBalance > 0) {
      throw new Error(`Amount exceeds total outstanding balance of ₹ ${maxBalance.toLocaleString('en-IN')}`);
    }

    const receiptNo = `HKBK/REC/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`;
    const newTx = {
      receiptNo,
      date: new Date().toISOString().split('T')[0],
      amount: amt,
      mode: paymentMode,
      bankReference: `TXN${Date.now().toString().slice(-8)}`,
      category: 'Tuition / College Fee Installment',
      status: 'Success',
      remarks,
      studentUsn: usn,
      studentName: student ? student.name : 'Syed Rayan Ahmed'
    };

    // Update individual student in roster
    if (student) {
      student.paidFee = (student.paidFee || 0) + amt;
      student.feeBalance = Math.max(0, (student.feeBalance || 0) - amt);
      student.feeStatus = student.feeBalance === 0 ? 'Cleared' : 'Balance Due';
    }

    // If it's the primary demo student Rayan, also update global fee stats
    if (usn === '1HK21CS042') {
      data.fees.paidFee += amt;
      data.fees.outstandingFee = Math.max(0, data.fees.outstandingFee - amt);
      if (data.fees.outstandingFee === 0) {
        data.fees.status = 'Fully Cleared';
      }
      data.fees.transactions.unshift(newTx);
    }

    saveStoredData(data);
    return newTx;
  },

  // Library
  getLibrary: () => {
    const data = getStoredData();
    return data.library;
  },

  renewBook: (bookId) => {
    const data = getStoredData();
    const book = data.library.issuedBooks.find((b) => b.id === bookId);
    if (book) {
      const currentDue = new Date(book.dueDate);
      currentDue.setDate(currentDue.getDate() + 14);
      book.dueDate = currentDue.toISOString().split('T')[0];
      book.renewCount = (book.renewCount || 0) + 1;
      saveStoredData(data);
      return book;
    }
    return null;
  },

  // Study Materials
  getStudyMaterials: () => {
    const data = getStoredData();
    return data.studyMaterials;
  },

  uploadStudyMaterial: (material) => {
    const data = getStoredData();
    const created = {
      id: `mat-${Date.now().toString().slice(-4)}`,
      downloads: 1,
      uploadedDate: new Date().toISOString().split('T')[0],
      ...material
    };
    data.studyMaterials.unshift(created);
    saveStoredData(data);
    return created;
  },

  // Documents
  getDocumentRequests: () => {
    const data = getStoredData();
    return data.documentRequests;
  },

  requestDocument: (docType, purpose) => {
    const data = getStoredData();
    const newReq = {
      id: `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      studentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      docType,
      purpose,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Submitted & Under Review",
      adminRemarks: "Application received. Verification in progress with Academic Section.",
      completedDate: null,
      certificateNo: null,
      downloadReady: false
    };
    data.documentRequests.unshift(newReq);
    saveStoredData(data);
    return newReq;
  },

  updateDocumentStatus: (reqId, status, remarks, certificateNo) => {
    const data = getStoredData();
    const req = data.documentRequests.find((r) => r.id === reqId);
    if (req) {
      req.status = status;
      req.adminRemarks = remarks;
      if (status.includes('Approved') || status.includes('Ready')) {
        req.downloadReady = true;
        req.completedDate = new Date().toISOString().split('T')[0];
        req.certificateNo = certificateNo || `HKBK/CERT/${Math.floor(1000 + Math.random() * 9000)}`;
      }
      saveStoredData(data);
      return req;
    }
    return null;
  },

  // Grievances / Complaints
  getComplaints: () => {
    const data = getStoredData();
    return data.complaints;
  },

  submitComplaint: (category, title, description) => {
    const data = getStoredData();
    const newCmp = {
      id: `CMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      studentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      category,
      title,
      description,
      submittedDate: new Date().toISOString().split('T')[0],
      status: "Open",
      adminResponse: "Grievance registered. Assigned to respective department head for review.",
      resolvedDate: null
    };
    data.complaints.unshift(newCmp);
    saveStoredData(data);
    return newCmp;
  },

  respondToComplaint: (cmpId, status, responseText) => {
    const data = getStoredData();
    const cmp = data.complaints.find((c) => c.id === cmpId);
    if (cmp) {
      cmp.status = status;
      cmp.adminResponse = responseText;
      if (status === 'Resolved') {
        cmp.resolvedDate = new Date().toISOString().split('T')[0];
      }
      saveStoredData(data);
      return cmp;
    }
    return null;
  },

  // Placements
  getPlacements: () => {
    const data = getStoredData();
    return data.placements;
  },

  applyForPlacement: (placementId) => {
    const data = getStoredData();
    const plc = data.placements.find((p) => p.id === placementId);
    if (plc) {
      plc.hasApplied = true;
      plc.applicationStatus = "Application Submitted & Resume Under Review";
      saveStoredData(data);
      return plc;
    }
    return null;
  },

  // Announcements
  getAnnouncements: (role = 'all') => {
    const data = getStoredData();
    if (role === 'all') return data.announcements;
    return data.announcements.filter(
      (a) => a.targetRole === 'all' || a.targetRole === role
    );
  },

  addAnnouncement: (title, category, description, targetRole = 'all', isUrgent = false) => {
    const data = getStoredData();
    const newNotif = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      category,
      title,
      description,
      targetRole,
      date: new Date().toISOString().split('T')[0],
      isUrgent,
      read: false
    };
    data.announcements.unshift(newNotif);
    saveStoredData(data);
    return newNotif;
  },

  markAnnouncementRead: (id) => {
    const data = getStoredData();
    const notif = data.announcements.find((a) => a.id === id);
    if (notif) {
      notif.read = true;
      saveStoredData(data);
    }
  },

  // Parent Messages
  getParentMessages: () => {
    const data = getStoredData();
    return data.parentMessages;
  },

  sendParentMessage: (from, to, subject, message, studentUsn = '1HK21CS042') => {
    const data = getStoredData();
    const newMsg = {
      id: `PT-${Date.now().toString().slice(-4)}`,
      from,
      to,
      studentUsn,
      date: new Date().toISOString().split('T')[0],
      subject,
      message,
      status: "Sent"
    };
    data.parentMessages.push(newMsg);
    saveStoredData(data);
    return newMsg;
  },

  // Faculty Leaves
  getFacultyLeaves: () => {
    const data = getStoredData();
    return data.facultyLeaves;
  },

  applyFacultyLeave: (leaveData) => {
    const data = getStoredData();
    const newLeave = {
      id: `LV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      facultyId: "fac-001",
      facultyName: "Dr. A. K. Manjunath",
      status: "Pending Approval",
      appliedOn: new Date().toISOString().split('T')[0],
      ...leaveData
    };
    data.facultyLeaves.unshift(newLeave);
    saveStoredData(data);
    return newLeave;
  },

  // Admin Data Roster & Departments
  getStudentsRoster: () => {
    const data = getStoredData();
    return data.studentsRoster;
  },

  getDepartments: () => {
    const data = getStoredData();
    return data.departments;
  },

  getCollegeInfo: () => {
    const data = getStoredData();
    return data.collegeInfo;
  }
};

