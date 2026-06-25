import { useState } from 'react';
import { mockAssets } from '../data/mockData';

export default function Assets() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const types = [...new Set(mockAssets.map(a => a.type))];

  const filtered = mockAssets.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.assetId.includes(search) || (a.assignedTo || '').toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || a.type === typeFilter;
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalValue = mockAssets.reduce((s, a) => s + a.value, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Asset Management</div>
          <div className="page-subtitle">{mockAssets.length} assets • Total value ₹{totalValue.toLocaleString('en-IN')}</div>
        </div>
        <button className="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Asset
        </button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total Assets', value: mockAssets.length, color: 'var(--blue)' },
          { label: 'Assigned', value: mockAssets.filter(a => a.status === 'assigned').length, color: 'var(--green)' },
          { label: 'Available', value: mockAssets.filter(a => a.status === 'available').length, color: 'var(--accent)' },
          { label: 'Maintenance', value: mockAssets.filter(a => a.status === 'maintenance').length, color: 'var(--yellow)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="input" placeholder="Search asset, employee..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input select" style={{ width: 150 }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="input select" style={{ width: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="maintenance">Maintenance</option>
          <option value="retired">Retired</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Serial No.</th>
                <th>Assigned To</th>
                <th>Purchase Date</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{a.assetId}</td>
                  <td style={{ fontWeight: 500 }}>{a.name}</td>
                  <td>{a.type}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>{a.serialNumber}</td>
                  <td>
                    {a.assignedTo
                      ? <div className="emp-row"><div className="emp-avatar">{a.assignedTo[0]}</div><span>{a.assignedTo}</span></div>
                      : <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>
                    }
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{a.purchaseDate}</td>
                  <td>₹{a.value.toLocaleString('en-IN')}</td>
                  <td><span className={`status-badge status-${a.status}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
