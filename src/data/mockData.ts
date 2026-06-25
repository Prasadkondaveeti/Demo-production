import { Employee, AttendanceRecord, PayrollRecord, LeaveRequest, Asset, Notification } from '../types';

export const mockEmployees: Employee[] = [
  { id: '1', employeeId: 'LB001', name: 'Rajesh Kumar', email: 'rajesh@longbow.in', phone: '9876543210', department: 'Engineering', designation: 'Senior Developer', joinDate: '2022-01-15', status: 'active', salary: 85000 },
  { id: '2', employeeId: 'LB002', name: 'Priya Sharma', email: 'priya@longbow.in', phone: '9876543211', department: 'HR', designation: 'HR Manager', joinDate: '2021-06-01', status: 'active', salary: 75000 },
  { id: '3', employeeId: 'LB003', name: 'Arun Reddy', email: 'arun@longbow.in', phone: '9876543212', department: 'Finance', designation: 'Finance Lead', joinDate: '2020-03-10', status: 'active', salary: 90000 },
  { id: '4', employeeId: 'LB004', name: 'Sneha Patel', email: 'sneha@longbow.in', phone: '9876543213', department: 'Engineering', designation: 'React Developer', joinDate: '2023-02-20', status: 'active', salary: 65000 },
  { id: '5', employeeId: 'LB005', name: 'Vikram Singh', email: 'vikram@longbow.in', phone: '9876543214', department: 'Sales', designation: 'Sales Manager', joinDate: '2021-11-05', status: 'on_leave', salary: 70000 },
  { id: '6', employeeId: 'LB006', name: 'Kavya Nair', email: 'kavya@longbow.in', phone: '9876543215', department: 'Design', designation: 'UI/UX Designer', joinDate: '2022-07-18', status: 'active', salary: 68000 },
  { id: '7', employeeId: 'LB007', name: 'Suresh Babu', email: 'suresh@longbow.in', phone: '9876543216', department: 'Engineering', designation: 'Backend Developer', joinDate: '2022-09-01', status: 'active', salary: 78000 },
  { id: '8', employeeId: 'LB008', name: 'Anita Kumari', email: 'anita@longbow.in', phone: '9876543217', department: 'Marketing', designation: 'Marketing Executive', joinDate: '2023-05-15', status: 'inactive', salary: 55000 },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: '1', employeeId: 'LB001', employeeName: 'Rajesh Kumar', date: '2025-08-15', checkIn: '09:02', checkOut: '18:15', status: 'present', workHours: 9.2 },
  { id: '2', employeeId: 'LB002', employeeName: 'Priya Sharma', date: '2025-08-15', checkIn: '09:45', checkOut: '18:00', status: 'late', workHours: 8.25 },
  { id: '3', employeeId: 'LB003', employeeName: 'Arun Reddy', date: '2025-08-15', checkIn: '08:55', checkOut: '18:05', status: 'present', workHours: 9.2 },
  { id: '4', employeeId: 'LB004', employeeName: 'Sneha Patel', date: '2025-08-15', checkIn: '', checkOut: '', status: 'absent', workHours: 0 },
  { id: '5', employeeId: 'LB005', employeeName: 'Vikram Singh', date: '2025-08-15', checkIn: '', checkOut: '', status: 'absent', workHours: 0 },
  { id: '6', employeeId: 'LB006', employeeName: 'Kavya Nair', date: '2025-08-15', checkIn: '09:00', checkOut: '13:30', status: 'half_day', workHours: 4.5 },
  { id: '7', employeeId: 'LB007', employeeName: 'Suresh Babu', date: '2025-08-15', checkIn: '08:50', checkOut: '18:10', status: 'present', workHours: 9.3 },
  { id: '8', employeeId: 'LB008', employeeName: 'Anita Kumari', date: '2025-08-15', checkIn: '09:05', checkOut: '18:00', status: 'present', workHours: 8.9 },
];

export const mockPayroll: PayrollRecord[] = [
  { id: '1', employeeId: 'LB001', employeeName: 'Rajesh Kumar', department: 'Engineering', month: 'August 2025', basicSalary: 85000, hra: 17000, allowances: 5000, deductions: 8500, netSalary: 98500, status: 'processed' },
  { id: '2', employeeId: 'LB002', employeeName: 'Priya Sharma', department: 'HR', month: 'August 2025', basicSalary: 75000, hra: 15000, allowances: 4000, deductions: 7500, netSalary: 86500, status: 'paid' },
  { id: '3', employeeId: 'LB003', employeeName: 'Arun Reddy', department: 'Finance', month: 'August 2025', basicSalary: 90000, hra: 18000, allowances: 6000, deductions: 9000, netSalary: 105000, status: 'pending' },
  { id: '4', employeeId: 'LB004', employeeName: 'Sneha Patel', department: 'Engineering', month: 'August 2025', basicSalary: 65000, hra: 13000, allowances: 3000, deductions: 6500, netSalary: 74500, status: 'pending' },
  { id: '5', employeeId: 'LB005', employeeName: 'Vikram Singh', department: 'Sales', month: 'August 2025', basicSalary: 70000, hra: 14000, allowances: 8000, deductions: 7000, netSalary: 85000, status: 'processed' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: 'LB005', employeeName: 'Vikram Singh', department: 'Sales', leaveType: 'annual', startDate: '2025-08-12', endDate: '2025-08-16', days: 5, reason: 'Family vacation', status: 'approved', appliedDate: '2025-08-01' },
  { id: '2', employeeId: 'LB004', employeeName: 'Sneha Patel', department: 'Engineering', leaveType: 'sick', startDate: '2025-08-15', endDate: '2025-08-15', days: 1, reason: 'Not feeling well', status: 'pending', appliedDate: '2025-08-14' },
  { id: '3', employeeId: 'LB006', employeeName: 'Kavya Nair', department: 'Design', leaveType: 'casual', startDate: '2025-08-20', endDate: '2025-08-21', days: 2, reason: 'Personal work', status: 'pending', appliedDate: '2025-08-10' },
  { id: '4', employeeId: 'LB007', employeeName: 'Suresh Babu', department: 'Engineering', leaveType: 'casual', startDate: '2025-07-25', endDate: '2025-07-25', days: 1, reason: 'Personal errands', status: 'rejected', appliedDate: '2025-07-20' },
];

export const mockAssets: Asset[] = [
  { id: '1', assetId: 'AST001', name: 'MacBook Pro 14"', type: 'Laptop', assignedTo: 'Rajesh Kumar', employeeId: 'LB001', purchaseDate: '2022-01-20', value: 180000, status: 'assigned', serialNumber: 'MBP2022001' },
  { id: '2', assetId: 'AST002', name: 'Dell XPS 15', type: 'Laptop', assignedTo: 'Sneha Patel', employeeId: 'LB004', purchaseDate: '2023-02-25', value: 120000, status: 'assigned', serialNumber: 'DXPS2023001' },
  { id: '3', assetId: 'AST003', name: 'iPhone 14 Pro', type: 'Mobile', assignedTo: 'Vikram Singh', employeeId: 'LB005', purchaseDate: '2022-11-10', value: 130000, status: 'assigned', serialNumber: 'IPH2022001' },
  { id: '4', assetId: 'AST004', name: 'Dell Monitor 27"', type: 'Monitor', purchaseDate: '2021-06-15', value: 35000, status: 'available', serialNumber: 'DM2021001' },
  { id: '5', assetId: 'AST005', name: 'HP LaserJet', type: 'Printer', purchaseDate: '2020-08-20', value: 25000, status: 'maintenance', serialNumber: 'HPLJ2020001' },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Leave Request', message: 'Sneha Patel has applied for sick leave on 15 Aug', type: 'info', read: false, createdAt: '2025-08-14T10:30:00' },
  { id: '2', title: 'Payroll Alert', message: 'August payroll processing is pending for 3 employees', type: 'warning', read: false, createdAt: '2025-08-14T09:00:00' },
  { id: '3', title: 'Asset Request', message: 'Kavya Nair requested a new keyboard', type: 'info', read: true, createdAt: '2025-08-13T15:45:00' },
  { id: '4', title: 'Attendance Alert', message: 'Sneha Patel marked absent today', type: 'warning', read: false, createdAt: '2025-08-15T09:30:00' },
];

export const attendanceTrend = [
  { month: 'Mar', present: 92, absent: 5, leave: 3 },
  { month: 'Apr', present: 88, absent: 7, leave: 5 },
  { month: 'May', present: 94, absent: 3, leave: 3 },
  { month: 'Jun', present: 90, absent: 6, leave: 4 },
  { month: 'Jul', present: 87, absent: 8, leave: 5 },
  { month: 'Aug', present: 91, absent: 5, leave: 4 },
];

export const departmentHeadcount = [
  { department: 'Engineering', count: 3 },
  { department: 'HR', count: 1 },
  { department: 'Finance', count: 1 },
  { department: 'Sales', count: 1 },
  { department: 'Design', count: 1 },
  { department: 'Marketing', count: 1 },
];

export const payrollTrend = [
  { month: 'Mar', total: 520000 },
  { month: 'Apr', total: 535000 },
  { month: 'May', total: 528000 },
  { month: 'Jun', total: 542000 },
  { month: 'Jul', total: 549000 },
  { month: 'Aug', total: 549500 },
];
