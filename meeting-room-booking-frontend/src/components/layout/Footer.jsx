
export default function Footer() {
  return (
    <footer style={{ background: "#1B2A6B", paddingTop: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 40, paddingBottom: 32 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>🏢</span>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Meeting Room Booking</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.6, margin: 0 }}>
              Simplifying workspace management for modern teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Quick Links</p>
            {["Home", "Book a room", "My bookings", "Room availability", "Admin panel"].map(link => (
              <a key={link} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,.55)", textDecoration: "none", marginBottom: 8 }}>{link}</a>
            ))}
          </div>

          {/* Support */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Support</p>
            {["Help center", "FAQs", "Report an issue", "Privacy policy", "Terms of service"].map(link => (
              <a key={link} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,.55)", textDecoration: "none", marginBottom: 8 }}>{link}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Contact Us</p>
            {[
              { icon: "📍", text: "" },
              { icon: "📞", text: "9420436354" },
              { icon: "✉️", text: "inforsalunke@gmail.com" },
              { icon: "🕐", text: "Mon–Fri, 9 AM – 6 PM EST" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <span>{icon}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", padding: "18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 13, fontWeight: 600 }}>
            <span style={{ fontSize: 18 }}>🏢</span> Meeting Room Booking System
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>© 2026 All Rights Reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,.4)" }}>
            <span>Stay Connected</span>
            {["f", "𝕏", "in", "ig"].map(ic => (
              <div key={ic} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 11, color: "#fff" }}>{ic}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}