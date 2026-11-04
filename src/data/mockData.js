// Realistic fictional demonstration data for HKBK College of Engineering, Bengaluru
// Affiliated to VTU, Belagavi | Approved by AICTE, New Delhi
// Note: All student records, faculty data, marks, and statistics are mock demo data.

export const INITIAL_MOCK_DATA = {
  collegeInfo: {
    name: "HKBK College of Engineering",
    shortName: "HKBKCE",
    tagline: "Student Information & Management Portal (SIMP)",
    affiliation: "Affiliated to VTU Belagavi | Approved by AICTE, New Delhi | NBA & NAAC Accredited",
    location: "22/1, Nagawara, Manyata Tech Park Road, Bengaluru - 560045, Karnataka",
    academicYear: "2024 - 2025",
    currentTerm: "Even Semester (IV, VI, VIII)",
    helpdeskEmail: "simp.support@hkbk.edu.in",
    helpdeskPhone: "+91 (080) 2544 1722 / 3744"
  },

  users: [
    {
      id: "std-001",
      role: "student",
      username: "1HK21CS042",
      password: "password123",
      name: "Syed Rayan Ahmed",
      usn: "1HK21CS042",
      email: "rayan.cs21@hkbk.edu.in",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
      phone: "+91 98451 23456",
      department: "Computer Science & Engineering",
      deptCode: "CSE",
      course: "Bachelor of Engineering (B.E.)",
      semester: 6,
      section: "A",
      batch: "2021 - 2025",
      quota: "KCET (Govt. Quota)",
      admissionYear: "2021",
      dob: "2003-05-14",
      bloodGroup: "O+",
      gender: "Male",
      address: {
        street: "#42, 3rd Cross, HBR Layout 2nd Block",
        locality: "Kalyan Nagar Post",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560043"
      },
      parent: {
        fatherName: "Mr. Tariq Ahmed",
        motherName: "Mrs. Nilofer Ahmed",
        phone: "+91 98450 88219",
        email: "tariq.ahmed.blr@gmail.com",
        occupation: "Lead Cloud Infrastructure Architect",
        annualIncome: "₹ 18,50,000",
        addressSame: true
      },
      emergencyContact: {
        name: "Mr. Tariq Ahmed (Father)",
        phone: "+91 98450 88219",
        relation: "Father"
      },
      mentor: {
        name: "Dr. A. K. Manjunath",
        designation: "Associate Professor, Dept. of CSE",
        cabin: "Admin Block AB-208",
        email: "manjunath.ak@hkbk.edu.in"
      },
      hostel: {
        isHostelite: false,
        roomNo: null,
        block: null
      },
      transport: {
        usesCollegeBus: true,
        routeNo: "Route 14 (Hennur - HBR - HKBK)",
        busPassNo: "HKBK-BUS-2024-0428"
      }
    },
    {
      id: "fac-001",
      role: "faculty",
      username: "hkbk.fac.108",
      password: "password123",
      name: "Dr. A. K. Manjunath",
      employeeId: "HKBK-FAC-108",
      designation: "Associate Professor & PG Coordinator",
      department: "Computer Science & Engineering",
      deptCode: "CSE",
      email: "manjunath.ak@hkbk.edu.in",
      phone: "+91 94481 77652",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      cabin: "CSE Department, AB-208",
      qualification: "Ph.D. in Computer Science (Distributed Systems, IISc / VTU), M.Tech (CSE)",
      experienceYears: 14,
      specialization: "Compilers, Distributed Systems & Network Protocols"
    },
    {
      id: "adm-001",
      role: "admin",
      username: "admin.simp",
      password: "password123",
      name: "Prof. Syed Mustafa",
      employeeId: "HKBK-ADM-003",
      designation: "Dean Academics & Portal Administrator",
      department: "Office of the Registrar",
      deptCode: "ADMIN",
      email: "admin.simp@hkbk.edu.in",
      phone: "+91 98455 01010",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
      office: "Principal Secretariat, Main Block, 1st Floor"
    },
    {
      id: "par-001",
      role: "parent",
      username: "parent.1hk21cs042",
      password: "password123",
      name: "Mr. Tariq Ahmed",
      linkedStudentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      relation: "Father",
      email: "tariq.ahmed.blr@gmail.com",
      phone: "+91 98450 88219",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      occupation: "Lead Cloud Infrastructure Architect"
    }
  ],

  // Student Cohort for Class Management & Admin
  studentsRoster: [
    { usn: "1HK21CS001", name: "Aakash Verma", sem: 6, sec: "A", attendance: 88, cgpa: 8.4, status: "Active", totalFee: 118500, paidFee: 118500, feeBalance: 0, feeStatus: "Cleared" },
    { usn: "1HK21CS015", name: "Bhoomika N.", sem: 6, sec: "A", attendance: 92, cgpa: 9.1, status: "Active", totalFee: 118500, paidFee: 118500, feeBalance: 0, feeStatus: "Cleared" },
    { usn: "1HK21CS028", name: "Farhan Khan", sem: 6, sec: "A", attendance: 69, cgpa: 7.2, status: "Attendance Shortage", totalFee: 118500, paidFee: 78500, feeBalance: 40000, feeStatus: "Balance Due" },
    { usn: "1HK21CS035", name: "Meghana Rao", sem: 6, sec: "A", attendance: 86, cgpa: 8.6, status: "Active", totalFee: 118500, paidFee: 118500, feeBalance: 0, feeStatus: "Cleared" },
    { usn: "1HK21CS042", name: "Syed Rayan Ahmed", sem: 6, sec: "A", attendance: 84.6, cgpa: 8.72, status: "Active", totalFee: 118500, paidFee: 95000, feeBalance: 23500, feeStatus: "Balance Due" },
    { usn: "1HK21CS054", name: "Sneha Kulkarni", sem: 6, sec: "A", attendance: 94, cgpa: 9.3, status: "Active", totalFee: 118500, paidFee: 118500, feeBalance: 0, feeStatus: "Cleared" },
    { usn: "1HK21CS060", name: "Zeeshan Ali", sem: 6, sec: "A", attendance: 71, cgpa: 7.5, status: "Attendance Shortage", totalFee: 118500, paidFee: 65000, feeBalance: 53500, feeStatus: "Balance Due" },
    { usn: "1HK21CS072", name: "Rohan Christopher", sem: 6, sec: "A", attendance: 81, cgpa: 8.0, status: "Active", totalFee: 118500, paidFee: 118500, feeBalance: 0, feeStatus: "Cleared" },
    { usn: "1HK21CS085", name: "Divya Bharathi", sem: 6, sec: "A", attendance: 89, cgpa: 8.8, status: "Active", totalFee: 118500, paidFee: 95000, feeBalance: 23500, feeStatus: "Balance Due" },
    { usn: "1HK21CS096", name: "Mohammed Danish", sem: 6, sec: "A", attendance: 78, cgpa: 7.9, status: "Active", totalFee: 118500, paidFee: 118500, feeBalance: 0, feeStatus: "Cleared" }
  ],

  // Academic Subjects for 6th Sem CSE (VTU 2021 Scheme)
  subjects: [
    {
      code: "21CS61",
      name: "System Software and Compilers",
      credits: 4,
      facultyName: "Dr. A. K. Manjunath",
      facultyEmail: "manjunath.ak@hkbk.edu.in",
      room: "AB-304",
      type: "Theory",
      syllabus: [
        "Module 1: Introduction to System Software, Assemblers, Machine Architecture",
        "Module 2: Loaders and Linkers, Relocation and Linking concepts",
        "Module 3: Introduction to Compilers, Lexical Analysis, LEX tool",
        "Module 4: Syntax Analysis, Parsing techniques, YACC tool",
        "Module 5: Code Generation, Intermediate Code, Code Optimization"
      ]
    },
    {
      code: "21CS62",
      name: "Computer Networks & Security",
      credits: 4,
      facultyName: "Prof. Archana S.",
      facultyEmail: "archana.s@hkbk.edu.in",
      room: "AB-304",
      type: "Theory",
      syllabus: [
        "Module 1: Application Layer Protocols: HTTP, DNS, SMTP, Socket Programming",
        "Module 2: Transport Layer: TCP, UDP, Congestion Control, Flow Control",
        "Module 3: Network Layer: Routing Algorithms, OSPF, BGP, IPv4/IPv6",
        "Module 4: Link Layer: Error detection, Multiple Access, Ethernet, WiFi",
        "Module 5: Network Security: Cryptography, TLS/SSL, Firewalls & VPNs"
      ]
    },
    {
      code: "21CS63",
      name: "Full Stack Web Development",
      credits: 3,
      facultyName: "Prof. Imran Basha",
      facultyEmail: "imran.basha@hkbk.edu.in",
      room: "AB-304",
      type: "Theory",
      syllabus: [
        "Module 1: HTML5 semantic tags, CSS3 Modern Flex/Grid, Responsive Design",
        "Module 2: Modern JavaScript ES6+, Asynchronous JS, Promises & Async/Await",
        "Module 3: React.js Component Architecture, State Management, Hooks & Router",
        "Module 4: Backend with Node.js & Express, RESTful API design & JWT Auth",
        "Module 5: Database integration with MongoDB & PostgreSQL, Deployment"
      ]
    },
    {
      code: "21CS642",
      name: "Cloud Computing & DevOps (Prof. Elective)",
      credits: 3,
      facultyName: "Dr. Naseeruddin",
      facultyEmail: "naseer.cse@hkbk.edu.in",
      room: "AB-302",
      type: "Professional Elective",
      syllabus: [
        "Module 1: Cloud Architecture, Service Models (IaaS, PaaS, SaaS), AWS Core",
        "Module 2: Virtualization, Containerization with Docker",
        "Module 3: Container Orchestration with Kubernetes, Pods & Services",
        "Module 4: CI/CD Pipelines, Jenkins, GitHub Actions automation",
        "Module 5: Cloud Security, Monitoring with Prometheus and Grafana"
      ]
    },
    {
      code: "21CSL66",
      name: "System Software & Compiler Lab",
      credits: 1.5,
      facultyName: "Dr. A. K. Manjunath / Mr. Shashi K.",
      facultyEmail: "manjunath.ak@hkbk.edu.in",
      room: "Turing Lab (AB-102)",
      type: "Laboratory",
      syllabus: [
        "Program 1: Lexical analyzer implementation in C",
        "Program 2: Recognize valid identifiers and operators using LEX",
        "Program 3: Parser for arithmetic expressions using YACC",
        "Program 4: Intermediate code generator (Three Address Code)",
        "Program 5: Code optimizer for dead code elimination"
      ]
    },
    {
      code: "21CSL67",
      name: "Computer Networks Laboratory",
      credits: 1.5,
      facultyName: "Prof. Archana S.",
      facultyEmail: "archana.s@hkbk.edu.in",
      room: "Ada Lovelace Lab (AB-104)",
      type: "Laboratory",
      syllabus: [
        "Program 1: Simulate 3 nodes point-to-point network using NS2 / NS3",
        "Program 2: Implement CRC-CCITT error detection algorithm",
        "Program 3: Bellman-Ford and Dijkstra's Routing algorithm in C/Java",
        "Program 4: Client-Server Socket Communication using TCP & UDP",
        "Program 5: Packet capture and Wireshark protocol inspection"
      ]
    },
    {
      code: "21CSMP68",
      name: "Mini Project with Capstone Phase-I",
      credits: 2,
      facultyName: "Committee / Project Guides",
      facultyEmail: "projects.cse@hkbk.edu.in",
      room: "Incubation Center (Block C)",
      type: "Project",
      syllabus: [
        "Phase 1: Problem Definition & Literature Review",
        "Phase 2: SRS Document Preparation & Architecture Design",
        "Phase 3: Prototype Development & Mid-Term Review",
        "Phase 4: Implementation & Final Report Evaluation"
      ]
    }
  ],

  // Attendance Data for Student Syed Rayan Ahmed (1HK21CS042)
  attendance: {
    overallPercentage: 84.6,
    totalClassesConducted: 260,
    totalClassesAttended: 220,
    threshold: 75.0,
    status: "Good Standing",
    subjects: [
      {
        subjectCode: "21CS61",
        subjectName: "System Software and Compilers",
        faculty: "Dr. A. K. Manjunath",
        total: 48,
        attended: 42,
        percentage: 87.5,
        status: "Good",
        history: [
          { date: "2024-11-04", status: "Present", topic: "Code Generation - DAGs" },
          { date: "2024-11-01", status: "Present", topic: "Intermediate Code Quadruples" },
          { date: "2024-10-30", status: "Absent", topic: "Three Address Code Syntax Trees" },
          { date: "2024-10-28", status: "Present", topic: "YACC Conflict Resolution" },
          { date: "2024-10-25", status: "Present", topic: "LR(1) Parsing Table Construction" }
        ]
      },
      {
        subjectCode: "21CS62",
        subjectName: "Computer Networks & Security",
        faculty: "Prof. Archana S.",
        total: 46,
        attended: 39,
        percentage: 84.8,
        status: "Good",
        history: [
          { date: "2024-11-04", status: "Present", topic: "RSA Encryption & Key Generation" },
          { date: "2024-11-02", status: "Present", topic: "Symmetric vs Asymmetric Ciphers" },
          { date: "2024-10-31", status: "Present", topic: "Transport Layer Security (TLS)" },
          { date: "2024-10-29", status: "Absent", topic: "DNS Security Extensions" },
          { date: "2024-10-27", status: "Present", topic: "TCP Congestion Control - Tahoe/Reno" }
        ]
      },
      {
        subjectCode: "21CS63",
        subjectName: "Full Stack Web Development",
        faculty: "Prof. Imran Basha",
        total: 42,
        attended: 37,
        percentage: 88.1,
        status: "Good",
        history: [
          { date: "2024-11-03", status: "Present", topic: "React Router v6 Nested Layouts" },
          { date: "2024-10-31", status: "Present", topic: "Custom Hooks & useEffect Lifecycle" },
          { date: "2024-10-29", status: "Present", topic: "Context API & State Management" },
          { date: "2024-10-26", status: "Present", topic: "Modern Component Styling" }
        ]
      },
      {
        subjectCode: "21CS642",
        subjectName: "Cloud Computing & DevOps",
        faculty: "Dr. Naseeruddin",
        total: 40,
        attended: 30,
        percentage: 75.0,
        status: "Borderline", // Close to 75% VTU warning
        history: [
          { date: "2024-11-04", status: "Present", topic: "Kubernetes Deployments & Services" },
          { date: "2024-11-01", status: "Absent", topic: "Docker Multi-stage Builds" },
          { date: "2024-10-29", status: "Absent", topic: "AWS VPC and Subnet Configuration" },
          { date: "2024-10-25", status: "Present", topic: "Cloud Architecture Patterns" }
        ]
      },
      {
        subjectCode: "21CSL66",
        subjectName: "System Software & Compiler Lab",
        faculty: "Dr. A. K. Manjunath",
        total: 28,
        attended: 25,
        percentage: 89.3,
        status: "Good",
        history: [
          { date: "2024-11-02", status: "Present", topic: "YACC Arithmetic Evaluator" },
          { date: "2024-10-26", status: "Present", topic: "LEX Identifier Extraction" }
        ]
      },
      {
        subjectCode: "21CSL67",
        subjectName: "Computer Networks Laboratory",
        faculty: "Prof. Archana S.",
        total: 28,
        attended: 24,
        percentage: 85.7,
        status: "Good",
        history: [
          { date: "2024-11-03", status: "Present", topic: "Socket Programming in C" },
          { date: "2024-10-27", status: "Present", topic: "Wireshark Packet Analysis" }
        ]
      },
      {
        subjectCode: "21CSMP68",
        subjectName: "Mini Project Capstone Phase-I",
        faculty: "Committee Guides",
        total: 28,
        attended: 23,
        percentage: 82.1,
        status: "Good",
        history: [
          { date: "2024-10-30", status: "Present", topic: "Midterm Prototype Demo" }
        ]
      }
    ],
    monthlyTrend: [
      { month: "Aug", percentage: 91.2, held: 48, attended: 44 },
      { month: "Sep", percentage: 86.4, held: 66, attended: 57 },
      { month: "Oct", percentage: 82.8, held: 82, attended: 68 },
      { month: "Nov", percentage: 84.6, held: 64, attended: 51 }
    ]
  },

  // Timetable for 6th Sem CSE Section A
  timetable: {
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    slots: [
      { id: 1, time: "09:00 AM - 10:00 AM", period: "1" },
      { id: 2, time: "10:00 AM - 11:00 AM", period: "2" },
      { id: 3, time: "11:15 AM - 12:15 PM", period: "3" },
      { id: 4, time: "12:15 PM - 01:15 PM", period: "4" },
      { id: 5, time: "02:00 PM - 03:00 PM", period: "5" },
      { id: 6, time: "03:00 PM - 04:00 PM", period: "6" }
    ],
    schedule: {
      Monday: [
        { period: 1, code: "21CS61", subject: "System Software & Compilers", faculty: "Dr. A. K. Manjunath", room: "AB-304", type: "Theory" },
        { period: 2, code: "21CS62", subject: "Computer Networks & Security", faculty: "Prof. Archana S.", room: "AB-304", type: "Theory" },
        { period: 3, code: "21CS63", subject: "Full Stack Web Development", faculty: "Prof. Imran Basha", room: "AB-304", type: "Theory" },
        { period: 4, code: "21CS642", subject: "Cloud Computing & DevOps", faculty: "Dr. Naseeruddin", room: "AB-304", type: "Elective" },
        { period: 5, code: "21CSL66", subject: "System Software Lab (Batch 1)", faculty: "Dr. A. K. Manjunath", room: "Turing Lab AB-102", type: "Lab", span: 2 }
      ],
      Tuesday: [
        { period: 1, code: "21CS63", subject: "Full Stack Web Development", faculty: "Prof. Imran Basha", room: "AB-304", type: "Theory" },
        { period: 2, code: "21CS61", subject: "System Software & Compilers", faculty: "Dr. A. K. Manjunath", room: "AB-304", type: "Theory" },
        { period: 3, code: "21CS62", subject: "Computer Networks & Security", faculty: "Prof. Archana S.", room: "AB-304", type: "Theory" },
        { period: 4, code: "Library", subject: "Library / Technical Seminar", faculty: "Chief Librarian", room: "Central Library 2nd Flr", type: "Activity" },
        { period: 5, code: "21CSL67", subject: "Computer Networks Lab (Batch 1)", faculty: "Prof. Archana S.", room: "Ada Lovelace Lab AB-104", type: "Lab", span: 2 }
      ],
      Wednesday: [
        { period: 1, code: "21CS642", subject: "Cloud Computing & DevOps", faculty: "Dr. Naseeruddin", room: "AB-304", type: "Elective" },
        { period: 2, code: "21CS63", subject: "Full Stack Web Development", faculty: "Prof. Imran Basha", room: "AB-304", type: "Theory" },
        { period: 3, code: "21CS61", subject: "System Software & Compilers", faculty: "Dr. A. K. Manjunath", room: "AB-304", type: "Theory" },
        { period: 4, code: "21CS62", subject: "Computer Networks & Security", faculty: "Prof. Archana S.", room: "AB-304", type: "Theory" },
        { period: 5, code: "Placement", subject: "Aptitude & Soft Skills Training", faculty: "Training & Placement Cell", room: "Seminar Hall 1", type: "Placement", span: 2 }
      ],
      Thursday: [
        { period: 1, code: "21CS62", subject: "Computer Networks & Security", faculty: "Prof. Archana S.", room: "AB-304", type: "Theory" },
        { period: 2, code: "21CS61", subject: "System Software & Compilers", faculty: "Dr. A. K. Manjunath", room: "AB-304", type: "Theory" },
        { period: 3, code: "21CS642", subject: "Cloud Computing & DevOps", faculty: "Dr. Naseeruddin", room: "AB-304", type: "Elective" },
        { period: 4, code: "21CS63", subject: "Full Stack Web Development", faculty: "Prof. Imran Basha", room: "AB-304", type: "Theory" },
        { period: 5, code: "21CSMP68", subject: "Mini Project Mentoring", faculty: "Project Guides", room: "Incubation Center Block C", type: "Project", span: 2 }
      ],
      Friday: [
        { period: 1, code: "21CS61", subject: "System Software & Compilers", faculty: "Dr. A. K. Manjunath", room: "AB-304", type: "Theory" },
        { period: 2, code: "21CS642", subject: "Cloud Computing & DevOps", faculty: "Dr. Naseeruddin", room: "AB-304", type: "Elective" },
        { period: 3, code: "21CS62", subject: "Computer Networks & Security", faculty: "Prof. Archana S.", room: "AB-304", type: "Theory" },
        { period: 4, code: "Counseling", subject: "Proctorial / Mentor Meeting", faculty: "Dr. A. K. Manjunath", room: "AB-208", type: "Proctor" },
        { period: 5, code: "Sports", subject: "Sports & Extra Curriculars", faculty: "Physical Education Director", room: "Campus Grounds", type: "Sports", span: 2 }
      ],
      Saturday: [
        { period: 1, code: "Expert", subject: "Guest Lecture: Industry DevOps on Cloud", faculty: "External Speaker (AWS Bengaluru)", room: "Auditorium Main Block", type: "Seminar" },
        { period: 2, code: "Expert", subject: "Guest Lecture: Industry DevOps on Cloud", faculty: "External Speaker (AWS Bengaluru)", room: "Auditorium Main Block", type: "Seminar" },
        { period: 3, code: "Remedial", subject: "Remedial / Doubt Clearance Session", faculty: "Department Faculty", room: "AB-304", type: "Tutorial" },
        { period: 4, code: "Alumni", subject: "Alumni Interaction: Campus to Corporate", faculty: "Alumni Association", room: "Seminar Hall 2", type: "Alumni" }
      ]
    }
  },

  // Assignments
  assignments: [
    {
      id: "asg-01",
      subjectCode: "21CS61",
      subjectName: "System Software and Compilers",
      title: "Design of 2-Pass Assembler and Symbol Table Generator",
      description: "Implement Pass-1 of a two-pass assembler in C/C++. Generate the Symbol Table, Literal Table, and intermediate code with machine opcodes for SIC/XE architecture.",
      facultyName: "Dr. A. K. Manjunath",
      maxMarks: 20,
      deadline: "2024-11-18T23:59:00",
      status: "Pending", // Pending, Submitted, Evaluated
      submittedFile: null,
      submissionDate: null,
      marksObtained: null,
      facultyFeedback: null,
      attachments: ["2-pass_assembler_specifications.pdf"]
    },
    {
      id: "asg-02",
      subjectCode: "21CS62",
      subjectName: "Computer Networks & Security",
      title: "Implementation of RSA Cryptosystem & Digital Signatures",
      description: "Develop a working simulation of 1024-bit RSA key generation, encryption, decryption, and hash verification using SHA-256 for a simulated message transmission.",
      facultyName: "Prof. Archana S.",
      maxMarks: 20,
      deadline: "2024-11-12T23:59:00",
      status: "Submitted",
      submittedFile: "1HK21CS042_RSA_Implementation.zip",
      submissionDate: "2024-11-02T16:45:00",
      marksObtained: 19,
      facultyFeedback: "Excellent code clarity and detailed report with corner case analysis for prime testing.",
      attachments: ["RSA_Problem_Statement.pdf"]
    },
    {
      id: "asg-03",
      subjectCode: "21CS63",
      subjectName: "Full Stack Web Development",
      title: "Full-Stack Microservices Architecture with JWT Authentication",
      description: "Build an authenticated REST API using Node.js and Express with bcrypt password hashing and JWT authorization middleware, connected to PostgreSQL.",
      facultyName: "Prof. Imran Basha",
      maxMarks: 25,
      deadline: "2024-11-22T23:59:00",
      status: "Pending",
      submittedFile: null,
      submissionDate: null,
      marksObtained: null,
      facultyFeedback: null,
      attachments: ["Microservices_Architecture_Rubric.pdf"]
    },
    {
      id: "asg-04",
      subjectCode: "21CS642",
      subjectName: "Cloud Computing & DevOps",
      title: "Dockerizing a Multi-Tier Application & Kubernetes Pod Spec",
      description: "Create optimized Dockerfiles for frontend (React) and backend (Spring Boot / Node), write docker-compose.yml and deployment manifests for K8s with clusterIP services.",
      facultyName: "Dr. Naseeruddin",
      maxMarks: 20,
      deadline: "2024-10-28T23:59:00",
      status: "Evaluated",
      submittedFile: "1HK21CS042_DevOps_K8s_Project.tar.gz",
      submissionDate: "2024-10-27T19:20:00",
      marksObtained: 18.5,
      facultyFeedback: "Clean manifests. Good health check probes (liveness & readiness) included.",
      attachments: ["K8s_Assignment_Guidelines.pdf"]
    }
  ],

  // Examinations, Results & Hall Ticket
  examinations: {
    currentInternalAssessment: "IA-2 (Internal Assessment Test 2)",
    iaSchedule: [
      { date: "2024-11-25", time: "09:30 AM - 11:00 AM", code: "21CS61", subject: "System Software & Compilers", room: "AB-304" },
      { date: "2024-11-26", time: "09:30 AM - 11:00 AM", code: "21CS62", subject: "Computer Networks & Security", room: "AB-304" },
      { date: "2024-11-27", time: "09:30 AM - 11:00 AM", code: "21CS63", subject: "Full Stack Web Development", room: "AB-304" },
      { date: "2024-11-28", time: "09:30 AM - 11:00 AM", code: "21CS642", subject: "Cloud Computing & DevOps", room: "AB-304" }
    ],
    semesterExamSchedule: [
      { date: "2024-12-16", time: "02:00 PM - 05:00 PM", code: "21CS61", subject: "System Software & Compilers", session: "Afternoon" },
      { date: "2024-12-19", time: "02:00 PM - 05:00 PM", code: "21CS62", subject: "Computer Networks & Security", session: "Afternoon" },
      { date: "2024-12-23", time: "02:00 PM - 05:00 PM", code: "21CS63", subject: "Full Stack Web Development", session: "Afternoon" },
      { date: "2024-12-27", time: "02:00 PM - 05:00 PM", code: "21CS642", subject: "Cloud Computing & DevOps", session: "Afternoon" }
    ],
    internalMarks: [
      { code: "21CS61", subject: "System Software & Compilers", ia1: 27, ia2: 28, ia3: null, avgIa: 27.5, maxIa: 30, assignment: 19, maxAsg: 20, totalInternal: 46.5, maxTotal: 50 },
      { code: "21CS62", subject: "Computer Networks & Security", ia1: 28, ia2: 26, ia3: null, avgIa: 27.0, maxIa: 30, assignment: 19, maxAsg: 20, totalInternal: 46.0, maxTotal: 50 },
      { code: "21CS63", subject: "Full Stack Web Development", ia1: 29, ia2: 29, ia3: null, avgIa: 29.0, maxIa: 30, assignment: 20, maxAsg: 20, totalInternal: 49.0, maxTotal: 50 },
      { code: "21CS642", subject: "Cloud Computing & DevOps", ia1: 25, ia2: 26, ia3: null, avgIa: 25.5, maxIa: 30, assignment: 18.5, maxAsg: 20, totalInternal: 44.0, maxTotal: 50 },
      { code: "21CSL66", subject: "System Software Lab", ia1: 28, ia2: 29, ia3: null, avgIa: 28.5, maxIa: 30, assignment: 19, maxAsg: 20, totalInternal: 47.5, maxTotal: 50 },
      { code: "21CSL67", subject: "Computer Networks Lab", ia1: 27, ia2: 28, ia3: null, avgIa: 27.5, maxIa: 30, assignment: 19, maxAsg: 20, totalInternal: 46.5, maxTotal: 50 },
      { code: "21CSMP68", subject: "Mini Project Capstone Phase-I", ia1: 45, ia2: 48, ia3: null, avgIa: 46.5, maxIa: 50, assignment: 48, maxAsg: 50, totalInternal: 94.5, maxTotal: 100 }
    ],
    hallTicket: {
      examType: "VTU Semester End Theory Examinations - Dec 2024 / Jan 2025",
      hallTicketNo: "HT-HKBK-2024-6CS042",
      studentName: "Syed Rayan Ahmed",
      usn: "1HK21CS042",
      centerCode: "1HK (HKBK College of Engineering, Bengaluru)",
      status: "Eligible & Verified",
      instructions: [
        "1. Candidates must occupy their allotted seats 15 minutes prior to the commencement of examination.",
        "2. Candidates shall not carry any electronic gadgets, programmable calculators, or smartwatches into the examination hall.",
        "3. Valid College Identity Card and this printed Hall Ticket with Invigilator endorsement are mandatory for entry.",
        "4. VTU Rules regarding malpractice and disciplinary actions are strictly enforced."
      ]
    },
    semesterHistory: [
      { sem: "1st Semester", credits: 20, sgpa: 8.60, totalMarks: "582 / 650", result: "FIRST CLASS WITH DISTINCTION" },
      { sem: "2nd Semester", credits: 20, sgpa: 8.75, totalMarks: "594 / 650", result: "FIRST CLASS WITH DISTINCTION" },
      { sem: "3rd Semester", credits: 24, sgpa: 8.55, totalMarks: "688 / 800", result: "FIRST CLASS WITH DISTINCTION" },
      { sem: "4th Semester", credits: 24, sgpa: 8.80, totalMarks: "708 / 800", result: "FIRST CLASS WITH DISTINCTION" },
      { sem: "5th Semester", credits: 22, sgpa: 8.92, totalMarks: "655 / 750", result: "FIRST CLASS WITH DISTINCTION" }
    ],
    cumulativeStats: {
      earnedCredits: 110,
      totalCredits: 160,
      cgpa: 8.72,
      standing: "Top 5% of Department"
    }
  },

  // Fees & Payment Records
  fees: {
    academicYear: "2024 - 2025",
    semester: "6th Semester",
    totalFee: 118500,
    paidFee: 95000,
    outstandingFee: 23500,
    dueDate: "2024-11-30",
    status: "Partially Paid",
    breakdown: [
      { item: "Tuition Fees (VTU Govt Quota Subsidized)", amount: 78500, paid: 78500, status: "Cleared" },
      { item: "VTU Registration, Exam & E-Consortium Fees", amount: 12000, paid: 12000, status: "Cleared" },
      { item: "College Development & Infrastructure Fund", amount: 15000, paid: 4500, status: "Balance ₹ 10,500" },
      { item: "Laboratory, High-Performance Computing & Software License", amount: 8000, paid: 0, status: "Balance ₹ 8,000" },
      { item: "Campus Placement Training & Skill Development Fee", amount: 5000, paid: 0, status: "Balance ₹ 5,000" }
    ],
    transactions: [
      {
        receiptNo: "HKBK/REC/2024/09842",
        date: "2024-07-22",
        amount: 78500,
        mode: "NEFT / Bank Transfer",
        bankReference: "HDFC98452109823",
        category: "Tuition Fees - 1st Installment",
        status: "Success",
        remarks: "Approved by Accounts Section"
      },
      {
        receiptNo: "HKBK/REC/2024/11490",
        date: "2024-09-10",
        amount: 16500,
        mode: "Online Payment Gateway (UPI)",
        bankReference: "UPI/428910488219/PayTM",
        category: "VTU Exam Fee + Part Dev Fee",
        status: "Success",
        remarks: "Digital Receipt Generated"
      }
    ]
  },

  // Central Library Records
  library: {
    cardNo: "LIB-CS-2021-042",
    totalBorrowedAllTime: 34,
    activeIssuedCount: 3,
    maxAllowed: 4,
    totalFineDue: 0,
    issuedBooks: [
      {
        id: "BK-01",
        title: "Compilers: Principles, Techniques, and Tools (Dragon Book)",
        author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman",
        isbn: "978-0321486813",
        accessionNo: "ACC-55241",
        issueDate: "2024-10-18",
        dueDate: "2024-11-18",
        status: "Issued",
        canRenew: true
      },
      {
        id: "BK-02",
        title: "Computer Networking: A Top-Down Approach (8th Edition)",
        author: "James F. Kurose, Keith W. Ross",
        isbn: "978-0136681557",
        accessionNo: "ACC-49812",
        issueDate: "2024-10-22",
        dueDate: "2024-11-22",
        status: "Issued",
        canRenew: true
      },
      {
        id: "BK-03",
        title: "Full Stack Development with Spring Boot 3 and React",
        author: "Juha Hinkula",
        isbn: "978-1805122463",
        accessionNo: "ACC-61029",
        issueDate: "2024-10-25",
        dueDate: "2024-11-25",
        status: "Issued",
        canRenew: true
      }
    ],
    history: [
      { title: "Operating System Concepts (10th Ed)", author: "Silberschatz, Galvin", returnDate: "2024-06-15", finePaid: 0 },
      { title: "Database System Concepts", author: "Korth, Sudarshan", returnDate: "2024-06-12", finePaid: 0 },
      { title: "Design and Analysis of Algorithms", author: "Anany Levitin", returnDate: "2024-01-20", finePaid: 0 }
    ]
  },

  // Study Materials & Syllabus Repository
  studyMaterials: [
    {
      id: "mat-01",
      subjectCode: "21CS61",
      title: "Module 1 & 2: Complete Lecture Notes - Assemblers and Linkers",
      type: "PDF",
      size: "4.8 MB",
      uploadedBy: "Dr. A. K. Manjunath",
      uploadedDate: "2024-09-14",
      downloads: 84,
      fileUrl: "notes_21cs61_mod1_2.pdf"
    },
    {
      id: "mat-02",
      subjectCode: "21CS61",
      title: "Module 3: LEX & YACC Tool Syntax Reference & Solved Examples",
      type: "PDF",
      size: "2.3 MB",
      uploadedBy: "Dr. A. K. Manjunath",
      uploadedDate: "2024-10-08",
      downloads: 91,
      fileUrl: "lex_yacc_handbook.pdf"
    },
    {
      id: "mat-03",
      subjectCode: "21CS62",
      title: "Network Security: Cryptographic Algorithms Handout & Lab Guide",
      type: "PDF",
      size: "3.6 MB",
      uploadedBy: "Prof. Archana S.",
      uploadedDate: "2024-10-15",
      downloads: 78,
      fileUrl: "crypto_handout_archana.pdf"
    },
    {
      id: "mat-04",
      subjectCode: "21CS63",
      title: "React 18 & State Management Cheatsheet with Redux Toolkit",
      type: "PDF",
      size: "1.9 MB",
      uploadedBy: "Prof. Imran Basha",
      uploadedDate: "2024-10-20",
      downloads: 112,
      fileUrl: "react_modern_cheatsheet.pdf"
    },
    {
      id: "mat-05",
      subjectCode: "21CS642",
      title: "Kubernetes in Production: Manifests, Ingress & Helm Charts Guide",
      type: "PDF",
      size: "5.1 MB",
      uploadedBy: "Dr. Naseeruddin",
      uploadedDate: "2024-10-24",
      downloads: 64,
      fileUrl: "k8s_production_guide.pdf"
    }
  ],

  // Document Requests (Bonafide, ID Card, Study Certificate, etc.)
  documentRequests: [
    {
      id: "REQ-2024-0891",
      studentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      docType: "Bonafide Certificate",
      purpose: "Passport Application & Visa verification",
      appliedDate: "2024-10-26",
      status: "Approved & Ready for Download", // Pending, Under Review, Approved, Rejected
      adminRemarks: "Digitally signed by Principal Secretariat. Download official PDF certificate.",
      completedDate: "2024-10-28",
      certificateNo: "HKBK/CERT/BON/2024/1142",
      downloadReady: true
    },
    {
      id: "REQ-2024-0714",
      studentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      docType: "Study & Conduct Certificate",
      purpose: "National Scholarship Portal (NSP) Renewal",
      appliedDate: "2024-09-02",
      status: "Approved & Ready for Download",
      adminRemarks: "Verified with academic records.",
      completedDate: "2024-09-04",
      certificateNo: "HKBK/CERT/SC/2024/0931",
      downloadReady: true
    }
  ],

  // Grievances & Complaints
  complaints: [
    {
      id: "CMP-2024-031",
      studentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      category: "Academic & Laboratory",
      title: "Turing Lab Workstations (Lab AB-102) GCC compiler configuration issue",
      description: "Systems 14 to 22 in Turing Lab are missing the 32-bit compiler libraries needed for System Software practical experiment 3. Kindly update gcc-multilib.",
      submittedDate: "2024-10-22",
      status: "Resolved", // Open, In Progress, Resolved, Closed
      adminResponse: "Systems administrator Mr. Vinay has installed the required libraries and verified execution on all terminals on 24-Oct-2024.",
      resolvedDate: "2024-10-24"
    },
    {
      id: "CMP-2024-049",
      studentUsn: "1HK21CS042",
      studentName: "Syed Rayan Ahmed",
      category: "Campus Transport",
      title: "Bus Route 14 Morning Arrival Timing Delay at Kalyan Nagar junction",
      description: "Due to ongoing flyover construction near Hennur cross, Route 14 arrives 15 minutes past 8:45 AM, leading to students arriving late for 9:00 AM class.",
      submittedDate: "2024-11-01",
      status: "In Progress",
      adminResponse: "Transport supervisor Mr. Ramesh has rescheduled departure from starting point 15 minutes earlier starting from Monday.",
      resolvedDate: null
    }
  ],

  // Placements & Internships
  placements: [
    {
      id: "PLC-01",
      company: "Bosch Global Software Technologies",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
      role: "Associate Software Engineer - Embedded & Cloud",
      package: "₹ 8.50 LPA - ₹ 11.20 LPA",
      location: "Bengaluru (Adugodi / Electronic City)",
      eligibility: "B.E. CSE/ISE/ECE with CGPA >= 7.5, No Active Backlogs",
      deadline: "2024-11-20",
      driveDate: "2024-11-28",
      status: "Open for Application",
      studentEligible: true,
      hasApplied: true,
      applicationStatus: "Shortlisted for Online Coding Assessment"
    },
    {
      id: "PLC-02",
      company: "TCS Digital / Prime",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
      role: "Software Development Engineer (SDE-1)",
      package: "₹ 7.00 LPA - ₹ 9.00 LPA",
      location: "Bengaluru / Pan India",
      eligibility: "B.E. All Engineering Branches with CGPA >= 7.0",
      deadline: "2024-11-25",
      driveDate: "2024-12-05",
      status: "Open for Application",
      studentEligible: true,
      hasApplied: false,
      applicationStatus: "Not Applied"
    },
    {
      id: "PLC-03",
      company: "Siemens Advanta",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
      role: "Graduate Trainee Engineer - Cloud & DevOps",
      package: "₹ 10.00 LPA",
      location: "Bengaluru (Hebbal / Manyata Tech Park)",
      eligibility: "B.E. CSE/ISE with CGPA >= 8.0, 10th & 12th >= 75%",
      deadline: "2024-12-01",
      driveDate: "2024-12-10",
      status: "Open for Application",
      studentEligible: true,
      hasApplied: false,
      applicationStatus: "Not Applied"
    },
    {
      id: "INT-01",
      company: "Dell Technologies",
      logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&auto=format&fit=crop&q=80",
      role: "Software Engineering Intern (6 Months)",
      package: "Stipend: ₹ 45,000 / month + PPO",
      location: "Bengaluru (Bagmane Tech Park)",
      eligibility: "6th Sem CSE/ISE students with proficiency in Java / Python / Cloud",
      deadline: "2024-11-15",
      driveDate: "2024-11-22",
      status: "Shortlisting",
      studentEligible: true,
      hasApplied: true,
      applicationStatus: "Interview Scheduled for 12-Nov-2024"
    }
  ],

  // Announcements and Notifications
  announcements: [
    {
      id: "NOTIF-01",
      category: "Academic",
      title: "VTU Even Semester Final Examination Schedule Dec 2024 Released",
      description: "Visvesvaraya Technological University has officially notified the time table for B.E. 6th semester theory and laboratory examinations. Hall tickets can be downloaded from the Examination module.",
      targetRole: "all",
      date: "2024-11-03",
      isUrgent: true,
      read: false
    },
    {
      id: "NOTIF-02",
      category: "Attendance",
      title: "Mandatory 75% Attendance Requirement for VTU Hall Ticket Eligibility",
      description: "Students with subject attendance below 75% are advised to meet their proctors immediately. Shortage list will be finalized on 20th November 2024.",
      targetRole: "student",
      date: "2024-11-02",
      isUrgent: true,
      read: false
    },
    {
      id: "NOTIF-03",
      category: "Fees",
      title: "Even Semester Fee Balance Clearance - Last Date Extended to Nov 30",
      description: "Students with outstanding tuition or laboratory balances must clear payments to avoid examination registration holds. Receipts can be downloaded online.",
      targetRole: "student",
      date: "2024-10-31",
      isUrgent: false,
      read: true
    },
    {
      id: "NOTIF-04",
      category: "Placement",
      title: "Dell Technologies & Bosch Pre-Placement Talk in Seminar Hall 1",
      description: "Registered 6th and 7th semester students must assemble in formal attire by 1:45 PM on Thursday with physical copies of their updated resumes.",
      targetRole: "student",
      date: "2024-10-29",
      isUrgent: false,
      read: true
    },
    {
      id: "NOTIF-05",
      category: "Faculty",
      title: "Submission of IA-2 Question Papers & Scheme of Evaluation to HOD Office",
      description: "All subject teachers for B.E. 4th, 6th and 8th semester must upload IA-2 question papers vetted according to Bloom's Taxonomy by 15-Nov-2024.",
      targetRole: "faculty",
      date: "2024-11-01",
      isUrgent: true,
      read: false
    }
  ],

  // Parent-Teacher Communication Messages
  parentMessages: [
    {
      id: "PT-01",
      from: "Dr. A. K. Manjunath (Mentor / Faculty)",
      to: "Mr. Tariq Ahmed (Parent)",
      studentUsn: "1HK21CS042",
      date: "2024-10-28",
      subject: "Proctorial Review: Rayan's Mid-Semester Progress",
      message: "Dear Mr. Tariq, Syed Rayan continues to maintain commendable academic discipline with 84.6% attendance and good IA-1 scores. Please encourage him to maintain regularity in Cloud Computing (21CS642) as attendance is near 75%.",
      status: "Read"
    },
    {
      id: "PT-02",
      from: "Mr. Tariq Ahmed (Parent)",
      to: "Dr. A. K. Manjunath (Mentor / Faculty)",
      studentUsn: "1HK21CS042",
      date: "2024-10-29",
      subject: "Re: Proctorial Review: Rayan's Mid-Semester Progress",
      message: "Thank you Dr. Manjunath. I have discussed the attendance with Rayan and ensured he attends all upcoming morning sessions without fail. We appreciate your dedicated guidance.",
      status: "Replied"
    }
  ],

  // Faculty Leave Applications
  facultyLeaves: [
    {
      id: "LV-2024-104",
      facultyId: "fac-001",
      facultyName: "Dr. A. K. Manjunath",
      leaveType: "On Duty (OD) - VTU Academic Conference",
      fromDate: "2024-11-14",
      toDate: "2024-11-15",
      days: 2,
      reason: "Presenting research paper on Distributed Consensus Protocols at IEEE VTU Symposium",
      alternateFaculty: "Prof. Archana S. (Handling period 1 on 14-Nov)",
      status: "Approved",
      appliedOn: "2024-11-01"
    }
  ],

  // Departments List for Admin
  departments: [
    { id: "dept-cse", code: "CSE", name: "Computer Science & Engineering", hod: "Dr. Tabassum Sultana", facultyCount: 38, studentCount: 720, intake: 180 },
    { id: "dept-ise", code: "ISE", name: "Information Science & Engineering", hod: "Dr. K. S. Jagadeesh", facultyCount: 26, studentCount: 480, intake: 120 },
    { id: "dept-ece", code: "ECE", name: "Electronics & Communication Engg.", hod: "Dr. H. M. Ravikumar", facultyCount: 30, studentCount: 520, intake: 120 },
    { id: "dept-aiml", code: "AI&ML", name: "Artificial Intelligence & Machine Learning", hod: "Dr. M. S. Suresh", facultyCount: 18, studentCount: 360, intake: 120 },
    { id: "dept-me", code: "ME", name: "Mechanical Engineering", hod: "Dr. C. P. Sridhar", facultyCount: 22, studentCount: 280, intake: 60 },
    { id: "dept-cv", code: "CIVIL", name: "Civil Engineering", hod: "Dr. B. K. Ramesh", facultyCount: 20, studentCount: 240, intake: 60 }
  ]
};

