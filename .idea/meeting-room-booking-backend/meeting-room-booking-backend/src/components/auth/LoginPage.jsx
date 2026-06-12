import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input, Btn, Spinner } from "../ui";
import { apiFetch } from "../../utils/api";

export default function LoginPage({ onSuccess }) {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    email: "", password: "",
    firstName: "", lastName: "",
    department: "", employeeId: "", phone: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const doLogin = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Please enter email and password"); return; }
    setLoading(true);
    try {
      const res = await apiFetch("POST", "/auth/login", {
        email: form.email, password: form.password
      });
      const user = res?.data || res;
      if (!user?.id) throw new Error("Invalid email or password");
      login(user);
      onSuccess(user.role === "ADMIN" ? "adminDashboard" : "dashboard");
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const doRegister = async () => {
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill all required fields"); return;
    }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await apiFetch("POST", "/auth/register", {
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, password: form.password,
        department: form.department, employeeId: form.employeeId,
        phone: form.phone, role: "USER"
      });
      const user = res?.data || res;
      if (!user?.id) throw new Error("Registration failed. Please try again.");
      login(user);
      onSuccess("dashboard");
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#0F172A" }}>

      {/* Left Panel */}
      <div style={{ flex: 1, background: "linear-gradient(135deg,#1B2A6B,#2D3D99)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,.04)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-40, width:240, height:240, borderRadius:"50%", background:"rgba(255,255,255,.04)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:48 }}>
            <div style={{ width:50, height:50, background:"rgba(255,255,255,.15)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🏢</div>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:16, color:"#fff", fontWeight:700 }}>Meeting Room</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>Booking System</div>
            </div>
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:38, color:"#fff", lineHeight:1.2, marginBottom:16 }}>Book Smarter.<br />Meet Better.</h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.65)", lineHeight:1.7, marginBottom:40 }}>Book meeting rooms easily and manage your bookings from one powerful dashboard.</p>
          {[["⚡","Instant booking with conflict detection"],["🔐","Secure role-based access"],["📊","Complete booking history"],["🔔","Real-time availability"]].map(([ic,t]) => (
            <div key={t} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{ width:34, height:34, background:"rgba(255,255,255,.1)", borderRadius:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{ic}</div>
              <span style={{ fontSize:13, color:"rgba(255,255,255,.8)" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width:480, background:"#fff", display:"flex", flexDirection:"column", justifyContent:"center", padding:"48px 48px" }}>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, color:"#0F172A", marginBottom:6 }}>
          {tab === "login" ? "Welcome Back!" : "Create Account"}
        </h2>
        <p style={{ fontSize:13, color:"#64748B", marginBottom:28 }}>
          {tab === "login" ? "Sign in to manage your meeting rooms" : "Register to start booking meeting rooms"}
        </p>

        {/* Tabs */}
        <div style={{ display:"flex", border:"1.5px solid #E2E8F0", borderRadius:10, overflow:"hidden", marginBottom:22 }}>
          {["login","register"].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); }}
              style={{ flex:1, padding:"9px", fontSize:13, fontWeight:700, border:"none", background: tab===t ? "#1B2A6B" : "#fff", color: tab===t ? "#fff" : "#64748B", cursor:"pointer", fontFamily:"var(--font)", transition:"all .2s" }}>
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {error && <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#DC2626", marginBottom:14 }}>❌ {error}</div>}

        {tab === "login" ? (
          <>
            <Input label="Email Address" type="email" placeholder="you@email.com" value={form.email} onChange={handle("email")} />
            <Input label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={handle("password")} />
            <Btn variant="primary" size="lg" style={{ width:"100%", justifyContent:"center", marginTop:4, borderRadius:10 }} onClick={doLogin} disabled={loading}>
              {loading ? <Spinner size={18} /> : "Sign In →"}
            </Btn>
          </>
        ) : (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="First Name *" placeholder="John" value={form.firstName} onChange={handle("firstName")} />
              <Input label="Last Name *"  placeholder="Doe"  value={form.lastName}  onChange={handle("lastName")} />
            </div>
            <Input label="Email Address *" type="email" placeholder="you@email.com" value={form.email} onChange={handle("email")} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Department"  placeholder="Engineering" value={form.department} onChange={handle("department")} />
              <Input label="Employee ID" placeholder="EMP-001"     value={form.employeeId} onChange={handle("employeeId")} />
            </div>
            <Input label="Phone" placeholder="+91 98765 43210" value={form.phone} onChange={handle("phone")} />
            <Input label="Password *" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handle("password")} />
            <Btn variant="primary" size="lg" style={{ width:"100%", justifyContent:"center", borderRadius:10 }} onClick={doRegister} disabled={loading}>
              {loading ? <Spinner size={18} /> : "Create Account →"}
            </Btn>
          </>
        )}

        <p style={{ textAlign:"center", fontSize:12, color:"#94A3B8", marginTop:16 }}>
          {tab === "login"
            ? <>Don't have an account? <span style={{ color:"#1B2A6B", fontWeight:700, cursor:"pointer" }} onClick={() => setTab("register")}>Register here</span></>
            : <>Already have an account? <span style={{ color:"#1B2A6B", fontWeight:700, cursor:"pointer" }} onClick={() => setTab("login")}>Sign In</span></>}
        </p>
      </div>
    </div>
  );
}
