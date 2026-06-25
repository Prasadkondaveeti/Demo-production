import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { attendanceTrend, departmentHeadcount, payrollTrend, mockEmployees } from '../data/mockData';

const COLORS = ['#3b82f6', '#e06c4e', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4'];
const CT = ({ active, payload, label }: any) => active && payload?.length ? (
  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 12 }}>
    <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
    {payload.map((p: any) => <div key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>)}
  </div>
) : null;

export default function Reports() {
  const deptSalary = departmentHeadcount.map(d => ({
    department: d.department,
    total: mockEmployees.filter(e => e.department === d.department).reduce((s, e) => s + e.salary, 0),
  }));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Reports & Analytics</div>
          <div className="page-subtitle">Workforce insights overview</div>
        </div>
        <button className="btn btn-secondary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export All
        </button>
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Attendance Overview — 6 Months</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceTrend} barSize={14}>
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Bar dataKey="present" fill="#22c55e" radius={[3,3,0,0]} name="Present" />
              <Bar dataKey="absent" fill="#ef4444" radius={[3,3,0,0]} name="Absent" />
              <Bar dataKey="leave" fill="#f59e0b" radius={[3,3,0,0]} name="Leave" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Monthly Payroll Spend</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={payrollTrend}>
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CT />} />
              <Line type="monotone" dataKey="total" stroke="var(--accent)" strokeWidth={2} dot={{ fill: 'var(--accent)', r: 4 }} name="Total (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Department Salary Distribution</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptSalary} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="department" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CT />} />
              <Bar dataKey="total" fill="var(--blue)" radius={[0,4,4,0]} name="Total (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Employee Status Breakdown</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Active', value: mockEmployees.filter(e => e.status === 'active').length },
                  { name: 'On Leave', value: mockEmployees.filter(e => e.status === 'on_leave').length },
                  { name: 'Inactive', value: mockEmployees.filter(e => e.status === 'inactive').length },
                ]}
                dataKey="value" cx="50%" cy="50%" outerRadius={80} paddingAngle={4}
              >
                <Cell fill="#22c55e" /><Cell fill="#f59e0b" /><Cell fill="#ef4444" />
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
            {[{ label: 'Active', color: '#22c55e' }, { label: 'On Leave', color: '#f59e0b' }, { label: 'Inactive', color: '#ef4444' }].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
