import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input, Select, Btn, Badge, Spinner, Toast } from "../../components/ui";
import { apiFetch } from "../../utils/api";

export default function AddRoom({ setPage, editRoom, setEditRoom }) {
  const { user } = useAuth();
  const isEdit = !!editRoom;
  const [form, setForm] = useState(editRoom || {
    roomName: "", location: "", capacity: "",
    description: "", image: "", status: "AVAILABLE"
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Admin Guard ──────────────────────────────────
  if (!user || user.role !== "ADMIN") {
    return (
      <div style={{ padding: "80px 48px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🚫</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#DC2626", marginBottom: 8 }}>
          Access Denied
        </h2>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
          Only administrators can add or edit rooms.
        </p>
        <Btn variant="primary" onClick={() => setPage("dashboard")} style={{ borderRadius: 10 }}>
          Go to Dashboard
        </Btn>
      </div>
    );
  }

  const handle = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.roomName || !form.location || !form.capacity) {
      setToast({ msg: "Please fill all required fields", type: "error" }); return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await apiFetch("PUT", `/rooms/${editRoom.id}`, {
          ...form, capacity: parseInt(form.capacity)
        });
        setToast({ msg: "Room updated successfully!", type: "success" });
        setTimeout(() => { setEditRoom && setEditRoom(null); setPage("manageRooms"); }, 1200);
      } else {
        await apiFetch("POST", "/rooms", {
          ...form, capacity: parseInt(form.capacity)
        });
        setToast({ msg: "Room added successfully!", type: "success" });
        setTimeout(() => setPage("manageRooms"), 1400);
      }
    } catch (e) {
      setToast({ msg: e.message || "Something went wrong", type: "error" });
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: "32px 48px" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <div style={{ width:44, height:44, background:"#EFF6FF", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
          {isEdit ? "✏️" : "➕"}
        </div>
        <div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:24, color:"#0F172A" }}>
            {isEdit ? "Edit Room" : "Add New Room"}
          </h1>
          <p style={{ fontSize:13, color:"#64748B" }}>
            {isEdit ? "Update room details below" : "Fill in details to create a new meeting room"}
          </p>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:28 }}>

        {/* Form */}
        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #E2E8F0", padding:28, boxShadow:"var(--shadow-sm)" }}>
          <Input label="Room Name *" placeholder="e.g. Conference Hall A" value={form.roomName} onChange={handle("roomName")} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Input label="Location *"    placeholder="e.g. 1st Floor" value={form.location} onChange={handle("location")} />
            <Input label="Capacity *"    type="number" placeholder="e.g. 10" min="1" value={form.capacity} onChange={handle("capacity")} />
          </div>
          <Input label="Description"  placeholder="Room features, equipment..." value={form.description} onChange={handle("description")} />
          <Input label="Image URL"    placeholder="https://... (optional)"    value={form.image}       onChange={handle("image")} />
          <Select label="Status" value={form.status} onChange={handle("status")}>
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="RESERVED">Reserved</option>
          </Select>
          <div style={{ display:"flex", gap:12, marginTop:8 }}>
            <Btn variant="green" size="lg" onClick={submit} disabled={loading} style={{ borderRadius:10 }}>
              {loading ? <Spinner size={20} /> : isEdit ? "💾 Update Room" : "➕ Add Room"}
            </Btn>
            <Btn variant="ghost" size="lg" onClick={() => setPage("manageRooms")} style={{ borderRadius:10 }}>
              Cancel
            </Btn>
          </div>
        </div>

        {/* Live Preview */}
        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #E2E8F0", padding:24, boxShadow:"var(--shadow-sm)", height:"fit-content", position:"sticky", top:80 }}>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, color:"#0F172A", marginBottom:14 }}>
            🖼️ Live Preview
          </h3>
          {form.image
            ? <img src={form.image} alt="preview" style={{ width:"100%", height:140, objectFit:"cover", borderRadius:10, marginBottom:14 }}
                onError={e => e.target.src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />
            : <div style={{ width:"100%", height:140, background:"linear-gradient(135deg,#dde3f5,#c5cfed)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:48, marginBottom:14 }}>🏢</div>
          }
          <div style={{ fontFamily:"var(--font-display)", fontSize:15, color:"#0F172A", marginBottom:8 }}>
            {form.roomName || "Room Name"}
          </div>
          <div style={{ fontSize:12, color:"#64748B", marginBottom:4 }}>📍 {form.location || "Location"}</div>
          <div style={{ fontSize:12, color:"#64748B", marginBottom:10 }}>👥 Capacity: {form.capacity || "0"} People</div>
          {form.description && <div style={{ fontSize:12, color:"#64748B", marginBottom:10 }}>ℹ️ {form.description}</div>}
          <Badge status={form.status} />

          {/* Admin badge */}
          <div style={{ marginTop:16, padding:"10px 12px", background:"#F0FDF4", borderRadius:10, fontSize:12, color:"#059669", fontWeight:600 }}>
            ✅ Admin Access — You can add this room
          </div>
        </div>
      </div>
    </div>
  );
}
