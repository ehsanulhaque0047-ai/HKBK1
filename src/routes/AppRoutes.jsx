import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Auth Page
import { LoginPage } from '../pages/auth/LoginPage';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentProfile } from '../pages/student/StudentProfile';
import { StudentAttendance } from '../pages/student/StudentAttendance';
import { StudentTimetable } from '../pages/student/StudentTimetable';
import { StudentAcademics } from '../pages/student/StudentAcademics';
import { StudentAssignments } from '../pages/student/StudentAssignments';
import { StudentExams } from '../pages/student/StudentExams';
import { StudentFees } from '../pages/student/StudentFees';
import { StudentLibrary } from '../pages/student/StudentLibrary';
import { StudentDocuments } from '../pages/student/StudentDocuments';
import { StudentComplaints } from '../pages/student/StudentComplaints';
import { StudentPlacements } from '../pages/student/StudentPlacements';
import { StudentNotifications } from '../pages/student/StudentNotifications';

// Faculty Pages
import { FacultyDashboard } from '../pages/faculty/FacultyDashboard';
import { FacultyAttendance } from '../pages/faculty/FacultyAttendance';
import { FacultyAssignments } from '../pages/faculty/FacultyAssignments';
import { FacultyInternalMarks } from '../pages/faculty/FacultyInternalMarks';
import { FacultyMaterials } from '../pages/faculty/FacultyMaterials';
import { FacultyStudents } from '../pages/faculty/FacultyStudents';
import { FacultyLeave } from '../pages/faculty/FacultyLeave';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminStudents } from '../pages/admin/AdminStudents';
import { AdminFaculty } from '../pages/admin/AdminFaculty';
import { AdminDepartments } from '../pages/admin/AdminDepartments';
import { AdminFees } from '../pages/admin/AdminFees';
import { AdminDocuments } from '../pages/admin/AdminDocuments';
import { AdminComplaints } from '../pages/admin/AdminComplaints';
import { AdminNotices } from '../pages/admin/AdminNotices';

// Parent Pages
import { ParentDashboard } from '../pages/parent/ParentDashboard';
import { ParentAttendance } from '../pages/parent/ParentAttendance';
import { ParentResults } from '../pages/parent/ParentResults';
import { ParentFees } from '../pages/parent/ParentFees';
import { ParentTeacherContact } from '../pages/parent/ParentTeacherContact';

// Packages Page
import { PackagesPage } from '../pages/packages/PackagesPage';

export const AppRoutes = () => {
  const { role, isAuthenticated } = useAuth();

  const getDefaultRedirect = () => {
    if (!isAuthenticated) return '/login';
    if (role === 'student') return '/student/dashboard';
    if (role === 'faculty') return '/faculty/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'parent') return '/parent/dashboard';
    return '/login';
  };

  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Root redirects to role dashboard */}
      <Route path="/" element={<Navigate to={getDefaultRedirect()} replace />} />

      {/* STUDENT PORTAL ROUTES */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="timetable" element={<StudentTimetable />} />
        <Route path="academics" element={<StudentAcademics />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="examination" element={<StudentExams />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="library" element={<StudentLibrary />} />
        <Route path="documents" element={<StudentDocuments />} />
        <Route path="complaints" element={<StudentComplaints />} />
        <Route path="placements" element={<StudentPlacements />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="packages" element={<PackagesPage />} />
      </Route>

      {/* FACULTY PORTAL ROUTES */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="attendance" element={<FacultyAttendance />} />
        <Route path="assignments" element={<FacultyAssignments />} />
        <Route path="internal-marks" element={<FacultyInternalMarks />} />
        <Route path="materials" element={<FacultyMaterials />} />
        <Route path="students" element={<FacultyStudents />} />
        <Route path="leaves" element={<FacultyLeave />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="packages" element={<PackagesPage />} />
      </Route>

      {/* ADMIN PORTAL ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="faculty" element={<AdminFaculty />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="fees" element={<AdminFees />} />
        <Route path="documents" element={<AdminDocuments />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="packages" element={<PackagesPage />} />
      </Route>

      {/* DEDICATED COMMERCIAL PACKAGES ROUTE */}
      <Route
        path="/packages"
        element={
          <ProtectedRoute allowedRoles={['student', 'faculty', 'admin', 'parent']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PackagesPage />} />
      </Route>

      {/* PARENT PORTAL ROUTES */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRoles={['parent']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/parent/dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="attendance" element={<ParentAttendance />} />
        <Route path="results" element={<ParentResults />} />
        <Route path="fees" element={<ParentFees />} />
        <Route path="communication" element={<ParentTeacherContact />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="packages" element={<PackagesPage />} />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to={getDefaultRedirect()} replace />} />
    </Routes>
  );
};

