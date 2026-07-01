

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input, Btn, Spinner } from "../ui";
import { apiFetch } from "../../utils/api";

// ─────────────────────────────────────────────
//  MOCK DATA inline — no import needed
//  Admin is locked, ANY other email = USER
// ─────────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@roombook.com';
const ADMIN_PASSWORD = 'admin123';

function buildGuestUser(email, password) {
  const namePart   = email.split('@')[0];
  const namePieces = namePart
    .split(/[.\-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return {
    id:          Date.now(),
    firstName:   namePieces[0] || 'User',
    lastName:    namePieces[1] || '',
    email:       email.trim().toLowerCase(),
    password,
    role:        'USER',
    department:  'General',
    employeeId:  `EMP-${Math.floor(Math.random() * 9000) + 1000}`,
    phone:       '',
    memberSince: new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric',
    }),
  };
}

// ─────────────────────────────────────────────
//  INLINE STYLES
// ─────────────────────────────────────────────
const S = {
  page: {
    minHeight: '100vh', display: 'flex', background: '#0F172A',
  },
  left: {
    flex: 1,
    background: 'linear-gradient(135deg,#1B2A6B,#2D3D99)',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', padding: '60px 56px',
    position: 'relative', overflow: 'hidden',
  },
  circle1: {
    position: 'absolute', top: -80, right: -80,
    width: 300, height: 300, borderRadius: '50%',
    background: 'rgba(255,255,255,.04)',
  },
  circle2: {
    position: 'absolute', bottom: -60, left: -40,
    width: 240, height: 240, borderRadius: '50%',
    background: 'rgba(255,255,255,.04)',
  },
  right: {
    width: 480, background: '#fff',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', padding: '48px',
  },
  h1: {
    fontFamily: '"Playfair Display",serif',
    fontSize: 26, color: '#0F172A', marginBottom: 6,
  },
  sub: { fontSize: 13, color: '#64748B', marginBottom: 24 },
  tabs: {
    display: 'flex', border: '1.5px solid #E2E8F0',
    borderRadius: 10, overflow: 'hidden', marginBottom: 20,
  },
  tab: (active) => ({
    flex: 1, padding: '9px', fontSize: 13, fontWeight: 700,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all .2s',
    background: active ? '#0e1a48' : '#fff',
    color:      active ? '#fff'    : '#64748B',
  }),
  demo: {
    background: '#EFF6FF', border: '1px solid #BFDBFE',
    borderRadius: 10, padding: '12px 14px',
    marginBottom: 20, fontSize: 12, color: '#193ba3',
  },
  demoTitle: {
    fontWeight: 700, marginBottom: 8, fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '.05em',
  },
  demoRow: {
    display: 'flex', justifyContent: 'space-between',
    padding: '4px 6px', borderRadius: 6,
    cursor: 'pointer', marginBottom: 3,
    transition: 'background .15s',
  },
  errBox: {
    background: '#FEF2F2', border: '1px solid #FCA5A5',
    borderRadius: 8, padding: '10px 14px',
    fontSize: 12, color: '#DC2626', marginBottom: 14,
  },
  label: {
    display: 'block', fontSize: 11, fontWeight: 700,
    color: '#64748B', marginBottom: 5,
    textTransform: 'uppercase', letterSpacing: '.05em',
  },
  input: {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #E2E8F0', borderRadius: 10,
    fontSize: 13, color: '#0F172A', background: '#fff',
    outline: 'none', marginBottom: 14,
    fontFamily: 'inherit',
  },
  btn: {
    width: '100%', padding: '13px', borderRadius: 10,
    fontSize: 14, fontWeight: 700, border: 'none',
    cursor: 'pointer', background: '#1B2A6B', color: '#fff',
    fontFamily: 'inherit', transition: 'background .2s',
    marginTop: 4,
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  switchText: {
    textAlign: 'center', fontSize: 12,
    color: '#94A3B8', marginTop: 14,
  },
  link: { color: '#1B2A6B', fontWeight: 700, cursor: 'pointer' },
};

export default function LoginPage({ setPage }) {
  const { login } = useAuth();
  const [tab,      setTab]      = useState('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [fn,       setFn]       = useState('');
  const [ln,       setLn]       = useState('');
  const [dept,     setDept]     = useState('');
  const [empId,    setEmpId]    = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  // ── SIGN IN ──────────────────────────────────
  const doLogin = async () => {
    setError('');
    const trimEmail = email.trim().toLowerCase();
    const trimPass  = password.trim();

    if (!trimEmail) { setError('Please enter your email address'); return; }
    if (!trimEmail.includes('@')) { setError('Please enter a valid email address'); return; }

    setLoading(true);

    try {
      // 1️⃣ Try real Spring Boot backend
      let backendUser = null;
      try {
        const res = await fetch('http://localhost:8080/api/auth/login', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email: trimEmail, password: trimPass }),
        });
        if (res.ok) {
          const data = await res.json();
          backendUser = data.data || data;
        }
      } catch (_) {
        // Backend offline — use mock below
      }

      if (backendUser) {
        login(backendUser);
        setPage(backendUser.role === 'ADMIN' ? 'adminDashboard' : 'dashboard');
        return;
      }

      // 2️⃣ Admin check (locked)
      if (trimEmail === ADMIN_EMAIL) {
        if (trimPass === ADMIN_PASSWORD) {
          const adminUser = {
            id: 2, firstName: 'Admin', lastName: 'User',
            email: ADMIN_EMAIL, role: 'ADMIN',
            department: 'IT', employeeId: 'EMP-000',
            phone: '', memberSince: '01 January 2025',
          };
          login(adminUser);
          setPage('adminDashboard');
          return;
        } else {
          setError('Incorrect admin password. Use: admin123');
          setLoading(false);
          return;
        }
      }

      // 3️⃣ ANY other email → auto login as USER ✅
      const guestUser = buildGuestUser(trimEmail, trimPass);
      login(guestUser);
      setPage('dashboard');

    } catch (e) {
      setError(e.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── REGISTER ─────────────────────────────────
  const doRegister = async () => {
    setError('');
    if (!fn || !ln || !email || !password) {
      setError('Please fill all required fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('');
      return;
    }
    setLoading(true);
    try {
      // Try real backend
      let backendUser = null;
      try {
        const res = await fetch('http://localhost:8080/api/auth/register', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            firstName: fn, lastName: ln,
            email, password,
            department: dept, employeeId: empId,
            role: 'USER',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          backendUser = data.data || data;
        }
      } catch (_) { /* backend offline */ }

      const user = backendUser || {
        id:          Date.now(),
        firstName:   fn, lastName: ln,
        email:       email.trim().toLowerCase(),
        role:        'USER',
        department:  dept || 'General',
        employeeId:  empId || `EMP-${Math.floor(Math.random()*9000)+1000}`,
        phone:       '',
        memberSince: new Date().toLocaleDateString('en-IN', {
          day: '2-digit', month: 'long', year: 'numeric',
        }),
      };
      login(user);
      setPage('dashboard');
    } catch (e) {
      setError(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') tab === 'login' ? doLogin() : doRegister();
  };

  return (
    <div style={S.page}>
      {/* ── Left panel ── */}
      <div style={S.left}>
        <div style={S.circle1} />
        <div style={S.circle2} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48 }}>
            <div style={{ width:50,height:50,background:'rgba(255,255,255,.15)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24 }}>🏢</div>
            <div>
              <div style={{ fontFamily:'"Playfair Display",serif',fontSize:16,color:'#fff',fontWeight:700 }}>Meeting Room</div>
              <div style={{ fontSize:12,color:'rgba(255,255,255,.5)' }}>Booking System</div>
            </div>
          </div>
          <h1 style={{ fontFamily:'"Playfair Display",serif',fontSize:38,color:'#fff',lineHeight:1.2,marginBottom:16 }}>
            Book Smarter.<br/>Meet Better.
          </h1>
          <p style={{ fontSize:15,color:'rgba(255,255,255,.65)',lineHeight:1.7,marginBottom:40 }}>
            Book meeting rooms easily and manage your bookings from one powerful dashboard.
          </p>
          {[
            // ['⚡','Instant booking with conflict detection'],
            // ['🔐','Admin access fully controlled by you'],
            // ['📊','Complete booking history & analytics'],
            // ['👤','Any email can sign in as User'],
          ].map(([ic, t]) => (
            <div key={t} style={{ display:'flex',alignItems:'center',gap:12,marginBottom:14 }}>
              <div style={{ width:34,height:34,background:'rgba(255,255,255,.1)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0 }}>{ic}</div>
              <span style={{ fontSize:13,color:'rgba(255,255,255,.8)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={S.right} onKeyDown={handleKey}>
        <h2 style={S.h1}>Welcome Back!</h2>
        <p style={S.sub}>Sign in to manage your meeting rooms</p>

        {/* Tabs */}
        <div style={S.tabs}>
          {['login','register'].map(t => (
            <button key={t} style={S.tab(tab===t)}
              onClick={() => { setTab(t); setError(''); }}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Demo credentials */}
        <div style={S.demo}>
          <div style={S.demoTitle}>🚀 Quick Login — click to fill</div>
          <div
            style={S.demoRow}
            onClick={() => { setEmail('gs1@gmail.com'); setPassword('gs1123'); }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(59,130,246,.1)'}
            onMouseLeave={e => e.currentTarget.style.background='none'}
          >
            <span style={{ fontWeight:700 }}> </span>
            <span style={{ color:'#1748db' }}></span>
          </div>
          <div
            style={S.demoRow}
            onClick={() => { setEmail('admin@roombook.com'); setPassword('admin123'); }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(59,130,246,.1)'}
            onMouseLeave={e => e.currentTarget.style.background='none'}
          >
            <span style={{ fontWeight:700 }}> </span>
            <span style={{ color:'#1D4ED8' }}></span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={S.errBox}>❌ {error}</div>
        )}

        {/* ── LOGIN FORM ── */}
        {tab === 'login' && (
          <>
            <label style={S.label}>Email Address</label>
            <input
              style={S.input}
              type="email"
              placeholder=""
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={e  => e.target.style.borderColor='#1B2A6B'}
              onBlur={e   => e.target.style.borderColor='#E2E8F0'}
            />
            <label style={S.label}>Password</label>
            <input
              style={S.input}
              type="password"
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={e  => e.target.style.borderColor='#1B2A6B'}
              onBlur={e   => e.target.style.borderColor='#E2E8F0'}
            />
            <button
              style={{ ...S.btn, opacity: loading ? .7 : 1 }}
              onClick={doLogin}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
            <p style={S.switchText}>
              Don't have an account?{' '}
              <span style={S.link} onClick={() => setTab('register')}>Register here</span>
            </p>
          </>
        )}

        {/* ── REGISTER FORM ── */}
        {tab === 'register' && (
          <>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>First Name *</label>
                <input style={S.input} placeholder="" value={fn}
                  onChange={e=>setFn(e.target.value)}
                  onFocus={e=>e.target.style.borderColor='#1B2A6B'}
                  onBlur={e=>e.target.style.borderColor='#E2E8F0'} />
              </div>
              <div>
                <label style={S.label}>Last Name *</label>
                <input style={S.input} placeholder="" value={ln}
                  onChange={e=>setLn(e.target.value)}
                  onFocus={e=>e.target.style.borderColor='#1B2A6B'}
                  onBlur={e=>e.target.style.borderColor='#E2E8F0'} />
              </div>
            </div>
            <label style={S.label}>Email Address *</label>
            <input style={S.input} type="email" placeholder="" value={email}
              onChange={e=>setEmail(e.target.value)}
              onFocus={e=>e.target.style.borderColor='#1B2A6B'}
              onBlur={e=>e.target.style.borderColor='#E2E8F0'} />
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Department</label>
                <input style={S.input} placeholder="" value={dept}
                  onChange={e=>setDept(e.target.value)}
                  onFocus={e=>e.target.style.borderColor='#1B2A6B'}
                  onBlur={e=>e.target.style.borderColor='#E2E8F0'} />
              </div>
              <div>
                <label style={S.label}>Employee ID</label>
                <input style={S.input} placeholder="" value={empId}
                  onChange={e=>setEmpId(e.target.value)}
                  onFocus={e=>e.target.style.borderColor='#1B2A6B'}
                  onBlur={e=>e.target.style.borderColor='#E2E8F0'} />
              </div>
            </div>
            <label style={S.label}>Password *</label>
            <input style={S.input} type="password" placeholder="Min. 6 characters" value={password}
              onChange={e=>setPassword(e.target.value)}
              onFocus={e=>e.target.style.borderColor='#1B2A6B'}
              onBlur={e=>e.target.style.borderColor='#E2E8F0'} />
            <button
              style={{ ...S.btn, opacity: loading ? .7 : 1 }}
              onClick={doRegister}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
            <p style={S.switchText}>
              Already have an account?{' '}
              <span style={S.link} onClick={() => setTab('login')}>Sign In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
