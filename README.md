# HKBK College of Engineering – Student Information & Management Portal (SIMP)

A comprehensive, realistic, and responsive internal college information and management portal built for **HKBK College of Engineering, Bengaluru** (Affiliated to VTU Belagavi, Approved by AICTE, Accredited by NAAC & NBA).

---

## 🏛️ Project Overview

This portal serves as the single digital gateway for institutional academic and administrative workflows across four distinct stakeholder roles:
1. **Student Portal** (Primary focus: comprehensive academic & administrative student experience)
2. **Teacher / Faculty Portal**
3. **Administrator Portal**
4. **Parent / Guardian Portal**

> **Note:** All student records, faculty rosters, marks, fee transactions, and circulars are realistic fictional demonstration data for HKBK College of Engineering (VTU 2021 Scheme).

---

## 🛠️ Technology Stack

- **Frontend Framework:** React.js (v18.3) + Vite (v5.4)
- **Language:** JavaScript only (ES6+ Modules, NO TypeScript)
- **Routing:** React Router DOM (v6.26) with role-based route protection
- **Icons:** Lucide React
- **Visualizations & Charts:** Recharts (Responsive bar charts, area charts, line trends)
- **Animations:** Framer Motion (Modal dialogs, popovers, status transitions)
- **Persistence:** LocalStorage API with simulated Spring Boot REST service layer
- **Styling:** Custom Academic Design System (Navy Blue `#0B1E36`, Oxford Gold `#C5A059`, Light & Dark mode support)

---

## 🔑 Demo Credentials (1-Click Login Supported)

The login screen provides quick 1-click login buttons for all four personas:

| Role | Username / USN | Password | Persona Description |
| :--- | :--- | :--- | :--- |
| **Student** | `1HK21CS042` | `password123` | **Syed Rayan Ahmed** – 6th Sem B.E. Computer Science & Engg. |
| **Faculty** | `hkbk.fac.108` | `password123` | **Dr. A. K. Manjunath** – Assoc. Professor & PG Coordinator |
| **Admin** | `admin.simp` | `password123` | **Prof. Syed Mustafa** – Dean Academics & Portal Controller |
| **Parent** | `parent.1hk21cs042` | `password123` | **Mr. Tariq Ahmed** – Father of Syed Rayan Ahmed |

*A quick-switcher pill bar is also embedded into the top navigation bar for seamless role transitions during evaluation.*

---

## 🌟 Key Features by Portal

### 1. Student Portal
- **Dashboard:** Unified academic view with photo, USN, VTU affiliation, attendance gauge (84.6%), today's timetable, pending assignments, and fee status.
- **Student Profile:** Complete bio-data, academic history, address, parent details, transport route (Bus Route 14), mentor details, and editable contact details.
- **Attendance Portfolio:** Overall attendance gauge, monthly trend chart, subject-wise attendance register, and VTU 75% shortage alert badge.
- **Timetable:** Interactive weekly master grid and daily period-by-period schedule with classrooms and lab venues (Turing Lab AB-102, Ada Lovelace Lab AB-104), plus print support.
- **Academics & Syllabus:** 6th Sem CSE course catalog with VTU 5-module syllabus viewer and lecture notes repository with simulated downloads.
- **Assignments:** Subject-wise assignments (Pending, Submitted, Evaluated), submission deadlines, file upload simulation with instant storage update, and faculty grading feedback.
- **Examinations:** Continuous Internal Evaluation (CIE) scorecard (IA-1, IA-2, assignment marks out of 50), Semester End Exam (SEE) timetable, printable official **VTU Hall Ticket**, and SGPA/CGPA history.
- **Fee Management:** Semester fee structure breakdown, outstanding balance, interactive "Pay Balance" modal with instant receipt generation, and printable official Fee Receipts.
- **Central Library:** Issued books with due dates, 1-click renewal (+14 days), borrowing history, and OPAC search catalog.
- **Document Requests:** Apply for Bonafide Certificates, Study Certificates, and replacement ID cards. Preview and print digitally verified certificates.
- **Grievance Redressal:** Submit complaints (Academic, Transport, Hostel, Canteen) with status tracking and official administration replies.
- **Placements & Internships:** Campus recruitment announcements (Bosch, TCS Digital, Siemens, Dell), eligibility checks, application tracking, and internship stipends.
- **Notices & Circulars:** Categorized institutional notices with unread badges.

### 2. Faculty Portal
- **Overview:** Teaching timetable, assigned subjects (`21CS61`, `21CS62`, `21CSL66`), class student strength, and evaluation deadlines.
- **Mark Attendance:** Subject and date selector, interactive student roll call with Present/Absent toggles, "Mark All Present" quick action, and persistence directly synced to student records.
- **Assignment Manager:** Create new assignments with deadlines and rubrics; grade submitted student files with marks and feedback comments.
- **Internal Assessment (CIE) Entry:** Enter and calculate IA-1, IA-2, and assignment scores with automatic VTU qualifying checks.
- **Upload Notes:** Upload lecture slides, lab manuals, and PDFs.
- **Student Cohort:** Inspect 6th Sem CSE cohort roster with attendance health and dispatch proctorial counseling notices to parents.
- **Leave Application:** Apply for On Duty (OD) / Casual Leave with alternate lecture arrangements.

### 3. Administrator Portal
- **Command Center:** Institutional metrics across 6 engineering departments (2,600+ students, 148 faculty), pending receivables, and regulatory compliance status.
- **Student Records:** Search, filter, and inspect student files.
- **Faculty Management:** Complete faculty directory with qualifications and course allocations.
- **Departments & Intake:** AICTE sanctioned intake capacity, student counts, and HOD information.
- **Fee Revenue Tracking:** Revenue collection monitoring, payment reconciliation, and accounts counter collection simulator.
- **Document Approvals:** Review, approve, and issue official certificate numbers for Bonafide and Study certificate applications.
- **Grievance Redressal:** Review student complaints and post official committee resolutions.
- **Notices Manager:** Broadcast campus-wide or role-targeted announcements.

### 4. Parent Portal
- **Ward Summary:** Linked ward profile (Syed Rayan Ahmed), attendance health, current CGPA, fee dues, and mentor contact.
- **Subject Attendance:** Real-time course attendance register with VTU 75% shortage alert.
- **Academic Results:** Internal assessment marks, semester-wise SGPA history, and degree standing.
- **Fee Details:** Fee balance breakdown and printable official receipts.
- **Proctor Communication:** Direct parent-teacher messaging thread with Dr. A. K. Manjunath.

---

## 🏗️ Architecture for Future Spring Boot + PostgreSQL Integration

The application's `storageService.js` is structured as a dedicated API service layer:
```
React Components -> DataContext -> storageService.js -> (Future REST APIs: Spring Boot)
                                                     -> (Current: LocalStorage Mock DB)
```
Future backend endpoints can be integrated without modifying UI components:
- `GET /api/v1/students/{usn}`
- `PUT /api/v1/students/{usn}`
- `GET /api/v1/attendance/{usn}`
- `POST /api/v1/faculty/attendance`
- `GET /api/v1/examinations/ia/{usn}`
- `POST /api/v1/fees/pay`
- `POST /api/v1/documents/request`
- `POST /api/v1/complaints`

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
