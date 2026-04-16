export type Role = "SUPER_ADMIN" | "ADMIN" | "TEACHER";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type StudentStatus = "ACTIVE" | "INACTIVE";
export type CertificateType = "TESTIMONIAL" | "CHARACTER" | "TRANSFER" | "CERTIFICATE";
export type AdmissionStatus = "PENDING" | "APPROVED" | "REJECTED";
export type CommitteeRole = "PRESIDENT" | "SECRETARY" | "MEMBER" | "TEACHER_REP";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  banglaName?: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date;
  gender: Gender;
  religion?: string;
  class: string;
  section?: string;
  roll?: number;
  session: string;
  address?: string;
  phone?: string;
  photo?: string;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  banglaName?: string;
  designation: string;
  subject: string;
  qualification?: string;
  joiningDate: Date;
  phone?: string;
  email?: string;
  photo?: string;
  status: boolean;
  nid?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  attachmentUrl?: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId?: string;
  author?: User;
}

export interface Result {
  id: string;
  studentId: string;
  examName: string;
  subject: string;
  fullMarks: number;
  passMarks: number;
  obtainedMarks: number;
  grade?: string;
  gpa?: number;
  session: string;
  class: string;
  section?: string;
  year: string;
  publishedAt?: Date;
  createdAt: Date;
  student?: Student;
}

export interface Certificate {
  id: string;
  certificateNo: string;
  studentId: string;
  studentName: string;
  fatherName: string;
  class: string;
  session: string;
  issueDate: Date;
  type: CertificateType;
  qrCode?: string;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
}

export interface Admission {
  id: string;
  applicantName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date;
  gender: Gender;
  class: string;
  session: string;
  previousSchool?: string;
  previousClass?: string;
  previousGpa?: number;
  phone: string;
  address: string;
  photo?: string;
  status: AdmissionStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommitteeMember {
  id: string;
  name: string;
  banglaName?: string;
  designation: string;
  role: CommitteeRole;
  phone?: string;
  photo?: string;
  tenure?: string;
  isActive: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Gallery {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
  takenAt?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  isActive: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
