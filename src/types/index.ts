// User Roles
export type UserRole = 'super_admin' | 'company_owner' | 'company_admin' | 'manager' | 'employee';

// Company Types
export interface Company {
  id: string;
  name: string;
  logo?: string;
  address: string;
  currency: string;
  language: 'ar' | 'en';
  workingHours: {
    start: string;
    end: string;
  };
  parentCompanyId?: string;
  isActive: boolean;
  createdAt: string;
  employeeCount: number;
}

// Employee Types
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  departmentId: string;
  departmentName: string;
  companyId: string;
  companyName: string;
  role: UserRole;
  hireDate: string;
  workingHours: {
    start: string;
    end: string;
  };
  allowRemoteWork: boolean;
  isActive: boolean;
  address?: string;
}

// Department Types
export interface Department {
  id: string;
  name: string;
  companyId: string;
  managerId?: string;
  employeeCount: number;
}

// Task Types
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar?: string;
  companyId: string;
  startDate: string;
  dueDate: string;
  completedAt?: string;
  timeSpent: number; // in minutes
  createdAt: string;
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'early_leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  workDuration?: number; // in minutes
  notes?: string;
}

// Leave Types
export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'custom';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

// Stats Types
export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  averageWorkHours: number;
  productivityRate: number;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}
