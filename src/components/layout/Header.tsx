import { useState } from 'react';
import { mockNotifications } from '../../data/mockData';

interface HeaderProps { title: string; }

const pageIcons: Record<string, string> = {
  dashboard: 'Dashboard',
  employees: 'Employee Management',
  attendance: 'Attendance',
  payroll: 'Payroll',
  leaves: 'Leave Management',
  assets: 'Asset Management',
  compliance: 'Compliance',
  reports: 'Reports & Analytics',
};

export default function Header({ title }: HeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = mockNotifications.filter(n => !n.read).length;

  const formatTime = (dt: string) => {
    const d = new Date(dt);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="header">
      <div className="header-title">{pageIcons[title] || title}</div>
      <div className="header-actions">
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifs(!showNotifs)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unread > 0 && <span className="badge">{unread}</span>}
          </button>
          {showNotifs && (
            <div className="notif-panel">
              <div className="notif-header">Notifications ({unread} unread)</div>
              {mockNotifications.map(n => (
                <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {!n.read && <div className="notif-dot" />}
                    <div style={{ flex: 1 }}>
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-msg">{n.message}</div>
                      <div className="notif-time">{formatTime(n.createdAt)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="icon-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          </svg>
        </button>

        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}
        </div>
      </div>
    </header>
  );
}
