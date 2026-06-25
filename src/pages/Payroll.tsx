import { useState } from 'react';
import { mockPayroll } from '../data/mockData';

export default function Payroll() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = mockPayroll.filter(p => {
    const matchSearch = p.employeeName.toLowerCase().includes(search.toLowerCase()) || p.employeeId.includes(search);
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalNetSalary = mockPayroll.reduce((sum, p) => sum + p.netSalary, 0);
  const pending = mockPayroll.filter(p => p.status === 'pending').length;
  const processed = mockPayroll.filter(p => p.status === 'processed').length;
  const paid = mockPayroll.filter(p => p.status === 'paid').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Payroll</div>
          <div className="page-subtitle">August 2025 • Total: ₹{totalNetSalary.toLocaleString('en-IN')}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
          <button className="btn btn-primary">Run Payroll</button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Payroll', value: `₹${(totalNetSalary/100000).toFixed(1)}L`, color: 'var(--accent)' },
          { label: 'Pending', value: pending, color: 'var(--yellow)' },
          { label: 'Processed', value: processed, color: 'var(--blue)' },
          { label: 'Paid', value: paid, color: 'var(--green)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div>
              <div className="stat-value" style={{ color: s.color, fontSize: 20 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="input" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input select" style={{ width: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processed">Processed</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>HRA</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="emp-row">
                      <div className="emp-avatar">{p.employeeName[0]}</div>
                      <div>
                        <div className="emp-name">{p.employeeName}</div>
                        <div className="emp-id">{p.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.department}</td>
                  <td>₹{p.basicSalary.toLocaleString('en-IN')}</td>
                  <td>₹{p.hra.toLocaleString('en-IN')}</td>
                  <td>₹{p.allowances.toLocaleString('en-IN')}</td>
                  <td style={{ color: 'var(--red)' }}>-₹{p.deductions.toLocaleString('en-IN')}</td>
                  <td style={{ fontWeight: 600, color: 'var(--green)' }}>₹{p.netSalary.toLocaleString('en-IN')}</td>
                  <td><span className={`status-badge status-${p.status}`}>{p.status}</span></td>
                  <td>
                    {p.status === 'pending' && (
                      <button className="btn btn-primary btn-sm">Process</button>
                    )}
                    {p.status === 'processed' && (
                      <button className="btn btn-secondary btn-sm">Pay Now</button>
                    )}
                    {p.status === 'paid' && (
                      <button className="btn btn-secondary btn-sm">Slip</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
