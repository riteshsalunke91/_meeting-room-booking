import { useState } from "react";
import { Input, Select, Btn, Badge, Spinner, Toast } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_ROOMS } from "../../data/mockData";

export default function AddRoom({ setPage, editRoom, setEditRoom }) {
  const isEdit = !!editRoom;
  const [form, setForm] = useState(editRoom || { roomName: "", location: "", capacity: "", description: "", image: "", status: "AVAILABLE" });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.roomName || !form.location || !form.capacity) { setToast({ msg: "Please fill all required fields", type: "error" }); return; }
    setLoading(true);
    try {
      if (isEdit) {
        await apiFetch("PUT", `/rooms/${editRoom.id}`, form);
        const i = MOCK_ROOMS.findIndex(r => r.id === editRoom.id);
        if (i >= 0) MOCK_ROOMS[i] = { ...MOCK_ROOMS[i], ...form };
        setToast({ msg: "Room updated!", type: "success" });
        setTimeout(() => { setEditRoom && setEditRoom(null); setPage("manageRooms"); }, 1200);
      } else {
        await apiFetch("POST", "/rooms", { ...form, capacity: parseInt(form.capacity) });
        MOCK_ROOMS.push({ id: MOCK_ROOMS.length + 1, ...form, capacity: parseInt(form.capacity) });
        setToast({ msg: "Room added successfully!", type: "success" });
        setTimeout(() => setPage("manageRooms"), 1400);
      }
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: "32px 48px" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A", marginBottom: 6 }}>{isEdit ? "Edit Room" : "Add New Room"}</h1>
      <p style={{ fontSize: 13, color: "#64748B", marginBottom: 28 }}>{isEdit ? "Update room details" : "Create a new meeting room"}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 28 }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 28, boxShadow: "var(--shadow-sm)" }}>
          <Input label="Room Name *" placeholder="e.g. Conference Hall A" value={form.roomName} onChange={handle("roomName")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="Location *" placeholder="e.g. 1st Floor" value={form.location} onChange={handle("location")} />
            <Input label="Capacity *" type="number" placeholder="e.g. 10" min="1" value={form.capacity} onChange={handle("capacity")} />
          </div>
          <Input label="Description" placeholder="Room features, equipment..." value={form.description} onChange={handle("description")} />
          <Input label="Image URL" placeholder="https://... (optional)" value={form.image} onChange={handle("image")} />
          <Select label="Status" value={form.status} onChange={handle("status")}>
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="RESERVED">Reserved</option>
          </Select>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Btn variant="green" size="lg" onClick={submit} disabled={loading} style={{ borderRadius: 10 }}>
              {loading ? <Spinner size={20} /> : isEdit ? "💾 Update Room" : "➕ Add Room"}
            </Btn>
            <Btn variant="ghost" size="lg" onClick={() => setPage("manageRooms")} style={{ borderRadius: 10 }}>Cancel</Btn>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 24, boxShadow: "var(--shadow-sm)", height: "fit-content" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#0F172A", marginBottom: 14 }}>Preview</h3>
          {form.image
            ? <img src={form.image} alt="preview" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 14 }} onError={e => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />
            : <div style={{ width: "100%", height: 140, background: "linear-gradient(135deg,#dde3f5,#c5cfed)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, marginBottom: 14 }}>🏢</div>}
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#0F172A", marginBottom: 8 }}>{form.roomName || "Room Name"}</div>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>📍 {form.location || "Location"}</div>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10 }}>👥 Capacity: {form.capacity || "0"} People</div>
          <Badge status={form.status} />
        </div>
      </div>
    </div>
  );
}
