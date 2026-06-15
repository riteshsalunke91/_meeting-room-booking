import { useState, useEffect } from "react";
import { Badge } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_BOOKINGS } from "../../data/mockData";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("ALL");

  useEffect(() => {
    apiFetch("GET", "/bookings").then(b => setBookings(b?.data || MOCK_BOOKINGS));
  }, []);

  const shown = tab === "ALL" ? bookings : bookings.filter(b => b.status === tab);

  return (
    <div style={{ padding: "32px 48px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 24 }}>All Bookings</h1>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: "2px solid #E2E8F0" }}>
        {["ALL", "Upcoming", "Completed", "CANCELLED"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "9px 18px", border: "none", background: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)", color: tab === t ? "#1B2A6B" : "#64748B", borderBottom: tab === t ? "2px solid #1B2A6B" : "2px solid transparent", marginBottom: -2 }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1fr 1.5fr 1fr", padding: "11px 20px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
          <span>User</span><span>Room</span><span>Date</span><span>Time Slot</span><span>Status</span>
        </div>
        {shown.map(b => (
          <div key={b.id}
            style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1fr 1.5fr 1fr", padding: "13px 20px", borderTop: "1px solid #F1F5F9", alignItems: "center", fontSize: 13 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            <span style={{ fontWeight: 700 }}>{b.userName}</span>
            <span style={{ color: "#64748B" }}>🏢 {b.roomName}</span>
            <span style={{ color: "#64748B" }}>{b.date}</span>
            <span style={{ color: "#64748B", fontSize: 12 }}>{b.startTime} – {b.endTime}</span>
            <Badge status={b.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
