import { useEffect } from "react";

export const Spinner = ({ size = 24 }) => (
  <div style={{
    width: size, height: size,
    border: "3px solid #E2E8F0", borderTopColor: "#1B2A6B",
    borderRadius: "50%", animation: "spin .7s linear infinite", margin: "0 auto"
  }} />
);

const STATUS_MAP = {
  AVAILABLE: { bg: "#ECFDF5", color: "#059669", text: "Available" },
  OCCUPIED:  { bg: "#FEF2F2", color: "#DC2626", text: "Occupied" },
  RESERVED:  { bg: "#F5F3FF", color: "#7C3AED", text: "Reserved" },
  CONFIRMED: { bg: "#ECFDF5", color: "#059669", text: "Confirmed" },
  Completed: { bg: "#ECFDF5", color: "#059669", text: "Completed" },
  Upcoming:  { bg: "#DBEAFE", color: "#1D4ED8", text: "Upcoming" },
  CANCELLED: { bg: "#FEF2F2", color: "#DC2626", text: "Cancelled" },
  PENDING:   { bg: "#FFFBEB", color: "#D97706", text: "Pending" },
  ADMIN:     { bg: "#1B2A6B", color: "#fff",    text: "Admin" },
  USER:      { bg: "#EFF6FF", color: "#1D4ED8", text: "User" },
};

export const Badge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.PENDING;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.color, whiteSpace: "nowrap"
    }}>
      {s.text}
    </span>
  );
};

export const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "error" ? "#DC2626" : type === "warning" ? "#D97706" : "#059669";
  const icon = type === "error" ? "❌" : type === "warning" ? "⚠️" : "✅";

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: bg, color: "#fff", padding: "12px 20px",
      borderRadius: 12, fontSize: 13, fontWeight: 600,
      boxShadow: "0 8px 32px rgba(0,0,0,.2)", maxWidth: 340,
      animation: "fadeUp .3s ease"
    }}>
      {icon}&nbsp;&nbsp;{msg}
    </div>
  );
};

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
      zIndex: 500, display: "flex", alignItems: "center",
      justifyContent: "center", padding: 16, animation: "fadeIn .2s ease"
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 28,
        width: "100%", maxWidth: 500, boxShadow: "0 24px 80px rgba(0,0,0,.2)",
        animation: "fadeUp .25s ease", maxHeight: "90vh", overflowY: "auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#1B2A6B" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: "#94A3B8", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748B", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".05em" }}>
        {label}
      </label>
    )}
    <input
      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: 13, color: "#0F172A", background: "#fff", outline: "none", transition: "border-color .2s" }}
      onFocus={e => e.target.style.borderColor = "#1B2A6B"}
      onBlur={e => e.target.style.borderColor = "#E2E8F0"}
      {...props}
    />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748B", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".05em" }}>
        {label}
      </label>
    )}
    <select
      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: 13, color: "#0F172A", background: "#fff", outline: "none" }}
      {...props}
    >
      {children}
    </select>
  </div>
);

export const Btn = ({ children, variant = "primary", size = "md", style: s = {}, ...props }) => {
  const base = { fontFamily: "var(--font)", fontWeight: 700, cursor: "pointer", border: "none", borderRadius: 10, transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" };
  const sizes = {
    sm: { padding: "6px 14px",  fontSize: 12 },
    md: { padding: "10px 20px", fontSize: 13 },
    lg: { padding: "13px 28px", fontSize: 15 },
  };
  const variants = {
    primary: { background: "#1B2A6B", color: "#fff" },
    green:   { background: "#059669", color: "#fff" },
    red:     { background: "#DC2626", color: "#fff" },
    orange:  { background: "#D97706", color: "#fff" },
    ghost:   { background: "#F1F5F9", color: "#334155" },
    outline: { background: "#fff",    color: "#1B2A6B", border: "1.5px solid #1B2A6B" },
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant], ...s }} {...props}>
      {children}
    </button>
  );
};
