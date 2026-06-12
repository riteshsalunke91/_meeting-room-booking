import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Badge, Btn } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_ROOMS, MOCK_BOOKINGS } from "../../data/mockData";

export default function UserDashboard({ setPage }) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const r = await apiFetch("GET", "/rooms/available");
      setRooms(r?.data || MOCK_ROOMS.filter(x => x.status === "AVAILABLE").slice(0, 4));
      const b = await apiFetch("GET", `/bookings/user/${user.id}`);
      setBookings(b?.data || MOCK_BOOKINGS.filter(x => x.userId === user.id).slice(0, 3));
    };
    load();
  }, [user.id]);

  const cards = [
    { icon: "🏛️", title: "View Rooms",      desc: "Browse all available meeting rooms.",                   link: "View Rooms →",    page: "viewRooms",      color: "#EFF6FF", accent: "#1D4ED8" },
    { icon: "📅", title: "Book Room",       desc: "Select a room, choose date & time and book.",           link: "Book Now →",      page: "bookRoom",       color: "#ECFDF5", accent: "#059669" },
    { icon: "📋", title: "Booking History", desc: "View all your past and upcoming bookings.",             link: "View History →",  page: "bookingHistory", color: "#F5F3FF", accent: "#7C3AED" },
    { icon: "👤", title: "Account Details", desc: "View and update your account information.",             link: "My Account →",    page: "account",        color: "#FFFBEB", accent: "#D97706" },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "#F8FAFC" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1B2A6B 0%,#2D3D99 60%,#3D52B0 100%)", padding: "48px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: -60, right: 200, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#fff", marginBottom: 8 }}>Welcome, {user?.firstName} {user?.lastName}! 👋</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)" }}>What would you like to do today?</p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <Btn variant="green" size="md" onClick={() => setPage("bookRoom")} style={{ borderRadius: 10 }}>📅 Book a Room</Btn>
            <Btn variant="ghost" size="md" onClick={() => setPage("viewRooms")} style={{ borderRadius: 10, background: "rgba(255,255,255,.15)", color: "#fff" }}>🏛️ View Rooms</Btn>
          </div>
        </div>
        <div style={{ fontSize: 100, opacity: .15, position: "relative", zIndex: 1 }}>🏢</div>
      </div>

      <div style={{ padding: "32px 48px" }}>
        {/* Action Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 36 }}>
          {cards.map((c, i) => (
            <div key={c.title} className={`fade-up d${i + 1}`} onClick={() => setPage(c.page)}
              style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "22px 20px", cursor: "pointer", boxShadow: "var(--shadow-sm)", transition: "transform .2s, box-shadow .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#0F172A", marginBottom: 6 }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5, marginBottom: 14 }}>{c.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.accent, cursor: "pointer" }}>{c.link}</span>
            </div>
          ))}
        </div>

        {/* Bottom grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Available Rooms */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#0F172A" }}>Available Meeting Rooms</h2>
              <span onClick={() => setPage("viewRooms")} style={{ fontSize: 12, fontWeight: 700, color: "#1B2A6B", cursor: "pointer" }}>View All →</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {rooms.map(r => (
                <div key={r.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "var(--shadow-sm)", transition: "box-shadow .2s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow-md)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}>
                  <img src={r.image} alt={r.roomName} style={{ width: "100%", height: 90, objectFit: "cover" }} onError={e => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{r.roomName}</div>
                    <div style={{ fontSize: 11, color: "#64748B" }}>📍 {r.location} &nbsp;•&nbsp; 👥 {r.capacity} People</div>
                    <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Badge status={r.status} />
                      <Btn variant="primary" size="sm" onClick={() => setPage("bookRoom")} style={{ borderRadius: 8, fontSize: 11 }}>Book</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking History */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#0F172A" }}>My Booking History</h2>
              <span onClick={() => setPage("bookingHistory")} style={{ fontSize: 12, fontWeight: 700, color: "#1B2A6B", cursor: "pointer" }}>View All →</span>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.2fr 1fr", padding: "10px 16px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".05em" }}>
                <span>Room Name</span><span>Date</span><span>Time</span><span>Status</span>
              </div>
              {bookings.map(b => (
                <div key={b.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.2fr 1fr", padding: "12px 16px", borderTop: "1px solid #F1F5F9", fontSize: 12, alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "#0F172A" }}>{b.roomName}</span>
                  <span style={{ color: "#64748B" }}>{b.date}</span>
                  <span style={{ color: "#64748B" }}>{b.startTime} - {b.endTime}</span>
                  <Badge status={b.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
