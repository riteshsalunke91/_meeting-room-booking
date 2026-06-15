import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input, Btn, Spinner } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_ROOMS, MOCK_BOOKINGS, mockCounter, incrementMockCounter } from "../../data/mockData";

export default function BookRoom({ preselectedRoom, setPage }) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [selRoom, setSelRoom] = useState(preselectedRoom || "");
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], startTime: "10:00", endTime: "11:00", title: "", attendees: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch("GET", "/rooms/available").then(r => setRooms(r?.data || MOCK_ROOMS.filter(x => x.status === "AVAILABLE")));
  }, []);

  const chosen = rooms.find(r => r.id === selRoom || r.id === parseInt(selRoom));

  const submit = async () => {
    setError("");
    if (!selRoom || !form.title || !form.date || !form.startTime || !form.endTime) { setError("Please fill all required fields"); return; }
    if (form.startTime >= form.endTime) { setError("End time must be after start time"); return; }
    setLoading(true);
    try {
      const payload = { roomId: parseInt(selRoom), userId: user.id, title: form.title, startTime: `${form.date}T${form.startTime}:00`, endTime: `${form.date}T${form.endTime}:00`, attendees: parseInt(form.attendees) || 1, status: "CONFIRMED" };
      const res = await apiFetch("POST", "/bookings", payload);
      if (!res) {
        const conflict = MOCK_BOOKINGS.find(b =>
          b.roomId === parseInt(selRoom) && b.status !== "CANCELLED" &&
          new Date(b.startISO) < new Date(`${form.date}T${form.endTime}`) &&
          new Date(b.endISO) > new Date(`${form.date}T${form.startTime}`)
        );
        if (conflict) throw new Error("Room already booked for this time slot!");
        MOCK_BOOKINGS.push({
          id: mockCounter, roomId: parseInt(selRoom), roomName: chosen?.roomName,
          userId: user.id, userName: `${user.firstName} ${user.lastName}`, title: form.title,
          date: new Date(form.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          startTime: form.startTime + " AM", endTime: form.endTime + " AM", status: "Upcoming",
          startISO: `${form.date}T${form.startTime}`, endISO: `${form.date}T${form.endTime}`
        });
        incrementMockCounter();
      }
      setSuccess(true);
      setTimeout(() => setPage("bookingHistory"), 2000);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  if (success) return (
    <div style={{ minHeight: "calc(100vh-60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", animation: "fadeUp .4s ease" }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#059669", marginBottom: 8 }}>Room Booked Successfully!</h2>
        <p style={{ fontSize: 14, color: "#64748B" }}>Redirecting to your bookings...</p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "32px 48px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 6 }}>Book a Room</h1>
      <p style={{ fontSize: 13, color: "#64748B", marginBottom: 28 }}>Select a room, choose date & time and book instantly.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 28 }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 28, boxShadow: "var(--shadow-sm)" }}>
          {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#DC2626", marginBottom: 16 }}>❌ {error}</div>}

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748B", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Select Room *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
              {rooms.map(r => (
                <button key={r.id} onClick={() => setSelRoom(r.id)}
                  style={{ border: `2px solid ${selRoom === r.id || selRoom === `${r.id}` ? "#1B2A6B" : "#E2E8F0"}`, background: selRoom === r.id || selRoom === `${r.id}` ? "#EFF6FF" : "#fff", borderRadius: 10, padding: "10px 14px", textAlign: "left", cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{r.roomName}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>👥 {r.capacity} people · 📍 {r.location}</div>
                </button>
              ))}
            </div>
          </div>

          <Input label="Meeting Title *" placeholder="e.g. Sprint Planning, Team Standup" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Input label="Date *" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <Input label="Start Time *" type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} />
            <Input label="End Time *" type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} />
          </div>
          <Input label="Number of Attendees" type="number" placeholder="e.g. 5" min="1" value={form.attendees} onChange={e => setForm(f => ({ ...f, attendees: e.target.value }))} />

          <Btn variant="green" size="lg" style={{ width: "100%", justifyContent: "center", borderRadius: 10, marginTop: 8 }} onClick={submit} disabled={loading}>
            {loading ? <Spinner size={20} /> : "📅 Confirm Booking"}
          </Btn>
        </div>

        {/* Booking Summary */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 24, boxShadow: "var(--shadow-sm)", height: "fit-content", position: "sticky", top: 80 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#0F172A", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>🧾 Booking Summary</h3>
          {chosen && <img src={chosen.image} alt={chosen.roomName} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 10, marginBottom: 14 }} onError={e => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />}
          {[["Room", chosen?.roomName || "—"], ["Location", chosen ? `📍 ${chosen.location}` : "—"], ["Capacity", chosen ? `👥 ${chosen.capacity} People` : "—"], ["Date", form.date || "—"], ["Time", form.startTime && form.endTime ? `${form.startTime} – ${form.endTime}` : "—"], ["Attendees", form.attendees ? `${form.attendees} people` : "—"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 13 }}>
              <span style={{ color: "#64748B" }}>{k}</span>
              <span style={{ fontWeight: 600, color: "#0F172A", textAlign: "right", maxWidth: 180, wordBreak: "break-word" }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: "12px 14px", background: "#EFF6FF", borderRadius: 10, fontSize: 12, color: "#1E40AF" }}>
            ℹ️ Bookings can be cancelled from the Booking History page.
          </div>
        </div>
      </div>
    </div>
  );
}
