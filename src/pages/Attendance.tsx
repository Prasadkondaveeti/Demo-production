import { useState } from 'react';
import { mockAttendance } from '../data/mockData';

export default function Attendance() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filtered = mockAttendance.filter(a => {
    const matchSearch = a.employeeName.toLowerCase().includes(search.toLowerCase()) || a.employeeId.includes(search);
    const matchFilter = !filter || a.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    present: mockAttendance.filter(a => a.status === 'present').length,
    absent: mockAttendance.filter(a => a.status === 'absent').length,
    late: mockAttendance.filter(a => a.status === 'late').length,
    half_day: mockAttendance.filter(a => a.status === 'half_day').length,
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Attendance</div>
          <div className="page-subtitle">Today — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <button className="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Present', value: counts.present, cls: 'status-present' },
          { label: 'Absent', value: counts.absent, cls: 'status-absent' },
          { label: 'Late', value: counts.late, cls: 'status-late' },
          { label: 'Half Day', value: counts.half_day, cls: 'status-half_day' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <div className="stat-value">{s.value}</div>
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
        <select className="input select" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
          <option value="half_day">Half Day</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>
                    <div className="emp-row">
                      <div className="emp-avatar">{a.employeeName[0]}</div>
                      <span className="emp-name">{a.employeeName}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{a.employeeId}</td>
                  <td>{a.checkIn || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>{a.checkOut || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>{a.workHours > 0 ? `${a.workHours}h` : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td><span className={`status-badge status-${a.status}`}>{a.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
