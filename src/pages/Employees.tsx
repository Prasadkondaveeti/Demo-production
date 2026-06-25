import { useState } from 'react';
import { mockEmployees } from '../data/mockData';
import { Employee } from '../types';

export default function Employees() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', designation: '', salary: '', status: 'active' as Employee['status'] });

  const departments = [...new Set(mockEmployees.map(e => e.department))];

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.employeeId.includes(search) || e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = !dept || e.department === dept;
    const matchStatus = !status || e.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const openAdd = () => {
    setEditEmp(null);
    setForm({ name: '', email: '', phone: '', department: '', designation: '', salary: '', status: 'active' });
    setShowModal(true);
  };

  const openEdit = (emp: Employee) => {
    setEditEmp(emp);
    setForm({ name: emp.name, email: emp.email, phone: emp.phone, department: emp.department, designation: emp.designation, salary: String(emp.salary), status: emp.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editEmp) {
      setEmployees(prev => prev.map(e => e.id === editEmp.id ? { ...e, ...form, salary: Number(form.salary) } : e));
    } else {
      const newEmp: Employee = {
        id: String(Date.now()), employeeId: `LB00${employees.length + 1}`,
        name: form.name, email: form.email, phone: form.phone,
        department: form.department, designation: form.designation,
        joinDate: new Date().toISOString().split('T')[0],
        status: form.status, salary: Number(form.salary),
      };
      setEmployees(prev => [...prev, newEmp]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this employee?')) setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Employees</div>
          <div className="page-subtitle">{filtered.length} of {employees.length} employees</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Employee
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="input" placeholder="Search by name, ID, email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input select" style={{ width: 160 }} value={dept} onChange={e => setDept(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="input select" style={{ width: 140 }} value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on_leave">On Leave</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Join Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-row">
                      <div className="emp-avatar">{emp.name[0]}</div>
                      <div>
                        <div className="emp-name">{emp.name}</div>
                        <div className="emp-id">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{emp.employeeId}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{emp.joinDate}</td>
                  <td>₹{emp.salary.toLocaleString('en-IN')}</td>
                  <td><span className={`status-badge status-${emp.status}`}>{emp.status.replace('_', ' ')}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(emp)}>Edit</button>
                      <button className="btn btn-sm" style={{ background: 'var(--red-soft)', color: 'var(--red)', border: 'none' }} onClick={() => handleDelete(emp.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editEmp ? 'Edit Employee' : 'Add Employee'}</div>
              <button className="icon-btn" onClick={() => setShowModal(false)} style={{ border: 'none' }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="employee@longbow.in" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="9xxxxxxxxx" />
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input className="input" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Engineering" />
                </div>
                <div className="form-group">
                  <label className="form-label">Designation</label>
                  <input className="input" value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} placeholder="Senior Developer" />
                </div>
                <div className="form-group">
                  <label className="form-label">Salary (₹)</label>
                  <input className="input" type="number" value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} placeholder="75000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="input select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Employee['status'] }))}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editEmp ? 'Update' : 'Add Employee'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
