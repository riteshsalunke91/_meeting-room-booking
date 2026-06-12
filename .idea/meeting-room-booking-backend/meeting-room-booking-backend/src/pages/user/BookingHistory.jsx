import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Badge, Btn, Spinner, Toast } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_BOOKINGS } from "../../data/mockData";

export default function BookingHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    apiFetch("GET", `/bookings/user/${user.id}`).then(r => {
      setBookings(r?.data || MOCK_BOOKINGS.filter(x => x.userId === user.id));
      setLoading(false);
    });
  }, [user.id]);

  const doCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    await apiFetch("DELETE", `/bookings/${id}`);
    setBookings(b => b.map(x => x.id === id ? { ...x, status: "CANCELLED" } : x));
    setToast({ msg: "Booking cancelled", type: "success" });
  };

  const tabs = ["ALL", "Upcoming", "Completed", "CANCELLED"];
  const shown = tab === "ALL" ? bookings : bookings.filter(b => b.status === tab);
  const stats = [
    ["Total", bookings.length, "#1B2A6B"],
    ["Confirmed/Upcoming", bookings.filter(b => b.status === "Upcoming" || b.status === "CONFIRMED").length, "#059669"],
    ["Completed", bookings.filter(b => b.status === "Completed").length, "#7C3AED"],
    ["Cancelled", bookings.filter(b => b.status === "CANCELLED").length, "#DC2626"],
  ];

  return (
    <div style={{ padding: "32px 48px" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 6 }}>My Booking History</h1>
      <p style={{ fontSize: 13, color: "#64748B", marginBottom: 24 }}>View and manage all your past and upcoming bookings</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map(([l, v, c]) => (
          <div key={l} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "16px 20px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700 }}>{l}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: "2px solid #E2E8F0" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "9px 18px", border: "none", background: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)", color: tab === t ? "#1B2A6B" : "#64748B", borderBottom: tab === t ? "2px solid #1B2A6B" : "2px solid transparent", marginBottom: -2, transition: "all .2s" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr", padding: "11px 20px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".05em" }}>
          <span>Room Name</span><span>Date</span><span>Time Slot</span><span>Status</span><span>Action</span>
        </div>
        {loading ? <div style={{ padding: 40 }}><Spinner size={32} /></div>
          : shown.length === 0
            ? <div style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}><div style={{ fontSize: 40, marginBottom: 10 }}>📋</div><p>No bookings found</p></div>
            : shown.map(b => (
              <div key={b.id}
                style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr", padding: "14px 20px", borderTop: "1px solid #F1F5F9", fontSize: 13, alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.background = ""}>
                <span style={{ fontWeight: 700, color: "#0F172A" }}>🏢 {b.roomName}</span>
                <span style={{ color: "#64748B", fontSize: 12 }}>{b.date}</span>
                <span style={{ color: "#64748B", fontSize: 12 }}>{b.startTime} – {b.endTime}</span>
                <Badge status={b.status} />
                <span>
                  {b.status !== "CANCELLED" && b.status !== "Completed"
                    ? <Btn variant="red" size="sm" onClick={() => doCancel(b.id)} style={{ borderRadius: 8, fontSize: 11 }}>✕ Cancel</Btn>
                    : <span style={{ fontSize: 12, color: "#94A3B8" }}>—</span>}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
