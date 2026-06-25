import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { mockEmployees, mockAttendance, mockLeaveRequests, attendanceTrend, departmentHeadcount, payrollTrend } from '../data/mockData';

const COLORS = ['#3b82f6', '#e06c4e', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 12 }}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const activeEmployees = mockEmployees.filter(e => e.status === 'active').length;
  const presentToday = mockAttendance.filter(a => a.status === 'present').length;
  const onLeave = mockEmployees.filter(e => e.status === 'on_leave').length;
  const pendingLeaves = mockLeaveRequests.filter(l => l.status === 'pending').length;

  const stats = [
    { label: 'Total Employees', value: mockEmployees.length, change: '+2 this month', up: true, color: 'var(--blue)', bg: 'var(--blue-soft)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Present Today', value: presentToday, change: `${Math.round(presentToday/mockEmployees.length*100)}% attendance`, up: true, color: 'var(--green)', bg: 'var(--green-soft)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
    { label: 'On Leave', value: onLeave, change: `${pendingLeaves} pending approval`, up: false, color: 'var(--yellow)', bg: 'var(--yellow-soft)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { label: 'Active Employees', value: activeEmployees, change: 'Of total workforce', up: true, color: 'var(--accent)', bg: 'var(--accent-soft)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  ];

  const recentLeaves = mockLeaveRequests.slice(0, 4);


  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.up ? '↑' : '↓'} {s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Charts */}
      <div className="grid-2-1" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Attendance Trend</div>
              <div className="card-subtitle">Last 6 months overview</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={attendanceTrend}>
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="present" stackId="1" stroke="#22c55e" fill="rgba(34,197,94,0.15)" name="Present" />
              <Area type="monotone" dataKey="leave" stackId="1" stroke="#f59e0b" fill="rgba(245,158,11,0.15)" name="Leave" />
              <Area type="monotone" dataKey="absent" stackId="1" stroke="#ef4444" fill="rgba(239,68,68,0.15)" name="Absent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Dept. Headcount</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departmentHeadcount} dataKey="count" nameKey="department" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                {departmentHeadcount.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val, name) => [val, name]} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 }}>
            {departmentHeadcount.map((d, i) => (
              <div key={d.department} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                {d.department} ({d.count})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Payroll Trend</div>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Monthly total (₹)</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={payrollTrend} barSize={20}>
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" fill="var(--accent)" radius={[4,4,0,0]} name="Total (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Leave Requests</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentLeaves.map(l => (
              <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div className="emp-avatar">{l.employeeName[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{l.employeeName}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{l.leaveType} • {l.days}d</div>
                </div>
                <span className={`status-badge status-${l.status}`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
