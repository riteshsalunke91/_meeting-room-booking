export default function Footer() {
  return (
    <footer style={{ background: "#1B2A6B", marginTop: 48, padding: "18px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 13, fontWeight: 600 }}>
          <span style={{ fontSize: 18 }}>🏢</span> Meeting Room Booking System
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>© 2024 All Rights Reserved.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,.5)" }}>
          <span>Stay Connected</span>
          {["f", "twitter", "in", "instagram"].map(ic => (
            <div key={ic} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 11, color: "#fff" }}>●</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
