import { useState } from 'react';
import { mockLeaveRequests } from '../data/mockData';
import { LeaveRequest } from '../types';

export default function Leaves() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = leaves.filter(l => {
    const matchSearch = l.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: string) => setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'approved' } : l));
  const handleReject = (id: string) => setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' } : l));

  const pending = leaves.filter(l => l.status === 'pending').length;
  const approved = leaves.filter(l => l.status === 'approved').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Leave Management</div>
          <div className="page-subtitle">{pending} pending approval</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Apply Leave</button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div>
            <div className="stat-value" style={{ color: 'var(--yellow)' }}>{pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>{approved}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value" style={{ color: 'var(--red)' }}>{leaves.filter(l => l.status === 'rejected').length}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="input" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input select" style={{ width: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td>
                    <div className="emp-row">
                      <div className="emp-avatar">{l.employeeName[0]}</div>
                      <span className="emp-name">{l.employeeName}</span>
                    </div>
                  </td>
                  <td>{l.department}</td>
                  <td style={{ textTransform: 'capitalize' }}>{l.leaveType}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{l.startDate}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{l.endDate}</td>
                  <td style={{ fontWeight: 600 }}>{l.days}</td>
                  <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{l.reason}</td>
                  <td><span className={`status-badge status-${l.status}`}>{l.status}</span></td>
                  <td>
                    {l.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-sm" style={{ background: 'var(--green-soft)', color: 'var(--green)', border: 'none' }} onClick={() => handleApprove(l.id)}>Approve</button>
                        <button className="btn btn-sm" style={{ background: 'var(--red-soft)', color: 'var(--red)', border: 'none' }} onClick={() => handleReject(l.id)}>Reject</button>
                      </div>
                    )}
                    {l.status !== 'pending' && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>}
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
              <div className="modal-title">Apply for Leave</div>
              <button className="icon-btn" onClick={() => setShowModal(false)} style={{ border: 'none' }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Leave Type</label>
                <select className="input select"><option>Annual</option><option>Sick</option><option>Casual</option><option>Unpaid</option></select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">From Date</label>
                  <input type="date" className="input" />
                </div>
                <div className="form-group">
                  <label className="form-label">To Date</label>
                  <input type="date" className="input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Reason</label>
                <textarea className="input" rows={3} placeholder="Enter reason for leave..." style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
