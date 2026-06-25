import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (!ok) setError('Invalid email or password. Try the quick logins below.');
      setLoading(false);
    }, 500);
  };

  const quickLogin = (e: string, p: string) => { setEmail(e); setPassword(p); };

  const quickLogins = [
    { label: 'Admin', email: 'admin@longbow.in', password: 'admin123' },
    { label: 'HR Manager', email: 'hr@longbow.in', password: 'hr123' },
    { label: 'Manager', email: 'manager@longbow.in', password: 'mgr123' },
    { label: 'Employee', email: 'employee@longbow.in', password: 'emp123' },
    { label: 'Finance', email: 'finance@longbow.in', password: 'fin123' },
  ];

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">LB</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>LongBow HRMS</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Admin Portal</div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Welcome back</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Sign in to your account</div>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="input" type="email" placeholder="you@longbow.in" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <div className="quick-logins">
          <div className="quick-login-title">Quick Login</div>
          <div className="quick-login-btns">
            {quickLogins.map(q => (
              <button key={q.label} className="quick-login-btn" onClick={() => quickLogin(q.email, q.password)}>
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
