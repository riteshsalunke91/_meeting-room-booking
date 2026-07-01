import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input, Badge, Btn, Toast } from "../../components/ui";

export default function AccountDetails() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || "", lastName: user?.lastName || "",
    email: user?.email || "", phone: user?.phone || "",
    department: user?.department || "", employeeId: user?.employeeId || ""
  });
  const [pwForm, setPwForm] = useState({ cur: "", new: "", conf: "" });
  const [toast, setToast] = useState(null);
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  const save = () => {
    const updated = { ...user, ...form };
    login(updated);
    setToast({ msg: "Profile updated successfully!", type: "success" });
  };

  const changePw = () => {
    if (!pwForm.cur || !pwForm.new || !pwForm.conf) { setToast({ msg: "Fill all password fields", type: "error" }); return; }
    if (pwForm.new.length < 6) { setToast({ msg: "Password must be at least 6 characters", type: "error" }); return; }
    if (pwForm.new !== pwForm.conf) { setToast({ msg: "Passwords do not match", type: "error" }); return; }
    login({ ...user, password: pwForm.new });
    setPwForm({ cur: "", new: "", conf: "" });
    setToast({ msg: "Password updated!", type: "success" });
  };

  return (
    <div style={{ padding: "32px 48px" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 24 }}>Account Details</h1>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
        {/* Profile card */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "28px 22px", textAlign: "center", boxShadow: "var(--shadow-sm)", height: "fit-content" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg,#1B2A6B,#2D3D99)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700 }}>{initials}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "#0F172A", marginBottom: 4 }}>{user?.firstName} {user?.lastName}</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 10 }}>{user?.email}</div>
          <Badge status={user?.role} />
          <div style={{ marginTop: 16, padding: "12px", background: "#F8FAFC", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Member Since</div>
            <div style={{ fontSize: 13, color: "#0F172A", fontWeight: 600 }}>{user?.memberSince || ""}</div>
          </div>
          <div style={{ marginTop: 12, padding: "12px", background: "#F8FAFC", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Role</div>
            <div style={{ fontSize: 13, color: "#0F172A", fontWeight: 600 }}>{user?.role}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Personal Info */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 28, boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#0F172A", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 8 }}>✏️ Personal Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Full Name" value={`${form.firstName} ${form.lastName}`}
                onChange={e => { const [fn, ...rest] = e.target.value.split(" "); setForm(f => ({ ...f, firstName: fn, lastName: rest.join(" ") })); }} />
              <Input label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <Input label="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="" />
              <Input label="Department" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
            </div>
            <Input label="Employee ID" value={form.employeeId} disabled style={{ background: "#F8FAFC" }} />
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <Btn variant="primary" onClick={save} style={{ borderRadius: 10 }}>💾 Save Changes</Btn>
              <Btn variant="ghost" onClick={() => setForm({ firstName: user?.firstName || "", lastName: user?.lastName || "", email: user?.email || "", phone: user?.phone || "", department: user?.department || "", employeeId: user?.employeeId || "" })} style={{ borderRadius: 10 }}>Discard</Btn>
            </div>
          </div>

          {/* Change Password */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 28, boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#0F172A", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 8 }}>🔒 Change Password</h2>
            <Input label="Current Password" type="password" placeholder="Enter current password" value={pwForm.cur} onChange={e => setPwForm(f => ({ ...f, cur: e.target.value }))} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="New Password" type="password" placeholder="Min. 6 characters" value={pwForm.new} onChange={e => setPwForm(f => ({ ...f, new: e.target.value }))} />
              <Input label="Confirm New Password" type="password" placeholder="Repeat new password" value={pwForm.conf} onChange={e => setPwForm(f => ({ ...f, conf: e.target.value }))} />
            </div>
            <Btn variant="primary" onClick={changePw} style={{ borderRadius: 10 }}>🔑 Update Password</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
