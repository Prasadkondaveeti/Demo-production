export default function Compliance() {
  const items = [
    { id: 1, title: 'PF Compliance', description: 'Provident Fund filing for August 2025', dueDate: '2025-09-15', status: 'pending', category: 'Statutory' },
    { id: 2, title: 'ESI Filing', description: 'Employee State Insurance monthly filing', dueDate: '2025-09-21', status: 'pending', category: 'Statutory' },
    { id: 3, title: 'TDS Deduction', description: 'Tax Deducted at Source for Q2', dueDate: '2025-10-07', status: 'in_progress', category: 'Tax' },
    { id: 4, title: 'Gratuity Fund', description: 'Quarterly gratuity fund deposit', dueDate: '2025-09-30', status: 'completed', category: 'Statutory' },
    { id: 5, title: 'Labour Law Audit', description: 'Annual labour law compliance audit', dueDate: '2025-12-31', status: 'pending', category: 'Audit' },
    { id: 6, title: 'Form 16 Issuance', description: 'Annual TDS certificate for all employees', dueDate: '2025-06-15', status: 'completed', category: 'Tax' },
  ];

  const statusColor: Record<string, string> = {
    pending: 'status-pending',
    in_progress: 'status-half_day',
    completed: 'status-approved',
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Compliance</div>
          <div className="page-subtitle">Statutory & regulatory compliance tracker</div>
        </div>
        <button className="btn btn-primary">Add Task</button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { label: 'Pending', value: items.filter(i => i.status === 'pending').length, color: 'var(--yellow)' },
          { label: 'In Progress', value: items.filter(i => i.status === 'in_progress').length, color: 'var(--blue)' },
          { label: 'Completed', value: items.filter(i => i.status === 'completed').length, color: 'var(--green)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div><div className="stat-value" style={{ color: s.color }}>{s.value}</div><div className="stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500 }}>{item.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{item.description}</td>
                  <td>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ color: new Date(item.dueDate) < new Date() ? 'var(--red)' : 'var(--text-secondary)' }}>{item.dueDate}</td>
                  <td><span className={`status-badge ${statusColor[item.status]}`}>{item.status.replace('_', ' ')}</span></td>
                  <td>
                    {item.status !== 'completed' && (
                      <button className="btn btn-secondary btn-sm">Update</button>
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
