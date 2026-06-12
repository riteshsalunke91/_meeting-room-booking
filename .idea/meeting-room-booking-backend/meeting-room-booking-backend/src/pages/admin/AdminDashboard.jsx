import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Badge, Btn } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_ROOMS, MOCK_BOOKINGS } from "../../data/mockData";

export default function AdminDashboard({ setPage }) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    apiFetch("GET", "/rooms").then(r => setRooms(r?.data || MOCK_ROOMS));
    apiFetch("GET", "/bookings").then(b => setBookings(b?.data || MOCK_BOOKINGS));
  }, []);

  const stats = [
    { label: "Total Rooms",      value: rooms.length,    icon: "🏛️", color: "#EFF6FF", vc: "#1B2A6B" },
    { label: "Total Bookings",   value: bookings.length, icon: "📋", color: "#ECFDF5", vc: "#059669" },
    { label: "Today's Bookings", value: bookings.filter(b => b.status === "Upcoming" || b.status === "CONFIRMED").length, icon: "📅", color: "#FFFBEB", vc: "#D97706" },
  ];

  return (
    <div style={{ padding: "32px 48px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A" }}>Admin Dashboard</h1>
        <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Welcome back, {user?.firstName}. Manage your rooms and bookings.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={s.label} className={`fade-up d${i + 1}`} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px 22px", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: s.vc, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
        <Btn variant="primary" onClick={() => setPage("addRoom")} style={{ borderRadius: 10 }}>➕ Add New Room</Btn>
        <Btn variant="ghost" onClick={() => setPage("manageRooms")} style={{ borderRadius: 10 }}>🏛️ Manage Rooms</Btn>
        <Btn variant="ghost" onClick={() => setPage("allBookings")} style={{ borderRadius: 10 }}>📋 View All Bookings</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Recent Rooms */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "#0F172A" }}>Recent Rooms</h2>
            <span onClick={() => setPage("manageRooms")} style={{ fontSize: 12, fontWeight: 700, color: "#1B2A6B", cursor: "pointer" }}>Manage All →</span>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1.5fr 1fr 1fr", padding: "10px 16px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
              <span>Image</span><span>Room Name</span><span>Location</span><span>Capacity</span>
            </div>
            {rooms.slice(0, 5).map(r => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "80px 1.5fr 1fr 1fr", padding: "11px 16px", borderTop: "1px solid #F1F5F9", alignItems: "center", fontSize: 12 }}>
                <img src={r.image} alt="" style={{ width: 64, height: 40, objectFit: "cover", borderRadius: 8 }} onError={e => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />
                <span style={{ fontWeight: 700 }}>{r.roomName}</span>
                <span style={{ color: "#64748B" }}>{r.location}</span>
                <span style={{ color: "#64748B" }}>{r.capacity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "#0F172A" }}>Recent Bookings</h2>
            <span onClick={() => setPage("allBookings")} style={{ fontSize: 12, fontWeight: 700, color: "#1B2A6B", cursor: "pointer" }}>View All →</span>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", padding: "10px 16px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
              <span>User</span><span>Room</span><span>Date</span><span>Status</span>
            </div>
            {bookings.slice(0, 5).map(b => (
              <div key={b.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", padding: "11px 16px", borderTop: "1px solid #F1F5F9", alignItems: "center", fontSize: 12 }}>
                <span style={{ fontWeight: 700 }}>{b.userName}</span>
                <span style={{ color: "#64748B" }}>{b.roomName}</span>
                <span style={{ color: "#64748B" }}>{b.date}</span>
                <Badge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
