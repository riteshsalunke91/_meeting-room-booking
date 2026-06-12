import { useState, useEffect } from "react";
import { Badge, Btn, Modal, Toast } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_ROOMS } from "../../data/mockData";

export default function ManageRooms({ setPage, setEditRoom }) {
  const [rooms, setRooms] = useState([]);
  const [toast, setToast] = useState(null);
  const [delId, setDelId] = useState(null);

  useEffect(() => {
    apiFetch("GET", "/rooms").then(r => setRooms(r?.data || MOCK_ROOMS));
  }, []);

  const doDelete = async (id) => {
    await apiFetch("DELETE", `/rooms/${id}`);
    const i = MOCK_ROOMS.findIndex(r => r.id === id);
    if (i >= 0) MOCK_ROOMS.splice(i, 1);
    setRooms(r => r.filter(x => x.id !== id));
    setDelId(null);
    setToast({ msg: "Room deleted", type: "success" });
  };

  const doEdit = (r) => { setEditRoom(r); setPage("addRoom"); };

  return (
    <div style={{ padding: "32px 48px" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A" }}>Manage Rooms</h1>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{rooms.length} rooms total</p>
        </div>
        <Btn variant="green" onClick={() => { setEditRoom && setEditRoom(null); setPage("addRoom"); }} style={{ borderRadius: 10 }}>➕ Add New Room</Btn>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 1.8fr 1fr 1fr 1fr 140px", padding: "11px 20px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".05em" }}>
          <span>Image</span><span>Room Name</span><span>Location</span><span>Capacity</span><span>Status</span><span>Actions</span>
        </div>
        {rooms.map(r => (
          <div key={r.id}
            style={{ display: "grid", gridTemplateColumns: "90px 1.8fr 1fr 1fr 1fr 140px", padding: "13px 20px", borderTop: "1px solid #F1F5F9", alignItems: "center", fontSize: 13 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            <img src={r.image} alt={r.roomName} style={{ width: 72, height: 48, objectFit: "cover", borderRadius: 8 }} onError={e => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />
            <span style={{ fontWeight: 700, color: "#0F172A" }}>{r.roomName}</span>
            <span style={{ color: "#64748B" }}>{r.location}</span>
            <span style={{ color: "#64748B" }}>👥 {r.capacity}</span>
            <Badge status={r.status} />
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="outline" size="sm" onClick={() => doEdit(r)} style={{ borderRadius: 8 }}>Edit</Btn>
              <Btn variant="red" size="sm" onClick={() => setDelId(r.id)} style={{ borderRadius: 8 }}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!delId} onClose={() => setDelId(null)} title="Delete Room?">
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>This will permanently delete this room and all its bookings. This action cannot be undone.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setDelId(null)} style={{ borderRadius: 10 }}>Cancel</Btn>
          <Btn variant="red" onClick={() => doDelete(delId)} style={{ borderRadius: 10 }}>🗑️ Delete</Btn>
        </div>
      </Modal>
    </div>
  );
}
