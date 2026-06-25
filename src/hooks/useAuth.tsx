import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@longbow.in': {
    password: 'admin123',
    user: { id: '1', name: 'Admin User', email: 'admin@longbow.in', role: 'admin', department: 'Management' },
  },
  'hr@longbow.in': {
    password: 'hr123',
    user: { id: '2', name: 'Priya Sharma', email: 'hr@longbow.in', role: 'hr_manager', department: 'HR' },
  },
  'manager@longbow.in': {
    password: 'mgr123',
    user: { id: '3', name: 'Rajesh Kumar', email: 'manager@longbow.in', role: 'manager', department: 'Engineering' },
  },
  'employee@longbow.in': {
    password: 'emp123',
    user: { id: '4', name: 'Sneha Patel', email: 'employee@longbow.in', role: 'employee', department: 'Engineering' },
  },
  'finance@longbow.in': {
    password: 'fin123',
    user: { id: '5', name: 'Arun Reddy', email: 'finance@longbow.in', role: 'finance', department: 'Finance' },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const record = mockUsers[email];
    if (record && record.password === password) {
      setUser(record.user);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const rolePermissions: Record<Role, string[]> = {
  admin: ['dashboard', 'employees', 'attendance', 'payroll', 'leaves', 'assets', 'compliance', 'reports'],
  hr_manager: ['dashboard', 'employees', 'attendance', 'leaves', 'assets', 'reports'],
  manager: ['dashboard', 'employees', 'attendance', 'leaves'],
  employee: ['dashboard', 'attendance', 'leaves'],
  finance: ['dashboard', 'payroll', 'reports'],
};
